// src/features/about/components/AboutHero.tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { ChevronRight, GraduationCap, Users, BookOpen, School, Award, Trophy } from "lucide-react";
import Image from "next/image";

export function AboutHero() {
  const t = useTranslations("about");

  const quickStats = [
    { value: "46", labelKey: "hero_stat_faculty", icon: <Users size={16} /> },
    { value: "6", labelKey: "hero_stat_depts", icon: <School size={16} /> },
    { value: "2", labelKey: "hero_stat_assoc_prof", icon: <Award size={16} /> },
    { value: "21", labelKey: "hero_stat_phds", icon: <GraduationCap size={16} /> },
    { value: "18", labelKey: "hero_stat_masters", icon: <BookOpen size={16} /> },
    { value: "1000+", labelKey: "hero_stat_students", icon: <Trophy size={16} /> },
  ];

  return (
    <section className="relative min-h-[70vh] lg:min-h-[85vh] w-full overflow-hidden flex flex-col justify-between bg-slate-950 text-white">
      {/* Background Image with Ken Burns / slow scale effect */}
      <div className="absolute inset-0 z-0 select-none">
        <SafeImage
          src="/images/about/set-activity-1.jpg"
          alt={t("hero_alt")}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45 transition-transform duration-[10s] scale-105"
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
      <div className="relative z-10 w-full flex-1 flex items-center py-12 md:py-20">
        <div className="max-w-[1360px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main titles and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-yellow bg-white/10 border border-white/15 rounded-md">
              {t("hero_badge")}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white">
              {t("hero_heading")}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {t("hero_subtext")}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
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

          {/* Quick Statistics panel */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-4 mb-6">
                {localeSelect(t("hero_badge"), "Thông số nổi bật", "Quick Statistics")}
              </h3>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {quickStats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-brand-yellow">
                      {stat.icon}
                      <span className="font-mono text-3xl font-bold tracking-tight text-white">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-400">
                      {t(stat.labelKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Spacer */}
      <div className="h-4 bg-slate-950 w-full z-10" />
    </section>
  );
}

// Simple helper for locale selections in client component
function localeSelect(currentBadge: string, viText: string, enText: string) {
  return currentBadge.toLowerCase().includes("trường") ? viText : enText;
}
