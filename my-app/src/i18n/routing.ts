import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // Danh sách các locale được hỗ trợ
  locales: ["vi", "en"],

  // Locale mặc định khi không tìm thấy locale phù hợp trên URL
  defaultLocale: "vi",

  // Cấu hình localePrefix: 'always' (luôn hiển thị /vi hoặc /en trên URL)
  localePrefix: "always"
});

// Wrappers bao quanh API điều hướng Next.js tương thích với routing i18n
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
