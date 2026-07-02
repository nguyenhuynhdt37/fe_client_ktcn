import { PortalCategoryResponse, CategoryTreeNode } from "../types";
import { getLanguageHeader } from "@/shared/api/server-api-helper";

export async function getCategoriesServer(): Promise<PortalCategoryResponse[] | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const langHeader = await getLanguageHeader();

  try {
    const locale = langHeader["Accept-Language"] || "vi";
    const res = await fetch(`${apiBaseUrl}/api/v1/portal/categories?lang=${locale}`, {
      headers: {
        ...langHeader
      },
      next: {
        revalidate: 600
      }
    });

    if (!res.ok) {
      console.warn(`Failed to fetch categories: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories server-side:", error);
    return null;
  }
}

export async function getCategoryTreeServer(): Promise<CategoryTreeNode[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const langHeader = await getLanguageHeader();
  try {
    const locale = langHeader["Accept-Language"] || "vi";
    const res = await fetch(`${apiBaseUrl}/api/v1/portal/categories/tree?with_article_count=true&only_has_articles=true&lang=${locale}`, {
      headers: {
        ...langHeader
      },
      next: { revalidate: 600 } // Cache dữ liệu cây danh mục trong 10 phút
    });
    if (!res.ok) {
      console.warn(`Failed to fetch category tree: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching category tree:", error);
    return [];
  }
}
