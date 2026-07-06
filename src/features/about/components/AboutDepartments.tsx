// src/features/about/components/AboutDepartments.tsx
import { useTranslations } from "next-intl";
import { DEPARTMENTS } from "../constants/about-data";
import { DepartmentCard } from "./DepartmentCard";

export function AboutDepartments() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60">
      <div className="max-w-[1360px] mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t("departments_heading")}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t("departments_subtext")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEPARTMENTS.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </div>
    </section>
  );
}
