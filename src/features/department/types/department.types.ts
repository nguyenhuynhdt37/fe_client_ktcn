import type { StaffItem } from "@/features/lecturer";
import type { PortalArticleListResponse } from "@/features/article";

export interface PortalProgram {
  id: string;
  department_id: string;
  code?: string | null;
  degree_level: string;
  duration_years?: number | null;
  training_mode?: string | null;
  thumbnail_object_key?: string | null;
  name: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  career_opportunities?: string | null;
  admissions_info?: string | null;
}

export interface PortalGalleryItem {
  id: string;
  object_key?: string | null;
  thumbnail_key?: string | null;
  caption?: string | null;
  alt_text?: string | null;
}

export interface PortalGallery {
  id: string;
  title: string;
  description?: string | null;
  cover_object_key?: string | null;
  items: PortalGalleryItem[];
}

export interface PortalDepartment {
  id: string;
  code?: string | null;
  unit_type: "school" | "faculty" | "department" | "office" | "center" | "lab";
  thumbnail_object_key?: string | null;
  banner_object_key?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  office?: string | null;
  sort_order: number;
  name: string;
  description?: string | null;
  short_description?: string | null;
  mission?: string | null;
  vision?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  slug: string;
  staff_count: number;
}

export interface DepartmentOverview {
  department: PortalDepartment;
  staffs: Array<Pick<StaffItem, "id" | "full_name" | "slug" | "avatar_object_key" | "academic_title" | "degree" | "biography" | "research_interests"> & {
    position_name?: string | null;
  }>;
  stats: {
    staff_count: number;
    doctorate_count: number;
    associate_professor_count: number;
  };
  programs: PortalProgram[];
  latest_articles: PortalArticleListResponse[];
  galleries: PortalGallery[];
}
