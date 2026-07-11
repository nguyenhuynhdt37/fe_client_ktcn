// src/features/about/components/AboutHero.tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] w-full overflow-hidden flex flex-col justify-between bg-slate-950 text-white">
      {/* Background Image with Ken Burns / slow scale effect */}
      <div className="absolute inset-0 z-0 select-none">
        <SafeImage
          src="/images/about/set-activity-1.jpg"
          alt={t("hero_alt")}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 transition-transform duration-[10s] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
      </div>

      {/* Top Section: Breadcrumb & Logo */}
      <div className="relative z-10 w-full pt-6">
        <div className="max-w-[1360px] mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <nav className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <Link href="/" className="hover:text-white transition-colors duration-150">
              {t("breadcrumb_home")}
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-white">{t("breadcrumb_about")}</span>
          </nav>

          {/* School logo overlay */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-set.png"
              alt="SET Logo"
              width={40}
              height={40}
              className="object-contain brightness-0 invert"
              onError={(e) => {
                // Hide if logo doesn't exist to prevent broken image
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <span className="text-xs font-bold tracking-wider text-slate-300 uppercase hidden md:inline-block">
              SET VinhUni
            </span>
          </div>
        </div>
      </div>

      {/* Center Section: Main Content */}
      <div className="relative z-10 w-full flex-1 flex items-center py-12 md:py-16">
        <div className="max-w-[1360px] mx-auto px-6 w-full flex flex-col items-center justify-center text-center">
          
          {/* Main titles and CTAs */}
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-yellow bg-white/10 border border-white/15 rounded-md">
              {t("hero_badge")}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.1] text-white">
              {t("hero_heading")}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              {t("hero_subtext")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href={"/tin-tuc?category_slug=tuyen-sinh" as any}
                className="bg-brand-darkred hover:bg-brand-darkred-dark inline-flex min-h-12 items-center justify-center rounded-lg px-6 text-sm font-bold text-white transition-all shadow-md active:scale-98"
              >
                {t("hero_cta_programs")}
              </Link>
              <a
                href="#faculty-members"
                className="bg-white/10 hover:bg-white/15 border border-white/10 inline-flex min-h-12 items-center justify-center rounded-lg px-6 text-sm font-bold text-white transition-all active:scale-98"
              >
                {t("hero_cta_faculty")}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Spacer */}
      <div className="h-4 bg-slate-950 w-full z-10" />
    </section>
  );
}
