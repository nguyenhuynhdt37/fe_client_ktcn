"use client";

import { useEffect } from "react";

/**
 * MaintenanceHandler là Client Component tự động chạy ngầm trên trình duyệt
 * khi hệ thống hiển thị trang báo bảo trì.
 * Nó sẽ liên tục ping thử API của Backend mỗi 5 giây. Ngay khi phát hiện
 * Backend online trở lại, nó sẽ tự động tải lại trang (window.location.reload())
 * để khôi phục giao diện hoạt động tức thời mà người dùng không cần bấm F5 bằng tay.
 */
export function MaintenanceHandler() {
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const checkHealth = async () => {
      try {
        // Ping thử API lấy danh sách ngôn ngữ
        const res = await fetch(`${apiUrl}/api/v1/portal/languages`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
          // Không dùng cache để đảm bảo kiểm tra kết nối tươi mới
          cache: "no-store",
        }).catch(() => null);

        if (res && res.ok) {
          // Backend đã online, tiến hành tải lại trang
          console.log("Backend API is back online! Reloading page...");
          window.location.reload();
        }
      } catch (error) {
        // Bỏ qua lỗi kết nối
      }
    };

    // Kiểm tra định kỳ mỗi 5 giây
    const interval = setInterval(checkHealth, 5000);

    // Chạy kiểm tra lập tức ở lần đầu mount
    checkHealth();

    return () => clearInterval(interval);
  }, []);

  return null;
}
