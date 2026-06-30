import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FolderOpen, CalendarDays } from "lucide-react";
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
}

const defaultActivities: ActivityItem[] = [
  {
    id: 1,
    title: "Lời cảm ơn đến đơn vị tài trợ Công ty cổ phần Cảng quốc tế Việt - Lào",
    titleEn: "Acknowledgement to Viet - Lao International Port Joint Stock Company",
    imageUrl: "/Upload/images/ANH_CHUNG/cangvungang-202292711185.jpg",
    category: "Hoạt động sinh viên",
    categoryEn: "Student Activities",
    categoryHref: "/tin-tuc?category=sinh-vien",
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
    categoryHref: "/tin-tuc?category=sinh-vien",
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
    categoryHref: "/tin-tuc?category=sinh-vien",
    date: "27/09/2022",
    href: "/tin-tuc/ban-linh-sinh-vien-tcnh-2022",
  },
  {
    id: 4,
    title: "Rèn nghề Tài chính – Ngân hàng Teambuilding “Together, we are stronger”",
    titleEn: "Teambuilding \"Together, we are stronger\" for Finance & Banking Students",
    imageUrl: "/Upload/images/ANH_CHUNG/sinh-vien-kinh-te-2022927105258.jpg",
    category: "Hoạt động sinh viên",
    categoryEn: "Student Activities",
    categoryHref: "/tin-tuc?category=sinh-vien",
    date: "27/09/2022",
    href: "/tin-tuc/ren-nghe-teambuilding-2022",
  },
];

export function StudentActivities({ activities = defaultActivities }: { activities?: ActivityItem[] }) {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 relative after:absolute after:bottom-[-17px] after:left-0 after:w-12 after:h-[3px] after:bg-brand-darkred after:rounded-none">
            {t("student_activities_title")}
          </h2>
          <Link 
            href={`/tin-tuc?category=sinh-vien`} 
            className="text-sm font-semibold text-brand-darkred hover:text-brand-darkred-dark transition hover:underline"
          >
            {t("view_all")}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((item) => {
            const title = locale === "en" ? (item.titleEn || item.title) : item.title;
            const category = locale === "en" ? (item.categoryEn || item.category) : item.category;
            return (
              <article
                key={item.id}
                className="flex flex-col bg-white rounded-none overflow-hidden shadow-sm hover:shadow transition-all duration-200 group"
              >
                <Link href={item.href} className="block relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={title}
                    fill
                    sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 280px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-col flex-1 p-5 space-y-3">
                  <Link href={item.href}>
                    <h4 className="text-[18px] font-bold text-slate-800 leading-snug group-hover:text-brand-darkred transition line-clamp-3">
                      {title}
                    </h4>
                  </Link>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 mt-auto">
                    <Link href={item.categoryHref} className="flex items-center gap-1.5 hover:text-brand-darkred transition">
                      <FolderOpen size={13} />
                      <span>{category}</span>
                    </Link>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={13} />
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
