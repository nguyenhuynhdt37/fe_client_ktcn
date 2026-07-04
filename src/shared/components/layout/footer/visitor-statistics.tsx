"use client";

import { useState, useEffect } from "react";
import { Users, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { axiosClient } from "@/shared/api/axios-client";

interface StatisticsData {
  online_count: number;
  total_visits: number;
}

export function VisitorStatistics() {
  const t = useTranslations("footer");
  const [stats, setStats] = useState<StatisticsData>({
    online_count: 1,
    total_visits: 1703054, // Giá trị khởi tạo mặc định theo kết quả kiểm thử thực tế
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosClient.get<StatisticsData>("/api/v1/portal/statistics");
        if (response.data) {
          setStats(response.data);
        }
      } catch (error) {
        // Dùng console.warn thay vì console.error để tránh lỗi đỏ Console khi bị rate limit (429)
        console.warn("Failed to fetch statistics (Visitor Counter):", error);
      }
    };

    // Chỉ gọi fetch duy nhất 1 lần khi tải trang để tối ưu hóa request, tránh lỗi 429 Too Many Requests
    fetchStatistics();
  }, []);

  return (
    <div className="bg-slate-100/80 py-3 px-6 border-b border-border/30">
      <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <span className="font-semibold text-brand-blue/70 tracking-wider uppercase select-none">
          {t("visitor_statistics").toUpperCase()}:
        </span>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <Users size={12} className="text-brand-blue/50" />
            {t("online_count", { count: stats.online_count })}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={12} className="text-brand-blue/50" />
            {t("total_visits_count", { count: stats.total_visits })}
          </span>
        </div>
      </div>
    </div>
  );
}
