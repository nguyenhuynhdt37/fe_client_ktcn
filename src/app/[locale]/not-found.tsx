"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-9xl font-extrabold text-brand-darkred">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("not_found")}
        </h2>
        <p className="mt-4 text-base text-slate-500">
          {t("error")}
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-none bg-brand-darkred px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-darkred/90 transition cursor-pointer"
          >
            {t("home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
