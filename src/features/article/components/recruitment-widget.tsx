import { Link } from "@/i18n/routing";
import { CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";

interface RecruitmentItem {
  id: string;
  title: string;
  date: string;
  href: string;
}

export function RecruitmentWidget({ items = [] }: { items: RecruitmentItem[] }) {
  const t = useTranslations("common");

  if (items.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 relative after:absolute after:bottom-[-17px] after:left-0 after:w-12 after:h-[3px] after:bg-brand-darkred after:rounded-none">
          {t("recruitment_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category=tuyen-dung`} 
          className="text-sm font-semibold text-brand-darkred hover:text-brand-darkred-dark transition hover:underline"
        >
          {t("view_all")}
        </Link>
      </div>

      <ul className="divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.id} className="py-4 group">
            <Link href={item.href} className="block space-y-2">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-darkred transition leading-snug line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <CalendarDays size={12} />
                <span>{item.date}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
