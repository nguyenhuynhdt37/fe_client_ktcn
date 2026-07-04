"use client";

import { useState, Suspense } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";
import { PortalArticleResponse, PortalArticleListResponse, PortalArticlePaginationResponse, PortalArticleListPaginationResponse, PortalTagResponse } from "../types";
import { CategoryTreeNode, CategorySidebarTree } from "@/features/category";
import { ArticleToolbar } from "./article-toolbar";
import { ArticleFilter } from "./article-filter";
import { ArticleList } from "./article-list";
import { ArticlePagination } from "./article-pagination";
import { ArticleEmpty } from "./article-empty";

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

  const breadcrumbItems = [
    { name: locale === "en" ? "Home" : "Trang chủ", href: "/" },
    { name: locale === "en" ? "News & Events" : "Tin tức & Sự kiện", href: "/tin-tuc" }
  ];

  if (filters.category) {
    const activeCategory = categories.find(c => c.slug === filters.category);
    const categoryName = activeCategory ? activeCategory.name : filters.category.split("-").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    breadcrumbItems.push({
      name: categoryName,
      href: `/tin-tuc?category=${filters.category}`
    });
  }

  return (
    <div suppressHydrationWarning className="max-w-7xl mx-auto px-6 py-12 space-y-6">
      {/* Khối Breadcrumb & Title */}
      <div suppressHydrationWarning className="flex flex-col gap-4 border-b border-border pb-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-2xl font-bold text-foreground uppercase tracking-wide">
          {tArticle("portal_title")}
        </h1>
      </div>

      {/* Sticky Toolbar chứa Search, Sort, và Filter chips */}
      <Suspense fallback={<div className="h-16 bg-muted animate-pulse border border-border" />}>
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
        <div className="lg:col-span-1 space-y-6">
          {/* Cây chuyên mục phân cấp đệ quy kèm số lượng bài viết */}
          <Suspense fallback={<div className="h-48 bg-muted animate-pulse border border-border" />}>
            <CategorySidebarTree tree={categories} />
          </Suspense>

          {/* Panel lọc thẻ tag multi-select style category */}
          <Suspense fallback={<div className="h-48 bg-muted animate-pulse border border-border" />}>
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
          <div className="bg-card border border-border p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
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
                <Suspense fallback={<div className="h-10 bg-muted animate-pulse border border-border" />}>
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
