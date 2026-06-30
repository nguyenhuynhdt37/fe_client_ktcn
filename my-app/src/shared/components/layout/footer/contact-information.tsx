"use client";

import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactInformation() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <div className="space-y-4">
      <h3 className="text-[#d82026] text-base font-bold border-b-2 border-[#d82026] pb-2 w-fit">
        {tCommon("college_name").toUpperCase()}
      </h3>
      <div className="space-y-3 text-slate-800">
        <p className="flex items-start gap-2.5">
          <MapPin size={16} className="text-brand-blue shrink-0 mt-0.5" />
          <span><strong>{t("address")}:</strong> {tCommon("school_address")}</span>
        </p>
        <p className="flex items-center gap-2.5">
          <Phone size={16} className="text-brand-blue shrink-0" />
          <span><strong>{t("phone")}:</strong> 0837.933.686</span>
        </p>
        <p className="flex items-center gap-2.5">
          <Mail size={16} className="text-brand-blue shrink-0" />
          <span><strong>Email:</strong> set@vinhuni.edu.vn</span>
        </p>
        <p className="flex items-center gap-2.5">
          <Globe size={16} className="text-brand-blue shrink-0" />
          <span><strong>{t("website")}:</strong> set.vinhuni.edu.vn</span>
        </p>
        <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-200 pt-3">
          <strong>{t("responsible_officer")}:</strong><br />
          {t("dean_name")}
        </p>
      </div>
    </div>
  );
}
