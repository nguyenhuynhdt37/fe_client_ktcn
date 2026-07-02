"use client";

import { useTranslations } from "next-intl";

export function Copyright() {
  const t = useTranslations("footer");

  return (
    <div className="bg-brand-darkred-dark text-white text-center py-4 px-6 text-[15px] font-medium">
      <div className="max-w-7xl mx-auto">
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </div>
  );
}
