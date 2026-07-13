"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export function Copyright() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  useEffect(() => {
    // Ký hiệu ẩn trong Developer Tools Console
    console.log(
      "%c⚙️ SET VinhUni %c Portal v1.0.0 %c developed by Xuân Huỳnh & Trọng Truyền",
      "background: #da251d; color: #fff; padding: 2px 6px; border-radius: 3px 0 0 3px; font-weight: bold; font-family: monospace; font-size: 11px;",
      "background: #1e293b; color: #f8fafc; padding: 2px 6px; border-radius: 0 3px 3px 0; font-family: monospace; font-size: 11px;",
      "color: #64748b; font-family: monospace; font-size: 11px; padding-left: 8px;"
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
          <a
            href="https://www.facebook.com/nt.truyent.2025"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-yellow underline transition-colors duration-150 font-medium text-white/90"
            title="Ghé thăm trang cá nhân Nguyễn Trọng Truyền"
          >
            Nguyễn Trọng Truyền
          </a>
        </span>
      </div>
    </div>
  );
}
