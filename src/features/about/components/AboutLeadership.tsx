// src/features/about/components/AboutLeadership.tsx
import { useTranslations } from "next-intl";
import { LEADERS } from "../constants/about-data";
import { LeaderCard } from "./LeaderCard";

export function AboutLeadership() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-[1360px] mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t("leadership_heading")}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t("leadership_subtext")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {LEADERS.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
