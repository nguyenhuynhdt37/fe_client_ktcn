import { MetadataRoute } from "next";
import { BASE_URL } from "@/shared/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = BASE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/*?q=", "/*?*q=", "/vi/search", "/en/search"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
