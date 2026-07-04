"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function FacebookFanpage() {
  const t = useTranslations("footer");

  return (
    <div className="space-y-5">
      <h3 className="text-brand-darkred text-sm font-semibold uppercase tracking-wider border-b border-brand-darkred/30 pb-2.5 w-fit">
        {t("fanpage")}
      </h3>
      <a
        href="https://www.facebook.com/truongkinhtetruongdaihocvinh"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200 border border-border/40 w-full max-w-[260px] shadow-[var(--shadow-xs)]"
      >
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="/images/fb_fanpage.png"
            alt="Facebook Fanpage"
            fill
            sizes="(max-w-768px) 100vw, 260px"
            className="object-cover"
          />
        </div>
      </a>
    </div>
  );
}
