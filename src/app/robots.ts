import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { siteUrl } from "@/sanity/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
