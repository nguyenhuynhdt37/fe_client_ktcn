"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CategoryTreeNode } from "../types";
import { resolveCategoryName, resolveCategorySlug, isCategorySlugMatch } from "../utils/resolve";

interface CategorySidebarTreeProps {
  tree: CategoryTreeNode[];
}

export function CategorySidebarTree({ tree }: CategorySidebarTreeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const activeCategorySlug = searchParams.get("category_slug") || searchParams.get("category") || "";
  const tArticle = useTranslations("article");
  
  // Trạng thái Transition giúp điều hướng mượt mà, không bị kích hoạt Suspense skeleton nhấp nháy trang
  const [isPending, startTransition] = useTransition();

  // Quản lý trạng thái mở rộng của danh mục cha theo ID danh mục
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Tự động mở rộng các danh mục cha khi load trang nếu có danh mục con đang được chọn
  useEffect(() => {
    if (!activeCategorySlug) return;

    const findActivePath = (
      nodes: CategoryTreeNode[],
      targetSlug: string,
      path: string[] = []
    ): string[] | null => {
      for (const node of nodes) {
        if (isCategorySlugMatch(node, targetSlug)) {
          return path;
        }
        if (node.children && node.children.length > 0) {
          const found = findActivePath(node.children, targetSlug, [...path, node.id]);
          if (found) return found;
        }
      }
      return null;
    };

    const activePath = findActivePath(tree, activeCategorySlug);
    if (activePath && activePath.length > 0) {
      setExpanded((prev) => {
        const next = { ...prev };
        activePath.forEach((id) => {
          next[id] = true;
        });
        return next;
      });
    }
  }, [activeCategorySlug, tree]);

  // Hàm sinh URL giữ nguyên các query params khác của trang
  const getCategoryUrl = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category_slug", slug);
      params.delete("category");
      params.delete("tag"); // Reset lọc tag khi chọn category
      params.delete("tag_slug");
    } else {
      params.delete("category");
      params.delete("category_slug");
    }
    params.set("page", "1"); // Quay về trang 1
    return `/tin-tuc?${params.toString()}`;
  };

  const handleNavigate = (slug: string | null) => {
    const url = getCategoryUrl(slug);
    startTransition(() => {
      // scroll: false ngăn Next.js tự động cuộn trang lên đầu
      router.push(url as any, { scroll: false });
    });
  };

  const handleToggleExpand = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Render một Node danh mục và các node con của nó đệ quy
  const renderNode = (node: CategoryTreeNode, depth: number = 0) => {
    const isSelected = isCategorySlugMatch(node, activeCategorySlug);
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = !!expanded[node.id];
    const categoryName = resolveCategoryName(node, locale);
    const localizedSlug = resolveCategorySlug(node, locale);

    // Node cha (depth === 0)
    if (depth === 0) {
      return (
        <div key={node.id} className="border-b border-slate-200/50 last:border-b-0">
          {/* Dòng danh mục cha */}
          <div className="flex items-center justify-between group">
            <button
              onClick={() => {
                handleNavigate(localizedSlug);
                if (hasChildren) {
                  setExpanded((prev) => ({ ...prev, [node.id]: true }));
                }
              }}
              type="button"
              className={`flex-1 text-left py-3 px-4 text-sm font-semibold transition duration-150 flex items-center justify-between cursor-pointer ${
                isSelected
                  ? "text-brand-yellow font-bold bg-white/10"
                  : "text-slate-800 hover:text-brand-darkred"
              }`}
            >
              <span className="truncate">{categoryName}</span>
              
              {/* Badge số lượng khi không có danh mục con */}
              {!hasChildren && (
                <span className="text-[9px] font-bold text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded-full shrink-0 ml-2">
                  {node.article_count}
                </span>
              )}
            </button>

            {/* Mũi tên đóng mở bên phải và badge số lượng khi có danh mục con */}
            {hasChildren && (
              <div className="flex items-center gap-1 shrink-0 pr-1">
                <span className="text-[9px] font-bold text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded-full">
                  {node.article_count}
                </span>
                <button
                  onClick={(e) => handleToggleExpand(e, node.id)}
                  type="button"
                  className="p-3 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            )}
          </div>

          {/* Các danh mục con hiển thị thụt lề nếu danh mục cha mở */}
          {hasChildren && isExpanded && (
            <div className="bg-slate-100/30 pb-2 space-y-0.5">
              {node.children.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // Node con (depth > 0)
    return (
      <div key={node.id} className="space-y-0.5">
        <button
          onClick={() => handleNavigate(localizedSlug)}
          type="button"
          className={`w-full flex items-center justify-between py-2 px-6 text-xs font-semibold transition duration-150 hover:bg-slate-200/50 cursor-pointer ${
            isSelected
              ? "text-brand-yellow font-bold"
              : "text-slate-700 hover:text-brand-darkred"
          }`}
          style={{ paddingLeft: `${depth * 14 + 14}px` }}
        >
          <div className="flex items-center gap-2 truncate">
            {/* Ký tự hình thoi nhỏ đầu dòng ◆ */}
            <span className="text-slate-400 text-[10px] shrink-0">◆</span>
            <span className="truncate">{categoryName}</span>
          </div>
          
          {/* Số lượng bài viết bên cạnh */}
          <span className="text-[9px] font-bold text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded-full shrink-0">
            {node.article_count}
          </span>
        </button>

        {/* Đệ quy tiếp tục nếu có con sâu hơn */}
        {hasChildren && isExpanded && (
          <div className="space-y-0.5">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-slate-100/60 border border-slate-200/60 shadow-sm overflow-hidden rounded-none transition-opacity ${
      isPending ? "opacity-60" : "opacity-100"
    }`}>
      {/* Header Banner đỏ đậm */}
      <div className="bg-brand-darkred py-3 px-4 text-center">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          {tArticle("filter_by_categories")}
        </h3>
      </div>

      {/* Lựa chọn xem tất cả bài viết */}
      <div className="border-b border-slate-200/50">
        <button
          onClick={() => handleNavigate(null)}
          type="button"
          className={`w-full text-left py-3 px-4 text-sm font-semibold transition duration-150 cursor-pointer ${
            !activeCategorySlug
              ? "text-brand-yellow font-bold bg-white/40"
              : "text-slate-800 hover:text-brand-darkred"
          }`}
        >
          {tArticle("all_articles")}
        </button>
      </div>

      {/* Danh sách cây danh mục */}
      <div className="divide-y divide-slate-200/50">
        {tree.map((node) => renderNode(node))}
      </div>
    </div>
  );
}
