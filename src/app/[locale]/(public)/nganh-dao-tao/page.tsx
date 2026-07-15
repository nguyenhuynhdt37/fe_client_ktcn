import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { constructMetadata } from "@/shared/lib/seo";
import { departmentService } from "@/features/department/services/departmentService";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";
import { GraduationCap, Users, MapPin, Phone, Mail, ArrowRight, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const title = isEn 
    ? "Faculties & Programs - College of Engineering & Technology" 
    : "Các khoa đào tạo - Trường Kỹ thuật và Công nghệ";
  const description = isEn
    ? "Explore the specialized faculties and academic programs offered by the College of Engineering and Technology, Vinh University."
    : "Danh sách các khoa chuyên ngành và chương trình đào tạo tại Trường Kỹ thuật và Công nghệ - Đại học Vinh.";

  return constructMetadata({
    title,
    description,
    locale,
    alternatesLanguages: {
      vi: "nganh-dao-tao",
      en: "study-programs",
    },
  });
}

export default async function NganhDaoTaoPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  // Fetch all departments of type "faculty" from the CMS API
  const faculties = (await departmentService.getDepartments({ 
    unit_type: "faculty",
    lang: locale
  })) || [];

  // Sort faculties by sort_order
  const sortedFaculties = [...faculties].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative isolate overflow-hidden bg-brand-blue text-white" style={{ backgroundColor: "#1b4965" }}>
        <SafeImage
          src="/images/about/set-it.jpg"
          alt="Các khoa đào tạo"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 via-brand-blue/90 to-brand-blue z-10" />

        <div className="site-container relative z-20 flex min-h-[35dvh] items-end pb-8 sm:pb-12">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/10 border border-white/20 px-3 py-1 rounded-md">
              {isEn ? "Academic Structure" : "Hệ thống đào tạo"}
            </span>
            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-sm">
              {isEn ? "Faculties & Programs" : "Các ngành đào tạo"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-200">
              {isEn
                ? "Explore our specialized departments, cutting-edge laboratories, and dynamic study paths designed for future innovators."
                : "Khám phá các khoa chuyên môn, hệ thống phòng nghiên cứu hiện đại và định hướng học thuật chất lượng cao."}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <div className="site-container py-6">
        <Breadcrumb
          items={[
            { name: isEn ? "Home" : "Trang chủ", href: "/" },
            { name: isEn ? "Study Programs" : "Các ngành đào tạo" },
          ]}
        />
      </div>

      {/* Main Content: Faculties Grid */}
      <section className="pb-20 md:pb-28">
        <div className="site-container">
          
          {sortedFaculties.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200/80 rounded-xl p-8 max-w-md mx-auto shadow-sm space-y-4">
              <div className="p-3 bg-slate-100 text-slate-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                {isEn ? "No faculties available" : "Chưa có danh sách Khoa"}
              </h2>
              <p className="text-sm text-slate-600">
                {isEn
                  ? "Information is being updated. Please check back later."
                  : "Thông tin các khoa đang được cập nhật. Vui lòng quay lại sau."}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sortedFaculties.map((faculty) => {
                const detailUrl = `/khoa/${faculty.slug}`;
                
                // Deterministic cover image fallback
                const coverImage = faculty.thumbnail_object_key || faculty.banner_object_key || "/images/about/set-lab.jpg";

                return (
                  <article
                    key={faculty.id}
                    className="group flex flex-col justify-between border border-slate-200/85 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-brand-darkred transition-all duration-300 relative"
                  >
                    <div>
                      {/* Cover Image Area */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <SafeImage
                          src={coverImage}
                          alt={faculty.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10" />

                        {/* Top Accent Badges */}
                        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                          <span className="bg-brand-blue/90 text-white backdrop-blur-sm text-[10px] font-bold px-2.5 py-1 rounded-md border border-white/10 uppercase tracking-wider">
                            {faculty.code || (isEn ? "Faculty" : "Khoa")}
                          </span>
                        </div>

                        {/* Staff Count Badge on Image Bottom */}
                        {faculty.staff_count > 0 && (
                          <div className="absolute bottom-3 right-4 z-20 bg-slate-950/70 text-white backdrop-blur-sm text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1">
                            <Users size={12} className="text-slate-300" />
                            <span>
                              {faculty.staff_count} {isEn ? "Lecturers" : "Giảng viên"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-darkred transition-colors duration-150 leading-snug tracking-tight min-h-[50px] flex items-center">
                            {faculty.name}
                          </h2>
                          {faculty.description && (
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                              {faculty.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Contact and Action Info */}
                    <div className="p-6 pt-0 mt-auto">
                      <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600 font-semibold mb-6">
                        {faculty.office && (
                          <div className="flex items-start gap-2">
                            <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{faculty.office}</span>
                          </div>
                        )}
                        {faculty.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-slate-400 shrink-0" />
                            <span>{faculty.phone}</span>
                          </div>
                        )}
                        {faculty.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-slate-400 shrink-0" />
                            <span className="truncate">{faculty.email}</span>
                          </div>
                        )}
                      </div>

                      {/* Call to action Button */}
                      <Link
                        href={detailUrl as any}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-brand-darkred rounded-xl shadow-sm hover:shadow transition-all duration-200 group/btn"
                      >
                        <GraduationCap size={14} />
                        <span>{isEn ? "Explore Programs & Details" : "Khám phá ngành đào tạo"}</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform duration-150" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
