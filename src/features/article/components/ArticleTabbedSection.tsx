"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { NewsSection } from "./NewsGrid";
import { ResearchSection } from "@/features/research/components/ResearchSection";
import { StudentActivities } from "@/features/student/components/StudentActivities";

interface ArticleTabbedSectionProps {
  newsArticles: any[];
  newsCategorySlug: string;
  researchArticles: any[];
  researchCategorySlug: string;
  studentList: any[];
  studentCategorySlug: string;
}

type TabType = "news" | "research" | "student";

export function ArticleTabbedSection({
  newsArticles,
  newsCategorySlug,
  researchArticles,
  researchCategorySlug,
  studentList,
  studentCategorySlug,
}: ArticleTabbedSectionProps) {
  const tCommon = useTranslations("common");
  const tArticle = useTranslations("article");
  const [activeTab, setActiveTab] = useState<TabType>("news");

  // Định nghĩa URL "Xem tất cả" động cho từng tab
  const getViewAllHref = () => {
    switch (activeTab) {
      case "news":
        return `/tin-tuc?category_slug=${newsCategorySlug}` as any;
      case "research":
        return `/tin-tuc?category_slug=${researchCategorySlug}` as any;
      case "student":
        return `/tin-tuc?category_slug=${studentCategorySlug}` as any;
    }
  };

  return (
    <section className="py-14 md:py-20 max-w-[1360px] mx-auto px-6 space-y-8">
      {/* Thanh Header gộp các Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 gap-4">
        
        {/* Hàng các nút Tabs phẳng */}
        <div className="flex flex-wrap gap-6 sm:gap-8">
          <button
            type="button"
            onClick={() => setActiveTab("news")}
            className={`pb-3 -mb-[13px] text-sm sm:text-base font-bold uppercase tracking-wider transition-colors duration-150 border-b-2 cursor-pointer ${
              activeTab === "news"
                ? "border-brand-darkred text-brand-darkred"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {tArticle("title")}
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab("research")}
            className={`pb-3 -mb-[13px] text-sm sm:text-base font-bold uppercase tracking-wider transition-colors duration-150 border-b-2 cursor-pointer ${
              activeTab === "research"
                ? "border-brand-darkred text-brand-darkred"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {tCommon("research_title")}
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab("student")}
            className={`pb-3 -mb-[13px] text-sm sm:text-base font-bold uppercase tracking-wider transition-colors duration-150 border-b-2 cursor-pointer ${
              activeTab === "student"
                ? "border-brand-darkred text-brand-darkred"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {tCommon("student_activities_title")}
          </button>
        </div>

        {/* Nút Xem Tất Cả chung */}
        <Link
          href={getViewAllHref()}
          className="flex items-center gap-1 text-xs font-bold text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-150 self-start sm:self-auto"
        >
          <span>{tCommon("view_all")}</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Vùng render nội dung phẳng */}
      <div className="w-full">
        {activeTab === "news" && (
          <NewsSection 
            articles={newsArticles} 
            categorySlug={newsCategorySlug} 
            hideHeader 
          />
        )}
        
        {activeTab === "research" && (
          <ResearchSection 
            articles={researchArticles} 
            categorySlug={researchCategorySlug} 
            hideHeader 
          />
        )}
        
        {activeTab === "student" && (
          <StudentActivities 
            activities={studentList} 
            categorySlug={studentCategorySlug} 
            hideHeader 
          />
        )}
      </div>
    </section>
  );
}
