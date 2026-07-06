"use client";

import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactInformation() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-slate-900">{tCommon("college_name")}</h3>
      <div className="space-y-3 text-sm leading-relaxed text-slate-600">
        <p className="flex items-start gap-2.5">
          <MapPin size={16} className="text-brand-blue/70 mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            <strong className="text-slate-700">{t("address")}:</strong> {tCommon("school_address")}
          </span>
        </p>
        <p className="flex items-center gap-2.5">
          <Phone size={16} className="text-brand-blue/70 shrink-0" aria-hidden="true" />
          <span>
            <strong className="text-slate-700">{t("phone")}:</strong> 0837.933.686
          </span>
        </p>
        <p className="flex items-center gap-2.5">
          <Mail size={16} className="text-brand-blue/70 shrink-0" aria-hidden="true" />
          <span>
            <strong className="text-slate-700">Email:</strong> set@vinhuni.edu.vn
          </span>
        </p>
        <p className="flex items-center gap-2.5">
          <Globe size={16} className="text-brand-blue/70 shrink-0" aria-hidden="true" />
          <span>
            <strong className="text-slate-700">{t("website")}:</strong> set.vinhuni.edu.vn
          </span>
        </p>
        <p className="border-border mt-1 border-t pt-3 text-sm leading-relaxed text-slate-600">
          <strong className="text-slate-500">{t("responsible_officer")}:</strong>
          <br />
          {t("dean_name")}
        </p>
      </div>
    </div>
  );
}
