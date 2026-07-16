import type { ServiceSeoSlug } from "@/content/service-seo/types";
import { caseStudyLinks } from "@/content/case-study-crossrefs";
import { pricingRoutes, serviceLabels, resolvePricingSlug } from "@/content/registry/site-routes";

type RelatedLinkGroup = {
  services: { href: string; label: string }[];
  caseStudies: { href: string; label: string }[];
  blog: { href: string; label: string }[];
};

export type ServiceRelatedLinks = RelatedLinkGroup & { solutions: { href: string; label: string }[] };

const extraSolutionLinks: Partial<Record<ServiceSeoSlug, { href: string; label: string }[]>> = {
  "google-ads": [{ href: "/solutions/google-ads-for-roofers", label: "Google Ads for Roofers" }],
  seo: [
    { href: "/solutions/seo-for-hvac-companies", label: "SEO for HVAC Companies" },
    { href: "/solutions/seo-for-dentists", label: "SEO for Dentists" },
  ],
};

const pricingLabelOverrides: Partial<Record<string, string>> = {
  "web-design": "Website Design",
  "ppc-management": "Google Ads (PPC)",
  "meta-ads": "Meta Ads",
};

function servicePricingLink(slug: ServiceSeoSlug) {
  const canonical = resolvePricingSlug(slug);
  const label =
    pricingLabelOverrides[canonical] ??
    serviceLabels[canonical].replace(/ Services$/, "").replace(/ Management$/, "");
  return { href: pricingRoutes[canonical], label: `${label} Pricing` };
}

const baseLinks: Record<ServiceSeoSlug, RelatedLinkGroup> = {
  seo: {
    services: [
      { href: "/services/local-seo", label: "Local SEO Services" },
      servicePricingLink("seo"),
      { href: "/services/content-marketing", label: "Content Marketing" },
    ],
    caseStudies: caseStudyLinks("landscaping", "plumbing"),
    blog: [
      { href: "/blog/local-seo-checklist", label: "Local SEO Checklist" },
      { href: "/blog/seo-audit-framework", label: "SEO Audit Framework" },
    ],
  },
  "local-seo": {
    services: [
      { href: "/services/seo", label: "SEO Services" },
      { href: "/pricing/seo", label: "SEO Pricing" },
      { href: "/pricing/content-marketing", label: "Content Marketing Pricing" },
      servicePricingLink("local-seo"),
    ],
    caseStudies: caseStudyLinks("plumbing", "landscaping"),
    blog: [
      { href: "/blog/google-business-profile-tips", label: "Google Business Profile Tips" },
      { href: "/blog/local-seo-strategy-2026", label: "Local SEO Strategy Guide" },
    ],
  },
  "ppc-management": {
    services: [
      { href: "/services/meta-ads", label: "Meta Ads Management" },
      servicePricingLink("ppc-management"),
    ],
    caseStudies: caseStudyLinks("plumbing", "saas"),
    blog: [
      { href: "/blog/quality-score-guide", label: "Quality Score Guide" },
      { href: "/blog/roas-calculations", label: "ROAS Calculations" },
    ],
  },
  "google-ads": {
    services: [
      { href: "/services/ppc-management", label: "PPC & Google Ads Management" },
      { href: "/services/seo", label: "SEO Services" },
      servicePricingLink("ppc-management"),
    ],
    caseStudies: caseStudyLinks("plumbing", "landscaping"),
    blog: [
      { href: "/blog/negative-keywords-guide", label: "Negative Keywords Guide" },
      { href: "/blog/seo-vs-google-ads", label: "SEO vs Google Ads" },
    ],
  },
  "meta-ads": {
    services: [
      { href: "/services/ppc-management", label: "PPC Management" },
      { href: "/services/social-media", label: "Social Media Marketing" },
      servicePricingLink("meta-ads"),
    ],
    caseStudies: caseStudyLinks("saas", "landscaping"),
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
    caseStudies: caseStudyLinks("landscaping", "saas"),
    blog: [
      { href: "/blog/website-conversion-optimization", label: "Website Conversion Optimization" },
      { href: "/blog/landing-page-optimization", label: "Landing Page Optimization" },
    ],
  },
  cro: {
    services: [
      { href: "/services/web-design", label: "Web Design Services" },
      { href: "/services/funnels", label: "Funnels & CRO" },
      { href: "/pricing/funnels", label: "Funnels & CRO Pricing" },
    ],
    caseStudies: caseStudyLinks("saas", "landscaping"),
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
    caseStudies: caseStudyLinks("saas", "landscaping"),
    blog: [
      { href: "/blog/email-nurture-sequences-that-book-calls", label: "Email Nurture Sequences" },
      { href: "/blog/automated-nurture-sequences", label: "Automated Nurture Sequences" },
    ],
  },
  "content-marketing": {
    services: [
      { href: "/services/seo", label: "SEO Services" },
      { href: "/pricing/seo", label: "SEO Pricing" },
      { href: "/pricing/local-seo", label: "Local SEO Pricing" },
      servicePricingLink("content-marketing"),
    ],
    caseStudies: caseStudyLinks("saas", "landscaping"),
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
    caseStudies: caseStudyLinks("landscaping", "saas"),
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
    caseStudies: caseStudyLinks("landscaping", "saas"),
    blog: [],
  },
  branding: {
    services: [
      { href: "/services/web-design", label: "Web Design Services" },
      { href: "/services/content-marketing", label: "Content Marketing" },
      servicePricingLink("branding"),
    ],
    caseStudies: caseStudyLinks("saas", "landscaping"),
    blog: [],
  },
  analytics: {
    services: [
      { href: "/services/growth-consulting", label: "Growth Consulting" },
      { href: "/services/ppc-management", label: "PPC Management" },
      servicePricingLink("analytics"),
    ],
    caseStudies: caseStudyLinks("saas", "plumbing"),
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
    caseStudies: caseStudyLinks("saas", "plumbing"),
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
    caseStudies: caseStudyLinks("saas", "landscaping"),
    blog: [
      { href: "/blog/lifecycle-marketing", label: "Lifecycle Marketing" },
      { href: "/blog/heatmap-analysis", label: "Heatmap Analysis" },
      { href: "/blog/ab-testing-framework", label: "A/B Testing Framework" },
    ],
  },
  "paid-ads": {
    services: [],
    caseStudies: [],
    blog: [],
  },
  "youtube-ads": {
    services: [
      { href: "/services/ppc-management", label: "PPC & Google Ads Management" },
      { href: "/services/video-marketing", label: "Video Marketing Services" },
      servicePricingLink("youtube-ads"),
    ],
    caseStudies: caseStudyLinks("saas", "plumbing"),
    blog: [
      { href: "/blog/roas-calculations", label: "ROAS Calculations" },
      { href: "/blog/landing-page-best-practices", label: "Landing Page Best Practices" },
    ],
  },
  "landing-pages": {
    services: [
      { href: "/services/funnels", label: "Funnels & Conversion Rate Optimization" },
      { href: "/services/web-design", label: "Web Design Services" },
      servicePricingLink("landing-pages"),
    ],
    caseStudies: caseStudyLinks("landscaping", "saas"),
    blog: [
      { href: "/blog/landing-page-best-practices", label: "Landing Page Best Practices" },
      { href: "/blog/landing-page-optimization", label: "Landing Page Optimization" },
    ],
  },
  "website-maintenance": {
    services: [
      { href: "/services/web-design", label: "Web Design Services" },
      { href: "/services/website-speed", label: "Website Speed Optimization" },
      servicePricingLink("website-maintenance"),
    ],
    caseStudies: caseStudyLinks("landscaping", "plumbing"),
    blog: [],
  },
  "website-speed": {
    services: [
      { href: "/services/web-design", label: "Web Design Services" },
      { href: "/services/website-maintenance", label: "Website Maintenance & Support" },
      servicePricingLink("website-speed"),
    ],
    caseStudies: caseStudyLinks("landscaping", "saas"),
    blog: [
      { href: "/blog/website-conversion-optimization", label: "Website Conversion Optimization" },
    ],
  },
  "microsoft-ads": {
    services: [
      { href: "/services/ppc-management", label: "Google Ads (PPC) Management" },
      { href: "/services/meta-ads", label: "Meta Ads Management" },
      servicePricingLink("microsoft-ads"),
    ],
    caseStudies: caseStudyLinks("plumbing", "saas"),
    blog: [
      { href: "/blog/quality-score-guide", label: "Quality Score Guide" },
      { href: "/blog/roas-calculations", label: "ROAS Calculations" },
    ],
  },
  copywriting: {
    services: [
      { href: "/services/content-marketing", label: "Content Marketing" },
      { href: "/services/web-design", label: "Web Design Services" },
      servicePricingLink("copywriting"),
    ],
    caseStudies: caseStudyLinks("saas", "landscaping"),
    blog: [
      { href: "/blog/conversion-psychology", label: "Conversion Psychology" },
      { href: "/blog/landing-page-best-practices", label: "Landing Page Best Practices" },
    ],
  },
  "marketing-audits": {
    services: [
      { href: "/services/analytics", label: "Analytics & Reporting" },
      { href: "/services/growth-consulting", label: "Digital Marketing Strategy" },
      servicePricingLink("marketing-audits"),
    ],
    caseStudies: caseStudyLinks("plumbing", "saas"),
    blog: [
      { href: "/blog/ga4-reporting", label: "GA4 Reporting Guide" },
      { href: "/blog/attribution-models", label: "Attribution Models" },
    ],
  },
  "marketing-automation-crm": {
    services: [
      { href: "/services/email-marketing", label: "Email Marketing & Automation" },
      { href: "/services/funnels", label: "Customer Journey & Funnel Strategy" },
      servicePricingLink("marketing-automation-crm"),
    ],
    caseStudies: caseStudyLinks("saas", "plumbing"),
    blog: [
      { href: "/blog/automated-nurture-sequences", label: "Automated Nurture Sequences" },
      { href: "/blog/lifecycle-marketing", label: "Lifecycle Marketing" },
    ],
  },
  "fractional-cmo": {
    services: [
      { href: "/services/growth-consulting", label: "Digital Marketing Strategy" },
      { href: "/services/marketing-audits", label: "Marketing Audits" },
      servicePricingLink("fractional-cmo"),
    ],
    caseStudies: caseStudyLinks("saas", "plumbing"),
    blog: [
      { href: "/blog/marketing-dashboards", label: "Marketing Dashboards" },
      { href: "/blog/attribution-models", label: "Attribution Models" },
    ],
  },
  "training-workshops": {
    services: [
      { href: "/services/growth-consulting", label: "Digital Marketing Strategy" },
      { href: "/services/analytics", label: "Analytics & Reporting" },
      servicePricingLink("training-workshops"),
    ],
    caseStudies: caseStudyLinks("saas", "landscaping"),
    blog: [
      { href: "/blog/ga4-reporting", label: "GA4 Reporting Guide" },
    ],
  },
};

export function getServiceRelatedLinks(slug: ServiceSeoSlug): RelatedLinkGroup & { solutions: { href: string; label: string }[] } {
  const group = baseLinks[slug] ?? { services: [], caseStudies: [], blog: [] };
  return {
    ...group,
    solutions: extraSolutionLinks[slug] ?? [],
  };
}
