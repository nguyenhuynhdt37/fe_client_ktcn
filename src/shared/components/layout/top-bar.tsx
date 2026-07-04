"use client";

import { useState, useEffect, Suspense } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Facebook, MessageSquare, Search, Clock, CloudSun } from "lucide-react";
import { LanguageSwitcher, Language } from "@/features/language";

interface TopBarProps {
  initialLanguages?: Language[];
}

export function TopBar({ initialLanguages }: TopBarProps) {
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeString, setTimeString] = useState("");
  const [weather, setWeather] = useState<{ temp: number; description: string } | null>(null);

  useEffect(() => {
    // 1. Cập nhật thời gian thực tế
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      try {
        const formatted = now.toLocaleDateString("vi-VN", options);
        // Sửa định dạng dấu phẩy sang gạch ngang
        setTimeString(formatted.replace(",", " -"));
      } catch (e) {
        setTimeString("");
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    // 2. Fetch thời tiết thực tế Vinh từ Open-Meteo
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=18.6734&longitude=105.6924&current=temperature_2m,weather_code"
        );
        const data = await res.json();
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;

        let description = "Nắng";
        if (code >= 1 && code <= 3) description = "Ít mây";
        else if (code >= 45 && code <= 48) description = "Sương mù";
        else if (code >= 51 && code <= 67) description = "Mưa nhẹ";
        else if (code >= 71 && code <= 86) description = "Tuyết";
        else if (code >= 95) description = "Giông bão";
        else if (code === 0) description = "Trời quang";

        setWeather({ temp, description });
      } catch (error) {
        console.error("Failed to fetch weather", error);
        setWeather({ temp: 28, description: "Nhiều mây" });
      }
    };

    fetchWeather();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Điều hướng hoặc xử lý tìm kiếm
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="bg-brand-darkred-dark text-slate-100 border-b border-white/5 text-[11px] py-1.5 px-8 sm:px-12 lg:px-16 relative z-50">
      <div className="w-full max-w-none flex items-center justify-between">
        {/* Địa chỉ, thời gian và thời tiết (Ẩn trên thiết bị di động) */}
        <div className="hidden md:flex items-center gap-1.5 text-white/70">
          <MapPin size={12} className="text-brand-yellow shrink-0" />
          <span className="tracking-wide mr-1">{t("school_address")}</span>
          
          {timeString && (
            <span className="hidden lg:inline text-white/20 mx-1">|</span>
          )}
          {timeString && (
            <span className="hidden lg:flex items-center gap-1">
              <Clock size={11} className="text-brand-yellow shrink-0" />
              <span>{timeString}</span>
            </span>
          )}
          
          {weather && (
            <span className="hidden lg:inline text-white/20 mx-1">|</span>
          )}
          {weather && (
            <span className="hidden lg:flex items-center gap-1">
              <CloudSun size={12} className="text-brand-yellow shrink-0" />
              <span>Vinh: {weather.temp}°C ({weather.description})</span>
            </span>
          )}
        </div>

        {/* Liên kết xã hội, Tìm kiếm & Ngôn ngữ */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-end">
          {/* Mạng xã hội & Ngôn ngữ */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.facebook.com/truongkinhtetruongdaihocvinh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-brand-yellow transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={13} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-brand-yellow transition-colors duration-200"
              aria-label="Messenger"
            >
              <MessageSquare size={13} />
            </a>


            {/* Component chọn ngôn ngữ i18n Dropdown */}
            <Suspense fallback={<div className="w-24 h-6 bg-white/5 animate-pulse rounded-sm" />}>
              <LanguageSwitcher initialLanguages={initialLanguages} />
            </Suspense>
          </div>

          {/* Ô tìm kiếm */}
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/8 border border-white/10 text-white rounded-sm py-1 pl-3 pr-8 w-36 sm:w-44 focus:outline-none focus:ring-1 focus:ring-brand-yellow/60 focus:border-brand-yellow/30 text-[11px] transition-all duration-200 placeholder-white/40"
            />
            <button
              type="submit"
              className="absolute right-2 text-white/50 hover:text-brand-yellow transition-colors duration-200"
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
