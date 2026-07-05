// src/features/about/components/AboutPartners.tsx
import { useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { PARTNERS } from "../constants/about-data";

export function AboutPartners() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60">
      <div className="max-w-[1360px] mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t("partners_heading")}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t("partners_desc")}
          </p>
        </div>

        {/* Grid đối tác */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center p-4 border border-slate-100/60 rounded-sm bg-white text-center space-y-2 hover:border-slate-200/80 transition-colors duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-brand-blue/6 text-brand-blue rounded-sm">
                <Globe className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-700 leading-normal">
                {partner.name}
              </p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                {partner.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
