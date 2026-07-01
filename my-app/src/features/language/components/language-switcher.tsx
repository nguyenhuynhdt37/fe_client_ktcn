"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { getLanguages } from "../api/get-languages";
import { Language } from "../types";

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const [apiLanguages, setApiLanguages] = useState<Language[]>([]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch danh sách ngôn ngữ động từ API
  useEffect(() => {
    let isMounted = true;
    getLanguages().then((langs) => {
      if (isMounted && langs && langs.length > 0) {
        setApiLanguages(langs);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Danh sách các locale FE Client đang thực sự hỗ trợ dịch
  const supportedLocales = ["vi", "en"];

  // Dữ liệu fallback tĩnh
  const staticLanguages: Language[] = [
    {
      id: "vi",
      code: "vi",
      name: "Vietnamese",
      native_name: "Tiếng Việt",
      flag_id: null,
      flag_url: null,
      is_default: true,
    },
    {
      id: "en",
      code: "en",
      name: "English",
      native_name: "English",
      flag_id: null,
      flag_url: null,
      is_default: false,
    },
  ];

  // Lọc lấy các ngôn ngữ từ API được FE hỗ trợ, nếu API trống thì dùng static
  const languages =
    apiLanguages.length > 0
      ? apiLanguages.filter((lang) => supportedLocales.includes(lang.code))
      : staticLanguages;

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }

    // 1. Cập nhật Cookie (để SSR đọc được) và localStorage
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("lang", nextLocale);

    const params = new URLSearchParams(searchParams.toString());
    const queryString = params.toString() ? `?${params.toString()}` : "";

    startTransition(() => {
      // scroll: false để giữ vị trí cuộn trang hiện tại của người dùng
      router.push(`${pathname}${queryString}`, { locale: nextLocale, scroll: false });
    });
    setIsOpen(false);
  };

  const renderFlag = (lang: Language) => {
    if (lang.flag_url) {
      return (
        <div className="relative w-5 h-3.5 overflow-hidden flex-shrink-0 border border-white/10">
          <Image
            src={lang.flag_url}
            alt={lang.native_name || lang.name}
            fill
            sizes="20px"
            className="object-cover"
          />
        </div>
      );
    }

    // Flag placeholder emoji
    const emojis: Record<string, string> = {
      vi: "🇻🇳",
      en: "🇬🇧",
    };
    return <span className="text-[12px] flex-shrink-0">{emojis[lang.code] || "🏳️"}</span>;
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        type="button"
        className="flex items-center gap-2 hover:text-brand-yellow transition font-medium text-slate-200 cursor-pointer bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-none border border-white/10 text-[11px]"
      >
        {renderFlag(currentLanguage)}
        <span>{currentLanguage.native_name}</span>
        <ChevronDown size={10} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-200 shadow-lg rounded-none z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {languages.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-semibold transition cursor-pointer ${
                  isSelected
                    ? "bg-brand-darkred/5 text-brand-darkred"
                    : "text-slate-700 hover:bg-slate-50 hover:text-brand-darkred"
                }`}
              >
                <div className="flex items-center gap-2">
                  {renderFlag(lang)}
                  <span>{lang.native_name}</span>
                </div>
                {isSelected && <Check size={12} className="text-brand-darkred" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
