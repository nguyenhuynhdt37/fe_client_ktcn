import type { Metadata } from "next";
import { CheckCircle2, Headphones, MessageSquareText, Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ConsultationForm } from "@/features/consultation";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";

interface ConsultationPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ConsultationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "consultation" });
  return {
    title: t("metadata_title"),
    description: t("metadata_description"),
  };
}

export default async function ConsultationPage({ params }: ConsultationPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "consultation" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <main className="bg-section-alt min-h-screen">
      <div className="site-container py-7 sm:py-10 lg:py-12">
        <Breadcrumb items={[{ name: tCommon("home"), href: "/" }, { name: t("breadcrumb") }]} />

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
          <section className="lg:pt-4">
            <p className="text-brand-orange text-sm font-bold">{t("eyebrow")}</p>
            <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("page_title")}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
              {t("page_description")}
            </p>

            <ul className="mt-8 space-y-5">
              <Benefit
                icon={MessageSquareText}
                title={t("benefit_questions_title")}
                description={t("benefit_questions_description")}
              />
              <Benefit
                icon={Headphones}
                title={t("benefit_contact_title")}
                description={t("benefit_contact_description")}
              />
              <Benefit
                icon={Users}
                title={t("benefit_audience_title")}
                description={t("benefit_audience_description")}
              />
            </ul>

            <div className="border-brand-blue/15 bg-brand-blue/5 mt-8 rounded-[var(--radius-md)] border p-4">
              <p className="text-foreground flex items-start gap-3 text-sm leading-6">
                <CheckCircle2
                  className="text-brand-blue mt-0.5 size-5 shrink-0"
                  aria-hidden="true"
                />
                {t("disclaimer")}
              </p>
            </div>
          </section>

          <ConsultationForm />
        </div>
      </div>
    </main>
  );
}

function Benefit({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof MessageSquareText;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="bg-brand-orange/10 text-brand-orange inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-foreground font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">{description}</p>
      </div>
    </li>
  );
}
