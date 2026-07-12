// src/features/about/components/AboutPress.tsx
import { useTranslations } from "next-intl";
import { Newspaper, ExternalLink } from "lucide-react";
import { PRESS_ITEMS } from "../constants/about-data";

export function AboutPress() {
  const t = useTranslations("about");

  return (
    <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60">
      <div className="max-w-[1360px] mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-darkred bg-brand-darkred/6 rounded-full">
            Truyền thông
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t("press_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("press_subtext")}
          </p>
        </div>

        {/* List of Press Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRESS_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-6 border border-slate-200/80 rounded-xl bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300 ease-out group cursor-pointer"
            >
              <div className="space-y-4">
                {/* Icon & Source Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-brand-darkred/5 group-hover:text-brand-darkred rounded-xl transition-colors duration-300">
                    <Newspaper className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-100/60 group-hover:text-brand-darkred group-hover:bg-brand-darkred/5 group-hover:border-brand-darkred/10 transition-colors duration-300">
                    {item.publisher}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-700 leading-snug group-hover:text-brand-darkred transition-colors duration-300 line-clamp-3">
                  {t(item.titleKey)}
                </h3>
              </div>

              {/* Read More Link */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-brand-darkred transition-colors duration-300 pt-5">
                <span>Xem chi tiết</span>
                <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
