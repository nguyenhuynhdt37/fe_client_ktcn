"use client";

import { useRef, useCallback } from "react";
import Image, { ImageProps } from "next/image";

/**
 * Danh sách ảnh fallback từ gallery Đại học Vinh.
 * Khi ảnh gốc lỗi, sẽ hiển thị 1 ảnh ngẫu nhiên (deterministic) từ danh sách này.
 */
const FALLBACK_IMAGES = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-6.jpg",
  "/images/gallery/gallery-7.jpg",
  "/images/gallery/gallery-8.jpg",
];

/**
 * Hash đơn giản từ string → số, dùng để chọn ảnh fallback deterministic.
 * Cùng 1 URL luôn trả về cùng 1 ảnh fallback → tránh nháy khi re-render.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

/**
 * SafeImage — Component ảnh an toàn, KHÔNG sử dụng useState.
 *
 * Nguyên lý: Toàn bộ xử lý lỗi ảnh được thực hiện bằng thao tác DOM trực tiếp
 * thông qua useRef, không kích hoạt bất kỳ re-render nào của React.
 * Điều này triệt tiêu hoàn toàn hiện tượng nhấp nháy (flicker) khi cuộn trang.
 *
 * Ảnh fallback được chọn ngẫu nhiên (deterministic theo src) từ gallery ĐH Vinh.
 */
export function SafeImage({
  src,
  alt,
  fallbackSrc,
  ...props
}: SafeImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  // Chọn ảnh fallback deterministic dựa trên src gốc
  const resolvedFallback = fallbackSrc
    || FALLBACK_IMAGES[hashString(String(src || "")) % FALLBACK_IMAGES.length];

  const handleError = useCallback(() => {
    // Thao tác DOM trực tiếp: đổi src sang fallback mà KHÔNG gây re-render React
    if (imgRef.current) {
      imgRef.current.src = resolvedFallback;
      imgRef.current.srcset = "";
    }
  }, [resolvedFallback]);

  return (
    <Image
      ref={imgRef}
      {...props}
      src={src || resolvedFallback}
      alt={alt}
      onError={handleError}
    />
  );
}
