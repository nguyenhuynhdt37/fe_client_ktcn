import { Link } from "@/i18n/routing";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface RecruitmentItem {
  id: string;
  title: string;
  date: string;
  href: string;
}

export function RecruitmentWidget({ items = [], categorySlug = "tuyen-dung" }: { items: RecruitmentItem[]; categorySlug?: string }) {
  const t = useTranslations("common");

  if (items.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 relative after:absolute after:bottom-[-17px] after:left-0 after:w-16 after:h-[2px] after:bg-brand-darkred">
          {t("recruitment_title")}
        </h2>
        <Link
          href={`/tin-tuc?category_slug=${categorySlug}` as any}
          className="flex items-center gap-1 text-xs font-bold text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group"
        >
          <span>{t("view_all")}</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      <ul className="divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.id} className="py-3 group first:pt-0">
            <Link href={item.href as any} className="block space-y-1.5 py-1 rounded-sm hover:bg-slate-50/80 transition-colors duration-150">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-darkred transition-colors duration-200 leading-normal line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                <CalendarDays size={11} />
                <span>{item.date}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
