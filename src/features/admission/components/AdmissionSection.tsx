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
        excerpt:
          "Nhà trường chính thức thông báo điểm trúng tuyển xét tuyển đợt 1 vào các ngành đào tạo đại học hệ chính quy năm 2022. Thí sinh tra cứu kết quả trực tuyến để thực hiện thủ tục nhập học.",
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
        excerpt:
          "Trường Đại học Vinh thông báo tuyển sinh đào tạo trình độ thạc sĩ đợt 1 năm 2022 các chuyên ngành kỹ thuật, công nghệ, kinh tế với nhiều phương thức xét tuyển linh hoạt.",
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

export function AdmissionSection({
  tabs = defaultTabs,
  initialArticles,
  categorySlug = "tuyen-sinh",
}: AdmissionSectionProps) {
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
      <div className="flex items-center justify-between gap-4">
        <h2 className="section-heading">{tCommon("admission_title")}</h2>
        <Link
          href={`/tin-tuc?category_slug=${categorySlug}` as any}
          className="group text-brand-darkred hover:bg-brand-darkred/5 hover:text-brand-darkred-dark inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm font-semibold transition-colors duration-150"
        >
          <span>{tCommon("view_all")}</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Navigation Tab Bar */}
      <div className="border-border overflow-x-auto border-b select-none">
        <div className="-mb-px flex min-w-max gap-1">
          {displayTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={`flex min-h-11 items-center gap-1.5 border-b-2 px-3 text-sm font-semibold transition-colors duration-150 ${
                activeTab === tab.id
                  ? "border-brand-darkred text-brand-darkred"
                  : "border-transparent text-slate-600 hover:border-slate-200 hover:text-slate-800"
              }`}
            >
              <GraduationCap size={16} aria-hidden="true" />
              {tAdmission(tab.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Tab panel (Grid 3 card đều nhau phẳng đẹp) */}
      <div className="mt-4">
        {currentTab && currentTab.posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {currentTab.posts.slice(0, 3).map((post) => {
              const title = locale === "en" ? post.titleEn || post.title : post.title;
              const category = locale === "en" ? post.categoryEn || post.category : post.category;
              return (
                <article
                  key={post.id}
                  className="group border-border hover:border-brand-blue/25 flex flex-col overflow-hidden rounded-xl border bg-white transition-[border-color,transform] duration-200 hover:-translate-y-0.5"
                >
                  <Link
                    href={post.href as any}
                    className="border-border-subtle bg-surface relative block aspect-[16/10] overflow-hidden border-b"
                  >
                    <SafeImage
                      src={post.imageUrl}
                      alt={title}
                      fill
                      sizes="(max-w-768px) 100vw, 250px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Badge ghim */}
                    {post.isPinned && (
                      <div className="absolute top-2 left-2 z-10">
                        <span className="flex items-center gap-1 rounded-md bg-amber-600 px-2 py-1 text-xs font-semibold text-white">
                          <Pin size={12} className="fill-white" aria-hidden="true" />
                          <span>Ghim</span>
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col space-y-3 p-5">
                    <Link href={post.href as any}>
                      <h3 className="group-hover:text-brand-darkred line-clamp-3 text-base leading-snug font-semibold text-slate-800 transition-colors duration-150">
                        {title}
                      </h3>
                    </Link>
                    {post.excerpt && (
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="border-border-subtle mt-auto flex items-center justify-between gap-3 border-t pt-4 text-xs font-medium text-slate-600">
                      <span className="text-brand-darkred max-w-[130px] truncate font-semibold">
                        {category}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} aria-hidden="true" />
                        <span>{post.date}</span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-sm font-medium text-slate-400">
            {tAdmission("empty")}
          </div>
        )}
      </div>
    </div>
  );
}
