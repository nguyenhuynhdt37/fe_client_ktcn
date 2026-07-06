"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function QuickLinks() {
  const t = useTranslations("footer");

  const links = [
    { labelKey: "contact", href: "/lien-he" },
    { labelKey: "library", href: "/thu-vien" },
    { labelKey: "sitemap", href: "/so-do-trang" },
    { labelKey: "campus_map", href: "/so-do-truong" },
    { labelKey: "tour", href: "/tham-quan-trai-nghiem" },
  ];

  return (
    <div className="space-y-5">
      <h3 className="text-base font-bold text-slate-900">{t("info")}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.labelKey}>
            <Link
              href={link.href as any}
              className="hover:text-brand-darkred flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium text-slate-600 transition-colors duration-150"
            >
              <ChevronRight size={14} className="text-slate-400" aria-hidden="true" />
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
