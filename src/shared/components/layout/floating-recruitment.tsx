"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { GraduationCap, Phone, MessageSquare } from "lucide-react";

export function FloatingRecruitment() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Xác định ngôn ngữ hiện tại từ URL
  const isEn = pathname.startsWith("/en");

  // Bản dịch tự định nghĩa cục bộ để đảm bảo hoạt động độc lập, không bị lỗi thiếu khóa dịch
  const content = {
    title: isEn ? "Admission Support" : "Hỗ trợ Tuyển sinh",
    cta: isEn ? "Apply Now" : "Xét tuyển Online",
    ctaDesc: isEn ? "Register for admission" : "Đăng ký xét tuyển trực tuyến",
    messenger: isEn ? "Chat with us" : "Chat Messenger",
    messengerDesc: isEn ? "Direct support on FB" : "Tư vấn trực tiếp qua Fanpage",
    hotline: isEn ? "Call Hotline" : "Gọi Hotline Tư vấn",
    hotlineDesc: "0238 3855 452",
    close: isEn ? "Close" : "Đóng",
  };

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Menu các lựa chọn liên hệ (hiển thị khi mở rộng) */}
      {isOpen && (
        <div className="mb-4 flex flex-col gap-3 items-end animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Lựa chọn 1: Đăng ký Xét tuyển */}
          <a
            href={isEn ? "/en/tin-tuc?category_slug=tuyen-sinh" : "/vi/tin-tuc?category_slug=tuyen-sinh"}
            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-lg border border-slate-100 hover:border-brand-darkred/30 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800 group-hover:text-brand-darkred transition-colors">
                {content.cta}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {content.ctaDesc}
              </p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-brand-darkred/10 text-brand-darkred rounded-lg group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </a>

          {/* Lựa chọn 2: Chat Messenger */}
          <a
            href="https://m.me/Vienktcn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-lg border border-slate-100 hover:border-blue-600/30 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {content.messenger}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {content.messengerDesc}
              </p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
          </a>

          {/* Lựa chọn 3: Hotline */}
          <a
            href="tel:02383855452"
            className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-lg border border-slate-100 hover:border-emerald-600/30 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                {content.hotline}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {content.hotlineDesc}
              </p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
          </a>
        </div>
      )}

      {/* Nút tròn chính (FAB) */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? content.close : content.title}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-brand-darkred to-red-600 text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Lớp pulse phát sáng nhẹ */}
        <span className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-40 group-hover:animate-none" />

        {/* Chuyển đổi icon xoay nhẹ */}
        <div className="relative w-6 h-6 flex items-center justify-center transition-transform duration-300 rotate-0 group-hover:rotate-12">
          {isOpen ? (
            <span className="text-lg font-bold select-none">✕</span>
          ) : (
            <GraduationCap className="w-6 h-6" />
          )}
        </div>

        {/* Nhãn giới thiệu dạng Tooltip phía trái (chỉ hiển thị khi đóng) */}
        {!isOpen && (
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-xs text-white text-xs font-bold whitespace-nowrap shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            {content.title}
          </span>
        )}
      </button>
    </div>
  );
}
