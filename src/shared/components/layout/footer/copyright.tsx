"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export function Copyright() {
  const t = useTranslations("footer");

  useEffect(() => {
    // Ký hiệu ẩn trong Developer Tools Console
    console.log(
      "%c🚀 Portal developed by Nguyễn Xuân Huỳnh & Nguyễn Trọng Truyền | SET VinhUni",
      "color: #da251d; font-weight: bold; font-size: 13px; font-family: sans-serif; padding: 4px 8px; border: 1px solid #da251d; border-radius: 4px;"
    );
  }, []);

  return (
    <div className="bg-brand-darkred-dark px-6 py-4 text-center text-sm font-normal text-white/85">
      <div
        className="site-container cursor-default select-none"
        title="Developed by Nguyễn Xuân Huỳnh & Nguyễn Trọng Truyền"
      >
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </div>
  );
}
