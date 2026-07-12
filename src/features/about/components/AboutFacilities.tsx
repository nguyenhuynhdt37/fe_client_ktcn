// src/features/about/components/AboutFacilities.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { FACILITIES } from "../constants/about-data";

export function AboutFacilities() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-darkred bg-brand-darkred/6 rounded-full">
              {t("facilities_heading")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {t("facilities_heading")}
            </h2>
            <div className="w-16 h-[2px] bg-brand-darkred" />
            
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {t("facilities_desc")}
            </p>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-2">
              <span className="text-[11px] font-semibold text-brand-blue uppercase tracking-widest">
                {isEn ? "Research Environment" : "Môi trường học tập"}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEn 
                  ? "Standard CDIO education standards, focusing 70% on practical labs, team collaboration, and real-world system designs." 
                  : "Môi trường học tập tiêu chuẩn CDIO, tập trung hơn 70% thời lượng vào thực hành phòng thí nghiệm và thiết kế hệ thống thực tế."}
              </p>
            </div>
          </div>

          {/* Right Grid of Facilities */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="p-6 border border-slate-200/80 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-brand-blue/5 text-brand-blue rounded-xl">
                  {facility.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {t(facility.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {t(facility.descriptionKey)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
