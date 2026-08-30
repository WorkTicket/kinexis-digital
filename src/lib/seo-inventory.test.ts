import { describe, expect, it } from "vitest";
import { aboutContent } from "@/content/about";
import { caseStudyPages } from "@/content/case-studies";
import { industries, industriesContent, STANDALONE_INDUSTRY_SLUGS } from "@/content/industries";
import { resourcesContent } from "@/content/resources";
import { servicePages } from "@/content/services";
import {
  BLOG_CATEGORY_META,
  getAllBlogSlugs,
  getBlogSerpMeta,
  resolvePost,
} from "@/lib/blog-utils";
import {
  META_DESCRIPTION_MAX,
  META_DESCRIPTION_MIN,
  META_TITLE_MAX,
  META_TITLE_MIN,
  META_TITLE_PAGE_MAX,
  TITLE_BRAND_SUFFIX,
  stripBrandSuffix,
} from "@/lib/metadata";

type Entry = {
  path: string;
  title: string;
  description: string;
  absolute?: boolean;
  allowShortTitle?: boolean;
  allowShortDescription?: boolean;
};

function fullTitle(entry: Entry) {
  const page = entry.absolute ? entry.title : stripBrandSuffix(entry.title);
  return entry.absolute ? page : `${page}${TITLE_BRAND_SUFFIX}`;
}

function pageTitle(entry: Entry) {
  return entry.absolute ? entry.title : stripBrandSuffix(entry.title);
}

const hubs: Entry[] = [
  {
    path: "/",
    absolute: true,
    title: "Kinexis Digital | Marketing for Home Services & Ecommerce",
    description:
      "Digital marketing for home services and ecommerce. SEO, paid ads, web design, and branding scored on leads and revenue, not vanity metrics. Book a call.",
  },
  { path: "/about", title: aboutContent.metaTitle, description: aboutContent.metaDescription },
  {
    path: "/contact",
    title: "Schedule a Marketing Strategy Call",
    description:
      "Tell us what's broken in your marketing. Book a strategy call. We respond within one business day with clear next steps, not a generic pitch deck.",
  },
  {
    path: "/services",
    title: "SEO, Ads, and Web Design Services",
    description:
      "Web design, SEO, branding, paid ads, and content as one demand program. Built for home services and ecommerce brands that need booked work and orders.",
  },
  {
    path: "/industries",
    title: industriesContent.metaTitle,
    description: industriesContent.metaDescription,
  },
  {
    path: "/case-studies",
    title: "Proven Client Results and Case Studies",
    description:
      "Real client results: 2.8X leads, 136% more emergency calls, 2.4X orders. See how we rebuild demand programs that finance can defend.",
  },
  {
    path: "/resources",
    title: "Marketing Resources and Field Tools",
    description: resourcesContent.en.meta.metaDescription,
  },
  {
    path: "/audit",
    title: "Free Marketing Scorecard Audit Online",
    description:
      "Score your site, search, ads, and tracking in five minutes. Get a plain-English read on what's leaking demand and what to fix first.",
  },
  {
    path: "/blog",
    title: "Marketing Insights and Playbooks",
    description:
      "Practical SEO, paid ads, CRO, and email notes from the KINEXIS team. Field-tested tactics for home services and ecommerce growth programs.",
  },
  {
    path: "/blog/posts",
    title: "All Marketing Guides and Articles",
    description:
      "Browse the full KINEXIS archive: SEO, paid media, conversion, email, and analytics guides for operators who measure growth.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "How KINEXIS Digital collects, uses, stores, and protects your personal information on our website, forms, and marketing services.",
    allowShortTitle: true,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Terms governing your use of the KINEXIS Digital website, marketing services, and client engagements. Covers data, billing, and intellectual property.",
    allowShortTitle: true,
  },
  {
    path: "/thank-you",
    title: "Thank you",
    description: "Your message was received. A Kinexis strategist will follow up shortly.",
    allowShortTitle: true,
    allowShortDescription: true,
  },
];

const inventory: Entry[] = [
  ...hubs,
  ...servicePages.map((s) => ({
    path: `/services/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
  })),
  ...industries
    .filter((i) => STANDALONE_INDUSTRY_SLUGS.includes(i.slug))
    .map((i) => ({
      path: `/industries/${i.slug}`,
      title: i.metaTitle,
      description: i.metaDescription,
    })),
  ...caseStudyPages.map((s) => ({
    path: `/case-studies/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
  })),
  ...Object.values(BLOG_CATEGORY_META).map((m) => ({
    path: `/blog/category/${m.slug}`,
    title: m.title,
    description: m.description,
  })),
  ...getAllBlogSlugs().map((slug) => {
    const post = resolvePost(slug);
    if (!post) throw new Error(`Missing blog post: ${slug}`);
    const serp = getBlogSerpMeta(post);
    return { path: `/blog/${slug}`, title: serp.title, description: serp.description };
  }),
];

describe("SEO inventory lengths", () => {
  it.each(inventory)("$path title and description fit SERP limits", (entry) => {
    const page = pageTitle(entry);
    const full = fullTitle(entry);

    if (!entry.absolute) {
      expect(page.length, `${entry.path} title segment`).toBeLessThanOrEqual(META_TITLE_PAGE_MAX);
    }
    expect(full.length, `${entry.path} full title`).toBeLessThanOrEqual(META_TITLE_MAX);
    if (!entry.allowShortTitle) {
      expect(full.length, `${entry.path} full title`).toBeGreaterThanOrEqual(META_TITLE_MIN);
    }
    expect(entry.description.length, `${entry.path} description`).toBeLessThanOrEqual(
      META_DESCRIPTION_MAX,
    );
    if (!entry.allowShortDescription) {
      expect(entry.description.length, `${entry.path} description`).toBeGreaterThanOrEqual(
        META_DESCRIPTION_MIN,
      );
    }
  });
});
