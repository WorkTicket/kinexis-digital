import type { Metadata } from "next";
import { locales, routing, type Locale } from "@/i18n/routing";
import { getHrefLang } from "@/i18n/locale-tags";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.kinexisdigital.com").replace(/\/$/, "");

export const DEFAULT_OG_IMAGE_PATH = "/assets/images/kinexis_OG_image.png";

/** Square brand mark for Organization/LocalBusiness logo rich results (not the wide OG card). */
export const ORGANIZATION_LOGO_PATH = "/assets/logos/KINEXIS_icon_logo.webp";

/** Google typically truncates titles around 60 characters in SERPs. */
export const META_TITLE_MAX = 60;

/** Google typically truncates descriptions around 155–160 characters. */
export const META_DESCRIPTION_MAX = 155;

export const META_DESCRIPTION_MIN = 50;

const BRAND_SUFFIXES = [" | KINEXIS Digital", " | KINEXIS", " - KINEXIS Digital", " - KINEXIS"] as const;

/** Approximate length once Next.js HTML-encodes common characters in meta tags. */
function encodedMetaLength(text: string): number {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .length;
}

function truncateToEncodedLength(text: string, maxEncodedLength: number): string {
  const trimmed = collapseWhitespace(text);
  if (encodedMetaLength(trimmed) <= maxEncodedLength) return trimmed;

  let low = 0;
  let high = trimmed.length;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    const candidate = truncateAtWord(trimmed, mid);
    if (encodedMetaLength(candidate) <= maxEncodedLength) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return truncateAtWord(trimmed, Math.max(1, low));
}

export function getSiteUrl() {
  return SITE_URL;
}

export function getDefaultOgImageUrl() {
  return `${getSiteUrl()}${DEFAULT_OG_IMAGE_PATH}`;
}

export function getOrganizationLogoUrl() {
  return `${getSiteUrl()}${ORGANIZATION_LOGO_PATH}`;
}

export function buildLocalePath(locale: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function buildAbsoluteUrl(locale: Locale, path: string) {
  return `${getSiteUrl()}${buildLocalePath(locale, path)}`;
}

export type PageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
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

/** Normalize page titles for search snippets while preserving brand suffixes when possible. */
export function normalizeMetaTitle(title: string, maxLength = META_TITLE_MAX): string {
  const cleaned = collapseWhitespace(title);
  if (encodedMetaLength(cleaned) <= maxLength) return cleaned;

  for (const suffix of BRAND_SUFFIXES) {
    if (!cleaned.endsWith(suffix)) continue;

    const main = cleaned.slice(0, -suffix.length);
    const maxMain = maxLength - encodedMetaLength(suffix);
    if (maxMain >= 12) {
      return `${truncateToEncodedLength(main, maxMain)}${suffix}`;
    }
  }

  return truncateToEncodedLength(cleaned, maxLength);
}

/** Normalize meta descriptions to a SERP-friendly length with word-boundary ellipsis. */
export function normalizeMetaDescription(description: string, maxLength = META_DESCRIPTION_MAX): string {
  return truncateToEncodedLength(cleanDescription(description), maxLength);
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogImage,
  ogType,
  noIndex,
}: PageMetadataInput): Metadata {
  const safeTitle = normalizeMetaTitle(title);
  const safeDescription = normalizeMetaDescription(description);
  const url = buildAbsoluteUrl(locale, path);
  const imageUrl = ogImage ?? getDefaultOgImageUrl();
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[getHrefLang(l)] = buildAbsoluteUrl(l, path);
  }
  languages["x-default"] = buildAbsoluteUrl(routing.defaultLocale, path);

  return {
    title: safeTitle,
    description: safeDescription,
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url,
      type: ogType ?? "website",
      siteName: "KINEXIS Digital",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: "KINEXIS Digital" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@kinexisdigital",
      title: safeTitle,
      description: safeDescription,
      images: [{ url: imageUrl, alt: "KINEXIS Digital" }],
    },
  };
}
