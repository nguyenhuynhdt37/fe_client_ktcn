import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://set.vinhuni.edu.vn";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/*?q=", "/*?*q=", "/vi/search", "/en/search"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
