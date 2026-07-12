import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { lecturerService } from "@/features/lecturer";
import { StaffHero, StaffBiography, StaffContactCard } from "@/features/lecturer";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const staff = await lecturerService.getStaffBySlug(slug);
  if (!staff) return { title: locale === "en" ? "Profile not found" : "Không tìm thấy hồ sơ" };
  const role = [staff.academic_title, staff.degree, staff.position?.name].filter(Boolean).join(", ");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";
  const canonicalUrl = locale === "en" ? `${siteUrl}/en/staffs/${slug}` : `${siteUrl}/vi/nhan-su/${slug}`;
  const description = role || (locale === "en" ? "Academic staff profile" : "Hồ sơ cán bộ, giảng viên");

  return {
    title: staff.full_name,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: `${siteUrl}/vi/nhan-su/${slug}`,
        en: `${siteUrl}/en/staffs/${slug}`,
        "x-default": `${siteUrl}/vi/nhan-su/${slug}`,
      },
    },
    openGraph: {
      title: staff.full_name,
      description,
      url: canonicalUrl,
      type: "profile",
    },
  };
}

export default async function StaffProfilePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const staff = await lecturerService.getStaffBySlug(slug);
  if (!staff) notFound();

  const isEn = locale === "en";
  const displayName = isEn && staff.english_name ? staff.english_name : staff.full_name;
  const credentials = [staff.academic_title, staff.degree].filter(Boolean).join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: displayName,
    jobTitle: staff.position?.name || undefined,
    email: staff.email || undefined,
    telephone: staff.phone || undefined,
    url: staff.website || undefined,
    affiliation: staff.department ? { "@type": "EducationalOrganization", name: staff.department.name } : undefined,
  };

  return (
    <div className="bg-background min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Banner Section */}
      <StaffHero
        staff={staff}
        displayName={displayName}
        credentials={credentials}
      />

      {/* Breadcrumb Section */}
      <div className="site-container py-6">
        <Breadcrumb
          items={[
            { name: isEn ? "Home" : "Trang chủ", href: "/" },
            ...(staff.department ? [{ name: staff.department.name, href: `/bo-mon/${staff.department.slug}` }] : []),
            { name: displayName },
          ]}
        />
      </div>

      {/* Main Details and Sidebar Contact Card */}
      <section className="pb-14 md:pb-20">
        <div className="site-container grid gap-8 lg:grid-cols-[1fr_320px] items-start">
          {/* Biography Content Card */}
          <StaffBiography staff={staff} isEn={isEn} />

          {/* Sidebar Contact Info Card */}
          <StaffContactCard staff={staff} isEn={isEn} />
        </div>
      </section>
    </div>
  );
}
