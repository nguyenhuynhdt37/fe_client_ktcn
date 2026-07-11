import { getTranslations } from "next-intl/server";
import { lecturerService } from "@/features/lecturer";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { Mail, Globe, BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export async function AboutFeaturedFaculty() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "about" });
  const isEn = locale === "en";

  // Fetch featured lecturers from the database/CMS (IT department as a featured subset)
  const staffs = await lecturerService.getStaffs({ 
    departmentSlug: "khoa-cntt", 
    lang: locale 
  }) || [];

  // Curated fallback if database has no records
  const fallbackFaculty = [
    {
      id: "f1",
      full_name: "PGS.TS. Nguyễn Thị Quỳnh Hoa",
      english_name: "Assoc. Prof. Dr. Nguyen Thi Quynh Hoa",
      avatar_object_key: "/images/no-image-dhv.jpg",
      email: "ntqhoa@vinhuni.edu.vn",
      website: "https://vinhuni.edu.vn",
      academic_title: "PGS",
      degree: "TS",
      research_interests: isEn 
        ? "Semiconductor Devices, Electronic Materials, Optoelectronics" 
        : "Linh kiện bán dẫn, Vật liệu điện tử, Quang điện tử",
      department: { name: isEn ? "Faculty of Electronics & Semiconductor" : "Khoa Điện tử và Công nghệ bán dẫn" },
      slug: "nguyen-thi-quynh-hoa",
    },
    {
      id: "f2",
      full_name: "PGS.TS. Nguyễn Tiến Dũng",
      english_name: "Assoc. Prof. Dr. Nguyen Tien Dung",
      avatar_object_key: "/images/no-image-dhv.jpg",
      email: "ntdung@vinhuni.edu.vn",
      academic_title: "PGS",
      degree: "TS",
      research_interests: isEn 
        ? "Smart Grid, Renewable Energy, Electrical Power Systems" 
        : "Lưới điện thông minh, Năng lượng tái tạo, Hệ thống điện",
      department: { name: isEn ? "Faculty of Electrical Engineering" : "Khoa Công nghệ kỹ thuật Điện" },
      slug: "nguyen-tiens-dung",
    },
    {
      id: "f3",
      full_name: "PGS.TS. Hoàng Hữu Việt",
      english_name: "Assoc. Prof. Dr. Hoang Huu Viet",
      avatar_object_key: "/images/no-image-dhv.jpg",
      email: "hhviet@vinhuni.edu.vn",
      academic_title: "PGS",
      degree: "TS",
      research_interests: isEn 
        ? "Artificial Intelligence, Deep Learning, Big Data Analytics" 
        : "Trí tuệ nhân tạo, Học sâu, Phân tích dữ liệu lớn",
      department: { name: isEn ? "Faculty of Information Technology" : "Khoa Công nghệ thông tin" },
      slug: "hoang-huu-viet",
    },
    {
      id: "f4",
      full_name: "TS. Trịnh Ngọc Hoàng",
      english_name: "Dr. Trinh Ngoc Hoang",
      avatar_object_key: "/images/no-image-dhv.jpg",
      email: "tnhoang@vinhuni.edu.vn",
      academic_title: "",
      degree: "TS",
      research_interests: isEn 
        ? "Automotive Engineering, Electric Vehicles, Mechanical Diagnostics" 
        : "Kỹ thuật ô tô, Xe điện thông minh, Chẩn đoán kỹ thuật",
      department: { name: isEn ? "Faculty of Automotive Engineering" : "Khoa Công nghệ kỹ thuật ô tô" },
      slug: "trinh-ngoc-hoang",
    },
  ];

  const featuredList = staffs.length > 0 ? staffs.slice(0, 4) : fallbackFaculty;

  return (
    <section id="faculty-members" className="py-14 md:py-20 bg-white">
      <div className="max-w-[1360px] mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-darkred bg-brand-darkred/5 rounded-md">
            {t("faculty_heading")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t("faculty_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {t("faculty_subtext")}
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((faculty: any) => {
            const name = isEn ? (faculty.english_name || faculty.full_name) : faculty.full_name;
            const deptName = faculty.department?.name || (isEn ? "Faculty Member" : "Giảng viên");
            const title = [faculty.academic_title, faculty.degree].filter(Boolean).join(". ");

            return (
              <div 
                key={faculty.id} 
                className="group border border-border rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo */}
                <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
                  <SafeImage
                    src={faculty.avatar_object_key || "/images/no-image-dhv.jpg"}
                    alt={name}
                    fill
                    sizes="(max-w-768px) 100vw, 250px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-brand-darkred bg-brand-darkred/5 px-2 py-0.5 rounded">
                      {deptName}
                    </span>
                    <h3 className="text-base font-bold text-slate-950 pt-1">
                      {title ? `${title}. ` : ""}{name}
                    </h3>
                    {faculty.research_interests && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {faculty.research_interests}
                      </p>
                    )}
                  </div>

                  {/* Scholar Links & Profile View */}
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                    {/* Icons */}
                    <div className="flex items-center gap-3 text-slate-400">
                      {faculty.email && (
                        <a 
                          href={`mailto:${faculty.email}`} 
                          className="hover:text-brand-darkred transition-colors"
                          title="Email"
                        >
                          <Mail size={15} />
                        </a>
                      )}
                      {faculty.website && (
                        <a 
                          href={faculty.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:text-brand-darkred transition-colors"
                          title="Website"
                        >
                          <Globe size={15} />
                        </a>
                      )}
                      <a 
                        href="https://scholar.google.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-brand-darkred transition-colors"
                        title="Google Scholar"
                      >
                        <BookOpen size={15} />
                      </a>
                    </div>

                    {/* View profile CTA */}
                    <Link
                      href={`/co-cau-to-chuc/giang-vien/${faculty.slug}` as any}
                      className="text-xs font-bold text-brand-blue hover:text-brand-darkred inline-flex items-center gap-0.5 transition-colors"
                    >
                      <span>{isEn ? "Profile" : "Hồ sơ"}</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Faculty Button */}
        <div className="text-center pt-4">
          <Link
            href={"/co-cau-to-chuc" as any}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-white hover:bg-slate-50 px-6 py-2 text-sm font-bold text-slate-700 transition shadow-sm active:scale-98"
          >
            <span>{t("faculty_cta")}</span>
            <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
