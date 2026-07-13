import { setRequestLocale } from "next-intl/server";
import { WeeklyCalendarDetailPage } from "@/features/calendar";
import { articleService } from "@/features/article";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Cấu hình Metadata động từ dữ liệu bài viết lịch tuần của API
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await articleService.getArticleDetail(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";
  const isEn = locale === "en";

  if (!article) {
    return {
      title: locale === "en" ? "Calendar Not Found" : "Không tìm thấy lịch công tác",
    };
  }

  const title = article.seo_title || article.title;
  const description = article.seo_description || article.excerpt || "";

  return {
    title,
    description,
    robots: article.robots || "index, follow",
    alternates: {
      canonical: `${siteUrl}/${locale}/${isEn ? "weekly-calendar" : "lich-tuan"}/${slug}`,
      languages: {
        vi: `${siteUrl}/vi/lich-tuan/${slug}`,
        en: `${siteUrl}/en/weekly-calendar/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/${isEn ? "weekly-calendar" : "lich-tuan"}/${slug}`,
      siteName: isEn ? "SET VinhUni" : "Trường Kỹ thuật và Công nghệ - Đại học Vinh",
      locale: isEn ? "en_US" : "vi_VN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CalendarDetailPage({ params, searchParams }: PageProps) {
  const { slug, locale } = await params;

  // Thiết lập locale để kích hoạt static rendering / server rendering đa ngôn ngữ
  setRequestLocale(locale);

  const { page } = await searchParams;

  return <WeeklyCalendarDetailPage locale={locale} slug={slug} page={page} />;
}
