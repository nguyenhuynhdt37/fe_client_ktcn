# Hướng dẫn Triển khai (Deployment Guide)

Dự án Next.js 16 này có thể được triển khai theo hai phương thức chính: Containerization (Docker) hoặc Cloud Platforms (Vercel/Netlify).

## 1. Triển khai bằng Docker
Chúng tôi cung cấp sẵn cấu hình Docker trong thư mục `docker/`.

### Các bước chạy local bằng Docker:
1. Đảm bảo bạn đã cài đặt Docker và Docker Compose.
2. Từ thư mục root của dự án, chạy lệnh:
   ```bash
   docker-compose -f docker/docker-compose.yml up --build -d
   ```
3. Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:3000`.

## 2. CI/CD Workflow
Mỗi PR hoặc commit lên nhánh `main`/`master` sẽ kích hoạt GitHub Actions workflow `.github/workflows/ci.yml` để thực hiện:
- Kiểm tra kiểu dữ liệu & linting (`pnpm lint`).
- Biên dịch sản phẩm production (`pnpm build`).
- Sau khi CI pass, code có thể tự động deploy lên môi trường staging hoặc production.
