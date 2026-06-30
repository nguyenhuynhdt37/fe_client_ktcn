"use client";

import { Users, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

export function VisitorStatistics() {
  const t = useTranslations("footer");

  return (
    <div className="bg-[#e6e6e6] py-3.5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-brand-blue">
        <span className="font-bold text-brand-blue tracking-wider">
          {t("visitor_statistics").toUpperCase()}:
        </span>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-brand-blue" />
            {t("online_count", { count: 40 })}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={14} className="text-brand-blue" />
            {t("total_visits_count", { count: 1703054 })}
          </span>
        </div>
      </div>
    </div>
  );
}
