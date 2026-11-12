import { industryCostPostPath, industryPagesPostPath } from "@/data/industries";

export type CostPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: { q: string; a: string }[];
};

export type CostTradeSpec = {
  /** Industry slug used for path helpers. */
  slug: string;
  /** Short noun phrase: "plumber", "HVAC", "roofing". */
  noun: string;
  /** Article before noun: "a" | "an" | "". */
  article: "a" | "an" | "";
  /** Possessive / site label: "Plumbing", "an HVAC". */
  siteLabel: string;
  /** Exact industry-page anchor text. */
  designAnchor: string;
  /** What drives cost on this trade (HTML paragraphs, no wrapping h2). */
  drivesCostHtml: string;
  /** What you're paying for blurb (before links). */
  payingForHtml: string;
};

const PLAN_TABLE = `<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href="/pricing">/pricing</a>. Compare monthly vs Own It in <a href="/blog/monthly-website-vs-own-it">Monthly Website vs Own It</a>.</p>`;

const TWENTY_FOUR_MONTH = `<p>Computed only from live Kinexis terms ($0 down, price locked 24 months on monthly plans):</p><table><thead><tr><th>Plan</th><th>Year 1</th><th>24 months</th><th>Notes</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 down, price locked 24 months</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Includes 60-day lead guarantee</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>English + Spanish</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + optional Site Care $39/mo in months 13–24 ($468) = $1,965</td><td>Domain renewal billed at cost</td></tr></tbody></table><p><em>Prices exclude tax, if any. Text-back carrier rates and the optional $1/mo second number are extra.</em></p>`;

const DIY_SECTION = `<p>What changes the price is page count, copywriting, photos, hosting, ongoing edits, and follow-up tools—not a vague “average website cost” number from someone else’s market.</p><p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. For example, <a href="https://www.wix.com/plans" rel="noopener noreferrer" target="_blank">Wix lists paid plans from about $17/mo</a> before you add time and extras. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions.</p><p>A monthly managed plan packages the site, hosting, and edits under one price. We publish our own plan prices so you can compare without guessing.</p>`;

const HIDDEN = `<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>`;

const LIVE_COST_SLUGS = [
  "plumbing",
  "hvac",
  "electrical",
  "roofing",
  "garage-doors",
  "landscaping",
  "pressure-washing",
] as const;

function otherTradesHtml(currentSlug: string) {
  const labels: Record<string, string> = {
    plumbing: "plumber website cost",
    hvac: "HVAC website cost",
    electrical: "electrician website cost",
    roofing: "roofing website cost",
    "garage-doors": "garage door website cost",
    landscaping: "landscaping website cost",
    "pressure-washing": "pressure washing website cost",
  };
  const links = LIVE_COST_SLUGS.filter((slug) => slug !== currentSlug)
    .map((slug) => `<li><a href="${industryCostPostPath(slug)}">${labels[slug]}</a></li>`)
    .join("");
  return `<p>Same four plans apply across trades. Costs differ only when the page list and copy get more specific:</p><ul>${links}</ul>`;
}

function withArticle(article: CostTradeSpec["article"], noun: string) {
  if (!article) return noun;
  return `${article} ${noun}`;
}

export function buildCostPostBody(spec: CostTradeSpec): CostPostBody {
  const subject = withArticle(spec.article, spec.noun);
  const industryPath = `/industries/${spec.slug}`;
  const pagesPath = industryPagesPostPath(spec.slug);

  return {
    lead: `With Kinexis, ${subject} website is $97/mo (Website), $197/mo (Lead System), $297/mo (Plus, English + Spanish) or $1,497 once (Own It). Every option starts with a free homepage preview in 2 business days, no card.`,
    faqs: [
      {
        q: `How much is ${subject} website with Kinexis?`,
        a: "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions.",
      },
      {
        q: "Is there a setup fee?",
        a: "No surprise setup fees. Monthly plans are $0 down. Own It is a written one-time $1,497. Every option starts with a free homepage preview — no card and no obligation.",
      },
      {
        q: "Do I own the site on a monthly plan?",
        a: "On monthly plans, hosting and management continue while you subscribe. A buyout is a written one-time $1,497 purchase of the site files. Own It includes ownership from launch day.",
      },
      {
        q: "Is SEO included in those prices?",
        a: "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans.",
      },
      {
        q: "What if I cancel a monthly plan?",
        a: "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends.",
      },
      {
        q: "What does text-back cost?",
        a: "On Lead System and Plus, text-back is optional: $1/mo for a second number plus carrier rates. On Website and Own It it is a $97/mo add-on. Carrier approval usually takes 10–15 days and is not guaranteed.",
      },
    ],
    sections: [
      {
        h2: "Kinexis Prices for Business Websites",
        html: PLAN_TABLE,
      },
      {
        h2: "What It Costs Over 24 Months",
        html: TWENTY_FOUR_MONTH,
      },
      {
        h2: "DIY vs Freelancer vs Agency vs a Monthly Plan: What Changes the Price",
        html: DIY_SECTION,
      },
      {
        h2: `What Drives Cost on ${spec.siteLabel} Site`,
        html: spec.drivesCostHtml,
      },
      {
        h2: "Hidden Costs to Plan For",
        html: HIDDEN,
      },
      {
        h2: `What You’re Paying For on ${spec.siteLabel} Site`,
        html: `${spec.payingForHtml}<p>See <a href="${industryPath}">${spec.designAnchor}</a> and <a href="${pagesPath}">the pages checklist</a>.</p><p><a href="/contact">Get a free homepage preview</a> before you choose a plan.</p>`,
      },
      {
        h2: "Website Cost for Other Trades",
        html: otherTradesHtml(spec.slug),
      },
    ],
  };
}

export const COST_TRADE_SPECS: CostTradeSpec[] = [
  {
    slug: "plumbing",
    noun: "plumber",
    article: "a",
    siteLabel: "a Plumbing",
    designAnchor: "plumber website design",
    drivesCostHtml:
      "<p>Plumbing sites cost more time when emergency repair, drains, and water heaters each need their own page, hours, and proof. Photo galleries of finished baths help quote work; after-hours honesty keeps emergency callers from feeling baited.</p><p>Extra pages, bilingual copy (Plus), and follow-up tools (Lead System) change the plan—not a higher “plumbing tax.”</p>",
    payingForHtml:
      "<p>You’re paying for pages built around leaks, drains, and water heaters — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "hvac",
    noun: "HVAC",
    article: "an",
    siteLabel: "an HVAC",
    designAnchor: "HVAC website design",
    drivesCostHtml:
      "<p>HVAC cost drivers are repair vs replacement paths, maintenance-plan pages for shoulder season, and financing notes only when you really offer them. Peak-season call volume also makes missed-call follow-up more valuable than another stock hero image.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around no-cool repair, replacement, and maintenance — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "electrical",
    noun: "electrician",
    article: "an",
    siteLabel: "an Electrician",
    designAnchor: "electrician website design",
    drivesCostHtml:
      "<p>Electrician sites spend budget on trust: license cues, panel upgrades, EV chargers, and troubleshooting as separate jobs. Homeowners comparing bids need clear scope pages more than animated fluff.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around panels, EV chargers, and troubleshooting — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "roofing",
    noun: "roofing",
    article: "a",
    siteLabel: "a Roofing",
    designAnchor: "roofing website design",
    drivesCostHtml:
      "<p>Roofing cost drivers include storm and insurance pages, before/after photo galleries, and separate paths for repair vs full replacement. Inspection requests need a short form that works on a phone after a hail event.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around repairs, replacements, and inspections — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "garage-doors",
    noun: "garage door company",
    article: "a",
    siteLabel: "a Garage Door",
    designAnchor: "garage door website design",
    drivesCostHtml:
      "<p>Garage door sites need clear separation between spring repair, opener issues, and new doors. Same-day repair callers and replacement shoppers should not land on the same generic services dump.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around springs, openers, and new doors — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "landscaping",
    noun: "landscaping",
    article: "a",
    siteLabel: "a Landscaping",
    designAnchor: "landscaping website design",
    drivesCostHtml:
      "<p>Landscaping cost drivers are maintenance routes vs project installs, seasonal packages, and photo proof of real yards. Recurring mow customers and one-off patio buyers need different next steps.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around maintenance and projects — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "pressure-washing",
    noun: "pressure washing",
    article: "a",
    siteLabel: "a Pressure Washing",
    designAnchor: "pressure washing website design",
    drivesCostHtml:
      "<p>Pressure washing sites need short quote paths for houses, concrete, and roofs, plus soft-wash notes when methods differ. Photo before/afters and clear surface lists reduce back-and-forth texts.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around houses, concrete, and roofs — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "painting",
    noun: "painting",
    article: "a",
    siteLabel: "a Painting",
    designAnchor: "painting website design",
    drivesCostHtml:
      "<p>Painting sites spend time on interior vs exterior paths, prep expectations, and project photo galleries. Quote forms that capture rooms and surfaces reduce estimate visits.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around interior and exterior painting — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "remodeling",
    noun: "remodeling",
    article: "a",
    siteLabel: "a Remodeling",
    designAnchor: "remodeling website design",
    drivesCostHtml:
      "<p>Remodeling cost drivers are longer sales cycles: kitchen/bath project pages, process timelines, and portfolio proof. Separate paths for repair-level work vs full remodels keep leads cleaner.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around the remodels you actually sell — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "pool-care",
    noun: "pool service",
    article: "a",
    siteLabel: "a Pool Service",
    designAnchor: "pool service website design",
    drivesCostHtml:
      "<p>Pool service sites need route vs repair clarity, chemical/plan pages, and seasonal opening/closing offers. Homeowners want a simple way to start service without a long brochure.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around pool care routes and repairs — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "window-cleaning",
    noun: "window cleaning",
    article: "a",
    siteLabel: "a Window Cleaning",
    designAnchor: "window cleaning website design",
    drivesCostHtml:
      "<p>Window cleaning sites cost more when residential, storefront, and recurring routes each get honest pages. Pane counts and frequency fields on the quote form save phone tag.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around homes and storefronts — not a generic template with the business name swapped.</p>",
  },
  {
    slug: "yard-care",
    noun: "lawn care",
    article: "a",
    siteLabel: "a Lawn Care",
    designAnchor: "lawn care website design",
    drivesCostHtml:
      "<p>Lawn care sites need route signup vs one-off cleanup paths, and clear service lists (mow, cleanup, pet waste). Zip and frequency fields keep route planning honest.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around routes and cleanups — not a generic template with the business name swapped.</p>",
  },
];

const COST_SLUG_BY_INDUSTRY: Record<string, string> = {
  plumbing: "plumber-website-cost",
  hvac: "hvac-website-cost",
  electrical: "electrician-website-cost",
  roofing: "roofing-website-cost",
  "garage-doors": "garage-door-website-cost",
  painting: "painting-website-cost",
  remodeling: "remodeling-website-cost",
  landscaping: "landscaping-website-cost",
  "pool-care": "pool-service-website-cost",
  "pressure-washing": "pressure-washing-website-cost",
  "window-cleaning": "window-cleaning-website-cost",
  "yard-care": "lawn-care-website-cost",
};

/** Generated English bodies keyed by blog slug. */
export const GENERATED_COST_POSTS: Record<string, CostPostBody> = Object.fromEntries(
  COST_TRADE_SPECS.map((spec) => [COST_SLUG_BY_INDUSTRY[spec.slug], buildCostPostBody(spec)]),
);
