# Kiến trúc Hệ thống (Next.js 16)

Dự án sử dụng mô hình **Clean Architecture** kết hợp với **Feature-First** nhằm tối đa hóa khả năng bảo trì, mở rộng và phát triển song song các mô-đun.

## 1. Các Layer Chính
- **App Layer (`src/app/`)**: Quản lý routing, layout, loading state, error boundaries, metadata, sitemap và robots. Không chứa business logic hay hooks.
- **Feature Layer (`src/features/`)**: Chứa các mô-đun nghiệp vụ độc lập (ví dụ: `article`, `category`, `auth`). Mỗi feature tự đóng gói toàn bộ logic của mình và chỉ expose các API/components cần thiết qua `index.ts`.
- **Shared Layer (`src/shared/`)**: Chứa các component UI dùng chung (Shadcn/UI), Axios client, QueryClient, global stores (Zustand), providers, config và utils không mang business logic.
- **Assets & Styles Layer (`src/assets/`, `src/styles/`)**: Quản lý static assets và styles toàn cục.

## 2. Luồng Dữ liệu & SSR
- Mặc định sử dụng **Server Components** để lấy dữ liệu (Fetch/Axios) trực tiếp từ database hoặc API ở server-side để phục vụ SSR, tối ưu SEO.
- Sử dụng **TanStack Query** để quản lý caching, synchronization và state cho các luồng dữ liệu cần tương tác động ở Client.
