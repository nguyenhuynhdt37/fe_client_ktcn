export default function LoadingProgramRecord() {
  return (
    <div className="min-h-screen bg-[#f3f5f6] py-10">
      <div className="mx-auto max-w-[1040px] animate-pulse bg-white px-6 py-12 shadow-sm sm:px-12">
        <div className="h-3 w-40 rounded bg-slate-200" />
        <div className="mt-5 h-9 max-w-2xl rounded bg-slate-200" />
        <div className="mt-4 h-4 max-w-xl rounded bg-slate-100" />
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-20 rounded-md bg-slate-100" />
          ))}
        </div>
        <div className="mt-10 h-64 rounded-md bg-slate-100" />
      </div>
    </div>
  );
}
