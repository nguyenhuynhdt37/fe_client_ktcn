import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BookOpen, Building2, Clock3, ExternalLink, GraduationCap, Images, Mail, MapPin, Newspaper, Phone, Users } from "lucide-react";

import { departmentService } from "@/features/department";
import { ArticleCard } from "@/features/article";
import { StaffPortrait } from "@/features/lecturer";
import { Link } from "@/i18n/routing";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";
import { SafeImage } from "@/shared/components/ui/safe-image";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const overview = await departmentService.getOverview(slug);
  if (!overview) return { title: locale === "en" ? "Unit not found" : "Không tìm thấy đơn vị" };
  const department = overview.department;
  return {
    title: department.seo_title || department.name,
    description: department.seo_description || department.short_description || department.description || undefined,
  };
}

export default async function DepartmentOverviewPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const overview = await departmentService.getOverview(slug);
  if (!overview) notFound();

  const { department, staffs, stats, programs = [], latest_articles: latestArticles = [], galleries = [] } = overview;
  const isEn = locale === "en";
  const heroImage = department.banner_object_key || department.thumbnail_object_key || "/images/about/set-overview.jpg";
  const intro = department.short_description || department.description;
  const contactItems = [
    department.office ? { icon: MapPin, label: isEn ? "Office" : "Văn phòng", value: department.office } : null,
    department.phone ? { icon: Phone, label: isEn ? "Phone" : "Điện thoại", value: department.phone } : null,
    department.email ? { icon: Mail, label: "Email", value: department.email } : null,
  ].filter(Boolean) as Array<{ icon: typeof MapPin; label: string; value: string }>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: department.name,
    description: intro || undefined,
    email: department.email || undefined,
    telephone: department.phone || undefined,
    url: department.website || undefined,
  };

  return (
    <main className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative isolate min-h-[52dvh] overflow-hidden bg-slate-900">
        <SafeImage src={heroImage} alt={`${department.name}, Trường Kỹ thuật và Công nghệ`} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="site-container relative flex min-h-[52dvh] flex-col justify-end py-10 text-white sm:py-14">
          <div className="mb-5 max-w-3xl">
            <span className="mb-3 inline-flex min-h-8 items-center rounded-md bg-white/12 px-3 text-sm font-semibold text-white">
              {department.code || (isEn ? "Academic unit" : "Đơn vị học thuật")}
            </span>
            <h1 className="max-w-4xl text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              {department.name}
            </h1>
            {intro && <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-white/88 sm:text-lg">{intro}</p>}
          </div>
        </div>
      </section>

      <div className="site-container py-6">
        <Breadcrumb items={[{ name: isEn ? "Home" : "Trang chủ", href: "/" }, { name: department.name }]} />
      </div>

      <section className="border-y border-border bg-surface">
        <div className="site-container grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: stats.staff_count, label: isEn ? "Published profiles" : "Hồ sơ công khai", icon: Users },
            { value: stats.doctorate_count, label: isEn ? "Doctorates" : "Tiến sĩ", icon: GraduationCap },
            { value: stats.associate_professor_count, label: isEn ? "Associate professors" : "Phó giáo sư", icon: Building2 },
          ].map((item) => (
            <div key={item.label} className="flex min-h-28 items-center gap-4 px-5 py-5 sm:px-7">
              <item.icon className="h-6 w-6 shrink-0 text-brand-darkred" aria-hidden="true" />
              <div>
                <div className="font-mono text-2xl font-bold text-foreground">{item.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {(department.description || department.mission || department.vision) && (
        <section className="section-shell">
          <div className="site-container grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h2 className="section-heading">{isEn ? "About the unit" : "Giới thiệu đơn vị"}</h2>
              {department.description && <p className="mt-5 max-w-[72ch] whitespace-pre-line text-base leading-7 text-slate-700">{department.description}</p>}
            </div>
            <div className="divide-y divide-border border-t border-border">
              {department.mission && (
                <div className="py-6">
                  <h3 className="text-lg font-bold text-brand-blue">{isEn ? "Mission" : "Sứ mạng"}</h3>
                  <p className="mt-2 whitespace-pre-line leading-7 text-slate-700">{department.mission}</p>
                </div>
              )}
              {department.vision && (
                <div className="py-6">
                  <h3 className="text-lg font-bold text-brand-blue">{isEn ? "Vision" : "Tầm nhìn"}</h3>
                  <p className="mt-2 whitespace-pre-line leading-7 text-slate-700">{department.vision}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {programs.length > 0 && (
        <section className="section-shell border-t border-border bg-white">
          <div className="site-container">
            <div className="flex items-end justify-between gap-5"><div><span className="text-sm font-semibold text-brand-darkred">{isEn ? "Academic pathways" : "Lộ trình học tập"}</span><h2 className="section-heading mt-2">{isEn ? "Study programs" : "Chương trình đào tạo"}</h2></div><BookOpen className="hidden h-8 w-8 text-brand-blue sm:block" aria-hidden="true" /></div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {programs.map((program) => (
                <article key={program.id} className="group border-l-4 border-brand-darkred bg-surface px-5 py-6 transition-colors hover:bg-brand-blue-light/50 sm:px-7">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-brand-blue">{program.code && <span className="rounded-md border border-brand-blue/20 bg-white px-2 py-1 font-mono">{program.code}</span>}<span>{program.degree_level === "bachelor" ? (isEn ? "Bachelor" : "Đại học") : program.degree_level}</span></div>
                  <h3 className="mt-3 text-xl font-bold text-foreground group-hover:text-brand-darkred">{program.name}</h3>
                  {program.short_description && <p className="mt-3 line-clamp-3 leading-7 text-slate-700">{program.short_description}</p>}
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">{program.duration_years && <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{program.duration_years} {isEn ? "years" : "năm"}</span>}{program.training_mode && <span>{program.training_mode}</span>}</div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-shell bg-section-alt">
        <div className="site-container">
          <h2 className="section-heading">{isEn ? "Faculty and staff" : "Đội ngũ cán bộ, giảng viên"}</h2>
          <p className="mt-3 max-w-[65ch] text-slate-700">
            {isEn ? "Profiles are published after the unit has reviewed their academic information." : "Hồ sơ chỉ được công khai sau khi đơn vị rà soát thông tin chuyên môn."}
          </p>

          {staffs.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {staffs.map((staff) => (
                <Link
                  key={staff.id}
                  href={{ pathname: "/nhan-su/[slug]", params: { slug: staff.slug } }}
                  className="group overflow-hidden rounded-lg border border-border bg-white transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-darkred focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-darkred"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand-blue-light">
                    <StaffPortrait name={staff.full_name} src={staff.avatar_object_key} className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-brand-darkred">{staff.full_name}</h3>
                    <p className="mt-1 text-sm font-semibold text-brand-blue">
                      {[staff.academic_title, staff.degree].filter(Boolean).join(", ") || staff.position_name}
                    </p>
                    {staff.position_name && <p className="mt-2 text-sm text-muted-foreground">{staff.position_name}</p>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-border bg-white px-6 py-10 text-center">
              <Users className="mx-auto h-8 w-8 text-brand-blue" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold text-foreground">{isEn ? "Profiles are being reviewed" : "Hồ sơ đang được rà soát"}</h3>
              <p className="mx-auto mt-2 max-w-[55ch] text-sm leading-6 text-muted-foreground">
                {isEn ? "The official staff list will appear here after the unit completes verification." : "Danh sách chính thức sẽ hiển thị tại đây sau khi đơn vị hoàn tất kiểm tra thông tin."}
              </p>
            </div>
          )}
        </div>
      </section>

      {latestArticles.length > 0 && (
        <section className="section-shell border-t border-border bg-white"><div className="site-container"><div className="flex items-center gap-3"><Newspaper className="h-6 w-6 text-brand-darkred" /><h2 className="section-heading">{isEn ? "Latest updates" : "Tin bài mới nhất"}</h2></div><div className="mt-8">{latestArticles.map((article, index) => <ArticleCard key={article.id} article={article} priority={index === 0} />)}</div></div></section>
      )}

      {galleries.length > 0 && (
        <section className="section-shell border-t border-border bg-section-alt"><div className="site-container"><div className="flex items-center gap-3"><Images className="h-6 w-6 text-brand-blue" /><h2 className="section-heading">{isEn ? "Photo gallery" : "Hình ảnh hoạt động"}</h2></div><div className="mt-8 space-y-10">{galleries.map((gallery) => <div key={gallery.id}><div className="mb-4"><h3 className="text-xl font-bold text-foreground">{gallery.title}</h3>{gallery.description && <p className="mt-1 text-sm text-muted-foreground">{gallery.description}</p>}</div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">{gallery.items.slice(0, 8).map((item, index) => <figure key={item.id} className={`relative overflow-hidden rounded-md bg-surface ${index === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"}`}><SafeImage src={item.object_key || item.thumbnail_key || "/images/no-image-dhv.jpg"} alt={item.alt_text || item.caption || gallery.title} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-300 hover:scale-[1.02]" />{item.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/75 px-3 py-2 text-xs text-white">{item.caption}</figcaption>}</figure>)}</div></div>)}</div></div></section>
      )}

      {(contactItems.length > 0 || department.website) && (
        <section className="section-shell">
          <div className="site-container">
            <h2 className="section-heading">{isEn ? "Contact" : "Thông tin liên hệ"}</h2>
            <div className="mt-7 grid gap-0 border-y border-border md:grid-cols-2">
              {contactItems.map((item) => (
                <div key={item.label} className="flex min-h-24 items-center gap-4 border-b border-border px-2 py-5 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0">
                  <item.icon className="h-5 w-5 text-brand-darkred" aria-hidden="true" />
                  <div><div className="text-sm font-semibold text-muted-foreground">{item.label}</div><div className="mt-1 font-medium text-foreground">{item.value}</div></div>
                </div>
              ))}
            </div>
            {department.website && (
              <a href={department.website} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-brand-darkred px-5 text-sm font-semibold text-white hover:bg-brand-darkred-dark">
                {isEn ? "Visit unit website" : "Truy cập website đơn vị"}<ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
