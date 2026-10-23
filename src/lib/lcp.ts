import { INDUSTRIES } from "@/data/industries";
import { POSTS } from "@/lib/content";
import { englishPath } from "@/lib/i18n";

export type HeroPreload = {
  href: string;
  srcSet?: string;
  sizes?: string;
  type?: string;
};

/** Page heroes that use one of the shared /assets/kinexis/heroes plates. */
const HERO_ART: Record<string, string> = {
  "/services": "homepage",
  "/web-design": "web-design",
  "/seo-services": "local-seo",
  "/audit": "website-audit",
  "/contact": "contact",
  "/website-management": "maintenance",
  "/about": "about",
  "/portfolio": "portfolio",
  "/reviews": "reviews",
  "/upgrades": "upgrades",
  "/pricing": "pricing",
  "/pay": "pricing",
  "/blog": "blog",
  "/faqs": "faqs",
};

const ART_SIZES = "(max-width: 860px) 86vw, 500px";

function art(name: string, sizes = ART_SIZES): HeroPreload {
  const base = `/assets/kinexis/heroes/${name}`;
  return {
    href: `${base}-720.avif`,
    srcSet: `${base}-560.avif 560w, ${base}-720.avif 720w, ${base}-1120.avif 1120w`,
    sizes,
    type: "image/avif",
  };
}

function industry(slug: string): HeroPreload | null {
  if (!INDUSTRIES.some((item) => item.slug === slug)) return null;
  const base = `/assets/industries/${slug}`;
  return {
    href: `${base}/hero-768.avif`,
    srcSet: `${base}/hero-768.avif 768w, ${base}/hero.avif 1536w`,
    sizes: "(max-width: 860px) 86vw, 620px",
    type: "image/avif",
  };
}

/**
 * The image each page paints largest, so the layout can preload it from <head>.
 * Without this the file is only discovered after the HTML around it has parsed,
 * which adds a full network round trip to LCP on a slow connection.
 */
export function heroPreload(pathname: string): HeroPreload | null {
  const path = englishPath(pathname);

  if (path === "/") {
    return {
      href: "/assets/video/hero-rLicrajNvqM-poster.avif",
      srcSet: "/assets/video/hero-rLicrajNvqM-poster-640.avif 640w, /assets/video/hero-rLicrajNvqM-poster.avif 768w",
      sizes: "(max-width: 860px) 100vw, 560px",
      type: "image/avif",
    };
  }

  if (path.startsWith("/industries/")) {
    return industry(path.split("/")[2] || "");
  }

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    const post = POSTS.find((item) => item.slug === slug);
    // Spanish posts use the shared article plate; English posts use the cover art.
    return pathname.startsWith("/es") ? art("blog") : post ? { href: post.image.replace(".webp", ".avif"), type: "image/avif" } : null;
  }

  const name = HERO_ART[path];
  return name ? art(name) : null;
}
