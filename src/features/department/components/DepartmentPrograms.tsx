import { PortalProgram } from "../types/department.types";
import { Clock3, BookOpen } from "lucide-react";

interface DepartmentProgramsProps {
  programs: PortalProgram[];
  isEn: boolean;
}

export function DepartmentPrograms({ programs, isEn }: DepartmentProgramsProps) {
  if (programs.length === 0) return null;

  return (
    <section className="py-14 md:py-20 border-t border-slate-100 bg-white">
      <div className="max-w-[1360px] mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="flex items-end justify-between gap-5 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-darkred bg-brand-darkred/5 px-2.5 py-1 rounded">
              {isEn ? "Academic Pathways" : "Lộ trình học tập"}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">
              {isEn ? "Study Programs" : "Chương trình đào tạo"}
            </h2>
          </div>
          <BookOpen className="hidden sm:block h-8 w-8 text-brand-blue/80" aria-hidden="true" />
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.id}
              className="group flex flex-col justify-between border border-slate-200/80 hover:border-brand-darkred rounded-2xl bg-slate-50/30 hover:bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative top-accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 group-hover:bg-brand-darkred transition-colors duration-300" />

              <div className="space-y-4">
                {/* Meta details (code & degree_level) */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
                  {program.code && (
                    <span className="rounded-md border border-brand-blue/20 bg-white px-2 py-0.5 font-mono">
                      {program.code}
                    </span>
                  )}
                  <span className="bg-brand-blue/5 px-2.5 py-0.5 rounded-md">
                    {program.degree_level === "bachelor"
                      ? (isEn ? "Bachelor" : "Đại học")
                      : program.degree_level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-darkred transition-colors duration-150 leading-snug">
                  {program.name}
                </h3>

                {/* Description */}
                {program.short_description && (
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {program.short_description}
                  </p>
                )}
              </div>

              {/* Footer info (duration, training_mode) */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 font-semibold border-t border-slate-100/80 pt-4">
                {program.duration_years && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-slate-400" />
                    {program.duration_years} {isEn ? "years" : "năm"}
                  </span>
                )}
                {program.training_mode && (
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {program.training_mode}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
