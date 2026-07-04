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
      <h3 className="text-brand-darkred text-sm font-semibold uppercase tracking-wider border-b border-brand-darkred/30 pb-2.5 w-fit">
        {t("info")}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.labelKey}>
            <Link
              href={link.href as any}
              className="flex items-center gap-1.5 text-[13px] text-slate-600 hover:text-brand-darkred hover:translate-x-0.5 transition-all duration-200"
            >
              <ChevronRight size={12} className="text-slate-300" />
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
