import type { ServicePillarContent } from "@/components/sections/ServicePillarSections";
import type { FAQItem } from "@/components/sections/FAQSection";
import type { Locale } from "@/i18n/routing";

export type PaidServiceVariant = "ppc" | "google-ads" | "meta-ads";

const sharedFaqs: FAQItem[] = [
  { question: "What budget do I need to get started?", answer: "Most clients invest $2,500 to $15,000 per month in management plus ad spend. We tailor scope to your goals and provide clear pricing after a strategy call." },
  { question: "How quickly will I see results?", answer: "Paid media produces data within days and meaningful optimization within 2 to 4 weeks. ROAS typically improves significantly by month 2 or 3 as we refine targeting and creative." },
  { question: "Do you require long-term contracts?", answer: "No. We work month to month because results should earn retention, not contract lock-in." },
  { question: "How do you report performance?", answer: "Weekly optimization notes and monthly dashboards covering spend, ROAS, CPL, conversion rate, and revenue attribution where tracking allows." },
  { question: "Which ad platforms do you manage?", answer: "Google Ads, Meta, LinkedIn, and Microsoft Ads. We recommend the mix based on where your buyers actually convert, not platform hype." },
  { question: "Do you set up conversion tracking?", answer: "Yes. GA4, GTM, call tracking, and offline conversion import are standard in week one. We do not optimize blind." },
  { question: "Can you work with our in-house team?", answer: "Yes. We collaborate with internal marketers, other agencies, and fractional leaders. We can lead the program or fill a specific channel gap." },
  { question: "What industries do you serve?", answer: "Home services, healthcare, professional services, SaaS, e-commerce, and manufacturing. If your buyers search before they buy, we can usually help." },
];

export const ppcPillarContent: ServicePillarContent = {
  overview: {
    title: "PPC management built for revenue, not impressions.",
    paragraphs: [
      "Pay-per-click advertising is one of the fastest levers for predictable lead flow, but only when managed with discipline. Most accounts waste 20–40% of budget on irrelevant searches, poor landing page alignment, and channels that look good in dashboards but don't book revenue.",
      "KINEXIS provides full PPC management across Google, Meta, LinkedIn, and Microsoft Ads. We structure campaigns around your business model: local service calls for trades, demo requests for SaaS, consultations for professional services, and purchases for e-commerce.",
      "Our approach treats PPC as one node in a revenue system, not a standalone tactic. We align paid media with SEO content, landing page CRO, email nurture, and analytics so every dollar compounds across channels.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Full-funnel PPC management from audit through|ongoing optimization.",
    items: [
      { title: "Account Audit & Restructure", description: "Deep review of campaigns, ad groups, keywords, audiences, and conversion tracking." },
      { title: "Campaign Architecture", description: "Intent-based campaign structure with proper segmentation by service, location, or funnel stage." },
      { title: "Landing Page Alignment", description: "Recommendations or builds for pages that match ad intent and maximize Quality Score." },
      { title: "Conversion Tracking", description: "GA4, GTM, call tracking, and offline conversion import for accurate ROAS reporting." },
      { title: "Weekly Optimization", description: "Bid adjustments, negative keywords, audience refinements, and creative testing." },
      { title: "Monthly Reporting", description: "Executive-ready dashboards with actionable insights, not data dumps." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From audit to optimized performance in 90 days.",
    phases: [
      { phase: "Week 1–2", duration: "Audit & Strategy", description: "Account audit, competitive analysis, conversion tracking validation, and campaign architecture plan." },
      { phase: "Week 3–4", duration: "Build & Launch", description: "Campaign build, ad copy, audience setup, landing page alignment, and tracking verification." },
      { phase: "Month 2", duration: "Optimize", description: "Search term mining, bid strategy refinement, A/B testing, and budget reallocation to top performers." },
      { phase: "Month 3+", duration: "Scale", description: "Expand winning campaigns, test new channels, and integrate with SEO and email for full-funnel growth." },
    ],
  },
  pricing: {
    title: "Investment guidance",
    subtitle: "Transparent pricing based on scope and ad spend.",
    tiers: [
      { name: "Starter", range: "$2,500/mo", description: "Single-channel management for local businesses with up to $5K ad spend." },
      { name: "Growth", range: "$5,000/mo", description: "Multi-channel PPC for growing brands with $5K–$25K monthly ad spend." },
      { name: "Scale", range: "$8,000+/mo", description: "Enterprise PPC with advanced attribution, multi-location, and $25K+ ad spend." },
    ],
    note: "Management fees are separate from ad spend. We provide a detailed proposal after your strategy call.",
  },
  results: {
    title: "Results framework",
    subtitle: "How we measure PPC success.",
    metrics: [
      { metric: "+340%", label: "patients · Dental Practice, 6 mo" },
      { metric: "45%", label: "CPL reduction · paid campaigns" },
      { metric: "120%", label: "conv. lift · landing page alignment" },
    ],
  },
};

export const googleAdsPillarContent: ServicePillarContent = {
  ...ppcPillarContent,
  overview: {
    title: "Google Ads management for high-intent buyers.",
    paragraphs: [
      "Google Ads captures buyers at the moment of intent: searching for your service, comparing solutions, or ready to purchase. Done right, it's the highest-ROI paid channel for most businesses. Done wrong, it's a budget drain.",
      "KINEXIS manages Google Search, Shopping, Performance Max, Display, and YouTube campaigns with a singular focus: ROAS and qualified conversions. We build campaign structures that separate emergency intent from research intent, branded from non-branded, and high-value services from low-margin work.",
      "Every campaign connects to conversion tracking that proves revenue impact, not just clicks and form fills. We integrate Google Ads data with GA4, CRM, and call tracking for full-funnel visibility.",
    ],
  },
  deliverables: {
    ...ppcPillarContent.deliverables,
    items: [
      { title: "Search Campaign Architecture", description: "Intent-segmented campaigns with tight keyword themes and ad group structure." },
      { title: "Shopping & PMax", description: "Product feed optimization and Performance Max for e-commerce and local inventory." },
      { title: "Quality Score Optimization", description: "Ad relevance, landing page experience, and expected CTR improvements." },
      { title: "Negative Keyword Management", description: "Continuous search term audits to eliminate wasted spend." },
      { title: "Conversion Tracking Setup", description: "Enhanced conversions, offline import, and call tracking integration." },
      { title: "Bid Strategy Management", description: "Smart bidding calibrated to your conversion data and margin targets." },
    ],
  },
};

export const metaAdsPillarContent: ServicePillarContent = {
  ...ppcPillarContent,
  overview: {
    title: "Meta Ads that create demand and retarget intent.",
    paragraphs: [
      "Facebook and Instagram ads work when you treat creative like inventory that expires. Launch week numbers look great. Three weeks later CPM climbs and ROAS drops because the same ads keep running.",
      "KINEXIS builds Meta campaigns around your funnel: prospecting to find new audiences, retargeting to recover visitors who did not convert, and lookalikes seeded from your best customers. We test static, video, carousel, and UGC formats on a fixed schedule.",
      "Budget splits between prospecting and retargeting follow blended ROAS targets, not guesswork. You always know what cold spend costs versus what warm retargeting returns.",
    ],
  },
  deliverables: {
    ...ppcPillarContent.deliverables,
    items: [
      { title: "Audience Architecture", description: "Prospecting, retargeting, and lookalike audience segmentation with clean exclusions." },
      { title: "Creative Testing Framework", description: "Systematic ad rotation across formats and messaging angles every two weeks." },
      { title: "Pixel & CAPI Setup", description: "Meta Pixel and Conversions API for accurate attribution after iOS privacy changes." },
      { title: "Catalog & DPA Campaigns", description: "Dynamic product ads for e-commerce with feed optimization." },
      { title: "Funnel-Stage Budget Allocation", description: "Prospecting vs. retargeting budget split optimized for blended ROAS." },
      { title: "Monthly Creative Refresh", description: "New ad concepts to combat creative fatigue and maintain performance." },
    ],
  },
  results: {
    title: "Results we track",
    subtitle: "Lead cost and ROAS front and center.",
    metrics: [
      { metric: "$47", label: "avg. cost per lead · home services" },
      { metric: "3.8x", label: "ROAS · e-commerce client" },
      { metric: "-38%", label: "CPM drop after creative refresh" },
    ],
  },
};

export function getPaidServiceFaqs(_variant: PaidServiceVariant, _locale: Locale): FAQItem[] {
  return sharedFaqs;
}
