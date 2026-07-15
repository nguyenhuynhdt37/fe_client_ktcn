export interface ProgramDocument {
  id: string;
  document_type: string;
  title: string;
  description?: string | null;
  source_url?: string | null;
  file_url?: string | null;
  mime_type?: string | null;
  file_size?: number | null;
  page_count?: number | null;
  checksum_sha256?: string | null;
  sort_order: number;
}

export interface ProgramOutcome {
  id: string;
  code: string;
  outcome_type: "objective" | "learning_outcome";
  parent_code?: string | null;
  content: string;
  sort_order: number;
}

export interface ProgramCourse {
  id: string;
  course_code?: string | null;
  row_type: "course" | "group" | "placeholder" | "summary";
  name: string;
  credits?: number | null;
  credits_text?: string | null;
  semester?: string | null;
  knowledge_block?: string | null;
  course_type?: string | null;
  managing_unit?: string | null;
  sort_order: number;
}

export interface ProgramVersion {
  id: string;
  version_year: number;
  cohort_code?: string | null;
  total_credits?: number | null;
  is_current: boolean;
  is_published: boolean;
  sort_order: number;
  title: string;
  summary?: string | null;
  general_objective?: string | null;
  career_opportunities?: string | null;
  documents: ProgramDocument[];
  objectives: ProgramOutcome[];
  learning_outcomes: ProgramOutcome[];
  courses: ProgramCourse[];
}

export interface ProgramDetail {
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
  versions: ProgramVersion[];
}

export interface ProgramSummary extends Omit<ProgramDetail, "versions"> {
  sort_order: number;
  is_active: boolean;
  is_published: boolean;
}
