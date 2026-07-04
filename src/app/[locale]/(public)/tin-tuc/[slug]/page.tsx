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
  const sidebarNewsPromise = articleService.getLatestArticles({ page: 1, pageSize: 5 });
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
  const title = getLocalizedField<string>(article, "title", locale);
  const excerpt = getLocalizedField<string>(article, "excerpt", locale);
  const rawContent = getLocalizedField<string>(article, "content", locale);
  const { cleanHtml, headings } = parseHeadings(rawContent);
  const categoryName = getLocalizedField<string>(article.category, "name", locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";

  // Tự động xây dựng JSON-LD Schema.org chất lượng cao nếu Backend không cung cấp hoặc trả về null
  const jsonLd = article.json_ld && Object.keys(article.json_ld).length > 0
    ? article.json_ld
    : {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": title,
      "description": excerpt || title,
      "image": article.cover_url || article.thumbnail_url || `${siteUrl}/images/no-image-dhv.jpg`,
      "datePublished": article.published_at,
      "dateModified": article.updated_at || article.published_at,
      "author": {
        "@type": "Person",
        "name": article.author.full_name || article.author.username,
      },
      "publisher": {
        "@type": "Organization",
        "name": locale === "en" ? "College of Engineering and Technology - Vinh University" : "Trường Kỹ thuật và Công nghệ - Đại học Vinh",
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

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: tCommon("home"), href: "/" },
    { name: categoryName, href: `/tin-tuc?category=${article.category.slug}` },
    { name: title }
  ];

  return (
    <>
      {/* Chèn cấu trúc dữ liệu JSON-LD Schema.org tối ưu SEO Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 min-h-screen py-8">
        <div className="max-w-[1360px] mx-auto px-6 space-y-6">

          {/* Breadcrumb điều hướng */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Bố cục chính */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

            {/* Cột trái lơ lửng ngoài lề: Chỉ hiện trên màn hình rộng min-width 1600px */}
            {headings.length > 0 && (
              <div className="hidden min-[1600px]:block absolute right-full mr-8 top-0 bottom-0 w-60">
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
              <article className="bg-white p-6 sm:p-10 border border-slate-100 shadow-sm rounded-none space-y-6">

                {/* Tiêu đề & Meta Info */}
                <div className="space-y-4 border-b border-slate-100 pb-6">
                  <span className="inline-block bg-brand-darkred/10 text-brand-darkred text-xs font-bold px-2.5 py-1 uppercase tracking-wider rounded-none">
                    {categoryName}
                  </span>

                  <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-serif text-slate-900 leading-snug">
                    {title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 pt-2 font-medium">
                    <div className="flex items-center gap-1.5">
                      <User size={16} className="text-slate-400" />
                      <span className="text-slate-700">
                        {article.author.full_name || article.author.username}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={16} className="text-slate-400" />
                      <span>{formatDate(article.published_at, locale)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-slate-400" />
                      <span>{article.reading_time} {locale === "en" ? "mins read" : "phút đọc"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye size={16} className="text-slate-400" />
                      <span>{article.view_count} {tArticle("views")}</span>
                    </div>
                  </div>
                </div>

                {/* Excerpt (Tóm tắt) nếu có */}
                {excerpt && (
                  <p className="text-base sm:text-lg text-slate-600 font-medium italic border-l-4 border-brand-darkred pl-4 py-1 leading-relaxed">
                    {excerpt}
                  </p>
                )}

                {/* Cover Image */}
                {article.cover_url && (
                  <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[480px] overflow-hidden bg-slate-100 border border-slate-100">
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
                  className="prose prose-serif max-w-none text-slate-800 leading-relaxed font-normal
                    prose-headings:font-bold prose-headings:font-serif prose-headings:text-slate-900 prose-headings:mt-8 prose-headings:mb-4 prose-headings:scroll-mt-24
                    prose-p:mb-5 prose-p:leading-relaxed prose-p:text-justify
                    prose-img:mx-auto prose-img:shadow-sm prose-img:my-8 prose-img:border prose-img:border-slate-100
                    prose-a:text-brand-darkred prose-a:underline hover:prose-a:text-brand-darkred-dark"
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                />

                {/* Danh sách Tags nhãn bài viết */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Tags:</span>
                    {article.tags.map((tag) => {
                      const tagName = getLocalizedField<string>(tag, "name", locale);
                      return (
                        <Link
                          key={tag.id}
                          href={{ pathname: "/tin-tuc", query: { tag: tag.slug } }}
                          className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-brand-darkred hover:text-white px-3 py-1.5 transition duration-150 rounded-none"
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
            <aside className="lg:col-span-3 space-y-6">

              {/* Widget 1: Tin mới nhất */}
              {sidebarNews.length > 0 && (
                <div className="bg-white p-6 shadow-sm border border-slate-100 rounded-none space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 relative after:absolute after:bottom-[-17px] after:left-0 after:w-10 after:h-[2.5px] after:bg-brand-darkred">
                      {locale === "en" ? "Latest News" : "Tin tức mới nhất"}
                    </h3>
                  </div>

                  <ul className="divide-y divide-slate-100">
                    {sidebarNews.map((item) => {
                      const itemTitle = getLocalizedField<string>(item, "title", locale);
                      const itemCatName = getLocalizedField<string>(item.category, "name", locale);
                      return (
                        <li key={item.id} className="py-4 first:pt-0 last:pb-0 group">
                          <Link href={{ pathname: "/tin-tuc/[slug]", params: { slug: item.slug } }} className="block space-y-1.5">
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-brand-darkred transition leading-snug line-clamp-2">
                              {itemTitle}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400 font-medium">
                              <span className="text-brand-darkred font-bold uppercase text-[10px]">{itemCatName}</span>
                              <span className="text-slate-300">•</span>
                              <span className="flex items-center gap-1">
                                <CalendarDays size={11} />
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
                    className="block text-center text-xs font-bold text-brand-darkred hover:underline pt-2 border-t border-slate-50"
                  >
                    {locale === "en" ? "View all news" : "Xem tất cả tin tức"} &rarr;
                  </Link>
                </div>
              )}

              {/* Widget 2: Bài viết liên quan */}
              {relatedNews.length > 0 && (
                <div className="bg-white p-6 shadow-sm border border-slate-100 rounded-none space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 relative after:absolute after:bottom-[-17px] after:left-0 after:w-10 after:h-[2.5px] after:bg-brand-darkred">
                      {locale === "en" ? "Related Articles" : "Bài viết liên quan"}
                    </h3>
                  </div>

                  <ul className="divide-y divide-slate-100">
                    {relatedNews.map((item) => {
                      const itemTitle = getLocalizedField<string>(item, "title", locale);
                      const itemCatName = getLocalizedField<string>(item.category, "name", locale);
                      return (
                        <li key={item.id} className="py-4 first:pt-0 last:pb-0 group">
                          <Link href={{ pathname: "/tin-tuc/[slug]", params: { slug: item.slug } }} className="block space-y-1.5">
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-brand-darkred transition leading-snug line-clamp-2">
                              {itemTitle}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400 font-medium">
                              <span className="text-brand-darkred font-bold uppercase text-[10px]">{itemCatName}</span>
                              <span className="text-slate-300">•</span>
                              <span className="flex items-center gap-1">
                                <CalendarDays size={11} />
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
                    className="block text-center text-xs font-bold text-brand-darkred hover:underline pt-2 border-t border-slate-50"
                  >
                    {locale === "en" ? `More from ${categoryName}` : `Xem thêm ${categoryName}`} &rarr;
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
