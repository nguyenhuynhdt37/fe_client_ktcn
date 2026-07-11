"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

interface GalleryItem {
  id: string | number;
  imageUrl: string;
  alt: string;
  altEn?: string;
}

const defaultImages: GalleryItem[] = [
  { id: 1, imageUrl: "/images/gallery/gallery-1.jpg", alt: "Hình ảnh tiêu biểu 1", altEn: "Featured Image 1" },
  { id: 2, imageUrl: "/images/gallery/gallery-2.jpg", alt: "Hình ảnh tiêu biểu 2", altEn: "Featured Image 2" },
  { id: 3, imageUrl: "/images/gallery/gallery-3.jpg", alt: "Hình ảnh tiêu biểu 3", altEn: "Featured Image 3" },
  { id: 4, imageUrl: "/images/gallery/gallery-4.jpg", alt: "Hình ảnh tiêu biểu 4", altEn: "Featured Image 4" },
  { id: 5, imageUrl: "/images/gallery/gallery-5.jpg", alt: "Hình ảnh tiêu biểu 5", altEn: "Featured Image 5" },
  { id: 6, imageUrl: "/images/gallery/gallery-6.jpg", alt: "Hình ảnh tiêu biểu 6", altEn: "Featured Image 6" },
  { id: 7, imageUrl: "/images/gallery/gallery-7.jpg", alt: "Hình ảnh tiêu biểu 7", altEn: "Featured Image 7" },
  { id: 8, imageUrl: "/images/gallery/gallery-8.jpg", alt: "Hình ảnh tiêu biểu 8", altEn: "Featured Image 8" },
];

export function GallerySlider({ images = defaultImages }: { images?: GalleryItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const locale = useLocale();
  const t = useTranslations("common");

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1360px] mx-auto px-6 space-y-8 relative group">
        <div className="flex items-center justify-between border-b border-border/60 pb-5">
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-foreground relative after:absolute after:bottom-[-21px] after:left-0 after:w-14 after:h-[2px] after:bg-brand-darkred">
            {t("gallery_title")}
          </h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {images.map((img) => {
              const altText = locale === "en" ? (img.altEn || img.alt) : img.alt;
              return (
                <div
                  key={img.id}
                  className="flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0"
                >
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-border/30 hover:border-border/60  transition-all duration-300">
                    <Image
                      src={img.imageUrl}
                      alt={altText}
                      fill
                      sizes="(max-w-640px) 50vw, (max-w-1024px) 33vw, 250px"
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nút Điều khiển slider */}
        <button
          onClick={scrollPrev}
          className="absolute -left-2 top-[58%] -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white  border border-border/30 text-slate-600 hover:text-brand-darkred  transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
          aria-label="Previous gallery slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute -right-2 top-[58%] -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white  border border-border/30 text-slate-600 hover:text-brand-darkred  transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
          aria-label="Next gallery slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
