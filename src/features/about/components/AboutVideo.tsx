"use client";
// src/features/about/components/AboutVideo.tsx
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Play } from "lucide-react";
import { SafeImage } from "@/shared/components/ui/safe-image";

const YOUTUBE_VIDEO_ID = "R9j7v2zYV0o"; // Video giới thiệu chính thức Đại học Vinh

export function AboutVideo() {
  const t = useTranslations("about");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60">
      <div className="max-w-[1360px] mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-darkred bg-brand-darkred/5 px-3 py-1 rounded-sm border border-brand-darkred/10">
            {t("video_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t("video_heading")}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t("video_subtext")}
          </p>
        </div>

        {/* Video Player */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-sm border border-slate-100/60 overflow-hidden bg-slate-900">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                title={t("video_heading")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full group cursor-pointer"
                aria-label={t("video_play_label")}
              >
                {/* Thumbnail */}
                <SafeImage
                  src="/images/about/set-banner-1.png"
                  alt={t("video_heading")}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover brightness-75 group-hover:brightness-[0.6] transition-all duration-300"
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-brand-darkred text-white rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm text-white font-medium">
                  {t("video_caption")}
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
