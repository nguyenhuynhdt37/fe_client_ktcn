"use client";

import { useTranslations } from "next-intl";

export function Copyright() {
  const t = useTranslations("footer");

  return (
    <div className="bg-brand-darkred-dark px-6 py-4 text-center text-sm font-normal text-white/85">
      <div className="site-container">{t("copyright", { year: new Date().getFullYear() })}</div>
    </div>
  );
}
