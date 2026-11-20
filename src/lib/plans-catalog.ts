/**
 * Canonical plan catalog — prices, card features, comparison matrix, checkout bullets.
 * PayPal plan IDs stay in paypal.ts. Do not change published prices without approval.
 *
 * Domain: year 1 included on all monthly plans and Own It (owner-approved). Renewals at cost.
 * Copywriting: still quoted separately until an inclusion decision is approved.
 */

import { PAYPAL_PLANS } from "@/lib/paypal";

export type PlanSlug = "website" | "lead-system" | "plus" | "own-it";
export type CheckoutKey = "website" | "leadSystem" | "plus" | "ownIt";

export type CatalogPlan = {
  slug: PlanSlug;
  checkoutKey: CheckoutKey;
  name: string;
  tagline: string;
  /** Display price string for cards */
  priceLabel: string;
  suffix: string;
  kicker: string;
  note: string;
  /** Numeric USD amount (PayPal / totals) */
  amount: number;
  monthly: boolean;
  popular?: boolean;
  guarantee?: boolean;
  cta: string;
  /** Card feature rows [title, detail] */
  features: [string, string][];
  /** Checkout bullet list */
  checkoutFeatures: string[];
};

export const CATALOG_PLANS: CatalogPlan[] = [
  {
    slug: "website",
    checkoutKey: "website",
    name: "Website",
    tagline: "For a professional website with hosting and routine edits handled.",
    priceLabel: "$97",
    suffix: "/mo",
    kicker: "$0 down, then",
    note: "Month-to-month · cancel anytime",
    amount: PAYPAL_PLANS.website.price,
    monthly: true,
    cta: "Start with a free preview",
    features: [
      ["Mobile website", "Up to 5 pages"],
      ["Hosting + SSL", "Security and backups included"],
      ["Domain", "Year 1 included · in your name"],
      ["Small edits*", "Up to 2 a month, in 2 business days"],
      ["Form-lead tracking", "Know when a quote form comes in"],
      ["New pages", "$99 each"],
    ],
    checkoutFeatures: [
      "Up to 5 pages",
      "Hosting, SSL and backups",
      "2 small edits a month, in 2 business days",
      "Contact form leads",
      "Domain year 1 included, in your name",
      "30-day money-back guarantee",
      "No texting or lead guarantee",
    ],
  },
  {
    slug: "lead-system",
    checkoutKey: "leadSystem",
    name: "Lead System",
    tagline: "For businesses that want call tracking and Google review requests with their website.",
    priceLabel: "$197",
    suffix: "/mo",
    kicker: "$0 down, then",
    note: "Month-to-month · cancel anytime",
    amount: PAYPAL_PLANS.leadSystem.price,
    monthly: true,
    popular: true,
    guarantee: true,
    cta: "Start with a free preview",
    features: [
      ["Mobile website", "Up to 10 pages, hosting + backups"],
      ["Domain", "Year 1 included · in your name"],
      ["Missed-call text-back", "Optional · $1/mo 2nd number + carrier"],
      ["Google review requests", "After every job"],
      ["Google profile tune-up", "At launch"],
      ["Call tracking + report", "One monthly report"],
      ["Unlimited small edits*", "In 1 business day"],
      ["New pages", "1 per month included"],
    ],
    checkoutFeatures: [
      "Up to 10 pages",
      "Unlimited small edits within 1 business day",
      "1 new page a month",
      "Domain year 1 included, in your name",
      "Optional missed-call text-back add-on",
      "Google review requests to every customer",
      "Google Business Profile tune-up",
      "Call tracking and monthly report",
      "60-day tracked-lead guarantee",
      "30-day money-back guarantee",
    ],
  },
  {
    slug: "plus",
    checkoutKey: "plus",
    name: "Plus (Bilingual)",
    tagline: "For businesses serving customers in both English and Spanish.",
    priceLabel: "$297",
    suffix: "/mo",
    kicker: "$0 down, then",
    note: "Month-to-month · cancel anytime",
    amount: PAYPAL_PLANS.plus.price,
    monthly: true,
    guarantee: true,
    cta: "Start with a free preview",
    features: [
      ["Bilingual website", "Up to 20 pages, English + Spanish"],
      ["Domain", "Year 1 included · in your name"],
      ["Missed-call text-back", "Optional · EN/ES · $1/mo 2nd number + carrier"],
      ["Google review requests", "English + Spanish"],
      ["Google profile tune-up", "+ 2 posts a month"],
      ["Call tracking + report", "One monthly report"],
      ["Unlimited small edits*", "Same business day by noon CT"],
      ["New pages", "2 per month included"],
    ],
    checkoutFeatures: [
      "Everything in Lead System",
      "Full English + Spanish site, up to 20 pages",
      "Domain year 1 included, in your name",
      "Same-day edits if sent by noon Central",
      "2 new pages a month",
      "2 Google profile posts a month",
      "30-day money-back guarantee",
    ],
  },
  {
    slug: "own-it",
    checkoutKey: "ownIt",
    name: "Own It",
    tagline: "For a one-time website purchase, with the site files yours from launch.",
    priceLabel: "$1,497",
    suffix: "one-time",
    kicker: "One payment",
    note: "Paid when you approve your preview · no monthly plan · no lead guarantee",
    amount: 1497,
    monthly: false,
    cta: "Start with a free preview",
    features: [
      ["Mobile website", "Up to 10 pages"],
      ["Site files yours", "From launch day"],
      ["Hosting + SSL", "12 months included"],
      ["Small edits*", "12 months, up to 30 min a month"],
      ["Domain", "First year included"],
      ["One payment", "No monthly plan"],
    ],
    checkoutFeatures: [
      "Same site as Lead System, up to 10 pages",
      "Site files are yours from launch on full payment",
      "12 months of hosting and up to 30 min of edits a month",
      "Domain year 1 included",
      "Optional Site Care $39/mo after",
      "Optional missed-call text-back add-on $97/mo",
      "30-day money-back guarantee",
      "No monthly plan, no lead guarantee",
    ],
  },
];

/** Verified from PLAN_TERM_GROUPS / UPGRADES — Website & Own It $97/mo add-on; LS/Plus optional $1/mo 2nd number + carrier. */
export const TEXTBACK_MATRIX = {
  website: "Add-on $97/mo",
  leadSystem: "Optional · $1/mo 2nd number + carrier",
  plus: "Optional · EN/ES · $1/mo 2nd number + carrier",
  ownIt: "Add-on $97/mo",
} as const;

/**
 * Four-plan feature matrix for homepage + pricing.
 */
export const PLAN_COMPARISON: { group: string; rows: [string, string, string, string, string][] }[] = [
  {
    group: "The site",
    rows: [
      ["Professional custom website", "Yes", "Yes", "Yes", "Yes"],
      ["Hosting, SSL and backups", "Yes", "Yes", "Yes", "12 months"],
      ["Domain (year 1)", "Included", "Included", "Included", "Included"],
      ["Contact forms", "Yes", "Yes", "Yes", "Yes"],
      ["Mobile-friendly design", "Yes", "Yes", "Yes", "Yes"],
      ["Pages included", "Up to 5", "Up to 10", "Up to 20", "Up to 10"],
      ["Small website edits", "2 / mo", "Unlimited", "Unlimited", "30 min / mo"],
      ["New pages", "$99 each", "1 / mo", "2 / mo", "Quoted"],
      ["Website files included", "—", "—", "—", "Yes"],
    ],
  },
  {
    group: "Lead follow-up",
    rows: [
      ["Missed-call text-back", TEXTBACK_MATRIX.website, TEXTBACK_MATRIX.leadSystem, TEXTBACK_MATRIX.plus, TEXTBACK_MATRIX.ownIt],
      ["Google review requests", "—", "Yes", "Yes", "—"],
      ["Google Business Profile tune-up", "—", "Yes", "Yes", "—"],
      ["Call tracking and monthly reports", "—", "Yes", "Yes", "—"],
      ["English + Spanish website", "—", "—", "Yes", "—"],
    ],
  },
  {
    group: "The deal",
    rows: [
      ["60-day lead guarantee", "—", "Yes", "Yes", "—"],
      ["30-day money-back", "Yes", "Yes", "Yes", "Yes"],
      ["Monthly commitment", "Month-to-month", "Month-to-month", "Month-to-month", "One-time"],
      ["Cancel anytime", "Yes", "Yes", "Yes", "—"],
      ["Price locked", "24 months", "24 months", "24 months", "One payment"],
      ["Price", "$97 / mo", "$197 / mo", "$297 / mo", "$1,497 once"],
    ],
  },
];

/** Illustrative totals only — not a contract. Cancel anytime on monthly plans. */
export const OWNERSHIP_COMPARE = {
  headline: "Own It vs monthly managed plans",
  intro:
    "Monthly plans are managed and hosted while active. Own It gives you the site files from launch. The 24-month price lock is not a 24-month contract—you can cancel anytime.",
  rows: [
    {
      path: "Website monthly",
      cost24: "$2,328",
      ownership: "Files stay with Kinexis while the plan is active",
      afterCancel: "Site goes offline when the paid period ends unless you buy out or switch to Own It",
    },
    {
      path: "Lead System monthly",
      cost24: "$4,728",
      ownership: "Files stay with Kinexis while the plan is active",
      afterCancel: "Same as Website; buyout is a written $1,497 purchase of the site files",
    },
    {
      path: "Plus monthly",
      cost24: "$7,128",
      ownership: "Files stay with Kinexis while the plan is active",
      afterCancel: "Same cancel and buyout rules as other monthly plans",
    },
    {
      path: "Own It",
      cost24: "$1,497 once",
      ownership: "Site files yours from launch day",
      afterCancel: "No monthly plan; hosting/edits included 12 months, then optional Site Care",
    },
  ],
  footnote:
    "24-month totals use current published prices for illustration only. You can cancel earlier. A $1,497 file buyout after monthly service is a separate written purchase and does not include ongoing hosting unless you arrange it.",
};

export const PLAN_CHOOSER_BLURB =
  "Not sure which plan is right? Start with Website if you need a professional online presence. Choose Lead System if you want tools to capture and follow up with more opportunities. Choose Plus if you serve English- and Spanish-speaking customers. Choose Own It if you prefer a one-time website purchase.";

export const LEAD_SYSTEM_FEATURED = {
  name: "Lead System",
  price: "$197/mo",
  pitch: "Best for contractors who want more than just a website.",
  bullets: [
    "Review requests",
    "Call tracking",
    "Monthly reporting",
    "More website edits",
    "Optional missed-call text-back",
  ],
  note: "Month-to-month. Cancel anytime.",
};

export function planBySlug(slug: string) {
  return CATALOG_PLANS.find((p) => p.slug === slug);
}

export function planByCheckoutKey(key: CheckoutKey) {
  return CATALOG_PLANS.find((p) => p.checkoutKey === key);
}
