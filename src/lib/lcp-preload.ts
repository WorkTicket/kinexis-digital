import { stripLocalePrefix } from "@/lib/legacy-redirects.mjs";
import type { IndustrySlug } from "@/content/industries";
import { industryVisuals } from "@/content/industry-visuals";

export const HOME_HERO_POSTER = "/assets/video/hero-open-v2-poster-sm.webp";
/** 1080p still that matches the deferred desktop film (not on the mobile LCP path). */
export const HOME_HERO_POSTER_DESKTOP = "/assets/video/hero-open-v2-poster-film-opt.webp";

const INDUSTRY_DETAIL_RE = /^\/industries\/([a-z0-9-]+)\/?$/;
const GET_A_WEBSITE_RE = /^\/lp\/get-a-website\/?$/;
const GET_A_WEBSITE_LCP = "/assets/images/lp/a1-mobile.webp";

/** Route-specific LCP still to preload as the first `<head>` byte after charset. */
export function getLcpImagePreload(pathname: string): string | null {
  const path = stripLocalePrefix(pathname);
  if (path === "/") return null;
  if (GET_A_WEBSITE_RE.test(path)) return GET_A_WEBSITE_LCP;
  const match = path.match(INDUSTRY_DETAIL_RE);
  if (!match) return null;
  const slug = match[1] as IndustrySlug;
  return industryVisuals[slug]?.thumb ?? null;
}
