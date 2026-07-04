import { MetadataRoute } from "next";
import { getPathname } from "@/i18n/routing";

interface CategoryNode {
  slug: string;
  children?: CategoryNode[];
}

// Hàm đệ quy để thu thập tất cả slug từ cây danh mục
function collectCategorySlugs(nodes: CategoryNode[]): string[] {
  let slugs: string[] = [];
  for (const node of nodes) {
    if (node.slug) {
      slugs.push(node.slug);
    }
    if (node.children && node.children.length > 0) {
      slugs = slugs.concat(collectCategorySlugs(node.children));
    }
  }
  return slugs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const locales = ["vi", "en"] as const;

  // Các trang tĩnh mặc định
  const staticPaths = ["/", "/tin-tuc", "/gioi-thieu", "/dao-tao"] as const;

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Thêm các trang tĩnh vào sitemap dùng getPathname
  for (const rawPath of staticPaths) {
    const viPath = getPathname({ locale: "vi", href: rawPath as any });
    const enPath = getPathname({ locale: "en", href: rawPath as any });

    for (const locale of locales) {
      const localizedPath = getPathname({ locale, href: rawPath as any });
      sitemapEntries.push({
        url: `${baseUrl}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: rawPath === "/" ? "daily" : "weekly",
        priority: rawPath === "/" ? 1.0 : 0.8,
        alternates: {
          languages: {
            vi: `${baseUrl}${viPath}`,
            en: `${baseUrl}${enPath}`,
          },
        },
      });
    }
  }

  try {
    // 2. Fetch dữ liệu động song song từ Backend API
    const [articlesRes, categoriesRes, tagsRes, departmentsRes, staffsRes] = await Promise.all([
      fetch(`${apiBaseUrl}/api/v1/portal/articles?page=1&page_size=100`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiBaseUrl}/api/v1/portal/categories/tree`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiBaseUrl}/api/v1/portal/tags?page=1&page_size=1000`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiBaseUrl}/api/v1/portal/departments`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiBaseUrl}/api/v1/portal/staffs`, { next: { revalidate: 3600 } }).catch(() => null),
    ]);

    // Xử lý bài viết (Articles)
    if (articlesRes && articlesRes.ok) {
      const data = await articlesRes.json();
      const articles = data?.items || [];
      for (const article of articles) {
        if (!article.slug) continue;
        const lastMod = article.updated_at || article.published_at || new Date().toISOString();
        
        const viPath = getPathname({
          locale: "vi",
          href: { pathname: "/tin-tuc/[slug]", params: { slug: article.slug } }
        });
        const enPath = getPathname({
          locale: "en",
          href: { pathname: "/tin-tuc/[slug]", params: { slug: article.slug } }
        });

        for (const locale of locales) {
          const localizedPath = getPathname({
            locale,
            href: { pathname: "/tin-tuc/[slug]", params: { slug: article.slug } }
          });
          sitemapEntries.push({
            url: `${baseUrl}${localizedPath}`,
            lastModified: new Date(lastMod),
            changeFrequency: "weekly",
            priority: 0.7,
            alternates: {
              languages: {
                vi: `${baseUrl}${viPath}`,
                en: `${baseUrl}${enPath}`,
              },
            },
          });
        }
      }
    }

    // Xử lý danh mục (Categories)
    if (categoriesRes && categoriesRes.ok) {
      const categoryTree = await categoriesRes.json();
      const categorySlugs = collectCategorySlugs(categoryTree);
      for (const slug of categorySlugs) {
        const viPath = getPathname({ locale: "vi", href: "/tin-tuc" }) + `?category_slug=${slug}`;
        const enPath = getPathname({ locale: "en", href: "/tin-tuc" }) + `?category_slug=${slug}`;

        for (const locale of locales) {
          const localizedPath = getPathname({ locale, href: "/tin-tuc" }) + `?category_slug=${slug}`;
          sitemapEntries.push({
            url: `${baseUrl}${localizedPath}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
            alternates: {
              languages: {
                vi: `${baseUrl}${viPath}`,
                en: `${baseUrl}${enPath}`,
              },
            },
          });
        }
      }
    }

    // Xử lý từ khóa (Tags)
    if (tagsRes && tagsRes.ok) {
      const data = await tagsRes.json();
      const tags = data?.items || [];
      for (const tag of tags) {
        if (!tag.slug) continue;
        const viPath = getPathname({ locale: "vi", href: "/tin-tuc" }) + `?tag_slug=${tag.slug}`;
        const enPath = getPathname({ locale: "en", href: "/tin-tuc" }) + `?tag_slug=${tag.slug}`;

        for (const locale of locales) {
          const localizedPath = getPathname({ locale, href: "/tin-tuc" }) + `?tag_slug=${tag.slug}`;
          sitemapEntries.push({
            url: `${baseUrl}${localizedPath}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
            alternates: {
              languages: {
                vi: `${baseUrl}${viPath}`,
                en: `${baseUrl}${enPath}`,
              },
            },
          });
        }
      }
    }

    // Xử lý bộ môn (Departments)
    if (departmentsRes && departmentsRes.ok) {
      const departments = await departmentsRes.json();
      for (const dept of departments) {
        if (!dept.slug) continue;
        const viPath = getPathname({
          locale: "vi",
          href: { pathname: "/bo-mon/[slug]", params: { slug: dept.slug } }
        });
        const enPath = getPathname({
          locale: "en",
          href: { pathname: "/bo-mon/[slug]", params: { slug: dept.slug } }
        });

        for (const locale of locales) {
          const localizedPath = getPathname({
            locale,
            href: { pathname: "/bo-mon/[slug]", params: { slug: dept.slug } }
          });
          sitemapEntries.push({
            url: `${baseUrl}${localizedPath}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
            alternates: {
              languages: {
                vi: `${baseUrl}${viPath}`,
                en: `${baseUrl}${enPath}`,
              },
            },
          });
        }
      }
    }

    // Xử lý nhân sự/giảng viên (Staffs)
    if (staffsRes && staffsRes.ok) {
      const staffs = await staffsRes.json();
      for (const staff of staffs) {
        if (!staff.slug) continue;
        const viPath = getPathname({
          locale: "vi",
          href: { pathname: "/nhan-su/[slug]", params: { slug: staff.slug } }
        });
        const enPath = getPathname({
          locale: "en",
          href: { pathname: "/nhan-su/[slug]", params: { slug: staff.slug } }
        });

        for (const locale of locales) {
          const localizedPath = getPathname({
            locale,
            href: { pathname: "/nhan-su/[slug]", params: { slug: staff.slug } }
          });
          sitemapEntries.push({
            url: `${baseUrl}${localizedPath}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
            alternates: {
              languages: {
                vi: `${baseUrl}${viPath}`,
                en: `${baseUrl}${enPath}`,
              },
            },
          });
        }
      }
    }

  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return sitemapEntries;
}
