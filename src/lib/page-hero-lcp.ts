import { IMAGE_SIZES, STILL_VERSION, still } from "@/lib/image-sources";

/** Same widths as `HeroImage` in ui.tsx — keep in lockstep to avoid double-fetch. */
export const PAGE_HERO_WIDTHS = [480, 640, 960, 1254] as const;

/** Shared with PageHero / HeroImage priority art. */
export const PAGE_HERO_SIZES = IMAGE_SIZES.pageHero;

/**
 * Exact EN pathname → hero file stem under `/assets/heroes/`.
 * Locale prefixes (`/es`, `/es-es`) are stripped before lookup.
 * Prefix rules (case-studies) live in `pageHeroFileForPath`.
 */
export const PAGE_HERO_BY_PATH: Record<string, string> = {
  "/services": "01-homepage",
  "/portfolio": "02-portfolio",
  "/about": "03-about",
  "/reviews": "05-reviews",
  "/pricing": "06-pricing",
  "/pay": "06-pricing",
  "/web-design": "07-web-design",
  "/seo-services": "08-local-seo",
  "/audit": "09-website-audit",
  "/website-management": "10-maintenance",
  "/faqs": "11-faqs",
  "/blog": "12-blog",
  "/contact": "13-contact",
  "/strategy-call": "13-contact",
  "/upgrades": "14-upgrades",
};

export function pageHeroFileForPath(pathname: string): string | null {
  let path = pathname || "/";
  if (path === "/es" || path.startsWith("/es/")) {
    path = path === "/es" ? "/" : path.slice(3);
  } else if (path === "/es-es" || path.startsWith("/es-es/")) {
    path = path === "/es-es" ? "/" : path.slice(6);
  }
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.startsWith("/case-studies/")) return "02-portfolio";
  return PAGE_HERO_BY_PATH[path] ?? null;
}

export function pageHeroSrcSet(file: string, format: "avif" | "webp") {
  const base = `/assets/heroes/${file}`;
  return PAGE_HERO_WIDTHS.map((width) => `${still(`${base}-${width}.${format}`)} ${width}w`).join(", ");
}

export function pageHeroPreloadHref(file: string) {
  return still(`/assets/heroes/${file}-480.avif`);
}

/**
 * Sync early-head boot: insert page-hero LCP preload before FOUC CSS.
 * DocumentShell must stay sync (headers()/async drops experimental.inlineCss).
 * Home `/` is skipped — poster preload is the static link in DocumentShell.
 */
export function pageHeroPreloadBootScript() {
  const entries = Object.entries(PAGE_HERO_BY_PATH)
    .map(([path, file]) => `${JSON.stringify(path)}:${JSON.stringify(file)}`)
    .join(",");
  const sizes = JSON.stringify(PAGE_HERO_SIZES);
  const widths = PAGE_HERO_WIDTHS.join(",");
  const version = JSON.stringify(STILL_VERSION);
  return `(function(){
var p=location.pathname||"/";
if(p==="/es"||p.indexOf("/es/")===0){p=p==="/es"?"/":p.slice(3)}
else if(p==="/es-es"||p.indexOf("/es-es/")===0){p=p==="/es-es"?"/":p.slice(6)}
if(p.length>1&&p.charAt(p.length-1)==="/")p=p.slice(0,-1);
if(p==="/")return;
var map={${entries}};
var file=p.indexOf("/case-studies/")===0?"02-portfolio":map[p];
if(!file)return;
var v=${version},sizes=${sizes},widths=[${widths}];
var href="/assets/heroes/"+file+"-480.avif?v="+v;
var srcset=widths.map(function(w){return "/assets/heroes/"+file+"-"+w+".avif?v="+v+" "+w+"w"}).join(", ");
var l=document.createElement("link");
l.rel="preload";l.as="image";l.href=href;l.type="image/avif";
l.setAttribute("imagesrcset",srcset);
l.setAttribute("imagesizes",sizes);
l.setAttribute("fetchpriority","high");
var s=document.currentScript;
(s&&s.parentNode?s.parentNode:document.head).insertBefore(l,s||document.head.firstChild);
})();`;
}
