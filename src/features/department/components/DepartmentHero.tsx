import { PortalDepartment } from "../types/department.types";
import { SafeImage } from "@/shared/components/ui/safe-image";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";

interface DepartmentHeroProps {
  department: PortalDepartment;
  isEn: boolean;
}

export function DepartmentHero({ department, isEn }: DepartmentHeroProps) {
  const heroImage =
    department.banner_object_key ||
    department.thumbnail_object_key ||
    "/images/about/set-overview.jpg";
  
  // Only display short_description in Hero. If empty, don't fall back to description to avoid duplicates.
  const intro = department.short_description;

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-10 sm:py-14 border-b border-slate-900" style={{ backgroundColor: "#020617" }}>
      {/* Background Image */}
      <SafeImage
        src={heroImage}
        alt={`${department.name}, Trường Kỹ thuật và Công nghệ`}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Multilayer gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/85 z-10" />

      {/* Hero content container */}
      <div className="site-container relative z-20 space-y-6">
        {/* Breadcrumb row on top */}
        <div className="text-white/80 hover:text-white transition-colors duration-200">
          <Breadcrumb 
            variant="transparent"
            items={[
              { name: isEn ? "Home" : "Trang chủ", href: "/" }, 
              { name: department.name }
            ]} 
          />
        </div>

        {/* Name and intro */}
        <div className="max-w-4xl pt-2">
          <span className="mb-3 inline-flex items-center rounded bg-brand-darkred/20 border border-brand-darkred/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {department.code || (isEn ? "Academic Unit" : "Đơn vị học thuật")}
          </span>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-sm">
            {department.name}
          </h1>
          {intro && (
            <p className="mt-4 max-w-[75ch] text-sm sm:text-base leading-relaxed text-slate-200 font-normal drop-shadow-sm">
              {intro}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
