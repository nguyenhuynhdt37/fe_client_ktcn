import type { Metadata } from "next";
import { CheckCircle2, Headphones, MessageSquareText, Users } from "lucide-react";
import { ConsultationForm } from "@/features/consultation";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Đăng ký tư vấn tuyển sinh",
  description:
    "Đăng ký để được Trường Kỹ thuật và Công nghệ - Đại học Vinh tư vấn ngành học và phương thức xét tuyển.",
};

export default function ConsultationPage() {
  return (
    <main className="bg-section-alt min-h-screen">
      <div className="site-container py-7 sm:py-10 lg:py-12">
        <Breadcrumb items={[{ name: "Trang chủ", href: "/" }, { name: "Tư vấn tuyển sinh" }]} />

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
          <section className="lg:pt-4">
            <p className="text-brand-orange text-sm font-bold">Đồng hành cùng bạn</p>
            <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Đăng ký tư vấn tuyển sinh
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
              Hãy để lại thông tin và điều bạn đang quan tâm. Đội ngũ tuyển sinh sẽ chủ động liên
              hệ, giải đáp rõ ràng và phù hợp với nhu cầu của bạn.
            </p>

            <ul className="mt-8 space-y-5">
              <Benefit
                icon={MessageSquareText}
                title="Tư vấn đúng câu hỏi"
                description="Ngành học, phương thức xét tuyển, học phí và cơ hội nghề nghiệp."
              />
              <Benefit
                icon={Headphones}
                title="Chủ động liên hệ"
                description="Nhà trường liên hệ qua số điện thoại bạn cung cấp."
              />
              <Benefit
                icon={Users}
                title="Dành cho thí sinh và phụ huynh"
                description="Thông tin dễ hiểu, thiết thực cho từng nhu cầu."
              />
            </ul>

            <div className="border-brand-blue/15 bg-brand-blue/5 mt-8 rounded-[var(--radius-md)] border p-4">
              <p className="text-foreground flex items-start gap-3 text-sm leading-6">
                <CheckCircle2
                  className="text-brand-blue mt-0.5 size-5 shrink-0"
                  aria-hidden="true"
                />
                Việc gửi form không phải là hồ sơ xét tuyển chính thức. Bộ phận tuyển sinh sẽ hướng
                dẫn bạn các bước tiếp theo nếu cần.
              </p>
            </div>
          </section>

          <ConsultationForm />
        </div>
      </div>
    </main>
  );
}

function Benefit({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof MessageSquareText;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="bg-brand-orange/10 text-brand-orange inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-foreground font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-1 text-sm leading-6">{description}</p>
      </div>
    </li>
  );
}
