export interface PortalCategoryResponse {
  id: string;
  parent_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  sort_order: number;
  status: string;
  is_visible: boolean;
}

export interface CategoryTreeNode {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  status: string;
  is_visible: boolean;
  article_count: number;
  children: CategoryTreeNode[]; // Mảng đệ quy chứa danh mục con
}
