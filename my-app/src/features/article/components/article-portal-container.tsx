"use client";

import { useState, Suspense } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { PortalArticleResponse, PortalArticlePaginationResponse, PortalTagResponse } from "../types";
import { CategoryTreeNode, CategorySidebarTree } from "@/features/category";
import { ArticleToolbar } from "./article-toolbar";
import { ArticleFilter } from "./article-filter";
import { ArticleList } from "./article-list";
import { ArticlePagination } from "./article-pagination";
import { ArticleEmpty } from "./article-empty";

interface ArticlePortalContainerProps {
  articles: PortalArticleResponse[];
  pagination: PortalArticlePaginationResponse;
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-6 bg-slate-50/20">
      {/* Khối Breadcrumb & Title */}
      <div className="flex flex-col gap-1 border-b border-slate-200/60 pb-4">
        <div className="text-xs text-slate-400 font-medium space-x-2">
          <Link href="/" className="hover:text-brand-darkred transition">
            {tCommon("home")}
          </Link>
          <span>/</span>
          <span className="text-slate-600">{tArticle("title")}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">
          {tArticle("portal_title")}
        </h1>
      </div>

      {/* Sticky Toolbar chứa Search, Sort, và Filter chips */}
      <Suspense fallback={<div className="h-16 bg-slate-100 animate-pulse border border-slate-200/60" />}>
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
          <Suspense fallback={<div className="h-48 bg-slate-100 animate-pulse border border-slate-200/60" />}>
            <CategorySidebarTree tree={categories} />
          </Suspense>

          {/* Panel lọc thẻ tag multi-select style category */}
          <Suspense fallback={<div className="h-48 bg-slate-100 animate-pulse border border-slate-200/60" />}>
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
          <div className="bg-white border border-slate-200/60 p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
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
                <Suspense fallback={<div className="h-10 bg-slate-100 animate-pulse border border-slate-200/60" />}>
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
