import { ArticleLoading } from "@/features/article";

export default function NewsLoadingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 bg-slate-50/20">
      {/* Title Skeleton */}
      <div className="flex flex-col gap-2 border-b border-slate-200/60 pb-4 animate-pulse">
        <div className="h-3 bg-slate-200 w-24" />
        <div className="h-6 bg-slate-200 w-48 mt-1" />
      </div>

      {/* Toolbar Skeleton */}
      <div className="bg-white border border-slate-200/60 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
        <div className="h-9 bg-slate-200 w-full max-w-md" />
        <div className="h-9 bg-slate-200 w-44" />
      </div>

      {/* Layout Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main List */}
        <div className="lg:col-span-3 bg-white border border-slate-200/60 p-6 shadow-sm">
          <ArticleLoading />
        </div>
        {/* Sidebar */}
        <div className="lg:col-span-1 bg-white border border-slate-200/60 p-6 shadow-sm h-96 animate-pulse" />
      </div>
    </div>
  );
}
