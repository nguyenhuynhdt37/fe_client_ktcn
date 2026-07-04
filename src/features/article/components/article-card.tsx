"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { FolderOpen, CalendarDays, Eye, Tag as TagIcon, User, Pin, Award } from "lucide-react";
import { PortalArticleResponse, PortalArticleListResponse } from "../types";
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
  const articleHref = `/tin-tuc/${article.slug}`;

  // Lấy các trường dịch động
  const title = getLocalizedField<string>(article, "title", locale);
  const excerpt = getLocalizedField<string>(article, "excerpt", locale);
  const categoryName = getLocalizedField<string>(article.category, "name", locale);

  return (
    <div className="flex flex-col sm:flex-row gap-5 py-5 border-b border-border/40 group first:pt-0 last:border-b-0">
      {/* Khung ảnh bên trái */}
      <div className="relative w-full sm:w-56 aspect-[16/10] shrink-0 overflow-hidden bg-muted rounded-lg border border-border/30">
        <Link href={articleHref as any} className="block w-full h-full relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority={priority}
            sizes="(max-w-768px) 100vw, 224px"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        </Link>
        
        {/* Badges ghim/nổi bật góc trên ảnh */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {article.is_pinned && (
            <span className="bg-amber-500 text-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 rounded-sm shadow-sm">
              <Pin size={8} className="fill-white" />
              <span>{tArticle("pinned")}</span>
            </span>
          )}
          {article.is_featured && (
            <span className="bg-brand-darkred text-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 rounded-sm shadow-sm">
              <Award size={8} />
              <span>{tArticle("featured")}</span>
            </span>
          )}
        </div>
      </div>

      {/* Nội dung bên phải */}
      <div className="flex flex-col justify-between flex-1 py-0.5 space-y-2.5">
        <div className="space-y-2">
          {/* Tiêu đề bài viết */}
          <Link href={articleHref as any}>
            <h3 className="text-base font-semibold text-card-foreground leading-snug group-hover:text-brand-darkred transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
          </Link>
          {/* Tóm tắt */}
          {excerpt && (
            <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>

        {/* Thông tin metadata */}
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[11px] text-muted-foreground font-normal">
          {/* Tác giả */}
          {article.author && (
            <Link
              href={`/tin-tuc?author=${article.author.username}` as any}
              className="flex items-center gap-1 hover:text-brand-darkred transition-colors duration-150 font-medium text-slate-600"
            >
              <User size={11} />
              <span>{article.author.full_name || article.author.username}</span>
            </Link>
          )}
          {/* Chuyên mục */}
          {article.category && (
            <Link
              href={`/tin-tuc?category=${article.category.slug}` as any}
              className="flex items-center gap-1 hover:text-brand-darkred transition-colors duration-150"
            >
              <FolderOpen size={11} />
              <span>{categoryName}</span>
            </Link>
          )}
          {/* Ngày đăng */}
          <span className="flex items-center gap-1">
            <CalendarDays size={11} />
            <span>{formatDate(article.published_at, locale)}</span>
          </span>
          {/* Lượt xem */}
          <span className="flex items-center gap-1">
            <Eye size={11} />
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
                    href={`/tin-tuc?tag=${t.slug}` as any}
                    className="bg-slate-50 hover:bg-slate-100 text-muted-foreground border border-border/30 px-2 py-0.5 text-[9px] uppercase font-semibold flex items-center gap-1 rounded-sm transition-colors duration-150"
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
