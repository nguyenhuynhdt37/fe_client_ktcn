"use client";

import { useTranslations } from "next-intl";

export function Copyright() {
  const t = useTranslations("footer");

  return (
    <div className="bg-brand-darkred-dark text-white/80 text-center py-3.5 px-6 text-[12px] font-normal tracking-wide">
      <div className="max-w-7xl mx-auto">
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </div>
  );
}
