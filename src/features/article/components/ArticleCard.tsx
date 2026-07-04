"use client";

import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { FolderOpen, CalendarDays, Eye, Tag as TagIcon, User, Pin } from "lucide-react";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { PortalArticleResponse, PortalArticleListResponse } from "../types/article.types";
import { formatDate, getLocalizedField } from "../utils/map-article";

interface ArticleCardProps {
  article: PortalArticleResponse | PortalArticleListResponse;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const locale = useLocale();
  const tArticle = useTranslations("article");

  // Backend trả về Full URL tuyệt đối trong thumbnail_object_key, sử dụng trực tiếp
  const imageUrl = article.thumbnail_object_key || "/images/no-image-dhv.jpg";
  const articleHref = { pathname: "/tin-tuc/[slug]" as const, params: { slug: article.slug } };

  // Lấy các trường dịch động
  const title = getLocalizedField<string>(article, "title", locale);
  const excerpt = getLocalizedField<string>(article, "excerpt", locale);
  const categoryName = getLocalizedField<string>(article.category, "name", locale);

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-5 sm:p-6 border border-slate-100 hover:border-slate-200/80 bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300 group rounded-none mb-5 last:mb-0">
      
      {/* Khung ảnh bên trái */}
      <div className="relative w-full sm:w-56 aspect-[16/10] shrink-0 overflow-hidden bg-slate-50 border border-slate-100/80 rounded-none">
        <Link href={articleHref} className="block w-full h-full relative">
          <SafeImage
            src={imageUrl}
            alt={title}
            fill
            priority={priority}
            sizes="(max-w-768px) 100vw, 240px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Badge Ghim góc trên ảnh với fallback an toàn cho i18n */}
        {article.is_pinned && (
          <div className="absolute top-2.5 left-2.5 z-10 select-none animate-pulse">
            <span className="bg-amber-500 text-white px-2 py-0.75 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Pin size={9} className="fill-white rotate-[30deg]" />
              <span>{tArticle("pinned") || (locale === "en" ? "Pinned" : "Ghim")}</span>
            </span>
          </div>
        )}
      </div>

      {/* Nội dung bên phải */}
      <div className="flex flex-col justify-between flex-1 py-0.5 space-y-3 min-w-0">
        <div className="space-y-2.5">
          {/* Tiêu đề bài viết */}
          <Link href={articleHref}>
            <h3 className="text-[16px] font-extrabold text-slate-800 leading-snug group-hover:text-brand-darkred hover:underline transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
          </Link>
          
          {/* Tóm tắt Sapo */}
          {excerpt && (
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium line-clamp-2 sm:line-clamp-3">
              {excerpt}
            </p>
          )}
        </div>

        {/* Thông tin metadata */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10.5px] text-slate-400 font-medium">
          
          {/* Chuyên mục */}
          {article.category && (
            <Link
              href={`/tin-tuc?category_slug=${article.category.slug}` as any}
              className="flex items-center gap-1 text-brand-darkred font-extrabold hover:text-brand-darkred-dark transition-colors duration-150 bg-brand-darkred/5 px-2 py-0.5 uppercase tracking-wider text-[9px]"
            >
              <FolderOpen size={11} className="text-brand-darkred/70" />
              <span>{categoryName}</span>
            </Link>
          )}

          {/* Tác giả */}
          {article.author && (
            <Link
              href={`/tin-tuc?author_username=${article.author.username}` as any}
              className="flex items-center gap-1 hover:text-brand-darkred transition-colors duration-150 text-slate-500 font-semibold bg-slate-50 px-2 py-0.5"
            >
              <User size={11} className="text-slate-400" />
              <span>{article.author.full_name || article.author.username}</span>
            </Link>
          )}

          {/* Ngày đăng */}
          <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 text-slate-400">
            <CalendarDays size={11} />
            <span>{formatDate(article.published_at || article.publish_at || article.created_at, locale)}</span>
          </span>

          {/* Lượt xem */}
          <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 text-slate-400">
            <Eye size={11} />
            <span>{article.view_count} {tArticle("views")}</span>
          </span>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 ml-auto sm:ml-4">
              {article.tags.slice(0, 2).map((t) => {
                const tagName = getLocalizedField<string>(t, "name", locale);
                return (
                  <Link
                    key={t.slug}
                    href={`/tin-tuc?tag_slug=${t.slug}` as any}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200/60 px-2 py-0.5 text-[9px] uppercase font-bold flex items-center gap-1 rounded-none transition-colors duration-150"
                    style={t.color ? { color: t.color, borderColor: `${t.color}30` } : undefined}
                  >
                    <TagIcon size={8} />
                    <span>{tagName}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
