import Image from "next/image";
import Link from "next/link";
import { FolderOpen, CalendarDays } from "lucide-react";

export interface ArticleItem {
  id: string | number;
  title: string;
  imageUrl: string;
  category: string;
  categoryHref: string;
  date: string;
  href: string;
}

const defaultArticles: ArticleItem[] = [
  {
    id: 1,
    title: "Trường Kỹ thuật và Công nghệ - Trường Đại học Vinh tổ chức thành công Hội nghị viên chức, người lao động năm 2025",
    imageUrl: "/Upload/images/SDH/v992.jpg",
    category: "Tin tức - Sự kiện",
    categoryHref: "/tin-tuc-su-kien",
    date: "29/12/2025",
    href: "/tin-tuc/hoi-nghi-vien-chuc-2025",
  },
  {
    id: 2,
    title: "Tri ân sự đồng hành và chúc mừng của Quý đơn vị, đối tác nhân dịp kỷ niệm 43 năm ngày Nhà giáo Việt Nam (20/11)",
    imageUrl: "/Upload/images/HCTH/b7.jpg",
    category: "Tin tức - Sự kiện",
    categoryHref: "/tin-tuc-su-kien",
    date: "22/11/2025",
    href: "/tin-tuc/tri-an-nha-giao-viet-nam",
  },
  {
    id: 3,
    title: "Trường Kỹ thuật và Công nghệ - Trường Đại học Vinh tổ chức Chương trình Tọa đàm Kỷ niệm 43 năm Ngày Nhà giáo Việt Nam (20/11/1982 - 20/11/2025)",
    imageUrl: "/Upload/images/HCTH/Chứng nhận KĐCL/a1.jpg",
    category: "Tin tức - Sự kiện",
    categoryHref: "/tin-tuc-su-kien",
    date: "22/11/2025",
    href: "/tin-tuc/toa-dam-ky-niem-20-11",
  },
];

export function NewsSection({ articles = defaultArticles }: { articles?: ArticleItem[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 relative after:absolute after:bottom-[-17px] after:left-0 after:w-12 after:h-[3px] after:bg-brand-darkred after:rounded-none">
          Tin tức - Sự kiện
        </h2>
        <Link href="/tin-tuc" className="text-sm font-semibold text-brand-darkred hover:text-brand-darkred-dark transition hover:underline">
          Xem tất cả &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="flex flex-col bg-white rounded-none overflow-hidden shadow-sm hover:shadow transition-all duration-200 group"
          >
            {/* Ảnh bài viết */}
            <Link href={article.href} className="block relative aspect-[16/10] overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                sizes="(max-w-768px) 100vw, 350px"
                className="object-cover"
              />
            </Link>

            {/* Nội dung bài viết */}
            <div className="flex flex-col flex-1 p-6 space-y-4">
              <Link href={article.href}>
                <h3 className="text-[18px] font-bold text-slate-800 leading-snug group-hover:text-brand-darkred transition line-clamp-3">
                  {article.title}
                </h3>
              </Link>

              {/* Thông tin phụ (Danh mục & Thời gian) */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 mt-auto">
                <Link href={article.categoryHref} className="flex items-center gap-1.5 hover:text-brand-darkred transition">
                  <FolderOpen size={13} />
                  <span>{article.category}</span>
                </Link>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} />
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
