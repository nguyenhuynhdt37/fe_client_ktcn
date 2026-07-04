"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { GraduationCap, CalendarDays, FolderOpen, ArrowRight, Pin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface AdmissionPost {
  id: string | number;
  title: string;
  titleEn?: string;
  imageUrl: string;
  category: string;
  categoryEn?: string;
  categoryHref: string;
  date: string;
  href: string;
  isPinned?: boolean;
}

interface TabData {
  id: string;
  labelKey: string; // Sử dụng labelKey thay vì label hardcoded
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
        imageUrl: "/Upload/images/DAOTAO/tb-diem-chuan.jpg",
        category: "Đại học chính quy",
        categoryEn: "Regular Undergraduate",
        categoryHref: "/tin-tuc?category=tuyen-sinh",
        date: "25/09/2022",
        href: "/tin-tuc/diem-trung-tuyen-2022",
      },
      {
        id: 2,
        title: "Tuyển sinh năm 2022: Tạo thuận lợi tối đa cho thí sinh và cơ sở đào tạo",
        titleEn: "Admissions 2022: Creating maximum convenience for candidates and training institutions",
        imageUrl: "/Upload/images/TUYENSINH2022/hoi-nghi-tuyen-sinh-7627.jpg",
        category: "Đại học chính quy",
        categoryEn: "Regular Undergraduate",
        categoryHref: "/tin-tuc?category=tuyen-sinh",
        date: "06/04/2022",
        href: "/tin-tuc/tuyen-sinh-nam-2022-thuan-loi",
      },
      {
        id: 3,
        title: "Thông tin tuyển sinh đại học chính quy năm 2022 Trường Đại học Vinh",
        titleEn: "Regular undergraduate admissions information in 2022 Vinh University",
        imageUrl: "/Upload/images/TUYENSINH2022/2022-ts-chinh-quy-002.png",
        category: "Đại học chính quy",
        categoryEn: "Regular Undergraduate",
        categoryHref: "/tin-tuc?category=tuyen-sinh",
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
        titleEn: "Notification of master degree training admissions batch 1 in 2022",
        imageUrl: "/Upload/images/SDH/2022-sdh-0001.jpg",
        category: "Thạc sĩ",
        categoryEn: "Master Degree",
        categoryHref: "/tin-tuc?category=tuyen-sinh",
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
}

export function AdmissionSection({ tabs = defaultTabs, initialArticles }: AdmissionSectionProps) {
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
    <div className="space-y-8">
      {/* Header tiêu đề */}
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-foreground relative after:absolute after:bottom-[-21px] after:left-0 after:w-14 after:h-[2px] after:bg-brand-darkred">
          {tCommon("admission_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category=tuyen-sinh` as any} 
          className="flex items-center gap-1.5 text-[13px] font-medium text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group"
        >
          <span>{tCommon("view_all")}</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* Banner ảnh tuyển sinh chính */}
      <div className="relative w-full aspect-[21/9] lg:max-h-[240px] rounded-lg overflow-hidden shadow-[var(--shadow-sm)]">
        <Image
          src="/images/ts2022.jpg"
          alt={tAdmission("banner_alt")}
          fill
          sizes="(max-w-1024px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      {/* Navigation Tab Bar */}
      <div className="border-b border-border/60">
        <div className="flex flex-wrap -mb-px gap-5">
          {displayTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 pb-3 text-[13px] font-medium border-b-2 transition-all duration-200 focus:outline-none cursor-pointer ${
                activeTab === tab.id
                  ? "border-brand-darkred text-brand-darkred"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-slate-200"
              }`}
            >
              <GraduationCap size={14} />
              {tAdmission(tab.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Tab panel */}
      <div className="mt-6">
        {currentTab && currentTab.posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {currentTab.posts.map((post) => {
              const title = locale === "en" ? (post.titleEn || post.title) : post.title;
              const category = locale === "en" ? (post.categoryEn || post.category) : post.category;
              return (
                <article
                  key={post.id}
                  className="flex flex-col bg-white rounded-lg overflow-hidden border border-border/30 hover:border-border/60 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <Link href={post.href as any} className="block relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={title}
                      fill
                      sizes="(max-w-768px) 100vw, 250px"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    
                    {/* Badge ghim */}
                    {post.isPinned && (
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-amber-500 text-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 rounded-sm shadow-sm">
                          <Pin size={8} className="fill-white" />
                          <span>Ghim</span>
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-col flex-1 p-5 space-y-3">
                    <Link href={post.href as any}>
                      <h4 className="text-[17px] font-semibold text-card-foreground leading-snug group-hover:text-brand-darkred transition-colors duration-200 line-clamp-3">
                        {title}
                      </h4>
                    </Link>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/40 mt-auto">
                      <span className="flex items-center gap-1">
                        <FolderOpen size={11} />
                        <span>{category}</span>
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
          <div className="text-center py-12 text-muted-foreground text-sm font-normal">
            {tAdmission("empty")}
          </div>
        )}
      </div>
    </div>
  );
}
