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
    icon: <Calendar className="h-6 w-6 text-brand-blue" />,
  },
  {
    titleKey: "email",
    href: "https://outlook.office.com/",
    icon: <Mail className="h-6 w-6 text-brand-blue" />,
  },
  {
    titleKey: "elearning",
    href: "http://elearning.vinhuni.edu.vn/",
    icon: <BookOpen className="h-6 w-6 text-brand-blue" />,
  },
  {
    titleKey: "ioffice",
    href: "https://ioffice.vinhuni.edu.vn/",
    icon: <Layers className="h-6 w-6 text-brand-blue" />,
  },
  {
    titleKey: "staff_portal",
    href: "https://canbo.vinhuni.edu.vn/",
    icon: <UserCheck className="h-6 w-6 text-brand-blue" />,
  },
  {
    titleKey: "smart_uni",
    href: "http://usmart.vinhuni.edu.vn/",
    icon: <GraduationCap className="h-6 w-6 text-brand-blue" />,
  },
];

export function ServicesBar({ services = defaultServices }: { services?: ServiceItem[] }) {
  const t = useTranslations("services");

  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service) => {
            const isExternal = service.href.startsWith("http");
            const title = t(service.titleKey);
            
            if (isExternal) {
              return (
                <a
                  key={service.titleKey}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-none shadow-sm hover:shadow transition-all duration-200 group text-center"
                >
                  <div className="p-3 bg-brand-blue/10 rounded-none group-hover:scale-105 transition-all duration-200">
                    {service.icon}
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-brand-blue transition">
                    {title}
                  </h4>
                </a>
              );
            }

            return (
              <Link
                key={service.titleKey}
                href={service.href}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-none shadow-sm hover:shadow transition-all duration-200 group text-center"
              >
                <div className="p-3 bg-brand-blue/10 rounded-none group-hover:scale-105 transition-all duration-200">
                  {service.icon}
                </div>
                <h4 className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-brand-blue transition">
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
