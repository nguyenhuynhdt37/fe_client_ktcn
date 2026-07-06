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
    title: "Trường Kỹ thuật và Công nghệ, Trường Đại học Vinh ra mắt mạng lưới doanh nghiệp hợp tác đào tạo",
    titleEn: "College of Engineering and Technology, Vinh University Launches Cooperating Enterprise Network",
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
    titleEn: "Teambuilding \"Together, we are stronger\" for Finance & Banking Students",
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
  hideHeader = false 
}: { 
  activities?: ActivityItem[]; 
  categorySlug?: string;
  hideHeader?: boolean;
}) {
  const t = useTranslations("common");
  const locale = useLocale();

  const gridContent = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {activities.map((item) => {
        const title = locale === "en" ? (item.titleEn || item.title) : item.title;
        const category = locale === "en" ? (item.categoryEn || item.category) : item.category;
        return (
          <article
            key={item.id}
            className="flex flex-col bg-white rounded-sm overflow-hidden border border-slate-100/60 hover:border-slate-100  transition-all duration-300 group"
          >
            <Link href={item.href as any} className="block relative aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100">
              <SafeImage
                src={item.imageUrl}
                alt={title}
                fill
                sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 280px"
                className="object-cover"
              />
              
              {/* Badge ghim */}
              {item.isPinned && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-amber-500 text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 rounded-sm">
                    <Pin size={8} className="fill-white" />
                    <span>Ghim</span>
                  </span>
                </div>
              )}
            </Link>
            <div className="flex flex-col flex-1 p-5 space-y-3">
              <Link href={item.href as any}>
                <h4 className="text-base font-bold text-slate-800 group-hover:text-brand-darkred transition-colors duration-200 leading-normal line-clamp-3">
                  {title}
                </h4>
              </Link>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 mt-auto font-medium">
                <Link href={item.categoryHref as any} className="flex items-center gap-1 text-slate-500 hover:text-brand-darkred transition-colors duration-150 font-semibold truncate max-w-[120px]">
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
  );

  if (hideHeader) {
    return gridContent;
  }

  return (
    <section className="py-12 bg-slate-50/60 border-y border-slate-100/50">
      <div className="max-w-[1360px] mx-auto px-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 relative after:absolute after:bottom-[-17px] after:left-0 after:w-16 after:h-[2px] after:bg-brand-darkred">
            {t("student_activities_title")}
          </h2>
          <Link 
            href={`/tin-tuc?category_slug=${categorySlug}` as any} 
            className="flex items-center gap-1.5 text-sm font-bold text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group"
          >
            <span>{t("view_all")}</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {gridContent}
      </div>
    </section>
  );
}
