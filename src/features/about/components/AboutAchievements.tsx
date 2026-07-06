// src/features/about/components/AboutAchievements.tsx
import { useTranslations } from "next-intl";
import { ACHIEVEMENTS } from "../constants/about-data";

export function AboutAchievements() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-[1360px] mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t("achievements_heading")}
          </h2>
        </div>

        {/* List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-5 border border-slate-100/60 rounded-sm bg-white"
            >
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-brand-darkred/5 text-brand-darkred rounded-sm">
                {item.icon}
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-base font-bold text-slate-800">
                  {t(item.titleKey)}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t(item.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
