"use client";

import { useState, useEffect } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import { HeadingItem } from "../utils/parse-headings";

interface TableOfContentsProps {
  headings: HeadingItem[];
  title?: string;
  expandText?: string;
  collapseText?: string;
  variant?: "inline" | "sidebar";
  className?: string;
}

export function TableOfContents({
  headings,
  title = "Mục lục nội dung",
  expandText = "Hiện",
  collapseText = "Ẩn",
  variant = "inline",
  className = "",
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>("");

  // Tạo số thứ tự phân cấp cho các heading (ví dụ: 1., 1.1., 2., 2.1., ...)
  let h2Count = 0;
  let h3Count = 0;
  
  const headingsWithNumbers = headings.map((heading) => {
    if (heading.level === 2) {
      h2Count++;
      h3Count = 0; // reset h3 counter
      return {
        ...heading,
        numbering: `${h2Count}.`,
      };
    } else if (heading.level === 3) {
      h3Count++;
      return {
        ...heading,
        numbering: `${h2Count}.${h3Count}.`,
      };
    }
    return {
      ...heading,
      numbering: "",
    };
  });

  // Thuật toán Scrollspy: Theo dõi vị trí cuộn để highlight mục lục tương ứng
  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    const handleScroll = () => {
      // Khoảng cách từ đỉnh màn hình để kích hoạt highlight (bù trừ cho sticky header)
      const scrollOffset = 140;
      const scrollPosition = window.scrollY + scrollOffset;

      // Tìm tiêu đề hiện tại đang nằm trong tầm nhìn
      let currentActiveId = "";

      for (let i = 0; i < headingElements.length; i++) {
        const currentEl = headingElements[i];
        const nextEl = headingElements[i + 1];

        const currentTop = currentEl.offsetTop;
        const nextTop = nextEl ? nextEl.offsetTop : Infinity;

        if (scrollPosition >= currentTop && scrollPosition < nextTop) {
          currentActiveId = currentEl.id;
          break;
        }
      }

      // Nếu cuộn lên trên cùng, chưa chạm tới heading đầu tiên
      if (!currentActiveId && headingElements.length > 0 && scrollPosition < headingElements[0].offsetTop) {
        currentActiveId = "";
      }
      
      // Trường hợp cuộn xuống dưới cùng của trang, highlight heading cuối cùng
      if (!currentActiveId && headingElements.length > 0) {
        const lastEl = headingElements[headingElements.length - 1];
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
          currentActiveId = lastEl.id;
        }
      }

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings, activeId]);

  if (headings.length === 0) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  // 1. RENDER VARIANT SIDEBAR (Word-like Navigation Pane - Premium Floating Style)
  if (variant === "sidebar") {
    return (
      <div className={`bg-white border border-slate-100 rounded-sm p-4 space-y-4 shadow-sm shadow-slate-50/50 ${className}`}>
        {/* Tiêu đề mục lục mỏng nhẹ, tinh tế */}
        <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider border-b border-slate-100 pb-3 mb-2 select-none">
          <List size={14} className="text-brand-darkred" />
          <span>{title}</span>
        </div>

        {/* Cấu trúc trục dọc (border-l) cực kỳ mảnh và sang trọng */}
        <nav className="relative pl-0.5">
          <ul className="border-l-2 border-slate-100 space-y-1 relative py-0.5">
            {headingsWithNumbers.map((heading) => {
              const isActive = activeId === heading.id;
              
              return (
                <li
                  key={heading.id}
                  className={`relative transition-all duration-200 group py-1 pr-2
                    ${heading.level === 3 ? "pl-5" : "pl-3"}
                    ${isActive 
                      ? "before:absolute before:-left-[2px] before:top-0 before:bottom-0 before:w-[2px] before:bg-brand-darkred bg-brand-darkred/[0.02] pl-4 font-bold" 
                      : "before:absolute before:-left-[2px] before:top-0 before:bottom-0 before:w-0 before:bg-slate-200 hover:before:w-[2px] hover:bg-slate-50/50 before:transition-all hover:pl-4"
                    }
                  `}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleLinkClick(e, heading.id)}
                    className={`flex items-start gap-1.5 py-0.5 leading-snug transition-all duration-200 text-justify text-[13px]
                      ${heading.level === 3 
                        ? "text-slate-500 group-hover:text-brand-darkred font-normal" 
                        : "text-slate-700 group-hover:text-brand-darkred font-medium"
                      }
                      ${isActive 
                        ? "!text-brand-darkred" 
                        : ""
                      }
                    `}
                  >
                    <span className={`font-mono text-[11px] font-bold mt-0.5 ${isActive ? "text-brand-darkred" : "text-slate-400 group-hover:text-brand-darkred"}`}>
                      {heading.numbering}
                    </span>
                    <span className="flex-1">{heading.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }

  // 2. RENDER VARIANT INLINE (Thiết kế phù hợp hệ thống, tối ưu responsive full ngang trên Mobile & iPad)
  return (
    <div className={`bg-slate-50/80 border border-slate-200/60 p-5 my-8 rounded-sm shadow-sm shadow-slate-100/50 w-full lg:max-w-3xl relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-brand-darkred ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 select-none">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
          <List size={14} className="text-brand-darkred" />
          <span>{title}</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-sm text-[11px] font-bold text-slate-600 hover:text-brand-darkred shadow-sm transition-all duration-150 cursor-pointer focus:outline-none"
        >
          <span>{isOpen ? collapseText : expandText}</span>
          <ChevronDown size={11} className={`text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <nav className="pt-1">
          <ul className="space-y-0.5 text-sm">
            {headingsWithNumbers.map((heading) => {
              const isActive = activeId === heading.id;
              
              return (
                <li
                  key={heading.id}
                  style={{
                    paddingLeft: heading.level === 3 ? "1.25rem" : "0px",
                  }}
                  className={`py-1.5 border-b border-dashed border-slate-200/60 last:border-b-0 transition-all duration-150 ${
                    isActive ? "bg-brand-darkred/[0.02] -mx-2 px-2 rounded-sm" : ""
                  }`}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleLinkClick(e, heading.id)}
                    className={`flex items-start gap-2 py-0.5 leading-snug transition-all duration-150 group/item hover:translate-x-0.5
                      ${heading.level === 3 
                        ? "text-slate-500 hover:text-brand-darkred text-[13px]" 
                        : "text-slate-700 hover:text-brand-darkred font-medium text-[13.5px]"
                      }
                      ${isActive 
                        ? "text-brand-darkred font-bold" 
                        : ""
                      }
                    `}
                  >
                    <span className={`font-mono text-[11px] font-bold mt-0.5 ${isActive ? "text-brand-darkred" : "text-slate-400 group-hover/item:text-brand-darkred"}`}>
                      {heading.numbering}
                    </span>
                    <span className="flex-1">{heading.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
