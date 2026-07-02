"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { GraduationCap, CalendarDays, FolderOpen } from "lucide-react";
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
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 relative after:absolute after:bottom-[-17px] after:left-0 after:w-12 after:h-[3px] after:bg-brand-darkred after:rounded-none">
          {tCommon("admission_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category=tuyen-sinh`} 
          className="text-sm font-semibold text-brand-darkred hover:text-brand-darkred-dark transition hover:underline"
        >
          {tCommon("view_all")}
        </Link>
      </div>

      {/* Banner ảnh tuyển sinh chính */}
      <div className="relative w-full aspect-[21/9] lg:max-h-[240px] rounded-none overflow-hidden shadow-sm">
        <Image
          src="/images/ts2022.jpg"
          alt={tAdmission("banner_alt")}
          fill
          sizes="(max-w-1024px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      {/* Navigation Tab Bar */}
      <div className="border-b border-slate-200">
        <div className="flex flex-wrap -mb-px gap-6">
          {displayTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 pb-3 text-sm font-semibold border-b-2 transition duration-200 focus:outline-none cursor-pointer ${
                activeTab === tab.id
                  ? "border-brand-darkred text-brand-darkred"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <GraduationCap size={15} />
              {tAdmission(tab.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Tab panel */}
      <div className="mt-6">
        {currentTab && currentTab.posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentTab.posts.map((post) => {
              const title = locale === "en" ? (post.titleEn || post.title) : post.title;
              const category = locale === "en" ? (post.categoryEn || post.category) : post.category;
              return (
                <article
                  key={post.id}
                  className="flex flex-col bg-white rounded-none overflow-hidden shadow-sm hover:shadow transition-all duration-200 group"
                >
                  <Link href={post.href} className="block relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={title}
                      fill
                      sizes="(max-w-768px) 100vw, 250px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col flex-1 p-5 space-y-3">
                    <Link href={post.href}>
                      <h4 className="text-[18px] font-bold text-slate-800 leading-snug group-hover:text-brand-darkred transition line-clamp-3">
                        {title}
                      </h4>
                    </Link>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 mt-auto">
                      <span className="flex items-center gap-1.5">
                        <FolderOpen size={13} />
                        <span>{category}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} />
                        <span>{post.date}</span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-sm font-medium">
            {tAdmission("empty")}
          </div>
        )}
      </div>
    </div>
  );
}
