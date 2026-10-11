import { stripLocalePrefix } from "@/lib/legacy-redirects.mjs";
import type { IndustrySlug } from "@/content/industries";
import { industryVisuals } from "@/content/industry-visuals";

/** Phone crop: the desk fills the bottom plate. */
export const HOME_HERO_POSTER = "/assets/images/home/hero-studio-phone.webp?v=20261010ll";
/** Desktop hero still. Framed with the subject on the right. */
export const HOME_HERO_POSTER_DESKTOP = "/assets/images/home/hero-studio.webp?v=20261010ll";
/** Light-mode phone still. White desk, same objects. */
export const HOME_HERO_POSTER_LIGHT = "/assets/images/home/hero-studio-light-phone.webp?v=20261010ll";
/** Light-mode desktop still. White desk, laptop, cup, and notebook in frame. */
export const HOME_HERO_POSTER_DESKTOP_LIGHT = "/assets/images/home/hero-studio-light.webp?v=20261010ll";

const INDUSTRY_DETAIL_RE = /^\/industries\/([a-z0-9-]+)\/?$/;
/** Route-specific LCP still to preload as the first `<head>` byte after charset. */
export function getLcpImagePreload(pathname: string): string | null {
  const path = stripLocalePrefix(pathname);
  if (path === "/") return null;
  const match = path.match(INDUSTRY_DETAIL_RE);
  if (!match) return null;
  const slug = match[1] as IndustrySlug;
  return industryVisuals[slug]?.thumb ?? null;
}
