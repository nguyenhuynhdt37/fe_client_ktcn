/**
 * Loading Skeleton cho Trang chủ (public).
 * Phản chiếu đúng layout thật: Hero Slider → Services → Hero Articles → News+Notice → Admission+Recruitment → Research
 */
export default function HomeLoading() {
  return (
    <>
      {/* 1. Hero Slider Skeleton */}
      <div className="relative w-full h-[420px] bg-slate-200 animate-pulse">
        <div className="absolute bottom-8 left-8 space-y-3">
          <div className="h-6 w-80 bg-slate-300/60 rounded" />
          <div className="h-4 w-52 bg-slate-300/40 rounded" />
        </div>
      </div>

      {/* 2. Services Bar Skeleton */}
      <div className="w-full bg-white border-b border-slate-200/60">
        <div className="max-w-[1360px] mx-auto px-6 py-3 flex gap-6 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 animate-pulse">
              <div className="h-8 w-8 rounded bg-slate-200" />
              <div className="h-3 w-16 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      <main className="w-full">
        {/* 3. Hero Articles Skeleton */}
        <section className="py-12 max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main hero article */}
            <div className="lg:col-span-8 animate-pulse">
              <div className="h-[400px] bg-slate-200 rounded" />
              <div className="mt-4 space-y-2">
                <div className="h-5 w-3/4 bg-slate-200 rounded" />
                <div className="h-3 w-1/2 bg-slate-200 rounded" />
              </div>
            </div>
            {/* Sidebar list */}
            <div className="lg:col-span-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="h-16 w-20 shrink-0 bg-slate-200 rounded" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 w-full bg-slate-200 rounded" />
                    <div className="h-2.5 w-2/3 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. News + Notice Skeleton */}
        <section className="py-12 max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* News Grid */}
            <div className="lg:col-span-9">
              {/* Section title */}
              <div className="mb-6 animate-pulse">
                <div className="h-5 w-48 bg-slate-200 rounded" />
                <div className="mt-2 h-px w-24 bg-slate-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-44 bg-slate-200 rounded" />
                    <div className="mt-3 space-y-2">
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                      <div className="h-4 w-full bg-slate-200 rounded" />
                      <div className="h-3 w-4/5 bg-slate-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Notice sidebar */}
            <div className="lg:col-span-3">
              <div className="mb-6 animate-pulse">
                <div className="h-5 w-28 bg-slate-200 rounded" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse border-l-2 border-slate-200 pl-4 py-2">
                    <div className="h-3 w-full bg-slate-200 rounded" />
                    <div className="mt-1.5 h-2.5 w-3/5 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Admission + Recruitment Skeleton */}
        <section className="py-12 max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-9">
              <div className="mb-6 animate-pulse">
                <div className="h-5 w-36 bg-slate-200 rounded" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-slate-200 rounded" />
                    <div className="mt-3 space-y-2">
                      <div className="h-4 w-full bg-slate-200 rounded" />
                      <div className="h-3 w-2/3 bg-slate-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="mb-6 animate-pulse">
                <div className="h-5 w-24 bg-slate-200 rounded" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse py-3 border-b border-slate-100">
                    <div className="h-3.5 w-full bg-slate-200 rounded" />
                    <div className="mt-1.5 h-2.5 w-1/2 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Research Skeleton */}
        <section className="py-12 max-w-[1360px] mx-auto px-6">
          <div className="mb-6 animate-pulse">
            <div className="h-5 w-56 bg-slate-200 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 animate-pulse">
              <div className="h-72 bg-slate-200 rounded" />
              <div className="mt-3 space-y-2">
                <div className="h-5 w-3/4 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-200 rounded" />
              </div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-slate-200 rounded" />
                  <div className="mt-2 h-3 w-full bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 7. Faculties Slider Skeleton */}
      <section className="py-12 bg-slate-50/80 border-y border-border/40">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="mb-6 animate-pulse">
            <div className="h-5 w-40 bg-slate-200 rounded" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-72 shrink-0 animate-pulse">
                <div className="h-44 bg-slate-200 rounded" />
                <div className="mt-3 h-4 w-3/4 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Student Activities Skeleton */}
      <section className="py-12 bg-slate-50/60 border-y border-slate-200/50">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="mb-6 animate-pulse">
            <div className="h-5 w-48 bg-slate-200 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-44 bg-slate-200 rounded" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-3 w-1/2 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Gallery Skeleton */}
      <section className="py-12 bg-white">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="mb-6 animate-pulse">
            <div className="h-5 w-40 bg-slate-200 rounded" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-56 h-40 shrink-0 bg-slate-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
