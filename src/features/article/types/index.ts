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
  category_id?: string | null;
  author_id?: string | null;
  status: string;
  is_featured: boolean;
  is_pinned: boolean;
  view_count: number;
  word_count: number;
  reading_time: number;
  created_at: string;
  publish_at?: string | null;
  published_at: string;
  expire_at?: string | null;
  thumbnail_object_key?: string | null;
  cover_object_key?: string | null;
  title: string;
  title_vi?: string;
  title_en?: string;
  slug: string;
  excerpt?: string | null;
  excerpt_vi?: string | null;
  excerpt_en?: string | null;
  content: string;
  content_vi?: string | null;
  content_en?: string | null;
  seo_title?: string | null;
  seo_title_vi?: string | null;
  seo_title_en?: string | null;
  seo_description?: string | null;
  seo_description_vi?: string | null;
  seo_description_en?: string | null;
  canonical_url?: string | null;
  robots?: string | null;
  og_title?: string | null;
  og_title_vi?: string | null;
  og_title_en?: string | null;
  og_description?: string | null;
  og_description_vi?: string | null;
  og_description_en?: string | null;
  og_image?: string | null;
  category: PortalArticleCategory;
  tags: PortalArticleTag[];
  author: PortalArticleAuthor;
}

export interface PortalArticleListResponse {
  id: string;
  category_id?: string | null;
  author_id?: string | null;
  status: string;
  is_featured: boolean;
  is_pinned: boolean;
  view_count: number;
  created_at: string;
  publish_at?: string | null;
  published_at: string;
  thumbnail_object_key?: string | null;
  title: string;
  title_vi?: string;
  title_en?: string;
  slug: string;
  excerpt?: string | null;
  excerpt_vi?: string | null;
  excerpt_en?: string | null;
  category: PortalArticleCategory;
  author: PortalArticleAuthor;
  tags: PortalArticleTag[];
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

export interface PortalArticleListPaginationResponse {
  items: PortalArticleListResponse[];
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

