"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export function Copyright() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  useEffect(() => {
    // Ký hiệu ẩn trong Developer Tools Console
    console.log(
      "%c⚡ SET VINHUNI PORTAL ⚡%c\n" +
      "%cDeveloped with ❤️ by Nguyễn Xuân Huỳnh & Nguyễn Trọng Truyền",
      "background: linear-gradient(135deg, #da251d 0%, #b7410e 50%, #1e3a8a 100%); color: white; padding: 8px 16px; border-radius: 8px; font-size: 18px; font-weight: 800; font-family: 'Outfit', sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.4); box-shadow: 0 4px 15px rgba(0,0,0,0.15);",
      "",
      "color: #334155; font-size: 13px; font-weight: 600; font-family: sans-serif; padding-top: 10px; display: inline-block;"
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
