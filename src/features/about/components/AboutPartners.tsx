// src/features/about/components/AboutPartners.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Handshake, Globe, Briefcase } from "lucide-react";
import { PARTNERS } from "../constants/about-data";

interface DomesticPartner {
  id: string;
  name: string;
  description: string;
  logoPath?: string;
  icon?: React.ReactNode;
  proofUrl?: string;
  country?: string;
}

// Custom SVG Logos for Partners that couldn't be downloaded directly (CMC, VNNIC, PTIT)
const CmcLogo = () => (
  <svg viewBox="0 0 120 30" className="w-16 h-6 fill-slate-700">
    <path d="M25 5c-8 0-14 6-14 10s6 10 14 10 12-4 13-8h-6c-1 2-4 3-7 3-5 0-8-4-8-7s3-7 8-7c3 0 6 1 7 3h6c-1-4-5-8-13-8zm24 0l-8 20h6l5-13 5 13h6l-8-20h-6zm28 0c-8 0-14 6-14 10s6 10 14 10 12-4 13-8h-6c-1 2-4 3-7 3-5 0-8-4-8-7s3-7 8-7c3 0 6 1 7 3h6c-1-4-5-8-13-8z" />
  </svg>
);

const VnnicLogo = () => (
  <svg viewBox="0 0 120 30" className="w-16 h-6 fill-slate-700">
    <path d="M10 5l6 14 6-14h5l-9 20h-4L10 9l-4 11H2L10 5zm25 0h4l8 12V5h4v20h-4l-8-12v12h-4V5zm22 0h4l8 12V5h4v20h-4l-8-12v12h-4V5zm22 0h4v20h-4V5zm16 0c-5 0-9 4-9 10s4 10 9 10 9-4 9-10-4-10-9-10zm0 4c3 0 5 3 5 6s-2 6-5 6-5-3-5-6 2-6 5-6zm2.5 8h4.5" />
  </svg>
);

const PtitLogo = () => (
  <svg viewBox="0 0 120 30" className="w-16 h-6">
    <rect x="5" y="5" width="20" height="20" rx="4" fill="#d82a29" />
    <path d="M11 9h8v3h-5v2h4v2h-4v4h-3V9z" fill="white" />
    <text x="32" y="22" className="text-[17px] font-black fill-[#d82a29]">PTIT</text>
  </svg>
);

export function AboutPartners() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isEn = locale === "en";
  const [activeTab, setActiveTab] = useState<"domestic" | "international">("domestic");

  const domesticPartners: DomesticPartner[] = [
    {
      id: "vinfast",
      name: "VinFast",
      description: isEn ? "Training human resources for VinFast Ha Tinh Plant" : "Hợp tác đào tạo nguồn nhân lực cho nhà máy VinFast Hà Tĩnh",
      logoPath: "/images/partners-domestic/vinfast.svg",
      proofUrl: "https://vienktcn.vinhuni.edu.vn/tin-tuc-va-su-kien/seo/truong-dai-hoc-vinh-tham-va-lam-viec-tai-nha-may-vinfast-hai-phong-hop-tac-dao-tao-nguon-nhan-luc-cho-vinfast-ha-tinh-134876",
      country: isEn ? "Vietnam" : "Việt Nam",
    },
    {
      id: "meiko",
      name: "Meiko Electronics",
      description: isEn ? "Cooperation in training and recruitment" : "Hợp tác đào tạo và tuyển dụng kỹ sư điện tử",
      logoPath: "/images/partners-domestic/meiko.png",
      proofUrl: "https://vienktcn.vinhuni.edu.vn/tin-tuc-va-su-kien/seo/truong-dai-hoc-vinh-tham-va-lam-viec-tai-cong-ty-meiko-electronics-viet-nam-mev-134875",
      country: isEn ? "Japan" : "Nhật Bản",
    },
    {
      id: "fpt",
      name: "FPT Education",
      description: isEn ? "Employment and internship programs" : "Ký kết hợp tác phát triển việc làm và thực tập cho sinh viên",
      logoPath: "/images/partners-domestic/fpt.svg",
      proofUrl: "https://giaoducthoidai.vn/fpt-education-hop-tac-voi-truong-dai-hoc-vinh-phat-trien-viec-lam-cho-sinh-vien-post688367.html",
      country: isEn ? "Vietnam" : "Việt Nam",
    },
    {
      id: "viettel",
      name: "Viettel Group",
      description: isEn ? "Recruitment of telecommunication engineers" : "Tuyển dụng kỹ sư Điện tử viễn thông",
      logoPath: "/images/partners-domestic/viettel.svg",
      proofUrl: "https://vienktcn.vinhuni.edu.vn/dao-tao/seo/viettel-dong-nai-tuyen-dung-ky-su-dien-tu-vien-thong-109675",
      country: isEn ? "Vietnam" : "Việt Nam",
    },
    {
      id: "samsung",
      name: "Samsung Electronics",
      description: isEn ? "Recruitment and research scholarships" : "Tuyển dụng kỹ sư tự động hóa và học bổng nghiên cứu",
      logoPath: "/images/partners-domestic/samsung.svg",
      country: isEn ? "South Korea" : "Hàn Quốc",
    },
    {
      id: "formosa",
      name: "Formosa Group",
      description: isEn ? "Cooperation in training and employment" : "Ký kết hợp tác nghiên cứu ứng dụng và việc làm",
      logoPath: "/images/partners-domestic/formosa.svg",
      proofUrl: "https://vienktcn.vinhuni.edu.vn/tin-tuc-va-su-kien/seo/vien-ky-thuat-va-cong-nghe-dai-hoc-vinh-ky-ket-hop-tac-voi-truong-dai-hoc-ky-thuat-dai-hoc-quoc-gia-formosa-dai-loan-78074",
      country: isEn ? "Taiwan" : "Đài Loan",
    },
    {
      id: "cmc",
      name: "CMC Group",
      description: isEn ? "Cooperation in IT training" : "Hợp tác đào tạo và tuyển dụng kỹ sư công nghệ thông tin",
      icon: <CmcLogo />,
      country: isEn ? "Vietnam" : "Việt Nam",
    },
    {
      id: "tma",
      name: "TMA Solutions",
      description: isEn ? "Software engineering internships" : "Hợp tác đào tạo thực tập sinh ngành phần mềm",
      logoPath: "/images/partners-domestic/tma.png",
      country: isEn ? "Vietnam" : "Việt Nam",
    },
    {
      id: "lg",
      name: "LG Electronics",
      description: isEn ? "Employment and technology transfer" : "Tuyển dụng kỹ sư nghiên cứu phát triển",
      logoPath: "/images/partners-domestic/lg.svg",
      country: isEn ? "South Korea" : "Hàn Quốc",
    },
    {
      id: "vnnic",
      name: "VNNIC",
      description: isEn ? "Cooperation on DNS and Internet resources" : "Hợp tác phát triển hạ tầng Internet và tên miền quốc gia",
      icon: <VnnicLogo />,
      country: isEn ? "Vietnam" : "Việt Nam",
    },
    {
      id: "ptit",
      name: "Học viện BCVT",
      description: isEn ? "Research and digital transformation" : "Hợp tác nghiên cứu khoa học và chuyển đổi số giáo dục",
      icon: <PtitLogo />,
      proofUrl: "https://ptit.edu.vn",
      country: isEn ? "Vietnam" : "Việt Nam",
    },
  ];

  const currentPartners = activeTab === "domestic" ? domesticPartners : PARTNERS;

  return (
    <section className="py-14 md:py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-[1360px] mx-auto px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-brand-darkred bg-brand-darkred/5 px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider">
            <Handshake size={14} />
            <span>{isEn ? "Cooperation Network" : "Mạng lưới Hợp tác"}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isEn ? "Strategic Partners & Network" : "Đối tác chiến lược & Mạng lưới hợp tác"}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {isEn 
              ? "The School establishes sustainable relationships with leading domestic enterprises and global universities." 
              : "Trường xây dựng mối quan hệ hợp tác bền vững với các tập đoàn công nghệ hàng đầu và các trường đại học quốc tế."}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-3 border-b border-slate-200/60 pb-6 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("domestic")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
              activeTab === "domestic"
                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Briefcase size={14} />
            <span>{isEn ? "Enterprise Partners" : "Đối tác Doanh nghiệp"}</span>
          </button>
          <button
            onClick={() => setActiveTab("international")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
              activeTab === "international"
                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Globe size={14} />
            <span>{isEn ? "International Universities" : "Đại học Quốc tế"}</span>
          </button>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-4">
          {currentPartners.map((partner: any) => {
            const Wrapper = partner.proofUrl ? "a" : "div";
            const linkProps = partner.proofUrl
              ? {
                  href: partner.proofUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <Wrapper
                key={partner.id}
                {...linkProps as any}
                className={`flex flex-col justify-between p-4 border border-border rounded-xl bg-white transition-all duration-300 group ${
                  partner.proofUrl ? "hover:border-brand-darkred/30 cursor-pointer shadow-xs" : "cursor-default"
                }`}
              >
                {/* Logo Area */}
                <div className="relative aspect-[16/10] w-full flex items-center justify-center bg-slate-50/50 rounded-lg overflow-hidden border border-slate-100 p-4">
                  {partner.logoPath || partner.imageUrl ? (
                    <Image
                      src={partner.logoPath || partner.imageUrl}
                      alt={partner.name}
                      fill
                      sizes="(max-w-768px) 150px, 200px"
                      className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    partner.icon
                  )}
                  
                  {partner.proofUrl && (
                    <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/90 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-brand-darkred">
                      <ExternalLink size={10} />
                    </div>
                  )}
                </div>

                {/* Details Area */}
                <div className="text-center pt-3 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug group-hover:text-brand-darkred transition-colors duration-250">
                    {partner.name}
                  </h4>
                  {partner.description && (
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed pt-1 font-normal">
                      {partner.description}
                    </p>
                  )}
                  {partner.country && (
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pt-2 block">
                      {partner.country}
                    </span>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
}
