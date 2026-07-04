import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { RootProviders } from "@/shared/providers/root-providers";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
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
  };
}

import { TopBar } from "@/shared/components/layout/top-bar";
import { Header } from "@/shared/components/layout/header";
import { Footer } from "@/shared/components/layout/footer";
import { getMenuTreeServer } from "@/features/menu/api/get-menu-server";
import { getLanguages } from "@/features/language";

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

  // Load menu và languages từ Server song song để tối ưu Core Web Vitals
  const [headerMenu, languages] = await Promise.all([
    getMenuTreeServer("header"),
    getLanguages(),
  ]);

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
        "urlTemplate": `${siteUrl}/${locale}/tin-tuc?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full bg-background text-foreground flex flex-col">
        {/* Script to eliminate Chrome extension hydration mismatches caused by bis_skin_checked */}
        <script
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
            <TopBar initialLanguages={languages} />
            <Header initialMenu={headerMenu} />
            <div className="flex-1">{children}</div>
            <Footer />
          </RootProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
