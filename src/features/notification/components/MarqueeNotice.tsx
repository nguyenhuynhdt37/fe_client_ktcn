"use client";

import { Link } from "@/i18n/routing";
import { Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { MarqueeNoticeItem } from "../types/notification.types";

interface MarqueeNoticeProps {
  notices: MarqueeNoticeItem[];
}

export function MarqueeNotice({ notices = [] }: MarqueeNoticeProps) {
  const t = useTranslations("common");

  if (notices.length === 0) return null;

  return (
    <div className="w-full bg-slate-50 border-y border-slate-200/60 py-2.5 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 flex items-center gap-3">
        {/* Nhãn cố định bên trái */}
        <div className="flex items-center gap-1.5 text-brand-darkred font-bold text-xs uppercase tracking-wider shrink-0 select-none">
          <Volume2 size={14} className="animate-bounce" />
          <span>{t("notices_title") || "Thông báo"}:</span>
        </div>

        {/* Khung chạy chữ */}
        <div className="relative flex-1 overflow-hidden h-5">
          <div className="absolute top-0 flex gap-12 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {/* Render 2 bộ notices để tạo hiệu ứng chạy vòng lặp vô tận (infinite loop) */}
            {[...notices, ...notices].map((notice, idx) => (
              <Link
                key={`${notice.id}-${idx}`}
                href={notice.href as any}
                className="text-xs font-semibold text-slate-700 hover:text-brand-darkred transition-colors duration-150 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-brand-darkred rounded-full shrink-0" />
                <span>{notice.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
