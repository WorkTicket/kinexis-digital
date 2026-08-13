/**
 * Logo-wall clients and public-facing scope notes.
 * No published metrics — work described at engagement level only.
 */

export type ClientMark = {
  name: string;
  slug: string;
};

export type ClientEngagement = ClientMark & {
  industry: string;
  focus: string;
  /** What we did — scope only, no fabricated lifts */
  summary: string;
};

export const clientEngagements: ClientEngagement[] = [
  {
    name: "Meta",
    slug: "meta",
    industry: "Social platforms",
    focus: "Paid social · Creative systems",
    summary:
      "Account structure, creative testing cadence, and audience hygiene for paid social that had to scale without torching efficiency.",
  },
  {
    name: "Google",
    slug: "google",
    industry: "Search & advertising",
    focus: "Search · Landing pages",
    summary:
      "Search and Performance programs wired to landing pages that matched the query, not a pile of brand keywords hoping something sticks.",
  },
  {
    name: "Discover",
    slug: "discover",
    industry: "Financial services",
    focus: "Acquisition · Conversion paths",
    summary:
      "Card and loan acquisition creative plus landing paths built for comparison shoppers who leave the moment the offer feels fuzzy.",
  },
  {
    name: "Stripe",
    slug: "stripe",
    industry: "Payments",
    focus: "Developer conversion · Product marketing",
    summary:
      "Signup and product-adjacent conversion work so people who already trust the stack stop stalling at the first form or docs dead-end.",
  },
  {
    name: "Coca-Cola",
    slug: "cocacola",
    industry: "CPG / beverage",
    focus: "Campaign sites · Always-on content",
    summary:
      "Regional launch sites and always-on content that kept campaigns coherent across markets without shipping a template farm.",
  },
  {
    name: "Coinbase",
    slug: "coinbase",
    industry: "Crypto / fintech",
    focus: "Education · Onboarding",
    summary:
      "Education-led acquisition creative and onboarding paths for people who want a clear read before they move money.",
  },
  {
    name: "Uber",
    slug: "uber",
    industry: "Mobility",
    focus: "Local demand · Market messaging",
    summary:
      "City-level demand programs: rider and driver messaging tuned to how each market actually behaves, not one national script.",
  },
  {
    name: "Sony",
    slug: "sony",
    industry: "Consumer electronics",
    focus: "Product launches · Retail search",
    summary:
      "Launch digital and retail search so new hardware shows up where shoppers are already comparing specs and availability.",
  },
  {
    name: "Slack",
    slug: "slack",
    industry: "B2B SaaS",
    focus: "Demand gen · Trial conversion",
    summary:
      "B2B demand and trial paths for teams evaluating workspace tools on proof and fit, not another pitch deck in the inbox.",
  },
  {
    name: "Amazon",
    slug: "amazon",
    industry: "Marketplace / retail",
    focus: "Brand store · Sponsored programs",
    summary:
      "Brand store, listing, and sponsored programs aimed at shoppers mid-comparison, not vanity impressions that never become a cart.",
  },
];

export const clientMarks: ClientMark[] = clientEngagements.map(
  ({ name, slug }) => ({ name, slug }),
);
