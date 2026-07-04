export interface MarqueeNoticeItem {
  id: string | number;
  title: string;
  href: string;
}

export interface NoticeItem {
  id: string | number;
  title: string;
  titleEn?: string;
  date: string;
  href: string;
}

export interface ScholarshipItem {
  id: string | number;
  title: string;
  titleEn?: string;
  imageUrl: string;
  date: string;
  href: string;
}
