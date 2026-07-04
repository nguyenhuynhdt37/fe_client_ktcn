import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FolderOpen, CalendarDays, ArrowRight, Pin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface ResearchArticleItem {
  id: string | number;
  title: string;
  imageUrl: string;
  category: string;
  categoryHref: string;
  date: string;
  href: string;
  isPinned?: boolean;
}

export function ResearchSection({ articles = [] }: { articles: ResearchArticleItem[] }) {
  const t = useTranslations("common");
  const locale = useLocale();

  if (articles.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-foreground relative after:absolute after:bottom-[-21px] after:left-0 after:w-14 after:h-[2px] after:bg-brand-darkred">
          {t("research_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category=nghien-cuu-khoa-hoc` as any} 
          className="flex items-center gap-1.5 text-[13px] font-medium text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group"
        >
          <span>{t("view_all")}</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {articles.slice(0, 3).map((article) => (
          <article
            key={article.id}
            className="flex flex-col bg-white rounded-lg overflow-hidden border border-border/30 hover:border-border/60 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            {/* Ảnh bài viết */}
            <Link href={article.href as any} className="block relative aspect-[16/10] overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                sizes="(max-w-768px) 100vw, 350px"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              
              {/* Badge ghim */}
              {article.isPinned && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-amber-500 text-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 rounded-sm shadow-sm">
                    <Pin size={8} className="fill-white" />
                    <span>Ghim</span>
                  </span>
                </div>
              )}
            </Link>

            {/* Nội dung bài viết */}
            <div className="flex flex-col flex-1 p-5 space-y-3">
              <Link href={article.href as any}>
                <h3 className="text-[17px] font-semibold text-card-foreground leading-snug group-hover:text-brand-darkred transition-colors duration-200 line-clamp-3">
                  {article.title}
                </h3>
              </Link>

              {/* Thông tin phụ */}
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/40 mt-auto">
                <Link href={article.categoryHref as any} className="flex items-center gap-1 hover:text-brand-darkred transition-colors duration-150">
                  <FolderOpen size={11} />
                  <span>{article.category}</span>
                </Link>
                <span className="flex items-center gap-1">
                  <CalendarDays size={11} />
                  <span>{article.date}</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
