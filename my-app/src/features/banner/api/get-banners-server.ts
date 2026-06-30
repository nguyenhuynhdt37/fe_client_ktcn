import { BannerResponse, BannerPosition } from "../types";

export async function getBannersServer(position: BannerPosition): Promise<BannerResponse[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/banners?position=${position}`, {
      next: {
        revalidate: 1800 // Cache 30 phút trên CDN/Server, tự động làm mới ở background
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch banners: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching banners (${position}) server-side:`, error);
    return [];
  }
}
