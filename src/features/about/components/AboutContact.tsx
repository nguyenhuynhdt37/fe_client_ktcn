// src/features/about/components/AboutContact.tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MapPin, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { CONTACT_INFO } from "../constants/about-data";

export function AboutContact() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20 bg-slate-800 text-white">
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Thông tin liên hệ */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t("contact_heading")}
            </h2>
            <div className="w-16 h-[2px] bg-brand-yellow" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-yellow shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300 leading-relaxed">
                  {CONTACT_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-brand-yellow shrink-0" />
                <span className="text-sm text-slate-300">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-brand-yellow shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-slate-300 hover:text-white transition-colors duration-150"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-brand-yellow shrink-0" />
                <a
                  href={CONTACT_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-300 hover:text-white transition-colors duration-150"
                >
                  {CONTACT_INFO.website}
                </a>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="space-y-4">
            <p className="text-base text-slate-300 leading-relaxed">
              {t("contact_cta_text")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tin-tuc"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-darkred text-white text-sm font-bold rounded-sm hover:bg-brand-darkred-dark transition-colors duration-200"
              >
                {t("contact_cta_admission")}
                <ArrowRight size={14} />
              </Link>
              <a
                href={CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-bold rounded-sm hover:bg-white/10 transition-colors duration-200"
              >
                {t("contact_cta_facebook")}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
