"use client";

import { Users, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

export function VisitorStatistics() {
  const t = useTranslations("footer");

  return (
    <div className="bg-slate-100/80 py-3 px-6 border-b border-border/30">
      <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <span className="font-semibold text-brand-blue/70 tracking-wider uppercase">
          {t("visitor_statistics").toUpperCase()}:
        </span>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <Users size={12} className="text-brand-blue/50" />
            {t("online_count", { count: 40 })}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={12} className="text-brand-blue/50" />
            {t("total_visits_count", { count: 1703054 })}
          </span>
        </div>
      </div>
    </div>
  );
}
