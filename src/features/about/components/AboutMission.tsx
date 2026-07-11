// src/features/about/components/AboutMission.tsx
"use client";

import { useTranslations } from "next-intl";
import { MISSION_ITEMS } from "../constants/about-data";
import { GraduationCap } from "lucide-react";

export function AboutMission() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20 bg-slate-50/50">
      <div className="max-w-[1360px] mx-auto px-6 space-y-12">
        {/* Core items grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MISSION_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-8 border border-border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 space-y-5"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center bg-brand-darkred/5 text-brand-darkred rounded-lg">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {t(item.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t(item.descriptionKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Educational Philosophy (Triết lý giáo dục) Banner */}
        <div className="border border-border bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 text-slate-100 opacity-30 select-none z-0">
            <GraduationCap size={160} />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-darkred bg-brand-darkred/5 rounded-md">
              {t("philosophy_title")}
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              &ldquo;{t("philosophy_desc")}&rdquo;
            </h3>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {t("philosophy_subtext")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
