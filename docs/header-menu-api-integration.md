# Hướng dẫn tích hợp API Header Menu cho Front-End (Next.js App Router)

Tài liệu này hướng dẫn cách kết nối và render danh sách menu động được quản lý từ Backend vào component Header/Navigation của Front-End. Tài liệu tập trung giải quyết vấn đề **khi người dùng nhấn F5 (refresh trang), menu sẽ hiển thị ngay lập tức không bị nhấp nháy hoặc delay**.

---

## 1. Thông tin API từ Backend

Backend cung cấp API Public để lấy cấu trúc cây menu dựa trên `code` định danh:

- **Endpoint**: `GET /api/v1/menus/code/{code}`
- **Ví dụ**: `GET http://localhost:8000/api/v1/menus/code/header`
- **Method**: `GET`
- **Authentication**: Không yêu cầu (Public API).
- **Cấu trúc dữ liệu trả về (`MenuTreeResponse`)**:
  ```json
  {
    "id": "uuid",
    "name": "Header Menu",
    "code": "header",
    "description": "...",
    "is_active": true,
    "items": [
      {
        "id": "uuid",
        "title": "Giới thiệu",
        "target_type": "EXTERNAL_LINK",
        "target_id": null,
        "target_info": null,
        "external_url": "/gioi-thieu",
        "open_in_new_tab": false,
        "icon": "info",
        "depth": 0,
        "sort_order": 0,
        "is_visible": true,
        "has_link": true,
        "children": [
          {
            "id": "uuid",
            "title": "Lịch sử",
            "target_type": "EXTERNAL_LINK",
            "target_id": null,
            "target_info": null,
            "external_url": "/gioi-thieu/lich-su",
            "open_in_new_tab": false,
            "icon": "history",
            "depth": 1,
            "sort_order": 0,
            "is_visible": true,
            "has_link": true,
            "children": []
          }
        ]
      }
    ]
  }
  ```

---

## 2. Định nghĩa Types/Interfaces ở Front-End

Tạo hoặc cập nhật file định nghĩa kiểu dữ liệu tại `src/features/menu/types/index.ts` (hoặc định nghĩa trực tiếp trong component `navigation.tsx`):

```typescript
export enum MenuItemTargetType {
  EXTERNAL_LINK = "EXTERNAL_LINK",
  CATEGORY = "CATEGORY",
  ARTICLE = "ARTICLE",
  DEPARTMENT = "DEPARTMENT",
  PAGE = "PAGE"
}

export interface TargetInfo {
  id: string;
  type: string;
  name: string;
  slug?: string;
  status?: string;
  path?: string;
  is_weekly_schedule?: boolean;
}

export interface MenuItemTreeNode {
  id: string;
  title: string;
  target_type?: MenuItemTargetType | null;
  target_id?: string | null;
  target_info?: TargetInfo | null;
  external_url?: string | null;
  open_in_new_tab: boolean;
  icon?: string | null;
  depth: number;
  sort_order: number;
  is_visible: boolean;
  has_link: boolean;
  children: MenuItemTreeNode[];
}

export interface MenuTreeResponse {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  is_active: boolean;
  items: MenuItemTreeNode[];
}
```

---

## 3. Hàm tiện ích chuyển đổi Target API sang URL thực tế

Do menu liên kết tới nhiều thực thể (bài viết, danh mục, liên kết ngoài...), chúng ta cần viết một helper giải quyết đường dẫn thực tế của Front-End dựa trên thông tin backend gửi về.

Tạo file `src/features/menu/utils/resolve-menu-url.ts`:

```typescript
import { MenuItemTreeNode } from "../types";

export function resolveMenuUrl(item: MenuItemTreeNode): string {
  // 1. Nếu là đường dẫn ngoài hoặc đã nhập trực tiếp URL
  if (item.target_type === "EXTERNAL_LINK") {
    return item.external_url || "#";
  }

  // 2. Nếu backend đã phân giải sẵn đường dẫn tương đối (VD: /tin-tuc/abc hoặc /bo-mon/xyz)
  if (item.target_info?.path) {
    return item.target_info.path;
  }

  // 3. Fallback thủ công nếu backend chưa phân giải kịp path
  const slug = item.target_info?.slug;
  if (!slug) return "#";

  switch (item.target_type) {
    case "CATEGORY":
      return `/tin-tuc/danh-muc/${slug}`;
    case "ARTICLE":
      return `/tin-tuc/${slug}`;
    case "DEPARTMENT":
      return `/bo-mon/${slug}`;
    case "PAGE":
      return `/page/${slug}`;
    default:
      return "#";
  }
}
```

---

## 4. Các giải pháp tích hợp (Tối ưu hóa F5 không bị delay)

Để giải quyết vấn đề **"nhấn F5 hiện lên ngay lập tức"**, chúng ta có hai phương án tiếp cận chính. **Phương án 1 (Server-side Fetching ở Layout)** được khuyến nghị hàng đầu đối với Next.js App Router.

### PHƯƠNG ÁN 1: Server-side Fetching tại Layout (Khuyên dùng 🌟)
Next.js App Router cho phép fetch dữ liệu trực tiếp trên Server (Server Component). Khi tải trang hoặc nhấn F5, Server sẽ fetch dữ liệu từ API, sinh ra HTML hoàn chỉnh chứa toàn bộ danh sách menu và trả về trình duyệt. Nhờ đó, menu được hiển thị ngay lập tức, không có độ trễ và tối ưu hóa SEO.

#### Bước 1: Viết API service gọi trực tiếp từ Server
Tạo file `src/features/menu/api/get-menu-server.ts`:

```typescript
import { MenuTreeResponse } from "../types";

export async function getMenuTreeServer(code: string): Promise<MenuTreeResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/menus/code/${code}`, {
      // Tự động revalidate hoặc cache theo nhu cầu
      next: { 
        revalidate: 3600 // Cache 1 giờ, tự động làm mới ở chế độ nền
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch menu tree: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching menu server-side:", error);
    return null;
  }
}
```

#### Bước 2: Tích hợp vào Root Layout (`src/app/layout.tsx`)
Chuyển đổi Root Layout hoặc Layout chung của website thành Server Component và thực hiện fetch dữ liệu:

```tsx
// src/app/layout.tsx
import { getMenuTreeServer } from "@/features/menu/api/get-menu-server";
import { Header } from "@/shared/components/layout/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch menu header trực tiếp tại Server Component
  const headerMenu = await getMenuTreeServer("header");

  return (
    <html lang="vi">
      <body>
        {/* Truyền dữ liệu menu đã fetch được từ Server xuống Component Header */}
        <Header initialMenu={headerMenu} />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

#### Bước 3: Cập nhật Header & Navigation để nhận initial data
Cập nhật `src/shared/components/layout/header.tsx`:

```tsx
// src/shared/components/layout/header.tsx
"use client";
import { Navigation } from "./navigation";
import { MenuTreeResponse } from "@/features/menu/types";

interface HeaderProps {
  initialMenu: MenuTreeResponse | null;
}

export function Header({ initialMenu }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo... */}
        
        {/* Truyền menu xuống Navigation */}
        <Navigation initialMenu={initialMenu} />
      </div>
    </header>
  );
}
```

---

### PHƯƠNG ÁN 2: Client-side Fetching tích hợp React Query
Nếu bạn muốn sử dụng hoàn toàn Client-side rendering, bạn nên tận dụng cơ chế Hydration hoặc thiết lập fallback tĩnh để **giảm thiểu Layout Shift và tránh mất giao diện khi nhấn F5**.

#### Bước 1: Viết API Client với Axios
Tạo file `src/features/menu/api/get-menu-client.ts`:

```typescript
import { axiosClient } from "@/shared/api/axios-client";
import { MenuTreeResponse } from "../types";

export async function getMenuTreeClient(code: string): Promise<MenuTreeResponse> {
  const response = await axiosClient.get<MenuTreeResponse>(`/menus/code/${code}`);
  return response.data;
}
```

#### Bước 2: Tạo React Query Hook
Tạo file `src/features/menu/hooks/use-menu.ts`:

```typescript
import { useQuery } from "@tanstack/react-query";
import { getMenuTreeClient } from "../api/get-menu-client";

export function useMenu(code: string, fallbackData?: any) {
  return useQuery({
    queryKey: ["menu", code],
    queryFn: () => getMenuTreeClient(code),
    staleTime: 5 * 60 * 1000, // Caching dữ liệu trong 5 phút
    gcTime: 30 * 60 * 1000,   // Giữ dữ liệu rác trong 30 phút
    initialData: fallbackData, // Giúp hiển thị ngay lập tức khi F5 nếu được truyền từ server
  });
}
```

---

## 5. Hiện thực hóa việc Render Đệ Quy ở Component Navigation

Cấu trúc menu của backend trả về dạng cây đệ quy không giới hạn cấp độ. Hãy chỉnh sửa file `src/shared/components/layout/navigation.tsx` để render động dữ liệu này một cách linh hoạt.

Dưới đây là mã nguồn mẫu nâng cấp cho `navigation.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, X, Home } from "lucide-react";
import { MenuTreeResponse, MenuItemTreeNode } from "@/features/menu/types";
import { resolveMenuUrl } from "@/features/menu/utils/resolve-menu-url";

// 1. Dữ liệu tĩnh cũ làm fallback dự phòng khi API lỗi hoặc chưa load xong
const staticFallbackMenuItems = [
  {
    title: "Giới thiệu",
    href: "/gioi-thieu",
    submenu: [
      { title: "Lịch sử", href: "/gioi-thieu/lich-su" },
      { title: "Sứ mạng, tầm nhìn", href: "/gioi-thieu/su-mang-tam-nhin" },
    ],
  },
  // ... các phần tử khác
];

interface NavigationProps {
  initialMenu: MenuTreeResponse | null;
}

export function Navigation({ initialMenu }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Lấy danh sách items động từ backend (nếu có), nếu không có dùng fallback tĩnh
  const menuItems: MenuItemTreeNode[] = initialMenu?.items || [];

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const handleDropdownToggle = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center">
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/" className="text-slate-700 hover:text-brand-darkred transition" aria-label="Home">
              <Home size={18} />
            </Link>
          </li>
          
          {menuItems.filter(item => item.is_visible).map((item) => {
            const hasSubmenu = item.children && item.children.length > 0;
            const targetUrl = resolveMenuUrl(item);

            return (
              <li key={item.id} className="relative group py-4">
                {hasSubmenu ? (
                  <button className="flex items-center gap-1 text-slate-700 font-medium hover:text-brand-darkred transition text-[14px]">
                    {item.title}
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    href={targetUrl}
                    target={item.open_in_new_tab ? "_blank" : undefined}
                    className="text-slate-700 font-medium hover:text-brand-darkred transition text-[14px]"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Submenu cấp 1 */}
                {hasSubmenu && (
                  <ul className="absolute left-0 top-[100%] hidden group-hover:block bg-white shadow-md border border-slate-100 rounded-none py-2 min-w-[240px] z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.children.filter(sub => sub.is_visible).map((subItem) => {
                      const hasSubmenuLevel2 = subItem.children && subItem.children.length > 0;
                      const subTargetUrl = resolveMenuUrl(subItem);

                      return (
                        <li key={subItem.id} className="relative group/sub px-1 py-0.5">
                          {hasSubmenuLevel2 ? (
                            <button className="w-full flex items-center justify-between px-3 py-2 text-slate-700 font-medium hover:bg-brand-darkred/5 hover:text-brand-darkred rounded-none text-left text-[13px] transition duration-150">
                              {subItem.title}
                              <ChevronRight size={13} className="text-slate-400 group-hover/sub:translate-x-0.5 transition-transform" />
                            </button>
                          ) : (
                            <Link
                              href={subTargetUrl}
                              target={subItem.open_in_new_tab ? "_blank" : undefined}
                              className="block px-3 py-2 text-slate-700 font-medium hover:bg-brand-darkred/5 hover:text-brand-darkred rounded-none text-[13px] transition duration-150"
                            >
                              {subItem.title}
                            </Link>
                          )}

                          {/* Submenu cấp 2 */}
                          {hasSubmenuLevel2 && (
                            <ul className="absolute left-[100%] top-0 hidden group-hover/sub:block bg-white shadow-md border border-slate-100 rounded-none py-2 min-w-[240px] z-50 ml-1.5 animate-in fade-in slide-in-from-left-1 duration-150">
                              {subItem.children.filter(nested => nested.is_visible).map((nestedItem) => {
                                const nestedTargetUrl = resolveMenuUrl(nestedItem);
                                return (
                                  <li key={nestedItem.id} className="px-1 py-0.5">
                                    <Link
                                      href={nestedTargetUrl}
                                      target={nestedItem.open_in_new_tab ? "_blank" : undefined}
                                      className="block px-3 py-2 text-slate-700 font-medium hover:bg-brand-darkred/5 hover:text-brand-darkred rounded-none text-[13px] transition duration-150"
                                    >
                                      {nestedItem.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Drawer (Tương tự, map từ menuItems động) */}
      {/* ... */}
    </>
  );
}
```

---

## 6. Tổng kết lợi ích của giải pháp Server-side Fetching (Layout)
1. **F5 Không mất dữ liệu**: HTML sinh ra đã có đầy đủ thẻ `<a>` chứa các liên kết của menu. Khi F5, menu hiện ra ngay lập tức mà không phải chờ API từ Client gọi lên.
2. **Không bị giật (Layout Shift)**: Không cần dùng spinner, skeleton hay chớp màn hình trắng khi tải trang.
3. **SEO tối đa**: Google Bot có thể cào quét cấu trúc toàn bộ sơ đồ liên kết của website ngay lập tức mà không cần thực thi JavaScript để gọi API.
