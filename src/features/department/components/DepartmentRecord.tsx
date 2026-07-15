"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Users, 
  GraduationCap, 
  Building2, 
  Compass, 
  Target, 
  Clock3, 
  BookOpen, 
  Newspaper, 
  Images, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Info
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { ArticleCard } from "@/features/article";
import type { PortalDepartment, PortalProgram, PortalGallery, DepartmentOverview } from "../types/department.types";

interface DepartmentRecordProps {
  overview: DepartmentOverview;
  locale: string;
}

export function DepartmentRecord({ overview, locale }: DepartmentRecordProps) {
  const {
    department,
    staffs = [],
    stats,
    programs = [],
    latest_articles: latestArticles = [],
    galleries = [],
  } = overview;

  const isEn = locale === "en";

  // Lightbox State for Gallery
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null);

  const activeGallery = galleries.find((g) => g.id === activeGalleryId);
  const activePhotos = activeGallery ? activeGallery.items || [] : [];
  const currentPhoto = activePhotoIndex !== null ? activePhotos[activePhotoIndex] : null;

  const closeLightbox = useCallback(() => {
    setActivePhotoIndex(null);
    setActiveGalleryId(null);
  }, []);

  const showPrev = useCallback(() => {
    if (activePhotoIndex === null || activePhotos.length === 0) return;
    setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : activePhotos.length - 1));
  }, [activePhotoIndex, activePhotos.length]);

  const showNext = useCallback(() => {
    if (activePhotoIndex === null || activePhotos.length === 0) return;
    setActivePhotoIndex((prev) => (prev !== null && prev < activePhotos.length - 1 ? prev + 1 : 0));
  }, [activePhotoIndex, activePhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, closeLightbox, showPrev, showNext]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePhotoIndex]);

  const bannerImage =
    department.banner_object_key ||
    department.thumbnail_object_key ||
    "/images/about/set-overview.jpg";

  // Contact items helper
  const contactItems = useMemo(() => {
    return [
      department.office
        ? { icon: MapPin, label: isEn ? "Office" : "Văn phòng", value: department.office }
        : null,
      department.phone
        ? { icon: Phone, label: isEn ? "Phone" : "Điện thoại", value: department.phone }
        : null,
      department.email
        ? { icon: Mail, label: "Email", value: department.email }
        : null,
    ].filter(Boolean) as Array<{ icon: typeof MapPin; label: string; value: string }>;
  }, [department, isEn]);

  // Stats items helper
  const statItems = useMemo(() => {
    if (!stats) return [];
    return [
      { value: stats.staff_count, label: isEn ? "Published profiles" : "Hồ sơ công khai", icon: Users },
      { value: stats.doctorate_count, label: isEn ? "Doctorates" : "Tiến sĩ", icon: GraduationCap },
      { value: stats.associate_professor_count, label: isEn ? "Associate professors" : "Phó giáo sư", icon: Building2 },
    ];
  }, [stats, isEn]);

  return (
    <div className="min-h-screen bg-[#f3f5f6] pb-20">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1040px] flex-wrap items-center gap-2 px-4 py-5 text-xs font-medium text-slate-500 sm:px-8">
          <Link href="/nganh-dao-tao" className="hover:text-brand-darkred">
            {isEn ? "Faculties & Programs" : "Các khoa đào tạo"}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700">{department.name}</span>
        </div>
      </div>

      {/* 2. Main Profile Content Container */}
      <article className="mx-auto max-w-[1040px] bg-white px-4 py-8 shadow-sm sm:px-10 sm:py-12 lg:px-14 mt-6 rounded-md">
        
        {/* Header Section */}
        <header className="border-b-2 border-slate-900 pb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
            <span className="text-brand-blue font-mono font-bold">
              {department.code || (isEn ? "Academic Unit" : "Đơn vị học thuật")}
            </span>
            <span className="text-slate-300">/</span>
            <span>
              {department.unit_type === "faculty"
                ? isEn ? "Faculty" : "Khoa"
                : department.unit_type === "department"
                ? isEn ? "Department" : "Bộ môn"
                : isEn ? "Academic Unit" : "Đơn vị đào tạo"}
            </span>
          </div>
          <h1 className="max-w-4xl text-2xl leading-tight font-extrabold text-slate-950 sm:text-3xl">
            {department.name}
          </h1>
          {department.short_description && (
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {department.short_description}
            </p>
          )}
        </header>

        {/* Decorative Banner Image */}
        {bannerImage && (
          <div className="relative mt-6 aspect-[21/9] w-full overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <SafeImage
              src={bannerImage}
              alt={department.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1040px) 100vw, 1040px"
            />
          </div>
        )}

        {/* Section 1: Overview & Stats */}
        {department.description && (
          <section id="overview" className="border-b border-slate-200 py-8 scroll-mt-24">
            <p className="text-brand-blue text-xs font-bold uppercase">
              {isEn ? "Unit Overview" : "Tổng quan đơn vị"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">
              {isEn ? "Introduction" : "Giới thiệu chung"}
            </h2>
            <div 
              className="mt-4 text-[15px] leading-7 text-slate-700 rich-text-content max-w-none prose prose-slate"
              dangerouslySetInnerHTML={{ __html: department.description }}
            />

            {/* In-container Stats Panel */}
            {stats && statItems.length > 0 && (
              <div className="grid grid-cols-1 divide-y divide-slate-100 rounded-xl border border-slate-200/60 bg-slate-50/50 p-4 md:grid-cols-3 md:divide-y-0 md:divide-x md:divide-slate-200/60 items-center mt-8">
                {statItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-4 py-3 md:py-1 px-4">
                    <div className="p-2 bg-brand-darkred/5 rounded-lg text-brand-darkred shrink-0">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-slate-800 leading-none">
                        {item.value}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-500">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Section 2: Mission & Vision */}
        {(department.mission || department.vision) && (
          <section id="vision" className="border-b border-slate-200 py-8 scroll-mt-24">
            <p className="text-brand-darkred text-xs font-bold uppercase">
              {isEn ? "Strategy & Direction" : "Chiến lược & Định hướng"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950 mb-6">
              {isEn ? "Mission & Vision" : "Sứ mạng & Tầm nhìn"}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Mission Card */}
              {department.mission && (
                <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
                    <div className="p-2 bg-brand-darkred/5 rounded-lg text-brand-darkred">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider">
                      {isEn ? "Mission" : "Sứ mạng"}
                    </h3>
                  </div>
                  <div 
                    className="text-xs sm:text-sm leading-relaxed text-slate-600 rich-text-content"
                    dangerouslySetInnerHTML={{ __html: department.mission }}
                  />
                </div>
              )}

              {/* Vision Card */}
              {department.vision && (
                <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-200/60 pb-3">
                    <div className="p-2 bg-brand-blue/5 rounded-lg text-brand-blue">
                      <Compass className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider">
                      {isEn ? "Vision" : "Tầm nhìn"}
                    </h3>
                  </div>
                  <div 
                    className="text-xs sm:text-sm leading-relaxed text-slate-600 rich-text-content"
                    dangerouslySetInnerHTML={{ __html: department.vision }}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 3: Study Programs */}
        {programs.length > 0 && (
          <section id="programs" className="border-b border-slate-200 py-8 scroll-mt-24">
            <p className="text-brand-blue text-xs font-bold uppercase">
              {isEn ? "Educational Pathways" : "Lộ trình học tập"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-950 mb-6">
              {isEn ? "Academic Programs" : "Chương trình đào tạo"}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {programs.map((program) => (
                <article
                  key={program.id}
                  className="group hover:border-brand-darkred relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/20 p-5 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md sm:p-6"
                >
                  <div className="absolute top-0 right-0 left-0 h-1 bg-slate-200 group-hover:bg-brand-darkred transition-colors duration-300" />
                  <div className="space-y-3">
                    <div className="text-brand-blue flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
                      {program.code && (
                        <span className="border-brand-blue/20 rounded-md border bg-white px-2 py-0.5 font-mono">
                          {program.code}
                        </span>
                      )}
                      <span className="bg-brand-blue/5 rounded-md px-2.5 py-0.5">
                        {program.degree_level === "bachelor"
                          ? isEn ? "Bachelor" : "Đại học"
                          : program.degree_level === "master"
                          ? isEn ? "Master's" : "Thạc sĩ"
                          : program.degree_level}
                      </span>
                    </div>
                    <h3 className="group-hover:text-brand-darkred text-base sm:text-lg leading-snug font-bold text-slate-900 transition-colors duration-150">
                      {program.name}
                    </h3>
                    {program.short_description && (
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {program.short_description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100/80 pt-3 text-xs font-semibold text-slate-500">
                    {program.duration_years && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5 text-slate-400" />
                        {program.duration_years} {isEn ? "years" : "năm"}
                      </span>
                    )}
                    {program.training_mode && (
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                        {program.training_mode}
                      </span>
                    )}
                    <Link
                      href={{
                        pathname: "/dao-tao/dai-hoc/[slug]",
                        params: { slug: program.slug },
                      }}
                      className="text-brand-darkred ml-auto inline-flex items-center font-bold hover:underline"
                    >
                      {isEn ? "View details" : "Xem chi tiết"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Faculty & Staff */}
        <section id="staff" className="border-b border-slate-200 py-8 scroll-mt-24">
          <p className="text-brand-darkred text-xs font-bold uppercase">
            {isEn ? "Experts & Academics" : "Đội ngũ chuyên gia"}
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-950">
            {isEn ? "Faculty Members" : "Đội ngũ cán bộ, giảng viên"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 mb-6 leading-relaxed">
            {isEn
              ? "Profiles are verified after internal records verification."
              : "Hồ sơ giảng viên được chuẩn hóa và hiển thị công khai sau khi đơn vị hoàn tất xác minh."}
          </p>

          {staffs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/30 px-6 py-10 text-center max-w-md mx-auto shadow-sm">
              <Users className="mx-auto h-10 w-10 text-brand-blue/80" aria-hidden="true" />
              <h3 className="mt-4 text-sm sm:text-base font-bold text-slate-900">
                {isEn ? "Profiles are being updated" : "Hồ sơ đang được rà soát"}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">
                {isEn
                  ? "Staff profiles will appear here after verification completes."
                  : "Danh sách chính thức sẽ hiển thị tại đây sau khi đơn vị hoàn tất kiểm tra thông tin."}
              </p>
            </div>
          ) : (
            <div className="relative overflow-hidden py-2 rounded-2xl bg-white border border-slate-100 shadow-inner">
              {/* Gradient border indicators in white color scheme */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div
                className="flex w-max gap-4 animate-marquee-left hover:[animation-play-state:paused]"
                style={{ animationDuration: `${Math.max(20, staffs.length * 6)}s` }}
              >
                {(staffs.length < 5 ? [...staffs, ...staffs, ...staffs, ...staffs] : [...staffs, ...staffs]).map((staff, i) => {
                  const credentials = [staff.academic_title, staff.degree].filter(Boolean).join(". ");
                  return (
                    <div key={`${staff.id}-${i}`} className="w-[160px] sm:w-[190px] shrink-0">
                      <Link
                        href={{ pathname: "/nhan-su/[slug]", params: { slug: staff.slug } } as any}
                        className="group flex flex-col justify-between border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-full"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                          <SafeImage
                            src={staff.avatar_object_key || "/images/no-image-dhv.jpg"}
                            alt={staff.full_name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 160px, 190px"
                          />
                        </div>
                        <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                          <div className="space-y-1 text-center">
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-darkred transition-colors duration-150 leading-snug line-clamp-1">
                              {staff.full_name}
                            </h3>
                            {credentials && (
                              <p className="text-[10px] sm:text-xs font-bold text-brand-blue line-clamp-1 mt-0.5">
                                {credentials}
                              </p>
                            )}
                            {staff.position_name && (
                              <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider line-clamp-1 mt-1">
                                {staff.position_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Section 5: News & Articles */}
        {latestArticles.length > 0 && (
          <section id="news" className="border-b border-slate-200 py-8 scroll-mt-24">
            <p className="text-brand-blue text-xs font-bold uppercase">
              {isEn ? "Recent publications" : "Cập nhật mới nhất"}
            </p>
            <div className="flex items-center gap-3 mb-6 mt-1">
              <Newspaper className="h-5 w-5 text-brand-darkred" />
              <h2 className="text-xl font-bold text-slate-950">
                {isEn ? "Latest News & Events" : "Tin bài mới nhất"}
              </h2>
            </div>
            <div className="grid gap-6">
              {latestArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} priority={index === 0} />
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Photo Gallery */}
        {galleries.length > 0 && (
          <section id="gallery" className="border-b border-slate-200 py-8 scroll-mt-24">
            <p className="text-brand-darkred text-xs font-bold uppercase">
              {isEn ? "Khoảnh khắc nổi bật" : "Khoảnh khắc nổi bật"}
            </p>
            <div className="flex items-center gap-3 mb-6 mt-1">
              <Images className="h-5 w-5 text-brand-blue" />
              <h2 className="text-xl font-bold text-slate-950">
                {isEn ? "Photo Gallery" : "Hình ảnh hoạt động"}
              </h2>
            </div>

            <div className="space-y-8">
              {galleries.map((gallery) => {
                const photos = gallery.items || [];
                if (photos.length === 0) return null;
                const duplicatedPhotos = photos.length < 5
                  ? [...photos, ...photos, ...photos, ...photos]
                  : [...photos, ...photos];

                return (
                  <div key={gallery.id} className="space-y-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-800">
                        {gallery.title}
                      </h3>
                      {gallery.description && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          {gallery.description}
                        </p>
                      )}
                    </div>

                    <div className="relative overflow-hidden py-1 rounded-xl bg-white border border-slate-100">
                      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                      <div
                        className="flex w-max gap-3 animate-marquee-left hover:[animation-play-state:paused]"
                        style={{ animationDuration: `${Math.max(15, photos.length * 5)}s` }}
                      >
                        {duplicatedPhotos.map((item, i) => {
                          const originalIndex = i % photos.length;
                          return (
                            <figure
                              key={`${item.id}-${i}`}
                              onClick={() => {
                                setActiveGalleryId(gallery.id);
                                setActivePhotoIndex(originalIndex);
                              }}
                              className="relative overflow-hidden rounded-xl bg-white border border-slate-200 w-[200px] sm:w-[260px] aspect-[4/3] shrink-0 cursor-pointer group/img"
                            >
                              <SafeImage
                                src={item.object_key || item.thumbnail_key || "/images/no-image-dhv.jpg"}
                                alt={item.alt_text || item.caption || gallery.title}
                                fill
                                sizes="(max-width: 640px) 200px, 260px"
                                className="object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
                              />
                              {item.caption && (
                                <figcaption className="absolute inset-x-0 bottom-0 bg-slate-900/80 backdrop-blur-sm px-3 py-2 text-[10px] sm:text-xs text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none line-clamp-2">
                                  {item.caption}
                                </figcaption>
                              )}
                            </figure>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 7: Contact Info */}
        {(contactItems.length > 0 || department.website) && (
          <section id="contact" className="py-8 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950 pb-2 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-brand-darkred">
              {isEn ? "Contact Information" : "Thông tin liên hệ"}
            </h2>

            {contactItems.length > 0 && (
              <div className="grid gap-4 border-y border-slate-100 py-6 md:grid-cols-3 mt-4">
                {contactItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200 border border-transparent hover:border-slate-100"
                  >
                    <div className="p-2 bg-brand-darkred/5 rounded-lg text-brand-darkred shrink-0">
                      <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="mt-0.5 text-xs sm:text-sm font-semibold text-slate-800 break-all leading-normal">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {department.website && (
              <div className="pt-4 flex">
                <a
                  href={department.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand-darkred hover:bg-brand-darkred-dark px-5 text-xs sm:text-sm font-bold text-white transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span>{isEn ? "Visit Unit Website" : "Truy cập website đơn vị"}</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </section>
        )}
      </article>

      {/* 3. Full-Screen Lightbox Modal for Gallery Album */}
      {activePhotoIndex !== null && currentPhoto && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/98 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all duration-200 z-[10000] cursor-pointer"
            aria-label={isEn ? "Close viewer" : "Đóng hộp xem ảnh"}
          >
            <X size={24} />
          </button>

          {activePhotos.length > 1 && (
            <button
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all duration-200 z-[10000] cursor-pointer bg-slate-900/30"
              aria-label={isEn ? "Previous image" : "Ảnh trước"}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPhoto.object_key || currentPhoto.thumbnail_key || "/images/no-image-dhv.jpg"}
              alt={currentPhoto.alt_text || currentPhoto.caption || (activeGallery?.title || "")}
              className="max-h-[70vh] max-w-full object-contain rounded-xl border border-white/10 shadow-2xl transition-transform duration-300"
            />
          </div>

          {activePhotos.length > 1 && (
            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all duration-200 z-[10000] cursor-pointer bg-slate-900/30"
              aria-label={isEn ? "Next image" : "Ảnh tiếp theo"}
            >
              <ChevronRight size={32} />
            </button>
          )}

          <div className="absolute bottom-6 left-0 right-0 text-center space-y-1.5 px-6">
            <div className="text-xs text-white/40 font-mono font-bold tracking-widest uppercase">
              {activePhotoIndex + 1} / {activePhotos.length}
            </div>
            {currentPhoto.caption && (
              <p className="text-sm sm:text-base text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md line-clamp-2">
                {currentPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
