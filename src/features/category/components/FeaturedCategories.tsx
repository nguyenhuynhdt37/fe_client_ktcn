"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { 
  Bell, 
  GraduationCap, 
  BookOpen, 
  Lightbulb, 
  Users, 
  Calendar,
  ArrowUpRight
} from "lucide-react";

interface CategoryCard {
  title: string;
  desc: string;
  icon: any;
  href: string;
  badge?: string;
  colorClass: string;
}

export function FeaturedCategories() {
  const locale = useLocale();

  const categories: CategoryCard[] = [
    {
      title: locale === "en" ? "Announcements" : "Thông báo & Văn bản",
      desc: locale === "en" 
        ? "Stay updated with the latest announcements, regulations, and official documents."
        : "Cập nhật các thông báo mới nhất, quy chế, văn bản biểu mẫu dành cho cán bộ và sinh viên.",
      icon: Bell,
      href: "/thong-bao",
      colorClass: "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 border-red-100/50 dark:border-red-900/30",
    },
    {
      title: locale === "en" ? "Admissions" : "Tuyển sinh",
      desc: locale === "en"
        ? "Admissions information for undergraduate, master, and doctoral programs."
        : "Thông tin tuyển sinh đại học chính quy, đại học không chính quy, thạc sĩ và tiến sĩ.",
      icon: GraduationCap,
      href: "/tu-van-tuyen-sinh",
      badge: "Hot",
      colorClass: "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border-blue-100/50 dark:border-blue-900/30",
    },
    {
      title: locale === "en" ? "Academic Programs" : "Chương trình Đào tạo",
      desc: locale === "en"
        ? "Explore our undergraduate and postgraduate training programs."
        : "Chi tiết các ngành đào tạo chất lượng cao, đào tạo đại học và sau đại học.",
      icon: BookOpen,
      href: "/nganh-dao-tao",
      colorClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-900/30",
    },
    {
      title: locale === "en" ? "Scientific Research" : "Nghiên cứu khoa học",
      desc: locale === "en"
        ? "Scientific projects, publications, research areas, and key laboratories."
        : "Các công trình nghiên cứu, đề tài, bài báo khoa học và hướng nghiên cứu nổi bật.",
      icon: Lightbulb,
      href: locale === "en" ? "/tin-tuc?category_slug=research" : "/tin-tuc?category_slug=nghien-cuu-khoa-hoc",
      colorClass: "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100/50 dark:border-amber-900/30",
    },
    {
      title: locale === "en" ? "Student Life" : "Hoạt động Sinh viên",
      desc: locale === "en"
        ? "Student union activities, scholarship opportunities, and career support."
        : "Hoạt động phong trào đoàn hội, cơ hội nhận học bổng và hỗ trợ việc làm.",
      icon: Users,
      href: locale === "en" ? "/tin-tuc?category_slug=students" : "/tin-tuc?category_slug=sinh-vien",
      colorClass: "bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400 border-purple-100/50 dark:border-purple-900/30",
    },
    {
      title: locale === "en" ? "Weekly Calendar" : "Lịch công tác Tuần",
      desc: locale === "en"
        ? "Detailed weekly work schedule of the Board of Management, departments, and offices."
        : "Lịch làm việc, lịch tuần chi tiết của Ban lãnh đạo, các bộ môn và văn phòng trường.",
      icon: Calendar,
      href: "/lich-tuan",
      colorClass: "bg-sky-50 text-sky-600 dark:bg-sky-950/20 dark:text-sky-400 border-sky-100/50 dark:border-sky-900/30",
    },
  ];

  return (
    <section className="py-14 md:py-20 max-w-[1360px] mx-auto px-6">
      {/* Tiêu đề phần */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <h2 className="section-heading text-center w-full justify-center">
          {locale === "en" ? "Featured Portals" : "Chuyên mục Nổi bật"}
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto">
          {locale === "en" 
            ? "Quick access to the most vital portals and information channels of our College."
            : "Truy cập nhanh vào các kênh thông tin và cổng dịch vụ trọng tâm của Nhà trường."}
        </p>
      </div>

      {/* Grid danh mục nổi bật */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <Link
              key={idx}
              href={cat.href as any}
              className="group border border-slate-100 hover:border-brand-darkred/25 dark:border-slate-800/60 dark:hover:border-brand-darkred/40 flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900/20 hover:bg-slate-50/20 dark:hover:bg-slate-900/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden"
            >
              {/* Badge nếu có */}
              {cat.badge && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full select-none uppercase tracking-wider animate-pulse">
                  {cat.badge}
                </span>
              )}

              <div className="flex gap-4.5 items-start">
                {/* Vòng tròn Icon */}
                <div className={`p-3.5 rounded-xl border ${cat.colorClass} transition-transform duration-300 group-hover:scale-105 shrink-0`}>
                  <IconComponent size={22} className="stroke-[2px]" aria-hidden="true" />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                  <h3 className="group-hover:text-brand-darkred text-base font-bold text-slate-800 dark:text-slate-200 transition-colors duration-150 flex items-center gap-1.5 leading-snug">
                    <span>{cat.title}</span>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              {/* Nút mũi tên nhỏ bay lên ở góc dưới phải */}
              <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-end text-xs font-semibold text-slate-400 group-hover:text-brand-darkred transition-colors duration-150 gap-1.5">
                <span>{locale === "en" ? "Explore" : "Khám phá"}</span>
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
