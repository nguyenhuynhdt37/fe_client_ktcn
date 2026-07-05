// src/features/about/components/DepartmentCard.tsx
import { useTranslations } from "next-intl";
import type { Department } from "../types/about.types";

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const t = useTranslations("about");

  return (
    <div className="p-5 border border-slate-100/60 rounded-sm bg-white space-y-3 hover:border-slate-200/80 transition-colors duration-200">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-brand-blue/6 text-brand-blue rounded-sm">
        {department.icon}
      </div>

      {/* Tên ngành */}
      <h4 className="text-base font-bold text-slate-800 leading-normal">
        {t(department.nameKey)}
      </h4>

      {/* Mã ngành */}
      <p className="text-xs text-slate-400 font-medium">
        {t("dept_code_label")}: {department.code}
      </p>

      {/* Tổ hợp xét tuyển */}
      <div className="flex flex-wrap gap-1.5">
        {department.subjectGroups.map((group) => (
          <span
            key={group}
            className="px-2 py-0.5 text-[10px] font-bold text-brand-darkred bg-brand-darkred/5 border border-brand-darkred/10 rounded-sm"
          >
            {group}
          </span>
        ))}
      </div>
    </div>
  );
}
