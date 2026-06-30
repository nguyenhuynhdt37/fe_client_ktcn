export interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  flag_id: string | null;
  flag_url: string | null;
  is_default: boolean;
}
