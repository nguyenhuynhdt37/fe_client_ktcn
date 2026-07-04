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
      <h3 className="text-brand-darkred text-sm font-semibold uppercase tracking-wider border-b border-brand-darkred/30 pb-2.5 w-fit">
        {t("links")}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.labelKey}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[13px] text-slate-600 hover:text-brand-darkred hover:translate-x-0.5 transition-all duration-200"
            >
              <ChevronRight size={12} className="text-slate-300" />
              {t(link.labelKey)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
