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

const PLAN_TABLE = `<p>Price talk for trade websites gets noisy fast: one quote is a DIY subscription, another is a freelancer project fee, another is a retainer that bundles ads. This page sticks to <strong>published Kinexis prices</strong> so you can compare apples to apples—then decide whether a managed plan, Own It, or another path fits your cash flow.</p><p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Monthly plans are $0 down, month-to-month, cancel anytime with no cancellation fee, with price locked 24 months from launch. Every plan includes a 30-day money-back guarantee (written request; third-party costs already paid are excluded). Lead System and Plus also include a 60-day lead guarantee. Full inclusions live on <a href="/pricing">/pricing</a>. Compare monthly vs Own It in <a href="/blog/monthly-website-vs-own-it">Monthly Website vs Own It</a>.</p><p>Every option starts with a <strong>free homepage preview in 2 business days</strong>—no card, no obligation—so you see the direction before you pay.</p>`;

const TWENTY_FOUR_MONTH = `<p>Computed only from live Kinexis terms ($0 down, price locked 24 months on monthly plans). This is not a third-party “average website cost” survey—it is simple multiplication of the published monthly rates, plus Own It’s optional Site Care after year one:</p><table><thead><tr><th>Plan</th><th>Year 1</th><th>24 months</th><th>Notes</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 down, price locked 24 months</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Includes 60-day lead guarantee</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>English + Spanish</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + optional Site Care $39/mo in months 13–24 ($468) = $1,965</td><td>Domain renewal billed at cost</td></tr></tbody></table><p><em>Prices exclude tax, if any. Text-back carrier rates and the optional $1/mo second number are extra.</em></p><p>Use the 24-month column when you compare a “cheap” DIY tool that still needs your evenings for two years. Calendar time is part of cost even when it does not appear on a receipt.</p>`;

const DIY_SECTION = `<p>What changes the price is rarely a mysterious industry multiplier. It is page count, who writes the copy, who shoots the photos, who hosts the thing, who makes edits at 9 p.m. in July, and whether follow-up tools are included. Forum threads that invent a national “average website cost” skip all of that.</p><p>DIY builders can look cheap on day one. Then you add hosting tiers, your evenings learning the editor, stock photo subscriptions, and the quiet cost of a page that still hides the phone number. Public pricing changes; check current tiers on <a href="https://www.wix.com/plans" rel="noopener noreferrer" target="_blank">Wix plans</a> and <a href="https://www.squarespace.com/pricing" rel="noopener noreferrer" target="_blank">Squarespace pricing</a>, then be honest about your calendar. Freelancers vary by skill and how booked they are. Agencies often quote project fees that bundle strategy, design, and rounds of revisions—fine when you need that machine, heavy when you need five clear pages.</p><p>A monthly managed plan packages the site, hosting, and edits under one published price. We show our numbers so you can compare without guessing. Longer decision path: <a href="/blog/wix-vs-squarespace-vs-managed-website-contractors">Wix vs Squarespace vs a managed website</a>.</p>`;

const HIDDEN = `<p>Ongoing SEO is separate—sites launch with a clear structure Google can read, but monthly SEO work is quoted on its own (see <a href="/seo-services">SEO services</a>). Google’s free <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" rel="noopener noreferrer" target="_blank">SEO starter guide</a> is a useful baseline for titles and crawl basics; nobody outside Google can promise a ranking.</p><p>Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates. More on that delay: <a href="/blog/missed-call-text-delayed-10dlc">why missed-call texts are delayed</a>.</p>`;

const COMPARE_QUOTES = `<p>When you compare a DIY builder, a freelancer, an agency, and a managed plan, line up the same columns:</p><ul><li>What pages are included (and who writes them)</li><li>Hosting, SSL, and who renews the domain</li><li>How edits are requested and billed after launch</li><li>Whether review requests or missed-call follow-up are included or extra</li><li>What happens to the files if you stop paying</li><li>Whether you can see a design direction before you pay</li></ul><p>Skip forum “average cost” threads that invent national ranges. Use live plan pages and written scopes. Mobile still matters either way—Google documents <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" rel="noopener noreferrer" target="_blank">mobile-first indexing</a> and <a href="https://developers.google.com/search/docs/appearance/page-experience" rel="noopener noreferrer" target="_blank">page experience</a>; a cheap site that hides the phone number still loses calls.</p><p>Ask every vendor for a one-page scope: page list, timeline, who writes copy, who supplies photos, and cancel/exit terms. Vague “we’ll figure it out” answers become change orders. Monthly vs ownership models: <a href="/blog/monthly-website-vs-own-it">Monthly Website vs Own It</a>. Freelancer vs agency vs plan: <a href="/blog/freelancer-vs-agency-vs-subscription-website">decision guide</a>.</p>`;

const PREVIEW_PROCESS = `<p>Cost is easier to judge when you can see the homepage before you commit. With Kinexis, every plan starts with a free homepage preview in <strong>2 business days</strong>—no card, no obligation. You review the direction, request changes, then pick Website, Lead System, Plus, or Own It.</p><p>After you approve the preview and send the content we need, the full site typically launches in <strong>5 business days</strong> (confirmed in writing). That timeline is about finishing pages, connecting the domain, and going live—not a promise about search rankings.</p><p>If you are comparing freelancers or agencies, ask whether you can see a concept before a large deposit. Preview-first reduces the chance you pay for a direction you dislike.</p>`;

const WHO_FITS = `<p><strong>Website ($97/mo)</strong> fits when you need a professional site with hosting and light edits, and you will handle most follow-up yourself.</p><p><strong>Lead System ($197/mo)</strong> fits when missed calls and reviews matter: optional text-back ($1/mo second number if used + carrier rates), Google review requests after jobs, call tracking, and a 60-day lead guarantee.</p><p><strong>Plus ($297/mo)</strong> fits when you need English and Spanish pages and bilingual follow-up options, with the same lead-guarantee class as Lead System.</p><p><strong>Own It ($1,497 once)</strong> fits when you want site files from launch day, will skip the monthly plan and lead guarantee, and accept 12 months of hosting/edits included with optional Site Care at $39/mo afterward.</p><p>None of those options bundle ongoing SEO into the four website plans—that work is quoted separately on <a href="/seo-services">SEO services</a>.</p>`;

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
    lead: `If you are pricing ${subject} website, start with numbers you can verify—not a forum “average.” With Kinexis, Website is $97/mo, Lead System $197/mo, Plus $297/mo (English + Spanish), or Own It $1,497 once. Every option starts with a free homepage preview in 2 business days, no card.`,
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
        h2: "How to Compare Quotes Without Guessing",
        html: COMPARE_QUOTES,
      },
      {
        h2: "See the Homepage Before You Pay",
        html: PREVIEW_PROCESS,
      },
      {
        h2: `What Drives Cost on ${spec.siteLabel} Site`,
        html: spec.drivesCostHtml,
      },
      {
        h2: "Which Plan Fits Which Situation",
        html: WHO_FITS,
      },
      {
        h2: "Hidden Costs to Plan For",
        html: HIDDEN,
      },
      {
        h2: `What You’re Paying For on ${spec.siteLabel} Site`,
        html: `${spec.payingForHtml}<p>See <a href="${industryPath}">${spec.designAnchor}</a> and <a href="${pagesPath}">the pages checklist</a>. Page structure matters as much as price—thin doorways and vague service dumps waste money even when the quote looks low.</p><p><a href="/contact">Get a free homepage preview</a> before you choose a plan—2 business days, no card, no obligation.</p>`,
      },
      {
        h2: "Website Cost for Other Trades",
        html: `${otherTradesHtml(spec.slug)}<p>Same four published plans; trade differences show up in which service pages you need and how specific the copy gets—not a secret “plumbing tax.”</p>`,
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
      "<p>Plumbing is where urgency and planning collide. Building separate paths for leaks, drains, and water heaters takes more writing and photo work than a single “services” blob—and that is usually time well spent. Finished-bath photos help quote jobs. Honest after-hours copy keeps emergency callers from feeling baited when nobody answers at 2 a.m.</p><p>What changes the plan is page count, bilingual copy on Plus, and follow-up tools on Lead System—not a secret “plumbing tax” on top of the published prices.</p>",
    payingForHtml:
      "<p>You’re paying for pages that sound like a plumber wrote them for leaks, drains, and heaters—not a generic template with the business name swapped in.</p>",
  },
  {
    slug: "hvac",
    noun: "HVAC",
    article: "an",
    siteLabel: "an HVAC",
    designAnchor: "HVAC website design",
    drivesCostHtml:
      "<p>HVAC cost shows up in the forks: no-cool repair versus replacement versus maintenance. Shoulder season needs those maintenance pages visible when the emergency rush dies down. Financing lines belong only when you really offer financing. In peak heat, missed-call follow-up usually pays for itself faster than another stock hero image of a smiling family.</p>",
    payingForHtml:
      "<p>You’re paying for clear paths for repair, replacement, and maintenance—not a generic template with the business name swapped in.</p>",
  },
  {
    slug: "electrical",
    noun: "electrician",
    article: "an",
    siteLabel: "an Electrician",
    designAnchor: "electrician website design",
    drivesCostHtml:
      "<p>Electrician sites spend their budget on trust and scope. License cues near the phone, separate pages for panels, EV chargers, and troubleshooting, and enough clarity that a homeowner comparing bids knows what they are asking for. Animated fluff does not move that decision.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around panels, EV chargers, and troubleshooting—not a generic template with the business name swapped in.</p>",
  },
  {
    slug: "roofing",
    noun: "roofing",
    article: "a",
    siteLabel: "a Roofing",
    designAnchor: "roofing website design",
    drivesCostHtml:
      "<p>Roofing quotes get expensive in time when storm documentation, insurance process language, and before/after galleries are done carefully. Repair and full replacement should not share one vague page. After hail, the inspection form has to work on a phone with wet fingers—short fields, obvious submit, no nonsense.</p>",
    payingForHtml:
      "<p>You’re paying for pages built around repairs, replacements, and inspections—not a generic template with the business name swapped in.</p>",
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
