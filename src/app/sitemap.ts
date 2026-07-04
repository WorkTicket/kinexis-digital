import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { buildLocalePath, getSiteUrl } from "@/lib/metadata";
import { getPathLastModified } from "@/lib/sitemap-last-modified";
import { allIndustries, industryCategories } from "@/content/registry/industries";
import { solutions } from "@/content/registry/solutions";
import {
  sitemapServiceSlugs,
  sitemapPricingSlugs,
  serviceRoutes,
  staticPageRoutes,
  blogSlugs,
  caseStudySlugs,
  pricingRoutes,
  comparisonSlugs,
  comparisonRoutes,
  authorSlugs,
} from "@/content/registry/site-routes";

/** Routes indexed in sitemap — lead-magnet is paid-traffic only (noIndex). */
const sitemapStaticRoutes = staticPageRoutes.filter((path) => path !== "/lead-magnet");

function localeUrls(path: string, priority = 0.7): MetadataRoute.Sitemap {
  const lastModified = getPathLastModified(path);
  return locales.flatMap((locale) => ({
    url: `${getSiteUrl()}${buildLocalePath(locale, path)}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of sitemapStaticRoutes) {
    entries.push(...localeUrls(path, path === "/" ? 1 : 0.8));
  }

  for (const slug of sitemapServiceSlugs) {
    entries.push(...localeUrls(serviceRoutes[slug], 0.9));
  }

  for (const category of industryCategories) {
    entries.push(...localeUrls(`/industries/${category.id}`, 0.75));
  }

  for (const industry of allIndustries) {
    entries.push(...localeUrls(`/industries/${industry.categoryId}/${industry.slug}`, 0.8));
  }

  for (const solution of solutions) {
    entries.push(...localeUrls(`/solutions/${solution.slug}`, 0.85));
  }

  for (const slug of blogSlugs) {
    entries.push(...localeUrls(`/blog/${slug}`, 0.6));
  }

  for (const slug of caseStudySlugs) {
    entries.push(...localeUrls(`/case-studies/${slug}`, 0.7));
  }

  for (const slug of sitemapPricingSlugs) {
    entries.push(...localeUrls(pricingRoutes[slug], 0.85));
  }

  for (const slug of comparisonSlugs) {
    entries.push(...localeUrls(comparisonRoutes[slug], 0.8));
  }

  for (const slug of authorSlugs) {
    entries.push(...localeUrls(`/team/${slug}`, 0.6));
  }

  return entries;
}
