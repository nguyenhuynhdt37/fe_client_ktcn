import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";
  const locales = ["vi", "en"];
  const staticPaths = ["", "/tin-tuc", "/gioi-thieu", "/dao-tao"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: path === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            vi: `${baseUrl}/vi${path}`,
            en: `${baseUrl}/en${path}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
