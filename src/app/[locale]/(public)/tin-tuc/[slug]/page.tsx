import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { CalendarDays, Clock, User, Eye } from "lucide-react";
import { articleService, TableOfContents, parseHeadings } from "@/features/article";
import { getLocalizedField, formatDate } from "@/features/article/utils/map-article";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb, BreadcrumbItem } from "@/shared/components/ui/breadcrumb";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// 1. Hàm sinh SEO Metadata động phía Server hỗ trợ đa ngôn ngữ
export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
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
  const ogDescription =
    getLocalizedField<string>(article, "og_description", locale) || seoDescription;

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
      },
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
  const isEn = locale === "en";

  // Cấu hình static rendering locale
  setRequestLocale(locale);
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tArticle = await getTranslations({ locale, namespace: "article" });

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
    relatedNewsPromise,
  ]);

  const sidebarNews = sidebarNewsData?.items || [];

  // Lọc bỏ bài viết hiện tại ra khỏi danh sách bài viết liên quan, lấy tối đa 4 bài
  const relatedNews = (relatedNewsData?.items || [])
    .filter((item) => item.id !== article.id)
    .slice(0, 4);

  // Dynamic fields theo locale
  const title = getLocalizedField<string>(article, "title", locale);
  const excerpt = getLocalizedField<string>(article, "excerpt", locale);
  const rawContent = getLocalizedField<string>(article, "content", locale);
  const { cleanHtml, headings } = parseHeadings(rawContent);
  const categoryName = getLocalizedField<string>(article.category, "name", locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";

  // Tự động xây dựng JSON-LD Schema.org chất lượng cao nếu Backend không cung cấp hoặc trả về null
  const jsonLd =
    article.json_ld && Object.keys(article.json_ld).length > 0
      ? article.json_ld
      : {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: title,
          description: excerpt || title,
          image: article.cover_url || article.thumbnail_url || `${siteUrl}/images/no-image-dhv.jpg`,
          datePublished: article.published_at,
          dateModified: article.updated_at || article.published_at,
          author: {
            "@type": "Person",
            name: article.author.full_name || article.author.username,
          },
          publisher: {
            "@type": "Organization",
            name:
              locale === "en"
                ? "College of Engineering and Technology - Vinh University"
                : "Trường Kỹ thuật và Công nghệ - Đại học Vinh",
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/images/logo-set.png`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteUrl}/${locale}/${slug}`,
          },
        };

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: tCommon("home"), href: "/" },
    { name: categoryName, href: `/tin-tuc?category=${article.category.slug}` },
    { name: title },
  ];

  return (
    <>
      {/* Chèn cấu trúc dữ liệu JSON-LD Schema.org tối ưu SEO Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-section-alt min-h-screen py-8 sm:py-12">
        <div className="site-container space-y-6">
          {/* Breadcrumb điều hướng */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Bố cục chính */}
          <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Cột trái lơ lửng ngoài lề: Chỉ hiện trên màn hình rộng min-width 1600px */}
            {headings.length > 0 && (
              <div className="absolute top-0 right-full bottom-0 mr-8 hidden w-60 min-[1600px]:block">
                <aside className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">
                  <TableOfContents
                    headings={headings}
                    variant="sidebar"
                    title={isEn ? "Table of Contents" : "Mục lục nội dung"}
                  />
                </aside>
              </div>
            )}

            {/* Cột bài viết (luôn rộng full 9/12 trên desktop để bài viết rộng rãi) */}
            <main className="lg:col-span-9">
              <article className="border-border space-y-7 rounded-xl border bg-white p-5 sm:p-8 lg:p-10">
                {/* Tiêu đề & Meta Info */}
                <div className="space-y-4 border-b border-slate-100 pb-6">
                  <span className="bg-brand-darkred/8 text-brand-darkred inline-flex min-h-8 items-center rounded-md px-2.5 text-sm font-semibold">
                    {categoryName}
                  </span>

                  <h1 className="text-3xl leading-tight font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">
                    {title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <User size={16} className="text-slate-500" aria-hidden="true" />
                      <span className="text-slate-700">
                        {article.author.full_name || article.author.username}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={16} className="text-slate-500" aria-hidden="true" />
                      <span>{formatDate(article.published_at, locale)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-slate-500" aria-hidden="true" />
                      <span>
                        {article.reading_time} {locale === "en" ? "mins read" : "phút đọc"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye size={16} className="text-slate-500" aria-hidden="true" />
                      <span>
                        {article.view_count} {tArticle("views")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Excerpt (Tóm tắt) nếu có */}
                {excerpt && (
                  <p className="bg-brand-darkred/[0.05] rounded-lg p-4 text-base leading-relaxed font-medium text-slate-700 sm:text-lg">
                    {excerpt}
                  </p>
                )}

                {/* Cover Image */}
                {article.cover_url && (
                  <div className="bg-surface relative h-[250px] w-full overflow-hidden rounded-xl sm:h-[400px] lg:h-[480px]">
                    <Image
                      src={article.cover_url}
                      alt={title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-w-1024px) 100vw, 896px"
                    />
                  </div>
                )}

                {/* Mục lục bài viết (chỉ hiện ở đầu nội dung trên mobile/tablet/laptop và ẩn trên màn hình cực lớn min-1600px) */}
                {headings.length > 0 && (
                  <TableOfContents
                    headings={headings}
                    variant="inline"
                    title={isEn ? "Table of Contents" : "Mục lục nội dung"}
                    expandText={isEn ? "Show" : "Hiện"}
                    collapseText={isEn ? "Hide" : "Ẩn"}
                    className="min-[1600px]:hidden"
                  />
                )}

                {/* Content (Nội dung chi tiết HTML) */}
                <div
                  className="prose prose-headings:mt-8 prose-headings:mb-4 prose-headings:scroll-mt-24 prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-[-0.02em] prose-headings:text-slate-900 prose-p:mb-5 prose-p:max-w-[75ch] prose-p:leading-relaxed prose-img:mx-auto prose-img:my-8 prose-img:rounded-xl prose-a:text-brand-darkred prose-a:underline hover:prose-a:text-brand-darkred-dark max-w-none text-base leading-relaxed font-normal text-slate-800"
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                />

                {/* Danh sách Tags nhãn bài viết */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-6">
                    <span className="mr-2 text-sm font-semibold text-slate-600">Tags:</span>
                    {article.tags.map((tag) => {
                      const tagName = getLocalizedField<string>(tag, "name", locale);
                      return (
                        <Link
                          key={tag.id}
                          href={{ pathname: "/tin-tuc", query: { tag: tag.slug } }}
                          className="bg-surface hover:bg-brand-darkred inline-flex min-h-10 items-center rounded-lg px-3 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:text-white"
                        >
                          {tagName}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </article>
            </main>

            {/* Cột phải (3/12): Sidebar các danh mục tin phụ */}
            <aside className="space-y-6 lg:col-span-3">
              {/* Widget 1: Tin mới nhất */}
              {sidebarNews.length > 0 && (
                <div className="border-border space-y-5 rounded-xl border bg-white p-5">
                  <div className="border-border border-b pb-4">
                    <h3 className="text-lg font-bold text-slate-900">
                      {locale === "en" ? "Latest News" : "Tin tức mới nhất"}
                    </h3>
                  </div>

                  <ul className="divide-y divide-slate-100">
                    {sidebarNews.map((item) => {
                      const itemTitle = getLocalizedField<string>(item, "title", locale);
                      const itemCatName = getLocalizedField<string>(item.category, "name", locale);
                      return (
                        <li key={item.id} className="group py-4 first:pt-0 last:pb-0">
                          <Link
                            href={{ pathname: "/tin-tuc/[slug]", params: { slug: item.slug } }}
                            className="block space-y-1.5"
                          >
                            <h4 className="group-hover:text-brand-darkred line-clamp-2 text-sm leading-snug font-semibold text-slate-800 transition-colors duration-150">
                              {itemTitle}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                              <span className="text-brand-darkred font-semibold">
                                {itemCatName}
                              </span>
                              <span className="text-slate-300" aria-hidden="true">
                                •
                              </span>
                              <span className="flex items-center gap-1">
                                <CalendarDays size={13} aria-hidden="true" />
                                <span>{formatDate(item.published_at, locale)}</span>
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href="/tin-tuc"
                    className="border-border-subtle text-brand-darkred flex min-h-11 items-center justify-center border-t pt-2 text-sm font-semibold hover:underline"
                  >
                    {locale === "en" ? "View all news" : "Xem tất cả tin tức"} &rarr;
                  </Link>
                </div>
              )}

              {/* Widget 2: Bài viết liên quan */}
              {relatedNews.length > 0 && (
                <div className="border-border space-y-5 rounded-xl border bg-white p-5">
                  <div className="border-border border-b pb-4">
                    <h3 className="text-lg font-bold text-slate-900">
                      {locale === "en" ? "Related Articles" : "Bài viết liên quan"}
                    </h3>
                  </div>

                  <ul className="divide-y divide-slate-100">
                    {relatedNews.map((item) => {
                      const itemTitle = getLocalizedField<string>(item, "title", locale);
                      const itemCatName = getLocalizedField<string>(item.category, "name", locale);
                      return (
                        <li key={item.id} className="group py-4 first:pt-0 last:pb-0">
                          <Link
                            href={{ pathname: "/tin-tuc/[slug]", params: { slug: item.slug } }}
                            className="block space-y-1.5"
                          >
                            <h4 className="group-hover:text-brand-darkred line-clamp-2 text-sm leading-snug font-semibold text-slate-800 transition-colors duration-150">
                              {itemTitle}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                              <span className="text-brand-darkred font-semibold">
                                {itemCatName}
                              </span>
                              <span className="text-slate-300" aria-hidden="true">
                                •
                              </span>
                              <span className="flex items-center gap-1">
                                <CalendarDays size={13} aria-hidden="true" />
                                <span>{formatDate(item.published_at, locale)}</span>
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href={{ pathname: "/tin-tuc", query: { category_slug: article.category.slug } }}
                    className="border-border-subtle text-brand-darkred flex min-h-11 items-center justify-center border-t pt-2 text-sm font-semibold hover:underline"
                  >
                    {locale === "en" ? `More from ${categoryName}` : `Xem thêm ${categoryName}`}{" "}
                    &rarr;
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
