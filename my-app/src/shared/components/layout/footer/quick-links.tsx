"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
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
    <div className="space-y-4">
      <h3 className="text-[#d82026] text-base font-bold border-b-2 border-[#d82026] pb-2 w-fit">
        {t("info")}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.labelKey}>
            <Link
              href={link.href}
              className="flex items-center gap-1.5 text-slate-700 hover:text-brand-blue hover:translate-x-1 transition duration-200"
            >
              <ArrowRight size={14} className="text-brand-blue" />
              {t(link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
