import type { MetadataRoute } from "next";
import { buildLocalePath, getSiteUrl } from "@/lib/metadata";
import { getPathLastModified } from "@/lib/sitemap-last-modified";
import { getStandaloneIndustrySlugs } from "@/content/industries";
import {
  staticPageRoutes,
  blogSlugs,
  caseStudySlugs,
} from "@/content/registry/site-routes";
import { FLAGSHIP_SERVICE_SLUGS } from "@/lib/legacy-redirects.mjs";

/** Indexable static routes only — excludes thank-you (noindex). */
const sitemapStaticRoutes = staticPageRoutes.filter(
  (path) => path !== "/thank-you",
);

function pageUrl(
  path: string,
  priority = 0.7,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
): MetadataRoute.Sitemap[number] {
  const lastModified = getPathLastModified(path);
  return {
    url: `${getSiteUrl()}${buildLocalePath("en", path)}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of sitemapStaticRoutes) {
    const isLegal = path === "/privacy" || path === "/terms";
    const isHub =
      path === "/" ||
      path === "/services" ||
      path === "/industries" ||
      path === "/case-studies" ||
      path === "/blog";
    entries.push(
      pageUrl(
        path,
        path === "/" ? 1 : isHub ? 0.9 : isLegal ? 0.3 : 0.7,
        isLegal ? "monthly" : "weekly",
      ),
    );
  }

  for (const slug of FLAGSHIP_SERVICE_SLUGS) {
    entries.push(pageUrl(`/services/${slug}`, 0.85));
  }

  for (const slug of getStandaloneIndustrySlugs()) {
    entries.push(pageUrl(`/industries/${slug}`, 0.85));
  }

  for (const slug of blogSlugs) {
    entries.push(pageUrl(`/blog/${slug}`, 0.6, "monthly"));
  }

  for (const category of [
    "seo",
    "web-design",
    "paid-ads",
    "cro",
    "email",
    "analytics",
    "case-studies",
  ]) {
    entries.push(pageUrl(`/blog/category/${category}`, 0.5, "monthly"));
  }

  for (const slug of caseStudySlugs) {
    entries.push(pageUrl(`/case-studies/${slug}`, 0.75, "monthly"));
  }

  return entries;
}
