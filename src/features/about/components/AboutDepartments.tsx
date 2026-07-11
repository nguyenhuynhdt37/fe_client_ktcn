// src/features/about/components/AboutDepartments.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { Users, GraduationCap, ArrowRight } from "lucide-react";

interface DeptCardItem {
  id: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  imageUrl: string;
  facultyCount: number;
  researchVi: string[];
  researchEn: string[];
  href: string;
}

export function AboutDepartments() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isEn = locale === "en";

  const departmentsData: DeptCardItem[] = [
    {
      id: "cs-ai",
      nameVi: "Khoa Khoa học máy tính và Trí tuệ nhân tạo",
      nameEn: "Faculty of Computer Science & AI",
      descVi: "Nghiên cứu và đào tạo chuyên sâu về trí tuệ nhân tạo, học máy, phân tích dữ liệu lớn, xử lý ngôn ngữ tự nhiên và thị giác máy tính.",
      descEn: "Advanced research and education in artificial intelligence, machine learning, big data analysis, NLP, and computer vision.",
      imageUrl: "/images/faculties/khoa-cntt.jpg",
      facultyCount: 6,
      researchVi: ["Trí tuệ nhân tạo", "Học sâu", "Xử lý ngôn ngữ tự nhiên"],
      researchEn: ["AI", "Deep Learning", "NLP"],
      href: "/co-cau-to-chuc/khoa-khmt-va-ai",
    },
    {
      id: "it",
      nameVi: "Khoa Công nghệ thông tin",
      nameEn: "Faculty of Information Technology",
      descVi: "Tập trung đào tạo quy trình kỹ thuật phần mềm, quản trị mạng, an toàn thông tin, điện toán đám mây và chuyển đổi số.",
      descEn: "Focusing on software engineering processes, network administration, cybersecurity, cloud computing, and digital transformation.",
      imageUrl: "/images/faculties/khoa-cntt.jpg",
      facultyCount: 8,
      researchVi: ["Kỹ thuật phần mềm", "An toàn thông tin", "Cloud Computing"],
      researchEn: ["Software Eng", "Cybersecurity", "Cloud Computing"],
      href: "/co-cau-to-chuc/khoa-cntt",
    },
    {
      id: "semiconductor",
      nameVi: "Khoa Điện tử và Công nghệ bán dẫn",
      nameEn: "Faculty of Electronics & Semiconductor",
      descVi: "Nghiên cứu và đào tạo kỹ thuật thiết kế vi mạch bán dẫn, linh kiện điện tử, quang điện tử và vật liệu tiên tiến.",
      descEn: "Research and training in semiconductor IC design, electronic components, optoelectronics, and advanced materials.",
      imageUrl: "/images/faculties/khoa-dien-tu.jpg",
      facultyCount: 7,
      researchVi: ["Thiết kế vi mạch", "Linh kiện bán dẫn", "Vật liệu điện tử"],
      researchEn: ["IC Design", "Semiconductor Devices", "Electronic Materials"],
      href: "/co-cau-to-chuc/khoa-dien-tu-va-ban-dan",
    },
    {
      id: "electrical",
      nameVi: "Khoa Công nghệ kỹ thuật Điện",
      nameEn: "Faculty of Electrical Engineering",
      descVi: "Nghiên cứu về thiết bị điện, hệ thống truyền tải điện, năng lượng mới, năng lượng tái tạo và lưới điện thông minh.",
      descEn: "Research on electrical equipment, power transmission systems, new energy, renewable energy, and smart grids.",
      imageUrl: "/images/faculties/khoa-dien-tu.jpg",
      facultyCount: 5,
      researchVi: ["Hệ thống điện", "Năng lượng tái tạo", "Smart Grid"],
      researchEn: ["Power Systems", "Renewable Energy", "Smart Grid"],
      href: "/co-cau-to-chuc/khoa-dien",
    },
    {
      id: "automation",
      nameVi: "Khoa Tự động hoá",
      nameEn: "Faculty of Automation",
      descVi: "Thiết kế, vận hành hệ thống điều khiển tự động hóa công nghiệp, robot, hệ thống nhúng và IoT.",
      descEn: "Designing and operating industrial automation control systems, robotics, embedded systems, and IoT.",
      imageUrl: "/images/faculties/khoa-dien-tu.jpg",
      facultyCount: 7,
      researchVi: ["Robotics", "Hệ thống nhúng", "Tự động hóa công nghiệp"],
      researchEn: ["Robotics", "Embedded Systems", "Industrial Automation"],
      href: "/co-cau-to-chuc/khoa-tu-dong-hoa",
    },
    {
      id: "automotive",
      nameVi: "Khoa Công nghệ kỹ thuật ô tô",
      nameEn: "Faculty of Automotive Engineering",
      descVi: "Đào tạo kỹ thuật thiết kế ô tô, chẩn đoán kỹ thuật, động cơ đốt trong, xe điện thông minh và kỹ thuật nhiệt lạnh.",
      descEn: "Training in automotive design, technical diagnostics, internal combustion engines, smart EVs, and HVAC systems.",
      imageUrl: "/images/faculties/khoa-co-khi.jpg",
      facultyCount: 10,
      researchVi: ["Xe điện thông minh", "Thiết kế ô tô", "Kỹ thuật nhiệt lạnh"],
      researchEn: ["Smart EVs", "Automotive Design", "HVAC Systems"],
      href: "/co-cau-to-chuc/khoa-oto",
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-[1360px] mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-darkred bg-brand-darkred/5 rounded-md">
            {t("departments_heading")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t("departments_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {t("departments_subtext")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departmentsData.map((dept) => {
            const name = isEn ? dept.nameEn : dept.nameVi;
            const desc = isEn ? dept.descEn : dept.descVi;
            const research = isEn ? dept.researchEn : dept.researchVi;

            return (
              <div
                key={dept.id}
                className="group border border-border rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <SafeImage
                    src={dept.imageUrl}
                    alt={name}
                    fill
                    sizes="(max-w-768px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {/* Faculty Badge */}
                  <div className="absolute top-3 left-3 bg-slate-900/70 text-white backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Users size={12} />
                    <span>
                      {dept.facultyCount} {isEn ? "Faculty" : "Giảng viên"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-brand-darkred transition-colors duration-150">
                      {name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Research Tags */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {research.map((res, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-md"
                        >
                          {res}
                        </span>
                      ))}
                    </div>

                    {/* Action button */}
                    <Link
                      href={dept.href as any}
                      className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-bold text-brand-darkred hover:text-brand-darkred-dark group/link"
                    >
                      <span>{isEn ? "Explore Department" : "Khám phá bộ môn"}</span>
                      <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform duration-150" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
