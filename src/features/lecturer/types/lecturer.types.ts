export interface StaffDepartment {
  id: string;
  name: string;
  slug: string;
  thumbnail_object_key?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  office?: string | null;
}

export interface StaffPosition {
  id: string;
  name: string;
  description?: string | null;
}

export interface StaffItem {
  id: string;
  department_id: string;
  position_id: string;
  academic_title_id?: string | null;
  degree_id?: string | null;
  full_name: string;
  english_name?: string | null;
  slug: string;
  avatar_object_key?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  office?: string | null;
  sort_order: number;
  academic_title?: string | null;
  degree?: string | null;
  biography?: string | null;
  research_interests?: string | null;
  department?: StaffDepartment | null;
  position?: StaffPosition | null;
}
