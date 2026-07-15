"use client";

// Three undergraduate-program layouts, switchable via ?variant=, on a throwaway prototype route.
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  GraduationCap,
  Layers3,
  LibraryBig,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

type Variant = "A" | "B" | "C" | "D";
type TabKey = "overview" | "outcomes" | "curriculum" | "documents";

const variants: Array<{ key: Variant; vi: string; en: string }> = [
  { key: "A", vi: "Cổng học thuật", en: "Academic portal" },
  { key: "B", vi: "Khung chương trình", en: "Curriculum first" },
  { key: "C", vi: "Phiên bản & tài liệu", en: "Versions & documents" },
  { key: "D", vi: "Hồ sơ chương trình", en: "Programme record" },
];

const versions = [
  { id: "2022", label: "2022 · K62", statusVi: "Đang đề xuất", statusEn: "Proposed current" },
  { id: "2019", label: "2019 · K61", statusVi: "Lưu trữ", statusEn: "Archived" },
  { id: "2017", label: "2017 · K58", statusVi: "Lưu trữ", statusEn: "Archived" },
];

const courses = [
  { code: "ELE21001", vi: "Nhập môn ngành kỹ thuật và công nghệ", en: "Introduction to Engineering and Technology", credits: 4, semester: 1, block: "GDĐC", type: "Bắt buộc" },
  { code: "MAT21002", vi: "Đại số tuyến tính", en: "Linear Algebra", credits: 3, semester: 1, block: "GDĐC", type: "Bắt buộc" },
  { code: "INF20004", vi: "Tin học nhóm ngành kỹ thuật", en: "Computing for Engineering", credits: 4, semester: 1, block: "GDĐC", type: "Bắt buộc" },
  { code: "PHY20001", vi: "Vật lý đại cương", en: "General Physics", credits: 5, semester: 1, block: "GDĐC", type: "Bắt buộc" },
  { code: "POL11001", vi: "Triết học Mác - Lênin", en: "Marxist-Leninist Philosophy", credits: 3, semester: 2, block: "GDĐC", type: "Bắt buộc" },
  { code: "AUT20001", vi: "CAD trong kỹ thuật", en: "Engineering CAD", credits: 4, semester: 2, block: "Cơ sở ngành", type: "Bắt buộc" },
  { code: "MAT20006", vi: "Giải tích", en: "Calculus", credits: 5, semester: 2, block: "GDĐC", type: "Bắt buộc" },
  { code: "ENG10001", vi: "Tiếng Anh 1", en: "English 1", credits: 3, semester: 2, block: "GDĐC", type: "Bắt buộc" },
];

const outcomes = [
  { code: "PLO1.1", vi: "Vận dụng kiến thức khoa học xã hội, chính trị và pháp luật trong bối cảnh doanh nghiệp và xã hội.", en: "Apply social science, political and legal knowledge in business and social contexts." },
  { code: "PLO1.2", vi: "Áp dụng toán học và khoa học tự nhiên để phân tích, giải quyết vấn đề Điện tử - Viễn thông.", en: "Apply mathematics and natural sciences to solve electronics and telecommunications problems." },
  { code: "PLO2.1", vi: "Thể hiện đạo đức, trách nhiệm nghề nghiệp và tác phong chuyên nghiệp.", en: "Demonstrate ethics, professional responsibility and professional conduct." },
  { code: "PLO3.1", vi: "Hoạt động hiệu quả với tư cách thành viên hoặc trưởng nhóm.", en: "Work effectively as a team member or team leader." },
  { code: "PLO4.2", vi: "Thiết kế, triển khai và đánh giá thiết bị, phần mềm và hệ thống chuyên ngành.", en: "Design, implement and evaluate discipline-specific devices, software and systems." },
];

const documents = [
  { titleVi: "Bản mô tả chương trình đào tạo năm 2022", titleEn: "2022 Programme Specification", kindVi: "Bản mô tả", kindEn: "Specification", pages: 86, size: "1,44 MB", year: "2022" },
  { titleVi: "Chương trình đào tạo Điện tử - Viễn thông K62", titleEn: "Electronics and Telecommunications Curriculum K62", kindVi: "CTĐT & đề cương", kindEn: "Curriculum & syllabi", pages: 439, size: "7,59 MB", year: "2022" },
  { titleVi: "Bản mô tả chương trình đào tạo năm 2019", titleEn: "2019 Programme Specification", kindVi: "Bản mô tả", kindEn: "Specification", pages: 32, size: "0,70 MB", year: "2019" },
  { titleVi: "Chương trình đào tạo Điện tử - Viễn thông K61", titleEn: "Electronics and Telecommunications Curriculum K61", kindVi: "CTĐT & đề cương", kindEn: "Curriculum & syllabi", pages: 779, size: "10,57 MB", year: "2019" },
];

const careerItems = [
  { icon: Sparkles, vi: "Thiết kế hệ thống nhúng và IoT", en: "Embedded systems and IoT design" },
  { icon: ShieldCheck, vi: "Vận hành, tối ưu mạng viễn thông", en: "Telecommunications network operations" },
  { icon: BriefcaseBusiness, vi: "Nghiên cứu và phát triển sản phẩm", en: "Product research and development" },
];

function PrototypeSwitcher({ current, locale }: { current: Variant; locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isEn = locale === "en";

  const move = (direction: -1 | 1) => {
    const currentIndex = variants.findIndex((item) => item.key === current);
    const next = variants[(currentIndex + direction + variants.length) % variants.length];
    router.replace(`${pathname}?variant=${next.key}`, { scroll: false });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (process.env.NODE_ENV === "production") return null;

  const selected = variants.find((item) => item.key === current) ?? variants[0];

  return (
    <div className="fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 p-1.5 text-white shadow-xl">
      <button type="button" onClick={() => move(-1)} title={isEn ? "Previous variant" : "Mẫu trước"} className="grid size-9 place-items-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white">
        <ArrowLeft className="size-4" />
      </button>
      <div className="min-w-44 px-3 text-center text-xs font-semibold">
        <span className="text-orange-300">{selected.key}</span>
        <span className="mx-2 text-slate-600">·</span>
        {isEn ? selected.en : selected.vi}
      </div>
      <button type="button" onClick={() => move(1)} title={isEn ? "Next variant" : "Mẫu sau"} className="grid size-9 place-items-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white">
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

function StatusBadge({ isEn }: { isEn: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
      <FileCheck2 className="size-3.5" />
      {isEn ? "Published" : "Đã công bố"}
    </span>
  );
}

function VersionSelect({ version, setVersion, isEn }: { version: string; setVersion: (value: string) => void; isEn: boolean }) {
  return (
    <label className="relative block min-w-48">
      <span className="sr-only">{isEn ? "Programme version" : "Phiên bản chương trình"}</span>
      <select value={version} onChange={(event) => setVersion(event.target.value)} className="h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-9 text-sm font-semibold text-slate-800 outline-none focus:border-brand-darkred">
        {versions.map((item) => <option key={item.id} value={item.id}>{item.label} · {isEn ? item.statusEn : item.statusVi}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-slate-500" />
    </label>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Clock3; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-l-2 border-slate-200 pl-3">
      <Icon className="size-4 shrink-0 text-brand-darkred" />
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase text-slate-500">{label}</div>
        <div className="truncate text-sm font-bold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function VariantA({ locale, version, setVersion }: { locale: string; version: string; setVersion: (value: string) => void }) {
  const isEn = locale === "en";
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "overview", label: isEn ? "Overview" : "Tổng quan" },
    { key: "outcomes", label: isEn ? "Learning outcomes" : "Chuẩn đầu ra" },
    { key: "curriculum", label: isEn ? "Curriculum" : "Khung chương trình" },
    { key: "documents", label: isEn ? "Documents" : "Tài liệu" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8f8] pb-28">
      <div className="border-b border-slate-200 bg-white">
        <div className="site-container py-5 text-xs font-medium text-slate-500">{isEn ? "Academic programmes / Undergraduate / Electronics and Telecommunications" : "Đào tạo / Đại học / Kỹ thuật Điện tử - Viễn thông"}</div>
      </div>
      <section className="border-b border-slate-200 bg-white">
        <div className="site-container grid gap-8 py-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <div className="mb-3 flex flex-wrap items-center gap-2"><span className="rounded-md bg-brand-blue px-2.5 py-1 font-mono text-xs font-bold text-white">7520207</span><StatusBadge isEn={isEn} /></div>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{isEn ? "Electronics and Telecommunications Engineering" : "Kỹ thuật Điện tử - Viễn thông"}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{isEn ? "An engineering programme focused on electronic systems, embedded software, IoT and modern telecommunications infrastructure." : "Chương trình kỹ sư định hướng hệ thống điện tử, phần mềm nhúng, IoT và hạ tầng viễn thông hiện đại."}</p>
          </div>
          <div><div className="mb-1.5 text-xs font-semibold text-slate-500">{isEn ? "Programme version" : "Phiên bản chương trình"}</div><VersionSelect version={version} setVersion={setVersion} isEn={isEn} /></div>
        </div>
        <div className="site-container grid grid-cols-2 gap-5 border-t border-slate-100 py-5 sm:grid-cols-4">
          <Metric icon={GraduationCap} label={isEn ? "Degree" : "Văn bằng"} value={isEn ? "Engineer" : "Kỹ sư"} />
          <Metric icon={Clock3} label={isEn ? "Duration" : "Thời gian"} value={isEn ? "4.5 years" : "4,5 năm"} />
          <Metric icon={Layers3} label={isEn ? "Credits" : "Tín chỉ"} value="150" />
          <Metric icon={CalendarDays} label={isEn ? "Study plan" : "Kế hoạch học"} value={isEn ? "9 semesters" : "9 học kỳ"} />
        </div>
      </section>
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="site-container flex overflow-x-auto">
          {tabs.map((tab) => <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={`shrink-0 border-b-2 px-4 py-4 text-sm font-semibold ${activeTab === tab.key ? "border-brand-darkred text-brand-darkred" : "border-transparent text-slate-600 hover:text-slate-950"}`}>{tab.label}</button>)}
        </div>
      </div>
      <main className="site-container py-10">
        {activeTab === "overview" && <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-10">
            <section><div className="mb-4 flex items-center gap-2 text-brand-darkred"><Target className="size-5" /><h2 className="text-xl font-bold text-slate-950">{isEn ? "Programme objective" : "Mục tiêu chương trình"}</h2></div><p className="max-w-3xl text-[15px] leading-7 text-slate-700">{isEn ? "Graduates have the professional capability and personal qualities to conceive, design, implement and operate electronics and telecommunications systems in an internationally integrated environment." : "Sinh viên tốt nghiệp có năng lực chuyên môn và phẩm chất để hình thành ý tưởng, thiết kế, triển khai và vận hành các hệ thống Điện tử, Viễn thông trong môi trường hội nhập quốc tế."}</p></section>
            <section><h2 className="mb-5 text-xl font-bold text-slate-950">{isEn ? "Career pathways" : "Định hướng nghề nghiệp"}</h2><div className="grid gap-4 sm:grid-cols-3">{careerItems.map((item) => <article key={item.vi} className="rounded-lg border border-slate-200 bg-white p-5"><item.icon className="mb-4 size-5 text-brand-darkred" /><h3 className="text-sm font-bold leading-6 text-slate-900">{isEn ? item.en : item.vi}</h3></article>)}</div></section>
          </div>
          <aside className="min-w-0 space-y-5"><div className="rounded-lg border border-slate-200 bg-white p-5"><h2 className="mb-4 text-sm font-bold text-slate-950">{isEn ? "Managing unit" : "Đơn vị quản lý"}</h2><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-md bg-brand-blue text-white"><Users className="size-5" /></div><div><div className="text-sm font-bold text-slate-900">{isEn ? "Faculty of Electronics" : "Khoa Điện tử"}</div><div className="text-xs text-slate-500">SET · Vinh University</div></div></div></div><div className="rounded-lg border border-slate-200 bg-white p-5"><h2 className="text-sm font-bold text-slate-950">{isEn ? "Official documents" : "Tài liệu chính thức"}</h2><p className="mt-2 text-xs leading-5 text-slate-500">{isEn ? "Two documents are available for the selected version." : "Có 2 tài liệu thuộc phiên bản đang chọn."}</p><button type="button" onClick={() => setActiveTab("documents")} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-darkred">{isEn ? "View documents" : "Xem tài liệu"}<ArrowRight className="size-4" /></button></div></aside>
        </div>}
        {activeTab === "outcomes" && <section><div className="mb-7 max-w-3xl"><h2 className="text-2xl font-bold text-slate-950">{isEn ? "Programme learning outcomes" : "Chuẩn đầu ra chương trình"}</h2><p className="mt-2 text-sm text-slate-600">{isEn ? "Outcomes are grouped by professional knowledge, personal skills, teamwork and engineering practice." : "Chuẩn đầu ra được nhóm theo kiến thức chuyên môn, kỹ năng cá nhân, làm việc nhóm và thực hành kỹ thuật."}</p></div><div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">{outcomes.map((item) => <div key={item.code} className="grid gap-3 p-5 sm:grid-cols-[90px_1fr]"><span className="font-mono text-sm font-bold text-brand-darkred">{item.code}</span><p className="text-sm leading-6 text-slate-700">{isEn ? item.en : item.vi}</p></div>)}</div></section>}
        {activeTab === "curriculum" && <CurriculumTable isEn={isEn} courses={courses} />}
        {activeTab === "documents" && <DocumentList isEn={isEn} documents={documents.filter((item) => item.year === version)} />}
      </main>
    </div>
  );
}

function CurriculumTable({ isEn, courses: rows }: { isEn: boolean; courses: typeof courses }) {
  return <section><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold text-slate-950">{isEn ? "Curriculum structure" : "Khung chương trình"}</h2><p className="mt-2 text-sm text-slate-600">{isEn ? "A preview of the structured course data extracted from the 2022 programme." : "Dữ liệu học phần có cấu trúc được trích từ chương trình năm 2022."}</p></div><span className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">{isEn ? "8 courses previewed" : "Đang xem mẫu 8 học phần"}</span></div><div className="overflow-hidden rounded-lg border border-slate-200 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">{isEn ? "Code" : "Mã HP"}</th><th className="px-4 py-3">{isEn ? "Course" : "Tên học phần"}</th><th className="px-4 py-3">{isEn ? "Credits" : "Tín chỉ"}</th><th className="px-4 py-3">{isEn ? "Semester" : "Học kỳ"}</th><th className="px-4 py-3">{isEn ? "Block" : "Khối"}</th></tr></thead><tbody className="divide-y divide-slate-100">{rows.map((course) => <tr key={course.code} className="hover:bg-slate-50"><td className="px-4 py-3 font-mono text-xs font-bold text-brand-blue">{course.code}</td><td className="px-4 py-3 font-medium text-slate-900">{isEn ? course.en : course.vi}</td><td className="px-4 py-3 text-slate-700">{course.credits}</td><td className="px-4 py-3 text-slate-700">{course.semester}</td><td className="px-4 py-3"><span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{course.block}</span></td></tr>)}</tbody></table></div></div></section>;
}

function DocumentList({ isEn, documents: rows }: { isEn: boolean; documents: typeof documents }) {
  return <section><div className="mb-7"><h2 className="text-2xl font-bold text-slate-950">{isEn ? "Programme documents" : "Tài liệu chương trình"}</h2><p className="mt-2 text-sm text-slate-600">{isEn ? "Original files are preserved with their source URL and checksum." : "Tệp gốc được lưu kèm đường dẫn nguồn và mã kiểm tra toàn vẹn."}</p></div><div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">{rows.map((document) => <article key={document.titleVi} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"><div className="grid size-11 shrink-0 place-items-center rounded-md bg-red-50 text-red-700"><FileText className="size-5" /></div><div className="min-w-0 flex-1"><div className="text-xs font-bold uppercase text-brand-darkred">{isEn ? document.kindEn : document.kindVi}</div><h3 className="mt-1 text-sm font-bold text-slate-900">{isEn ? document.titleEn : document.titleVi}</h3><div className="mt-1 text-xs text-slate-500">PDF · {document.pages} {isEn ? "pages" : "trang"} · {document.size}</div></div><div className="flex gap-2"><button type="button" title={isEn ? "Open document" : "Mở tài liệu"} className="grid size-9 place-items-center rounded-md border border-slate-300 text-slate-600 hover:border-brand-darkred hover:text-brand-darkred"><ExternalLink className="size-4" /></button><button type="button" title={isEn ? "Download document" : "Tải tài liệu"} className="grid size-9 place-items-center rounded-md bg-brand-darkred text-white hover:bg-brand-darkred-dark"><ArrowDownToLine className="size-4" /></button></div></article>)}</div></section>;
}

function VariantB({ locale, version, setVersion }: { locale: string; version: string; setVersion: (value: string) => void }) {
  const isEn = locale === "en";
  const [semester, setSemester] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => courses.filter((course) => (semester === "all" || String(course.semester) === semester) && `${course.code} ${course.vi} ${course.en}`.toLowerCase().includes(query.toLowerCase())), [semester, query]);
  return <div className="min-h-screen bg-white pb-28"><header className="border-b-4 border-brand-darkred bg-[#183846] text-white"><div className="site-container py-7"><div className="mb-3 flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs font-bold text-orange-200">7520207 · {isEn ? "UNDERGRADUATE" : "ĐẠI HỌC"}</span><StatusBadge isEn={isEn} /></div><h1 className="max-w-4xl text-3xl font-extrabold leading-tight">{isEn ? "Electronics and Telecommunications Engineering" : "Kỹ thuật Điện tử - Viễn thông"}</h1><div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/15 pt-5 sm:grid-cols-4"><div><div className="text-xs text-slate-300">{isEn ? "Degree" : "Văn bằng"}</div><div className="text-sm font-bold">{isEn ? "Engineer" : "Kỹ sư"}</div></div><div><div className="text-xs text-slate-300">{isEn ? "Credits" : "Tín chỉ"}</div><div className="text-sm font-bold">150</div></div><div><div className="text-xs text-slate-300">{isEn ? "Duration" : "Thời gian"}</div><div className="text-sm font-bold">{isEn ? "4.5 years" : "4,5 năm"}</div></div><VersionSelect version={version} setVersion={setVersion} isEn={isEn} /></div></div></header><div className="site-container grid min-w-0 grid-cols-1 min-h-[760px] lg:grid-cols-[220px_minmax(0,1fr)]"><aside className="min-w-0 border-b border-slate-200 py-7 lg:border-b-0 lg:border-r lg:pr-6"><nav className="grid min-w-0 grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1">{[{ icon: BookOpen, vi: "Khung chương trình", en: "Curriculum" }, { icon: Target, vi: "Chuẩn đầu ra", en: "Outcomes" }, { icon: LibraryBig, vi: "Đề cương học phần", en: "Syllabi" }, { icon: FileText, vi: "Tài liệu", en: "Documents" }].map((item, index) => <button key={item.vi} type="button" className={`min-w-0 flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-semibold ${index === 0 ? "bg-brand-blue text-white" : "text-slate-600 hover:bg-slate-100"}`}><item.icon className="size-4 shrink-0" /><span className="min-w-0">{isEn ? item.en : item.vi}</span></button>)}</nav><div className="mt-8 hidden border-t border-slate-200 pt-6 lg:block"><div className="text-xs font-bold uppercase text-slate-500">{isEn ? "Completion" : "Cấu trúc tín chỉ"}</div><div className="mt-4 space-y-3">{[[isEn ? "General" : "Đại cương", 40, "bg-brand-blue"], [isEn ? "Foundation" : "Cơ sở ngành", 35, "bg-emerald-600"], [isEn ? "Major" : "Chuyên ngành", 62, "bg-brand-darkred"]].map(([label, value, color]) => <div key={String(label)}><div className="mb-1 flex justify-between text-xs"><span className="text-slate-600">{label}</span><strong>{value}</strong></div><div className="h-1.5 bg-slate-100"><div className={`h-full ${color}`} style={{ width: `${Number(value) / 1.5}%` }} /></div></div>)}</div></div></aside><main className="min-w-0 py-8 lg:pl-8"><div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between"><div className="min-w-0"><div className="text-xs font-bold uppercase text-brand-darkred">{isEn ? "Study plan" : "Kế hoạch học tập"}</div><h2 className="mt-1 text-2xl font-bold text-slate-950">{isEn ? "Curriculum by semester" : "Khung chương trình theo học kỳ"}</h2></div><div className="flex min-w-0 flex-col gap-2 sm:flex-row"><label className="relative min-w-0"><Search className="absolute left-3 top-2.5 size-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isEn ? "Search course" : "Tìm mã hoặc tên học phần"} className="h-10 w-full rounded-md border border-slate-300 pl-9 pr-3 text-sm sm:w-64" /></label><label className="relative min-w-0"><Filter className="absolute left-3 top-2.5 size-4 text-slate-400" /><select value={semester} onChange={(event) => setSemester(event.target.value)} className="h-10 w-full appearance-none rounded-md border border-slate-300 bg-white pl-9 pr-9 text-sm font-semibold"><option value="all">{isEn ? "All semesters" : "Tất cả học kỳ"}</option><option value="1">{isEn ? "Semester 1" : "Học kỳ 1"}</option><option value="2">{isEn ? "Semester 2" : "Học kỳ 2"}</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-slate-400" /></label></div></div><div className="mb-5 flex items-center gap-5 border-y border-slate-200 py-3 text-xs text-slate-600"><span><strong className="text-slate-950">{filtered.length}</strong> {isEn ? "courses shown" : "học phần hiển thị"}</span><span><strong className="text-slate-950">{filtered.reduce((sum, item) => sum + item.credits, 0)}</strong> {isEn ? "credits" : "tín chỉ"}</span></div><CurriculumTable isEn={isEn} courses={filtered} /></main></div></div>;
}

function VariantC({ locale, version, setVersion }: { locale: string; version: string; setVersion: (value: string) => void }) {
  const isEn = locale === "en";
  const versionDocs = documents.filter((item) => item.year === version);
  return <div className="min-h-screen bg-[#f4f6f5] pb-28"><section className="relative min-h-[360px] overflow-hidden bg-slate-950"><Image src="/images/about/set-lab.jpg" alt={isEn ? "Engineering laboratory" : "Phòng thí nghiệm kỹ thuật"} fill priority className="object-cover opacity-55" sizes="100vw" /><div className="absolute inset-0 bg-slate-950/45" /><div className="site-container relative z-10 flex min-h-[360px] items-end py-9 text-white"><div className="max-w-4xl"><div className="mb-4 flex flex-wrap gap-2"><span className="rounded-md bg-white px-2.5 py-1 font-mono text-xs font-bold text-brand-blue">7520207</span><span className="rounded-md border border-white/30 bg-slate-950/50 px-2.5 py-1 text-xs font-semibold">{isEn ? "Engineer · 150 credits" : "Kỹ sư · 150 tín chỉ"}</span></div><h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{isEn ? "Electronics and Telecommunications Engineering" : "Kỹ thuật Điện tử - Viễn thông"}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">{isEn ? "Explore approved programme versions, original documents and the learning outcomes that shape the engineering pathway." : "Theo dõi từng phiên bản chương trình, tài liệu gốc và chuẩn đầu ra định hình lộ trình kỹ sư."}</p></div></div></section><div className="border-b border-slate-200 bg-white"><div className="site-container grid grid-cols-2 gap-5 py-5 sm:grid-cols-4"><Metric icon={Clock3} label={isEn ? "Duration" : "Thời gian"} value={isEn ? "4.5 years" : "4,5 năm"} /><Metric icon={CalendarDays} label={isEn ? "Semesters" : "Học kỳ"} value="9" /><Metric icon={GraduationCap} label={isEn ? "Mode" : "Hình thức"} value={isEn ? "Full-time" : "Chính quy"} /><Metric icon={Users} label={isEn ? "Managed by" : "Đơn vị"} value={isEn ? "Electronics" : "Khoa Điện tử"} /></div></div><main className="site-container grid min-w-0 grid-cols-1 gap-10 py-10 lg:grid-cols-[240px_minmax(0,1fr)]"><aside className="min-w-0"><div className="mb-4 text-xs font-bold uppercase text-slate-500">{isEn ? "Programme versions" : "Phiên bản chương trình"}</div><div className="relative space-y-1 border-l border-slate-300 pl-5">{versions.map((item) => <button key={item.id} type="button" onClick={() => setVersion(item.id)} className={`relative w-full rounded-md p-3 text-left ${version === item.id ? "bg-white shadow-sm ring-1 ring-slate-200" : "hover:bg-white/60"}`}><span className={`absolute -left-[25px] top-4 size-2 rounded-full ${version === item.id ? "bg-brand-darkred ring-4 ring-red-100" : "bg-slate-400"}`} /><div className="text-sm font-bold text-slate-900">{item.label}</div><div className={`mt-1 text-xs ${version === item.id ? "text-brand-darkred" : "text-slate-500"}`}>{isEn ? item.statusEn : item.statusVi}</div></button>)}</div><div className="mt-7"><StatusBadge isEn={isEn} /></div></aside><div className="min-w-0 space-y-12"><section><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div className="min-w-0"><div className="text-xs font-bold uppercase text-brand-darkred">{version} · {isEn ? "Source library" : "Thư viện nguồn"}</div><h2 className="mt-1 text-2xl font-bold text-slate-950">{isEn ? "Official programme documents" : "Tài liệu chương trình chính thức"}</h2></div><VersionSelect version={version} setVersion={setVersion} isEn={isEn} /></div><DocumentList isEn={isEn} documents={versionDocs} /></section><section className="border-t border-slate-300 pt-10"><div className="mb-6 flex items-center justify-between gap-4"><div><div className="text-xs font-bold uppercase text-brand-blue">{isEn ? "Learning assurance" : "Đảm bảo chất lượng"}</div><h2 className="mt-1 text-2xl font-bold text-slate-950">{isEn ? "Learning outcomes at a glance" : "Chuẩn đầu ra nổi bật"}</h2></div><span className="hidden text-xs font-semibold text-slate-500 sm:block">5 / 9 PLO</span></div><div className="grid gap-4 sm:grid-cols-2">{outcomes.slice(0, 4).map((item) => <article key={item.code} className="rounded-lg border border-slate-200 bg-white p-5"><div className="mb-3 flex items-center justify-between"><span className="font-mono text-sm font-bold text-brand-darkred">{item.code}</span><Check className="size-4 text-emerald-600" /></div><p className="text-sm leading-6 text-slate-700">{isEn ? item.en : item.vi}</p></article>)}</div></section></div></main></div>;
}

function VariantD({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const archive = [
    {
      year: "2017 · K58",
      titleVi: "Bản mô tả chương trình đào tạo theo tiếp cận CDIO",
      titleEn: "CDIO-based Programme Specification",
      detailVi: "Chương trình chi tiết và bộ đề cương học phần áp dụng từ khóa tuyển sinh năm 2017.",
      detailEn: "Detailed curriculum and course syllabi applicable from the 2017 intake.",
      href: "https://vienktcn.vinhuni.edu.vn/DATA/120/Upload/2508/DOCUMENTS/Chuong%20trinh%20dao%20tao/2017/Ch%C6%B0%C6%A1ng%20tr%C3%ACnh%20%C4%91%C3%A0o%20t%E1%BA%A1o%20_%C4%90TVT%202017%20_K58.pdf",
    },
    {
      year: "2019 · K61",
      titleVi: "Bản mô tả chương trình đào tạo theo tiếp cận CDIO",
      titleEn: "CDIO-based Programme Specification",
      detailVi: "Chương trình chi tiết và bộ đề cương học phần áp dụng từ khóa tuyển sinh năm 2019.",
      detailEn: "Detailed curriculum and course syllabi applicable from the 2019 intake.",
      href: "https://vienktcn.vinhuni.edu.vn/DATA/120/Upload/2508/DOCUMENTS/Chuong%20trinh%20dao%20tao/2019/Ch%C6%B0%C6%A1ng%20tr%C3%ACnh%20%C4%91%C3%A0o%20t%E1%BA%A1o%20-%20%C4%90TVT%20K61.pdf",
    },
    {
      year: "2022 · K62",
      titleVi: "Bản mô tả và chương trình đào tạo hiện có",
      titleEn: "Available Programme Specification and Curriculum",
      detailVi: "Bản mô tả 86 trang và chương trình chi tiết 439 trang, bao gồm đề cương học phần.",
      detailEn: "An 86-page specification and a 439-page detailed curriculum including course syllabi.",
      href: "https://drive.google.com/file/d/1jJAA_7BKkS13x6G4r5Szwd09uZyTS1sz/view?usp=sharing",
    },
  ];
  const programmeObjectives = [
    { code: "PO1", vi: "Áp dụng kiến thức nền tảng và lập luận ngành để giải quyết các vấn đề trong lĩnh vực Điện tử, Viễn thông.", en: "Apply foundational knowledge and disciplinary reasoning to solve problems in electronics and telecommunications." },
    { code: "PO2", vi: "Thể hiện kỹ năng, phẩm chất cá nhân và định hướng phát triển nghề nghiệp.", en: "Demonstrate personal skills, qualities and professional development orientation." },
    { code: "PO3", vi: "Thể hiện kỹ năng làm việc nhóm và giao tiếp hiệu quả trong các hoạt động nghề nghiệp.", en: "Demonstrate effective teamwork and communication in professional activities." },
    { code: "PO4", vi: "Hình thành ý tưởng, thiết kế, triển khai và vận hành các hệ thống Điện tử, Viễn thông.", en: "Conceive, design, implement and operate electronics and telecommunications systems." },
  ];

  return (
    <div className="min-h-screen bg-[#f3f5f6] pb-28">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[920px] px-4 py-5 text-xs font-medium text-slate-500 sm:px-8">
          {isEn ? "Academic programmes / Undergraduate / Programme record" : "Đào tạo / Đại học / Hồ sơ chương trình"}
        </div>
      </div>
      <article className="mx-auto max-w-[920px] bg-white px-4 py-8 shadow-sm sm:px-10 sm:py-12 lg:px-14">
        <header className="border-b-2 border-slate-900 pb-7">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-brand-blue">7520207</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold uppercase text-slate-500">{isEn ? "Undergraduate programme" : "Chương trình đại học"}</span>
          </div>
          <h1 className="text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
            {isEn ? "Electronics and Telecommunications Engineering" : "Chương trình đào tạo ngành Kỹ thuật Điện tử - Viễn thông"}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            {isEn ? "Official programme information compiled from the archived source pages and original PDF documents." : "Thông tin chương trình được tổng hợp từ trang nguồn lưu trữ và các tệp PDF nguyên bản."}
          </p>
        </header>

        <section className="border-b border-slate-200 py-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase text-brand-darkred">{isEn ? "Document archive" : "Tài liệu theo phiên bản"}</div>
              <h2 className="mt-1 text-xl font-bold text-slate-950">{isEn ? "Programme versions" : "Các phiên bản chương trình"}</h2>
            </div>
            <StatusBadge isEn={isEn} />
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {archive.map((item) => (
              <div key={item.year} className="grid gap-2 py-5 sm:grid-cols-[100px_minmax(0,1fr)_auto] sm:items-start sm:gap-5">
                <div className="font-mono text-sm font-bold text-brand-blue">{item.year}</div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold leading-6 text-slate-900">{isEn ? item.titleEn : item.titleVi}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{isEn ? item.detailEn : item.detailVi}</p>
                </div>
                <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-brand-darkred hover:text-brand-darkred-dark">
                  {isEn ? "View PDF" : "Xem tài liệu"}<ExternalLink className="size-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <div className="text-xs font-bold uppercase text-slate-500">{isEn ? "Full-time undergraduate education programme" : "Chương trình giáo dục đại học hệ chính quy theo tiếp cận CDIO"}</div>
            <h2 className="mt-2 text-xl font-extrabold uppercase leading-7 text-slate-950 sm:text-2xl">{isEn ? "Electronics and Telecommunications Engineering" : "Ngành Kỹ thuật Điện tử - Viễn thông"}</h2>
          </div>

          <dl className="grid gap-x-8 gap-y-3 border-y border-slate-200 py-6 text-sm sm:grid-cols-[190px_1fr]">
            {[
              [isEn ? "Programme name" : "Tên chương trình", isEn ? "Electronics and Telecommunications Engineering" : "Kỹ thuật Điện tử - Viễn thông"],
              [isEn ? "Education level" : "Trình độ đào tạo", isEn ? "Undergraduate" : "Đại học"],
              [isEn ? "Programme code" : "Mã ngành", "7520207"],
              [isEn ? "Mode of study" : "Loại hình đào tạo", isEn ? "Full-time" : "Chính quy, tập trung"],
              [isEn ? "Duration" : "Thời gian đào tạo", isEn ? "4.5 years (9 semesters)" : "4,5 năm (9 học kỳ)"],
              [isEn ? "Award" : "Văn bằng được cấp", isEn ? "Engineer in Electronics and Telecommunications" : "Kỹ sư Điện tử - Viễn thông"],
              [isEn ? "Total credits" : "Khối lượng chương trình", isEn ? "150 credits" : "150 tín chỉ"],
            ].map(([term, description]) => (
              <div key={String(term)} className="grid grid-cols-[minmax(120px,190px)_1fr] gap-3 sm:contents">
                <dt className="font-semibold text-slate-600">{term}</dt>
                <dd className="font-bold text-slate-900">{description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-slate-200 py-9">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-md bg-brand-blue text-sm font-bold text-white">1</span>
            <h2 className="text-xl font-bold text-slate-950">{isEn ? "Programme objectives" : "Mục tiêu đào tạo"}</h2>
          </div>
          <h3 className="text-base font-bold italic text-slate-900">{isEn ? "General objective (PO)" : "Mục tiêu chung (PO)"}</h3>
          <p className="mt-3 text-[15px] leading-7 text-slate-700">
            {isEn ? "Graduates have the professional capability, ethics and health to conceive, design, implement and operate electronics and telecommunications systems that respond to social development and international integration." : "Sinh viên tốt nghiệp có năng lực chuyên môn, phẩm chất chính trị, đạo đức và sức khỏe tốt; có khả năng hình thành ý tưởng, thiết kế, triển khai và vận hành các hệ thống Điện tử, Viễn thông đáp ứng yêu cầu phát triển xã hội và hội nhập quốc tế."}
          </p>
          <h3 className="mt-7 text-base font-bold italic text-slate-900">{isEn ? "Specific objectives (POs)" : "Mục tiêu cụ thể (POs)"}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{isEn ? "Within two to three years after graduation, learners are expected to:" : "Sau từ 2 đến 3 năm tốt nghiệp, người học có khả năng:"}</p>
          <div className="mt-4 overflow-hidden border border-slate-300">
            {programmeObjectives.map((item) => (
              <div key={item.code} className="grid grid-cols-[64px_1fr] border-b border-slate-300 last:border-b-0">
                <div className="grid place-items-center border-r border-slate-300 bg-slate-50 p-3 font-mono text-sm font-bold text-brand-blue">{item.code}</div>
                <p className="p-3 text-sm leading-6 text-slate-700">{isEn ? item.en : item.vi}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 py-9">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-md bg-brand-darkred text-sm font-bold text-white">2</span>
            <h2 className="text-xl font-bold text-slate-950">{isEn ? "Programme learning outcomes" : "Chuẩn đầu ra chương trình"}</h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {outcomes.map((item) => (
              <div key={item.code} className="grid gap-2 py-4 sm:grid-cols-[90px_1fr]">
                <span className="font-mono text-sm font-bold text-brand-darkred">{item.code}</span>
                <p className="text-sm leading-6 text-slate-700">{isEn ? item.en : item.vi}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 pt-9">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-md bg-emerald-700 text-sm font-bold text-white">3</span><h2 className="text-xl font-bold text-slate-950">{isEn ? "Curriculum preview" : "Khung chương trình"}</h2></div>
            <span className="text-xs font-semibold text-slate-500">{isEn ? "2022 version · 150 credits" : "Phiên bản 2022 · 150 tín chỉ"}</span>
          </div>
          <CurriculumTable isEn={isEn} courses={courses.slice(0, 6)} />
        </section>
      </article>
    </div>
  );
}

export function UndergraduatePrototype({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const requested = searchParams.get("variant")?.toUpperCase();
  const variant: Variant = requested === "B" || requested === "C" || requested === "D" ? requested : "A";
  const [version, setVersion] = useState("2022");

  return <><div data-prototype-variant={variant}>{variant === "A" && <VariantA locale={locale} version={version} setVersion={setVersion} />}{variant === "B" && <VariantB locale={locale} version={version} setVersion={setVersion} />}{variant === "C" && <VariantC locale={locale} version={version} setVersion={setVersion} />}{variant === "D" && <VariantD locale={locale} />}</div><PrototypeSwitcher current={variant} locale={locale} /></>;
}
