"use client";

import { useState, useEffect, useCallback } from "react";
import { PortalGallery } from "../types/department.types";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { Images, X, ChevronLeft, ChevronRight } from "lucide-react";

interface DepartmentGalleryProps {
  galleries: PortalGallery[];
  isEn: boolean;
}

export function DepartmentGallery({ galleries, isEn }: DepartmentGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null);

  const activeGallery = galleries.find((g) => g.id === activeGalleryId);
  const activePhotos = activeGallery ? activeGallery.items || [] : [];
  const currentPhoto = activePhotoIndex !== null ? activePhotos[activePhotoIndex] : null;

  const closeLightbox = useCallback(() => {
    setActivePhotoIndex(null);
    setActiveGalleryId(null);
  }, []);

  const showPrev = useCallback(() => {
    if (activePhotoIndex === null || activePhotos.length === 0) return;
    setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : activePhotos.length - 1));
  }, [activePhotoIndex, activePhotos.length]);

  const showNext = useCallback(() => {
    if (activePhotoIndex === null || activePhotos.length === 0) return;
    setActivePhotoIndex((prev) => (prev !== null && prev < activePhotos.length - 1 ? prev + 1 : 0));
  }, [activePhotoIndex, activePhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, closeLightbox, showPrev, showNext]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePhotoIndex]);

  if (galleries.length === 0) return null;

  return (
    <section className="py-14 md:py-20 border-t border-slate-100 bg-slate-50/50 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 space-y-10">
        {/* Main Section Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
          <Images className="h-6 w-6 text-brand-blue" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {isEn ? "Photo Gallery" : "Hình ảnh hoạt động"}
          </h2>
        </div>

        {/* Gallery Albums */}
        <div className="space-y-12">
          {galleries.map((gallery) => {
            const photos = gallery.items || [];
            if (photos.length === 0) return null;

            // Duplicate items to ensure seamless loop
            const duplicatedPhotos = photos.length < 5
              ? [...photos, ...photos, ...photos, ...photos]
              : [...photos, ...photos];

            return (
              <div key={gallery.id} className="space-y-4">
                {/* Album Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    {gallery.title}
                  </h3>
                  {gallery.description && (
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                      {gallery.description}
                    </p>
                  )}
                </div>

                {/* Continuous Infinite Scrolling Row restricted to container width */}
                <div className="relative overflow-hidden group/marquee py-2 rounded-2xl">
                  {/* Gradient fade edges inside the container */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-slate-50/90 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-slate-50/90 to-transparent z-10 pointer-events-none" />

                  {/* Marquee Container */}
                  <div
                    className="flex w-max gap-4 animate-marquee-left group-hover/marquee:[animation-play-state:paused]"
                    style={{ animationDuration: `${Math.max(15, photos.length * 5)}s` }}
                  >
                    {duplicatedPhotos.map((item, i) => {
                      // Map the duplicated index to the original index for clicking
                      const originalIndex = i % photos.length;
                      return (
                        <figure
                          key={`${item.id}-${i}`}
                          onClick={() => {
                            setActiveGalleryId(gallery.id);
                            setActivePhotoIndex(originalIndex);
                          }}
                          className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 w-[240px] sm:w-[320px] aspect-[4/3] shrink-0 group/img cursor-pointer"
                        >
                          <SafeImage
                            src={item.object_key || item.thumbnail_key || "/images/no-image-dhv.jpg"}
                            alt={item.alt_text || item.caption || gallery.title}
                            fill
                            sizes="(max-width: 640px) 240px, 320px"
                            className="object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
                          />
                          
                          {item.caption && (
                            <figcaption className="absolute inset-x-0 bottom-0 bg-slate-900/80 backdrop-blur-sm px-4 py-2.5 text-xs text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none line-clamp-2">
                              {item.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Modal Image Viewer */}
      {activePhotoIndex !== null && currentPhoto && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/98 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all duration-200 z-[10000] cursor-pointer"
            aria-label={isEn ? "Close viewer" : "Đóng hộp xem ảnh"}
          >
            <X size={24} />
          </button>

          {/* Prev Arrow */}
          {activePhotos.length > 1 && (
            <button
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all duration-200 z-[10000] cursor-pointer bg-slate-900/30"
              aria-label={isEn ? "Previous image" : "Ảnh trước"}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Main Image Viewport */}
          <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPhoto.object_key || currentPhoto.thumbnail_key || "/images/no-image-dhv.jpg"}
              alt={currentPhoto.alt_text || currentPhoto.caption || (activeGallery?.title || "")}
              className="max-h-[70vh] max-w-full object-contain rounded-xl border border-white/10 shadow-2xl transition-transform duration-300"
            />
          </div>

          {/* Next Arrow */}
          {activePhotos.length > 1 && (
            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all duration-200 z-[10000] cursor-pointer bg-slate-900/30"
              aria-label={isEn ? "Next image" : "Ảnh tiếp theo"}
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Caption & Counter overlay at the bottom */}
          <div className="absolute bottom-6 left-0 right-0 text-center space-y-1.5 px-6">
            <div className="text-xs text-white/40 font-mono font-bold tracking-widest uppercase">
              {activePhotoIndex + 1} / {activePhotos.length}
            </div>
            {currentPhoto.caption && (
              <p className="text-sm sm:text-base text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md line-clamp-2">
                {currentPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
