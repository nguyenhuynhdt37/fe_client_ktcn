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
        const targetScrollTop = relativeTop - (container.clientHeight / 2) + (activeRect.height / 2);

        container.scrollTo({
          top: targetScrollTop,
          behavior: "smooth"
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
  const bigExcerpt = currentArticle ? getLocalizedField<string>(currentArticle, "excerpt", locale) : "";
  const bigCategoryName = currentArticle && currentArticle.category ? getLocalizedField<string>(currentArticle.category, "name", locale) : "";
  const bigImageUrl = currentArticle ? (currentArticle.thumbnail_object_key || "/images/no-image-dhv.jpg") : "/images/no-image-dhv.jpg";
  const bigPublishDate = currentArticle ? (currentArticle.publish_at || currentArticle.created_at) : "";

  return (
    <div
      className="space-y-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Heading */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          {tCommon("news_heading") || (locale === "en" ? "Latest News & Highlights" : "Tin tức và Sự kiện nổi bật")}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          {tCommon("news_subtext") || (locale === "en" ? "Stay updated with the latest activities and events" : "Cập nhật những hoạt động và sự kiện mới nhất")}
        </p>
      </div>

      {/* Container chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Khung bài viết lớn bên trái (Chiếm 2/3) - Chiều cao lg:h-[550px] */}
        <div className="lg:col-span-2 flex flex-col lg:h-[550px] min-w-0 justify-between">
          {currentArticle && (
            <div className="group flex flex-col h-full justify-between relative">

              {/* Header text phần tin lớn */}
              <div className="flex-none mb-4">
                {/* Tiêu đề bài viết lớn */}
                <Link href={{ pathname: "/tin-tuc/[slug]", params: { slug: currentArticle.slug } }}>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-normal group-hover:text-brand-darkred hover:underline transition-colors duration-200 line-clamp-2">
                    {bigTitle}
                  </h2>
                </Link>

                {/* Tóm tắt mô tả Sapo */}
                {bigExcerpt && (
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mt-3.5 line-clamp-2 sm:line-clamp-3">
                    {bigExcerpt}
                  </p>
                )}
              </div>

              {/* Khung ảnh chiếm toàn bộ chiều cao còn lại (flex-1 min-h-0) */}
              <div className="flex-1 min-h-[280px] lg:min-h-0 relative w-full overflow-hidden bg-slate-50 border border-slate-100/60  rounded-sm">
                {/* Ảnh lớn là LCP element, cấu hình priority={true} để tải ngay lập tức và tối ưu SEO LCP */}
                <SafeImage
                  src={bigImageUrl}
                  alt={bigTitle}
                  fill
                  priority={true}
                  sizes="(max-w-1024px) 100vw, 800px"
                  className="object-cover"
                />

                {/* Nút chuyển qua (Prev) bên trái ảnh */}
                {totalArticles > 1 && (
                  <button
                    onClick={handlePrev}
                    type="button"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-brand-darkred text-white p-2.5 rounded-sm transition-all duration-200 z-20 cursor-pointer opacity-0 group-hover:opacity-100 backdrop-blur-xs flex items-center justify-center border border-white/10"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* Nút chuyển lại (Next) bên phải ảnh */}
                {totalArticles > 1 && (
                  <button
                    onClick={handleNext}
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-brand-darkred text-white p-2.5 rounded-sm transition-all duration-200 z-20 cursor-pointer opacity-0 group-hover:opacity-100 backdrop-blur-xs flex items-center justify-center border border-white/10"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={22} />
                  </button>
                )}

                {/* Badge ghim đè lên ảnh */}
                {currentArticle.is_pinned && (
                  <div className="absolute top-4 left-4 z-10 select-none animate-pulse">
                    <span className="bg-amber-500 text-white text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1  rounded-sm">
                      {locale === "en" ? "Pinned" : "Ghim"}
                    </span>
                  </div>
                )}

                {/* Lớp phủ mờ ở đáy ảnh chứa Meta thông tin */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent p-4 flex items-center justify-between text-white text-[11px] font-semibold z-10 select-none">
                  <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 text-xs rounded-sm">
                    <FolderOpen size={12} className="text-slate-300" />
                    <span className="uppercase tracking-wider font-bold">{bigCategoryName}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5">
                    <CalendarDays size={11} />
                    <span>{formatDate(bigPublishDate, locale)}</span>
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* CỘT PHẢI: Bảng Tab tin mới nhất & tin xem nhiều (Chiếm 1/3) - Chiều cao lg:h-[550px] */}
        <div className="lg:col-span-1 bg-white border border-slate-100/60 flex flex-col lg:h-[550px] min-w-0 rounded-sm overflow-hidden">

          {/* Navigation Tab Header */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 flex-none select-none">
            <button
              onClick={() => setActiveTab("new")}
              type="button"
              className={`flex-1 text-center py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${activeTab === "new"
                  ? "border-brand-darkred text-brand-darkred bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
            >
              {locale === "en" ? "Latest" : "Tin mới nhất"}
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              type="button"
              className={`flex-1 text-center py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${activeTab === "popular"
                  ? "border-brand-darkred text-brand-darkred bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
            >
              {locale === "en" ? "Most Viewed" : "Tin xem nhiều"}
            </button>
          </div>

          {/* List bài viết động của Tab (Đồng bộ hai chiều với cột trái) */}
          <div
            ref={activeListRef}
            className="flex-1 overflow-y-auto scrollbar-none"
          >
            {activeArticles.length > 0 ? (
              activeArticles.map((article, index) => {
                const title = getLocalizedField<string>(article, "title", locale);
                const categoryName = article.category ? getLocalizedField<string>(article.category, "name", locale) : "";
                const imageUrl = article.thumbnail_object_key || "/images/no-image-dhv.jpg";
                const isActive = index === activeIndex;

                return (
                  <div
                    key={article.id}
                    onClick={() => setActiveIndex(index)}
                    className={`p-3.5 flex gap-4 hover:bg-slate-50/80 transition-all duration-200 group cursor-pointer border-l-4 ${isActive
                        ? "bg-brand-darkred/[0.04] border-l-brand-darkred border-b-transparent  ring-1 ring-brand-darkred/10"
                        : "border-l-transparent border-b border-slate-100/80 last:border-b-transparent"
                      }`}
                  >
                    {/* Thumbnail */}
                    <div className={`relative w-24 h-16 shrink-0 overflow-hidden bg-slate-50 border rounded-sm ${isActive ? "border-brand-darkred/30" : "border-slate-100"
                      }`}>
                      {/* Thiết lập loading="eager" để tải ảnh thumbnail ngay lập tức, vô hiệu hóa lazy load ngầm của trình duyệt. 
                          Ngăn chặn việc tráo đổi URL ảnh khi cuộn sidebar làm trình duyệt call ảnh liên tục. */}
                      <SafeImage
                        src={imageUrl}
                        alt={title}
                        fill
                        loading="eager"
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>

                    {/* Tiêu đề & metadata */}
                    <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                      <h4 className={`text-sm font-bold leading-normal group-hover:text-brand-darkred transition-colors duration-150 line-clamp-2 ${isActive ? "text-brand-darkred" : "text-slate-800"
                        }`}>
                        {title}
                      </h4>

                      <div className="flex items-center justify-between mt-2 text-xs text-slate-400 font-medium">
                        <span className="text-brand-darkred font-bold uppercase tracking-wider text-[11px] bg-brand-darkred/5 px-2 py-0.5 truncate max-w-[100px] rounded-sm">
                          {categoryName}
                        </span>
                        <span>
                          {formatDate(article.publish_at || article.created_at, locale)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs font-semibold">
                {tCommon("no_data") || "Không có dữ liệu"}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
