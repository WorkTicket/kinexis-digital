import type { IndustrySlug } from "@/content/industries";
import { industryVisuals } from "@/content/industry-visuals";

export const HOME_HERO_POSTER = "/assets/video/hero-open-v2-poster-sm.webp";
/** 1080p still that matches the deferred desktop film (not on the mobile LCP path). */
export const HOME_HERO_POSTER_DESKTOP = "/assets/video/hero-open-v2-poster-film-opt.webp";

const LOCALE_PREFIX_RE = /^\/(en|es-ES|es-419)(?=\/|$)/;
const INDUSTRY_DETAIL_RE = /^\/industries\/([a-z0-9-]+)\/?$/;
const DALLAS_AUDIT_RE = /^\/lp\/dallas-website-audit\/?$/;
const DALLAS_LCP = "/assets/images/lp/showcase-ridge.webp?v=20260904c";

function stripLocale(pathname: string) {
  const stripped = pathname.replace(LOCALE_PREFIX_RE, "");
  return stripped.length > 0 ? stripped : "/";
}

/** Route-specific LCP still to preload as the first `<head>` byte after charset. */
export function getLcpImagePreload(pathname: string): string | null {
  const path = stripLocale(pathname);
  if (path === "/") return null;
  if (DALLAS_AUDIT_RE.test(path)) return DALLAS_LCP;
  const match = path.match(INDUSTRY_DETAIL_RE);
  if (!match) return null;
  const slug = match[1] as IndustrySlug;
  return industryVisuals[slug]?.thumb ?? null;
}
