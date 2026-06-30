"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function FacebookFanpage() {
  const t = useTranslations("footer");

  return (
    <div className="space-y-4">
      <h3 className="text-[#d82026] text-base font-bold border-b-2 border-[#d82026] pb-2 w-fit">
        {t("fanpage")}
      </h3>
      <a
        href="https://www.facebook.com/truongkinhtetruongdaihocvinh"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-none overflow-hidden hover:opacity-90 transition border border-slate-200 w-full max-w-[260px]"
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
