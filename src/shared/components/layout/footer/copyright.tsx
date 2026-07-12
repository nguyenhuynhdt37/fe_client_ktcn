"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export function Copyright() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  useEffect(() => {
    // Ký hiệu ẩn trong Developer Tools Console
    console.log(
      "%c🚀 Portal developed by Nguyễn Xuân Huỳnh & Nguyễn Trọng Truyền | SET VinhUni",
      "color: #da251d; font-weight: bold; font-size: 13px; font-family: sans-serif; padding: 4px 8px; border: 1px solid #da251d; border-radius: 4px;"
    );
  }, []);

  const copyrightText = t("copyright", { year });
  const textWithoutSymbol = copyrightText.replace("©", "").trim();

  return (
    <div className="bg-brand-darkred-dark px-6 py-4 text-center text-sm font-normal text-white/85">
      <div className="site-container cursor-default select-none">
        <a
          href="https://www.facebook.com/nguyenxuanhuynh2004/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-yellow cursor-pointer transition-colors duration-150 mr-1"
          title="Developed by Nguyễn Xuân Huỳnh & Nguyễn Trọng Truyền"
        >
          ©
        </a>
        <span>{textWithoutSymbol}</span>
      </div>
    </div>
  );
}
