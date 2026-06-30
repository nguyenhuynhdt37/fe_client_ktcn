"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe, ChevronDown, Check } from "lucide-react";

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

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

  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    const queryString = params.toString() ? `?${params.toString()}` : "";

    startTransition(() => {
      // scroll: false để giữ vị trí cuộn trang hiện tại của người dùng
      router.push(`${pathname}${queryString}`, { locale: nextLocale, scroll: false });
    });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        type="button"
        className="flex items-center gap-1.5 hover:text-brand-yellow transition font-medium text-slate-200 cursor-pointer bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-none border border-white/10 text-[11px]"
      >
        <span className="text-[12px]">{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
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
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
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
