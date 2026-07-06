import { ArrowRight, Clock3, PhoneCall, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export function ConsultationCallout() {
  return (
    <section className="site-container py-8 sm:py-10">
      <div className="border-brand-blue/15 bg-brand-blue relative overflow-hidden rounded-[var(--radius-lg)] border p-6 text-white shadow-[var(--shadow-md)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <p className="text-brand-yellow text-sm font-semibold">Hỗ trợ thí sinh và phụ huynh</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Bạn cần tư vấn chọn ngành hoặc phương thức xét tuyển?
          </h2>
          <p className="mt-3 leading-7 text-white/80">
            Gửi thông tin để bộ phận tuyển sinh hỗ trợ đúng nhu cầu, hoàn toàn miễn phí.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <Clock3 className="size-4 text-white" aria-hidden="true" />
              Phản hồi sớm
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-white" aria-hidden="true" />
              Bảo mật thông tin
            </span>
            <span className="flex items-center gap-2">
              <PhoneCall className="size-4 text-white" aria-hidden="true" />
              Tư vấn đúng nhu cầu
            </span>
          </div>
        </div>
        <Link
          href="/tu-van-tuyen-sinh"
          className={cn(
            buttonVariants({ size: "lg" }),
            "text-brand-blue mt-6 shrink-0 bg-white hover:bg-white/90 lg:mt-0",
          )}
        >
          Đăng ký tư vấn
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
