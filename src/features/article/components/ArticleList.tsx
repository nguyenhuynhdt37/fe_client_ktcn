import { PortalArticleResponse, PortalArticleListResponse } from "../types/article.types";
import { ArticleCard } from "./ArticleCard";

interface ArticleListProps {
  articles: (PortalArticleResponse | PortalArticleListResponse)[];
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
