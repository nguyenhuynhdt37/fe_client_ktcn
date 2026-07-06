/**
 * Loading Skeleton cho trang Giới thiệu.
 * Phản chiếu layout: Hero → Overview → Timeline → Mission → Departments → Stats
 */
export default function AboutLoading() {
  return (
    <>
      {/* 1. Hero Skeleton */}
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-slate-200 animate-pulse">
        <div className="absolute bottom-10 left-8 space-y-3">
          <div className="h-4 w-24 bg-slate-300/60 rounded-sm" />
          <div className="h-8 w-96 bg-slate-300/60 rounded-sm" />
          <div className="h-4 w-64 bg-slate-300/40 rounded-sm" />
        </div>
      </div>

      {/* 2. Overview Skeleton */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-4 animate-pulse">
              <div className="h-8 w-48 bg-slate-200 rounded-sm" />
              <div className="h-1 w-16 bg-slate-200 rounded-sm" />
              <div className="h-4 w-full bg-slate-100 rounded-sm" />
              <div className="h-4 w-full bg-slate-100 rounded-sm" />
              <div className="h-4 w-3/4 bg-slate-100 rounded-sm" />
              <div className="h-4 w-full bg-slate-100 rounded-sm" />
              <div className="h-4 w-5/6 bg-slate-100 rounded-sm" />
            </div>
            <div className="lg:col-span-5 animate-pulse">
              <div className="aspect-[4/3] bg-slate-200 rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Timeline Skeleton */}
      <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60">
        <div className="max-w-[1360px] mx-auto px-6 space-y-10">
          <div className="text-center space-y-3 animate-pulse">
            <div className="h-5 w-40 bg-slate-200 rounded-sm mx-auto" />
            <div className="h-8 w-64 bg-slate-200 rounded-sm mx-auto" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-6 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
              <div className="flex-1 p-5 bg-white border border-slate-100/60 rounded-sm space-y-2">
                <div className="h-6 w-16 bg-slate-200 rounded-sm" />
                <div className="h-4 w-48 bg-slate-100 rounded-sm" />
                <div className="h-3 w-full bg-slate-100 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Mission Skeleton */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6 border border-slate-100/60 rounded-sm animate-pulse space-y-4">
                <div className="w-12 h-12 bg-slate-200 rounded-sm" />
                <div className="h-5 w-24 bg-slate-200 rounded-sm" />
                <div className="h-3 w-full bg-slate-100 rounded-sm" />
                <div className="h-3 w-3/4 bg-slate-100 rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stats Skeleton */}
      <section className="py-14 md:py-20 bg-brand-blue">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center space-y-2 animate-pulse">
                <div className="w-10 h-10 mx-auto bg-white/10 rounded-sm" />
                <div className="h-10 w-20 bg-white/10 rounded-sm mx-auto" />
                <div className="h-3 w-24 bg-white/10 rounded-sm mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
