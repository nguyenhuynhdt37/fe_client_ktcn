import { BannerResponse, BannerPosition } from "../types/banner.types";
import { httpClient } from "@/shared/api/httpClient";

export const bannerService = {
  /**
   * Lấy danh sách banner quảng cáo / hình nền slider chính theo vị trí hiển thị
   */
  async getBanners(position: BannerPosition): Promise<BannerResponse[]> {
    const data = await httpClient.get<BannerResponse[]>("/api/v1/portal/banners", {
      params: {
        position,
      },
      revalidate: 1800, // Cache 30 phút trên CDN/Server, tự động làm mới ở background
    });
    return data || [];
  },
};
