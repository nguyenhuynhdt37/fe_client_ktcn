"use client";

import { useState, Suspense } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";
import { PortalArticleResponse, PortalArticleListResponse, PortalArticlePaginationResponse, PortalArticleListPaginationResponse, PortalTagResponse } from "../types/article.types";
import { CategoryTreeNode, CategorySidebarTree } from "@/features/category";
import { ArticleToolbar } from "./ArticleToolbar";
import { ArticleFilter } from "./ArticleFilter";
import { ArticleList } from "./ArticleList";
import { ArticlePagination } from "./ArticlePagination";
import { ArticleEmpty } from "./ArticleEmpty";
import { getLocalizedField } from "../utils/map-article";

interface ArticlePortalContainerProps {
  articles: (PortalArticleResponse | PortalArticleListResponse)[];
  pagination: PortalArticlePaginationResponse | PortalArticleListPaginationResponse;
  categories: CategoryTreeNode[];
  tags: PortalTagResponse[];
  filters: {
    page: number;
    q: string;
    category: string;
    tag: string; // Hỗ trợ danh sách tag slug phân tách bằng dấu phẩy
    sort_by: string;
    sort_dir: string;
  };
  locale: string;
}

export function ArticlePortalContainer({
  articles,
  pagination,
  categories,
  tags,
  filters,
  locale,
}: ArticlePortalContainerProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const tCommon = useTranslations("common");
  const tArticle = useTranslations("article");

  // Cấu hình breadcrumbs động và chuẩn hóa
  const breadcrumbItems = [
    { name: locale === "en" ? "Home" : "Trang chủ", href: "/" },
  ];

  if (filters.q || filters.category || filters.tag) {
    breadcrumbItems.push({
      name: locale === "en" ? "Search" : "Tìm kiếm",
      href: "/tin-tuc"
    });
  } else {
    breadcrumbItems.push({
      name: locale === "en" ? "Search Articles" : "Tìm kiếm bài viết",
      href: "/tin-tuc"
    });
  }

  if (filters.category) {
    const activeCategory = categories.find(c => c.slug === filters.category);
    const categoryName = activeCategory ? getLocalizedField<string>(activeCategory, "name", locale) : filters.category;
    breadcrumbItems.push({
      name: categoryName || filters.category,
      href: `/tin-tuc?category_slug=${filters.category}`
    });
  }

  if (filters.tag) {
    const activeTagSlugs = filters.tag.split(",");
    if (activeTagSlugs.length === 1) {
      const tg = tags.find(t => t.slug === activeTagSlugs[0]);
      const tagName = tg ? getLocalizedField<string>(tg, "name", locale) : activeTagSlugs[0];
      breadcrumbItems.push({
        name: tagName || activeTagSlugs[0],
        href: `/tin-tuc?tag_slug=${filters.tag}`
      });
    }
  }

  // Xác định tiêu đề chính và tiêu đề phụ (số lượng kết quả)
  let pageTitle = locale === "en" ? "Search Articles" : "Tìm kiếm bài viết";
  let subTitle = "";

  if (filters.q) {
    pageTitle = locale === "en" ? "Search Results" : "Kết quả tìm kiếm";
    subTitle = locale === "en" 
      ? `Found ${pagination.total_items} results for "${filters.q}"` 
      : `Tìm thấy ${pagination.total_items} kết quả cho từ khóa "${filters.q}"`;
  } else if (filters.category) {
    const activeCategory = categories.find(c => c.slug === filters.category);
    const categoryName = activeCategory ? getLocalizedField<string>(activeCategory, "name", locale) : filters.category;
    pageTitle = categoryName || filters.category;
    subTitle = locale === "en"
      ? `Found ${pagination.total_items} articles in this category`
      : `Tìm thấy ${pagination.total_items} bài viết trong chuyên mục này`;
  } else if (filters.tag) {
    const activeTagSlugs = filters.tag.split(",");
    if (activeTagSlugs.length === 1) {
      const tg = tags.find(t => t.slug === activeTagSlugs[0]);
      const tagName = tg ? getLocalizedField<string>(tg, "name", locale) : activeTagSlugs[0];
      pageTitle = locale === "en" ? `Articles Tagged: ${tagName}` : `Bài viết thẻ: ${tagName}`;
    } else {
      pageTitle = locale === "en" ? "Filtered Articles" : "Bài viết đã lọc";
    }
    subTitle = locale === "en"
      ? `Found ${pagination.total_items} articles`
      : `Tìm thấy ${pagination.total_items} bài viết`;
  } else {
    subTitle = locale === "en"
      ? `Total of ${pagination.total_items} articles available`
      : `Tìm thấy tất cả ${pagination.total_items} bài viết`;
  }

  return (
    <div suppressHydrationWarning className="max-w-[1360px] mx-auto px-6 py-14 md:py-20 space-y-6">
      {/* Khối Breadcrumb & Title */}
      <div suppressHydrationWarning className="flex flex-col gap-3 border-b border-slate-100/80 pb-5">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {pageTitle}
          </h1>
          {subTitle && (
            <p className="text-[13px] text-slate-500 font-semibold bg-slate-50 border border-slate-100/60 px-3 py-1 rounded-sm">
              {subTitle}
            </p>
          )}
        </div>
      </div>

      {/* Sticky Toolbar chứa Search, Sort, và Filter chips */}
      <Suspense fallback={<div className="h-16 bg-slate-50 animate-pulse border border-slate-100/60 rounded-sm" />}>
        <ArticleToolbar
          categories={categories}
          tags={tags}
          currentFilters={{
            category: filters.category,
            tag: filters.tag,
          }}
          searchQuery={filters.q}
          sortBy={filters.sort_by}
          sortDir={filters.sort_dir}
          onOpenFilter={() => setIsFilterOpen(true)}
        />
      </Suspense>

      {/* Layout 2 Cột */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR TRÁI (Desktop) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-36 self-start">
          {/* Cây chuyên mục phân cấp đệ quy kèm số lượng bài viết */}
          <Suspense fallback={<div className="h-48 bg-slate-50 animate-pulse border border-slate-100/60 rounded-sm" />}>
            <CategorySidebarTree tree={categories} />
          </Suspense>

          {/* Panel lọc thẻ tag multi-select style category */}
          <Suspense fallback={<div className="h-48 bg-slate-50 animate-pulse border border-slate-100/60 rounded-sm" />}>
            <ArticleFilter
              tags={tags}
              currentTagFilter={filters.tag}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </Suspense>
        </div>

        {/* CỘT CHÍNH (Phải - 75%) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-100/60 rounded-sm p-6 min-h-[400px] flex flex-col justify-between">
            <div>
              {articles.length > 0 ? (
                <ArticleList articles={articles} />
              ) : (
                <ArticleEmpty />
              )}
            </div>

            {/* Phân trang số nâng cao */}
            {articles.length > 0 && (
              <div className="mt-8">
                <Suspense fallback={<div className="h-10 bg-slate-50 animate-pulse border border-slate-100/60 rounded-sm" />}>
                  <ArticlePagination
                    currentPage={pagination.page}
                    totalPages={pagination.total_pages}
                    hasNext={pagination.has_next}
                    hasPrevious={pagination.has_previous}
                  />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

