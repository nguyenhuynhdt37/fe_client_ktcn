import { getTranslations } from "next-intl/server";
import { lecturerService } from "@/features/lecturer";
import { LeaderCard } from "./LeaderCard";
import { getLocale } from "next-intl/server";

export async function AboutLeadership() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "about" });

  // Fetch leadership data from the CMS/database API
  const leaders = await lecturerService.getStaffs({ 
    departmentSlug: locale === "en" ? "institute-board-of-management" : "ban-lanh-dao-vien", 
    lang: locale 
  }) || [];

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-[1360px] mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t("leadership_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {t("leadership_subtext")}
          </p>
        </div>

        {/* Grid of leader cards */}
        {leaders.length === 0 ? (
          <div className="text-center text-sm text-slate-400 py-12">
            {locale === "en" ? "No leadership information available." : "Hiện chưa có thông tin ban lãnh đạo."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto justify-center">
            {leaders.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
