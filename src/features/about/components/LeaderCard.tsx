// src/features/about/components/LeaderCard.tsx
"use client";

import { SafeImage } from "@/shared/components/ui/safe-image";
import { Mail, Globe, BookOpen } from "lucide-react";
import type { StaffItem } from "@/features/lecturer/types/lecturer.types";

interface LeaderCardProps {
  leader: StaffItem;
  locale: string;
}

export function LeaderCard({ leader, locale }: LeaderCardProps) {
  const isEn = locale === "en";
  const name = isEn ? (leader.english_name || leader.full_name) : leader.full_name;
  const positionName = leader.position?.name || "";
  
  // Build academic credentials title (e.g., PGS.TS. or Assoc. Prof. Dr.)
  const title = [leader.academic_title, leader.degree].filter(Boolean).join(". ");

  return (
    <div className="border border-slate-200/80 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
      {/* Portrait Photo */}
      <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden group">
        <SafeImage
          src={leader.avatar_object_key || "/images/no-image-dhv.jpg"}
          alt={name}
          fill
          sizes="(max-w-768px) 100vw, 300px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
      </div>

      {/* Info details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5 text-center">
          <p className="text-[11px] text-brand-darkred font-semibold uppercase tracking-widest">
            {positionName}
          </p>
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {title ? `${title}. ` : ""}{name}
          </h3>
          {leader.research_interests && (
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {isEn ? "Research interests: " : "Lĩnh vực nghiên cứu: "}{leader.research_interests}
            </p>
          )}
        </div>

        {/* Contacts & Social triggers */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-center gap-4 text-slate-400">
          {leader.email && (
            <a
              href={`mailto:${leader.email}`}
              className="hover:text-brand-darkred transition-colors"
              title="Email"
            >
              <Mail size={16} />
            </a>
          )}
          {leader.website && (
            <a
              href={leader.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-darkred transition-colors"
              title="Website"
            >
              <Globe size={16} />
            </a>
          )}
          <a
            href={`/co-cau-to-chuc/giang-vien/${leader.slug}`}
            className="hover:text-brand-darkred transition-colors"
            title={isEn ? "View Profile" : "Xem hồ sơ"}
          >
            <BookOpen size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
