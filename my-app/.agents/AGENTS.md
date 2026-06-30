# Nguyên tắc và Quy chuẩn Phát triển Dự án

Dự án Next.js 16 này được xây dựng theo mô hình Clean Architecture và Feature-First. Tất cả các lập trình viên (bao gồm cả AI Agent) phải tuân thủ nghiêm ngặt các quy tắc sau.

## 1. Nguyên tắc cốt lõi
- **Server Components mặc định:** Tất cả các component trong thư mục `src/app` và `src/features` phải là Server Components. Chỉ sử dụng Client Components (`'use client'`) khi bắt buộc phải tương tác ở client-side (sử dụng hook react, event handler, store).
- **SSR & Server Rendering:** Toàn bộ Portal ưu tiên SSR và Server Rendering để tối ưu SEO, Core Web Vitals và hiệu năng. Tránh fetch dữ liệu ở Client trừ các dữ liệu mang tính tương tác ( TanStack Query).
- **Không sử dụng `any`:** Bắt buộc định nghĩa rõ ràng kiểu dữ liệu TypeScript Strict.
- **Tuân thủ SOLID, DRY, KISS, YAGNI:** Giữ cho code dễ maintain và mở rộng.

## 2. Kiến trúc Thư mục (Clean Architecture / Feature-First)

### Thư mục `src/app/`
- Chứa Route, Layout, Metadata, Loading, Error, Route Groups.
- **Cấm:** Không viết business logic, không viết API call trực tiếp, không viết hook, không viết store trong thư mục này.

### Thư mục `src/features/`
- Mỗi nghiệp vụ nghiệp vụ là một Feature độc lập (ví dụ: `article`, `category`, `auth`, v.v.).
- **Quy tắc cô lập:** Không được viết code của Feature này trong Feature kia. Không được import chéo trực tiếp file nội bộ giữa các Feature. Mọi export ra ngoài (nếu có) phải thông qua `index.ts` ở root của feature.
- Cấu trúc chuẩn của một Feature:
  - `api/`: Các hàm fetch API (get, create, update, delete). Không render UI.
  - `components/`: UI Component riêng của Feature. Không được import sang Feature khác.
  - `constants/`: Các hằng số đặc thù.
  - `hooks/`: Custom hooks riêng biệt.
  - `schemas/`: Zod validation schemas.
  - `services/`: Business Logic xử lý dữ liệu. Không gọi API trực tiếp.
  - `types/`: Kiểu dữ liệu TypeScript.
  - `utils/`: Hàm bổ trợ riêng.
  - `index.ts`: Export tập trung những gì Feature muốn lộ diện ra ngoài.

### Thư mục `src/shared/`
- Chứa tài nguyên dùng chung cho toàn bộ hệ thống.
- **Cấm:** Không chứa business logic hay các UI đặc thù của feature.
- Cấu trúc: `api/` (Axios client), `components/` (UI dùng chung), `config/` (Theme, Env configs), `constants/`, `hooks/`, `lib/`, `providers/`, `services/`, `stores/` (Zustand), `types/`, `utils/`, `validation/`.

## 3. Quy trình Xử lý Lỗi & UI
- Sử dụng các file convention đặc biệt của Next.js: `loading.tsx`, `error.tsx` (sử dụng API `unstable_catchError` cho component-level error recovery), `not-found.tsx`, `forbidden.tsx`, `unauthorized.tsx`.

## 4. Quy định Triển khai Giao diện từ Template HTML
- **UI Reference, không sao chép mã nguồn:** Template HTML chỉ dùng để đối chiếu thiết kế (Bố cục, màu sắc, typography, responsive, hiệu ứng, spacing, UX) nhằm đạt độ giống 98-100% về giao diện.
- **Tuyệt đối cấm sao chép:**
  - Không sao chép HTML nguyên bản, CSS nguyên bản, JS nguyên bản.
  - Không import/sử dụng: Bootstrap, jQuery, Owl Carousel, Slick, WOW.js, Animate.css, Font Awesome CDN hoặc bất kỳ plugin JS truyền thống nào của template.
  - Không sao chép inline styles, inline scripts, class Bootstrap, cấu trúc DOM dư thừa của template.
- **Quy tắc xây dựng layout:**
  - Layout hoàn toàn xây dựng lại bằng Tailwind CSS v4. Không dùng Grid/Utility của Bootstrap.
  - Mọi section phải được tách biệt thành React Components độc lập (Header, Top Bar, Navigation, Mega Menu, Hero Banner, News Section, Announcement Section, Sidebar, Footer, Breadcrumb, Pagination, Card, v.v.).
- **Hình ảnh & Điều hướng:**
  - Bắt buộc dùng `next/image` thay cho `<img>` (hỗ trợ responsive, lazy loading, tối ưu hiệu năng, SEO).
  - Bắt buộc dùng `next/link` thay cho `<a href="">` cho các điều hướng nội bộ.
- **SEO & Responsive:**
  - Không sử dụng thẻ `<head>` thủ công. Bắt buộc dùng Metadata API, sitemap.ts, robots.ts, Open Graph và Twitter Card.
  - Xây dựng Responsive hoàn toàn bằng Tailwind CSS, ưu tiên nguyên tắc **Mobile First**.
- **Mục tiêu:** Giao diện bên ngoài giống hệt template nhưng mã nguồn bên trong hoàn toàn là Next.js hiện đại, sạch sẽ, không còn tàn dư của Bootstrap/jQuery/HTML cũ.

## 5. Quy tắc Tổ chức Mã nguồn và Chia nhỏ Component
- **Không viết UI trong `page.tsx` và `layout.tsx`:** Hai file này chỉ đóng vai trò fetch dữ liệu, gọi service, chuẩn bị metadata, và compose (ghép nối) các components cấp cao. Cấm viết HTML, JSX giao diện chi tiết, Tailwind classes, Card, Grid, Button, Banner, Table, News Item trực tiếp trong `page.tsx`.
- **Chia nhỏ Component hợp lý (Single Responsibility):** Một component chỉ đảm nhận một trách nhiệm duy nhất. Nếu component quá dài (trên 150-200 dòng), chứa nhiều khối giao diện khác nhau hoặc chứa nhiều logic, bắt buộc phải tách nhỏ thành các component con (ví dụ: `NewsSection` -> `NewsGrid` -> `NewsCard`).
- **Tuân thủ phân bổ Module:** Component của Feature nào chỉ được nằm trong Feature đó.
  - *Ví dụ:* `features/article/components/`, `features/banner/components/`, `features/student/components/`.
  - **Cấm:** Không được tạo component nghiệp vụ trong thư mục `shared`.
  - Thư mục `shared` chỉ chứa các component dùng chung hệ thống không mang tính nghiệp vụ như: `Button`, `Dialog`, `Input`, `Table`, `Pagination`, `Empty State`, `Loading`, `Breadcrumb`, `Badge`.
- **Không trộn lẫn Business Logic với UI:**
  - Business Logic -> `services/`.
  - API -> `api/`.
  - Validation -> `schemas/` hoặc `validation/`.
  - Custom Hooks -> `hooks/`.
  - UI Component -> `components/`.
- **Quy tắc về Server Components:** Ưu tiên sử dụng Server Components làm mặc định. Chỉ thêm `"use client"` khi thực sự cần thiết (sử dụng State, Effect, Event handlers, Animation, Carousel, Form, hoặc Browser API).
