import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getOgLocale } from "@/i18n/locale-tags";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.kinexisdigital.com").replace(/\/$/, "");

export const DEFAULT_OG_IMAGE_PATH = "/assets/images/kinexis_OG_image.webp";

/** Square brand mark for Organization/LocalBusiness logo rich results (not the wide OG card). */
export const ORGANIZATION_LOGO_PATH = "/assets/logos/KINEXIS_icon_logo.webp";

/**
 * Google SERP title display is pixel-based (~580–600px), ~50–60 characters.
 * Count visible/decoded characters. HTML encoding is not what Google shows.
 */
export const META_TITLE_MAX = 60;

/** Soft floor so branded titles still earn the snippet. Legal/utility pages may be shorter. */
export const META_TITLE_MIN = 50;

/** Appended by the root layout title template (`%s | Kinexis Digital`). */
export const TITLE_BRAND_SUFFIX = " | Kinexis Digital";

/** Max length for the page title segment before the layout brand suffix (60 − 18). */
export const META_TITLE_PAGE_MAX = META_TITLE_MAX - TITLE_BRAND_SUFFIX.length;

/** Min page segment so the full title lands at META_TITLE_MIN. */
export const META_TITLE_PAGE_MIN = META_TITLE_MIN - TITLE_BRAND_SUFFIX.length;

/**
 * Google typically shows ~150–160 characters on desktop, less on mobile.
 * Write 120–155. Prefer 140–155 on commercial pages.
 */
export const META_DESCRIPTION_MAX = 155;

export const META_DESCRIPTION_MIN = 120;

const BRAND_SUFFIXES = [
  " | KINEXIS Digital",
  " | Kinexis Digital",
  " | KINEXIS",
  " | Kinexis",
  " - KINEXIS Digital",
  " - Kinexis Digital",
  " - KINEXIS",
  " - Kinexis",
] as const;

export function getSiteUrl() {
  return SITE_URL;
}

export function getDefaultOgImageUrl() {
  return `${getSiteUrl()}${DEFAULT_OG_IMAGE_PATH}`;
}

export function getOrganizationLogoUrl() {
  return `${getSiteUrl()}${ORGANIZATION_LOGO_PATH}`;
}

export function buildLocalePath(_locale: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized || "/";
}

export function buildAbsoluteUrl(locale: Locale, path: string) {
  return `${getSiteUrl()}${buildLocalePath(locale, path)}`;
}

export type PageMetadataInput = {
  locale: Locale;
  path: string;
  /** Page title segment (brand suffix added by layout template unless `absolute`). */
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  /** When true with noIndex, emits nofollow (thank-you / utility pages). */
  noFollow?: boolean;
  /** Use a full title as-is (homepage). Skips the layout `%s | Brand` template. */
  absolute?: boolean;
  /** Article publish time for Open Graph when ogType is article. */
  publishedTime?: string;
  /** Article modified time for Open Graph when ogType is article. */
  modifiedTime?: string;
};

function collapseWhitespace(raw: string): string {
  return raw.replace(/\s{2,}/g, " ").trim();
}

/** Strip pipe characters that are used as visual line-break separators in hero
 *  subtitles but must not appear raw in meta description / OG tags. */
function cleanDescription(raw: string): string {
  return collapseWhitespace(raw.replace(/\|/g, " "));
}

function truncateAtWord(text: string, maxLength: number): string {
  const trimmed = collapseWhitespace(text);
  if (trimmed.length <= maxLength) return trimmed;

  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > Math.floor(maxLength * 0.55)) {
    return `${slice.slice(0, lastSpace).trimEnd()}…`;
  }

  return `${slice.trimEnd()}…`;
}

/** Remove a trailing brand suffix so the layout title template does not double it. */
export function stripBrandSuffix(title: string): string {
  const cleaned = collapseWhitespace(title);
  for (const suffix of BRAND_SUFFIXES) {
    if (cleaned.endsWith(suffix)) {
      return cleaned.slice(0, -suffix.length).trimEnd();
    }
  }
  return cleaned;
}

/** Normalize page titles for search snippets while preserving brand suffixes when possible. */
export function normalizeMetaTitle(title: string, maxLength = META_TITLE_MAX): string {
  const cleaned = collapseWhitespace(title);
  if (cleaned.length <= maxLength) return cleaned;

  for (const suffix of BRAND_SUFFIXES) {
    if (!cleaned.endsWith(suffix)) continue;

    const main = cleaned.slice(0, -suffix.length);
    const maxMain = maxLength - suffix.length;
    if (maxMain >= 12) {
      return `${truncateAtWord(main, maxMain)}${suffix}`;
    }
  }

  return truncateAtWord(cleaned, maxLength);
}

/** Normalize meta descriptions to a SERP-friendly length with word-boundary ellipsis. */
export function normalizeMetaDescription(description: string, maxLength = META_DESCRIPTION_MAX): string {
  return truncateAtWord(cleanDescription(description), maxLength);
}

/**
 * Full SEO metadata for a public page: canonical, robots, Open Graph, Twitter.
 * Pass titles without a brand suffix unless `absolute` is true (homepage).
 * Title segment target: 32–42 chars (full title 50–60). Description target: 120–155.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogImage,
  ogType,
  noIndex,
  noFollow,
  absolute,
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const safeDescription = normalizeMetaDescription(description);
  const url = buildAbsoluteUrl(locale, path);
  const imageUrl = ogImage ?? getDefaultOgImageUrl();

  const fullTitle = absolute
    ? normalizeMetaTitle(title)
    : normalizeMetaTitle(`${stripBrandSuffix(title)}${TITLE_BRAND_SUFFIX}`);

  const pageTitle = absolute
    ? fullTitle
    : normalizeMetaTitle(stripBrandSuffix(title), META_TITLE_PAGE_MAX);

  const follow = noFollow ? false : true;

  return {
    title: absolute ? { absolute: fullTitle } : pageTitle,
    description: safeDescription,
    robots: noIndex
      ? { index: false, follow }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: safeDescription,
      url,
      type: ogType ?? "website",
      siteName: "KINEXIS Digital",
      locale: getOgLocale(locale),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: "KINEXIS Digital" }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@kinexisdigital",
      title: fullTitle,
      description: safeDescription,
      images: [{ url: imageUrl, alt: "KINEXIS Digital" }],
    },
  };
}
