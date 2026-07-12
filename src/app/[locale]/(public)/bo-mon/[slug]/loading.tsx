export default function LoadingDepartment() {
  return (
    <main className="animate-pulse bg-background min-h-screen">
      {/* Hero Banner Skeleton */}
      <div className="min-h-[56dvh] bg-slate-200 relative flex flex-col justify-end py-10 sm:py-14">
        <div className="site-container space-y-4">
          <div className="h-6 w-32 rounded bg-slate-300" />
          <div className="h-10 w-2/3 rounded bg-slate-300" />
          <div className="h-4 w-1/2 rounded bg-slate-300" />
        </div>
      </div>

      {/* Floating Stats Bar Skeleton */}
      <div className="max-w-[1360px] mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-md grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-6 sm:px-8">
              <div className="h-12 w-12 rounded-xl bg-slate-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-6 w-12 rounded bg-slate-200" />
                <div className="h-3 w-24 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Content Skeleton */}
      <div className="site-container py-14 md:py-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
        <div className="space-y-4">
          <div className="h-6 w-40 rounded bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-4/5 rounded bg-slate-200" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-28 w-full rounded-2xl bg-slate-100 border border-slate-100" />
          <div className="h-28 w-full rounded-2xl bg-slate-100 border border-slate-100" />
        </div>
      </div>
    </main>
  );
}
