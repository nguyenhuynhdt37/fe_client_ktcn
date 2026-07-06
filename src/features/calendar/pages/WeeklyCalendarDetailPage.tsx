import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { WeeklyCalendarDashboard } from "../components/weekly-calendar-dashboard";
import { calendarService } from "../services/calendarService";
import { formatDate } from "@/features/article/utils/map-article";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";

interface WeeklyCalendarDetailPageProps {
  locale: string;
  slug: string;
  page?: string;
}

export async function WeeklyCalendarDetailPage({
  locale,
  slug,
  page,
}: WeeklyCalendarDetailPageProps) {
  // Thiết lập locale để kích hoạt static rendering / server rendering đa ngôn ngữ
  setRequestLocale(locale);

  const currentPage = parseInt(page || "1");

  // Gọi đồng thời API chi tiết lịch tuần đang chọn và danh sách lịch tuần ở Sidebar thông qua calendarService
  const [article, articlesData] = await Promise.all([
    calendarService.getWeeklyCalendarDetail(slug),
    calendarService.getWeeklyCalendars(currentPage, locale),
  ]);

  if (!article) {
    notFound();
  }

  // Ánh xạ dữ liệu bài viết đang chọn
  const mappedActiveArticle = {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    publishedAt: formatDate(article.published_at, locale),
    authorName: article.author?.full_name || undefined,
  };

  // Ánh xạ danh sách lịch tuần ở Sidebar
  const listItems =
    articlesData?.items.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      publishedAt: formatDate(item.published_at, locale),
    })) || [];

  return (
    <main className="site-container space-y-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { name: locale === "en" ? "Home" : "Trang chủ", href: "/" },
          {
            name: locale === "en" ? "Weekly Calendar" : "Lịch công tác tuần",
            href: "/lich-tuan",
          },
          { name: article.title },
        ]}
      />

      {/* Render Dashboard Lịch tuần */}
      <WeeklyCalendarDashboard
        activeArticle={mappedActiveArticle}
        listItems={listItems}
        activeSlug={slug}
        currentPage={currentPage}
        totalPages={articlesData?.total_pages || 1}
        hasNext={articlesData?.has_next || false}
        hasPrevious={articlesData?.has_previous || false}
        locale={locale}
      />
    </main>
  );
}
