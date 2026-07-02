export interface PortalArticleAuthor {
  id: string;
  username: string;
  full_name?: string | null;
  avatar_url?: string | null;
}

export interface PortalArticleCategory {
  id: string;
  name: string;
  name_vi?: string;
  name_en?: string;
  slug: string;
}

export interface PortalArticleTag {
  id: string;
  name: string;
  name_vi?: string;
  name_en?: string;
  slug: string;
  color?: string | null;
}

export interface PortalArticleResponse {
  id: string;
  title: string;
  title_vi?: string;
  title_en?: string;
  slug: string;
  excerpt?: string | null;
  excerpt_vi?: string | null;
  excerpt_en?: string | null;
  content?: string | null;
  content_vi?: string | null;
  content_en?: string | null;
  thumbnail_object_key?: string | null; // URL hình ảnh thu nhỏ của bài viết
  is_featured: boolean;
  is_pinned: boolean;
  view_count: number;
  published_at: string;
  category: PortalArticleCategory;
  tags: PortalArticleTag[];
  author: PortalArticleAuthor;
}

export interface PortalArticlePaginationResponse {
  items: PortalArticleResponse[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PortalTagResponse {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
  usage_count?: number;
  article_count?: number;
  is_active: boolean;
}

export interface PortalTagPaginationResponse {
  items: PortalTagResponse[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

