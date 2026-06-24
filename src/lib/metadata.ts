import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { getHrefLang } from "@/i18n/locale-tags";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.kinexisdigital.com").replace(/\/$/, "");

export const DEFAULT_OG_IMAGE_PATH = "/assets/images/kinexis_OG_image.png";

export function getSiteUrl() {
  return SITE_URL;
}

export function getDefaultOgImageUrl() {
  return `${getSiteUrl()}${DEFAULT_OG_IMAGE_PATH}`;
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
  noIndex?: boolean;
};

/** Strip pipe characters that are used as visual line-break separators in hero
 *  subtitles but must not appear raw in meta description / OG tags. */
function cleanDescription(raw: string): string {
  return raw.replace(/\|/g, " ").replace(/\s{2,}/g, " ").trim();
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogImage,
  noIndex,
}: PageMetadataInput): Metadata {
  const safeDescription = cleanDescription(description);
  const url = buildAbsoluteUrl(locale, path);
  const imageUrl = ogImage ?? getDefaultOgImageUrl();
  const languages: Record<string, string> = {
    "x-default": buildAbsoluteUrl("en", path),
  };
  for (const l of locales) {
    languages[getHrefLang(l)] = buildAbsoluteUrl(l, path);
  }

  return {
    title,
    description: safeDescription,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description: safeDescription,
      url,
      type: "website",
      siteName: "KINEXIS Digital",
      images: [{ url: imageUrl, alt: "KINEXIS Digital" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: safeDescription,
      images: [imageUrl],
    },
  };
}
