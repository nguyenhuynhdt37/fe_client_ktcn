import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const locale = useLocale();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";

  // Xây dựng Schema.org BreadcrumbList JSON-LD
  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href ? `${siteUrl}/${locale}${item.href === "/" ? "" : item.href}` : `${siteUrl}/${locale}`
    }))
  };

  return (
    <>
      {/* Nhúng structured data cho Google Bot */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />

      {/* Breadcrumb UI */}
      <nav 
        aria-label="Breadcrumb"
        suppressHydrationWarning
        className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500 bg-white px-5 py-3 border border-slate-100 shadow-sm rounded-none"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} suppressHydrationWarning className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight size={14} className="text-slate-300 shrink-0" />}
              
              {isLast || !item.href ? (
                <span className="font-semibold text-brand-darkred truncate max-w-[200px] sm:max-w-[400px]">
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.href as any}
                  className="hover:text-brand-darkred transition-colors duration-150 font-medium"
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
