"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowLeft, Newspaper } from "lucide-react";

const GALLERY_IMAGES = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-6.jpg",
  "/images/gallery/gallery-7.jpg",
  "/images/gallery/gallery-8.jpg",
];

export default function NotFound() {
  const t = useTranslations("common");

  // Chọn 1 ảnh ngẫu nhiên từ gallery mỗi lần render (client-side)
  const randomImage =
    GALLERY_IMAGES[Math.floor(Math.random() * GALLERY_IMAGES.length)];

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* Background ảnh mờ từ Gallery ĐH Vinh */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={randomImage}
          alt=""
          fill
          className="object-cover blur-sm brightness-[0.25]"
          priority
          unoptimized
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg text-center">
        {/* Logo nhỏ */}
        <div className="mx-auto mb-6 flex items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="SET VinhUni"
            width={48}
            height={48}
            className="opacity-70"
            unoptimized
          />
        </div>

        {/* Số 404 gradient lớn */}
        <h1
          className="text-[10rem] font-black leading-none tracking-tighter sm:text-[12rem]"
          style={{
            background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 40%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 40px rgba(185, 28, 28, 0.3)",
          }}
        >
          404
        </h1>

        {/* Tiêu đề */}
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {t("page_not_found_title")}
        </h2>

        {/* Mô tả */}
        <p className="mt-3 text-sm leading-relaxed text-slate-300/90 sm:text-base">
          {t("page_not_found_desc")}
        </p>

        {/* Đường kẻ trang trí */}
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-brand-darkred/60 to-transparent" />

        {/* Hành động */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-darkred px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-darkred/90"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {t("go_home")}
          </Link>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/10"
          >
            <Newspaper className="h-4 w-4" />
            {t("view_news")}
          </Link>
        </div>
      </div>
    </div>
  );
}
