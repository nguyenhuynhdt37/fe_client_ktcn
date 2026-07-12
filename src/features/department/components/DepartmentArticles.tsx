import { PortalArticleListResponse } from "@/features/article";
import { ArticleCard } from "@/features/article";
import { Newspaper } from "lucide-react";

interface DepartmentArticlesProps {
  latestArticles: PortalArticleListResponse[];
  isEn: boolean;
}

export function DepartmentArticles({ latestArticles, isEn }: DepartmentArticlesProps) {
  if (latestArticles.length === 0) return null;

  return (
    <section className="py-14 md:py-20 border-t border-slate-100 bg-white">
      <div className="max-w-[1360px] mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <Newspaper className="h-6 w-6 text-brand-darkred" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {isEn ? "Latest Updates" : "Tin bài mới nhất"}
          </h2>
        </div>

        {/* Articles List */}
        <div className="grid gap-6">
          {latestArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
