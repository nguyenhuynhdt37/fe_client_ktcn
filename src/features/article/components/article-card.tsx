"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { FolderOpen, CalendarDays, Eye, Tag as TagIcon, User, Pin, Award } from "lucide-react";
import { PortalArticleResponse } from "../types";
import { formatDate, getLocalizedField } from "../utils/map-article";

interface ArticleCardProps {
  article: PortalArticleResponse;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const locale = useLocale();
  const tArticle = useTranslations("article");

  // Backend trả về Full URL tuyệt đối trong thumbnail_object_key, sử dụng trực tiếp
  const imageUrl = article.thumbnail_object_key || "/images/no-image-dhv.jpg";
  const articleHref = `/tin-tuc/${article.slug}`;

  // Lấy các trường dịch động
  const title = getLocalizedField<string>(article, "title", locale);
  const excerpt = getLocalizedField<string>(article, "excerpt", locale);
  const categoryName = getLocalizedField<string>(article.category, "name", locale);

  return (
    <div className="flex flex-col sm:flex-row gap-6 py-6 border-b border-slate-100 group first:pt-0 last:border-b-0">
      {/* Khung ảnh bên trái */}
      <div className="relative w-full sm:w-56 aspect-[16/10] shrink-0 overflow-hidden bg-slate-50 border border-slate-100/60">
        <Link href={articleHref} className="block w-full h-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority={priority}
            sizes="(max-w-768px) 100vw, 224px"
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </Link>
        
        {/* Badges ghim/nổi bật góc trên ảnh */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {article.is_pinned && (
            <span className="bg-amber-500 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Pin size={8} className="fill-white" />
              <span>{tArticle("pinned")}</span>
            </span>
          )}
          {article.is_featured && (
            <span className="bg-brand-red text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Award size={8} />
              <span>{tArticle("featured")}</span>
            </span>
          )}
        </div>
      </div>

      {/* Nội dung bên phải */}
      <div className="flex flex-col justify-between flex-1 py-1 space-y-3">
        <div className="space-y-2">
          {/* Tiêu đề bài viết */}
          <Link href={articleHref}>
            <h3 className="text-[17px] font-bold text-slate-800 leading-snug group-hover:text-brand-darkred transition line-clamp-2">
              {title}
            </h3>
          </Link>
          {/* Tóm tắt */}
          {excerpt && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>

        {/* Thông tin metadata */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 font-medium">
          {/* Tác giả */}
          {article.author && (
            <Link
              href={`/tin-tuc?author=${article.author.username}`}
              className="flex items-center gap-1 hover:text-brand-darkred transition font-semibold text-slate-600"
            >
              <User size={12} />
              <span>{article.author.full_name || article.author.username}</span>
            </Link>
          )}
          {/* Chuyên mục */}
          {article.category && (
            <Link
              href={`/tin-tuc?category=${article.category.slug}`}
              className="flex items-center gap-1 hover:text-brand-darkred transition"
            >
              <FolderOpen size={12} />
              <span>{categoryName}</span>
            </Link>
          )}
          {/* Ngày đăng */}
          <span className="flex items-center gap-1">
            <CalendarDays size={12} />
            <span>{formatDate(article.published_at, locale)}</span>
          </span>
          {/* Lượt xem */}
          <span className="flex items-center gap-1">
            <Eye size={12} />
            <span>{article.view_count} {tArticle("views")}</span>
          </span>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 ml-auto sm:ml-4">
              {article.tags.slice(0, 3).map((t) => {
                const tagName = getLocalizedField<string>(t, "name", locale);
                return (
                  <Link
                    key={t.slug}
                    href={`/tin-tuc?tag=${t.slug}`}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200/40 px-2 py-0.5 text-[9px] uppercase font-bold flex items-center gap-1 transition"
                    style={t.color ? { color: t.color, borderColor: `${t.color}20` } : undefined}
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
