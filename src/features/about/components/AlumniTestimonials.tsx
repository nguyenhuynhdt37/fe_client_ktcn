import { SafeImage } from "@/shared/components/ui/safe-image";
import { Quote, Sparkles } from "lucide-react";

interface AlumniTestimonialItem {
  id: string;
  name: string;
  major: string;
  company: string;
  content: string;
  avatarUrl?: string;
  avatarText?: string;
}

interface AlumniTestimonialsProps {
  isEn: boolean;
}

export function AlumniTestimonials({ isEn }: AlumniTestimonialsProps) {
  const testimonials: AlumniTestimonialItem[] = [
    {
      id: "1",
      name: "Nguyễn Văn Hùng",
      major: isEn ? "Class of K56 IT" : "K56 Công nghệ thông tin",
      company: "Tech Lead @ FPT Software",
      content: isEn
        ? "The foundational knowledge and dedicated guidance from ICT department professors helped me confidently lead large-scale global software projects."
        : "Những kiến thức nền tảng tại trường, cùng sự hướng dẫn tận tình của các thầy cô khoa CNTT đã giúp tôi tự tin làm việc tại các dự án phần mềm quy mô lớn toàn cầu.",
      avatarText: "H",
    },
    {
      id: "2",
      name: "Trần Thị Mai",
      major: isEn ? "Class of K58 Automation" : "K58 Tự động hóa",
      company: "IoT Engineer @ Viettel High Tech",
      content: isEn
        ? "Modern practice environments and dedicated research labs at VinhUni were the greatest launchpads for my career in smart system integration."
        : "Môi trường thực hành hiện đại, các phòng lab IoT và thầy cô luôn tạo điều kiện tối đa để sinh viên tham gia nghiên cứu khoa học là bệ phóng lớn nhất cho sự nghiệp của tôi.",
      avatarText: "M",
    },
    {
      id: "3",
      name: "Phạm Minh Đức",
      major: isEn ? "Class of K55 Electronics" : "K55 Điện tử viễn thông",
      company: "IC Design Engineer @ Synopsys",
      content: isEn
        ? "VinhUni's serious and methodical academic training in semiconductor and circuit design allowed me to adapt instantly to international working environments."
        : "Ngành vi mạch bán dẫn đòi hỏi độ chính xác cao. Sự rèn luyện nghiêm túc và bài bản từ giảng đường VinhUni đã giúp tôi nhanh chóng thích nghi với môi trường làm việc quốc tế.",
      avatarText: "Đ",
    },
    {
      id: "4",
      name: "Lê Hoàng Nam",
      major: isEn ? "Class of K57 Automotive" : "K57 Kỹ thuật Ô tô",
      company: "Service Lead @ VinFast",
      content: isEn
        ? "Learning by doing in specialized automotive workshops gave me both the hand-on skills and leadership confidence to manage high-end service stations."
        : "Học đi đôi với hành, những ngày làm việc tại xưởng thực hành ô tô giúp tôi rèn luyện tay nghề và kỹ năng quản lý, tự tin vận hành các trạm dịch vụ chuyên nghiệp.",
      avatarText: "N",
    },
    {
      id: "5",
      name: "Hoàng Khánh Vy",
      major: isEn ? "Class of K59 Computer Science" : "K59 Khoa học máy tính",
      company: "AI Engineer @ VinAI",
      content: isEn
        ? "CS&AI faculty gave me early access to machine learning. Academic mentorship shaped my scientific pathway in computer vision and artificial intelligence."
        : "Khoa CS&AI đã cho tôi cơ hội tiếp cận với các thuật toán học máy hiện đại rất sớm. Sự đồng hành của các thầy cô giúp tôi định hình con đường nghiên cứu AI chuyên sâu.",
      avatarText: "V",
    },
    {
      id: "6",
      name: "Nguyễn Quốc Bảo",
      major: isEn ? "Class of K56 Electrical Eng" : "K56 Kỹ thuật điện",
      company: "Grid Operations @ EVN NPC",
      content: isEn
        ? "Managing the power grid is a major responsibility. Lessons on smart power grids and renewable energy at the college remain my daily operational guide."
        : "Đảm bảo dòng điện ổn định là trách nhiệm lớn. Những bài học về lưới điện thông minh tại trường luôn là kim chỉ nam trong công việc vận hành hàng ngày của tôi.",
      avatarText: "B",
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-slate-50/40 border-t border-slate-100/60">
      <div className="max-w-[1360px] mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-darkred bg-brand-darkred/6 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? "Alumni Success" : "Cựu sinh viên tiêu biểu"}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">
            {isEn ? "Graduate Success Stories" : "Gương mặt Cựu sinh viên tiêu biểu"}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {isEn
              ? "The success of our alumni is our pride and the ultimate proof of our educational quality."
              : "Sự thành công của cựu sinh viên là niềm tự hào và lời khẳng định rõ ràng nhất cho chất lượng đào tạo của Nhà trường."}
          </p>
        </div>

        {/* Grid of testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1200px] mx-auto">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between bg-white border border-slate-200/80 rounded-xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 relative hover:-translate-y-0.5 animate-fade-in"
            >
              {/* Quote icon at top-left */}
              <div className="absolute top-5 left-6 text-slate-100 group-hover:text-brand-darkred/10 transition-colors duration-300">
                <Quote className="h-8 w-8" style={{ transform: "scaleX(-1)" }} />
              </div>

              <div className="relative pt-6 space-y-4">
                <p className="text-sm leading-relaxed text-slate-600 italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* User details at bottom */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-4">
                <div className="relative size-11 rounded-full overflow-hidden bg-brand-darkred/10 text-brand-darkred border border-brand-darkred/20 flex items-center justify-center font-bold text-sm select-none shrink-0">
                  {item.avatarUrl ? (
                    <SafeImage src={item.avatarUrl} alt={item.name} fill className="object-cover" />
                  ) : (
                    <span>{item.avatarText}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-brand-darkred transition-colors duration-150 truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold truncate mt-0.5">
                    {item.major} &middot; {item.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
