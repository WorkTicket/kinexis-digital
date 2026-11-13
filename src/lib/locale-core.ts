/** Cookie / URL locale values. Safe for client components — no server-only imports. */
export type Locale = "en" | "es-419" | "es-ES";

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
  const prefix = locale === "es-ES" ? "/es-es" : "/es";
  return en === "/" ? prefix : `${prefix}${en}`;
}

/** Same-page language link, or the locale home when that path has no translation. */
export function switchHref(locale: Locale, pathname: string, mirroredPaths: readonly string[]): string {
  const en = englishPath(pathname);
  const mirrored = mirroredPaths.includes(en);
  return withLocale(locale, mirrored ? en : "/");
}

export function pathFromSlug(slug?: string[]): string {
  if (!slug?.length) return "/";
  return `/${slug.join("/")}`;
}
