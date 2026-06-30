# Tài liệu API & Tương tác Dữ liệu

Tất cả các API call trong dự án đều phải tuân thủ luồng cấu trúc chuẩn.

## 1. Cấu hình HTTP Client
Dự án sử dụng Axios Instance được định nghĩa tại `src/shared/api/axios-client.ts`.
- Tự động đính kèm authorization token (nếu có) thông qua interceptors.
- Xử lý các lỗi hệ thống tập trung (401, 403, 500) và điều hướng hoặc hiển thị thông báo toast phù hợp.

## 2. API Call trong Features
Tất cả các hàm tương tác API phải được viết trong thư mục `api/` của từng Feature.
Ví dụ:
```typescript
// src/features/article/api/getArticles.ts
import { axiosClient } from "@/shared/api/axios-client";
import { Article } from "../types";

export async function getArticles(params?: Record<string, any>): Promise<Article[]> {
  const response = await axiosClient.get("/articles", { params });
  return response.data;
}
```

## 3. Server-side Fetching
Đối với các trang SSR, gọi trực tiếp các api function này trong Server Component:
```typescript
// src/app/(public)/tin-tuc/page.tsx
import { getArticles } from "@/features/article/api/getArticles";
import { ArticleList } from "@/features/article/components/ArticleList";

export default async function NewsPage() {
  const articles = await getArticles();
  return <ArticleList initialArticles={articles} />;
}
```
