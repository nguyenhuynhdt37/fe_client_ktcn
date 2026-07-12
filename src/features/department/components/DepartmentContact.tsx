import { PortalDepartment } from "../types/department.types";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

interface DepartmentContactProps {
  department: PortalDepartment;
  isEn: boolean;
}

export function DepartmentContact({ department, isEn }: DepartmentContactProps) {
  const contactItems = [
    department.office
      ? { icon: MapPin, label: isEn ? "Office" : "Văn phòng", value: department.office }
      : null,
    department.phone
      ? { icon: Phone, label: isEn ? "Phone" : "Điện thoại", value: department.phone }
      : null,
    department.email
      ? { icon: Mail, label: "Email", value: department.email }
      : null,
  ].filter(Boolean) as Array<{ icon: typeof MapPin; label: string; value: string }>;

  if (contactItems.length === 0 && !department.website) return null;

  return (
    <section className="py-14 md:py-20 border-t border-slate-100 bg-white">
      <div className="max-w-[1360px] mx-auto px-6 space-y-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pb-2 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-brand-darkred">
          {isEn ? "Contact Information" : "Thông tin liên hệ"}
        </h2>

        {/* Contact info grid */}
        {contactItems.length > 0 && (
          <div className="grid gap-6 border-y border-slate-100 py-6 md:grid-cols-3">
            {contactItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="p-2.5 bg-brand-darkred/5 rounded-lg text-brand-darkred shrink-0">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-800 break-all">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Website CTA Button */}
        {department.website && (
          <div className="pt-2">
            <a
              href={department.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-darkred hover:bg-brand-darkred-dark px-6 text-sm font-bold text-white transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>{isEn ? "Visit Unit Website" : "Truy cập website đơn vị"}</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
