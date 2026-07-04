"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { GraduationCap, CalendarDays, ArrowRight, Pin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SafeImage } from "@/shared/components/ui/safe-image";

export interface AdmissionPost {
  id: string | number;
  title: string;
  titleEn?: string;
  excerpt?: string;
  imageUrl: string;
  category: string;
  categoryEn?: string;
  categoryHref: string;
  date: string;
  href: string;
  isPinned?: boolean;
}

export interface TabData {
  id: string;
  labelKey: string;
  posts: AdmissionPost[];
}

const defaultTabs: TabData[] = [
  {
    id: "regular",
    labelKey: "regular",
    posts: [
      {
        id: 1,
        title: "Thông báo điểm trúng tuyển vào đại học chính quy đợt 1 năm 2022",
        titleEn: "Notification of benchmarks for regular undergraduate admissions batch 1 in 2022",
        excerpt: "Nhà trường chính thức thông báo điểm trúng tuyển xét tuyển đợt 1 vào các ngành đào tạo đại học hệ chính quy năm 2022. Thí sinh tra cứu kết quả trực tuyến để thực hiện thủ tục nhập học.",
        imageUrl: "/Upload/images/DAOTAO/tb-diem-chuan.jpg",
        category: "Đại học chính quy",
        categoryEn: "Regular Undergraduate",
        categoryHref: "/tin-tuc?category_slug=tuyen-sinh",
        date: "25/09/2022",
        href: "/tin-tuc/diem-trung-tuyen-2022",
      },
      {
        id: 2,
        title: "Tuyển sinh năm 2022: Tạo thuận lợi tối đa cho thí sinh và cơ sở đào tạo",
        imageUrl: "/Upload/images/TUYENSINH2022/hoi-nghi-tuyen-sinh-7627.jpg",
        category: "Đại học chính quy",
        categoryEn: "Regular Undergraduate",
        categoryHref: "/tin-tuc?category_slug=tuyen-sinh",
        date: "06/04/2022",
        href: "/tin-tuc/tuyen-sinh-nam-2022-thuan-loi",
      },
      {
        id: 3,
        title: "Thông tin tuyển sinh đại học chính quy năm 2022 Trường Đại học Vinh",
        imageUrl: "/Upload/images/TUYENSINH2022/2022-ts-chinh-quy-002.png",
        category: "Đại học chính quy",
        categoryEn: "Regular Undergraduate",
        categoryHref: "/tin-tuc?category_slug=tuyen-sinh",
        date: "05/04/2022",
        href: "/tin-tuc/thong-tin-tuyen-sinh-2022",
      },
    ],
  },
  {
    id: "in-service",
    labelKey: "in_service",
    posts: [],
  },
  {
    id: "master",
    labelKey: "master",
    posts: [
      {
        id: 4,
        title: "Thông báo tuyển sinh đào tạo trình độ thạc sĩ đợt 1 năm 2022",
        excerpt: "Trường Đại học Vinh thông báo tuyển sinh đào tạo trình độ thạc sĩ đợt 1 năm 2022 các chuyên ngành kỹ thuật, công nghệ, kinh tế với nhiều phương thức xét tuyển linh hoạt.",
        imageUrl: "/Upload/images/SDH/2022-sdh-0001.jpg",
        category: "Thạc sĩ",
        categoryEn: "Master Degree",
        categoryHref: "/tin-tuc?category_slug=tuyen-sinh",
        date: "03/04/2022",
        href: "/tin-tuc/tuyen-sinh-thac-si-2022-d1",
      },
    ],
  },
  {
    id: "phd",
    labelKey: "phd",
    posts: [],
  },
];

interface AdmissionSectionProps {
  tabs?: TabData[];
  initialArticles?: AdmissionPost[];
  categorySlug?: string;
}

export function AdmissionSection({ tabs = defaultTabs, initialArticles, categorySlug = "tuyen-sinh" }: AdmissionSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "regular");
  const tCommon = useTranslations("common");
  const tAdmission = useTranslations("admission");
  const locale = useLocale();

  // Nếu có initialArticles, thay thế bài viết của tab "regular" bằng dữ liệu động từ API
  const displayTabs = tabs.map((tab) => {
    if (tab.id === "regular" && initialArticles && initialArticles.length > 0) {
      return {
        ...tab,
        posts: initialArticles,
      };
    }
    return tab;
  });

  const currentTab = displayTabs.find((t) => t.id === activeTab);

  return (
    <div className="space-y-6">
      {/* Header tiêu đề */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 relative after:absolute after:bottom-[-17px] after:left-0 after:w-16 after:h-[2px] after:bg-brand-darkred">
          {tCommon("admission_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category_slug=${categorySlug}` as any} 
          className="flex items-center gap-1 text-xs font-bold text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group"
        >
          <span>{tCommon("view_all")}</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* Navigation Tab Bar */}
      <div className="border-b border-slate-200 select-none">
        <div className="flex flex-wrap -mb-px gap-4">
          {displayTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={`flex items-center gap-1 pb-2.5 text-xs font-bold uppercase transition-all duration-200 focus:outline-none cursor-pointer border-b-2 ${
                activeTab === tab.id
                  ? "border-brand-darkred text-brand-darkred"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-200"
              }`}
            >
              <GraduationCap size={13} />
              {tAdmission(tab.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Tab panel (Grid 3 card đều nhau phẳng đẹp) */}
      <div className="mt-4">
        {currentTab && currentTab.posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentTab.posts.slice(0, 3).map((post) => {
              const title = locale === "en" ? (post.titleEn || post.title) : post.title;
              const category = locale === "en" ? (post.categoryEn || post.category) : post.category;
              return (
                <article
                  key={post.id}
                  className="flex flex-col bg-white rounded-none overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-md hover:shadow-slate-100/80 transition-all duration-300 group"
                >
                  <Link href={post.href as any} className="block relative aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100">
                    <SafeImage
                      src={post.imageUrl}
                      alt={title}
                      fill
                      sizes="(max-w-768px) 100vw, 250px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge ghim */}
                    {post.isPinned && (
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-amber-500 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 rounded-none shadow-sm">
                          <Pin size={8} className="fill-white" />
                          <span>Ghim</span>
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-col flex-1 p-4.5 space-y-2">
                    <Link href={post.href as any}>
                      <h4 className="text-sm sm:text-[14px] font-bold text-slate-800 group-hover:text-brand-darkred transition-colors duration-200 leading-snug line-clamp-3">
                        {title}
                      </h4>
                    </Link>
                    {post.excerpt && (
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 mt-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-100 mt-auto font-medium">
                      <span className="text-[9px] font-bold text-brand-darkred uppercase tracking-wider truncate max-w-[120px]">
                        {category}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays size={11} />
                        <span>{post.date}</span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-sm font-medium">
            {tAdmission("empty")}
          </div>
        )}
      </div>
    </div>
  );
}
