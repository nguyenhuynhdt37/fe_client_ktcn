import { MenuItemTreeNode } from "../types/menu.types";

export function resolveMenuUrl(item: MenuItemTreeNode): string {
  // 1. Nếu menu item được cấu hình không có link (ví dụ chỉ là parent menu chứa con)
  if (!item.has_link) {
    return "#";
  }

  // 2. Nếu là đường dẫn ngoài (External Link)
  if (item.target_type === "EXTERNAL_LINK") {
    return item.external_url || "#";
  }

  // 3. Phân giải theo từng loại TargetType của Portal
  const slug = item.target_info?.slug;
  if (!slug) return "#";

  switch (item.target_type) {
    case "CATEGORY":
      // Danh mục tin tức: Trỏ về trang tin tức có filter theo category_slug
      return `/tin-tuc?category_slug=${slug}`;
      
    case "ARTICLE":
    case "PAGE":
      // Bài viết chi tiết và Trang tĩnh: Đều trỏ về /[locale]/[slug] (được next-intl định cấu hình /tin-tuc/[slug])
      return `/tin-tuc/${slug}`;
      
    case "DEPARTMENT":
      // Bộ môn: Trỏ về trang chi tiết bộ môn /bo-mon/[slug]
      return `/bo-mon/${slug}`;
      
    case "MODULE":
      // Phân hệ/Module chức năng đặc thù (ví dụ: Lịch tuần)
      if (slug === "lich-tuan") {
        return "/lich-tuan";
      }
      return `/${slug}`;
      
    default:
      return "#";
  }
}
