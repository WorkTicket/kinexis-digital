import { aboutContent } from "../src/content/about";
import { caseStudyPages } from "../src/content/case-studies";
import { industries, industriesContent, STANDALONE_INDUSTRY_SLUGS } from "../src/content/industries";
import { resourcesContent } from "../src/content/resources";
import { servicePages } from "../src/content/services";
import {
  BLOG_CATEGORY_META,
  getAllBlogSlugs,
  getBlogSerpMeta,
  resolvePost,
} from "../src/lib/blog-utils";
import {
  META_DESCRIPTION_MAX,
  META_DESCRIPTION_MIN,
  META_TITLE_MAX,
  META_TITLE_MIN,
  META_TITLE_PAGE_MAX,
  TITLE_BRAND_SUFFIX,
  normalizeMetaDescription,
  normalizeMetaTitle,
  stripBrandSuffix,
} from "../src/lib/metadata";

const SUF = TITLE_BRAND_SUFFIX;

function row(path: string, title: string, desc: string, abs = false, opts?: { allowShortTitle?: boolean }) {
  const page = abs ? title : stripBrandSuffix(title);
  const full = abs ? title : `${page}${SUF}`;
  const pageOut = normalizeMetaTitle(page, abs ? META_TITLE_MAX : META_TITLE_PAGE_MAX);
  const fullOut = normalizeMetaTitle(full);
  const descOut = normalizeMetaDescription(desc);
  const flags: string[] = [];
  if (!abs && page.length > META_TITLE_PAGE_MAX) flags.push("TITLE_SEG_OVER");
  if (full.length > META_TITLE_MAX) flags.push("TITLE_FULL_OVER");
  if (!opts?.allowShortTitle && !abs && full.length < META_TITLE_MIN) flags.push("TITLE_SHORT");
  if (abs && title.length > META_TITLE_MAX) flags.push("ABS_OVER");
  if (!opts?.allowShortTitle && abs && title.length < META_TITLE_MIN) flags.push("TITLE_SHORT");
  if (desc.length > META_DESCRIPTION_MAX) flags.push("DESC_OVER");
  if (desc.length < META_DESCRIPTION_MIN) flags.push("DESC_SHORT");
  if (descOut.includes("…") && desc.length > META_DESCRIPTION_MAX) flags.push("DESC_ELLIPSIS");
  if (pageOut.includes("…") || fullOut.includes("…")) flags.push("TITLE_ELLIPSIS");
  console.log(
    [
      (flags.join(",") || "ok").padEnd(28),
      `seg=${String(page.length).padStart(2)}`,
      `full=${String(full.length).padStart(2)}`,
      `desc=${String(desc.length).padStart(3)}`,
      path,
      JSON.stringify(page),
    ].join(" | "),
  );
}

console.log("=== HUBS ===");
row(
  "/",
  "Kinexis Digital | Marketing for Home Services & Ecommerce",
  "Digital marketing for home services and ecommerce. SEO, paid ads, web design, and branding scored on leads and revenue, not vanity metrics. Book a call.",
  true,
);
row("/about", aboutContent.metaTitle, aboutContent.metaDescription);
row(
  "/contact",
  "Schedule a Marketing Strategy Call",
  "Tell us what's broken in your marketing. Book a strategy call. We respond within one business day with clear next steps, not a generic pitch deck.",
);
row(
  "/services",
  "SEO, Ads, and Web Design Services",
  "Web design, SEO, branding, paid ads, and content as one demand program. Built for home services and ecommerce brands that need booked work and orders.",
);
row("/industries", industriesContent.metaTitle, industriesContent.metaDescription);
row(
  "/case-studies",
  "Proven Client Results and Case Studies",
  "Real client results: 2.8X leads, 136% more emergency calls, 2.4X orders. See how we rebuild demand programs that finance can defend.",
);
row(
  "/audit",
  "Free Marketing Scorecard Audit Online",
  "Score your site, search, ads, and tracking in five minutes. Get a plain-English read on what's leaking demand and what to fix first.",
);
row("/resources", "Marketing Resources and Field Tools", resourcesContent.en.meta.metaDescription);
row(
  "/blog",
  "Marketing Insights and Playbooks",
  "Practical SEO, paid ads, CRO, and email notes from the KINEXIS team. Field-tested tactics for home services and ecommerce growth programs.",
);
row(
  "/blog/posts",
  "All Marketing Guides and Articles",
  "Browse the full KINEXIS archive: SEO, paid media, conversion, email, and analytics guides for operators who measure growth.",
);
row(
  "/privacy",
  "Privacy Policy",
  "How KINEXIS Digital collects, uses, stores, and protects your personal information on our website, forms, and marketing services.",
  false,
  { allowShortTitle: true },
);
row(
  "/terms",
  "Terms of Service",
  "Terms governing your use of the KINEXIS Digital website, marketing services, and client engagements. Covers data, billing, and intellectual property.",
  false,
  { allowShortTitle: true },
);
row(
  "/thank-you",
  "Thank you",
  "Your message was received. A Kinexis strategist will follow up shortly.",
  false,
  { allowShortTitle: true },
);

console.log("\n=== SERVICES ===");
for (const s of servicePages) row(`/services#${s.slug}`, s.metaTitle, s.metaDescription);

console.log("\n=== INDUSTRIES ===");
for (const i of industries.filter((x) => STANDALONE_INDUSTRY_SLUGS.includes(x.slug))) {
  row(`/industries/${i.slug}`, i.metaTitle, i.metaDescription);
}

console.log("\n=== CASE STUDIES ===");
for (const s of caseStudyPages) {
  row(`/case-studies/${s.slug}`, s.metaTitle, s.metaDescription);
}

console.log("\n=== BLOG CATEGORIES ===");
for (const m of Object.values(BLOG_CATEGORY_META)) {
  row(`/blog/category/${m.slug}`, m.title, m.description);
}

console.log("\n=== BLOG POSTS ===");
for (const slug of getAllBlogSlugs()) {
  const p = resolvePost(slug);
  if (!p) {
    console.log("MISSING", slug);
    continue;
  }
  const serp = getBlogSerpMeta(p);
  row(`/blog/${slug}`, serp.title, serp.description);
}
