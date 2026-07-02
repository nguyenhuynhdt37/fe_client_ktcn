"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useTransition } from "react";

interface ArticlePaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function ArticlePagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
}: ArticlePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("pagination");

  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPages || pageNum === currentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
    
    // Cuộn mượt mà lên đầu danh sách bài viết
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // Tính toán dãy trang hiển thị thông minh (tối đa 5 trang visible)
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(totalPages, maxVisible);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-6 border-t border-slate-100">
      {/* Nút Về Đầu (First) */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-darkred hover:border-brand-darkred disabled:opacity-30 disabled:pointer-events-none transition rounded-none bg-white cursor-pointer"
        title={t("first")}
      >
        <ChevronsLeft size={14} />
      </button>

      {/* Nút Trước (Previous) */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-darkred hover:border-brand-darkred disabled:opacity-30 disabled:pointer-events-none transition rounded-none bg-white cursor-pointer"
        title={t("prev")}
      >
        <ChevronLeft size={14} />
      </button>

      {/* Nút Số Trang */}
      {visiblePages.map((p) => {
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3.5 py-1.5 border text-xs font-bold transition rounded-none cursor-pointer ${
              isActive
                ? "bg-brand-darkred text-white border-brand-darkred"
                : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-darkred hover:border-brand-darkred bg-white"
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Nút Tiếp (Next) */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
        className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-darkred hover:border-brand-darkred disabled:opacity-30 disabled:pointer-events-none transition rounded-none bg-white cursor-pointer"
        title={t("next")}
      >
        <ChevronRight size={14} />
      </button>

      {/* Nút Cuối (Last) */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-brand-darkred hover:border-brand-darkred disabled:opacity-30 disabled:pointer-events-none transition rounded-none bg-white cursor-pointer"
        title={t("last")}
      >
        <ChevronsRight size={14} />
      </button>
    </div>
  );
}
