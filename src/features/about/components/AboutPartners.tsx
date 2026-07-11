// src/features/about/components/AboutPartners.tsx
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PARTNERS } from "../constants/about-data";

export function AboutPartners() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60">
      <div className="max-w-[1360px] mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t("partners_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("partners_desc")}
          </p>
        </div>

        {/* Grid đối tác */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {PARTNERS.map((partner) => (
            <a
              key={partner.id}
              href={partner.proofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col border border-border rounded-xl bg-white overflow-hidden hover:border-border-subtle hover:shadow-sm transition-all duration-300 group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border-b border-slate-100">
                <Image
                  src={partner.imageUrl}
                  alt={partner.name}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 16vw"
                  className="object-contain p-6 group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-300" />
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-brand-darkred">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Text info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2 text-center">
                <p className="text-xs font-bold text-slate-700 leading-snug group-hover:text-brand-darkred transition-colors duration-300">
                  {partner.name}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  {partner.country}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
