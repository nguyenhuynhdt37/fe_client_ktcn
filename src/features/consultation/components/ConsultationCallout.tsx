import { ArrowRight, Clock3, PhoneCall, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface ConsultationCalloutProps {
  className?: string;
  bgClass?: string;
  borderClass?: string;
}

export function ConsultationCallout({
  className,
  bgClass = "bg-brand-blue",
  borderClass = "border-brand-blue/15",
}: ConsultationCalloutProps) {
  const t = useTranslations("consultation");

  // Determine button text color based on background color
  const buttonTextClass = bgClass === "bg-brand-darkred" ? "text-brand-darkred" : "text-brand-blue";

  return (
    <section className={cn("site-container py-8 sm:py-10", className)}>
      <div className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] border p-6 text-white shadow-[var(--shadow-md)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10",
        bgClass,
        borderClass
      )}>
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
        <div className="mt-6 flex flex-wrap items-center gap-4 shrink-0 lg:mt-0">
          <Link
            href="/tu-van-tuyen-sinh"
            className={cn(
              buttonVariants({ size: "lg", variant: "ghost" }),
              "border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white transition-colors duration-200",
            )}
          >
            {t("callout_details")}
          </Link>
          <a
            href="https://tuyensinhchinhquy.vinhuni.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              buttonTextClass,
              "bg-white hover:bg-white/90 transition-colors duration-200",
            )}
          >
            {t("callout_action")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
