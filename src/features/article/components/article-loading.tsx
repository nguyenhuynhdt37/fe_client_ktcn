export function ArticleLoading() {
  return (
    <div className="divide-y divide-slate-100 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row gap-6 py-6 first:pt-0 last:border-b-0">
          {/* Skeleton ảnh */}
          <div className="w-full sm:w-56 aspect-[16/10] bg-slate-200 shrink-0" />
          
          {/* Skeleton nội dung */}
          <div className="flex flex-col justify-between flex-1 py-1 space-y-4">
            <div className="space-y-2.5">
              {/* Tiêu đề dòng 1 & 2 */}
              <div className="h-4 bg-slate-200 w-3/4" />
              <div className="h-4 bg-slate-200 w-1/2" />
              
              {/* Tóm tắt dòng 1 & 2 */}
              <div className="h-3 bg-slate-100 w-full mt-3" />
              <div className="h-3 bg-slate-100 w-5/6" />
            </div>
            
            {/* Metadata dòng */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <div className="h-3 bg-slate-100 w-16" />
              <div className="h-3 bg-slate-100 w-24" />
              <div className="h-3 bg-slate-100 w-20" />
              <div className="h-3 bg-slate-100 w-12 ml-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
