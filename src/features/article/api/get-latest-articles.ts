import { PortalArticleListPaginationResponse } from "../types";

export interface GetLatestArticlesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  categorySlug?: string;
  tagSlug?: string;
  sortBy?: "publish_at" | "view_count" | "created_at" | "title" | "sort_order";
  sortDir?: "asc" | "desc";
  authorUsername?: string;
  isFeatured?: boolean;
  isPinned?: boolean;
  hasThumbnail?: boolean;
}

import { getLanguageHeader } from "@/shared/api/server-api-helper";

export async function getLatestArticlesServer(
  params: GetLatestArticlesParams = {}
): Promise<PortalArticleListPaginationResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const langHeader = await getLanguageHeader();
  
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.pageSize) queryParams.append("page_size", params.pageSize.toString());
  if (params.search) queryParams.append("search", params.search);
  if (params.categorySlug) queryParams.append("category_slug", params.categorySlug);
  if (params.tagSlug) queryParams.append("tag_slug", params.tagSlug);
  if (params.sortBy) queryParams.append("sort_by", params.sortBy);
  if (params.sortDir) queryParams.append("sort_dir", params.sortDir);
  if (params.authorUsername) queryParams.append("author_username", params.authorUsername);
  if (params.isFeatured !== undefined) queryParams.append("is_featured", params.isFeatured.toString());
  if (params.isPinned !== undefined) queryParams.append("is_pinned", params.isPinned.toString());
  if (params.hasThumbnail !== undefined) queryParams.append("has_thumbnail", params.hasThumbnail.toString());

  // Thêm tham số ngôn ngữ cho Endpoint B
  const locale = (langHeader["Accept-Language"] || "vi").split("-")[0].toLowerCase();
  queryParams.append("lang", locale === "en" ? "en" : "vi");

  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/portal/articles?${queryParams.toString()}`, {
      headers: {
        ...langHeader
      },
      next: {
        revalidate: 300 // Cache 5 phút trên Server Component
      }
    });

    if (!res.ok) {
      console.warn(`Failed to fetch latest articles: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching latest articles server-side:", error);
    return null;
  }
}
