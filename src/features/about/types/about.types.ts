// src/features/about/types/about.types.ts
import type { ReactNode } from "react";

/** Một mốc lịch sử trong timeline */
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: ReactNode;
}

/** Card sứ mệnh / tầm nhìn / giá trị cốt lõi */
export interface MissionItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: ReactNode;
}

/** Một ngành đào tạo */
export interface Department {
  id: string;
  nameKey: string;
  code: string;
  subjectGroups: string[];
  icon: ReactNode;
}

/** Thông tin lãnh đạo */
export interface LeaderProfile {
  id: string;
  nameKey: string;
  titleKey: string;
  positionKey: string;
  imageUrl: string;
  specialtyKey?: string;
}

/** Một ô thống kê */
export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  labelKey: string;
  icon: ReactNode;
}

/** Cơ sở vật chất */
export interface FacilityItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: ReactNode;
}

/** Đối tác hợp tác quốc tế */
export interface PartnerItem {
  id: string;
  name: string;
  country: string;
  logoUrl?: string;
}

/** Thành tích */
export interface AchievementItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: ReactNode;
}

/** Thông tin liên hệ */
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  website: string;
  facebookUrl: string;
  youtubeUrl?: string;
}
