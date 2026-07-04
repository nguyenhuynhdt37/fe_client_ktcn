import { VisitorStatistics } from "./footer/visitor-statistics";
import { ContactInformation } from "./footer/contact-information";
import { QuickLinks } from "./footer/quick-links";
import { ExternalLinks } from "./footer/external-links";
import { FacebookFanpage } from "./footer/facebook-fanpage";
import { Copyright } from "./footer/copyright";

export function Footer() {
  return (
    <footer id="footer" className="bg-slate-50 text-slate-700 text-sm mt-auto border-t border-border/60">
      {/* 1. Thống kê truy cập */}
      <VisitorStatistics />

      {/* 2. Nội dung chính Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-start">
          {/* Cột 1: Thông tin liên hệ (Chiếm 40% = 2/5 cột) */}
          <div className="lg:col-span-2">
            <ContactInformation />
          </div>

          {/* Cột 2: Thông tin / Liên kết nhanh (Chiếm 20% = 1/5 cột) */}
          <div className="lg:col-span-1">
            <QuickLinks />
          </div>

          {/* Cột 3: Liên kết ngoài (Chiếm 20% = 1/5 cột) */}
          <div className="lg:col-span-1">
            <ExternalLinks />
          </div>

          {/* Cột 4: Facebook Fanpage (Chiếm 20% = 1/5 cột) */}
          <div className="lg:col-span-1">
            <FacebookFanpage />
          </div>
        </div>
      </div>

      {/* 3. Copyright Bar */}
      <Copyright />
    </footer>
  );
}
