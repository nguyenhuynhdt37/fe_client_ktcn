import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { WeeklyCalendarDashboard } from "../components/weekly-calendar-dashboard";
import { calendarService } from "../services/calendarService";
import { formatDate } from "@/features/article/utils/map-article";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";

interface WeeklyCalendarPageProps {
  locale: string;
  page?: string;
}

export async function WeeklyCalendarPage({ locale, page }: WeeklyCalendarPageProps) {
  // Thiết lập locale để kích hoạt static rendering / server rendering đa ngôn ngữ
  setRequestLocale(locale);

  const currentPage = parseInt(page || "1");

  // 1. Gọi API lấy danh sách bài viết lịch tuần để lấy tuần mới nhất
  const articlesData = await calendarService.getWeeklyCalendars(currentPage, locale);

  const listItems =
    articlesData?.items.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      publishedAt: formatDate(item.published_at, locale),
    })) || [];

  // 2. Tự động chuyển hướng (Redirect) trực tiếp đến bài viết lịch tuần mới nhất kèm query page=1
  const latestArticle = listItems[0];
  if (latestArticle) {
    const targetPath =
      locale === "en"
        ? `/en/weekly-calendar/${latestArticle.slug}?page=1`
        : `/vi/lich-tuan/${latestArticle.slug}?page=1`;
    redirect(targetPath);
  }

  // Cấu hình fallback trong trường hợp hoàn toàn không có lịch tuần nào trong Database
  const mappedActiveArticle = {
    id: "empty",
    title: locale === "en" ? "No Calendar Available" : "Không có lịch công tác",
    excerpt: "",
    content: `<p class="text-slate-400 italic text-center py-8">${
      locale === "en"
        ? "No calendar has been published yet."
        : "Chưa có lịch công tác nào được đăng tải."
    }</p>`,
    publishedAt: "",
  };

  return (
    <main className="site-container space-y-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { name: locale === "en" ? "Home" : "Trang chủ", href: "/" },
          { name: locale === "en" ? "Weekly Calendar" : "Lịch công tác tuần" },
        ]}
      />

      {/* Render Dashboard Lịch tuần rỗng */}
      <WeeklyCalendarDashboard
        activeArticle={mappedActiveArticle}
        listItems={listItems}
        activeSlug=""
        currentPage={currentPage}
        totalPages={articlesData?.total_pages || 1}
        hasNext={articlesData?.has_next || false}
        hasPrevious={articlesData?.has_previous || false}
        locale={locale}
      />
    </main>
  );
}
