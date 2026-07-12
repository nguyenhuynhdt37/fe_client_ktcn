# Hướng dẫn Tích hợp Frontend: Real-time SSE & Cảnh báo rời trang (i18n)

Tài liệu này hướng dẫn chi tiết cách lập trình viên Frontend (FE) tích hợp tính năng nhận thông báo thời gian thực (SSE) và cảnh báo mất dữ liệu khi rời trang, tuân thủ hệ thống đa ngôn ngữ (vi/en) của dự án.

---

## PHẦN 1: LẮNG NGHE THÔNG BÁO REAL-TIME (Server-Sent Events)

API phát dòng thông báo (stream notifications) tại Backend: `/api/v1/admin/notifications/stream` hoặc `/api/v1/portal/notifications/stream`.

Vì SSE hoạt động trên giao thức HTTP dưới dạng kết nối lâu dài (long-lived connection), FE có hai cách triển khai tùy thuộc vào cách lưu trữ mã JWT Token:

### Cách 1: Sử dụng thư viện `event-source-polyfill` (Khi JWT lưu ở LocalStorage)
Đối tượng `EventSource` mặc định của trình duyệt không cho phép chèn thêm Header tùy chỉnh (như `Authorization: Bearer <token>`). Do đó, chúng ta cần sử dụng thư viện Polyfill.

1. **Cài đặt thư viện**:
```bash
pnpm add event-source-polyfill
# hoặc npm install event-source-polyfill
```

2. **Mã nguồn React/Next.js Client Component mẫu (hỗ trợ đa ngôn ngữ)**:
```typescript
"use client";

import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useLocale } from "next-intl";

interface NotificationData {
  id: string;
  title: {
    vi: string;
    en: string;
  };
  message: {
    vi: string;
    en: string;
  };
  slug?: string;
  created_at: string;
}

export function useRealtimeNotifications() {
  const locale = useLocale(); // Lấy ngôn ngữ hiện tại ("vi" hoặc "en")

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    // Khởi tạo kết nối SSE kèm Header Authorization
    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/notifications/stream`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        heartbeatTimeout: 45000, // Tự động reconnect sau 45 giây nếu mất tín hiệu
      }
    );

    // Lắng nghe khi kết nối thành công
    eventSource.addEventListener("ready", () => {
      console.log("⚡ SSE Real-time Connected!");
    });

    // Lắng nghe sự kiện 'notification'
    eventSource.addEventListener("notification", (event: any) => {
      try {
        const rawData = JSON.parse(event.data) as NotificationData;
        
        // Trích xuất nội dung tương ứng theo locale hiện tại của hệ thống
        const displayTitle = locale === "en" ? rawData.title.en : rawData.title.vi;
        const displayMessage = locale === "en" ? rawData.message.en : rawData.message.vi;

        // 1. Hiển thị UI Toast (sử dụng hot-toast, toastify...)
        showNotificationToast({
          title: displayTitle,
          message: displayMessage,
          url: rawData.slug ? `/tin-tuc/${rawData.slug}` : undefined
        });

        // 2. Kích hoạt reload hoặc cập nhật Badge số lượng chưa đọc trên Header
        // dispatchEvent(new CustomEvent("refresh-unread-notifications"));
        
      } catch (err) {
        console.error("Error parsing SSE data:", err);
      }
    });

    eventSource.onerror = (err) => {
      console.warn("SSE Connection lost, attempting reconnect...", err);
    };

    return () => {
      eventSource.close();
      console.log("🔌 SSE Connection closed.");
    };
  }, [locale]);
}
```

### Cách 2: Sử dụng Cookie (JWT lưu ở access_token Cookie)
Nếu JWT được lưu trong Cookie (`access_token`) và Backend cho phép gửi kèm cookie thông tin chứng thực (CORS credentials), bạn có thể sử dụng `EventSource` nguyên bản của trình duyệt mà không cần cài polyfill:

```typescript
const eventSource = new EventSource(
  `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/notifications/stream`,
  {
    withCredentials: true // Rất quan trọng để đính kèm Cookies tự động
  }
);
```

---

## PHẦN 2: CẢNH BÁO KHI TẮT TAB / RỜI TRANG (Trình duyệt)

Khi người dùng đang nhập dữ liệu trong CKEditor hoặc Form Đăng ký tư vấn tuyển sinh, nếu vô tình nhấn **F5, tắt Tab, quay lại (Back)**, dữ liệu chưa lưu sẽ bị mất. Chúng ta cần ngăn chặn điều này.

### Hook React xử lý cảnh báo rời trang (`useWarnUnsavedChanges`):

```typescript
"use client";

import { useEffect } from "react";

/**
 * Hook cảnh báo người dùng khi thoát/tải lại trang nếu có dữ liệu chưa lưu
 * @param isDirty Trạng thái form có sự thay đổi dữ liệu chưa lưu hay không
 */
export function useWarnUnsavedChanges(isDirty: boolean) {
  useEffect(() => {
    // 1. Cảnh báo cấp trình duyệt (F5, Tắt Tab, Close Browser)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        
        // Lưu ý quan trọng: Hầu hết các trình duyệt hiện đại (Chrome, Edge, Firefox)
        // đều ĐÃ KHÓA việc hiển thị chuỗi thông báo tùy chỉnh vì lý do bảo mật.
        // Trình duyệt sẽ tự động hiển thị popup chuẩn hệ thống bằng ngôn ngữ của máy khách.
        e.returnValue = ""; 
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);
}
```

### Cách áp dụng vào Form đăng ký / Soạn thảo:

```typescript
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useWarnUnsavedChanges } from "@/shared/hooks/useWarnUnsavedChanges";

export default function ConsultationForm() {
  const t = useTranslations("consultation");
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form được tính là có thay đổi (Dirty) khi người dùng đã nhập chữ và chưa bấm nút Gửi
  const isDirty = (formData.name.trim() !== "" || formData.phone.trim() !== "") && !isSubmitting;

  // Kích hoạt cảnh báo khi form dơ (isDirty === true)
  useWarnUnsavedChanges(isDirty);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Thực hiện gửi dữ liệu lên API...
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">{t("form_name")}</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm"
        />
      </div>
      
      <button
        type="submit"
        className="w-full rounded-md bg-brand-blue py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
      >
        {t("form_submit")}
      </button>
    </form>
  );
}
```
