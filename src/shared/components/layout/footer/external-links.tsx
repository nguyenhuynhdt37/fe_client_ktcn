"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function ExternalLinks() {
  const t = useTranslations("footer");

  const links = [
    { labelKey: "moe", href: "https://moet.gov.vn" },
    { labelKey: "vinh_uni", href: "https://vinhuni.edu.vn" },
    { labelKey: "etep", href: "http://etep.edu.vn" },
    { labelKey: "national_foreign_language_project", href: "http://deanngoai-ngu.edu.vn" },
    { labelKey: "nafosted", href: "https://nafosted.gov.vn" },
  ];

  return (
    <div className="space-y-5">
      <h3 className="text-base font-bold text-slate-900">{t("links")}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.labelKey}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-darkred flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium text-slate-600 transition-colors duration-150"
            >
              <ChevronRight size={14} className="text-slate-400" aria-hidden="true" />
              {t(link.labelKey)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
