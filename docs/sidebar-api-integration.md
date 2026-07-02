# Hướng dẫn tích hợp API Sidebar Menu tại Trang chủ (Next.js App Router)

Tài liệu này hướng dẫn cách gọi API lấy cấu trúc **Sidebar Menu** (thường đóng vai trò là danh sách **Liên kết nhanh / Phím tắt tiện ích** ở trang chủ) từ Backend và tích hợp vào cột bên phải (Sidebar) của Trang chủ Front-End, đảm bảo **khi F5 trang thì Sidebar sẽ hiển thị ngay lập tức** nhờ Server-side Fetching.

---

## 1. Thông tin API từ Backend

Tương tự như Header Menu, Backend sử dụng chung cơ chế API quản lý Menu theo mã định danh `code`:

- **Endpoint**: `GET /api/v1/menus/code/sidebar`
- **Method**: `GET`
- **Authentication**: Không yêu cầu (Public API).
- **Mô tả**: Lấy danh sách các liên kết trong Sidebar Menu. Vì đây là Sidebar, cấu trúc menu thường phẳng hơn (chỉ có 1 hoặc tối đa 2 cấp) dùng để liên kết nhanh đến các trang chức năng.

---

## 2. Tạo Component `<SidebarMenu />` ở Front-End

Component này sẽ nhận dữ liệu menu động và hiển thị dưới dạng một widget đứng (Vertical Menu) đẹp mắt, có hỗ trợ hover effect và icon động.

Tạo file: `src/features/menu/components/sidebar-menu.tsx`:

```tsx
"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { MenuTreeResponse, MenuItemTreeNode } from "../types";
import { resolveMenuUrl } from "../utils/resolve-menu-url";

interface SidebarMenuProps {
  initialMenu: MenuTreeResponse | null;
}

export function SidebarMenu({ initialMenu }: SidebarMenuProps) {
  const menuItems = initialMenu?.items?.filter(item => item.is_visible) || [];

  if (menuItems.length === 0) return null;

  return (
    <div className="bg-white p-6 shadow-sm border border-slate-100 rounded-none space-y-6">
      {/* Tiêu đề Widget */}
      <div className="border-b border-slate-200 pb-4">
        <h3 className="text-lg font-bold text-slate-900 relative after:absolute after:bottom-[-17px] after:left-0 after:w-10 after:h-[2.5px] after:bg-brand-darkred">
          {initialMenu?.name || "Liên kết nhanh"}
        </h3>
      </div>

      {/* Danh sách Menu Items */}
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const targetUrl = resolveMenuUrl(item);
          const hasChildren = item.children && item.children.length > 0;

          // Giải quyết Icon động từ code string của Backend
          let IconComponent = LucideIcons.Link2;
          if (item.icon && item.icon in LucideIcons) {
            IconComponent = (LucideIcons as any)[item.icon];
          }

          return (
            <li key={item.id} className="group">
              <div className="space-y-1">
                <Link
                  href={targetUrl}
                  target={item.open_in_new_tab ? "_blank" : undefined}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-brand-darkred hover:bg-brand-darkred/5 transition-all duration-200"
                >
                  <IconComponent size={16} className="text-slate-400 group-hover:text-brand-darkred transition-colors" />
                  <span>{item.title}</span>
                </Link>

                {/* Submenu cấp 2 (nếu có) */}
                {hasChildren && (
                  <ul className="pl-8 space-y-1 border-l border-slate-100 ml-5">
                    {item.children.filter(sub => sub.is_visible).map((subItem) => {
                      const subTargetUrl = resolveMenuUrl(subItem);
                      return (
                        <li key={subItem.id}>
                          <Link
                            href={subTargetUrl}
                            target={subItem.open_in_new_tab ? "_blank" : undefined}
                            className="block py-1.5 text-xs text-slate-500 hover:text-brand-darkred transition-colors"
                          >
                            • {subItem.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

---

## 3. Tích hợp vào Trang chủ (`src/app/(public)/page.tsx`)

Gọi API lấy Sidebar Menu từ Server-side bằng phương thức fetch trong Server Component `HomePage` để hiển thị ngay lập tức khi tải trang (F5) mà không bị delay hoặc Layout Shift.

Cập nhật file `src/app/(public)/page.tsx`:

```tsx
// src/app/(public)/page.tsx
import { HeroSlider } from "@/features/banner/components/hero-slider";
import { ServicesBar } from "@/features/menu/components/services-bar";
import { NewsSection } from "@/features/article/components/news-grid";
import { NoticeSection } from "@/features/notification/components/notice-list";
import { AdmissionSection } from "@/features/admission/components/admission-tabs";
import { FacultiesSlider } from "@/features/department/components/faculties-slider";
import { StudentActivities } from "@/features/student/components/student-activities";
import { GallerySlider } from "@/features/media/components/gallery-slider";

// Import API fetching và component Sidebar Menu
import { getMenuTreeServer } from "@/features/menu/api/get-menu-server";
import { SidebarMenu } from "@/features/menu/components/sidebar-menu";

export default async function HomePage() {
  // Lấy dữ liệu Sidebar Menu từ Server-side
  const sidebarMenu = await getMenuTreeServer("sidebar");

  return (
    <>
      {/* 1. Slide giới thiệu */}
      <HeroSlider />

      {/* 2. Dịch vụ nhanh */}
      <ServicesBar />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* 3. Phân hệ Tin tức & Sidebar (Thông báo + Liên kết nhanh) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cột trái: Tin tức nổi bật */}
          <div className="lg:col-span-9">
            <NewsSection />
          </div>

          {/* Cột phải: Sidebar (Thông báo & Menu Liên kết nhanh động) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Widget Thông báo */}
            <NoticeSection />

            {/* Widget Liên kết nhanh lấy động từ API */}
            <SidebarMenu initialMenu={sidebarMenu} />
          </div>
        </div>

        {/* 4. Phân hệ Tuyển sinh */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-9">
            <AdmissionSection />
          </div>
          <div className="lg:col-span-3">
            {/* Có thể chèn thêm widget hoặc banner quảng cáo tại đây */}
          </div>
        </div>
      </main>

      {/* 5. Khoa đào tạo slider */}
      <FacultiesSlider />

      {/* 6. Hoạt động sinh viên */}
      <StudentActivities />

      {/* 7. Hình ảnh tiêu biểu */}
      <GallerySlider />
    </>
  );
}
```

---

## 4. Lợi ích khi triển khai
- **F5 tức thì**: Next.js cache dữ liệu `fetch` của `sidebar` ở tầng Server. Khi người dùng F5, giao diện Sidebar Menu được render tĩnh hoàn chỉnh ngay lập tức.
- **Quản lý linh hoạt**: Admin có thể cập nhật các phím tắt, liên kết nhanh trực tiếp tại CMS mà không cần sửa code FE.
- **Responsive tốt**: Tự động chuyển đổi từ grid 2 cột trên Desktop (9:3) sang 1 cột xếp dọc trên Mobile.
