import type { BlogPost } from "@/content/blog";

const POST_PUBLISHED_AT: Record<string, string> = {
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

function postTimestamp(post: BlogPost): number {
  const iso = POST_PUBLISHED_AT[post.slug];
  return iso ? Date.parse(iso) : 0;
}

export function sortPostsByRecency(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => postTimestamp(b) - postTimestamp(a));
}

export function getRecentPosts(posts: BlogPost[], limit: number, excludeFeatured = true): BlogPost[] {
  const pool = excludeFeatured ? posts.filter((post) => !post.featured) : posts;
  return sortPostsByRecency(pool).slice(0, limit);
}
