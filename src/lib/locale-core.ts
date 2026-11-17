/** Cookie / URL locale values. Safe for client components — no server-only imports. */
export type Locale = "en" | "es-419" | "es-ES";

/** Spanish-only legacy articles with clear current English equivalents. */
export const ENGLISH_FALLBACK_PATHS: Readonly<Record<string, string>> = {
  "/blog/pagina-web-para-plomeros": "/industries/plumbing",
  "/blog/como-pedir-resenas-en-google": "/blog/how-to-ask-for-google-reviews-contractor",
};

/** Existing translated checkout routes that intentionally remain noindex/no-hreflang. */
export const SPANISH_UTILITY_PATHS = ["/pay", "/pay/thanks"] as const;

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

export function withLocale(locale: Locale, pathname: string): string {
  const en = englishPath(pathname);
  if (locale === "en") return en;
  // Spain locale URLs 301 to LatAm `/es`; never emit fresh `/es-es` links.
  const prefix = "/es";
  return en === "/" ? prefix : `${prefix}${en}`;
}

/** Same-page language link, or the locale home when that path has no translation. */
export function switchHref(locale: Locale, pathname: string, mirroredPaths: readonly string[]): string {
  const en = englishPath(pathname);
  if (locale === "en" && ENGLISH_FALLBACK_PATHS[en]) return ENGLISH_FALLBACK_PATHS[en];
  const mirrored = mirroredPaths.includes(en) || SPANISH_UTILITY_PATHS.includes(en as (typeof SPANISH_UTILITY_PATHS)[number]);
  return withLocale(locale, mirrored ? en : "/");
}

export function pathFromSlug(slug?: string[]): string {
  if (!slug?.length) return "/";
  return `/${slug.join("/")}`;
}
