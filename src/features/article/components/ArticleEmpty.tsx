"use client";

import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Info, RotateCcw } from "lucide-react";

export function ArticleEmpty() {
  const router = useRouter();
  const tCommon = useTranslations("common");
  const tArticle = useTranslations("article");

  const handleReset = () => {
    // router.push của next-intl sẽ tự động chèn locale prefix
    router.push("/tin-tuc");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-slate-50/50 border border-dashed border-slate-100">
      <div className="p-3 bg-slate-100 rounded-full text-slate-400 mb-4">
        <Info size={28} />
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-1">
        {tArticle("empty")}
      </h3>
      <p className="text-xs text-slate-600 max-w-sm mb-6 leading-relaxed">
        {tCommon("not_found")}
      </p>
      <button
        onClick={handleReset}
        className="flex items-center gap-2 bg-brand-darkred hover:bg-brand-darkred-dark text-white px-5 py-2.5 text-xs font-bold transition rounded-sm  cursor-pointer"
      >
        <RotateCcw size={13} />
        {tCommon("clear_all")}
      </button>
    </div>
  );
}
