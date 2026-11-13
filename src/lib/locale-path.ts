import { POSTS } from "@/lib/content";
import { INDUSTRIES } from "@/data/industries";
import { esPost } from "@/i18n/posts-es";
import { PAGES, type PageMeta } from "@/lib/pages";
import {
  type Locale,
  englishPath,
  isLocale,
  localeFromPath,
  pathFromSlug,
  switchHref as switchHrefWithMirrors,
  withLocale,
} from "@/lib/locale-core";

export type { Locale };
export {
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
  "pagina-web-para-plomeros",
  "como-pedir-resenas-en-google",
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

/** Same-page language link, or the locale home when that path has no translation. */
export function switchHref(locale: Locale, pathname: string): string {
  return switchHrefWithMirrors(locale, pathname, MIRROR_PATHS);
}
