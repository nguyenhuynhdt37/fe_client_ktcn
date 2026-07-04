"use client";

import { Calendar, Mail, BookOpen, Layers, UserCheck, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface ServiceItem {
  titleKey: string;
  href: string;
  icon: React.ReactNode;
}

const defaultServices: ServiceItem[] = [
  {
    titleKey: "weekly_schedule",
    href: "/lich-tuan",
    icon: <Calendar className="h-5 w-5 text-brand-blue" />,
  },
  {
    titleKey: "email",
    href: "https://outlook.office.com/",
    icon: <Mail className="h-5 w-5 text-brand-blue" />,
  },
  {
    titleKey: "elearning",
    href: "http://elearning.vinhuni.edu.vn/",
    icon: <BookOpen className="h-5 w-5 text-brand-blue" />,
  },
  {
    titleKey: "ioffice",
    href: "https://ioffice.vinhuni.edu.vn/",
    icon: <Layers className="h-5 w-5 text-brand-blue" />,
  },
  {
    titleKey: "staff_portal",
    href: "https://canbo.vinhuni.edu.vn/",
    icon: <UserCheck className="h-5 w-5 text-brand-blue" />,
  },
  {
    titleKey: "smart_uni",
    href: "http://usmart.vinhuni.edu.vn/",
    icon: <GraduationCap className="h-5 w-5 text-brand-blue" />,
  },
];

export function ServicesBar({ services = defaultServices }: { services?: ServiceItem[] }) {
  const t = useTranslations("services");

  return (
    <section className="py-10 bg-slate-50/80 border-y border-border/40">
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {services.map((service) => {
            const isExternal = service.href.startsWith("http");
            const title = t(service.titleKey);
            
            const cardClasses = "flex flex-col items-center justify-center p-5 bg-white rounded-lg border border-border/30 hover:border-brand-blue/15 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-250 group text-center";

            if (isExternal) {
              return (
                <a
                  key={service.titleKey}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClasses}
                >
                  <div className="p-3 bg-brand-blue/6 rounded-xl group-hover:bg-brand-blue/10 group-hover:scale-105 transition-all duration-250">
                    {service.icon}
                  </div>
                  <h4 className="mt-3 text-[13px] font-medium text-slate-600 group-hover:text-brand-blue transition-colors duration-200">
                    {title}
                  </h4>
                </a>
              );
            }

            return (
              <Link
                key={service.titleKey}
                href={service.href as any}
                className={cardClasses}
              >
                <div className="p-3 bg-brand-blue/6 rounded-xl group-hover:bg-brand-blue/10 group-hover:scale-105 transition-all duration-250">
                  {service.icon}
                </div>
                <h4 className="mt-3 text-[13px] font-medium text-slate-600 group-hover:text-brand-blue transition-colors duration-200">
                  {title}
                </h4>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
