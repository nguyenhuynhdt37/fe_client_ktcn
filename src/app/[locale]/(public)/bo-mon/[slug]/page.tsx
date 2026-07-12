import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { departmentService } from "@/features/department";
import {
  DepartmentHero,
  DepartmentStats,
  DepartmentAbout,
  DepartmentMission,
  DepartmentPrograms,
  DepartmentStaff,
  DepartmentArticles,
  DepartmentGallery,
  DepartmentContact,
} from "@/features/department";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const overview = await departmentService.getOverview(slug);
  if (!overview) return { title: locale === "en" ? "Unit not found" : "Không tìm thấy đơn vị" };
  const department = overview.department;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";
  const canonicalUrl = locale === "en" ? `${siteUrl}/en/departments/${slug}` : `${siteUrl}/vi/bo-mon/${slug}`;

  const fallbackDescription = locale === "en"
    ? `Information about the ${department.name} at the College of Engineering and Technology, Vinh University.`
    : `Thông tin giới thiệu về ${department.name} tại Trường Kỹ thuật và Công nghệ - Đại học Vinh.`;

  const rawDescription = department.seo_description || department.short_description || department.description || fallbackDescription;
  const cleanDescription = stripHtml(rawDescription).slice(0, 160) || fallbackDescription;

  return {
    title: department.seo_title || department.name,
    description: cleanDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: `${siteUrl}/vi/bo-mon/${slug}`,
        en: `${siteUrl}/en/departments/${slug}`,
        "x-default": `${siteUrl}/vi/bo-mon/${slug}`,
      },
    },
    openGraph: {
      title: department.seo_title || department.name,
      description: cleanDescription,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function DepartmentOverviewPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const overview = await departmentService.getOverview(slug);
  if (!overview) notFound();

  const {
    department,
    staffs = [],
    stats,
    programs = [],
    latest_articles: latestArticles = [],
    galleries = [],
  } = overview;
  const isEn = locale === "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: department.name,
    description: department.short_description || department.description || undefined,
    email: department.email || undefined,
    telephone: department.phone || undefined,
    url: department.website || undefined,
  };

  return (
    <div className="bg-background min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <DepartmentHero department={department} isEn={isEn} />

      {/* Stats Section */}
      <DepartmentStats stats={stats} isEn={isEn} />

      {/* About/Mission/Vision Section */}
      <DepartmentAbout department={department} isEn={isEn} />

      {/* Staff Section */}
      <DepartmentStaff staffs={staffs} isEn={isEn} />

      {/* Mission & Vision Section */}
      <DepartmentMission department={department} isEn={isEn} />

      {/* Study Programs Section */}
      <DepartmentPrograms programs={programs} isEn={isEn} />

      {/* News/Articles Section */}
      <DepartmentArticles latestArticles={latestArticles} isEn={isEn} />

      {/* Photo Gallery Section */}
      <DepartmentGallery galleries={galleries} isEn={isEn} />

      {/* Contact Section */}
      <DepartmentContact department={department} isEn={isEn} />
    </div>
  );
}
