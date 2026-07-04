"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";

interface ArticleSearchProps {
  initialSearch: string;
}

export function ArticleSearch({ initialSearch }: ArticleSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("common");
  
  const [value, setValue] = useState(initialSearch);
  const isFirstRender = useRef(true);

  // Dùng Ref để lưu trữ searchParams hiện tại, tránh trigger useEffect khi các params khác (page, tag...) thay đổi
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  // Debounce search value
  useEffect(() => {
    // Bỏ qua lần render đầu tiên để tránh push URL trùng
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Chỉ trigger tìm kiếm khi value thực sự khác với parameter 'q' hiện tại trên URL
    const currentParams = searchParamsRef.current;
    const currentQuery = currentParams.get("q") || "";
    if (value === currentQuery) {
      return;
    }

    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      params.set("page", "1"); // Thay đổi search tự động reset page về 1
      
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}` as any, { scroll: false });
      });
    }, 400); // Debounce 400ms

    return () => {
      clearTimeout(handler);
    };
  }, [value, pathname, router]); // Loại bỏ searchParams khỏi dependencies để tránh reset trang khi params khác thay đổi

  // Đồng bộ state khi URL search params thay đổi từ bên ngoài (ví dụ bấm Clear All)
  const currentUrlQuery = searchParams.get("q") || "";
  useEffect(() => {
    setValue(currentUrlQuery);
  }, [currentUrlQuery]);

  const handleClear = () => {
    setValue("");
    const params = new URLSearchParams(searchParamsRef.current.toString());
    params.delete("q");
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}` as any, { scroll: false });
    });
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t("search_placeholder")}
          className="w-full pl-9 pr-8 py-2 text-sm border border-slate-200 focus:outline-none focus:border-brand-darkred focus:ring-1 focus:ring-brand-darkred rounded-none"
        />
        <Search className="absolute left-3 text-slate-400" size={14} />
        
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-0.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            type="button"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
