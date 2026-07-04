// Các loại tài nguyên liên kết của Menu Item
export enum MenuItemTargetType {
  CATEGORY = "CATEGORY",
  ARTICLE = "ARTICLE",
  PAGE = "PAGE",
  DEPARTMENT = "DEPARTMENT",
  MODULE = "MODULE",
  EXTERNAL_LINK = "EXTERNAL_LINK"
}

// Thông tin chi tiết của link đích đã resolve
export interface PortalTargetInfo {
  title: string;
  slug?: string | null;
}

// Node MenuItem đệ quy
export interface PortalMenuItemTreeNode {
  id: string;                // UUID
  menu_id: string;           // UUID
  parent_id?: string | null; // UUID parent nếu là sub-menu
  target_type?: MenuItemTargetType | null;
  target_id?: string | null; // UUID của Category, Article... tương ứng
  target_info?: PortalTargetInfo | null; // Tiêu đề và slug thực tế của link đích
  external_url?: string | null;          // URL ngoài nếu target_type là EXTERNAL_LINK
  open_in_new_tab: boolean;
  depth: number;
  sort_order: number;
  is_visible: boolean;
  has_link: boolean;         // true nếu item có gắn link thực tế
  title: string;             // Tên hiển thị menu
  children: PortalMenuItemTreeNode[]; // Danh sách menu con đệ quy
}

// Cấu trúc Response chính trả về cho FE
export interface PortalMenuTreeResponse {
  id: string;                // UUID
  name: string;              // Tên vùng menu (ví dụ: "Main Menu")
  code: string;              // Code duy nhất (ví dụ: "header")
  description?: string | null;
  is_active: boolean;
  items: PortalMenuItemTreeNode[]; // Danh sách các node gốc
}

// Aliases for backward compatibility
export type TargetInfo = PortalTargetInfo;
export type MenuItemTreeNode = PortalMenuItemTreeNode;
export type MenuTreeResponse = PortalMenuTreeResponse;
