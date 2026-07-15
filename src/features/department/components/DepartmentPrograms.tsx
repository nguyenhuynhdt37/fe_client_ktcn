import { PortalProgram } from "../types/department.types";
import { Clock3, BookOpen } from "lucide-react";
import { Link } from "@/i18n/routing";

interface DepartmentProgramsProps {
  programs: PortalProgram[];
  isEn: boolean;
}

export function DepartmentPrograms({ programs, isEn }: DepartmentProgramsProps) {
  if (programs.length === 0) return null;

  return (
    <section className="border-t border-slate-100 bg-white py-14 md:py-20">
      <div className="mx-auto max-w-[1360px] space-y-10 px-6">
        {/* Header */}
        <div className="flex items-end justify-between gap-5 border-b border-slate-100 pb-5">
          <div>
            <span className="text-brand-darkred bg-brand-darkred/5 rounded px-2.5 py-1 text-[11px] font-extrabold tracking-wider uppercase">
              {isEn ? "Academic Pathways" : "Lộ trình học tập"}
            </span>
            <h2 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
              {isEn ? "Study Programs" : "Chương trình đào tạo"}
            </h2>
          </div>
          <BookOpen className="text-brand-blue/80 hidden h-8 w-8 sm:block" aria-hidden="true" />
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.id}
              className="group hover:border-brand-darkred relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/30 p-6 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md sm:p-7"
            >
              {/* Decorative top-accent bar */}
              <div className="group-hover:bg-brand-darkred absolute top-0 right-0 left-0 h-1 bg-slate-200 transition-colors duration-300" />

              <div className="space-y-4">
                {/* Meta details (code & degree_level) */}
                <div className="text-brand-blue flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
                  {program.code && (
                    <span className="border-brand-blue/20 rounded-md border bg-white px-2 py-0.5 font-mono">
                      {program.code}
                    </span>
                  )}
                  <span className="bg-brand-blue/5 rounded-md px-2.5 py-0.5">
                    {program.degree_level === "bachelor"
                      ? isEn
                        ? "Bachelor"
                        : "Đại học"
                      : program.degree_level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="group-hover:text-brand-darkred text-lg leading-snug font-bold text-slate-900 transition-colors duration-150">
                  {program.name}
                </h3>

                {/* Description */}
                {program.short_description && (
                  <p className="line-clamp-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {program.short_description}
                  </p>
                )}
              </div>

              {/* Footer info (duration, training_mode) */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100/80 pt-4 text-xs font-semibold text-slate-500">
                {program.duration_years && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-slate-400" />
                    {program.duration_years} {isEn ? "years" : "năm"}
                  </span>
                )}
                {program.training_mode && (
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                    {program.training_mode}
                  </span>
                )}
                <Link
                  href={{
                    pathname: "/dao-tao/dai-hoc/[slug]",
                    params: { slug: program.slug },
                  }}
                  className="text-brand-darkred ml-auto inline-flex items-center font-bold hover:underline"
                >
                  {isEn ? "View programme" : "Xem chương trình"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
