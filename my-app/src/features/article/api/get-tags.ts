import { PortalTagPaginationResponse } from "../types";

import { getLanguageHeader } from "@/shared/api/server-api-helper";

export async function getPopularTagsServer(): Promise<PortalTagPaginationResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const langHeader = await getLanguageHeader();

  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/tags?page=1&page_size=20&only_has_articles=true`, {
      headers: {
        ...langHeader
      },
      next: {
        revalidate: 600 // Cache 10 phút, tự động cập nhật ngầm
      }
    });

    if (!res.ok) {
      console.warn(`Failed to fetch tags: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching tags server-side:", error);
    return null;
  }
}
