"use client";
// src/features/about/components/AboutDomesticPartners.tsx
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import Image from "next/image";

interface DomesticPartner {
  id: string;
  name: string;
  shortName: string;
  description: string;
  logoPath?: string; // Path tới ảnh logo thật
  icon?: ReactNode; // Dự phòng SVG vẽ tay
  proofUrl?: string;
  gradient: string;
}

// Custom SVG Logos for Partners that couldn't be downloaded directly (CMC, VNNIC, PTIT)
const CmcLogo = () => (
  <svg viewBox="0 0 120 30" className="w-16 h-6 transition-colors duration-300">
    <path d="M25 5c-8 0-14 6-14 10s6 10 14 10 12-4 13-8h-6c-1 2-4 3-7 3-5 0-8-4-8-7s3-7 8-7c3 0 6 1 7 3h6c-1-4-5-8-13-8zm24 0l-8 20h6l5-13 5 13h6l-8-20h-6zm28 0c-8 0-14 6-14 10s6 10 14 10 12-4 13-8h-6c-1 2-4 3-7 3-5 0-8-4-8-7s3-7 8-7c3 0 6 1 7 3h6c-1-4-5-8-13-8z" fill="#005AAB" />
  </svg>
);

const VnnicLogo = () => (
  <svg viewBox="0 0 120 30" className="w-16 h-6 transition-colors duration-300">
    <path d="M10 5l6 14 6-14h5l-9 20h-4L10 9l-4 11H2L10 5zm25 0h4l8 12V5h4v20h-4l-8-12v12h-4V5zm22 0h4l8 12V5h4v20h-4l-8-12v12h-4V5zm22 0h4v20h-4V5zm16 0c-5 0-9 4-9 10s4 10 9 10 9-4 9-10-4-10-9-10zm0 4c3 0 5 3 5 6s-2 6-5 6-5-3-5-6 2-6 5-6zm2.5 8h4.5" fill="#008bcb" />
  </svg>
);

const PtitLogo = () => (
  <svg viewBox="0 0 120 30" className="w-16 h-6 transition-colors duration-300">
    <rect x="5" y="5" width="20" height="20" rx="4" fill="#d82a29" />
    <path d="M11 9h8v3h-5v2h4v2h-4v4h-3V9z" fill="white" />
    <text x="32" y="22" className="text-[17px] font-black fill-[#d82a29] dark:fill-white">PTIT</text>
  </svg>
);

const DOMESTIC_PARTNERS_ROW1: DomesticPartner[] = [
  {
    id: "vinfast",
    name: "VinFast",
    shortName: "VF",
    description:
      "Hợp tác đào tạo nguồn nhân lực cho nhà máy VinFast Hà Tĩnh (2025)",
    logoPath: "/images/partners-domestic/vinfast.svg",
    proofUrl:
      "https://vienktcn.vinhuni.edu.vn/tin-tuc-va-su-kien/seo/truong-dai-hoc-vinh-tham-va-lam-viec-tai-nha-may-vinfast-hai-phong-hop-tac-dao-tao-nguon-nhan-luc-cho-vinfast-ha-tinh-134876",
    gradient: "from-slate-100 to-slate-200/50",
  },
  {
    id: "meiko",
    name: "Meiko Electronics",
    shortName: "ME",
    description: "Hợp tác đào tạo và tuyển dụng",
    logoPath: "/images/partners-domestic/meiko.png",
    proofUrl:
      "https://vienktcn.vinhuni.edu.vn/tin-tuc-va-su-kien/seo/truong-dai-hoc-vinh-tham-va-lam-viec-tai-cong-ty-meiko-electronics-viet-nam-mev-134875",
    gradient: "from-blue-50/50 to-indigo-50/30",
  },
  {
    id: "fpt",
    name: "FPT Education",
    shortName: "FPT",
    description: "MOU hợp tác phát triển việc làm",
    logoPath: "/images/partners-domestic/fpt.svg",
    proofUrl:
      "https://giaoducthoidai.vn/fpt-education-hop-tac-voi-truong-dai-hoc-vinh-phat-trien-viec-lam-cho-sinh-vien-post688367.html",
    gradient: "from-orange-50/50 to-amber-50/30",
  },
  {
    id: "viettel",
    name: "Viettel",
    shortName: "VT",
    description: "Tuyển dụng kỹ sư ĐTVT",
    logoPath: "/images/partners-domestic/viettel.svg",
    proofUrl:
      "https://vienktcn.vinhuni.edu.vn/dao-tao/seo/viettel-dong-nai-tuyen-dung-ky-su-dien-tu-vien-thong-109675",
    gradient: "from-red-50/50 to-rose-50/30",
  },
  {
    id: "samsung",
    name: "Samsung",
    shortName: "SS",
    description: "Tuyển dụng và đào tạo",
    logoPath: "/images/partners-domestic/samsung.svg",
    gradient: "from-blue-50/50 to-sky-50/30",
  },
  {
    id: "formosa",
    name: "Formosa (Đài Loan)",
    shortName: "FM",
    description: "Ký kết hợp tác với ĐH Quốc gia Formosa",
    logoPath: "/images/partners-domestic/formosa.svg",
    proofUrl:
      "https://vienktcn.vinhuni.edu.vn/tin-tuc-va-su-kien/seo/vien-ky-thuat-va-cong-nghe-dai-hoc-vinh-ky-ket-hop-tac-voi-truong-dai-hoc-ky-thuat-dai-hoc-quoc-gia-formosa-dai-loan-78074",
    gradient: "from-emerald-50/50 to-teal-50/30",
  },
];

const DOMESTIC_PARTNERS_ROW2: DomesticPartner[] = [
  {
    id: "cmc",
    name: "CMC Group",
    shortName: "CMC",
    description: "Hợp tác đào tạo CNTT",
    icon: <CmcLogo />,
    gradient: "from-purple-50/50 to-violet-50/30",
  },
  {
    id: "tma",
    name: "TMA Solutions",
    shortName: "TMA",
    description: "Hợp tác đào tạo",
    logoPath: "/images/partners-domestic/tma.png",
    gradient: "from-cyan-50/50 to-sky-50/30",
  },
  {
    id: "lg",
    name: "LG",
    shortName: "LG",
    description: "Tuyển dụng và đào tạo",
    logoPath: "/images/partners-domestic/lg.svg",
    gradient: "from-rose-50/50 to-pink-50/30",
  },
  {
    id: "shb",
    name: "SHB",
    shortName: "SHB",
    description:
      "Ký kết thỏa thuận hợp tác đào tạo và tuyển dụng",
    logoPath: "/images/partners-domestic/shb.svg",
    proofUrl: "https://bnews.vn/shb-ky-ket-thoa-thuan-hop-tac-voi-truong-dai-hoc-vinh/202503.html",
    gradient: "from-amber-50/50 to-yellow-50/30",
  },
  {
    id: "vnnic",
    name: "VNNIC",
    shortName: "VN",
    description: "Hợp tác tên miền và Internet",
    icon: <VnnicLogo />,
    gradient: "from-blue-50/40 to-sky-50/20",
  },
  {
    id: "ptit",
    name: "Học viện BCVT",
    shortName: "PTIT",
    description: "Hợp tác nghiên cứu KH và chuyển đổi số",
    icon: <PtitLogo />,
    proofUrl: "https://ptit.edu.vn",
    gradient: "from-red-50/40 to-rose-50/20",
  },
];

function PartnerCard({ partner }: { partner: DomesticPartner }) {
  return (
    <div className="group relative flex-shrink-0 w-[140px] sm:w-[175px] mx-2 sm:mx-3 cursor-default">
      <div
        className="flex items-center justify-center h-16 px-4 py-3 bg-white border border-slate-200/80 rounded-xl hover:border-brand-darkred/30 hover:shadow-xs transition-all duration-300"
      >
        {/* Logo Container (Căn giữa hoàn toàn) */}
        <div className="relative flex items-center justify-center w-full h-full text-slate-700 transition-transform duration-500 group-hover:scale-[1.02]">
          {partner.logoPath ? (
            <div className="relative w-full h-8 sm:h-9">
              <Image
                src={partner.logoPath}
                alt={partner.name}
                fill
                sizes="(max-width: 640px) 120px, 150px"
                className="object-contain"
                priority
              />
            </div>
          ) : (
            partner.icon
          )}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  partners,
  direction = "left",
}: {
  partners: DomesticPartner[];
  direction?: "left" | "right";
}) {
  // Duplicate data để tạo vòng lặp liền mạch
  const duplicated = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden group/marquee py-1">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50/50 via-slate-50/10 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50/50 via-slate-50/10 to-transparent z-10 pointer-events-none" />

      <div
        className={`
          flex w-max
          ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}
          group-hover/marquee:[animation-play-state:paused]
        `}
      >
        {duplicated.map((partner, i) => (
          <PartnerCard key={`${partner.id}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

export function AboutDomesticPartners() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20 bg-slate-50/50 overflow-hidden space-y-10">
      
      {/* Header aligned inside container */}
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-darkred bg-brand-darkred/6 rounded-full">
            {t("domestic_partners_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t("domestic_partners_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("domestic_partners_desc")}
          </p>
        </div>
      </div>

      {/* Marquee rows running full-width */}
      <div className="w-full space-y-6">
        <MarqueeRow partners={DOMESTIC_PARTNERS_ROW1} direction="left" />
        <MarqueeRow partners={DOMESTIC_PARTNERS_ROW2} direction="right" />
      </div>

    </section>
  );
}

