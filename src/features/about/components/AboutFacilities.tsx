// src/features/about/components/AboutFacilities.tsx
import { useTranslations } from "next-intl";
import { FACILITIES } from "../constants/about-data";

export function AboutFacilities() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Text */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              {t("facilities_heading")}
            </h2>
            <div className="w-16 h-[2px] bg-brand-darkred" />
            <p className="text-base text-slate-600 leading-relaxed">
              {t("facilities_desc")}
            </p>
          </div>

          {/* Grid facilities */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="p-5 border border-slate-100/60 rounded-sm bg-white space-y-3"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-brand-blue/6 text-brand-blue rounded-sm">
                  {facility.icon}
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  {t(facility.titleKey)}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
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
