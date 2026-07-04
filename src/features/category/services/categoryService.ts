import { PortalCategoryResponse, CategoryTreeNode } from "../types/category.types";
import { httpClient } from "@/shared/api/httpClient";

export const categoryService = {
  /**
   * Lấy toàn bộ danh sách danh mục phẳng từ API
   */
  async getCategories(): Promise<PortalCategoryResponse[] | null> {
    return httpClient.get<PortalCategoryResponse[]>("/api/v1/portal/categories", {
      revalidate: 600, // Cache 10 phút
    });
  },

  /**
   * Lấy cấu trúc cây danh mục đệ quy kèm số lượng bài viết từ API
   */
  async getCategoryTree(): Promise<CategoryTreeNode[]> {
    const data = await httpClient.get<CategoryTreeNode[]>("/api/v1/portal/categories/tree", {
      params: {
        with_article_count: true,
        only_has_articles: false,
      },
      revalidate: 600, // Cache cây danh mục 10 phút
    });
    return data || [];
  },
};
