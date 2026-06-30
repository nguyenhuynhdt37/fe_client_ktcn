import { Language } from "../types";

export async function getLanguages(): Promise<Language[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/portal/languages`, {
      next: {
        revalidate: 3600 // Cache 1 giờ
      }
    });

    if (!res.ok) {
      console.warn(`Failed to fetch languages from API: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching languages from API:", error);
    return [];
  }
}
