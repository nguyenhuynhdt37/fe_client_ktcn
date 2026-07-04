import { getLanguageHeader } from "./server-api-helper";

interface FetchOptions extends RequestInit {
  revalidate?: number;
  tags?: string[];
  params?: Record<string, string | number | boolean | string[] | undefined | null>;
}

export const httpClient = {
  /**
   * Gọi HTTP GET Request bằng Fetch API dùng chung, tự động đính kèm locale header & base URL.
   * Hỗ trợ đầy đủ caching của Next.js (revalidate, tags).
   */
  async get<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const langHeader = await getLanguageHeader();
    
    const headers: HeadersInit = {
      ...langHeader,
      ...options.headers,
    };

    // Chuẩn hóa query parameters
    let url = `${apiBaseUrl}${path}`;
    const locale = (langHeader["Accept-Language"] || "vi").split("-")[0].toLowerCase();
    const params = {
      lang: locale === "en" ? "en" : "vi",
      ...options.params,
    };

    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          if (Array.isArray(val)) {
            queryParams.append(key, val.join(","));
          } else {
            queryParams.append(key, val.toString());
          }
        }
      });
      const queryStr = queryParams.toString();
      if (queryStr) {
        url += (url.includes("?") ? "&" : "?") + queryStr;
      }
    }

    const fetchOptions: RequestInit = {
      method: "GET",
      ...options,
      headers,
    };

    // Đính kèm cấu hình cache của Next.js
    if (options.revalidate !== undefined || options.tags !== undefined) {
      fetchOptions.next = {
        ...(options.revalidate !== undefined ? { revalidate: options.revalidate } : {}),
        ...(options.tags !== undefined ? { tags: options.tags } : {}),
      };
    }

    try {
      const res = await fetch(url, fetchOptions);
      if (!res.ok) {
        console.warn(`HTTP Client GET [${res.status}] ${url}`);
        return null;
      }
      return await res.json();
    } catch (error) {
      console.error(`HTTP Client GET Error for ${url}:`, error);
      return null;
    }
  },
};
