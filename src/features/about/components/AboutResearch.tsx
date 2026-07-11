// src/features/about/components/AboutResearch.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { FlaskConical, Globe, BookOpen, Layers, Award, FileText } from "lucide-react";

export function AboutResearch() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isEn = locale === "en";

  const labs = [
    {
      name: isEn ? "Lab of AI & Data Science" : "Phòng Lab Trí tuệ Nhân tạo & Khoa học Dữ liệu",
      focus: isEn ? "Deep Learning, Natural Language Processing, Computer Vision" : "Học sâu, xử lý ngôn ngữ tự nhiên, thị giác máy tính",
      icon: <FlaskConical size={20} />,
    },
    {
      name: isEn ? "Lab of IoT & Smart Systems" : "Phòng Lab IoT & Hệ thống thông minh",
      focus: isEn ? "Embedded Systems, Robotics, Sensor Networks, Microcontrollers" : "Hệ thống nhúng, robotics, mạng cảm biến, vi điều khiển",
      icon: <Layers size={20} />,
    },
    {
      name: isEn ? "Lab of Automotive Engineering" : "Phòng Lab Công nghệ Kỹ thuật Ô tô",
      focus: isEn ? "Electric Vehicles, Engine Diagnostics, Smart Transportation" : "Xe điện, chẩn đoán động cơ, hệ thống giao thông thông minh",
      icon: <FlaskConical size={20} />,
    },
    {
      name: isEn ? "Lab of Smart Grid & Renewable Energy" : "Phòng Lab Lưới điện thông minh & Năng lượng mới",
      focus: isEn ? "Renewable Systems, Power Electronics, Energy Storage" : "Hệ thống năng lượng tái tạo, điện tử công suất, lưu trữ năng lượng",
      icon: <Layers size={20} />,
    },
  ];

  const projects = [
    {
      title: isEn 
        ? "South Korean Government ODA Project for Smart Lab Equipment (2.7 Billion KRW)"
        : "Dự án ODA hỗ trợ trang thiết bị phòng thí nghiệm thông minh từ Chính phủ Hàn Quốc (Trị giá 2,7 tỷ Won)",
      level: isEn ? "International Collaboration" : "Hợp tác Quốc tế",
    },
    {
      title: isEn
        ? "National Project: Advanced machine learning algorithms for Vietnamese NLP"
        : "Đề tài cấp Nhà nước: Các thuật toán học sâu cải tiến cho xử lý ngôn ngữ tự nhiên tiếng Việt",
      level: isEn ? "State-level Project" : "Cấp Nhà nước",
    },
    {
      title: isEn
        ? "Ministry Project: Developing embedded hardware for automated smart greenhouse systems"
        : "Đề tài cấp Bộ: Thiết kế chế tạo phần cứng hệ thống điều khiển tự động nhà kính nông nghiệp công nghệ cao",
      level: isEn ? "Ministry-level Project" : "Cấp Bộ",
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-[1360px] mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-darkred bg-brand-darkred/5 rounded-md">
            {t("research_heading")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t("research_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {t("research_subtext")}
          </p>
        </div>

        {/* Labs and Projects Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Labs list */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FlaskConical size={18} className="text-brand-darkred" />
              <span>{t("research_labs")}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {labs.map((lab, index) => (
                <div 
                  key={index}
                  className="p-5 bg-white border border-border rounded-xl shadow-sm hover:border-slate-300 transition-all duration-200 space-y-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-blue/5 text-brand-blue flex items-center justify-center">
                    {lab.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {lab.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {lab.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Projects & Pubs */}
          <div className="lg:col-span-5 space-y-8">
            {/* Projects list */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Award size={18} className="text-brand-darkred" />
                <span>{t("research_projects")}</span>
              </h3>

              <div className="space-y-3">
                {projects.map((project, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white border border-border rounded-xl shadow-sm space-y-2 hover:border-slate-200 transition-colors"
                  >
                    <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {project.level}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      {project.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Publication highlights quick stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText size={18} className="text-brand-darkred" />
                <span>{t("research_publications")}</span>
              </h3>

              <div className="p-5 bg-brand-blue text-white rounded-xl shadow-sm flex items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute -bottom-8 -right-8 text-white/5 select-none">
                  <BookOpen size={96} />
                </div>
                <div className="space-y-1 relative z-10">
                  <p className="text-xs font-semibold text-white/80">
                    {isEn ? "ISI/Scopus Index Papers" : "Bài báo ISI/Scopus (2020 - 2026)"}
                  </p>
                  <h4 className="text-3xl font-black font-mono">
                    120+
                  </h4>
                </div>
                <div className="space-y-1 relative z-10">
                  <p className="text-xs font-semibold text-white/80">
                    {isEn ? "National Patents" : "Bằng sáng chế & Giải pháp hữu ích"}
                  </p>
                  <h4 className="text-3xl font-black font-mono">
                    15+
                  </h4>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
