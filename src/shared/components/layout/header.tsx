"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Navigation } from "./navigation";
import { MenuTreeResponse } from "@/features/menu/types";

interface HeaderProps {
  initialMenu: MenuTreeResponse | null;
}

export function Header({ initialMenu }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-b w-full ${
        isSticky
          ? "fixed top-0 left-0 right-0 shadow-[var(--shadow-md)] backdrop-blur-xl bg-white/90 border-border/50 z-50 animate-slide-down"
          : "relative bg-white border-border z-45"
      }`}
    >
      {/* w-full tràn màn hình, căn giữa navigation menu và logo sát trái */}
      <div
        className={`w-full max-w-none flex items-center px-8 sm:px-12 lg:px-16 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSticky ? "h-16" : "h-22"
        }`}
      >
        {/* Cột trái: Logo sát trái (dùng margin âm để triệt tiêu khoảng trắng thừa bên trái của file logo SVG) */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center -ml-10 sm:-ml-12 lg:-ml-14">
            <div
              className={`relative transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isSticky ? "w-52 h-12 sm:w-60 sm:h-14" : "w-64 h-16 sm:w-72 sm:h-18"
              }`}
            >
              <Image
                src="/images/logo.svg"
                alt="Trường Kỹ thuật và Công nghệ - Đại học Vinh"
                fill
                priority
                sizes="(max-w-768px) 300px, 350px"
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Cột giữa: Navigation Menu căn giữa */}
        <div className="flex-none flex justify-center">
          <Navigation initialMenu={initialMenu} />
        </div>

        {/* Cột phải: Khối đối trọng rỗng giúp Menu căn giữa tuyệt đối */}
        <div className="flex-1 hidden lg:flex justify-end" />
      </div>
    </header>
  );
}
