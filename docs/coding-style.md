# Coding Style & Guidelines

Tài liệu này hướng dẫn các tiêu chuẩn viết code trong dự án Next.js 16.

## 1. Định dạng code
- Sử dụng **Prettier** để định dạng code tự động.
- Quy chuẩn thiết lập trong `.prettierrc`:
  - Dấu nháy kép cho chuỗi: `"doubleQuote"`
  - Dấu chấm phẩy: `true` (semi-colon)
  - Thụt dòng: 2 spaces.
- Sắp xếp class Tailwind CSS tự động bằng plugin `prettier-plugin-tailwindcss`.

## 2. Quy tắc TypeScript
- TypeScript Strict Mode được bật. Cấm sử dụng `any`. Bắt buộc định nghĩa rõ ràng kiểu dữ liệu (interface/type).
- Tận dụng Zod schema để validate dữ liệu API ở runtime và suy diễn kiểu dữ liệu tự động (`z.infer<typeof schema>`).

## 3. Quy tắc import
- Luôn sử dụng alias `@/*` bắt đầu từ thư mục `src/`.
- **Cấm:** Không import chéo trực tiếp giữa các file nội bộ của hai feature khác nhau. Ví dụ:
  - *Sai:* `import { ArticleCard } from "@/features/article/components/ArticleCard"` bên trong `features/category`.
  - *Đúng:* `import { ArticleCard } from "@/features/article"` (thông qua file export tập trung `index.ts` của feature `article`).
