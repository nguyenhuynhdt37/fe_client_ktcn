import { PortalArticlePaginationResponse } from "../types";

export async function getArticlesByCategoryServer(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PortalArticlePaginationResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const res = await fetch(
      `${apiBaseUrl}/api/v1/categories/${categorySlug}/articles?page=${page}&page_size=${pageSize}`,
      {
        next: {
          revalidate: 600 // Cache 10 phút, tự động revalidate ngầm
        }
      }
    );

    if (!res.ok) {
      console.warn(`Failed to fetch articles for category ${categorySlug}: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching articles for category ${categorySlug} server-side:`, error);
    return null;
  }
}
