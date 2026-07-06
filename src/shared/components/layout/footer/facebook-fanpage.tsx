"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function FacebookFanpage() {
  const t = useTranslations("footer");

  return (
    <div className="space-y-5">
      <h3 className="text-base font-bold text-slate-900">{t("fanpage")}</h3>
      <a
        href="https://www.facebook.com/truongkinhtetruongdaihocvinh"
        target="_blank"
        rel="noopener noreferrer"
        className="border-border relative block w-full max-w-[260px] overflow-hidden rounded-lg border transition-opacity duration-150 hover:opacity-90"
      >
        <div className="relative aspect-[4/3] w-full">
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
