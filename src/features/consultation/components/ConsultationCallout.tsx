import { ArrowRight, Clock3, PhoneCall, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export function ConsultationCallout() {
  const t = useTranslations("consultation");

  return (
    <section className="site-container py-8 sm:py-10">
      <div className="border-brand-blue/15 bg-brand-blue relative overflow-hidden rounded-[var(--radius-lg)] border p-6 text-white shadow-[var(--shadow-md)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <p className="text-brand-yellow text-sm font-semibold">{t("callout_eyebrow")}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("callout_title")}
          </h2>
          <p className="mt-3 leading-7 text-white/80">{t("callout_description")}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <Clock3 className="size-4 text-white" aria-hidden="true" />
              {t("callout_fast")}
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-white" aria-hidden="true" />
              {t("callout_secure")}
            </span>
            <span className="flex items-center gap-2">
              <PhoneCall className="size-4 text-white" aria-hidden="true" />
              {t("callout_relevant")}
            </span>
          </div>
        </div>
        <Link
          href="/tu-van-tuyen-sinh"
          className={cn(
            buttonVariants({ size: "lg" }),
            "text-brand-blue mt-6 shrink-0 bg-white hover:bg-white/90 lg:mt-0",
          )}
        >
          {t("callout_action")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
