import { SafeImage } from "@/shared/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { FolderOpen, CalendarDays, ArrowRight, Pin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface ActivityItem {
  id: string | number;
  title: string;
  titleEn?: string;
  imageUrl: string;
  category: string;
  categoryEn?: string;
  categoryHref: string;
  date: string;
  href: string;
  isPinned?: boolean;
}

const defaultActivities: ActivityItem[] = [
  {
    id: 1,
    title: "Lời cảm ơn đến đơn vị tài trợ Công ty cổ phần Cảng quốc tế Việt - Lào",
    titleEn: "Acknowledgement to Viet - Lao International Port Joint Stock Company",
    imageUrl: "/Upload/images/ANH_CHUNG/cangvungang-202292711185.jpg",
    category: "Hoạt động sinh viên",
    categoryEn: "Student Activities",
    categoryHref: "/tin-tuc?category_slug=sinh-vien",
    date: "27/09/2022",
    href: "/tin-tuc/loi-cam-on-cang-viet-lao",
  },
  {
    id: 2,
    title:
      "Trường Kỹ thuật và Công nghệ, Trường Đại học Vinh ra mắt mạng lưới doanh nghiệp hợp tác đào tạo",
    titleEn:
      "College of Engineering and Technology, Vinh University Launches Cooperating Enterprise Network",
    imageUrl: "/Upload/images/ANH_CHUNG/hoptac4-20229271189.jpg",
    category: "Hoạt động sinh viên",
    categoryEn: "Student Activities",
    categoryHref: "/tin-tuc?category_slug=sinh-vien",
    date: "27/09/2022",
    href: "/tin-tuc/ra-mat-mang-luoi-doanh-nghiep",
  },
  {
    id: 3,
    title: "Bản lĩnh sinh viên tài chính ngân hàng 2022- Dấu ấn rực rỡ",
    titleEn: "Bravado of Finance and Banking Students 2022 - A Brilliant Mark",
    imageUrl: "/Upload/images/KHOA_TCNH/2022/sinh-vien-tc-nh-2022927105525.jpg",
    category: "Hoạt động sinh viên",
    categoryEn: "Student Activities",
    categoryHref: "/tin-tuc?category_slug=sinh-vien",
    date: "27/09/2022",
    href: "/tin-tuc/ban-linh-sinh-vien-tcnh-2022",
  },
  {
    id: 4,
    title: "Rèn nghề Tài chính – Ngân hàng Teambuilding \u201CTogether, we are stronger\u201D",
    titleEn: 'Teambuilding "Together, we are stronger" for Finance & Banking Students',
    imageUrl: "/Upload/images/ANH_CHUNG/sinh-vien-kinh-te-2022927105258.jpg",
    category: "Hoạt động sinh viên",
    categoryEn: "Student Activities",
    categoryHref: "/tin-tuc?category_slug=sinh-vien",
    date: "27/09/2022",
    href: "/tin-tuc/ren-nghe-teambuilding-2022",
  },
];

export function StudentActivities({
  activities = defaultActivities,
  categorySlug = "sinh-vien",
  hideHeader = false,
}: {
  activities?: ActivityItem[];
  categorySlug?: string;
  hideHeader?: boolean;
}) {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="border-y border-slate-200/50 bg-slate-50/60 py-12">
      <div className="mx-auto max-w-[1360px] space-y-6 px-6">
        {!hideHeader && (
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="after:bg-brand-darkred relative text-xl font-bold tracking-tight text-slate-800 after:absolute after:bottom-[-17px] after:left-0 after:h-[2px] after:w-16 sm:text-2xl">
              {t("student_activities_title")}
            </h2>
            <Link
              href={`/tin-tuc?category_slug=${categorySlug}` as any}
              className="text-brand-darkred hover:text-brand-darkred-dark group flex items-center gap-1 text-xs font-bold transition-colors duration-200"
            >
              <span>{t("view_all")}</span>
              <ArrowRight
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((item) => {
            const title = locale === "en" ? item.titleEn || item.title : item.title;
            const category = locale === "en" ? item.categoryEn || item.category : item.category;
            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-none border border-slate-100 bg-white transition-all duration-300 hover:border-slate-200 hover:shadow-md hover:shadow-slate-100/80"
              >
                <Link
                  href={item.href as any}
                  className="relative block aspect-[16/10] overflow-hidden border-b border-slate-100 bg-slate-50"
                >
                  <SafeImage
                    src={item.imageUrl}
                    alt={title}
                    fill
                    sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 280px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badge ghim */}
                  {item.isPinned && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="flex items-center gap-1 rounded-md bg-amber-600 px-2 py-1 text-xs font-semibold text-white">
                        <Pin size={8} className="fill-white" />
                        <span>Ghim</span>
                      </span>
                    </div>
                  )}
                </Link>
                <div className="flex flex-1 flex-col space-y-2 p-4.5">
                  <Link href={item.href as any}>
                    <h3 className="group-hover:text-brand-darkred line-clamp-3 text-sm leading-snug font-bold text-slate-800 transition-colors duration-200">
                      {title}
                    </h3>
                  </Link>
                  <div className="border-border-subtle mt-auto flex items-center justify-between border-t pt-3 text-xs font-medium text-slate-500">
                    <Link
                      href={item.categoryHref as any}
                      className="hover:text-brand-darkred flex max-w-[120px] items-center gap-1 truncate font-semibold text-slate-500 transition-colors duration-150"
                    >
                      <FolderOpen size={11} className="text-slate-400" />
                      <span>{category}</span>
                    </Link>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={11} />
                      <span>{item.date}</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
