import { SafeImage } from "@/shared/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { FolderOpen, CalendarDays, ArrowRight, Pin } from "lucide-react";
import { useTranslations } from "next-intl";

interface ResearchArticleItem {
  id: string | number;
  title: string;
  excerpt?: string;
  imageUrl: string;
  category: string;
  categoryHref: string;
  date: string;
  href: string;
  isPinned?: boolean;
}

export function ResearchSection({ articles = [], categorySlug = "nghien-cuu-khoa-hoc" }: { articles: ResearchArticleItem[]; categorySlug?: string }) {
  const t = useTranslations("common");

  if (articles.length === 0) return null;

  // Tách bài viết đầu tiên làm tin nổi bật lớn bên trái (1/3 width)
  const bigArticle = articles[0];
  
  // Tách các bài viết tiếp theo làm danh sách tin phụ ở 2 cột bên phải (2/3 width)
  const subArticles = articles.slice(1);
  const midPoint = Math.ceil(subArticles.length / 2);
  const column1Articles = subArticles.slice(0, midPoint);
  const column2Articles = subArticles.slice(midPoint);

  return (
    <div className="space-y-6">
      {/* Tiêu đề Section */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 relative after:absolute after:bottom-[-17px] after:left-0 after:w-16 after:h-[2px] after:bg-brand-darkred">
          {t("research_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category_slug=${categorySlug}` as any} 
          className="flex items-center gap-1 text-xs font-bold text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group"
        >
          <span>{t("view_all")}</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* Grid Block-2: 1/3 bên trái là Tin lớn, 2/3 bên phải chia thành 2 cột chứa các tin nhỏ ngang */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cột trái (1/3): Bài viết lớn nổi bật */}
        {bigArticle && (
          <article className="lg:col-span-1 flex flex-col bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md hover:shadow-slate-100/80 transition-all duration-300 group">
            {/* Ảnh đại diện lớn */}
            <Link href={bigArticle.href as any} className="block relative aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100">
              <SafeImage
                src={bigArticle.imageUrl}
                alt={bigArticle.title}
                fill
                sizes="(max-w-768px) 100vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {bigArticle.isPinned && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-amber-500 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 rounded-none shadow-sm">
                    <Pin size={8} className="fill-white" />
                    <span>Ghim</span>
                  </span>
                </div>
              )}
            </Link>

            {/* Nội dung bài viết lớn */}
            <div className="flex flex-col flex-1 p-4.5 space-y-2">
              <Link href={bigArticle.href as any}>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-darkred transition-colors duration-200 line-clamp-2">
                  {bigArticle.title}
                </h3>
              </Link>
              {bigArticle.excerpt && (
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-medium line-clamp-3">
                  {bigArticle.excerpt}
                </p>
              )}
              
              {/* Meta info */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100 mt-auto font-medium">
                <Link href={bigArticle.categoryHref as any} className="flex items-center gap-1 text-[10px] font-bold text-brand-darkred uppercase tracking-wider truncate max-w-[120px]">
                  <FolderOpen size={11} className="text-slate-400" />
                  <span>{bigArticle.category}</span>
                </Link>
                <span className="flex items-center gap-1">
                  <CalendarDays size={11} />
                  <span>{bigArticle.date}</span>
                </span>
              </div>
            </div>
          </article>
        )}

        {/* 2/3 bên phải: Chia thành 2 cột phụ chứa danh sách tin nhỏ ngang */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Cột phụ 1 */}
          <div className="space-y-4">
            {column1Articles.map((article) => (
              <div key={article.id} className="flex gap-3.5 group hover:bg-slate-50/50 p-1.5 transition-colors duration-150">
                {/* Ảnh đại diện nhỏ 4:3 */}
                <div className="relative w-24 h-16 shrink-0 overflow-hidden bg-slate-50 border border-slate-100">
                  <SafeImage
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="120px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Tiêu đề & meta */}
                <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                  <Link href={article.href as any}>
                    <h4 className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-brand-darkred transition-colors duration-150 line-clamp-2">
                      {article.title}
                    </h4>
                  </Link>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mt-1">
                    <span className="text-[9px] font-bold text-brand-darkred uppercase tracking-wider truncate max-w-[80px]">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cột phụ 2 */}
          <div className="space-y-4">
            {column2Articles.map((article) => (
              <div key={article.id} className="flex gap-3.5 group hover:bg-slate-50/50 p-1.5 transition-colors duration-150">
                {/* Ảnh đại diện nhỏ 4:3 */}
                <div className="relative w-24 h-16 shrink-0 overflow-hidden bg-slate-50 border border-slate-100">
                  <SafeImage
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="120px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Tiêu đề & meta */}
                <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                  <Link href={article.href as any}>
                    <h4 className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-brand-darkred transition-colors duration-150 line-clamp-2">
                      {article.title}
                    </h4>
                  </Link>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mt-1">
                    <span className="text-[9px] font-bold text-brand-darkred uppercase tracking-wider truncate max-w-[80px]">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
