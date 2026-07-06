import { notFound } from "next/navigation";
import { Metadata } from "next";
import { articleService, parseHeadings, ArticleDetailContent } from "@/features/article";
import { getLocalizedField } from "@/features/article/utils/map-article";
import { setRequestLocale } from "next-intl/server";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// 1. Hàm sinh SEO Metadata động phía Server hỗ trợ đa ngôn ngữ
export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await articleService.getArticleDetail(slug);

  if (!article) {
    return {
      title: locale === "en" ? "Article Not Found" : "Bài viết không tồn tại",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";
  const title = getLocalizedField<string>(article, "title", locale);
  const excerpt = getLocalizedField<string>(article, "excerpt", locale);

  const seoTitle = getLocalizedField<string>(article, "seo_title", locale) || title;
  const seoDescription = getLocalizedField<string>(article, "seo_description", locale) || excerpt;
  const ogTitle = getLocalizedField<string>(article, "og_title", locale) || seoTitle;
  const ogDescription = getLocalizedField<string>(article, "og_description", locale) || seoDescription;

  const isEn = locale === "en";
  // Xây dựng canonical chuẩn cho từng locale
  const canonicalUrl = `${siteUrl}/${locale}/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: `${siteUrl}/vi/${slug}`,
        en: `${siteUrl}/en/${slug}`,
        "x-default": `${siteUrl}/vi/${slug}`,
      }
    },
    robots: article.robots || "index, follow",
    openGraph: {
      title: ogTitle,
      description: ogDescription || undefined,
      type: "article",
      url: canonicalUrl,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at || undefined,
      images: article.og_image_url ? [{ url: article.og_image_url }] : [],
      authors: [article.author.full_name || article.author.username],
      locale: locale === "en" ? "en_US" : "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription || undefined,
      images: article.og_image_url ? [article.og_image_url] : [],
    },
  };
}

// 2. Component Layout & Content hiển thị bài viết
export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug, locale } = await params;

  // Cấu hình static rendering locale
  setRequestLocale(locale);

  // Gọi API lấy thông tin chi tiết bài viết
  const article = await articleService.getArticleDetail(slug);

  if (!article) {
    notFound();
  }

  // Gọi song song danh sách tin mới nhất (Sidebar) và các bài viết liên quan (Sidebar)
  const sidebarNewsPromise = articleService.getLatestArticles({ 
    page: 1, 
    pageSize: 5, 
    excludeCategorySlugs: ["lich-tuan", "weekly-calendar", "gioi-thieu", "chuc-nang-nhiem-vu", "lich-su-phat-trien"] 
  });
  const relatedNewsPromise = articleService.getArticlesByCategory(article.category.slug, 1, 5);

  const [sidebarNewsData, relatedNewsData] = await Promise.all([
    sidebarNewsPromise,
    relatedNewsPromise
  ]);

  const sidebarNews = sidebarNewsData?.items || [];

  // Lọc bỏ bài viết hiện tại ra khỏi danh sách bài viết liên quan, lấy tối đa 4 bài
  const relatedNews = (relatedNewsData?.items || [])
    .filter(item => item.id !== article.id)
    .slice(0, 4);

  // Dynamic fields theo locale
  const rawContent = getLocalizedField<string>(article, "content", locale);
  const { cleanHtml, headings } = parseHeadings(rawContent);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";

  // Tự động xây dựng JSON-LD Schema.org chất lượng cao nếu Backend không cung cấp hoặc trả về null
  const jsonLd = article.json_ld && Object.keys(article.json_ld).length > 0
    ? article.json_ld
    : {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": getLocalizedField<string>(article, "title", locale),
      "description": getLocalizedField<string>(article, "excerpt", locale) || getLocalizedField<string>(article, "title", locale),
      "image": article.cover_url || article.thumbnail_url || `${siteUrl}/images/no-image-dhv.jpg`,
      "datePublished": article.published_at,
      "dateModified": article.updated_at || article.published_at,
      "author": {
        "@type": "Person",
        "name": article.author.full_name || article.author.username,
      },
      "publisher": {
        "@type": "Organization",
        "name": locale === "en" ? "College of Engineering and Technology - Vinh University" : "Trường Kỹ thuật và Công nghệ - Trường Đại học Vinh",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/images/logo-set.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteUrl}/${locale}/${slug}`
      }
    };

  return (
    <>
      {/* Chèn cấu trúc dữ liệu JSON-LD Schema.org tối ưu SEO Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleDetailContent
        article={article}
        locale={locale}
        cleanHtml={cleanHtml}
        headings={headings}
        sidebarNews={sidebarNews}
        relatedNews={relatedNews}
      />
    </>
  );
}
