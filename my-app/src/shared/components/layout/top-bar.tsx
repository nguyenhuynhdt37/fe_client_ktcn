"use client";

import { useState, Suspense } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Facebook, MessageSquare, Search } from "lucide-react";
import { LanguageSwitcher } from "@/features/language";

export function TopBar() {
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Điều hướng hoặc xử lý tìm kiếm
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="bg-brand-darkred-dark text-slate-100 border-b border-brand-darkred-dark/30 text-xs py-2 px-8 sm:px-12 lg:px-16 relative z-50">
      <div className="w-full max-w-none flex items-center justify-between">
        {/* Địa chỉ (Ẩn trên thiết bị di động) */}
        <div className="hidden md:flex items-center gap-2 text-slate-200/90 font-medium">
          <MapPin size={13} className="text-brand-yellow" />
          <span>{t("school_address")}</span>
        </div>

        {/* Liên kết xã hội, Tìm kiếm & Ngôn ngữ */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Mạng xã hội & Ngôn ngữ */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/truongkinhtetruongdaihocvinh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-yellow transition"
              aria-label="Facebook"
            >
              <Facebook size={14} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-yellow transition"
              aria-label="Messenger"
            >
              <MessageSquare size={14} />
            </a>
            
            {/* Component chọn ngôn ngữ i18n Dropdown */}
            <Suspense fallback={<div className="w-24 h-6 bg-white/5 animate-pulse" />}>
              <LanguageSwitcher />
            </Suspense>
          </div>

          {/* Ô tìm kiếm */}
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border border-white/20 text-white rounded-none py-1 pl-3 pr-8 w-36 sm:w-44 focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-transparent text-[11px] transition-all placeholder-white/50"
            />
            <button
              type="submit"
              className="absolute right-2 text-white/70 hover:text-brand-yellow transition"
              aria-label="Submit Search"
            >
              <Search size={12} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
