import { POSTS } from "@/lib/content";
import { INDUSTRIES } from "@/data/industries";
import { esPost } from "@/i18n/posts-es";
import { PAGES, type PageMeta } from "@/lib/pages";
import {
  type Locale,
  ENGLISH_FALLBACK_PATHS,
  SPANISH_UTILITY_PATHS,
  englishPath,
  isLocale,
  localeFromPath,
  pathFromSlug,
  switchHref as switchHrefWithMirrors,
  withLocale,
} from "@/lib/locale-core";

export type { Locale };
export {
  ENGLISH_FALLBACK_PATHS,
  SPANISH_UTILITY_PATHS,
  englishPath,
  isLocale,
  localeFromPath,
  pathFromSlug,
  withLocale,
};

const UNMIRRORED = new Set(["/pay", "/tools/missed-call-calculator", "/tools/google-review-link-qr"]);

/**
 * English URLs that 301 away (Spanish-slug duplicates). Keep Spanish copies
 * indexable, but do not advertise the retired English URL in hreflang/sitemap.
 */
export const EN_REDIRECTED_BLOG_SLUGS = new Set([
  ...Object.keys(ENGLISH_FALLBACK_PATHS).map((path) => path.slice("/blog/".length)),
]);

/**
 * Linked from Spanish chrome/footer but kept `indexable: false` in PAGES
 * (legal/utility). Still need static Spanish routes — otherwise /es/terms etc. 404.
 */
const MIRRORED_UTILITY = new Set(["/terms", "/privacy", "/update", "/intake"]);

/** English paths that have a real Spanish page. Portfolio case studies stay English. */
export const MIRROR_PATHS: readonly string[] = [
  ...(Object.values(PAGES) as PageMeta[])
    .filter((page) => !UNMIRRORED.has(page.path) && (page.indexable || MIRRORED_UTILITY.has(page.path)))
    .map((page) => page.path),
  ...INDUSTRIES.map((industry) => `/industries/${industry.slug}`),
  // Only mirror posts that already have Spanish copy — EN-only drafts 404 on /es|/es-es.
  ...POSTS.filter((post) => esPost(post.slug)).map((post) => `/blog/${post.slug}`),
];

const MIRROR = new Set(MIRROR_PATHS);

export function isMirrored(pathname: string): boolean {
  return MIRROR.has(englishPath(pathname));
}

/**
 * hreflang set. `es` and `es-US` share the Latam URL. `es-419` is not a valid
 * hreflang code. Spain (`es-ES`) is omitted — `/es-es` 301s to `/es`.
 *
 * EN-only pages (tools, case studies, unmirrored posts) self-reference
 * `en-US` + `x-default`. Do not invent `/es/…` counterparts.
 */
export function hreflangLanguages(pathname: string): Record<string, string> | undefined {
  const en = englishPath(pathname);
  const blogSlug = en.startsWith("/blog/") ? en.slice("/blog/".length) : "";
  // Retired English Spanish-slug posts: Spanish-only hreflang (no EN alternate).
  if (blogSlug && EN_REDIRECTED_BLOG_SLUGS.has(blogSlug)) {
    const es = withLocale("es-419", en);
    return {
      es,
      "es-US": es,
      "x-default": es,
    };
  }
  if (isMirrored(en)) {
    const es = withLocale("es-419", en);
    return {
      "en-US": en,
      es,
      "es-US": es,
      "x-default": en,
    };
  }
  return {
    "en-US": en,
    "x-default": en,
  };
}

/** Keep Spanish navigation on English URLs when a page has no Spanish copy. */
export function localeHref(locale: Locale, pathname: string): string {
  const suffixAt = pathname.search(/[?#]/);
  const path = suffixAt === -1 ? pathname : pathname.slice(0, suffixAt);
  const suffix = suffixAt === -1 ? "" : pathname.slice(suffixAt);
  const en = englishPath(path);
  if (locale === "en" || UNMIRRORED.has(en) || !MIRROR.has(en)) return `${en}${suffix}`;
  return `${withLocale(locale, en)}${suffix}`;
}

/**
 * Rewrite root-absolute internal hrefs in Spanish HTML bodies so they stay on
 * the current locale (and avoid EN 301s for Spanish-only blog slugs).
 * Leaves assets, file URLs, and unmirrored routes (e.g. /tools/*) alone.
 */
export function localizeHtmlHrefs(html: string, locale: Locale): string {
  if (locale === "en") return html;
  return html.replace(/\bhref=(["'])(\/[^"'#?]*)\1/g, (full, quote: string, path: string) => {
    if (!path || path === "/") return `href=${quote}${withLocale(locale, "/")}${quote}`;
    if (path.startsWith("/assets/") || path.startsWith("/og/") || path.startsWith("/portfolio/")) return full;
    if (/\.[a-z0-9]{2,5}$/i.test(path)) return full;
    const en = englishPath(path);
    if (UNMIRRORED.has(en)) return full;
    if (!isMirrored(en) && !MIRRORED_UTILITY.has(en)) return full;
    return `href=${quote}${withLocale(locale, en)}${quote}`;
  });
}

/** Same-page language link, or the locale home when that path has no translation. */
export function switchHref(locale: Locale, pathname: string): string {
  return switchHrefWithMirrors(locale, pathname, MIRROR_PATHS);
}
