import type { MetadataRoute } from "next";
import { isPreviewSite, SITE } from "@/lib/site";

export const revalidate = 86400;

export default function robots(): MetadataRoute.Robots {
  if (isPreviewSite()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

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
