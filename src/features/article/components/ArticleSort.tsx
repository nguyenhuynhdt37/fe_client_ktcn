"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { useTransition } from "react";

interface ArticleSortProps {
  currentSortBy: string;
  currentSortDir: string;
}

export function ArticleSort({ currentSortBy, currentSortDir }: ArticleSortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("sort");

  // Mặc định
  const sortBy = currentSortBy || "publish_at";
  const sortDir = currentSortDir || "desc";

  const updateSort = (newSortBy: string, newSortDir: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Cập nhật params
    if (newSortBy === "publish_at") {
      params.delete("sort_by");
    } else {
      params.set("sort_by", newSortBy);
    }

    if (newSortDir === "desc") {
      params.delete("sort_dir");
    } else {
      params.set("sort_dir", newSortDir);
    }

    // Giữ nguyên filter, chỉ reset page về 1
    params.set("page", "1");
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}` as any, { scroll: false });
    });
  };

  const handleSortByChange = (value: string) => {
    updateSort(value, sortDir);
  };

  const toggleSortDir = () => {
    const nextDir = sortDir === "desc" ? "asc" : "desc";
    updateSort(sortBy, nextDir);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{t("label")}:</span>
      <div className="flex items-center border border-slate-100/60 bg-white">
        <select
          value={sortBy}
          onChange={(e) => handleSortByChange(e.target.value)}
          className="pl-3 pr-8 py-1.5 text-xs text-slate-700 bg-transparent focus:outline-none cursor-pointer border-none"
        >
          <option value="publish_at">{t("newest")}</option>
          <option value="view_count">{t("most_viewed")}</option>
          <option value="title">{locale === "en" ? "Title (A-Z)" : "Tiêu đề (A-Z)"}</option>
          <option value="created_at">{locale === "en" ? "Date created" : "Ngày tạo"}</option>
        </select>
        
        {/* Nút toggle Ascending / Descending */}
        <button
          onClick={toggleSortDir}
          type="button"
          title={sortDir === "desc" ? (locale === "en" ? "Descending" : "Giảm dần") : (locale === "en" ? "Ascending" : "Tăng dần")}
          className="px-2.5 py-1.5 border-l border-slate-100 text-slate-500 hover:text-brand-darkred hover:bg-slate-50 transition"
        >
          {sortDir === "desc" ? <ArrowDownAZ size={14} /> : <ArrowUpAZ size={14} />}
        </button>
      </div>
    </div>
  );
}
