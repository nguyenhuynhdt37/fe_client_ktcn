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
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href
        ? `${siteUrl}/${locale}${item.href === "/" ? "" : item.href}`
        : `${siteUrl}/${locale}`,
    })),
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
        className="border-border flex min-h-12 flex-wrap items-center gap-2 rounded-lg border bg-white px-4 py-3 text-sm text-slate-600"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} suppressHydrationWarning className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight size={15} className="shrink-0 text-slate-400" aria-hidden="true" />
              )}

              {isLast || !item.href ? (
                <span className="text-brand-darkred max-w-[220px] truncate font-semibold sm:max-w-[440px]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href as any}
                  className="hover:text-brand-darkred rounded-sm font-medium transition-colors duration-150"
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
