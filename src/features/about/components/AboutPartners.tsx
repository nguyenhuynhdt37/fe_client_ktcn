// src/features/about/components/AboutPartners.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ExternalLink, Globe2, Award, Users, BookOpen } from "lucide-react";
import { PARTNERS } from "../constants/about-data";

export function AboutPartners() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isEn = locale === "en";

  // Map country to a brief activity detail for more premium feel
  const partnerDetails: Record<string, { activity: string; activityEn: string }> = {
    "1": {
      activity: "Trao đổi giảng viên, sinh viên & chuyển giao chương trình CDIO",
      activityEn: "Faculty/student exchanges & CDIO curriculum transfers",
    },
    "2": {
      activity: "Tài trợ trang thiết bị phòng thí nghiệm ODA (Hàn Quốc)",
      activityEn: "ODA lab equipment sponsorship & smart systems research",
    },
    "3": {
      activity: "Đào tạo lưu học sinh và tình nguyện viên phát triển cộng đồng",
      activityEn: "International student training & green summer volunteer campaigns",
    },
    "4": {
      activity: "Hợp tác đào tạo sau đại học và đồng xuất bản nghiên cứu quốc tế",
      activityEn: "Postgraduate co-training & international research co-publications",
    },
    "5": {
      activity: "Trao đổi học thuật, liên kết xuất bản tạp chí khoa học chuyên ngành",
      activityEn: "Academic seminars & specialized journal joint publications",
    },
    "6": {
      activity: "Liên kết đào tạo và chương trình chuyển tiếp tín chỉ (2+2)",
      activityEn: "Joint training programs & academic credit transfers (2+2)",
    },
  };

  return (
    <section className="py-14 md:py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-[1360px] mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-brand-darkred bg-brand-darkred/5 px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider">
            <Globe2 size={14} />
            <span>{isEn ? "Global Alliance" : "Hợp tác Quốc tế"}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t("partners_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {t("partners_desc")}
          </p>
        </div>

        {/* Premium Grid layout for partners (3 columns on lg for generous layout space) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNERS.map((partner) => {
            const details = partnerDetails[partner.id] || { activity: "", activityEn: "" };
            const activityText = isEn ? details.activityEn : details.activity;

            return (
              <a
                key={partner.id}
                href={partner.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-6 border border-border rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 relative overflow-hidden"
              >
                {/* Upper portion: Logo and Meta */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* Logo container */}
                    <div className="relative w-16 h-16 shrink-0 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-2.5 overflow-hidden">
                      <Image
                        src={partner.imageUrl}
                        alt={partner.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* Country Badge */}
                    <span className="text-[10px] font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-2.5 py-1 rounded-full">
                      {partner.country}
                    </span>
                  </div>

                  {/* Name and description */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-brand-darkred transition-colors duration-200">
                      {partner.name}
                    </h4>
                    {activityText && (
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {activityText}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer action link */}
                <div className="border-t border-slate-100 mt-5 pt-3.5 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-brand-darkred transition-colors">
                  <span>{isEn ? "View Cooperation MoU" : "Xem thỏa thuận hợp tác"}</span>
                  <ExternalLink size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
