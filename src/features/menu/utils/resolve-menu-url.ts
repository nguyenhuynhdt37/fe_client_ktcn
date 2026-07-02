import { MenuItemTreeNode } from "../types";

export function resolveMenuUrl(item: MenuItemTreeNode): string {
  // 1. Nếu là đường dẫn ngoài hoặc đã nhập trực tiếp URL
  if (item.target_type === "EXTERNAL_LINK") {
    return item.external_url || "#";
  }

  // 2. Nếu backend đã phân giải sẵn đường dẫn tương đối URL (VD: /tin-tuc/abc hoặc /bo-mon/xyz)
  if (item.target_info?.path && item.target_info.path.startsWith("/")) {
    return item.target_info.path;
  }

  // 3. Fallback thủ công nếu backend chưa phân giải kịp path
  const slug = item.target_info?.slug;
  if (!slug) return "#";

  switch (item.target_type) {
    case "CATEGORY":
      return `/tin-tuc/danh-muc/${slug}`;
    case "ARTICLE":
      return `/tin-tuc/${slug}`;
    case "DEPARTMENT":
      return `/bo-mon/${slug}`;
    case "PAGE":
      return `/page/${slug}`;
    default:
      return "#";
  }
}
