import type { ServiceSeoSlug } from "@/content/service-seo/types";
import { caseStudyLinks } from "@/content/case-study-crossrefs";

type RelatedLinkGroup = {
  services: { href: string; label: string }[];
  caseStudies: { href: string; label: string }[];
  blog: { href: string; label: string }[];
};

export type ServiceRelatedLinks = RelatedLinkGroup;

const HUB = {
  seo: { href: "/services/seo", label: "SEO" },
  paid: { href: "/services/paid-media", label: "Paid Media" },
  web: { href: "/services/web-design", label: "Web Design" },
  brand: { href: "/services/branding", label: "Branding" },
  content: { href: "/services/content-marketing", label: "Content Marketing" },
  contact: { href: "/contact", label: "Book a strategy call" },
} as const;

const baseLinks: Record<ServiceSeoSlug, RelatedLinkGroup> = {
  seo: {
    services: [HUB.paid, HUB.content, HUB.contact],
    caseStudies: caseStudyLinks("landscaping", "plumbing"),
    blog: [
      { href: "/blog/local-seo-checklist", label: "Local SEO Checklist" },
      { href: "/blog/seo-audit-framework", label: "SEO Audit Framework" },
    ],
  },
  "local-seo": {
    services: [HUB.seo, HUB.content, HUB.contact],
    caseStudies: caseStudyLinks("plumbing", "landscaping"),
    blog: [
      { href: "/blog/google-business-profile-tips", label: "Google Business Profile Tips" },
      { href: "/blog/local-seo-strategy-2026", label: "Local SEO Strategy Guide" },
    ],
  },
  "ppc-management": {
    services: [HUB.seo, HUB.web, HUB.contact],
    caseStudies: caseStudyLinks("plumbing", "ecommerce"),
    blog: [
      { href: "/blog/quality-score-guide", label: "Quality Score Guide" },
      { href: "/blog/roas-calculations", label: "ROAS Calculations" },
    ],
  },
  "google-ads": {
    services: [HUB.paid, HUB.seo, HUB.contact],
    caseStudies: caseStudyLinks("plumbing", "landscaping"),
    blog: [
      { href: "/blog/negative-keywords-guide", label: "Negative Keywords Guide" },
      { href: "/blog/quality-score-guide", label: "Quality Score Guide" },
    ],
  },
  "meta-ads": {
    services: [HUB.paid, HUB.brand, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "landscaping"),
    blog: [
      { href: "/blog/roas-calculations", label: "ROAS Calculations" },
      { href: "/blog/conversion-psychology", label: "Conversion Psychology" },
    ],
  },
  "youtube-ads": {
    services: [HUB.paid, HUB.content, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/roas-calculations", label: "ROAS Calculations" },
      { href: "/blog/landing-page-best-practices", label: "Landing Page Best Practices" },
    ],
  },
  "microsoft-ads": {
    services: [HUB.paid, HUB.seo, HUB.contact],
    caseStudies: caseStudyLinks("plumbing", "ecommerce"),
    blog: [
      { href: "/blog/quality-score-guide", label: "Quality Score Guide" },
      { href: "/blog/negative-keywords-guide", label: "Negative Keywords Guide" },
    ],
  },
  "paid-ads": {
    services: [HUB.seo, HUB.web, HUB.contact],
    caseStudies: caseStudyLinks("plumbing", "ecommerce"),
    blog: [
      { href: "/blog/quality-score-guide", label: "Quality Score Guide" },
      { href: "/blog/roas-calculations", label: "ROAS Calculations" },
    ],
  },
  "web-design": {
    services: [HUB.seo, HUB.brand, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "landscaping"),
    blog: [
      { href: "/blog/website-conversion-optimization", label: "Website Conversion Optimization" },
      { href: "/blog/landing-page-best-practices", label: "Landing Page Best Practices" },
    ],
  },
  cro: {
    services: [HUB.web, HUB.paid, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/ab-testing-framework", label: "A/B Testing Framework" },
      { href: "/blog/heatmap-analysis", label: "Heatmap Analysis" },
    ],
  },
  funnels: {
    services: [HUB.web, HUB.content, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/landing-page-optimization", label: "Landing Page Optimization" },
      { href: "/blog/conversion-psychology", label: "Conversion Psychology" },
    ],
  },
  "landing-pages": {
    services: [HUB.web, HUB.paid, HUB.contact],
    caseStudies: caseStudyLinks("plumbing", "ecommerce"),
    blog: [
      { href: "/blog/landing-page-best-practices", label: "Landing Page Best Practices" },
      { href: "/blog/ab-testing-framework", label: "A/B Testing Framework" },
    ],
  },
  "website-maintenance": {
    services: [HUB.web, HUB.seo, HUB.contact],
    caseStudies: caseStudyLinks("landscaping", "plumbing"),
    blog: [
      { href: "/blog/technical-seo-fundamentals", label: "Technical SEO Fundamentals" },
      { href: "/blog/website-conversion-optimization", label: "Website Conversion Optimization" },
    ],
  },
  "website-speed": {
    services: [HUB.web, HUB.seo, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "landscaping"),
    blog: [
      { href: "/blog/technical-seo-guide", label: "Technical SEO Guide" },
      { href: "/blog/website-conversion-optimization", label: "Website Conversion Optimization" },
    ],
  },
  "email-marketing": {
    services: [HUB.content, HUB.web, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/email-nurture-sequences-that-book-calls", label: "Email Nurture Sequences" },
      { href: "/blog/email-segmentation", label: "Email Segmentation" },
    ],
  },
  "content-marketing": {
    services: [HUB.seo, HUB.brand, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "landscaping"),
    blog: [
      { href: "/blog/internal-linking-guide", label: "Internal Linking Guide" },
      { href: "/blog/lifecycle-marketing", label: "Lifecycle Marketing" },
    ],
  },
  copywriting: {
    services: [HUB.content, HUB.web, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/conversion-psychology", label: "Conversion Psychology" },
      { href: "/blog/landing-page-best-practices", label: "Landing Page Best Practices" },
    ],
  },
  "social-media": {
    services: [HUB.content, HUB.brand, HUB.contact],
    caseStudies: caseStudyLinks("landscaping", "ecommerce"),
    blog: [
      { href: "/blog/lifecycle-marketing", label: "Lifecycle Marketing" },
      { href: "/blog/conversion-psychology", label: "Conversion Psychology" },
    ],
  },
  "video-marketing": {
    services: [HUB.content, HUB.paid, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/landing-page-best-practices", label: "Landing Page Best Practices" },
      { href: "/blog/roas-calculations", label: "ROAS Calculations" },
    ],
  },
  branding: {
    services: [HUB.web, HUB.content, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "landscaping"),
    blog: [
      { href: "/blog/conversion-psychology", label: "Conversion Psychology" },
      { href: "/blog/website-conversion-optimization", label: "Website Conversion Optimization" },
    ],
  },
  analytics: {
    services: [HUB.seo, HUB.paid, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/ga4-reporting", label: "GA4 Reporting Guide" },
      { href: "/blog/attribution-models", label: "Attribution Models" },
    ],
  },
  "growth-consulting": {
    services: [HUB.seo, HUB.paid, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/local-business-growth-playbook", label: "Local Business Growth Playbook" },
      { href: "/blog/marketing-dashboards", label: "Marketing Dashboards" },
    ],
  },
  "marketing-audits": {
    services: [HUB.seo, HUB.paid, HUB.contact],
    caseStudies: caseStudyLinks("plumbing", "ecommerce"),
    blog: [
      { href: "/blog/seo-audit-framework", label: "SEO Audit Framework" },
      { href: "/blog/ga4-reporting", label: "GA4 Reporting Guide" },
    ],
  },
  "marketing-automation-crm": {
    services: [HUB.content, HUB.web, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/automated-nurture-sequences", label: "Automated Nurture Sequences" },
      { href: "/blog/lifecycle-marketing", label: "Lifecycle Marketing" },
    ],
  },
  "fractional-cmo": {
    services: [HUB.seo, HUB.paid, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "plumbing"),
    blog: [
      { href: "/blog/marketing-dashboards", label: "Marketing Dashboards" },
      { href: "/blog/attribution-models", label: "Attribution Models" },
    ],
  },
  "training-workshops": {
    services: [HUB.seo, HUB.content, HUB.contact],
    caseStudies: caseStudyLinks("ecommerce", "landscaping"),
    blog: [{ href: "/blog/ga4-reporting", label: "GA4 Reporting Guide" }],
  },
};

export function getServiceRelatedLinks(slug: ServiceSeoSlug): ServiceRelatedLinks {
  return baseLinks[slug] ?? { services: [], caseStudies: [], blog: [] };
}

