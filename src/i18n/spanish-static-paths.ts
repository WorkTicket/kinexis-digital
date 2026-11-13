/**
 * Static Spanish marketing paths that must exist in PAGE_META + SpanishPage.
 * Industry slugs and translated blog posts are covered separately (dynamic).
 */
export const SPANISH_STATIC_META_PATHS = [
  "/",
  "/services",
  "/web-design",
  "/seo-services",
  "/audit",
  "/contact",
  "/website-management",
  "/about",
  "/portfolio",
  "/industries",
  "/reviews",
  "/upgrades",
  "/pricing",
  "/blog",
  "/faqs",
  "/update",
  "/intake",
  "/strategy-call",
  "/terms",
  "/privacy",
] as const;

export type SpanishStaticPath = (typeof SPANISH_STATIC_META_PATHS)[number];

export const SPANISH_STATIC_META_PATH_SET = new Set<string>(SPANISH_STATIC_META_PATHS);
