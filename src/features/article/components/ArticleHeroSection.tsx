"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { CalendarDays, FolderOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { PortalArticleResponse, PortalArticleListResponse } from "../types/article.types";
import { formatDate, getLocalizedField } from "../utils/map-article";

interface ArticleHeroSectionProps {
  heroArticles: (PortalArticleResponse | PortalArticleListResponse)[];
  popularArticles: (PortalArticleResponse | PortalArticleListResponse)[];
}

export function ArticleHeroSection({ heroArticles, popularArticles }: ArticleHeroSectionProps) {
  const locale = useLocale();
  const tCommon = useTranslations("common");

  const [activeTab, setActiveTab] = useState<"new" | "popular">("new");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeListRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeArticles = activeTab === "new" ? heroArticles : popularArticles;
  const currentArticle = activeArticles[activeIndex];
  const totalArticles = activeArticles.length;

  // Reset activeIndex về 0 khi đổi tab
  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  // Cuộn sidebar đến phần tử đang active và đưa phần tử đó ra chính giữa container cuộn
  useEffect(() => {
    if (activeListRef.current) {
      const container = activeListRef.current;
      const activeElement = container.children[activeIndex] as HTMLElement;

      if (activeElement) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();

        const relativeTop = activeRect.top - containerRect.top + container.scrollTop;
        const targetScrollTop = relativeTop - container.clientHeight / 2 + activeRect.height / 2;

        container.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  // Thiết lập cơ chế tự động chuyển bài viết (Autoplay) mỗi 5 giây
  useEffect(() => {
    const startAutoplay = () => {
      stopAutoplay();
      if (totalArticles <= 1 || isHovered) return;

      autoplayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % totalArticles);
      }, 5000);
    };

    const stopAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };

    startAutoplay();
    return () => stopAutoplay();
  }, [activeIndex, totalArticles, isHovered, activeTab]);

  if (heroArticles.length === 0 && popularArticles.length === 0) {
    return null;
  }

  const handlePrev = () => {
    if (totalArticles <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalArticles) % totalArticles);
  };

  const handleNext = () => {
    if (totalArticles <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalArticles);
  };

  // Chuẩn bị dữ liệu hiển thị cho bài viết lớn bên trái
  const bigTitle = currentArticle ? getLocalizedField<string>(currentArticle, "title", locale) : "";
  const bigExcerpt = currentArticle
    ? getLocalizedField<string>(currentArticle, "excerpt", locale)
    : "";
  const bigCategoryName =
    currentArticle && currentArticle.category
      ? getLocalizedField<string>(currentArticle.category, "name", locale)
      : "";
  const bigImageUrl = currentArticle
    ? currentArticle.thumbnail_object_key || "/images/no-image-dhv.jpg"
    : "/images/no-image-dhv.jpg";
  const bigPublishDate = currentArticle
    ? currentArticle.publish_at || currentArticle.created_at
    : "";

  return (
    <div
      className="mb-4 space-y-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container chính: Đặt chiều cao 550px thoáng đãng trên màn hình lớn (lg:h-[550px]) */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Khung bài viết lớn bên trái (Chiếm 2/3) - Chiều cao lg:h-[550px] */}
        <div className="flex min-w-0 flex-col justify-between lg:col-span-2 lg:h-[540px]">
          {currentArticle && (
            <div className="group relative flex h-full flex-col justify-between">
              {/* Header text phần tin lớn */}
              <div className="mb-4 flex-none">
                {/* Tiêu đề bài viết lớn */}
                <Link href={{ pathname: "/tin-tuc/[slug]", params: { slug: currentArticle.slug } }}>
                  <h2 className="group-hover:text-brand-darkred line-clamp-2 text-2xl leading-tight font-bold tracking-[-0.025em] text-slate-900 transition-colors duration-150 sm:text-3xl">
                    {bigTitle}
                  </h2>
                </Link>

                {/* Tóm tắt mô tả Sapo */}
                {bigExcerpt && (
                  <p className="mt-3 line-clamp-2 max-w-[65ch] text-base leading-relaxed text-slate-600 sm:line-clamp-3">
                    {bigExcerpt}
                  </p>
                )}
              </div>

              {/* Khung ảnh chiếm toàn bộ chiều cao còn lại (flex-1 min-h-0) */}
              <div className="bg-surface relative min-h-[300px] w-full flex-1 overflow-hidden rounded-xl lg:min-h-0">
                {/* Ảnh lớn là LCP element, cấu hình priority={true} để tải ngay lập tức và tối ưu SEO LCP */}
                <SafeImage
                  src={bigImageUrl}
                  alt={bigTitle}
                  fill
                  priority={true}
                  sizes="(max-w-1024px) 100vw, 800px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Nút chuyển qua (Prev) bên trái ảnh */}
                {totalArticles > 1 && (
                  <button
                    onClick={handlePrev}
                    type="button"
                    className="hover:bg-brand-darkred absolute top-1/2 left-3 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white opacity-100 backdrop-blur-sm transition-colors duration-150 md:opacity-0 md:group-hover:opacity-100"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>
                )}

                {/* Nút chuyển lại (Next) bên phải ảnh */}
                {totalArticles > 1 && (
                  <button
                    onClick={handleNext}
                    type="button"
                    className="hover:bg-brand-darkred absolute top-1/2 right-3 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white opacity-100 backdrop-blur-sm transition-colors duration-150 md:opacity-0 md:group-hover:opacity-100"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>
                )}

                {/* Badge ghim đè lên ảnh */}
                {currentArticle.is_pinned && (
                  <div className="absolute top-4 left-4 z-10 select-none">
                    <span className="rounded-md bg-amber-600 px-2.5 py-1 text-xs font-semibold text-white">
                      {locale === "en" ? "Pinned" : "Ghim"}
                    </span>
                  </div>
                )}

                {/* Lớp phủ mờ ở đáy ảnh chứa Meta thông tin */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-slate-950/85 to-transparent p-4 pt-12 text-sm font-medium text-white select-none">
                  <span className="flex items-center gap-2">
                    <FolderOpen size={15} className="text-white/75" aria-hidden="true" />
                    <span>{bigCategoryName}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} aria-hidden="true" />
                    <span>{formatDate(bigPublishDate, locale)}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CỘT PHẢI: Bảng Tab tin mới nhất & tin xem nhiều (Chiếm 1/3) - Chiều cao lg:h-[550px] */}
        <div className="border-border flex min-w-0 flex-col overflow-hidden rounded-xl border bg-white lg:col-span-1 lg:h-[540px]">
          {/* Navigation Tab Header */}
          <div className="border-border bg-surface flex flex-none border-b select-none">
            <button
              onClick={() => setActiveTab("new")}
              type="button"
              className={`min-h-12 flex-1 border-b-2 px-3 text-center text-sm font-semibold transition-colors duration-150 ${
                activeTab === "new"
                  ? "border-brand-darkred text-brand-darkred bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-800"
              }`}
            >
              {locale === "en" ? "Latest" : "Tin mới nhất"}
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              type="button"
              className={`min-h-12 flex-1 border-b-2 px-3 text-center text-sm font-semibold transition-colors duration-150 ${
                activeTab === "popular"
                  ? "border-brand-darkred text-brand-darkred bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-800"
              }`}
            >
              {locale === "en" ? "Most Viewed" : "Tin xem nhiều"}
            </button>
          </div>

          {/* List bài viết động của Tab (Đồng bộ hai chiều với cột trái) */}
          <div ref={activeListRef} className="flex-1 scrollbar-none overflow-y-auto">
            {activeArticles.length > 0 ? (
              activeArticles.map((article, index) => {
                const title = getLocalizedField<string>(article, "title", locale);
                const categoryName = article.category
                  ? getLocalizedField<string>(article.category, "name", locale)
                  : "";
                const imageUrl = article.thumbnail_object_key || "/images/no-image-dhv.jpg";
                const isActive = index === activeIndex;

                return (
                  <div
                    key={article.id}
                    onClick={() => setActiveIndex(index)}
                    className={`group border-border-subtle hover:bg-surface flex cursor-pointer gap-3 border-b p-3.5 transition-colors duration-150 ${
                      isActive ? "bg-brand-darkred/[0.06]" : "last:border-b-transparent"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div
                      className={`bg-surface relative h-16 w-24 shrink-0 overflow-hidden rounded-md ring-1 ${
                        isActive ? "ring-brand-darkred/30" : "ring-border"
                      }`}
                    >
                      {/* Thiết lập loading="eager" để tải ảnh thumbnail ngay lập tức, vô hiệu hóa lazy load ngầm của trình duyệt. 
                          Ngăn chặn việc tráo đổi URL ảnh khi cuộn sidebar làm trình duyệt call ảnh liên tục. */}
                      <SafeImage
                        src={imageUrl}
                        alt={title}
                        fill
                        loading="eager"
                        sizes="100px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Tiêu đề & metadata */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                      <h4
                        className={`group-hover:text-brand-darkred line-clamp-2 text-sm leading-snug font-semibold transition-colors duration-150 ${
                          isActive ? "text-brand-darkred font-extrabold" : "text-slate-800"
                        }`}
                      >
                        {title}
                      </h4>

                      <div className="mt-2 flex items-center justify-between gap-2 text-xs font-medium text-slate-600">
                        <span className="text-brand-darkred max-w-[110px] truncate">
                          {categoryName}
                        </span>
                        <span>{formatDate(article.publish_at || article.created_at, locale)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-sm font-medium text-slate-600">
                {tCommon("no_data") || "Không có dữ liệu"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
