import { Users, GraduationCap, Building2 } from "lucide-react";

interface DepartmentStatsProps {
  stats: {
    staff_count: number;
    doctorate_count: number;
    associate_professor_count: number;
  };
  isEn: boolean;
}

export function DepartmentStats({ stats, isEn }: DepartmentStatsProps) {
  const statItems = [
    { value: stats.staff_count, label: isEn ? "Published profiles" : "Hồ sơ công khai", icon: Users },
    { value: stats.doctorate_count, label: isEn ? "Doctorates" : "Tiến sĩ", icon: GraduationCap },
    { value: stats.associate_professor_count, label: isEn ? "Associate professors" : "Phó giáo sư", icon: Building2 },
  ];

  return (
    <section className="bg-slate-50/80 border-b border-slate-200/60 py-5 relative z-20">
      <div className="site-container">
        <div className="max-w-4xl mx-auto grid grid-cols-1 divide-y divide-slate-200/60 md:grid-cols-3 md:divide-y-0 md:divide-x md:divide-slate-200/60 items-center">
          {statItems.map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-4 py-3 md:py-1 px-4">
              <div className="p-2 bg-brand-darkred/5 rounded-lg text-brand-darkred shrink-0">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl sm:text-2xl font-bold text-slate-800 leading-none">
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
