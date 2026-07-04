import { SafeImage } from "@/shared/components/ui/safe-image";
import { Link } from "@/i18n/routing";
import { FolderOpen, CalendarDays, ArrowRight, Pin } from "lucide-react";
import { useTranslations } from "next-intl";

export interface ArticleItem {
  id: string | number;
  title: string;
  excerpt?: string;
  imageUrl: string;
  category: string;
  categoryHref: string;
  date: string;
  href: string;
  isPinned?: boolean;
}

const defaultArticles: ArticleItem[] = [
  {
    id: 1,
    title: "Trường Kỹ thuật và Công nghệ - Trường Đại học Vinh tổ chức thành công Hội nghị viên chức, người lao động năm 2025",
    excerpt: "Sáng ngày 29/12/2025, Trường Kỹ thuật và Công nghệ - Trường Đại học Vinh đã tổ chức thành công Hội nghị viên chức, người lao động năm 2025 nhằm tổng kết đánh giá hoạt động và đề ra phương hướng phát triển cho năm học tới.",
    imageUrl: "/Upload/images/SDH/v992.jpg",
    category: "Tin tức - Sự kiện",
    categoryHref: "/tin-tuc?category_slug=tin-tuc-va-su-kien",
    date: "29/12/2025",
    href: "/tin-tuc/hoi-nghi-vien-chuc-2025",
  },
  {
    id: 2,
    title: "Tri ân sự đồng hành và chúc mừng của Quý đơn vị, đối tác nhân dịp kỷ niệm 43 năm ngày Nhà giáo Việt Nam (20/11)",
    imageUrl: "/Upload/images/HCTH/b7.jpg",
    category: "Tin tức - Sự kiện",
    categoryHref: "/tin-tuc?category_slug=tin-tuc-va-su-kien",
    date: "22/11/2025",
    href: "/tin-tuc/tri-an-nha-giao-viet-nam",
  },
  {
    id: 3,
    title: "Trường Kỹ thuật và Công nghệ - Trường Đại học Vinh tổ chức Chương trình Tọa đàm Kỷ niệm 43 năm Ngày Nhà giáo Việt Nam (20/11/1982 - 20/11/2025)",
    imageUrl: "/Upload/images/HCTH/Chứng nhận KĐCL/a1.jpg",
    category: "Tin tức - Sự kiện",
    categoryHref: "/tin-tuc?category_slug=tin-tuc-va-su-kien",
    date: "22/11/2025",
    href: "/tin-tuc/toa-dam-ky-niem-20-11",
  },
];

export function NewsSection({ articles = defaultArticles, categorySlug }: { articles?: ArticleItem[]; categorySlug?: string }) {
  const t = useTranslations("common");
  const tArticle = useTranslations("article");

  return (
    <div className="space-y-8">
      {/* Tiêu đề Section */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 relative after:absolute after:bottom-[-17px] after:left-0 after:w-16 after:h-[2px] after:bg-brand-darkred">
          {tArticle("title")}
        </h2>
        <Link href={categorySlug ? `/tin-tuc?category_slug=${categorySlug}` as any : "/tin-tuc"} className="flex items-center gap-1 text-xs font-bold text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group">
          <span>{t("view_all")}</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* Grid 3 card đứng đều nhau, khoảng cách thoáng đạt, sang trọng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.slice(0, 3).map((article) => (
          <article
            key={article.id}
            className="flex flex-col bg-white rounded-none overflow-hidden border border-slate-100 hover:border-slate-200/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 group"
          >
            {/* Ảnh đại diện */}
            <Link href={article.href as any} className="block relative aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100">
              <SafeImage
                src={article.imageUrl}
                alt={article.title}
                fill
                sizes="(max-w-768px) 100vw, 350px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {article.isPinned && (
                <div className="absolute top-3 left-3 z-10 select-none">
                  <span className="bg-amber-500 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Pin size={8} className="fill-white" />
                    <span>Ghim</span>
                  </span>
                </div>
              )}
            </Link>

            {/* Nội dung card */}
            <div className="flex flex-col flex-1 p-5.5 space-y-3">
              <Link href={article.href as any}>
                <h3 className="text-[15px] font-bold text-slate-800 leading-snug group-hover:text-brand-darkred transition-colors duration-150 line-clamp-3">
                  {article.title}
                </h3>
              </Link>
              {article.excerpt && (
                <p className="text-[12.5px] text-slate-500 font-medium leading-relaxed line-clamp-2 mt-1">
                  {article.excerpt}
                </p>
              )}

              {/* Meta info */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-4 border-t border-slate-100 mt-auto font-medium">
                <Link href={article.categoryHref as any} className="flex items-center gap-1.5 text-[8.5px] font-bold text-brand-darkred bg-brand-darkred/5 px-2 py-0.5 uppercase tracking-wider truncate max-w-[130px]">
                  <FolderOpen size={11} className="text-brand-darkred/70" />
                  <span>{article.category}</span>
                </Link>
                <span className="flex items-center gap-1">
                  <CalendarDays size={11} />
                  <span>{article.date}</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
