"use client";
// src/features/about/components/AboutStats.tsx
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
import { STATS } from "../constants/about-data";

export function AboutStats() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));

  const animateCounters = useCallback(() => {
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);

      setCounts(STATS.map((stat) => Math.round(stat.value * eased)));

      if (step >= steps) {
        clearInterval(timer);
        setCounts(STATS.map((stat) => stat.value));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [hasAnimated, animateCounters]);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-20 bg-brand-blue text-white"
    >
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <div key={stat.id} className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto flex items-center justify-center bg-white/10 rounded-sm">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black tracking-tighter">
                {counts[i].toLocaleString()}{stat.suffix}
              </div>
              <p className="text-sm text-white/70 font-medium">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
