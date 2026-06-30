export enum BannerPosition {
  HOME_HERO = "HOME_HERO",
  HOME_POPUP = "HOME_POPUP",
  HOME_TOP = "HOME_TOP",
  NEWS_TOP = "NEWS_TOP",
  CATEGORY_TOP = "CATEGORY_TOP",
  PAGE_TOP = "PAGE_TOP"
}

export interface BannerResponse {
  id: string;
  title: string;
  title_vi?: string;
  title_en?: string;
  description?: string | null;
  description_vi?: string | null;
  description_en?: string | null;
  desktop_image_object_key: string; // URL đầy đủ ảnh cho desktop
  mobile_image_object_key?: string | null; // URL đầy đủ ảnh cho mobile (nếu có)
  link_url?: string | null;
  open_in_new_tab: boolean;
  position: BannerPosition;
  sort_order: number;
  start_at?: string | null;
  end_at?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
