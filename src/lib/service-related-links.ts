import type { ServiceSeoSlug } from "@/content/service-seo/types";
import { pricingRoutes, serviceLabels } from "@/content/registry/site-routes";

type RelatedLinkGroup = {
  services: { href: string; label: string }[];
  caseStudies: { href: string; label: string }[];
  blog: { href: string; label: string }[];
};

function servicePricingLink(slug: ServiceSeoSlug) {
  const label = serviceLabels[slug].replace(/ Services$/, "").replace(/ Management$/, "");
  return { href: pricingRoutes[slug], label: `${label} Pricing` };
}

const baseLinks: Record<ServiceSeoSlug, RelatedLinkGroup> = {
  seo: {
    services: [
      { href: "/services/local-seo", label: "Local SEO Services" },
      servicePricingLink("seo"),
      { href: "/services/content-marketing", label: "Content Marketing" },
    ],
    caseStudies: [
      { href: "/case-studies/landscaping-company-growth", label: "+340% Traffic · Landscaping Co." },
      { href: "/case-studies/dental-practice-local-seo", label: "+340% Patients · Dental Practice" },
    ],
    blog: [
      { href: "/blog/local-seo-checklist", label: "Local SEO Checklist" },
      { href: "/blog/seo-audit-framework", label: "SEO Audit Framework" },
    ],
  },
  "local-seo": {
    services: [
      { href: "/services/seo", label: "SEO Services" },
      { href: "/services/google-ads", label: "Google Ads Management" },
      servicePricingLink("local-seo"),
    ],
    caseStudies: [
      { href: "/case-studies/dental-practice-local-seo", label: "+340% Patients · Dental Practice" },
      { href: "/case-studies/landscaping-company-growth", label: "+340% Traffic · Landscaping Co." },
    ],
    blog: [
      { href: "/blog/google-business-profile-tips", label: "Google Business Profile Tips" },
      { href: "/blog/local-seo-strategy-2026", label: "Local SEO Strategy Guide" },
    ],
  },
  "ppc-management": {
    services: [
      { href: "/services/google-ads", label: "Google Ads Management" },
      { href: "/services/meta-ads", label: "Meta Ads Management" },
      servicePricingLink("ppc-management"),
    ],
    caseStudies: [
      { href: "/case-studies/landscaping-company-growth", label: "+340% Traffic · Landscaping Co." },
      { href: "/case-studies/premium-ecommerce-brand", label: "4X Revenue · E-Commerce" },
    ],
    blog: [
      { href: "/blog/quality-score-guide", label: "Quality Score Guide" },
      { href: "/blog/roas-calculations", label: "ROAS Calculations" },
    ],
  },
  "google-ads": {
    services: [
      { href: "/services/ppc-management", label: "PPC Management" },
      { href: "/services/seo", label: "SEO Services" },
      servicePricingLink("google-ads"),
    ],
    caseStudies: [
      { href: "/case-studies/dental-practice-local-seo", label: "+340% Patients · Dental Practice" },
      { href: "/case-studies/landscaping-company-growth", label: "+340% Traffic · Landscaping Co." },
    ],
    blog: [
      { href: "/blog/negative-keywords-guide", label: "Negative Keywords Guide" },
      { href: "/blog/seo-vs-google-ads", label: "SEO vs Google Ads" },
    ],
  },
  "meta-ads": {
    services: [
      { href: "/services/google-ads", label: "Google Ads Management" },
      { href: "/services/social-media", label: "Social Media Marketing" },
      servicePricingLink("meta-ads"),
    ],
    caseStudies: [
      { href: "/case-studies/premium-ecommerce-brand", label: "4X Revenue · E-Commerce" },
      { href: "/case-studies/fintech-app-startup", label: "210% Trial Lift · Fintech App" },
    ],
    blog: [
      { href: "/blog/landing-page-best-practices", label: "Landing Page Best Practices" },
      { href: "/blog/conversion-psychology", label: "Conversion Psychology" },
    ],
  },
  "web-design": {
    services: [
      { href: "/services/funnels", label: "Funnels & Conversion Rate Optimization" },
      { href: "/services/seo", label: "SEO Services" },
      servicePricingLink("web-design"),
    ],
    caseStudies: [
      { href: "/case-studies/premium-ecommerce-brand", label: "4X Revenue · E-Commerce" },
      { href: "/case-studies/saas-analytics-platform", label: "4X MRR · SaaS Platform" },
    ],
    blog: [
      { href: "/blog/website-conversion-optimization", label: "Website Conversion Optimization" },
      { href: "/blog/landing-page-optimization", label: "Landing Page Optimization" },
    ],
  },
  cro: {
    services: [
      { href: "/services/web-design", label: "Web Design Services" },
      { href: "/services/funnels", label: "Funnels & CRO" },
      servicePricingLink("cro"),
    ],
    caseStudies: [
      { href: "/case-studies/premium-ecommerce-brand", label: "4X Revenue · E-Commerce" },
      { href: "/case-studies/fintech-app-startup", label: "210% Trial Lift · Fintech App" },
    ],
    blog: [
      { href: "/blog/ab-testing-framework", label: "A/B Testing Framework" },
      { href: "/blog/heatmap-analysis", label: "Heatmap Analysis" },
    ],
  },
  "email-marketing": {
    services: [
      { href: "/services/funnels", label: "Funnels & CRO" },
      { href: "/services/content-marketing", label: "Content Marketing" },
      servicePricingLink("email-marketing"),
    ],
    caseStudies: [
      { href: "/case-studies/saas-analytics-platform", label: "4X MRR · SaaS Platform" },
      { href: "/case-studies/b2b-consulting-firm", label: "Pipeline Growth · B2B Consulting" },
    ],
    blog: [
      { href: "/blog/email-nurture-sequences-that-book-calls", label: "Email Nurture Sequences" },
      { href: "/blog/automated-nurture-sequences", label: "Automated Nurture Sequences" },
    ],
  },
  "content-marketing": {
    services: [
      { href: "/services/seo", label: "SEO Services" },
      { href: "/services/social-media", label: "Social Media Marketing" },
      servicePricingLink("content-marketing"),
    ],
    caseStudies: [
      { href: "/case-studies/saas-analytics-platform", label: "4X MRR · SaaS Platform" },
      { href: "/case-studies/b2b-consulting-firm", label: "Pipeline Growth · B2B Consulting" },
    ],
    blog: [
      { href: "/blog/internal-linking-guide", label: "Internal Linking Guide" },
      { href: "/blog/link-building-strategies", label: "Link Building Strategies" },
    ],
  },
  "social-media": {
    services: [
      { href: "/services/meta-ads", label: "Meta Ads Management" },
      { href: "/services/content-marketing", label: "Content Marketing" },
      servicePricingLink("social-media"),
    ],
    caseStudies: [
      { href: "/case-studies/premium-ecommerce-brand", label: "4X Revenue · E-Commerce" },
      { href: "/case-studies/fintech-app-startup", label: "210% Trial Lift · Fintech App" },
    ],
    blog: [
      { href: "/blog/local-business-growth-playbook", label: "Local Business Growth Playbook" },
    ],
  },
  "video-marketing": {
    services: [
      { href: "/services/content-marketing", label: "Content Marketing" },
      { href: "/services/social-media", label: "Social Media Marketing" },
      servicePricingLink("video-marketing"),
    ],
    caseStudies: [
      { href: "/case-studies/premium-ecommerce-brand", label: "4X Revenue · E-Commerce" },
    ],
    blog: [],
  },
  branding: {
    services: [
      { href: "/services/web-design", label: "Web Design Services" },
      { href: "/services/content-marketing", label: "Content Marketing" },
      servicePricingLink("branding"),
    ],
    caseStudies: [
      { href: "/case-studies/premium-ecommerce-brand", label: "4X Revenue · E-Commerce" },
    ],
    blog: [],
  },
  analytics: {
    services: [
      { href: "/services/growth-consulting", label: "Growth Consulting" },
      { href: "/services/ppc-management", label: "PPC Management" },
      servicePricingLink("analytics"),
    ],
    caseStudies: [
      { href: "/case-studies/saas-analytics-platform", label: "4X MRR · SaaS Platform" },
    ],
    blog: [
      { href: "/blog/ga4-reporting", label: "GA4 Reporting Guide" },
      { href: "/blog/attribution-models", label: "Attribution Models" },
    ],
  },
  "growth-consulting": {
    services: [
      { href: "/services/analytics", label: "Marketing Analytics" },
      { href: "/services/seo", label: "SEO Services" },
      servicePricingLink("growth-consulting"),
    ],
    caseStudies: [
      { href: "/case-studies/b2b-consulting-firm", label: "Pipeline Growth · B2B Consulting" },
      { href: "/case-studies/saas-analytics-platform", label: "4X MRR · SaaS Platform" },
    ],
    blog: [
      { href: "/blog/marketing-dashboards", label: "Marketing Dashboards" },
    ],
  },
  funnels: {
    services: [
      { href: "/services/web-design", label: "Web Design Services" },
      { href: "/services/email-marketing", label: "Email Marketing" },
      servicePricingLink("funnels"),
    ],
    caseStudies: [
      { href: "/case-studies/saas-analytics-platform", label: "4X MRR · SaaS Platform" },
      { href: "/case-studies/fintech-app-startup", label: "210% Trial Lift · Fintech App" },
    ],
    blog: [
      { href: "/blog/lifecycle-marketing", label: "Lifecycle Marketing" },
    ],
  },
  "paid-ads": {
    services: [
      { href: "/services/ppc-management", label: "PPC Management" },
      { href: "/services/google-ads", label: "Google Ads Management" },
      servicePricingLink("paid-ads"),
    ],
    caseStudies: [
      { href: "/case-studies/landscaping-company-growth", label: "+340% Traffic · Landscaping Co." },
      { href: "/case-studies/dental-practice-local-seo", label: "+340% Patients · Dental Practice" },
    ],
    blog: [
      { href: "/blog/seo-vs-google-ads", label: "SEO vs Google Ads" },
    ],
  },
};

export function getServiceRelatedLinks(slug: ServiceSeoSlug): RelatedLinkGroup {
  return baseLinks[slug] ?? { services: [], caseStudies: [], blog: [] };
}
