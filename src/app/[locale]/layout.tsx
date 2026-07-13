import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import type { Metadata } from "next";
import Image from "next/image";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { RootProviders } from "@/shared/providers/root-providers";
import { FireworksCelebrate } from "@/shared/components/FireworksCelebrate";
import { FloatingMessenger } from "@/shared/components/layout/FloatingMessenger";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

// Sinh static params cho locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Cấu hình Metadata API chuẩn cho SEO đa ngôn ngữ
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";

  const isEn = locale === "en";
  const titleDefault = isEn
    ? "SET VinhUni Portal - College of Engineering and Technology"
    : "Portal Trường Kỹ thuật và Công nghệ - Đại học Vinh";
  const descDefault = isEn
    ? "Integrated Portal of College of Engineering and Technology - Vinh University - set.vinhuni.edu.vn"
    : "Cổng thông tin tích hợp Portal Trường Kỹ thuật và Công nghệ - Đại học Vinh - set.vinhuni.edu.vn";

  return {
    title: {
      default: titleDefault,
      template: `%s | ${isEn ? "SET VinhUni Portal" : "Portal SET VinhUni"}`,
    },
    description: descDefault,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        vi: "/vi",
        en: "/en",
        "x-default": "/vi",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: titleDefault,
      description: descDefault,
      url: `/${locale}`,
      siteName: isEn ? "SET VinhUni Portal" : "Portal SET VinhUni",
      locale: isEn ? "en_US" : "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description: descDefault,
    },
    icons: {
      icon: [
        { url: "/images/logo-32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/logo-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [
        { url: "/images/logo-180.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

import { TopBar } from "@/shared/components/layout/top-bar";
import { Header } from "@/shared/components/layout/header";
import { Footer } from "@/shared/components/layout/footer";
import { menuService } from "@/features/menu";
import { languageService } from "@/features/language";
import { articleService } from "@/features/article";
import { MaintenanceHandler } from "@/shared/components/layout/MaintenanceHandler";

// Helper chuyển tiếng Việt có dấu thành không dấu, thay khoảng trắng bằng gạch ngang
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // remove duplicate -
}

function resolveMenuTreeSlugs(items: any[], articles: any[]) {
  for (const item of items) {
    if (item.target_type === "ARTICLE" || item.target_type === "PAGE") {
      if (!item.target_info?.slug) {
        const matchedArticle = articles.find((a) => a.id === item.target_id);
        if (matchedArticle) {
          item.target_info = {
            title: item.title || matchedArticle.title,
            slug: matchedArticle.slug
          };
          item.has_link = true;
        } else if (item.title) {
          item.target_info = {
            title: item.title,
            slug: toSlug(item.title)
          };
          item.has_link = true;
        }
      }
    }
    if (item.children && item.children.length > 0) {
      resolveMenuTreeSlugs(item.children, articles);
    }
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  noStore();
  const { locale } = await params;

  // Kiểm tra xem locale có hợp lệ không
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Cấu hình static rendering locale
  setRequestLocale(locale);

  // Load dictionary cho Client Components
  const messages = await getMessages();

  // Load menu, languages và articles từ Server song song để tối ưu Core Web Vitals
  let headerMenu = null;
  let footerMenu = null;
  let languages: any[] = [];
  let articles: any[] = [];
  let isMaintenance = false;

  try {
    const [headerRes, footerRes, langRes, articlesData] = await Promise.all([
      menuService.getMenuTree("header").catch(() => null),
      menuService.getMenuTree("footer").catch(() => null),
      languageService.getLanguages().catch(() => []),
      articleService.getLatestArticles({ page: 1, pageSize: 100 }).catch(() => null)
    ]);

    headerMenu = headerRes;
    footerMenu = footerRes;
    languages = langRes || [];
    articles = articlesData?.items || [];

    if (languages.length === 0 || !headerMenu) {
      isMaintenance = true;
    }
  } catch (err) {
    console.error("API connection failed in layout:", err);
    isMaintenance = true;
  }

  if (isMaintenance) {
    const isEn = locale === "en";
    return (
      <html
        lang={locale}
        className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      >
        <body className="h-full bg-slate-50 text-slate-800 flex flex-col justify-center items-center p-6">
          <MaintenanceHandler />
          <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 transition-all duration-300 hover:shadow-2xl">
            <div className="inline-flex items-center justify-center size-20 rounded-full bg-red-50 text-red-600 mb-6 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A1.75 1.75 0 0 1 14.75 23.5l-5.83-5.83M11.42 15.17l2.42-2.42M11.42 15.17 9 17.58M13.84 12.75 19.67 18.58A1.75 1.75 0 0 0 22.17 16.08l-5.83-5.83M13.84 12.75l-2.42 2.42M13.84 12.75 16.25 10.33M8.42 18.17l-5.83-5.83A1.75 1.75 0 0 1 5.09 9.83l5.83 5.83M8.42 18.17l2.42-2.42M8.42 18.17 6 20.58M10.84 15.75 16.67 21.58A1.75 1.75 0 0 0 19.17 19.08l-5.83-5.83M10.84 15.75l-2.42 2.42M10.84 15.75 13.25 13.33" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
              {isEn ? "System Under Maintenance" : "Hệ thống đang bảo trì"}
            </h1>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              {isEn
                ? "The SET VinhUni Portal is currently undergoing scheduled upgrades to serve you better. We will be back online shortly. Thank you for your patience!"
                : "Cổng thông tin Trường Kỹ thuật & Công nghệ - Đại học Vinh đang được bảo trì nâng cấp hệ thống. Vui lòng quay lại sau. Xin chân thành cảm ơn!"}
            </p>

            <div className="text-xs text-slate-400 border-t border-slate-100 pt-4 flex justify-between items-center">
              <span>SET Vinh University</span>
              <a 
                href={isEn ? "/vi" : "/en"} 
                className="text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                {isEn ? "Tiếng Việt" : "English"}
              </a>
            </div>
          </div>
        </body>
      </html>
    );
  }

  if (headerMenu?.items) {
    resolveMenuTreeSlugs(headerMenu.items, articles);
  }
  if (footerMenu?.items) {
    resolveMenuTreeSlugs(footerMenu.items, articles);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";
  
  // Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": locale === "en" ? "College of Engineering and Technology - Vinh University" : "Trường Kỹ thuật và Công nghệ - Đại học Vinh",
    "alternateName": "SET VinhUni",
    "url": `${siteUrl}/${locale}`,
    "logo": `${siteUrl}/images/logo-set.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "182 Lê Duẩn",
      "addressLocality": "Vinh",
      "addressRegion": "Nghệ An",
      "postalCode": "43000",
      "addressCountry": "VN"
    },
    "parentOrganization": {
      "@type": "EducationalOrganization",
      "name": "Trường Đại học Vinh",
      "url": "https://vinhuni.edu.vn"
    }
  };

  // WebSite & SearchAction Schema
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": locale === "en" ? "College of Engineering and Technology - Vinh University" : "Trường Kỹ thuật và Công nghệ - Đại học Vinh",
    "url": `${siteUrl}/${locale}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/${locale}/${locale === "en" ? "search" : "tim-kiem"}?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Script to eliminate Chrome extension hydration mismatches caused by bis_skin_checked */}
        <script
          id="remove-bis-skin-checked"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const removeBisSkinChecked = (node) => {
                  if (node.nodeType === 1) {
                    if (node.hasAttribute('bis_skin_checked')) {
                      node.removeAttribute('bis_skin_checked');
                    }
                    const children = node.getElementsByTagName('*');
                    for (let i = 0; i < children.length; i++) {
                      if (children[i].hasAttribute('bis_skin_checked')) {
                        children[i].removeAttribute('bis_skin_checked');
                      }
                    }
                  }
                };
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                      mutation.addedNodes.forEach(removeBisSkinChecked);
                    } else if (mutation.type === 'attributes' && mutation.attributeName === 'bis_skin_checked') {
                      if (mutation.target.hasAttribute('bis_skin_checked')) {
                        mutation.target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                });
                observer.observe(document.documentElement, {
                  attributes: true,
                  childList: true,
                  subtree: true,
                  attributeFilter: ['bis_skin_checked']
                });
              })();
            `
          }}
        />

        {/* Injecting System-wide Schemas */}
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full bg-background text-foreground flex flex-col">

        <NextIntlClientProvider messages={messages}>
          <RootProviders>
            <Suspense fallback={null}>
              <FireworksCelebrate />
            </Suspense>
            <TopBar initialLanguages={languages} />
            <Header initialMenu={headerMenu} />
            <main className="flex-1 relative bg-gradient-to-b from-[#fcfdfd] via-[#f7faf8]/40 to-[#f6fbf8]/50 overflow-x-clip">
              {/* Page content layered in z-10 */}
              <div className="relative z-10">{children}</div>
            </main>
            <Footer initialMenu={footerMenu} />

            {/* Floating Messenger Button (Homepage Only) */}
            <FloatingMessenger />
          </RootProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
