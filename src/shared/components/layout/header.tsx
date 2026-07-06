"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Navigation } from "./navigation";
import { MenuTreeResponse } from "@/features/menu";

interface HeaderProps {
  initialMenu: MenuTreeResponse | null;
}

export function Header({ initialMenu }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting), {
      threshold: 0,
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />
      <header
        className={`sticky top-0 z-40 w-full border-b transition-[background-color,box-shadow] duration-200 ${
          isSticky
            ? "border-border/80 bg-white/95 shadow-[var(--shadow-md)] backdrop-blur-md"
            : "border-border bg-white"
        }`}
      >
        <div
          className={`site-container flex items-center justify-between gap-4 transition-[height] duration-200 ${
            isSticky ? "h-16" : "h-[4.5rem]"
          }`}
        >
          <div className="flex min-w-0 items-center">
            <Link href="/" className="flex items-center rounded-md" aria-label="Trang chủ">
              <div
                className={`relative transition-[width,height] duration-200 ${
                  isSticky ? "h-11 w-52 sm:w-60" : "h-12 w-56 sm:w-64"
                }`}
              >
                <Image
                  src="/images/logo.svg"
                  alt="Trường Kỹ thuật và Công nghệ - Đại học Vinh"
                  fill
                  priority
                  sizes="(max-width: 640px) 192px, 224px"
                className="origin-left scale-125 object-contain object-left sm:scale-150"
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-end">
            <Navigation initialMenu={initialMenu} />
          </div>
        </div>
      </header>
    </>
  );
}
