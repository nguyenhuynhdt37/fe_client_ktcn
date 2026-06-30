export enum MenuItemTargetType {
  EXTERNAL_LINK = "EXTERNAL_LINK",
  CATEGORY = "CATEGORY",
  ARTICLE = "ARTICLE",
  DEPARTMENT = "DEPARTMENT",
  PAGE = "PAGE"
}

export interface TargetInfo {
  id: string;
  type: string;
  name: string;
  slug?: string;
  status?: string;
  path?: string;
  is_weekly_schedule?: boolean;
}

export interface MenuItemTreeNode {
  id: string;
  title: string;
  title_vi?: string;
  title_en?: string;
  target_type?: MenuItemTargetType | null;
  target_id?: string | null;
  target_info?: TargetInfo | null;
  external_url?: string | null;
  open_in_new_tab: boolean;
  icon?: string | null;
  depth: number;
  sort_order: number;
  is_visible: boolean;
  has_link: boolean;
  children: MenuItemTreeNode[];
}

export interface MenuTreeResponse {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  is_active: boolean;
  items: MenuItemTreeNode[];
}
