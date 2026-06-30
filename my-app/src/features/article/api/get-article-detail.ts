import { PortalArticleResponse } from "../types";

export interface PortalArticleDetail extends PortalArticleResponse {
  content: string;
  word_count: number;
  reading_time: number;
  thumbnail_url?: string | null;
  cover_url?: string | null;
  updated_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  robots?: string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  json_ld: Record<string, unknown>;
}

export async function getArticleDetailServer(slug: string): Promise<PortalArticleDetail | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/articles/portal/${slug}`, {
      next: {
        revalidate: 600 // Cache bài viết 10 phút trên server
      }
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch article: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching article detail (${slug}):`, error);
    return null;
  }
}
