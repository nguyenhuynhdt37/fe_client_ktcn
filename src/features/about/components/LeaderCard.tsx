// src/features/about/components/LeaderCard.tsx
import { useTranslations } from "next-intl";
import { SafeImage } from "@/shared/components/ui/safe-image";
import type { LeaderProfile } from "../types/about.types";

interface LeaderCardProps {
  leader: LeaderProfile;
}

export function LeaderCard({ leader }: LeaderCardProps) {
  const t = useTranslations("about");

  return (
    <div className="border border-slate-100/60 rounded-sm bg-white overflow-hidden">
      {/* Ảnh chân dung */}
      <div className="relative aspect-[3/4] bg-slate-50">
        <SafeImage
          src={leader.imageUrl}
          alt={t(leader.nameKey)}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover"
        />
      </div>

      {/* Thông tin */}
      <div className="p-4 space-y-1.5 text-center">
        <p className="text-xs text-brand-darkred font-bold uppercase tracking-wider">
          {t(leader.titleKey)}
        </p>
        <h4 className="text-base font-bold text-slate-800">
          {t(leader.nameKey)}
        </h4>
        <p className="text-sm text-slate-600 font-medium">
          {t(leader.positionKey)}
        </p>
        {leader.specialtyKey && (
          <p className="text-xs text-slate-400 leading-relaxed">
            {t(leader.specialtyKey)}
          </p>
        )}
      </div>
    </div>
  );
}
