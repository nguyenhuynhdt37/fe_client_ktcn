"use client";

import { SafeImage } from "@/shared/components/ui/safe-image";
import { ZoomIn } from "lucide-react";

interface StudentLifeCarouselProps {
  images: { src: string; title: string }[];
  onImageClick: (index: number) => void;
}

export function StudentLifeCarousel({ images, onImageClick }: StudentLifeCarouselProps) {
  // Duplicate images list to create an infinite loop effect
  const doubleImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden relative py-4 bg-slate-100/30 border-y border-slate-200/40">
      {/* Marquee Track Container */}
      <div className="animate-marquee-carousel gap-5 px-4">
        {doubleImages.map((img, idx) => {
          // Map index back to original images array index for Lightbox
          const originalIndex = idx % images.length;
          
          return (
            <div
              key={idx}
              onClick={() => onImageClick(originalIndex)}
              className="relative w-[280px] sm:w-[350px] md:w-[400px] aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-sm cursor-pointer group hover:shadow-lg hover:border-brand-darkred/30 transition-all duration-300 ease-out shrink-0 select-none"
            >
              <SafeImage
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-w-768px) 300px, 450px"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] filter brightness-95 group-hover:brightness-100"
              />
              
              {/* Zoom Indicator on Hover */}
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center z-20">
                <div className="p-3 rounded-full bg-white/95 text-slate-800 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <ZoomIn size={20} className="text-brand-darkred" />
                </div>
              </div>

              {/* Title Slide up Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pt-12 pb-4 px-5 z-10 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <p className="text-white text-xs sm:text-sm font-bold drop-shadow-sm truncate tracking-wide leading-snug">
                  {img.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
