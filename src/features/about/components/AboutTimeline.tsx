"use client";
// src/features/about/components/AboutTimeline.tsx
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ABOUT_TIMELINE } from "../constants/about-data";

export function AboutTimeline() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setVisibleItems((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    const items = sectionRef.current?.querySelectorAll("[data-id]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60">
      <div className="max-w-[1360px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 space-y-3 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-brand-darkred bg-brand-darkred/6 rounded-full">
            {t("timeline_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            {t("timeline_heading")}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("timeline_subtext")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Thanh dọc trung tâm */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-slate-200" />

          <div className="space-y-10 md:space-y-14">
            {ABOUT_TIMELINE.map((event, index) => {
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.has(event.id);

              return (
                <div
                  key={event.id}
                  data-id={event.id}
                  className={`
                    relative flex items-start gap-6
                    md:grid md:grid-cols-[1fr_40px_1fr] md:gap-8
                    transition-all duration-500 ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  `}
                >
                  {/* Content (trái trên desktop cho even, phải cho odd) */}
                  <div className={`
                    flex-1 pl-10 md:pl-0
                    ${isEven ? "md:text-right md:order-1" : "md:col-start-3 md:order-3"}
                  `}>
                    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
                      <span className="text-2xl font-black text-brand-darkred tracking-tighter">
                        {event.year}
                      </span>
                      <h3 className="text-base font-bold text-slate-800 mt-2 tracking-tight">
                        {t(event.title)}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {t(event.description)}
                      </p>
                    </div>
                  </div>

                  {/* Dot trung tâm */}
                  <div className="absolute left-4 md:static md:order-2 flex items-start justify-center pt-5">
                    <div className="w-8 h-8 rounded-full bg-brand-darkred text-white flex items-center justify-center z-10 border-4 border-white">
                      {event.icon}
                    </div>
                  </div>

                  {/* Spacer (bên còn lại) */}
                  <div className={`hidden md:block ${isEven ? "md:order-3" : "md:order-1"}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
