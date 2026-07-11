import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { RootProviders } from "@/shared/providers/root-providers";
import { FireworksCelebrate } from "@/shared/components/FireworksCelebrate";
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
        { url: "/images/logo.png", sizes: "192x192", type: "image/png" },
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
  const [headerMenu, languages, articlesData] = await Promise.all([
    menuService.getMenuTree("header"),
    languageService.getLanguages(),
    articleService.getLatestArticles({ page: 1, pageSize: 100 }).catch(() => null)
  ]);

  if (headerMenu?.items) {
    const articles = articlesData?.items || [];
    resolveMenuTreeSlugs(headerMenu.items, articles);
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
      <body suppressHydrationWarning className="min-h-full bg-background text-foreground flex flex-col">
        {/* Script to eliminate Chrome extension hydration mismatches caused by bis_skin_checked */}
        <Script
          id="remove-bis-skin-checked"
          strategy="beforeInteractive"
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />

        <NextIntlClientProvider messages={messages}>
          <RootProviders>
            <Suspense fallback={null}>
              <FireworksCelebrate />
            </Suspense>
            <TopBar initialLanguages={languages} />
            <Header initialMenu={headerMenu} />
            <div className="flex-1 relative bg-gradient-to-b from-[#fcfdfd] via-[#f7faf8]/40 to-[#f6fbf8]/50 overflow-hidden">
              
              {/* Background Overlay Layer with Watercolor Leaves */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none">
                {/* Leaves top-left */}
                <div className="absolute top-[2%] -left-16 w-64 h-64 md:w-80 md:h-80 opacity-[0.09] rotate-[35deg] mix-blend-multiply">
                  <Image
                    src="/images/about/watercolor_leaves.jpg"
                    alt="Leaf Background Dec"
                    fill
                    sizes="(max-width: 768px) 200px, 320px"
                    className="object-contain"
                  />
                </div>

                {/* Leaves top-right */}
                <div className="absolute top-[15%] -right-16 w-64 h-64 md:w-80 md:h-80 opacity-[0.08] -rotate-[45deg] scale-x-[-1] mix-blend-multiply">
                  <Image
                    src="/images/about/watercolor_leaves.jpg"
                    alt="Leaf Background Dec"
                    fill
                    sizes="(max-width: 768px) 200px, 320px"
                    className="object-contain"
                  />
                </div>

                {/* Leaves mid-left */}
                <div className="absolute top-[38%] -left-20 w-72 h-72 md:w-96 md:h-96 opacity-[0.07] rotate-[15deg] mix-blend-multiply">
                  <Image
                    src="/images/about/watercolor_leaves.jpg"
                    alt="Leaf Background Dec"
                    fill
                    sizes="(max-width: 768px) 250px, 380px"
                    className="object-contain"
                  />
                </div>

                {/* Leaves mid-right */}
                <div className="absolute top-[58%] -right-20 w-72 h-72 md:w-96 md:h-96 opacity-[0.08] -rotate-[25deg] scale-y-[-1] mix-blend-multiply">
                  <Image
                    src="/images/about/watercolor_leaves.jpg"
                    alt="Leaf Background Dec"
                    fill
                    sizes="(max-width: 768px) 250px, 380px"
                    className="object-contain"
                  />
                </div>

                {/* Leaves bottom-left */}
                <div className="absolute top-[78%] -left-16 w-72 h-72 md:w-80 md:h-80 opacity-[0.09] rotate-[75deg] mix-blend-multiply">
                  <Image
                    src="/images/about/watercolor_leaves.jpg"
                    alt="Leaf Background Dec"
                    fill
                    sizes="(max-width: 768px) 200px, 320px"
                    className="object-contain"
                  />
                </div>

                {/* Leaves bottom-right */}
                <div className="absolute bottom-[2%] -right-16 w-80 h-80 md:w-96 md:h-96 opacity-[0.11] rotate-[115deg] scale-x-[-1] mix-blend-multiply">
                  <Image
                    src="/images/about/watercolor_leaves.jpg"
                    alt="Leaf Background Dec"
                    fill
                    sizes="(max-width: 768px) 250px, 380px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Page content layered on top */}
              <div className="relative z-10">{children}</div>
            </div>
            <Footer />
          </RootProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
