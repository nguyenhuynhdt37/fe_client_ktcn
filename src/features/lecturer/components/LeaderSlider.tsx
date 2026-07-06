"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Mail, Globe, BookOpen } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SafeImage } from "@/shared/components/ui/safe-image";

interface LeaderItem {
  id: string | number;
  name: string;
  nameEn?: string;
  title?: string;
  titleEn?: string;
  role: string;
  roleEn?: string;
  bio?: string[];
  bioEn?: string[];
  biographyHtml?: string;
  imageUrl: string;
  email?: string;
  website?: string;
  googleScholar?: string;
}

const defaultLeaders: LeaderItem[] = [
  {
    id: 1,
    name: "Nguyễn Hoài Sơn",
    nameEn: "Nguyen Hoai Son",
    title: "PGS. TS.",
    titleEn: "Assoc. Prof. Dr.",
    role: "Hiệu trưởng Trường Kỹ thuật và Công nghệ · Đại học Vinh",
    roleEn: "Rector of School of Engineering and Technology · Vinh University",
    imageUrl: "/images/leaders/leader-son.png",
    email: "sonnh@vinhuni.edu.vn",
    website: "https://set.vinhuni.edu.vn",
    googleScholar: "https://scholar.google.com",
    bio: [
      "PGS. TS. Nguyễn Hoài Sơn tốt nghiệp Tiến sĩ chuyên ngành Cơ học kỹ thuật và Kỹ thuật công trình. Thầy có nhiều năm kinh nghiệm giảng dạy, nghiên cứu khoa học chuyên sâu và đảm nhận các chức vụ lãnh đạo quan trọng.",
      "Với cương vị Hiệu trưởng, thầy trực tiếp định hướng chiến lược xây dựng **Trường Kỹ thuật và Công nghệ** trở thành trung tâm đào tạo, nghiên cứu khoa học và chuyển giao công nghệ hàng đầu tại khu vực Bắc Trung Bộ và cả nước trong các lĩnh vực kỹ thuật, công nghệ thông tin, tự động hóa và xây dựng."
    ],
    bioEn: [
      "Assoc. Prof. Dr. Nguyen Hoai Son graduated with a PhD in Engineering Mechanics and Construction Engineering. He has many years of experience in high-level teaching, intensive scientific research, and holding key leadership positions.",
      "As the Rector, he directly steers the strategic development of the **School of Engineering and Technology** to become a leading center for education, scientific research, and technology transfer in the North Central region and nationwide in engineering, IT, automation, and construction."
    ]
  },
  {
    id: 2,
    name: "Lê Minh Giang",
    nameEn: "Le Minh Giang",
    title: "TS.",
    titleEn: "Dr.",
    role: "Phó Hiệu trưởng Trường Kỹ thuật và Công nghệ · Đại học Vinh",
    roleEn: "Vice Rector of School of Engineering and Technology · Vinh University",
    imageUrl: "/images/leaders/leader-giang.png",
    email: "gianglm@vinhuni.edu.vn",
    website: "https://set.vinhuni.edu.vn",
    googleScholar: "https://scholar.google.com",
    bio: [
      "TS. Lê Minh Giang nhận bằng Tiến sĩ chuyên ngành Kỹ thuật Điện từ đại học uy tín. Thầy có nhiều công trình nghiên cứu khoa học chất lượng được công bố trên các tạp chí quốc tế uy tín.",
      "Thầy phụ trách công tác đổi mới chương trình đào tạo, xây dựng chuẩn đầu ra đáp ứng thực tế nhu cầu của doanh nghiệp, đồng thời thúc đẩy các chương trình trao đổi giảng viên, sinh viên và nghiên cứu hợp tác quốc tế."
    ],
    bioEn: [
      "Dr. Le Minh Giang received his PhD in Electrical Engineering from a prestigious university. He has published numerous high-quality scientific research projects in reputable international journals.",
      "He is in charge of innovating curriculum designs, developing learning outcomes aligned with enterprise demands, and promoting international exchange programs for faculty, students, and collaborative research."
    ]
  }
];

export function LeaderSlider({ leaders = defaultLeaders }: { leaders?: LeaderItem[] }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
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
    <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60 overflow-hidden relative">
      
      <div className="max-w-[1360px] mx-auto px-6 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {leaders.map((leader) => {
              const name = locale === "en" ? (leader.nameEn || leader.name) : leader.name;
              const title = locale === "en" ? (leader.titleEn || leader.title) : leader.title;
              const role = locale === "en" ? (leader.roleEn || leader.role) : leader.role;
              const bioParagraphs = locale === "en" ? (leader.bioEn || leader.bio) : leader.bio;
              const badgeText = locale === "en" ? "SCHOOL LEADERSHIP" : "BAN GIÁM HIỆU TRƯỜNG";

              return (
                <div key={leader.id} className="flex-[0_0_100%] min-w-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    {/* Cột trái: Ảnh chân dung phẳng, chuyên nghiệp */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-[340px] aspect-[3/4] border border-slate-100/60 bg-white p-2 rounded-sm">
                        <div className="relative w-full h-full overflow-hidden bg-slate-100 rounded-sm">
                          <SafeImage
                            src={leader.imageUrl}
                            alt={name}
                            fill
                            sizes="(max-w-768px) 100vw, 340px"
                            className="object-cover"
                            priority={leader.id === 1}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Cột phải: Bio chi tiết */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      
                      {/* Badge phẳng tối giản */}
                      <span className="inline-block px-3 py-1 text-[11px] font-extrabold tracking-wider bg-brand-darkred/5 border border-brand-darkred/15 text-brand-darkred rounded-sm">
                        {badgeText}
                      </span>

                      {/* Tên & chức danh */}
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-800 leading-tight">
                          <span className="text-slate-400 font-medium mr-2">{title}</span>
                          {name}
                        </h3>
                        <p className="text-sm font-bold text-brand-darkred tracking-wide uppercase">
                          {role}
                        </p>
                      </div>

                      {/* Bio chi tiết */}
                      {leader.biographyHtml ? (
                        <div
                          className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal biography-html-content"
                          dangerouslySetInnerHTML={{ __html: leader.biographyHtml }}
                        />
                      ) : (
                        <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                          {bioParagraphs?.map((paragraph, index) => {
                            const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                            return (
                              <p key={index}>
                                {parts.map((part, partIdx) => {
                                  if (part.startsWith("**") && part.endsWith("**")) {
                                    return (
                                      <strong key={partIdx} className="font-bold text-slate-800">
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

                      {/* Nút liên hệ tối giản */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {leader.email && (
                          <a
                            href={`mailto:${leader.email}`}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-100/60 hover:border-brand-darkred/40 hover:bg-brand-darkred/5 hover:text-brand-darkred transition-colors duration-150 "
                          >
                            <Mail size={13} className="text-brand-darkred" />
                            <span>Email</span>
                          </a>
                        )}
                        {leader.website && (
                          <a
                            href={leader.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-100/60 hover:border-brand-darkred/40 hover:bg-brand-darkred/5 hover:text-brand-darkred transition-colors duration-150 "
                          >
                            <Globe size={13} className="text-brand-darkred" />
                            <span>Website</span>
                          </a>
                        )}
                        {leader.googleScholar && (
                          <a
                            href={leader.googleScholar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-100/60 hover:border-brand-darkred/40 hover:bg-brand-darkred/5 hover:text-brand-darkred transition-colors duration-150 "
                          >
                            <BookOpen size={13} className="text-brand-darkred" />
                            <span>Scholar</span>
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

        {/* Carousel controls tối giản */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100/85">
          {/* Thanh chấm chỉ số phẳng mỏng */}
          <div className="flex gap-2">
            {leaders.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-[3px] transition-all duration-300 ${
                  selectedIndex === index ? "w-8 bg-brand-darkred" : "w-3 bg-slate-200"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mũi tên điều khiển */}
          <div className="flex gap-2.5">
            <button
              onClick={scrollPrev}
              className="flex h-9 w-9 items-center justify-center border border-slate-100/60 bg-white text-slate-500 hover:text-brand-darkred hover:border-brand-darkred/40 transition-colors duration-150 cursor-pointer "
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={scrollNext}
              className="flex h-9 w-9 items-center justify-center border border-slate-100/60 bg-white text-slate-500 hover:text-brand-darkred hover:border-brand-darkred/40 transition-colors duration-150 cursor-pointer "
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
