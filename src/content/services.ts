import {
  getHomeServices,
  homeServices,
  type HomeService,
  type HomeServiceSlug,
} from "@/content/home-services";
import type { Locale } from "@/i18n/routing";
export type ServiceSlug = HomeServiceSlug;
export type ServicePage = HomeService & {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSignal?: string;
  heroCopy: string;
  problemTitle: string;
  problemCopy: string;
  approachTitle: string;
  approachCopy: string;
  deliverables: { title: string; description: string }[];
  outcomes: string[];
  fitFor: string[];
  ctaTitle: string;
  ctaCopy: string;
};
const bySlug = Object.fromEntries(
  homeServices.map((s) => [s.slug, s]),
) as Record<ServiceSlug, HomeService>;
export const servicePages: ServicePage[] = [
  {
    ...bySlug["web-design"],
    metaTitle: "Phone-First Web Design That Converts",
    metaDescription:
      "Phone-first websites built to convert. Fast load, clear paths, and CTAs that stay obvious on every screen. Built for home services and ecommerce.",
    heroTitle: "Web",
    heroSignal: "design.",
    heroCopy:
      "Most traffic lands on a phone. We design from that screen out so CTAs and layout stay obvious on every device.",
    problemTitle: "Desktop layouts that collapse on mobile.",
    problemCopy:
      "A site that looks sharp on a monitor can bury the call button and force awkward scrolling on a phone. Buyers do not wait. They leave, and you already paid for the click.",
    approachTitle: "We design from the phone up.",
    approachCopy:
      "Structure and CTAs get proven on the smallest screen first, then scaled to tablet and desktop. You see mockups across real devices before a line of code ships.",
    deliverables: [
      {
        title: "Mobile first design",
        description: "Layouts proven on phone before they grow.",
      },
      {
        title: "Responsive systems",
        description: "Breakpoints and components that hold everywhere.",
      },
      {
        title: "Device mockups",
        description: "Phone, tablet, desktop comps before development.",
      },
      {
        title: "Frontend builds",
        description: "Clean code. No bloated themes.",
      },
      {
        title: "Conversion paths",
        description: "CTAs that stay obvious on every screen.",
      },
      {
        title: "Performance",
        description: "Fast on cellular. Tracking that does not slow the site.",
      },
    ],
    outcomes: [
      "Higher conversion from the mobile traffic you already earn",
      "One design system from phone to desktop",
      "A site that keeps pace with paid and SEO growth",
    ],
    fitFor: [
      "Home service brands living on mobile calls and form fills",
      "Ecommerce stores losing buyers to clumsy phone checkouts",
      "Teams whose site still reads like a desktop brochure on a phone",
    ],
    ctaTitle: "Ready for a site that works on every screen?",
    ctaCopy:
      "Show us your current site on a phone. We will map the first fixes worth shipping.",
  },
  {
    ...bySlug.seo,
    metaTitle: "SEO That Books Jobs and Orders Fast",
    metaDescription:
      "Technical SEO, local search, and content architecture for brands that need qualified organic demand, not empty traffic charts that never ring the phone.",
    heroTitle: "Search",
    heroSignal: "demand.",
    heroCopy:
      "Fix the technical base, target commercial intent, and build pages that rank and convert.",
    problemTitle: "Rankings that look good but never ring the phone.",
    problemCopy:
      "Traffic charts can look healthy while booked jobs stay flat. Usually that means ranking for soft queries or ignoring the local pack where homeowners actually pick who to call.",
    approachTitle: "Fix the foundation, then earn the click.",
    approachCopy:
      "Technical cleanup first so Google trusts the site. Then keyword strategy tied to revenue, local signals where they matter, and content that answers questions before the phone rings.",
    deliverables: [
      {
        title: "Technical SEO",
        description: "Crawl, indexation, speed, structured data.",
      },
      {
        title: "Local search",
        description: "Maps, service pages, reviews for call-driven businesses.",
      },
      {
        title: "Keyword strategy",
        description: "Queries tied to jobs people pay for.",
      },
      {
        title: "On page SEO",
        description: "Titles, links, structure that earn clicks and calls.",
      },
      {
        title: "Content architecture",
        description: "A map from buyer intent to pages that rank.",
      },
      {
        title: "Search analytics",
        description: "Reporting tied to leads and revenue.",
      },
    ],
    outcomes: [
      "Organic traffic that maps to service and product demand",
      "Stronger local visibility where homeowners hire",
      "A content system that compounds instead of resetting monthly",
    ],
    fitFor: [
      "Local operators tired of feast-or-famine referrals",
      "Ecommerce brands with thin product SEO",
      "Sites with traffic that never becomes pipeline",
    ],
    ctaTitle: "Want organic demand you can plan around?",
    ctaCopy:
      "We will review your rankings, pages, and local presence and tell you what actually moves leads.",
  },
  {
    ...bySlug.branding,
    metaTitle: "Branding Systems Your Team Can Run",
    metaDescription:
      "Brand strategy, verbal identity, and visual systems home services and ecommerce teams can actually run across site, ads, and sales.",
    heroTitle: "Brand",
    heroSignal: "systems.",
    heroCopy:
      "A clear stance, then a system your site, ads, and sales team can run without starting over.",
    problemTitle: "Branding that looks finished but says nothing.",
    problemCopy:
      "You can spend months on a rebrand and still sound like everyone else. Homeowners and shoppers do not care about the nicest wordmark. They care about the company that feels clear and built for their problem.",
    approachTitle: "We lock positioning first, design second.",
    approachCopy:
      "Messaging comes before pixels. Then we build a visual system your site, ads, and sales team can run campaign after campaign, without starting over each time.",
    deliverables: [
      {
        title: "Brand strategy",
        description: "Audience, stance, proof, story.",
      },
      {
        title: "Verbal identity",
        description: "Voice, taglines, tone for site, ads, follow-up.",
      },
      {
        title: "Visual system",
        description: "Type, color, layout that scales past one homepage.",
      },
      {
        title: "Brand guidelines",
        description: "A guide your team opens without guessing.",
      },
      {
        title: "Launch assets",
        description: "Logos, social crops, templates ready day one.",
      },
      {
        title: "Message frameworks",
        description: "Pitches your team reuses across channels.",
      },
    ],
    outcomes: [
      "Clearer differentiation on every page and ad",
      "Messaging your team can reuse without rewriting from scratch",
      "A visual system that survives the next redesign cycle",
    ],
    fitFor: [
      "Operators outgrowing DIY branding",
      "Teams launching into a crowded local or ecommerce category",
      "Brands whose site, ads, and sales pitch disagree",
    ],
    ctaTitle: "Need a brand that closes, not just looks finished?",
    ctaCopy:
      "Bring the competitive set and a rough offer. We will tell you what to keep and what to build next.",
  },
  {
    ...bySlug["paid-media"],
    metaTitle: "Paid Ads You Can Actually Defend",
    metaDescription:
      "Google and Meta ads managed like a budget. Campaign structure, creative testing, and reporting tied to leads you can defend.",
    heroTitle: "Paid",
    heroSignal: "ads.",
    heroCopy:
      "Structure Google and Meta around real offers, test creative, and cut what stops earning leads.",
    problemTitle: "Spend that buys clicks but not customers.",
    problemCopy:
      "Agencies love impression charts. Owners care about cost per booked job. If tracking is fuzzy and creative never rotates, you keep paying for weak outcomes.",
    approachTitle: "Structure, creative, weekly pacing.",
    approachCopy:
      "Campaigns built around intent and offer, traffic sent to pages that convert, reviewed every week. Weak spend gets cut. Budget moves to what brings demand.",
    deliverables: [
      {
        title: "Google Ads",
        description: "Search and Performance Max around real offers.",
      },
      {
        title: "Meta Ads",
        description: "Prospecting and retargeting that earns clicks.",
      },
      {
        title: "Campaign structure",
        description: "Architecture that matches how buyers search.",
      },
      {
        title: "Creative testing",
        description: "Variants tested with a hypothesis, not random.",
      },
      {
        title: "Budget pacing",
        description: "Spend on winners, guardrails when CAC drifts.",
      },
      {
        title: "Attribution",
        description: "Leads, calls, revenue in plain language.",
      },
    ],
    outcomes: [
      "Lower wasted spend on soft intent and weak creatives",
      "Clear cost per lead or cost per order targets",
      "Paid and organic working the same offers and pages",
    ],
    fitFor: [
      "Teams burning budget with no clear CPL story",
      "Operators ready to scale what already converts",
      "Brands whose ads send people to a homepage dead end",
    ],
    ctaTitle: "Ready to make every dollar defendable?",
    ctaCopy:
      "Bring last month's spend and lead numbers. We will show where the money leaks and what to fix first.",
  },
  {
    ...bySlug["content-marketing"],
    metaTitle: "Content Marketing That Sells Work",
    metaDescription:
      "Content strategy, service pages, guides, and email that answer buyer questions and keep pipeline moving after the first click.",
    heroTitle: "Content that",
    heroSignal: "sells.",
    heroCopy:
      "Answers buyers need before they call, plus sequences that keep warm leads from going cold.",
    problemTitle: "Publishing that fills a calendar but not a pipeline.",
    problemCopy:
      "A blog that ranks for trivia does not book jobs. Buyers need clear service pages, proof they trust, and sequences that move them toward a decision.",
    approachTitle: "Map the questions. Then answer them.",
    approachCopy:
      "We match content to the questions that come before a hire or purchase, then build pages, guides, and email that support SEO and paid instead of fighting them.",
    deliverables: [
      {
        title: "Content strategy",
        description: "Topics tied to revenue pages and objections.",
      },
      {
        title: "Service pages",
        description: "Copy that sells the job, not the jargon.",
      },
      {
        title: "Blog and guides",
        description: "Pieces that earn links and trust.",
      },
      {
        title: "Email sequences",
        description: "Nurture that keeps pipeline warm.",
      },
      {
        title: "Offer pages",
        description: "Landing copy for campaigns and promos.",
      },
      {
        title: "Editorial calendar",
        description: "A rhythm your team can sustain.",
      },
    ],
    outcomes: [
      "Pages that support SEO and sales conversations",
      "Fewer cold leads dying in the inbox",
      "An editorial rhythm your team can sustain",
    ],
    fitFor: [
      "Brands with thin service or product copy",
      "Teams whose blog never influences pipeline",
      "Operators who need follow-up that does not depend on memory",
    ],
    ctaTitle: "Need writing that moves pipeline?",
    ctaCopy:
      "Tell us where buyers stall. We will outline the pages worth writing first.",
  },
];
export function getServiceBySlug(slug: string, locale: Locale = "en"): ServicePage | undefined {
  return getServicePages(locale).find((s) => s.slug === slug);
}
export function getAllServiceSlugs(): ServiceSlug[] {
  return servicePages.map((s) => s.slug);
}

export function getServicePages(locale: Locale = "en"): ServicePage[] {
  const localized = getHomeServices(locale);
  const overlay = Object.fromEntries(localized.map((s) => [s.slug, s])) as Record<
    ServiceSlug,
    HomeService
  >;
  return servicePages.map((page) => ({
    ...page,
    title: overlay[page.slug].title,
    shortTitle: overlay[page.slug].shortTitle,
    role: overlay[page.slug].role,
    description: overlay[page.slug].description,
    capabilities: overlay[page.slug].capabilities,
  }));
}
