# Hướng Dẫn Tích Hợp API Cây Danh Mục & Số Lượng Bài Viết (FE Portal)

Tài liệu này hướng dẫn lập trình viên Front-End (FE) cách gọi API Cây Danh mục mới (`GET /api/v1/categories/tree`), định nghĩa TypeScript đệ quy và vẽ giao diện bộ lọc danh mục phân cấp (Sidebar Menu) hiển thị kèm số lượng bài viết hoạt động tương ứng.

---

## 1. Thông Tin API Backend

*   **Endpoint:** `GET /api/v1/categories/tree`
*   **Query Parameters:**
    *   `with_article_count` (boolean, optional, mặc định: `false`): Bật lên `true` để Backend thực hiện thống kê số bài viết của chuyên mục.
    *   `only_has_articles` (boolean, optional, mặc định: `false`): Bật lên `true` để Backend thực hiện cắt tỉa đệ quy (pruning), **chỉ giữ lại những danh mục nào chứa ít nhất 1 bài viết hoạt động** (hoặc danh mục con của nó chứa bài viết).
*   **Authentication:** Public (Không yêu cầu đăng nhập).
*   **Mô tả:** Trả về cấu trúc cây danh mục bài viết. Khi truyền `only_has_articles=true`, Backend tự động kích hoạt đếm bài viết và lọc bỏ hoàn toàn các chuyên mục rác không chứa bài viết khỏi cây để tối ưu hóa SEO và trải nghiệm người dùng.

### Định dạng JSON trả về từ API (Response JSON)
```json
[
  {
    "id": "db8cf840-0f2c-47bc-8f43-cc5cfb6170d1",
    "parent_id": null,
    "name": "Tin tức & Sự kiện",
    "slug": "tin-tuc-va-su-kien",
    "description": "Chuyên mục tin tức chính thống của trường",
    "sort_order": 10,
    "status": "active",
    "is_visible": true,
    "article_count": 48,
    "children": [
      {
        "id": "e2a0f8d0-4cb6-4fb3-8e7c-a496836417fa",
        "parent_id": "db8cf840-0f2c-47bc-8f43-cc5cfb6170d1",
        "name": "Hoạt động Đoàn - Hội",
        "slug": "hoat-dong-doan-hoi",
        "description": "Các tin tức về phong trào thanh niên sinh viên",
        "sort_order": 5,
        "status": "active",
        "is_visible": true,
        "article_count": 12,
        "children": []
      }
    ]
  },
  {
    "id": "f58f84f0-4cb6-4fb3-8e7c-a496836417fb",
    "parent_id": null,
    "name": "Tuyển sinh",
    "slug": "tuyen-sinh",
    "description": "Thông tin tuyển sinh các ngành đào tạo",
    "sort_order": 20,
    "status": "active",
    "is_visible": true,
    "article_count": 25,
    "children": []
  }
]
```

---

## 2. Định Nghĩa TypeScript Interface

Trong thư mục `types/` của module category trên Front-End (ví dụ: `src/features/category/types/index.ts`), định nghĩa interface đệ quy như sau:

```typescript
export interface CategoryTreeNode {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  status: string;
  is_visible: boolean;
  article_count: number;
  children: CategoryTreeNode[]; // Mảng đệ quy chứa danh mục con
}
```

---

## 3. Cách Tích Hợp Trên Next.js Server Side

Tạo hàm fetch dữ liệu ở Server-side tại `src/features/category/api/get-categories.ts`:

```typescript
import { CategoryTreeNode } from "../types";

export async function getCategoryTreeServer(): Promise<CategoryTreeNode[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    // Truyền with_article_count=true để lấy thống kê số lượng bài viết
    const res = await fetch(`${apiBaseUrl}/api/v1/categories/tree?with_article_count=true`, {
      next: { revalidate: 600 } // Cache dữ liệu cây danh mục trong 10 phút
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching category tree:", error);
    return [];
  }
}
```

---

## 4. Mã Nguồn Mẫu Component Vẽ Cây Danh Mục (Sidebar Menu)

Dưới đây là Component React TypeScript vẽ cây danh mục lồng nhau đệ quy, hiển thị số lượng bài viết của từng danh mục dạng badge bên cạnh và hỗ trợ active class khi người dùng đang lọc danh mục đó.

Lập trình viên FE tạo file `src/features/category/components/category-sidebar-tree.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Folder } from "lucide-react";
import { CategoryTreeNode } from "../types";

interface CategorySidebarTreeProps {
  tree: CategoryTreeNode[];
}

export function CategorySidebarTree({ tree }: CategorySidebarTreeProps) {
  const searchParams = useSearchParams();
  const activeCategorySlug = searchParams.get("category") || "";

  // Hàm sinh URL giữ nguyên các query params khác của trang
  const getCategoryUrl = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
      params.delete("tag"); // Thường khi chọn category ta reset lọc tag
    } else {
      params.delete("category");
    }
    params.set("page", "1"); // Quay về trang 1
    return `/tin-tuc?${params.toString()}`;
  };

  // Render một Node danh mục và các node con của nó đệ quy
  const renderNode = (node: CategoryTreeNode, depth: number = 0) => {
    const isSelected = activeCategorySlug === node.slug;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="space-y-1">
        {/* Dòng hiển thị Category */}
        <Link
          href={getCategoryUrl(node.slug)}
          className={`flex items-center justify-between py-2 px-3 text-sm font-medium transition duration-150 border-l-2 hover:bg-slate-50 ${
            isSelected
              ? "text-primary border-primary bg-primary/5 font-bold"
              : "text-slate-600 border-transparent hover:text-primary"
          }`}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          <div className="flex items-center gap-2 truncate">
            {hasChildren ? (
              <ChevronRight
                size={14}
                className={`text-slate-400 shrink-0 transition-transform ${
                  isSelected || activeCategorySlug.startsWith(node.slug) ? "rotate-90" : ""
                }`}
              />
            ) : (
              <Folder size={14} className="text-slate-400 shrink-0" />
            )}
            <span className="truncate">{node.name}</span>
          </div>

          {/* Badge số lượng bài viết */}
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
              isSelected
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
            }`}
          >
            {node.article_count}
          </span>
        </Link>

        {/* Đệ quy render các danh mục con lồng nhau */}
        {hasChildren && (
          <div className="border-l border-slate-100/80 ml-4 space-y-1">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200/60 p-6 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b-2 border-primary pb-2 w-fit">
        Chuyên mục tuyển sinh & đào tạo
      </h3>
      <div className="divide-y divide-slate-100/50 space-y-1">
        {/* Lựa chọn xem tất cả bài viết */}
        <Link
          href={getCategoryUrl(null)}
          className={`flex items-center justify-between py-2 px-3 text-sm font-medium transition duration-150 border-l-2 hover:bg-slate-50 ${
            !activeCategorySlug
              ? "text-primary border-primary bg-primary/5 font-bold"
              : "text-slate-600 border-transparent hover:text-primary"
          }`}
        >
          <span className="truncate">Tất cả bài viết</span>
        </Link>

        {/* Danh sách cây danh mục đệ quy */}
        <div className="pt-2 space-y-1">
          {tree.map((node) => renderNode(node))}
        </div>
      </div>
    </div>
  );
}
```

---

## 5. Tích Hợp API Thẻ Tag Hoạt Động (Count > 0)

*   **Endpoint:** `GET /api/v1/tags`
*   **Query Parameters:**
    *   `only_has_articles` (boolean, optional, mặc định: `false`): Bật lên `true` để Backend lọc, **chỉ trả về các thẻ tag có chứa ít nhất 1 bài viết đã xuất bản công khai**.
*   **Cách gọi từ FE:**
    FE gọi API bằng cách truyền thêm tham số `only_has_articles=true`:
    ```typescript
    // GET /api/v1/tags?only_has_articles=true&limit=20
    ```
    Điều này giúp trang tin tức chỉ hiển thị các thẻ Tag thực sự có bài viết ở widget Sidebar Tag Cloud, tránh hiển thị các tag trống làm ảnh hưởng đến trải nghiệm người dùng.
