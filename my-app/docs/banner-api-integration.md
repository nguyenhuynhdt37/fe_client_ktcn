# Hướng dẫn tích hợp API Slider Banner tại Trang chủ (Next.js App Router)

Tài liệu này hướng dẫn cách gọi API lấy danh sách **Banner Slide (Hero Slider)** từ Backend và tích hợp vào component `<HeroSlider />` ở Trang chủ Front-End, đảm bảo **khi F5 trang thì các Slide Banner sẽ hiển thị ngay lập tức** mà không có độ trễ hoặc nhấp nháy nhờ cơ chế Server-side Fetching.

---

## 1. Thông tin API từ Backend

Backend cung cấp API Public để lấy danh sách banner đang hoạt động dựa trên vị trí (`position`):

- **Endpoint**: `GET /api/v1/banners?position=HOME_HERO`
- **Method**: `GET`
- **Authentication**: Không yêu cầu (Public API).
- **Mô tả**: Trả về danh sách các banner hiển thị ở thanh trượt trang chủ (Hero Slider), sắp xếp tăng dần theo `sort_order`.
- **Cơ chế đặc biệt**: Backend đã tự động chuyển đổi đường dẫn `desktop_image_object_key` và `mobile_image_object_key` thành URL ảnh đầy đủ (từ S3/MinIO). Front-End chỉ việc sử dụng trực tiếp để render.

- **Cấu trúc dữ liệu trả về**:
  ```json
  [
    {
      "id": "uuid-1",
      "title": "Chào năm mới ECO 2025",
      "description": "...",
      "desktop_image_object_key": "http://localhost:9000/portal-bucket/banners/eco-new-year-2025.png",
      "mobile_image_object_key": "http://localhost:9000/portal-bucket/banners/eco-new-year-2025-mobile.png",
      "link_url": "/tin-tuc/chao-nam-moi-2025",
      "open_in_new_tab": false,
      "position": "HOME_HERO",
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    }
  ]
  ```

---

## 2. Định nghĩa Types/Interfaces ở Front-End

Tạo hoặc cập nhật file định nghĩa kiểu dữ liệu tại `src/features/banner/types/index.ts`:

```typescript
export enum BannerPosition {
  HOME_HERO = "HOME_HERO",
  HOME_POPUP = "HOME_POPUP",
  HOME_TOP = "HOME_TOP",
  NEWS_TOP = "NEWS_TOP",
  CATEGORY_TOP = "CATEGORY_TOP",
  PAGE_TOP = "PAGE_TOP"
}

export interface BannerResponse {
  id: string;
  title: string;
  description?: string | null;
  desktop_image_object_key: string; // URL đầy đủ ảnh cho desktop
  mobile_image_object_key?: string | null; // URL đầy đủ ảnh cho mobile (nếu có)
  link_url?: string | null;
  open_in_new_tab: boolean;
  position: BannerPosition;
  sort_order: number;
  start_at?: string | null;
  end_at?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

---

## 3. Hiện thực API Fetching ở Server-side

Để tránh việc slide bị nhấp nháy hoặc mất ảnh khi người dùng tải lại trang (F5), chúng ta nên thực hiện fetch dữ liệu tại Server Component của Trang chủ (`HomePage`).

Tạo file: `src/features/banner/api/get-banners-server.ts`:

```typescript
import { BannerResponse, BannerPosition } from "../types";

export async function getBannersServer(position: BannerPosition): Promise<BannerResponse[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/banners?position=${position}`, {
      next: {
        revalidate: 1800 // Cache 30 phút trên CDN/Server, tự động làm mới ở background
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch banners: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching banners (${position}) server-side:`, error);
    return [];
  }
}
```

---

## 4. Nâng cấp Component `<HeroSlider />`

Cập nhật file `src/features/banner/components/hero-slider.tsx` để nhận dữ liệu động `banners` từ props thay vì sử dụng mảng tĩnh. Chúng ta cũng có thể cấu hình hiển thị ảnh linh hoạt hơn bằng cách kiểm tra cả ảnh cho desktop và mobile.

```tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerResponse } from "../types";

interface HeroSliderProps {
  banners: BannerResponse[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((api: NonNullable<typeof emblaApi>) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const initHandle = requestAnimationFrame(() => {
      onInit(emblaApi);
      onSelect(emblaApi);
    });

    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      cancelAnimationFrame(initHandle);
    };
  }, [emblaApi, onInit, onSelect]);

  // Tự động chạy slide sau 5 giây
  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [emblaApi]);

  // Nếu không có banner nào đang hoạt động, trả về null hoặc ảnh placeholder mặc định
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden w-full bg-slate-100">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => {
            const SlideContent = (
              <div className="flex-[0_0_100%] min-w-0 relative h-[250px] sm:h-[400px] lg:h-[500px] w-full">
                {/* 
                  Sử dụng thẻ picture để hỗ trợ load ảnh tối ưu cho cả Desktop và Mobile
                  - Desktop: Sử dụng desktop_image_object_key
                  - Mobile: Sử dụng mobile_image_object_key nếu có, ngược lại fallback về desktop image
                */}
                <picture className="absolute inset-0 w-full h-full">
                  {banner.mobile_image_object_key && (
                    <source media="(max-w: 640px)" srcSet={banner.mobile_image_object_key} />
                  )}
                  <Image
                    src={banner.desktop_image_object_key}
                    alt={banner.title}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover w-full h-full"
                  />
                </picture>
              </div>
            );

            // Nếu banner có link, bọc toàn bộ slide bằng thẻ Link
            if (banner.link_url) {
              return (
                <Link
                  key={banner.id}
                  href={banner.link_url}
                  target={banner.open_in_new_tab ? "_blank" : undefined}
                  className="flex-[0_0_100%] min-w-0 block relative"
                >
                  {SlideContent}
                </Link>
              );
            }

            return <div key={banner.id} className="flex-[0_0_100%] min-w-0">{SlideContent}</div>;
          })}
        </div>
      </div>

      {/* Nút prev / next (Chỉ hiện khi có từ 2 slide) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 disabled:opacity-30 disabled:pointer-events-none transition z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 disabled:opacity-30 disabled:pointer-events-none transition z-10"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots navigation */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
```

---

## 5. Tích hợp tại Trang chủ (`src/app/(public)/page.tsx`)

Thực hiện fetch danh sách banner từ Server Component và truyền vào component `<HeroSlider />`.

```tsx
// src/app/(public)/page.tsx
import { HeroSlider } from "@/features/banner/components/hero-slider";
import { ServicesBar } from "@/features/menu/components/services-bar";
import { NewsSection } from "@/features/article/components/news-grid";
import { NoticeSection, ScholarshipSection } from "@/features/notification/components/notice-list";
import { AdmissionSection } from "@/features/admission/components/admission-tabs";
import { FacultiesSlider } from "@/features/department/components/faculties-slider";
import { StudentActivities } from "@/features/student/components/student-activities";
import { GallerySlider } from "@/features/media/components/gallery-slider";

// Import API fetching và enum
import { getBannersServer } from "@/features/banner/api/get-banners-server";
import { BannerPosition } from "@/features/banner/types";

export default async function HomePage() {
  // Lấy danh sách banner cho hero slider từ Server-side
  const heroBanners = await getBannersServer(BannerPosition.HOME_HERO);

  return (
    <>
      {/* 1. Slide giới thiệu động từ Backend */}
      <HeroSlider banners={heroBanners} />

      {/* 2. Dịch vụ nhanh */}
      <ServicesBar />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* 3. Phân hệ Tin tức & Thông báo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-9">
            <NewsSection />
          </div>
          <div className="lg:col-span-3">
            <NoticeSection />
          </div>
        </div>

        {/* 4. Phân hệ Tuyển sinh & Học bổng */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-9">
            <AdmissionSection />
          </div>
          <div className="lg:col-span-3">
            <ScholarshipSection />
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
