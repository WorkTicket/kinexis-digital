import { getBlogArticle } from "@/content/blog-articles";
import { blogContent } from "@/content/blog";
import { getClusterPost } from "@/content/blog-clusters";
import { getCaseStudyDetail } from "@/content/case-study-details";
import {
  blogSlugs,
  caseStudySlugs,
  comparisonSlugs,
  authorSlugs,
  sitemapServiceSlugs,
  sitemapPricingSlugs,
} from "@/content/registry/site-routes";
import { allIndustries, industryCategories } from "@/content/registry/industries";
import { solutions } from "@/content/registry/solutions";

const SPANISH_MONTHS: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

/** Fallback when a template has no content-level publish date. */
const TEMPLATE_DEFAULTS: Record<string, string> = {
  "/": "2026-07-03",
  "/about": "2026-06-01",
  "/contact": "2026-07-03",
  "/services": "2026-06-15",
  "/blog": "2026-06-20",
  "/blog/posts": "2026-06-20",
  "/case-studies": "2026-06-01",
  "/digital-marketing-agency": "2026-06-15",
  "/industries": "2026-06-01",
  "/solutions": "2026-06-01",
  "/resources": "2026-05-15",
  "/pricing": "2026-07-07",
  "/privacy": "2026-03-01",
  "/terms": "2026-03-01",
};

const SERVICE_LAST_MODIFIED = "2026-06-15";
const PRICING_LAST_MODIFIED = "2026-06-10";
const COMPARISON_LAST_MODIFIED = "2026-06-01";
const INDUSTRY_LAST_MODIFIED = "2026-05-20";
const SOLUTION_LAST_MODIFIED = "2026-05-25";
const TEAM_LAST_MODIFIED = "2026-05-01";

export function parseContentDate(value: string): Date | null {
  const trimmed = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return new Date(`${trimmed}T12:00:00.000Z`);
  }

  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed);
  }

  const esMatch = trimmed.match(/^(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})$/i);
  if (esMatch) {
    const day = Number(esMatch[1]);
    const monthKey = esMatch[2].toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
    const year = Number(esMatch[3]);
    const month = SPANISH_MONTHS[monthKey];
    if (month !== undefined) {
      return new Date(Date.UTC(year, month, day, 12));
    }
  }

  return null;
}

function resolveBlogSlugDate(slug: string): Date | null {
  const listing = blogContent.en.posts.find((post) => post.slug === slug);
  if (listing) return parseContentDate(listing.publishedAt);

  const article = getBlogArticle(slug, "en");
  if (article) return parseContentDate(article.publishedAt);

  const cluster = getClusterPost(slug, "en");
  if (cluster) return parseContentDate(cluster.publishedAt);

  return null;
}

function resolveCaseStudyDate(slug: string): Date | null {
  const detail = getCaseStudyDetail("en", slug);
  if (!detail) return null;
  return parseContentDate(detail.datePublished);
}

function dateFromIsoString(iso: string): Date {
  return new Date(`${iso}T12:00:00.000Z`);
}

/** Resolve lastModified for a locale-neutral site path (no /en prefix). */
export function getPathLastModified(path: string): Date {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");

  if (TEMPLATE_DEFAULTS[normalized]) {
    return dateFromIsoString(TEMPLATE_DEFAULTS[normalized]);
  }

  const blogMatch = normalized.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const date = resolveBlogSlugDate(blogMatch[1]);
    if (date) return date;
  }

  const caseStudyMatch = normalized.match(/^\/case-studies\/([^/]+)$/);
  if (caseStudyMatch) {
    const date = resolveCaseStudyDate(caseStudyMatch[1]);
    if (date) return date;
  }

  const serviceMatch = normalized.match(/^\/services\/([^/]+)$/);
  if (serviceMatch && (sitemapServiceSlugs as readonly string[]).includes(serviceMatch[1])) {
    return dateFromIsoString(SERVICE_LAST_MODIFIED);
  }

  const pricingMatch = normalized.match(/^\/pricing\/([^/]+)$/);
  if (pricingMatch && (sitemapPricingSlugs as readonly string[]).includes(pricingMatch[1])) {
    return dateFromIsoString(PRICING_LAST_MODIFIED);
  }

  const comparisonMatch = normalized.match(/^\/(google-ads-vs-seo|seo-vs-ppc|wordpress-vs-webflow|local-seo-vs-google-ads)$/);
  if (comparisonMatch && (comparisonSlugs as readonly string[]).includes(comparisonMatch[1] as (typeof comparisonSlugs)[number])) {
    return dateFromIsoString(COMPARISON_LAST_MODIFIED);
  }

  const industryCategoryMatch = normalized.match(/^\/industries\/([^/]+)$/);
  if (industryCategoryMatch && industryCategories.some((c) => c.id === industryCategoryMatch[1])) {
    return dateFromIsoString(INDUSTRY_LAST_MODIFIED);
  }

  const industryDetailMatch = normalized.match(/^\/industries\/([^/]+)\/([^/]+)$/);
  if (
    industryDetailMatch &&
    allIndustries.some(
      (i) => i.categoryId === industryDetailMatch[1] && i.slug === industryDetailMatch[2],
    )
  ) {
    return dateFromIsoString(INDUSTRY_LAST_MODIFIED);
  }

  const solutionMatch = normalized.match(/^\/solutions\/([^/]+)$/);
  if (solutionMatch && solutions.some((s) => s.slug === solutionMatch[1])) {
    return dateFromIsoString(SOLUTION_LAST_MODIFIED);
  }

  const teamMatch = normalized.match(/^\/team\/([^/]+)$/);
  if (teamMatch && (authorSlugs as readonly string[]).includes(teamMatch[1] as (typeof authorSlugs)[number])) {
    return dateFromIsoString(TEAM_LAST_MODIFIED);
  }

  return dateFromIsoString(TEMPLATE_DEFAULTS["/"]);
}

/** Precompute blog/case-study dates for validation scripts. */
export function getSitemapDateCoverage() {
  const blogDates = blogSlugs.map((slug) => ({
    slug,
    date: resolveBlogSlugDate(slug)?.toISOString() ?? null,
  }));
  const caseStudyDates = caseStudySlugs.map((slug) => ({
    slug,
    date: resolveCaseStudyDate(slug)?.toISOString() ?? null,
  }));
  return { blogDates, caseStudyDates };
}
