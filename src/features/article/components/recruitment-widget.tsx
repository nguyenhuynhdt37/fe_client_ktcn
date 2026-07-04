import { Link } from "@/i18n/routing";
import { CalendarDays, ArrowRight } from "lucide-react";
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
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-foreground relative after:absolute after:bottom-[-21px] after:left-0 after:w-14 after:h-[2px] after:bg-brand-darkred">
          {t("recruitment_title")}
        </h2>
        <Link 
          href={`/tin-tuc?category=tuyen-dung` as any} 
          className="flex items-center gap-1.5 text-[13px] font-medium text-brand-darkred hover:text-brand-darkred-dark transition-colors duration-200 group"
        >
          <span>{t("view_all")}</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      <ul className="divide-y divide-border/40">
        {items.map((item) => (
          <li key={item.id} className="py-4 group">
            <Link href={item.href as any} className="block space-y-2 px-1 -mx-1 py-1 rounded-md hover:bg-slate-50/80 transition-colors duration-150">
              <h4 className="text-sm font-semibold text-card-foreground group-hover:text-brand-darkred transition-colors duration-200 leading-snug line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
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
