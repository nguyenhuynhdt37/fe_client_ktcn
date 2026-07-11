// src/features/about/components/AboutOrgStructure.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Network, ChevronDown, Landmark, School, Award, ArrowRight, ShieldCheck } from "lucide-react";

export function AboutOrgStructure() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isEn = locale === "en";

  const depts = [
    { name: isEn ? "Faculty of Information Technology" : "Khoa Công nghệ thông tin", slug: "khoa-cntt" },
    { name: isEn ? "Faculty of Electronics & Automation" : "Khoa Điện tử - Tự động hóa", slug: "khoa-dien-tu" },
    { name: isEn ? "Faculty of Civil Engineering" : "Khoa Kỹ thuật Xây dựng", slug: "khoa-xay-dung" },
    { name: isEn ? "Faculty of Mechanical & Automotive Engineering" : "Khoa Cơ khí & Ô tô", slug: "khoa-co-khi" },
  ];

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[1360px] mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-brand-darkred bg-brand-darkred/5 px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider">
            <Network size={14} />
            <span>{t("org_heading")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t("org_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("org_subtext")}
          </p>
        </div>

        {/* Tree container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center select-none pt-4">
          
          {/* Level 1: University */}
          <div className="flex flex-col items-center w-full">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-6 py-3.5 shadow-sm flex items-center gap-2.5 max-w-sm text-center">
              <Landmark size={18} className="text-slate-600" />
              <span className="text-sm font-bold text-slate-800 tracking-tight">
                {t("org_univ")}
              </span>
            </div>
            {/* Connection line */}
            <div className="w-[1.5px] h-8 bg-slate-200" />
          </div>

          {/* Level 2: School */}
          <div className="flex flex-col items-center w-full">
            <div className="bg-brand-blue border border-brand-blue text-white rounded-xl px-6 py-4 shadow-md flex items-center gap-2.5 max-w-md text-center">
              <School size={20} className="text-brand-yellow" />
              <span className="text-base font-bold tracking-tight">
                {t("org_school")}
              </span>
            </div>
            {/* Connection line */}
            <div className="w-[1.5px] h-8 bg-slate-200" />
          </div>

          {/* Level 3: Board of Deans */}
          <div className="flex flex-col items-center w-full">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-6 py-3.5 shadow-sm flex items-center gap-2.5 max-w-sm text-center">
              <Award size={18} className="text-brand-darkred" />
              <span className="text-sm font-bold text-slate-800 tracking-tight">
                {t("org_board")}
              </span>
            </div>
            {/* Connection line */}
            <div className="w-[1.5px] h-8 bg-slate-200" />
          </div>

          {/* Level 4: Branches (Office and Academic Departments) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative">
            {/* Horizontal connection line for desktop */}
            <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-slate-200" />
            
            {/* Left Branch: Administration */}
            <div className="flex flex-col items-center md:items-end w-full md:pr-10 relative">
              <div className="hidden md:block absolute right-0 top-0 w-10 h-[1.5px] bg-slate-200" />
              <div className="w-[1.5px] h-8 bg-slate-200 md:hidden" />
              
              <div className="bg-white border border-border rounded-xl p-5 shadow-sm w-full max-w-sm space-y-2 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <ShieldCheck size={16} className="text-slate-500" />
                  <span>{t("org_office")}</span>
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  {t("org_office_desc")}
                </p>
              </div>
            </div>

            {/* Right Branch: Academic Departments */}
            <div className="flex flex-col items-center md:items-start w-full md:pl-10 relative">
              <div className="hidden md:block absolute left-0 top-0 w-10 h-[1.5px] bg-slate-200" />
              <div className="w-[1.5px] h-8 bg-slate-200 md:hidden" />
              
              <div className="bg-white border border-border rounded-xl p-5 shadow-sm w-full max-w-md space-y-4">
                <div className="text-slate-800 font-bold text-sm border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span>{isEn ? "Academic Departments" : "Khoa đào tạo chuyên môn"}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </div>
                
                {/* Department nodes */}
                <div className="grid grid-cols-1 gap-2.5 w-full">
                  {depts.map((dept, index) => (
                    <Link
                      key={index}
                      href={`/co-cau-to-chuc/${dept.slug}` as any}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-brand-darkred/[0.02] hover:border-brand-darkred/25 transition-all group"
                    >
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-darkred transition-colors duration-150">
                        {dept.name}
                      </span>
                      <ArrowRight size={12} className="text-slate-400 group-hover:text-brand-darkred group-hover:translate-x-0.5 transition-all duration-150" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
