// src/features/about/components/AboutMission.tsx
import { useTranslations } from "next-intl";
import { MISSION_ITEMS } from "../constants/about-data";

export function AboutMission() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MISSION_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-6 border border-slate-100/60 rounded-sm bg-white space-y-4"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center bg-brand-darkred/5 text-brand-darkred rounded-sm">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                {t(item.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(item.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
