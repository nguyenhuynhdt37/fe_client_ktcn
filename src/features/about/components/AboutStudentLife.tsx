// src/features/about/components/AboutStudentLife.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { Sparkles, Trophy, Cpu, Code, HeartHandshake } from "lucide-react";

export function AboutStudentLife() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isEn = locale === "en";

  const clubs = [
    {
      name: isEn ? "Robotics & Automation Club" : "CLB Robot & Tự động hóa",
      desc: isEn 
        ? "Where students build autonomous robots, prepare for Robocon, and explore smart manufacturing."
        : "Nơi sinh viên chế tạo robot tự hành, chuẩn bị cho cuộc thi Robocon và thực hành tự động hóa.",
      icon: <Cpu size={20} />,
    },
    {
      name: isEn ? "Software & AI Club" : "CLB Sáng tạo Phần mềm & AI",
      desc: isEn
        ? "Focusing on web/mobile apps development, competitive programming, and AI research projects."
        : "Nghiên cứu phát triển ứng dụng di động, web, lập trình thi đấu và triển khai ứng dụng AI.",
      icon: <Code size={20} />,
    },
    {
      name: isEn ? "Youth Volunteer & Sports Club" : "CLB Tình nguyện & Thể thao",
      desc: isEn
        ? "Engaging in local green campaigns, tech support volunteer works, football, and team building."
        : "Tham gia các chiến dịch tình nguyện Mùa hè xanh, hỗ trợ kỹ thuật và các hoạt động thể thao.",
      icon: <HeartHandshake size={20} />,
    },
  ];

  const galleryImages = [
    { src: "/Upload/images/ANH_CHUNG/cangvungang-202292711185.jpg", title: isEn ? "Field Trip" : "Kiến tập thực tế" },
    { src: "/Upload/images/ANH_CHUNG/hoptac4-20229271189.jpg", title: isEn ? "Enterprise Network" : "Mạng lưới doanh nghiệp" },
    { src: "/Upload/images/KHOA_TCNH/2022/sinh-vien-tc-nh-2022927105525.jpg", title: isEn ? "Academic Contest" : "Bản lĩnh sinh viên" },
    { src: "/Upload/images/ANH_CHUNG/sinh-vien-kinh-te-2022927105258.jpg", title: isEn ? "Team Building" : "Hoạt động dã ngoại" },
  ];

  return (
    <section className="py-14 md:py-20 bg-slate-50/50">
      <div className="max-w-[1360px] mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-darkred bg-brand-darkred/5 rounded-md">
            {t("student_life_heading")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t("student_life_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {t("student_life_subtext")}
          </p>
        </div>

        {/* Split Section: Clubs & Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Clubs list */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles size={18} className="text-brand-darkred" />
              <span>{t("student_life_clubs")}</span>
            </h3>

            <div className="space-y-4">
              {clubs.map((club, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-5 bg-white border border-border rounded-xl shadow-sm hover:border-slate-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-darkred/5 text-brand-darkred flex items-center justify-center shrink-0">
                    {club.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {club.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {club.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Gallery Grid */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Trophy size={18} className="text-brand-darkred" />
              <span>{t("student_life_gallery")}</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-border"
                >
                  <SafeImage
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-w-768px) 50vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {/* Photo Title Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs font-bold text-white">
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
