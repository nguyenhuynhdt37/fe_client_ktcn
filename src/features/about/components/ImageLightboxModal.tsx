"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; title: string }[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
}

export function ImageLightboxModal({
  isOpen,
  onClose,
  images,
  activeIndex,
  onActiveIndexChange,
}: ImageLightboxModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle keyboard events (Left, Right, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[activeIndex];

  const handlePrev = () => {
    onActiveIndexChange((activeIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onActiveIndexChange((activeIndex + 1) % images.length);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 backdrop-blur-md transition-all duration-300"
    >
      {/* Close button top right */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[10000] p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 cursor-pointer hover:scale-105 transition-all"
        aria-label="Close modal"
      >
        <X size={24} />
      </button>

      {/* Main Image View */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full flex flex-col items-center justify-center p-6 md:p-12 select-none"
      >
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-[10000] w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/85 hover:text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-[10000] w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/85 hover:text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>

        {/* Center Container for Image */}
        <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center animate-fade-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/5"
          />
        </div>

        {/* Caption & Counter */}
        <div className="mt-6 text-center max-w-2xl px-6">
          <p className="text-white text-base md:text-lg font-bold drop-shadow-sm tracking-wide leading-snug">
            {currentImage.title}
          </p>
          <p className="text-white/55 text-xs md:text-sm mt-2 font-semibold tracking-widest">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
