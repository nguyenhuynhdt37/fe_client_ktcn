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
      nameVi: "Khoa học máy tính & Trí tuệ nhân tạo",
      nameEn: "Computer Science & AI",
      descVi: "Nghiên cứu và đào tạo chuyên sâu về trí tuệ nhân tạo, học máy, phân tích dữ liệu lớn và các giải pháp thông minh.",
      descEn: "Advanced research and training in artificial intelligence, machine learning, big data analysis, and smart solutions.",
      imageUrl: "/images/faculties/khoa-cntt.jpg",
      facultyCount: 15,
      researchVi: ["Trí tuệ nhân tạo", "Học máy", "Dữ liệu lớn"],
      researchEn: ["AI", "Machine Learning", "Big Data"],
      href: "/co-cau-to-chuc/khoa-cntt",
    },
    {
      id: "it",
      nameVi: "Công nghệ thông tin & Kỹ thuật phần mềm",
      nameEn: "Information Technology & Software Eng",
      descVi: "Tập trung đào tạo quy trình phát triển phần mềm, quản trị mạng, an toàn thông tin và chuyển đổi số.",
      descEn: "Focusing on software development processes, network administration, cybersecurity, and digital transformation.",
      imageUrl: "/images/faculties/khoa-cntt.jpg",
      facultyCount: 16,
      researchVi: ["Kỹ thuật phần mềm", "An toàn thông tin", "Cloud Computing"],
      researchEn: ["Software Eng", "Cybersecurity", "Cloud Computing"],
      href: "/co-cau-to-chuc/khoa-cntt",
    },
    {
      id: "automation",
      nameVi: "Kỹ thuật Điều khiển & Tự động hóa",
      nameEn: "Control & Automation Engineering",
      descVi: "Thiết kế, vận hành hệ thống tự động hóa công nghiệp, robot, hệ thống nhúng và IoT.",
      descEn: "Designing and operating industrial automation systems, robotics, embedded systems, and IoT.",
      imageUrl: "/images/faculties/khoa-dien-tu.jpg",
      facultyCount: 12,
      researchVi: ["Robotics", "Hệ thống nhúng", "Smart Grid"],
      researchEn: ["Robotics", "Embedded Systems", "Smart Grid"],
      href: "/co-cau-to-chuc/khoa-dien-tu",
    },
    {
      id: "electrical",
      nameVi: "Công nghệ kỹ thuật Điện, Điện tử",
      nameEn: "Electrical & Electronic Engineering",
      descVi: "Nghiên cứu về thiết bị điện tử, hệ thống truyền tải điện, vi mạch và kỹ thuật bán dẫn công nghệ cao.",
      descEn: "Research on electronic devices, power transmission systems, microchips, and high-tech semiconductors.",
      imageUrl: "/images/faculties/khoa-dien-tu.jpg",
      facultyCount: 14,
      researchVi: ["Vi mạch bán dẫn", "Điện tử công suất", "Năng lượng tái tạo"],
      researchEn: ["Semiconductors", "Power Electronics", "Renewable Energy"],
      href: "/co-cau-to-chuc/khoa-dien-tu",
    },
    {
      id: "automotive",
      nameVi: "Công nghệ kỹ thuật Ô tô & Nhiệt",
      nameEn: "Automotive & Thermal Engineering",
      descVi: "Đào tạo kỹ thuật thiết kế ô tô, chẩn đoán, xe điện thông minh và hệ thống kỹ thuật nhiệt lạnh hiện đại.",
      descEn: "Automotive design, diagnostics, smart electric vehicles, and modern refrigeration systems engineering.",
      imageUrl: "/images/faculties/khoa-co-khi.jpg",
      facultyCount: 18,
      researchVi: ["Xe điện thông minh", "Kỹ thuật nhiệt lạnh", "Năng lượng mới"],
      researchEn: ["Electric Vehicles", "HVAC Systems", "New Energy Sources"],
      href: "/co-cau-to-chuc/khoa-co-khi",
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
