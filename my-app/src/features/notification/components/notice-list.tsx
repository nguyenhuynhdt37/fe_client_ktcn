import Image from "next/image";
import { Link } from "@/i18n/routing";
import { CalendarDays } from "lucide-react";
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
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 relative after:absolute after:bottom-[-17px] after:left-0 after:w-12 after:h-[3px] after:bg-brand-darkred after:rounded-none">
          {t("notices_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category=thong-bao`} 
          className="text-sm font-semibold text-brand-darkred hover:text-brand-darkred-dark transition hover:underline"
        >
          {t("view_all")}
        </Link>
      </div>

      <ul className="divide-y divide-slate-100">
        {notices.map((notice) => {
          const title = locale === "en" ? (notice.titleEn || notice.title) : notice.title;
          return (
            <li key={notice.id} className="py-4 group">
              <Link href={notice.href} className="block space-y-2">
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-darkred transition leading-snug line-clamp-2">
                  {title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CalendarDays size={12} />
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
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 relative after:absolute after:bottom-[-17px] after:left-0 after:w-12 after:h-[3px] after:bg-brand-darkred after:rounded-none">
          {t("scholarships_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category=hoc-bong`} 
          className="text-sm font-semibold text-brand-darkred hover:text-brand-darkred-dark transition hover:underline"
        >
          {t("view_all")}
        </Link>
      </div>

      <ul className="space-y-4">
        {scholarships.map((item) => {
          const title = locale === "en" ? (item.titleEn || item.title) : item.title;
          return (
            <li key={item.id} className="flex gap-3 group bg-white p-3 rounded-none shadow-sm hover:shadow transition-all duration-200">
              <Link href={item.href} className="block relative w-20 h-16 shrink-0 rounded-none overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-col justify-between py-0.5">
                <Link href={item.href}>
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-darkred transition leading-snug line-clamp-2">
                    {title}
                  </h4>
                </Link>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CalendarDays size={12} />
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
