"use client";

import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactInformation() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <div className="space-y-5">
      <h3 className="text-brand-darkred text-sm font-semibold uppercase tracking-wider border-b border-brand-darkred/30 pb-2.5 w-fit">
        {tCommon("college_name").toUpperCase()}
      </h3>
      <div className="space-y-3 text-slate-600 text-[13px] leading-relaxed">
        <p className="flex items-start gap-2.5">
          <MapPin size={14} className="text-brand-blue/70 shrink-0 mt-0.5" />
          <span><strong className="text-slate-700">{t("address")}:</strong> {tCommon("school_address")}</span>
        </p>
        <p className="flex items-center gap-2.5">
          <Phone size={14} className="text-brand-blue/70 shrink-0" />
          <span><strong className="text-slate-700">{t("phone")}:</strong> 0837.933.686</span>
        </p>
        <p className="flex items-center gap-2.5">
          <Mail size={14} className="text-brand-blue/70 shrink-0" />
          <span><strong className="text-slate-700">Email:</strong> set@vinhuni.edu.vn</span>
        </p>
        <p className="flex items-center gap-2.5">
          <Globe size={14} className="text-brand-blue/70 shrink-0" />
          <span><strong className="text-slate-700">{t("website")}:</strong> set.vinhuni.edu.vn</span>
        </p>
        <p className="text-[11px] text-slate-400 leading-relaxed border-t border-border/50 pt-3 mt-1">
          <strong className="text-slate-500">{t("responsible_officer")}:</strong><br />
          {t("dean_name")}
        </p>
      </div>
    </div>
  );
}
