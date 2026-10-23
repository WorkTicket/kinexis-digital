import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Let crawlers read noindex on utility pages. Blocking a noindex URL here
      // can leave an unhelpful URL-only result in a search index.
      disallow: "/api/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
