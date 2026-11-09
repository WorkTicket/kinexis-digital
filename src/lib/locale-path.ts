import { POSTS } from "@/lib/content";
import { INDUSTRIES } from "@/data/industries";
import { PAGES, type PageMeta } from "@/lib/pages";

/** Cookie values. `es-419` is Latam Spanish. `es-ES` is Spain. */
export type Locale = "en" | "es-419" | "es-ES";

const UNMIRRORED = new Set(["/pay"]);

/**
 * Linked from Spanish chrome/footer but kept `indexable: false` in PAGES
 * (legal/utility). Still need static Spanish routes — otherwise /es/terms etc. 404.
 */
const MIRRORED_UTILITY = new Set(["/terms", "/privacy", "/update"]);

/** English paths that have a real Spanish page. Portfolio case studies stay English. */
export const MIRROR_PATHS: readonly string[] = [
  ...(Object.values(PAGES) as PageMeta[])
    .filter((page) => !UNMIRRORED.has(page.path) && (page.indexable || MIRRORED_UTILITY.has(page.path)))
    .map((page) => page.path),
  ...INDUSTRIES.map((industry) => `/industries/${industry.slug}`),
  ...POSTS.map((post) => `/blog/${post.slug}`),
];

const MIRROR = new Set(MIRROR_PATHS);

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "es-419" || value === "es-ES";
}

/** Locale comes from the URL only. Accept-Language never changes the HTML. */
export function localeFromPath(pathname: string): Locale {
  if (pathname === "/es-es" || pathname.startsWith("/es-es/")) return "es-ES";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es-419";
  return "en";
}

export function englishPath(pathname: string): string {
  if (pathname === "/es" || pathname === "/es-es") return "/";
  if (pathname.startsWith("/es-es/")) return pathname.slice("/es-es".length) || "/";
  if (pathname.startsWith("/es/")) return pathname.slice("/es".length) || "/";
  return pathname || "/";
}

export function isMirrored(pathname: string): boolean {
  return MIRROR.has(englishPath(pathname));
}

export function withLocale(locale: Locale, pathname: string): string {
  const en = englishPath(pathname);
  if (locale === "en") return en;
  const prefix = locale === "es-ES" ? "/es-es" : "/es";
  return en === "/" ? prefix : `${prefix}${en}`;
}

/** Same-page language link, or the locale home when that path has no translation. */
export function switchHref(locale: Locale, pathname: string): string {
  const en = englishPath(pathname);
  return withLocale(locale, isMirrored(en) ? en : "/");
}

export function pathFromSlug(slug?: string[]): string {
  if (!slug?.length) return "/";
  return `/${slug.join("/")}`;
}
