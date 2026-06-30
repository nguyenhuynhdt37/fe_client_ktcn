"use client";

import { ArrowRight } from "lucide-react";
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
    <div className="space-y-4">
      <h3 className="text-[#d82026] text-base font-bold border-b-2 border-[#d82026] pb-2 w-fit">
        {t("links")}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.labelKey}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-700 hover:text-brand-blue hover:translate-x-1 transition duration-200"
            >
              <ArrowRight size={14} className="text-brand-blue" />
              {t(link.labelKey)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
