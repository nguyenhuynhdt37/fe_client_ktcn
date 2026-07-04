import { PortalArticleResponse, PortalArticleListResponse } from "../types/article.types";

// Lấy trường dịch động từ Backend dựa trên locale hiện tại
export function getLocalizedField<T>(item: any, field: string, locale: string): T {
  if (!item) return "" as any;
  const localizedKey = `${field}_${locale}`;
  return (item[localizedKey] || item[field] || "") as T;
}

// Định dạng ngày theo locale của Next.js (vi-VN hoặc en-US)
export function formatDate(dateString: string, locale: string = "vi"): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const localeTag = locale === "en" ? "en-US" : "vi-VN";
  return date.toLocaleDateString(localeTag, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// Map sang cấu trúc hiển thị của FE với hỗ trợ i18n
export function mapPortalArticleToFE(item: PortalArticleResponse | PortalArticleListResponse, locale: string = "vi") {
  const title = getLocalizedField<string>(item, "title", locale);
  const categoryName = getLocalizedField<string>(item.category, "name", locale);

  return {
    id: item.id,
    title: title,
    imageUrl: item.thumbnail_object_key || "/images/no-image-dhv.jpg",
    category: categoryName,
    categoryHref: `/tin-tuc?category_slug=${item.category.slug}`,
    date: formatDate(item.published_at, locale),
    href: `/tin-tuc/${item.slug}`,
    isPinned: item.is_pinned
  };
}
