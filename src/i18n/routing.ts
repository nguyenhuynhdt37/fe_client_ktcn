import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // Danh sách các locale được hỗ trợ
  locales: ["vi", "en"],

  // Locale mặc định khi không tìm thấy locale phù hợp trên URL
  defaultLocale: "vi",

  // Cấu hình localePrefix: 'always' (luôn hiển thị /vi hoặc /en trên URL)
  localePrefix: "always",

  // Bản địa hóa đường dẫn (Localized Pathnames) tối ưu SEO theo ngôn ngữ
  pathnames: {
    "/": "/",
    "/tin-tuc": {
      vi: "/tim-kiem",
      en: "/search",
    },
    "/tin-tuc/[slug]": {
      vi: "/[slug]",
      en: "/[slug]",
    },
    "/bo-mon/[slug]": {
      vi: "/bo-mon/[slug]",
      en: "/departments/[slug]",
    },
    "/nhan-su/[slug]": {
      vi: "/nhan-su/[slug]",
      en: "/staffs/[slug]",
    },
    "/lich-tuan": {
      vi: "/lich-tuan",
      en: "/weekly-calendar",
    },
    "/gioi-thieu": {
      vi: "/gioi-thieu",
      en: "/about",
    },
    "/tu-van-tuyen-sinh": {
      vi: "/tu-van-tuyen-sinh",
      en: "/admissions-consultation",
    },
    "/thong-bao": {
      vi: "/thong-bao",
      en: "/notifications",
    },
  },
});

// Wrappers bao quanh API điều hướng Next.js tương thích với routing i18n
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
