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
    <div className="border-border border-b bg-white py-3">
      <div className="site-container flex flex-col items-center justify-between gap-2 text-sm text-slate-600 sm:flex-row">
        <span className="text-brand-blue font-semibold select-none">
          {t("visitor_statistics")}:
        </span>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <Users size={15} className="text-brand-blue/70" aria-hidden="true" />
            {t("online_count", { count: stats.online_count })}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={15} className="text-brand-blue/70" aria-hidden="true" />
            {t("total_visits_count", { count: stats.total_visits })}
          </span>
        </div>
      </div>
    </div>
  );
}
