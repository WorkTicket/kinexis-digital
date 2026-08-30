import type { BlogPost } from "@/content/blog";
import type { Locale } from "@/i18n/routing";
import { isSpanishLocale } from "@/i18n/spanish";
import { getBlogContent } from "@/content/blog";
import { getBlogArticle } from "@/content/blog-articles";
import { getClusterPost } from "@/content/blog-clusters";
import { blogSlugs } from "@/content/registry/site-routes";
import { buildAbsoluteUrl, normalizeMetaDescription } from "@/lib/metadata";

const POST_PUBLISHED_AT: Record<string, string> = {
  "seo-pricing-guide": "2026-07-14",
  "how-long-does-seo-take": "2026-07-14",
  "email-nurture-sequences-that-book-calls": "2026-06-20",
  "local-seo-strategy-2026": "2026-06-15",
  "website-conversion-optimization": "2026-06-08",
  "google-business-profile-tips": "2026-05-25",
  "seo-vs-google-ads": "2026-05-12",
  "technical-seo-fundamentals": "2026-04-28",
  "local-business-growth-playbook": "2026-04-15",
  "lifecycle-marketing": "2026-03-14",
  "heatmap-analysis": "2026-03-12",
  "attribution-models": "2026-03-11",
  "technical-seo-guide": "2026-03-10",
  "quality-score-guide": "2026-03-08",
  "automated-nurture-sequences": "2026-03-07",
  "conversion-psychology": "2026-03-06",
  "internal-linking-guide": "2026-03-05",
  "ga4-reporting": "2026-03-04",
  "negative-keywords-guide": "2026-03-01",
  "seo-audit-framework": "2026-02-28",
  "email-segmentation": "2026-02-28",
  "marketing-dashboards": "2026-02-26",
  "landing-page-best-practices": "2026-02-25",
  "ab-testing-framework": "2026-02-22",
  "link-building-strategies": "2026-02-20",
  "roas-calculations": "2026-02-18",
  "local-seo-checklist": "2026-02-15",
  "landing-page-optimization": "2026-02-10",
};

/** Cornerstone pieces surfaced like Clay's "Design Guides" block. */
export const FIELD_GUIDE_SLUGS = [
  "seo-pricing-guide",
  "how-long-does-seo-take",
  "local-seo-strategy-2026",
  "technical-seo-guide",
  "local-business-growth-playbook",
] as const;

export const BLOG_CATEGORY_META: Record<
  string,
  { slug: string; label: string; title: string; description: string }
> = {
  SEO: {
    slug: "seo",
    label: "SEO",
    title: "SEO Playbooks for Service Brands",
    description:
      "Rankings, technical SEO, and local systems that still move the needle for home services and ecommerce brands. Notes from programs we run.",
  },
  "Web Design": {
    slug: "web-design",
    label: "Web Design",
    title: "Web Design and Conversion Guides",
    description:
      "Structure, clarity, and site changes that turn traffic into calls, demos, and checkout. What we change first when a page leaks demand.",
  },
  "Paid Ads": {
    slug: "paid-ads",
    label: "Paid Ads",
    title: "Paid Ads Playbooks You Can Defend",
    description:
      "Spend you can defend: Quality Score, negatives, landing-page match, and ROAS that holds up when finance asks what the budget bought.",
  },
  CRO: {
    slug: "cro",
    label: "CRO",
    title: "CRO Guides and Testing Playbooks",
    description:
      "Why buyers say yes, and the tests that prove it on the page before you buy more traffic. Practical notes from conversion programs.",
  },
  Email: {
    slug: "email",
    label: "Email",
    title: "Email Marketing Guides and Notes",
    description:
      "Sequences and segments that book calls instead of clogging inboxes with empty blasts. Built for operators who measure replies and revenue.",
  },
  Analytics: {
    slug: "analytics",
    label: "Analytics",
    title: "Analytics Guides That Change Decisions",
    description:
      "Attribution, dashboards, and the numbers that actually change marketing decisions. Reporting you can take into a weekly review.",
  },
  "Case Studies": {
    slug: "case-studies",
    label: "Case Studies",
    title: "Field Notes and Client Playbooks",
    description:
      "Playbooks from demand programs we ran in the field, with the lifts we can publish. Strategy and numbers, not vanity slides.",
  },
};

/** SERP-only titles/descriptions. Page H1s and card excerpts stay unchanged. */
export const BLOG_SERP_META: Record<string, { title: string; description: string }> = {
  "seo-pricing-guide": {
    title: "How Much to Budget for SEO in 2026",
    description:
      "SEO retainers run from a few hundred to tens of thousands a month. What each tier buys, how to spot a fair price, and what to expect before you sign.",
  },
  "how-long-does-seo-take": {
    title: "SEO Timelines: When Results Show",
    description:
      "Four to six months is the usual answer. The real timeline depends on competition, budget, and starting point. Here is what to expect month by month.",
  },
  "local-seo-strategy-2026": {
    title: "Local SEO Strategy That Works in 2026",
    description:
      "Google keeps changing local search. We tested what still moves rankings in 2026 for service businesses that need calls, not map-pack vanity.",
  },
  "email-nurture-sequences-that-book-calls": {
    title: "Email Sequences That Book More Calls",
    description:
      "Most nurture flows die in the inbox. The sequence structure, timing, and messaging that turn cold subscribers into booked calls without burning the list.",
  },
  "website-conversion-optimization": {
    title: "7 Site Changes That Lifted CR 340%",
    description:
      "A client site went from 1.2% conversion to over 5% in 60 days. Seven specific changes, why they worked, and how much each one contributed.",
  },
  "google-business-profile-tips": {
    title: "Google Business Profile Checklist",
    description:
      "Your Google Business Profile is the strongest free local channel most operators ignore. A checklist ranked by impact on calls and map-pack visibility.",
  },
  "seo-vs-google-ads": {
    title: "SEO vs Google Ads: Where to Invest",
    description:
      "Organic versus paid is the oldest budget fight in marketing. A practical framework for where to invest first based on timeline, budget, and model.",
  },
  "technical-seo-fundamentals": {
    title: "Technical SEO Every Owner Should Know",
    description:
      "Crawl, index, speed, and structured data without the jargon. The technical SEO fundamentals that decide whether your pages can rank at all.",
  },
  "local-business-growth-playbook": {
    title: "Local Growth Playbook: 5 Channels",
    description:
      "Five channels that still book work for local operators: search, maps, the site, paid, and reviews. What to run first when referrals stall.",
  },
  "seo-audit-framework": {
    title: "SEO Audit Framework, Step by Step",
    description:
      "How we prioritize technical fixes by revenue impact. A step-by-step SEO audit framework you can run before buying more content or links.",
  },
  "landing-page-best-practices": {
    title: "Landing Page Practices for Paid Ads",
    description:
      "What converts on paid traffic landing pages: message match, proof, and a CTA that survives a phone screen. Practices we use on live spend.",
  },
  "roas-calculations": {
    title: "ROAS: Measuring True Ad Profitability",
    description:
      "ROAS that finance will accept. How to calculate true ad profitability when tracking is messy and not every conversion is a booked job.",
  },
  "heatmap-analysis": {
    title: "Heatmap Analysis for Conversion Lifts",
    description:
      "How to read heatmaps without chasing vanity clicks. The patterns that show why buyers hesitate, and the page tests worth running next.",
  },
  "lifecycle-marketing": {
    title: "Lifecycle Marketing: Full Buyer Journey",
    description:
      "Map the full customer journey so email, ads, and the site stop fighting. Lifecycle marketing that compounds after the first conversion.",
  },
  "quality-score-guide": {
    title: "Google Ads Quality Score Playbook",
    description:
      "Quality Score is not a vanity metric. How expected CTR, ad relevance, and landing experience move cost per click on search campaigns.",
  },
  "negative-keywords-guide": {
    title: "Negative Keywords That Protect Spend",
    description:
      "The negative keyword lists that stop junk queries from eating budget. How we build, review, and prune them on live PPC accounts.",
  },
  "email-segmentation": {
    title: "Email Segmentation That Converts",
    description:
      "Segments that book calls instead of blasting everyone the same offer. How we split lists by intent, recency, and what someone already bought.",
  },
  "ga4-reporting": {
    title: "GA4 Reporting for Marketing Teams",
    description:
      "GA4 reports marketing teams actually use in weekly reviews. Events, conversions, and views that show whether spend is creating pipeline.",
  },
};

export type ResolvedBlogPost = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  publishedAtIso: string;
  excerpt: string;
  body: string;
  readingMinutes: number;
  featured: boolean;
};

function postTimestamp(post: BlogPost): number {
  const iso = POST_PUBLISHED_AT[post.slug];
  return iso ? Date.parse(iso) : 0;
}

export function displayTitle(title: string): string {
  return title.replace(/\|/g, " ").replace(/\s+/g, " ").trim();
}

export function getPostIsoDate(slug: string): string {
  return POST_PUBLISHED_AT[slug] ?? "2026-01-01";
}

export function estimateReadingMinutes(body: string): number {
  const words = body
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function sortPostsByRecency(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => postTimestamp(b) - postTimestamp(a));
}

export function getRecentPosts(
  posts: BlogPost[],
  limit: number,
  excludeFeatured = true,
): BlogPost[] {
  const pool = excludeFeatured ? posts.filter((post) => !post.featured) : posts;
  return sortPostsByRecency(pool).slice(0, limit);
}

export function getBlogListingPosts(locale: Locale = "en"): BlogPost[] {
  return getBlogContent(locale).posts;
}

export function getBlogCategories(locale: Locale = "en"): string[] {
  const allLabel = isSpanishLocale(locale) ? "Todos" : "All";
  return getBlogContent(locale).categories.filter((c) => c !== allLabel);
}

const CATEGORY_NAME_TO_SLUG: Record<string, string> = {
  All: "all",
  Todos: "all",
  SEO: "seo",
  "Web Design": "web-design",
  "Diseño Web": "web-design",
  "Paid Ads": "paid-ads",
  "Anuncios Pagados": "paid-ads",
  CRO: "cro",
  Email: "email",
  Analytics: "analytics",
  Analítica: "analytics",
  "Case Studies": "case-studies",
  "Casos de Estudio": "case-studies",
};

export function categoryToSlug(category: string): string {
  return (
    CATEGORY_NAME_TO_SLUG[category] ??
    BLOG_CATEGORY_META[category]?.slug ??
    category
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

export function categoryFromSlug(slug: string): string | undefined {
  const entry = Object.entries(BLOG_CATEGORY_META).find(
    ([, meta]) => meta.slug === slug,
  );
  return entry?.[0];
}

export function getCategoryMeta(category: string) {
  return (
    BLOG_CATEGORY_META[category] ?? {
      slug: categoryToSlug(category),
      label: category,
      title: `${category} Guides and Articles`,
      description: `Notes on ${category.toLowerCase()} from the KINEXIS team. Practical tactics for operators who measure growth.`,
    }
  );
}

export function getBlogSerpMeta(post: { slug: string; title: string; excerpt: string }) {
  const override = BLOG_SERP_META[post.slug];
  return {
    title: override?.title ?? post.title,
    description: override?.description ?? post.excerpt,
  };
}

export function getPostsByCategory(category: string, locale: Locale = "en"): BlogPost[] {
  const slug = categoryToSlug(category);
  return sortPostsByRecency(
    getBlogListingPosts(locale).filter((post) => categoryToSlug(post.category) === slug),
  );
}

export function getLatestPosts(limit = 5, locale: Locale = "en"): BlogPost[] {
  return sortPostsByRecency(getBlogListingPosts(locale)).slice(0, limit);
}

export function getFieldGuides(locale: Locale = "en"): BlogPost[] {
  const bySlug = new Map(getBlogListingPosts(locale).map((p) => [p.slug, p]));
  return FIELD_GUIDE_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is BlogPost => Boolean(p),
  );
}

export function resolvePost(slug: string, locale: Locale = "en"): ResolvedBlogPost | null {
  const listing = getBlogListingPosts(locale).find((p) => p.slug === slug);
  const featured = getBlogArticle(slug, locale);
  const cluster = getClusterPost(slug, locale);

  const source = featured
    ? {
        title: featured.title,
        category: listing?.category ?? featured.category,
        publishedAt: featured.publishedAt,
        body: featured.body,
      }
    : cluster
      ? {
          title: cluster.title,
          category: listing?.category ?? cluster.category,
          publishedAt: cluster.publishedAt,
          body: cluster.body,
        }
      : null;

  if (!source) return null;

  const excerpt =
    listing?.excerpt ??
    cluster?.excerpt ??
    normalizeMetaDescription(
      source.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    );

  return {
    slug,
    title: displayTitle(source.title),
    category: source.category,
    publishedAt: source.publishedAt,
    publishedAtIso: getPostIsoDate(slug),
    excerpt,
    body: source.body,
    readingMinutes: estimateReadingMinutes(source.body),
    featured: listing?.featured ?? false,
  };
}

export function getAllBlogSlugs(): string[] {
  return [...blogSlugs];
}

export function blogAbsoluteUrl(locale: Locale, path: string): string {
  return buildAbsoluteUrl(locale, path);
}

export function formatPostMeta(post: {
  category: string;
  publishedAt: string;
  readingMinutes?: number;
}): string {
  const minutes = post.readingMinutes;
  const read =
    typeof minutes === "number" ? `${minutes} min read` : undefined;
  return [post.category, `Created: ${post.publishedAt}`, read]
    .filter(Boolean)
    .join(" · ");
}
