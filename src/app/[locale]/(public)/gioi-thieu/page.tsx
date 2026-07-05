// src/app/[locale]/(public)/gioi-thieu/page.tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {
  AboutHero,
  AboutOverview,
  AboutVideo,
  AboutTimeline,
  AboutMission,
  AboutDepartments,
  AboutLeadership,
  AboutStats,
  AboutFacilities,
  AboutPartners,
  AboutAchievements,
  AboutContact,
} from "@/features/about";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: t("meta_title"),
      description: t("meta_description"),
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Trường Kỹ thuật và Công nghệ - Trường Đại học Vinh",
            alternateName: "SET - VinhUni",
            url: "https://ktcn.vinhuni.edu.vn",
            address: {
              "@type": "PostalAddress",
              streetAddress: "182 Lê Duẩn",
              addressLocality: "Thành phố Vinh",
              addressRegion: "Nghệ An",
              addressCountry: "VN",
            },
            parentOrganization: {
              "@type": "CollegeOrUniversity",
              name: "Trường Đại học Vinh",
              url: "https://vinhuni.edu.vn",
            },
            foundingDate: "2017-04",
          }),
        }}
      />

      <AboutHero />
      <AboutOverview />
      <AboutVideo />
      <AboutTimeline />
      <AboutMission />
      <AboutDepartments />
      <AboutLeadership />
      <AboutStats />
      <AboutFacilities />
      <AboutPartners />
      <AboutAchievements />
      <AboutContact />
    </>
  );
}
