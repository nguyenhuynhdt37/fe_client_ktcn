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
      <div className={`space-y-3 py-2 ${className}`}>
        {/* Tiêu đề mục lục mỏng nhẹ, tinh tế */}
        <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-widest border-b border-slate-100 pb-2.5 mb-3 select-none">
          <List size={13} className="text-brand-darkred" />
          <span>{title}</span>
        </div>

        {/* Cấu trúc trục dọc (border-l) cực kỳ mảnh và sang trọng */}
        <nav className="relative pl-0.5">
          <ul className="border-l border-slate-100 space-y-1.5 relative py-0.5">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              
              return (
                <li
                  key={heading.id}
                  className={`relative transition-all duration-200 group rounded-r-none
                    ${heading.level === 3 ? "pl-7" : "pl-4"}
                    ${isActive 
                      ? "before:absolute before:-left-[1px] before:top-0 before:bottom-0 before:w-[2px] before:bg-brand-darkred bg-brand-darkred/[0.04]" 
                      : "before:absolute before:-left-[1px] before:top-0 before:bottom-0 before:w-0 before:bg-slate-200 hover:before:w-[1.5px] hover:bg-slate-50/80 before:transition-all"
                    }
                  `}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleLinkClick(e, heading.id)}
                    className={`block py-2 pr-3 leading-snug transition-all duration-200 text-justify
                      ${heading.level === 3 
                        ? "text-slate-400 group-hover:text-brand-darkred font-normal text-[13px]" 
                        : "text-slate-600 group-hover:text-brand-darkred font-medium text-[14px]"
                      }
                      ${isActive 
                        ? "!text-brand-darkred font-bold" 
                        : ""
                      }
                    `}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }

  // 2. RENDER VARIANT INLINE (Tinh chỉnh lại đẹp hơn cho Mobile/Tablet)
  return (
    <div className={`bg-slate-50/60 border border-slate-100/60/50 p-5 my-8 transition-all duration-300 w-full max-w-2xl rounded-sm ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100/40 select-none">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
          <List size={16} className="text-brand-darkred" />
          <span>{title}</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-darkred transition-colors duration-200 focus:outline-none"
        >
          <span>{isOpen ? collapseText : expandText}</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-3 pt-1">
          <ul className="space-y-2.5 text-sm">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              
              return (
                <li
                  key={heading.id}
                  style={{
                    paddingLeft: heading.level === 3 ? "1.5rem" : "0px",
                  }}
                  className="transition-all duration-200"
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleLinkClick(e, heading.id)}
                    className={`inline-block py-0.5 leading-snug transition-all duration-200 relative
                      ${heading.level === 3 
                        ? "text-slate-500 hover:text-brand-darkred text-[13px]" 
                        : "text-slate-700 hover:text-brand-darkred font-medium"
                      }
                      ${isActive 
                        ? "text-brand-darkred font-semibold pl-2.5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-2.5 before:bg-brand-darkred" 
                        : ""
                      }
                    `}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
