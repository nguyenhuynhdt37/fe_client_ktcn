"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerResponse } from "../types/banner.types";
import { useLocale } from "next-intl";
import { getLocalizedField } from "@/features/article/utils/map-article";

interface HeroSliderProps {
  banners: BannerResponse[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const locale = useLocale();

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((api: NonNullable<typeof emblaApi>) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const initHandle = requestAnimationFrame(() => {
      onInit(emblaApi);
      onSelect(emblaApi);
    });

    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      cancelAnimationFrame(initHandle);
    };
  }, [emblaApi, onInit, onSelect]);

  // Tự động chạy slide sau 5 giây
  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [emblaApi]);

  // Nếu không có banner nào đang hoạt động, trả về null hoặc ảnh placeholder mặc định
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden w-full bg-slate-100">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => {
            const title = getLocalizedField<string>(banner, "title", locale);
            const description = getLocalizedField<string>(banner, "description", locale);
            
            const SlideContent = (
              <div className="w-full relative">
                {banner.mobile_image_object_key ? (
                  <>
                    {/* Desktop Image */}
                    <div className="hidden sm:block w-full">
                      <Image
                        src={banner.desktop_image_object_key}
                        alt={title || ""}
                        width={1920}
                        height={600}
                        priority={index === 0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    {/* Mobile Image */}
                    <div className="block sm:hidden w-full">
                      <Image
                        src={banner.mobile_image_object_key}
                        alt={title || ""}
                        width={750}
                        height={450}
                        priority={index === 0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-full">
                    <Image
                      src={banner.desktop_image_object_key}
                      alt={title || ""}
                      width={1920}
                      height={600}
                      priority={index === 0}
                      sizes="100vw"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}
              </div>
            );

            // Nếu banner có link, bọc toàn bộ slide bằng thẻ Link
            if (banner.link_url) {
              return (
                <Link
                  key={banner.id}
                  href={banner.link_url as any}
                  target={banner.open_in_new_tab ? "_blank" : undefined}
                  className="flex-[0_0_100%] min-w-0 block relative"
                >
                  {SlideContent}
                </Link>
              );
            }

            return <div key={banner.id} className="flex-[0_0_100%] min-w-0">{SlideContent}</div>;
          })}
        </div>
      </div>

      {/* Nút prev / next (Chỉ hiện khi có từ 2 slide) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 z-10"
            aria-label="Next Slide"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Dots navigation */}
      {banners.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
