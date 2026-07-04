import { Language } from "../types/language.types";
import { httpClient } from "@/shared/api/httpClient";

export const languageService = {
  /**
   * Lấy danh sách ngôn ngữ được cấu hình từ API Portal
   */
  async getLanguages(): Promise<Language[]> {
    const data = await httpClient.get<Language[]>("/api/v1/portal/languages", {
      revalidate: 3600, // Cache 1 giờ
    });
    return data || [];
  },
};
