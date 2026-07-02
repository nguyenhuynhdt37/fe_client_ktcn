import { PortalArticleResponse } from "../types";
import { ArticleCard } from "./article-card";

interface ArticleListProps {
  articles: PortalArticleResponse[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="flex flex-col">
      {articles.map((article, idx) => (
        <ArticleCard
          key={article.id}
          article={article}
          priority={idx < 3} // Ưu tiên load ảnh 3 bài viết đầu tiên
        />
      ))}
    </div>
  );
}
