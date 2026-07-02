# Hướng dẫn tích hợp API Bài viết theo Danh mục tại Trang chủ (Next.js App Router)

Tài liệu này hướng dẫn cách gọi API lấy danh sách **Bài viết theo từng Danh mục chính** (Tin tức - Sự kiện, Thông báo, Đào tạo, Tuyển sinh, Nghiên cứu khoa học, Tuyển dụng, Sinh viên...) từ Backend và tích hợp vào các component hiển thị của Trang chủ Front-End, tối ưu hóa hiển thị khi F5 trang bằng Server-side Fetching.

---

## 1. Thông tin API từ Backend

Backend cung cấp API Public để lấy danh sách bài viết đã xuất bản thuộc một danh mục cụ thể qua `category_slug`:

- **Endpoint**: `GET /api/v1/categories/{category_slug}/articles`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: Chỉ số trang (mặc định: `1`).
  - `page_size`: Số lượng bài viết trên mỗi trang (mặc định: `10`).
- **Authentication**: Không yêu cầu (Public API).
- **Quy tắc sắp xếp**: Bài viết được ghim (`is_pinned`) sẽ tự động lên đầu, sau đó sắp xếp theo ngày xuất bản (`published_at`) giảm dần.

### Danh sách các Category Slugs tương ứng trong hệ thống:
1. **Tin tức - Sự kiện**: `tin-tuc-va-su-kien`
2. **Thông báo**: `thong-bao`
3. **Đào tạo**: `dao-tao`
4. **Tuyển sinh**: `tuyen-sinh`
5. **Nghiên cứu khoa học**: `nckh-va-doi-ngoai` (hoặc `nckh`)
6. **Tuyển dụng**: `tuyen-dung`
7. **Sinh viên**: `sinh-vien`

---

## 2. Định nghĩa Types/Interfaces ở Front-End

Tạo hoặc cập nhật file định nghĩa kiểu dữ liệu bài viết tại `src/features/article/types/index.ts`:

```typescript
export interface PortalArticleAuthor {
  id: string;
  username: string;
  full_name?: string | null;
  avatar_url?: string | null;
}

export interface PortalArticleCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PortalArticleResponse {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  thumbnail_object_key?: string | null; // URL hình ảnh thu nhỏ của bài viết
  is_featured: boolean;
  is_pinned: boolean;
  view_count: number;
  published_at: string;
  category: PortalArticleCategory;
  author: PortalArticleAuthor;
}

export interface PortalArticlePaginationResponse {
  items: PortalArticleResponse[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}
```

---

## 3. Hiện thực API Fetching ở Server-side

Tạo file `src/features/article/api/get-articles-server.ts` để gọi API lấy danh sách bài viết từ phía Server:

```typescript
import { PortalArticlePaginationResponse } from "../types";

export async function getArticlesByCategoryServer(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PortalArticlePaginationResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const res = await fetch(
      `${apiBaseUrl}/api/v1/categories/${categorySlug}/articles?page=${page}&page_size=${pageSize}`,
      {
        next: {
          revalidate: 600 // Cache 10 phút, tự động revalidate ngầm
        }
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch articles for category ${categorySlug}: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching articles for category ${categorySlug} server-side:`, error);
    return null;
  }
}
```

---

## 4. Hàm ánh xạ dữ liệu (Data Mapper)

Cần chuyển đổi (map) cấu trúc dữ liệu từ API của Backend (`PortalArticleResponse`) sang định dạng hiển thị của component Front-End hiện tại để hạn chế sửa cấu trúc JSX.

Tạo file: `src/features/article/utils/map-article.ts`:

```typescript
import { PortalArticleResponse } from "../types";

// Định dạng ngày sang kiểu Việt Nam (DD/MM/YYYY)
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// Map sang cấu trúc hiển thị của FE
export function mapPortalArticleToFE(item: PortalArticleResponse) {
  return {
    id: item.id,
    title: item.title,
    imageUrl: item.thumbnail_object_key || "/images/placeholder-news.jpg",
    category: item.category.name,
    categoryHref: `/tin-tuc/danh-muc/${item.category.slug}`,
    date: formatDate(item.published_at),
    href: `/tin-tuc/${item.slug}`
  };
}
```

---

## 5. Tích hợp và Nâng cấp tại Trang chủ (`src/app/(public)/page.tsx`)

Thực hiện fetch song song các danh mục bài viết trên Server và truyền dữ liệu đã map vào các component.

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

// Import APIs và Helper
import { getBannersServer } from "@/features/banner/api/get-banners-server";
import { BannerPosition } from "@/features/banner/types";
import { getArticlesByCategoryServer } from "@/features/article/api/get-articles-server";
import { mapPortalArticleToFE } from "@/features/article/utils/map-article";

export default async function HomePage() {
  // 1. Fetch Banner Slider
  const heroBannersPromise = getBannersServer(BannerPosition.HOME_HERO);

  // 2. Fetch các danh mục bài viết song song để tối ưu tốc độ tải trang
  const newsPromise = getArticlesByCategoryServer("tin-tuc-va-su-kien", 1, 3); // Lấy 3 tin tức
  const noticePromise = getArticlesByCategoryServer("thong-bao", 1, 4);        // Lấy 4 thông báo
  const admissionPromise = getArticlesByCategoryServer("tuyen-sinh", 1, 4);    // Lấy 4 bài tuyển sinh

  // Chờ tất cả API hoàn thành
  const [heroBanners, newsData, noticeData, admissionData] = await Promise.all([
    heroBannersPromise,
    newsPromise,
    noticePromise,
    admissionPromise
  ]);

  // Ánh xạ dữ liệu cho component FE
  const newsArticles = newsData?.items.map(mapPortalArticleToFE) || [];
  const noticeList = noticeData?.items.map(item => ({
    id: item.id,
    title: item.title,
    date: new Date(item.published_at).toLocaleDateString("vi-VN"),
    href: `/tin-tuc/${item.slug}`
  })) || [];

  const admissionList = admissionData?.items.map(mapPortalArticleToFE) || [];

  return (
    <>
      {/* 1. Slide giới thiệu */}
      <HeroSlider banners={heroBanners} />

      {/* 2. Dịch vụ nhanh */}
      <ServicesBar />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* 3. Phân hệ Tin tức & Thông báo động */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-9">
            <NewsSection articles={newsArticles} />
          </div>
          <div className="lg:col-span-3">
            <NoticeSection notices={noticeList} />
          </div>
        </div>

        {/* 4. Phân hệ Tuyển sinh */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-9">
            {/* AdmissionSection có thể nhận truyền prop list từ bên ngoài */}
            <AdmissionSection initialArticles={admissionList} />
          </div>
          <div className="lg:col-span-3">
            {/* Có thể bổ sung thêm widget khác ở đây */}
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
