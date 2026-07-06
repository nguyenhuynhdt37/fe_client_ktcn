"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { X, RefreshCw, Tag as TagIcon } from "lucide-react";
import { useTransition } from "react";
import { PortalTagResponse } from "../types/article.types";
import { getLocalizedField } from "../utils/map-article";

interface ArticleFilterProps {
  tags: PortalTagResponse[];
  currentTagFilter: string; // Chuỗi các tag slug phân tách bằng dấu phẩy (ví dụ: "cntt,tuyen-sinh")
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleFilter({
  tags,
  currentTagFilter,
  isOpen,
  onClose,
}: ArticleFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const tCommon = useTranslations("common");
  const tArticle = useTranslations("article");

  // Mảng các tag slug đang hoạt động
  const currentTag = searchParams.get("tag_slug") || searchParams.get("tag") || "";
  const activeTagSlugs = currentTag ? currentTag.split(",") : [];

  // Danh sách các tag đang active trong database
  const activeTags = tags.filter((t) => t.is_active);

  const handleToggleTag = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let nextSlugs = [...activeTagSlugs];

    if (nextSlugs.includes(slug)) {
      nextSlugs = nextSlugs.filter((s) => s !== slug);
    } else {
      nextSlugs.push(slug);
    }

    if (nextSlugs.length > 0) {
      params.set("tag_slug", nextSlugs.join(","));
      params.delete("tag");
    } else {
      params.delete("tag_slug");
      params.delete("tag");
    }

    params.set("page", "1"); // Tự động reset về trang 1
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}` as any, { scroll: false });
    });
  };

  const handleClearTags = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag_slug");
    params.delete("tag");
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}` as any, { scroll: false });
    });
  };

  const isAnyTagActive = activeTagSlugs.length > 0;

  const filterContent = (
    <div className={`bg-white border border-slate-100/60 overflow-hidden rounded-sm transition-opacity ${
      isPending ? "opacity-60" : "opacity-100"
    }`}>
      {/* Header Banner đỏ đậm */}
      <div className="bg-brand-darkred py-3 px-4 text-center">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          {tArticle("tags")}
        </h3>
      </div>

      {/* Lựa chọn xem tất cả thẻ tag */}
      <div className="border-b border-slate-100/50">
        <button
          onClick={handleClearTags}
          type="button"
          className={`w-full text-left py-3 px-4 text-sm font-semibold transition duration-150 cursor-pointer ${
            !isAnyTagActive
              ? "text-brand-yellow font-bold bg-white/40"
              : "text-slate-800 hover:text-brand-darkred"
          }`}
        >
          {tArticle("all_tags")}
        </button>
      </div>

      {/* Danh sách các thẻ tag dưới dạng checkbox */}
      <div className="divide-y divide-slate-200/50 max-h-[350px] overflow-y-auto">
        {activeTags.map((t) => {
          const isSelected = activeTagSlugs.includes(t.slug);
          const tagName = getLocalizedField<string>(t, "name", locale);
          return (
            <label
              key={t.id}
              className={`flex items-center justify-between py-2.5 px-4 text-xs font-semibold cursor-pointer transition select-none hover:bg-slate-200/40 ${
                isSelected
                  ? "text-brand-yellow font-bold bg-white/30"
                  : "text-slate-700 hover:text-brand-darkred"
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggleTag(t.slug)}
                  className="w-3.5 h-3.5 text-brand-darkred border-slate-100 rounded-sm focus:ring-brand-darkred accent-brand-darkred cursor-pointer"
                />
                {/* Icon Tag nhỏ có màu chỉ định từ backend DB */}
                <TagIcon
                  size={11}
                  className="shrink-0 transition-colors"
                  style={t.color ? { color: t.color } : { color: "#94a3b8" }}
                />
                <span className="truncate">{tagName}</span>
              </div>

              {/* Badge số lượng bài viết của tag */}
              <span className="text-[9px] font-bold text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded-full shrink-0">
                {t.article_count ?? t.usage_count ?? 0}
              </span>
            </label>
          );
        })}
      </div>

      {/* Nút đặt lại nhanh */}
      {isAnyTagActive && (
        <div className="p-3 bg-white border-t border-slate-100/50 flex justify-center">
          <button
            onClick={handleClearTags}
            type="button"
            className="flex items-center gap-1.5 text-[11px] font-bold text-brand-darkred hover:text-brand-darkred-dark hover:underline cursor-pointer"
          >
            <RefreshCw size={11} />
            <span>{locale === "en" ? "Clear selection" : "Xóa các thẻ đã chọn"}</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Giao diện Desktop sidebar */}
      <div className="hidden lg:block h-fit sticky top-24">
        {filterContent}
      </div>

      {/* Giao diện Mobile Drawer/Sheet */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        />

        {/* Drawer content trượt từ bên phải */}
        <div
          className={`absolute top-0 right-0 w-80 max-w-full h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 z-10 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header Drawer */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              {tArticle("filter_by_tags")}
            </h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Drawer */}
          <div className="flex-1 overflow-y-auto p-6">
            {filterContent}
          </div>

          {/* Footer Drawer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3 shrink-0">
            <button
              onClick={handleClearTags}
              disabled={!isAnyTagActive}
              className="flex-1 border border-slate-100/60 text-slate-600 hover:bg-slate-100 disabled:opacity-50 py-2.5 text-xs font-bold transition rounded-sm cursor-pointer"
            >
              {locale === "en" ? "Reset" : "Đặt lại"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-brand-darkred text-white hover:bg-brand-darkred-dark py-2.5 text-xs font-bold transition rounded-sm cursor-pointer"
            >
              {locale === "en" ? "Close" : "Đóng"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
