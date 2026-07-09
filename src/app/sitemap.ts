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
  resolveServiceSlug,
  resolvePricingSlug,
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

function localeUrls(path: string, priority = 0.7, changeFrequency: "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly"): MetadataRoute.Sitemap {
  const lastModified = getPathLastModified(path);
  return locales.flatMap((locale) => ({
    url: `${getSiteUrl()}${buildLocalePath(locale, path)}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

function localeUrlsWithFreq(path: string, freq: "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never", priority = 0.7) {
  return localeUrls(path, priority, freq);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of sitemapStaticRoutes) {
    const isLegal = path === "/privacy" || path === "/terms";
    entries.push(...localeUrlsWithFreq(path, isLegal ? "monthly" : "weekly", path === "/" ? 1 : 0.8));
  }

  for (const slug of sitemapServiceSlugs) {
    entries.push(...localeUrls(serviceRoutes[resolveServiceSlug(slug)], 0.9));
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
    entries.push(...localeUrlsWithFreq(`/blog/${slug}`, "monthly", 0.6));
  }

  for (const slug of caseStudySlugs) {
    entries.push(...localeUrlsWithFreq(`/case-studies/${slug}`, "monthly", 0.7));
  }

  for (const slug of sitemapPricingSlugs) {
    entries.push(...localeUrls(pricingRoutes[resolvePricingSlug(slug)], 0.85));
  }

  for (const slug of comparisonSlugs) {
    entries.push(...localeUrls(comparisonRoutes[slug], 0.8));
  }

  for (const slug of authorSlugs) {
    entries.push(...localeUrlsWithFreq(`/team/${slug}`, "monthly", 0.6));
  }

  return entries;
}
