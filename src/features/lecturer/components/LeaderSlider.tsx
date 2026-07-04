"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Mail, Globe, BookOpen } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface LeaderItem {
  id: string | number;
  name: string;
  nameEn?: string;
  title?: string; // E.g., PGS. TS., TS.
  titleEn?: string;
  role: string;  // Role/Affiliation in Vietnamese
  roleEn?: string; // Role/Affiliation in English
  bio?: string[];  // Bio paragraphs in Vietnamese
  bioEn?: string[]; // Bio paragraphs in English
  biographyHtml?: string; // HTML biography from Backend
  imageUrl: string;
  email?: string;
  website?: string;
  googleScholar?: string;
}

const defaultLeaders: LeaderItem[] = [
  {
    id: 1,
    name: "Nguyễn Huy Bằng",
    nameEn: "Nguyen Huy Bang",
    title: "PGS. TS.",
    titleEn: "Assoc. Prof. Dr.",
    role: "Hiệu trưởng Trường Đại học Vinh · Chủ tịch Hội đồng KH&ĐT",
    roleEn: "Rector of Vinh University · Chairman of Science & Training Council",
    imageUrl: "/images/leaders/leader-bang.png",
    email: "nhbang@vinhuni.edu.vn",
    website: "https://vinhuni.edu.vn",
    googleScholar: "https://scholar.google.com",
    bio: [
      "PGS. TS. Nguyễn Huy Bằng tốt nghiệp Tiến sĩ chuyên ngành Vật lý kỹ thuật. Ông có nhiều năm giảng dạy, nghiên cứu và giữ các chức vụ quản lý quan trọng tại Trường Đại học Vinh.",
      "Với định hướng phát triển trường thành đại học thông minh, ông đặc biệt quan tâm tới việc xây dựng **Trường Kỹ thuật và Công nghệ** trở thành trụ cột đào tạo nguồn nhân lực chất lượng cao trong các lĩnh vực kỹ thuật, công nghệ thông tin, AI và tự động hóa cho khu vực miền Trung và cả nước."
    ],
    bioEn: [
      "Assoc. Prof. Dr. Nguyen Huy Bang graduated with a PhD in Engineering Physics. He has many years of teaching, researching and holding key management positions at Vinh University.",
      "With the orientation of developing the school into a smart university, he is particularly interested in building the **College of Engineering and Technology** as a pillar of high-quality training in engineering, IT, AI and automation."
    ]
  },
  {
    id: 2,
    name: "Lại Tuấn Dũng",
    nameEn: "Lai Tuan Dung",
    title: "TS.",
    titleEn: "Dr.",
    role: "Giảng viên thỉnh giảng Khoa CNTT & AI · Đại học Swinburne, Úc",
    roleEn: "Visiting Lecturer, Faculty of IT & AI · Swinburne University, Australia",
    imageUrl: "/images/leaders/leader-dung.png",
    email: "ltdung@swin.edu.au",
    website: "https://swinburne.edu.au",
    googleScholar: "https://scholar.google.com",
    bio: [
      "Hiện tại Dũng đang sống và làm việc tại Úc. Dũng từng là học sinh chuyên toán tại **THPT Hà Nội - Amsterdam**. Sau lớp 12, Dũng bắt đầu du học ngành Khoa học dữ liệu tại Đại học Swinburne, Australia.",
      "21 tuổi, Dũng nhận học bổng Tiến sĩ và nghiên cứu tại **Viện A2I2** (Applied Artificial Intelligence Institute), đồng thời giảng dạy tại 3 trường đại học Deakin, Monash và Swinburne. 26 tuổi, Dũng nhận bằng Tiến Sĩ và trở thành **giảng viên chính thức** Khoa CNTT và AI tại Đại học Swinburne."
    ],
    bioEn: [
      "Currently Dung is living and working in Australia. He was a mathematics major student at **Hanoi - Amsterdam High School**. After grade 12, Dung began studying Data Science at Swinburne University, Australia.",
      "At 21, Dung received a PhD scholarship and researched at the **A2I2 Institute** (Applied Artificial Intelligence Institute), while teaching at Deakin, Monash, and Swinburne Universities. At 26, he completed his PhD and became an **official lecturer** in IT & AI at Swinburne."
    ]
  }
];

export function LeaderSlider({ leaders = defaultLeaders }: { leaders?: LeaderItem[] }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 bg-slate-50/50 text-slate-800 overflow-hidden relative border-y border-slate-200/60">
      {/* Subtle ambient light accents (soft brand-darkred & brand-blue glows) */}
      <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[50%] rounded-none bg-brand-darkred/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[50%] rounded-none bg-brand-blue/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {leaders.map((leader) => {
              const name = locale === "en" ? (leader.nameEn || leader.name) : leader.name;
              const title = locale === "en" ? (leader.titleEn || leader.title) : leader.title;
              const role = locale === "en" ? (leader.roleEn || leader.role) : leader.role;
              const bioParagraphs = locale === "en" ? (leader.bioEn || leader.bio) : leader.bio;
              const badgeText = locale === "en" ? "INTRODUCTION" : "GIỚI THIỆU LÃNH ĐẠO";

              return (
                <div key={leader.id} className="flex-[0_0_100%] min-w-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    
                    {/* Left side: Photo with rounded-none frame */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-none overflow-hidden border border-slate-200/80 bg-white p-2 shadow-[0_15px_40px_rgba(0,0,0,0.04)] group/photo">
                        <div className="relative w-full h-full overflow-hidden bg-slate-50">
                          <Image
                            src={leader.imageUrl}
                            alt={name}
                            fill
                            sizes="(max-w-768px) 100vw, 400px"
                            className="object-cover transition-transform duration-700 ease-out group-hover/photo:scale-105"
                            priority={leader.id === 1}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right side: Detailed Bio & Info */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      {/* Badge (rounded-none, brand color border) */}
                      <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-wider rounded-none bg-brand-darkred/5 border border-brand-darkred/20 text-brand-darkred uppercase">
                        {badgeText}
                      </span>

                      {/* Name & Academic Titles */}
                      <div className="space-y-1.5">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
                          <span className="text-slate-400 font-medium mr-3">{title}</span>
                          {name}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-brand-darkred tracking-wide">
                          {role}
                        </p>
                      </div>

                      {/* Bio Details */}
                      {leader.biographyHtml ? (
                        <div 
                          className="space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal biography-html-content"
                          dangerouslySetInnerHTML={{ __html: leader.biographyHtml }}
                        />
                      ) : (
                        <div className="space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                          {bioParagraphs?.map((paragraph, index) => {
                            const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                            return (
                              <p key={index}>
                                {parts.map((part, partIdx) => {
                                  if (part.startsWith("**") && part.endsWith("**")) {
                                    return (
                                      <strong key={partIdx} className="font-bold text-slate-900">
                                        {part.slice(2, -2)}
                                      </strong>
                                    );
                                  }
                                  return part;
                                })}
                              </p>
                            );
                          })}
                        </div>
                      )}

                      {/* Social/Contact Buttons (rounded-none, hover brand color) */}
                      <div className="flex flex-wrap gap-3.5 pt-4">
                        {leader.email && (
                          <a
                            href={`mailto:${leader.email}`}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-brand-darkred/40 hover:bg-brand-darkred/5 hover:text-brand-darkred transition-all duration-200 rounded-none shadow-xs"
                          >
                            <Mail size={14} className="text-brand-blue" />
                            <span>Email</span>
                          </a>
                        )}
                        {leader.website && (
                          <a
                            href={leader.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-brand-darkred/40 hover:bg-brand-darkred/5 hover:text-brand-darkred transition-all duration-200 rounded-none shadow-xs"
                          >
                            <Globe size={14} className="text-brand-blue" />
                            <span>Website</span>
                          </a>
                        )}
                        {leader.googleScholar && (
                          <a
                            href={leader.googleScholar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-brand-darkred/40 hover:bg-brand-darkred/5 hover:text-brand-darkred transition-all duration-200 rounded-none shadow-xs"
                          >
                            <BookOpen size={14} className="text-brand-blue" />
                            <span>Google Scholar</span>
                          </a>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between mt-8 lg:mt-12 pt-6 border-t border-slate-200">
          {/* Bullet indicators (rounded-none rectangles) */}
          <div className="flex gap-2">
            {leaders.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-1 transition-all duration-300 rounded-none ${
                  selectedIndex === index ? "w-8 bg-brand-darkred" : "w-3 bg-slate-200"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows (rounded-none, brand color hover) */}
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-none border border-slate-200 bg-white text-slate-500 hover:text-brand-darkred hover:border-brand-darkred/40 transition-all duration-200 cursor-pointer shadow-xs"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-none border border-slate-200 bg-white text-slate-500 hover:text-brand-darkred hover:border-brand-darkred/40 transition-all duration-200 cursor-pointer shadow-xs"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
