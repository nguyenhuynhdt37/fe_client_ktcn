"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Bell, ArrowRight } from "lucide-react";
import { HeroSlider } from "./HeroSlider";
import { BannerResponse } from "../types/banner.types";
import { NoticeItem } from "@/features/notification";

interface HomeHeroWidgetProps {
  banners: BannerResponse[];
  notices: NoticeItem[];
  locale: string;
}

export function HomeHeroWidget({ banners, notices = [], locale }: HomeHeroWidgetProps) {
  const t = useTranslations("common");
  const isEn = locale === "en";

  // Lấy tối đa 5 thông báo mới nhất để hiển thị ở sidebar
  const activeNotices = notices.slice(0, 5);

  return (
    <section className="max-w-[1360px] mx-auto px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* CỘT TRÁI (8/12): Banner Slide giới thiệu */}
        <div className="lg:col-span-8 bg-white rounded-sm overflow-hidden border border-slate-100/60">
          <HeroSlider banners={banners} />
        </div>

        {/* CỘT PHẢI (4/12): Bảng Thông báo mới nhất */}
        <div className="lg:col-span-4 bg-white rounded-sm border border-slate-100/60 p-5">

          <div className="space-y-4">
            {/* Header của bảng thông báo */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5 text-slate-800">
                <Bell size={15} className="text-brand-darkred shrink-0" />
                <h3 className="text-xs font-bold tracking-wider uppercase">
                  {t("notices_title")}
                </h3>
              </div>

              <Link
                href={"/tin-tuc?category_slug=thong-bao" as any}
                className="flex items-center gap-1 text-[11px] font-bold text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-150"
              >
                <span>{t("view_all")}</span>
                <ArrowRight size={10} />
              </Link>
            </div>

            {/* Danh sách thông báo dạng bullet list tối giản */}
            {activeNotices.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs font-light">
                {isEn ? "No notifications available." : "Hiện chưa có thông báo nào mới."}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {activeNotices.map((notice) => {
                  const title = isEn ? (notice.titleEn || notice.title) : notice.title;

                  return (
                    <div
                      key={notice.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-start gap-2 group"
                    >
                      {/* Dấu chấm đầu dòng phẳng màu đỏ */}
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-darkred shrink-0 mt-2" />

                      {/* Tiêu đề & Ngày tháng */}
                      <div className="space-y-1 min-w-0">
                        <Link href={notice.href as any}>
                          <h4 className="text-sm font-bold text-slate-700 leading-normal hover:text-brand-darkred line-clamp-2 transition-colors duration-150">
                            {title}
                          </h4>
                        </Link>
                        <span className="block text-xs text-slate-400 font-medium">
                          {notice.date}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
