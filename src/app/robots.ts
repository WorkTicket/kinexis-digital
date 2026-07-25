import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";
import { getRobotsDisallowPaths } from "@/lib/robots-disallow";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const disallow = getRobotsDisallowPaths();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // Explicit allow so Ads landing-page quality checks are never blocked
      // even if general disallow rules expand later.
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
      {
        userAgent: "AdsBot-Google-Mobile",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
