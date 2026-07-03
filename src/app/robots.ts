import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";
import { getRobotsDisallowPaths } from "@/lib/robots-disallow";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: ["/en/", "/es/"],
      disallow: getRobotsDisallowPaths(),
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
