import { PortalArticlePaginationResponse } from "../types";

import { getLanguageHeader } from "@/shared/api/server-api-helper";

export async function getArticlesByCategoryServer(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PortalArticlePaginationResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const langHeader = await getLanguageHeader();

  try {
    const locale = (langHeader["Accept-Language"] || "vi").split("-")[0].toLowerCase();
    const res = await fetch(
      `${apiBaseUrl}/api/v1/portal/categories/${categorySlug}/articles?page=${page}&page_size=${pageSize}&lang=${locale === "en" ? "en" : "vi"}`,
      {
        headers: {
          ...langHeader
        },
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
