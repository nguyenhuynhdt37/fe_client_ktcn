import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArticleNotificationList } from "@/features/notification/components/ArticleNotificationList";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";

interface NotificationsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: NotificationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notifications" });
  return {
    title: t("metadata_title"),
    description: t("metadata_description"),
  };
}

export default async function NotificationsPage({ params }: NotificationsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "notifications" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <main className="bg-section-alt min-h-screen">
      <div className="site-container py-7 sm:py-10 lg:py-12">
        <Breadcrumb items={[{ name: tCommon("home"), href: "/" }, { name: t("breadcrumb") }]} />
        <div className="mt-7 mb-7 max-w-3xl">
          <p className="text-brand-orange text-sm font-bold">{t("eyebrow")}</p>
          <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("page_title")}
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-7">{t("page_description")}</p>
        </div>
        <ArticleNotificationList />
      </div>
    </main>
  );
}
