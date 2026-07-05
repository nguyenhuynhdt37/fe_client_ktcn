// src/features/about/components/AboutHero.tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { ChevronRight } from "lucide-react";

export function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
      {/* Ảnh nền */}
      <SafeImage
        src="/images/about-hero.png"
        alt={t("hero_alt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="max-w-[1360px] mx-auto px-6 pb-10 md:pb-14 w-full space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <Link href="/" className="hover:text-white transition-colors duration-150">
              {t("breadcrumb_home")}
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-white">{t("breadcrumb_about")}</span>
          </nav>

          {/* Badge */}
          <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-yellow bg-white/10 border border-white/15 rounded-sm">
            {t("hero_badge")}
          </span>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight max-w-3xl">
            {t("hero_heading")}
          </h1>

          {/* Sub text */}
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl">
            {t("hero_subtext")}
          </p>
        </div>
      </div>
    </section>
  );
}
