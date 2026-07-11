import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Building2, ExternalLink, Globe, Mail, MapPin, Phone } from "lucide-react";

import { lecturerService, StaffPortrait } from "@/features/lecturer";
import { Link } from "@/i18n/routing";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";
import { SafeImage } from "@/shared/components/ui/safe-image";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const staff = await lecturerService.getStaffBySlug(slug);
  if (!staff) return { title: locale === "en" ? "Profile not found" : "Không tìm thấy hồ sơ" };
  const role = [staff.academic_title, staff.degree, staff.position?.name].filter(Boolean).join(", ");
  return {
    title: staff.full_name,
    description: role || (locale === "en" ? "Academic staff profile" : "Hồ sơ cán bộ, giảng viên"),
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
  const contactItems = [
    staff.email ? { icon: Mail, label: "Email", value: staff.email, href: `mailto:${staff.email}` } : null,
    staff.phone ? { icon: Phone, label: isEn ? "Phone" : "Điện thoại", value: staff.phone, href: `tel:${staff.phone}` } : null,
    staff.office ? { icon: MapPin, label: isEn ? "Office" : "Văn phòng", value: staff.office } : null,
    staff.website ? { icon: Globe, label: "Website", value: staff.website, href: staff.website } : null,
  ].filter(Boolean) as Array<{ icon: typeof Mail; label: string; value: string; href?: string }>;

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
    <main className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative isolate overflow-hidden bg-brand-blue text-white">
        <SafeImage src="/images/about/set-it.jpg" alt="Không gian học tập tại Trường Kỹ thuật và Công nghệ" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-blue/90" />
        <div className="site-container relative grid min-h-[46dvh] items-end gap-7 py-10 sm:grid-cols-[220px_1fr] sm:py-14">
          <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-lg border border-white/25 bg-white/10 sm:w-full">
            <StaffPortrait name={displayName} src={staff.avatar_object_key} sizes="220px" priority />
          </div>
          <div className="pb-1">
            {staff.position?.name && <p className="text-sm font-semibold text-white/82">{staff.position.name}</p>}
            <h1 className="mt-2 max-w-4xl text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">{displayName}</h1>
            {credentials && <p className="mt-4 text-lg font-semibold text-white/90">{credentials}</p>}
            {staff.department && (
              <Link href={{ pathname: "/bo-mon/[slug]", params: { slug: staff.department.slug } }} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md border border-white/40 px-4 text-sm font-semibold text-white hover:bg-white hover:text-brand-blue">
                <Building2 className="h-4 w-4" aria-hidden="true" />{staff.department.name}
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="site-container py-6">
        <Breadcrumb items={[
          { name: isEn ? "Home" : "Trang chủ", href: "/" },
          ...(staff.department ? [{ name: staff.department.name, href: `/bo-mon/${staff.department.slug}` }] : []),
          { name: displayName },
        ]} />
      </div>

      <section className="section-shell pt-6">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <section>
              <h2 className="section-heading">{isEn ? "Academic profile" : "Hồ sơ chuyên môn"}</h2>
              {staff.biography ? (
                <div className="prose prose-headings:font-sans prose-headings:text-foreground prose-p:max-w-[72ch] prose-p:leading-7 prose-a:text-brand-darkred mt-6 max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: staff.biography }} />
              ) : (
                <p className="mt-5 max-w-[65ch] leading-7 text-muted-foreground">
                  {isEn ? "The detailed academic profile is being reviewed and will be updated by the unit." : "Thông tin lý lịch khoa học đang được đơn vị rà soát và cập nhật."}
                </p>
              )}
            </section>

            {staff.research_interests && (
              <section className="border-t border-border pt-8">
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">{isEn ? "Research interests" : "Hướng nghiên cứu"}</h2>
                <p className="mt-4 max-w-[72ch] whitespace-pre-line leading-7 text-slate-700">{staff.research_interests}</p>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-border bg-surface p-5">
              <h2 className="text-lg font-bold text-foreground">{isEn ? "Contact" : "Thông tin liên hệ"}</h2>
              {contactItems.length > 0 ? (
                <div className="mt-4 divide-y divide-border">
                  {contactItems.map((item) => {
                    const content = (
                      <div className="flex gap-3 py-4">
                        <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-darkred" aria-hidden="true" />
                        <div className="min-w-0"><div className="text-xs font-semibold text-muted-foreground">{item.label}</div><div className="mt-1 break-words text-sm font-medium text-foreground">{item.value}</div></div>
                      </div>
                    );
                    return item.href ? <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="block hover:text-brand-darkred">{content}</a> : <div key={item.label}>{content}</div>;
                  })}
                </div>
              ) : (
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{isEn ? "Contact details are being updated." : "Thông tin liên hệ đang được cập nhật."}</p>
              )}
              {staff.website && <a href={staff.website} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-darkred px-4 text-sm font-semibold text-white hover:bg-brand-darkred-dark">{isEn ? "Open website" : "Mở website"}<ExternalLink className="h-4 w-4" /></a>}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
