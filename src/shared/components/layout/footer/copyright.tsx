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

  return (
    <div className="bg-brand-darkred-dark px-6 py-4 text-center text-sm font-normal text-white/80">
      <div className="site-container flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
        <span>{t("copyright", { year })}</span>
        <span className="hidden sm:inline text-white/30">|</span>
        <span className="text-white/60">
          Phát triển bởi{" "}
          <a
            href="https://www.facebook.com/nguyenxuanhuynh2004/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-yellow underline transition-colors duration-150 font-medium text-white/90"
            title="Ghé thăm trang cá nhân Nguyễn Xuân Huỳnh"
          >
            Nguyễn Xuân Huỳnh
          </a>{" "}
          &{" "}
          <span className="font-medium text-white/90">Nguyễn Trọng Truyền</span>
        </span>
      </div>
    </div>
  );
}
