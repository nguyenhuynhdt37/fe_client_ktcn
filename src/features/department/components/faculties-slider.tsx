"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

interface FacultyItem {
  id: string | number;
  name: string;
  nameEn?: string;
  imageUrl: string;
  href: string;
}

const defaultFaculties: FacultyItem[] = [
  {
    id: 1,
    name: "Khoa Kinh tế",
    nameEn: "Faculty of Economics",
    imageUrl: "/images/faculties/khoa-kinh-te.jpg",
    href: "/co-cau-to-chuc/khoa-kinh-te",
  },
  {
    id: 2,
    name: "Khoa Kế toán",
    nameEn: "Faculty of Accounting",
    imageUrl: "/images/faculties/khoa-ke-toan.jpg",
    href: "/co-cau-to-chuc/khoa-ke-toan",
  },
  {
    id: 3,
    name: "Khoa Quản trị kinh doanh",
    nameEn: "Faculty of Business Administration",
    imageUrl: "/images/faculties/khoa-qtkd.jpg",
    href: "/co-cau-to-chuc/khoa-qtkd",
  },
  {
    id: 4,
    name: "Khoa Tài chính - Ngân hàng",
    nameEn: "Faculty of Finance and Banking",
    imageUrl: "/images/faculties/khoa-tcnh.jpg",
    href: "/co-cau-to-chuc/khoa-tcnh",
  },
];

export function FacultiesSlider({ faculties = defaultFaculties }: { faculties?: FacultyItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const locale = useLocale();

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  return (
    <section className="py-16 bg-slate-50/80 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-6 relative group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {faculties.map((faculty) => {
              const facultyName = locale === "en" ? (faculty.nameEn || faculty.name) : faculty.name;
              return (
                <div
                  key={faculty.id}
                  className="flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0"
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-border/30 hover:border-border/60 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-300">
                    <Link href={faculty.href as any} className="block relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={faculty.imageUrl}
                        alt={facultyName}
                        fill
                        sizes="(max-w-640px) 50vw, (max-w-1024px) 33vw, 250px"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nút Điều khiển slider */}
        <button
          onClick={scrollPrev}
          className="absolute -left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[var(--shadow-md)] border border-border/30 text-slate-500 hover:text-brand-darkred hover:shadow-[var(--shadow-lg)] transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
          aria-label="Previous faculty slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute -right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[var(--shadow-md)] border border-border/30 text-slate-500 hover:text-brand-darkred hover:shadow-[var(--shadow-lg)] transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
          aria-label="Next faculty slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
