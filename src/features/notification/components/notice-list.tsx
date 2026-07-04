import Image from "next/image";
import { Link } from "@/i18n/routing";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

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

const defaultNotices: NoticeItem[] = [
  {
    id: 1,
    title: "Kế hoạch tổ chức Hội thảo khoa học quốc tế lần thứ 3",
    titleEn: "Plan to Organize the 3rd International Scientific Conference",
    date: "13/01/2026",
    href: "/tin-tuc?category=thong-bao",
  },
  {
    id: 2,
    title: "Tổ chức Hội thảo quốc tế 2024: Phát triển bền vững kinh tế Việt Nam trong bối cảnh mới",
    titleEn: "Organizing 2024 International Conference: Sustainable Development of Vietnam Economy in New Context",
    date: "02/01/2025",
    href: "/tin-tuc?category=thong-bao",
  },
  {
    id: 3,
    title: "Thông báo tổ chức hội thảo khoa học thường niên",
    titleEn: "Announcement of the Annual Scientific Conference Organization",
    date: "13/07/2024",
    href: "/tin-tuc?category=thong-bao",
  },
  {
    id: 4,
    title: "Thông báo về việc mở các khóa bồi dưỡng Kế toán trưởng năm 2023",
    titleEn: "Notification on Opening Chief Accountant Training Courses in 2023",
    date: "03/08/2023",
    href: "/tin-tuc?category=thong-bao",
  },
];

const defaultScholarships: ScholarshipItem[] = [
  {
    id: 1,
    title: "Thông báo tuyển sinh đi học tại Ba Lan năm 2022",
    titleEn: "Notification of Admissions for Studying in Poland in 2022",
    imageUrl: "/Upload/images/HOCBONG/2022-hoc-bong-ba-lan.jpg",
    date: "06/04/2022",
    href: "/tin-tuc?category=hoc-bong",
  },
  {
    id: 2,
    title: "Thông báo tuyển sinh đi học tại Trung Quốc năm 2022",
    titleEn: "Notification of Admissions for Studying in China in 2022",
    imageUrl: "/Upload/images/THONGBAO/2022_hoc-bong_002.jpg",
    date: "05/04/2022",
    href: "/tin-tuc?category=hoc-bong",
  },
  {
    id: 3,
    title: "Thông báo tuyển sinh đi học Tiến sĩ ở Nhật Bản niên khóa 2022-2025",
    titleEn: "Notification of Admissions for PhD Program in Japan for Academic Year 2022-2025",
    imageUrl: "/Upload/images/THONGBAO/2022_hoc-bong_001.jpg",
    date: "05/04/2022",
    href: "/tin-tuc?category=hoc-bong",
  },
];

// 1. Component Danh sách Thông báo
export function NoticeSection({ notices = defaultNotices }: { notices?: NoticeItem[] }) {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-foreground relative after:absolute after:bottom-[-21px] after:left-0 after:w-14 after:h-[2px] after:bg-brand-darkred">
          {t("notices_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category=thong-bao` as any} 
          className="flex items-center gap-1.5 text-[13px] font-medium text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group"
        >
          <span>{t("view_all")}</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      <ul className="divide-y divide-border/40">
        {notices.map((notice) => {
          const title = locale === "en" ? (notice.titleEn || notice.title) : notice.title;
          return (
            <li key={notice.id} className="py-4 group">
              <Link href={notice.href as any} className="block space-y-2 px-1 -mx-1 py-1 rounded-md hover:bg-slate-50/80 transition-colors duration-150">
                <h4 className="text-sm font-semibold text-card-foreground group-hover:text-brand-darkred transition-colors duration-200 leading-snug line-clamp-2">
                  {title}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <CalendarDays size={11} />
                  <span>{notice.date}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// 2. Component Danh sách Học bổng
export function ScholarshipSection({ scholarships = defaultScholarships }: { scholarships?: ScholarshipItem[] }) {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-foreground relative after:absolute after:bottom-[-21px] after:left-0 after:w-14 after:h-[2px] after:bg-brand-darkred">
          {t("scholarships_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category=hoc-bong` as any} 
          className="flex items-center gap-1.5 text-[13px] font-medium text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group"
        >
          <span>{t("view_all")}</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      <ul className="space-y-3">
        {scholarships.map((item) => {
          const title = locale === "en" ? (item.titleEn || item.title) : item.title;
          return (
            <li key={item.id} className="flex gap-3 group bg-white p-3 rounded-lg border border-border/30 hover:border-border/60 hover:shadow-[var(--shadow-sm)] hover:-translate-y-0.5 transition-all duration-250">
              <Link href={item.href as any} className="block relative w-20 h-16 shrink-0 rounded-md overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-col justify-between py-0.5">
                <Link href={item.href as any}>
                  <h4 className="text-sm font-semibold text-card-foreground group-hover:text-brand-darkred transition-colors duration-200 leading-snug line-clamp-2">
                    {title}
                  </h4>
                </Link>
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <CalendarDays size={11} />
                  <span>{item.date}</span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
