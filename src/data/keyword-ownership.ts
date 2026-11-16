/**
 * Keyword → primary URL ownership map (CONTENT-PLAN §3 / owner SEO findings).
 * One commercial intent → one money URL. Secondaries support; they do not get
 * a second money page. Volumes/KD/CPC stay out of this file — never invent them.
 */

export type KeywordOwnership = {
  /** Normalized intent label (not a search-volume claim). */
  intent: string;
  /** Canonical path that owns the intent. */
  owns: string;
  /** Notes for editors / CI. */
  notes?: string;
};

/** Locked ownership rows. Keep in sync with docs/seo/CONTENT-PLAN.md §3. */
export const KEYWORD_OWNERSHIP: KeywordOwnership[] = [
  { intent: "contractor website design", owns: "/web-design", notes: "Service page" },
  { intent: "plumber website design", owns: "/industries/plumbing", notes: "Hub" },
  { intent: "website design for plumbers", owns: "/industries/plumbing", notes: "Hub synonym" },
  { intent: "landscaping website design", owns: "/industries/landscaping", notes: "Hub" },
  { intent: "hvac website design", owns: "/industries/hvac", notes: "Hub" },
  { intent: "electrician website design", owns: "/industries/electrical", notes: "Hub" },
  { intent: "roofing website design", owns: "/industries/roofing", notes: "Hub" },
  { intent: "garage door website design", owns: "/industries/garage-doors", notes: "Hub" },
  { intent: "pressure washing website design", owns: "/industries/pressure-washing", notes: "Hub" },
  {
    intent: "painting website design",
    owns: "/industries/painting",
    notes: "Hub (may be hold until Phase 3)",
  },
  {
    intent: "remodeling contractor website design",
    owns: "/industries/remodeling",
    notes: "Hub (may be hold until Phase 3)",
  },
  {
    intent: "contractor website cost",
    owns: "/pricing",
    notes: "Do not create a blog cost article for this",
  },
  {
    intent: "how much does a contractor website cost",
    owns: "/pricing",
    notes: "Same intent as contractor website cost",
  },
  { intent: "plumber website cost", owns: "/blog/plumber-website-cost" },
  { intent: "hvac website cost", owns: "/blog/hvac-website-cost" },
  { intent: "electrician website cost", owns: "/blog/electrician-website-cost" },
  { intent: "roofing website cost", owns: "/blog/roofing-website-cost" },
  { intent: "garage door website cost", owns: "/blog/garage-door-website-cost" },
  { intent: "landscaping website cost", owns: "/blog/landscaping-website-cost" },
  { intent: "pressure washing website cost", owns: "/blog/pressure-washing-website-cost" },
  { intent: "painting website cost", owns: "/blog/painting-website-cost" },
  { intent: "remodeling website cost", owns: "/blog/remodeling-website-cost" },
  { intent: "pool service website cost", owns: "/blog/pool-service-website-cost" },
  { intent: "window cleaning website cost", owns: "/blog/window-cleaning-website-cost" },
  { intent: "lawn care website cost", owns: "/blog/lawn-care-website-cost" },
  {
    intent: "contractor website checklist",
    owns: "/blog/web-design-for-contractors",
    notes: "Shared checklist",
  },
  {
    intent: "contractor website not generating leads",
    owns: "/blog/website-mistakes-that-cost-you-calls",
  },
  {
    intent: "turn clicks into calls",
    owns: "/blog/turn-clicks-into-calls",
    notes: "Keep purpose separate from mistakes article",
  },
  {
    intent: "local SEO for contractors",
    owns: "/blog/local-seo-get-found-get-called",
  },
  {
    intent: "Google Business Profile checklist",
    owns: "/blog/google-business-profile-checklist",
  },
  {
    intent: "monthly vs one-time Own It",
    owns: "/blog/monthly-website-vs-own-it",
  },
  {
    intent: "Wix vs Squarespace vs managed",
    owns: "/blog/wix-vs-squarespace-vs-managed-website-contractors",
  },
  {
    intent: "freelancer vs agency vs subscription",
    owns: "/blog/freelancer-vs-agency-vs-subscription-website",
  },
  { intent: "SEO services", owns: "/seo-services" },
  { intent: "portfolio examples", owns: "/portfolio" },
  {
    intent: "contractor website redesign migration",
    owns: "/blog/contractor-website-redesign-checklist",
  },
  {
    intent: "how to choose a contractor web designer",
    owns: "/blog/how-to-choose-contractor-web-designer",
  },
  {
    intent: "contractor website quote form",
    owns: "/blog/contractor-website-quote-form",
  },
];

/**
 * Blog slugs that would cannibalize /pricing (generic contractor cost / plan
 * comparison). Trade *-website-cost posts are allowed; they must link to /pricing.
 */
export const FORBIDDEN_BLOG_SLUGS: readonly string[] = [
  "contractor-website-cost",
  "contractor-website-pricing",
  "how-much-does-a-contractor-website-cost",
  "contractor-website-prices",
  "cost-of-a-contractor-website",
  "website-cost-for-contractors",
  "contractor-web-design-cost",
  "how-much-is-a-contractor-website",
];

/** Broad listicle intents to avoid as new money URLs (CONTENT-PLAN §3). */
export const AVOID_NEW_MONEY_INTENTS: readonly string[] = [
  "best website builder for contractors",
  "plumber website examples",
  "best contractor websites",
];

/** Normalize a path for comparison (no trailing slash except root). */
export function normalizeOwnedPath(path: string): string {
  if (!path || path === "/") return "/";
  const trimmed = path.trim();
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.length > 1 && withSlash.endsWith("/") ? withSlash.slice(0, -1) : withSlash;
}
