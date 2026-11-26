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
  /** Trade-only buyer decision section heading. */
  buyerDecisionH2: string;
  /** Trade-only buyer decision body HTML. */
  buyerDecisionHtml: string;
  /** FAQs that only make sense for this trade. */
  extraFaqs: { q: string; a: string }[];
  /**
   * Optional pricing-section H2. Defaults to "Kinexis Prices for Business Websites"
   * so unset trades render identically to today’s shared heading.
   */
  pricingH2?: string;
  /**
   * Optional HTML after the shared plan table (no second table). Omit for
   * byte-identical output on trades that do not set it.
   */
  pricingNoteHtml?: string;
};

/** Shared plan facts — keep short so trade-unique copy dominates similarity. */
const PLAN_TABLE = `<p>Verified Kinexis options on <a href="/pricing">/pricing</a>:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>Professional site, hosting, SSL, up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day; 12 months hosting and small edits included</td></tr></tbody></table><p>Monthly: $0 down, month-to-month, cancel anytime, price locked 24 months from launch. 30-day money-back on every plan; 60-day lead guarantee on Lead System and Plus. <strong>Free homepage preview in 2 business days</strong>—no card. <a href="/blog/monthly-website-vs-own-it#cost-calculator">Monthly vs Own It cost calculator</a>.</p>`;

const TWENTY_FOUR_MONTH = `<p>Published rates × time (not forum averages):</p><table><thead><tr><th>Plan</th><th>Year 1</th><th>24 months</th><th>Notes</th></tr></thead><tbody><tr><td>Website</td><td>$1,164</td><td>$2,328</td><td>$0 down, price locked 24 months</td></tr><tr><td>Lead System</td><td>$2,364</td><td>$4,728</td><td>Includes 60-day lead guarantee</td></tr><tr><td>Plus</td><td>$3,564</td><td>$7,128</td><td>English + Spanish</td></tr><tr><td>Own It</td><td>$1,497</td><td>$1,497 + optional Site Care $39/mo in months 13–24 ($468) = $1,965</td><td>Domain renewal billed at cost</td></tr></tbody></table><p><em>Excludes tax if any. Text-back carrier rates and optional $1/mo second number are extra.</em></p>`;

function diySection(noun: string) {
  return `<p>A ${noun} quote should match how many real service pages and photos you need—not a generic five-page theme.</p><p>Page count, copy, photos, hosting, edits, and follow-up tools drive the gap—not a secret trade surcharge. Compare <a href="/pricing">/pricing</a> and <a href="/blog/wix-vs-squarespace-vs-managed-website-contractors">Wix vs Squarespace vs managed</a>.</p>`;
}

const HIDDEN = `<p>Not bundled in the four plans: ongoing <a href="/seo-services">SEO services</a>; optional custom copy or shoots; missed-call text-back (dedicated line; carrier approval ~10–15 days, not guaranteed). Lead System or Plus: second tracking number $1/mo if used + carrier rates. <a href="/blog/missed-call-text-delayed-10dlc">10DLC delays</a>.</p>`;

function compareQuotes(noun: string) {
  return `<p>Line up DIY, freelancer, agency, and managed quotes for a ${noun} site on the same columns: pages, hosting/SSL, edits, review/missed-call tools, file exit, and whether you see design before payment. <a href="/blog/freelancer-vs-agency-vs-subscription-website">Freelancer vs agency vs plan</a>.</p>`;
}

const PREVIEW_PROCESS = `<p>Free homepage preview in <strong>2 business days</strong>—no card. Full site typically <strong>5 business days</strong> after approval and content (written timeline—not a ranking promise).</p>`;

function whoFits(noun: string) {
  return `<p>Typical ${noun} fit: <strong>Website ($97/mo)</strong> if calls are caught; <strong>Lead System ($197/mo)</strong> for missed calls, reviews, tracking; <strong>Plus ($297/mo)</strong> for English+Spanish; <strong>Own It ($1,497)</strong> for file ownership (12 mo hosting/edits; optional Site Care $39/mo after). SEO quoted on <a href="/seo-services">SEO services</a>.</p>`;
}

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
  return `<p>Same four plans; trade differences are pages and proof:</p><ul>${links}</ul>`;
}

function withArticle(article: CostTradeSpec["article"], noun: string) {
  if (!article) return noun;
  return `${article} ${noun}`;
}

const SHARED_FAQS = [
  {
    q: "Is there a setup fee?",
    a: "No. Monthly plans are $0 down; Own It is $1,497 one-time. Free homepage preview—no card.",
  },
  {
    q: "Do I own the site on a monthly plan?",
    a: "Hosting continues while you subscribe. Buyout is a written $1,497 file purchase. Own It includes ownership at launch.",
  },
  {
    q: "Is SEO included in those prices?",
    a: "Sites ship with clear structure; ongoing SEO is quoted separately—not in the four plans.",
  },
];

export function buildCostPostBody(spec: CostTradeSpec): CostPostBody {
  const subject = withArticle(spec.article, spec.noun);
  const hiddenIndustryRoute = ["pool-care", "window-cleaning", "yard-care"].includes(spec.slug);
  const industryPath = `/industries/${spec.slug}`;
  const pagesPath = industryPagesPostPath(spec.slug);

  return {
    lead: `Pricing ${subject} website starts with trade-specific pages and proof—not a forum “average.” With Kinexis, Website is $97/mo, Lead System $197/mo, Plus $297/mo (English + Spanish), or Own It $1,497 once. Every option starts with a free homepage preview in 2 business days, no card. What changes the real cost for ${spec.noun} work is how you split urgency vs planned jobs, what photos you need, and whether missed-call follow-up matters on your busiest weeks.`,
    faqs: [
      {
        q: `How much is ${subject} website with Kinexis?`,
        a: "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions.",
      },
      ...spec.extraFaqs,
      ...SHARED_FAQS,
    ],
    sections: [
      {
        h2: `What Drives Cost on ${spec.siteLabel} Site`,
        html: spec.drivesCostHtml,
      },
      {
        h2: spec.buyerDecisionH2,
        html: spec.buyerDecisionHtml,
      },
      {
        h2: spec.pricingH2 ?? "Kinexis Prices for Business Websites",
        html: spec.pricingNoteHtml ? `${PLAN_TABLE}${spec.pricingNoteHtml}` : PLAN_TABLE,
      },
      {
        h2: "What It Costs Over 24 Months",
        html: TWENTY_FOUR_MONTH,
      },
      {
        h2: `What You’re Paying For on ${spec.siteLabel} Site`,
        html: `${spec.payingForHtml}<p>${hiddenIndustryRoute ? spec.designAnchor : `<a href="${industryPath}">${spec.designAnchor}</a>`}; <a href="${pagesPath}">pages checklist</a>. <a href="/contact">Free homepage preview</a>—2 business days, no card.</p>`,
      },
      {
        h2: "Which Plan Fits Which Situation",
        html: whoFits(spec.noun),
      },
      {
        h2: "DIY vs Freelancer vs Agency vs a Monthly Plan",
        html: diySection(spec.noun),
      },
      {
        h2: "How to Compare Quotes Without Guessing",
        html: compareQuotes(spec.noun),
      },
      {
        h2: "See the Homepage Before You Pay",
        html: PREVIEW_PROCESS,
      },
      {
        h2: "Hidden Costs to Plan For",
        html: HIDDEN,
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
    drivesCostHtml: `<p>Plumbing website cost climbs when you stop treating every job like the same “services” blob. A burst supply line at 11 p.m. needs a huge phone number, staffed-hours honesty, and a short path that does not bury the caller under tankless brand essays. A planned water-heater replacement needs photos of finished installs, the brands you actually stock, and a quiet estimate form. Writing both paths well takes evenings—or a managed plan that already owns the structure.</p><p>Separate pages for leaks, drains, and heaters are not a secret plumbing surcharge on top of <a href="/pricing">published prices</a>. They are page count, copy, and proof. Fake “24/7” badges cost you trust when nobody answers after midnight; honest after-hours language costs a little writing time and saves angry callbacks. Tankless pages only earn their keep when you name models you install and show real copper work, not stock loft kitchens.</p><p>On leak-heavy weeks, the calendar cost is missed calls. Lead System at $197/mo can add optional text-back ($1/mo second number if used + carrier rates; carrier approval usually 10–15 days and is not guaranteed) so a homeowner who rings while you are under a sink still gets a reply. Website at $97/mo skips that toolset; text-back there is a $97/mo add-on. Own It at $1,497 buys the files once and skips the 60-day lead guarantee that Lead System and Plus include.</p><p>What you should not pay for is a national “average plumber website” number from a forum thread. Stick to plan math you can verify, then decide how many urgency vs planned pages your crew can keep truthful. The page list lives in <a href="/blog/plumbing-website-pages">plumbing website pages</a>; price and plan fit live here and on <a href="/industries/plumbing">plumber website design</a>.</p>`,
    payingForHtml: `<p>You are paying for a homepage that leads with call or estimate, plus dedicated paths for leaks, clogged drains, and water heaters—tankless included when you sell it. Proof means licensed cues near the phone, finished-bath photos that look like your jobs, and after-hours copy that matches how you actually staff nights.</p><p>You are not paying for a mystery plumbing multiplier. Same four Kinexis plans as every other trade: Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497. The spend difference shows up in how specific those pages get and whether you need missed-call follow-up on flood days.</p>`,
    buyerDecisionH2: "When a leak caller and a heater shopper need different site paths",
    buyerDecisionHtml: `<p>Someone with water on the floor is not reading your about page. They need the number, a clear yes/no on whether you take after-hours work, and zero friction. Someone pricing a tankless swap has time for brands, install photos, and a short form: name, phone, heater type, city.</p><p>If those two land on one vague plumbing page, both hesitate. The leak caller hunts for “open now.” The heater shopper wonders if you even do tankless. Splitting the paths costs writing time once; mixing them costs calls every week.</p><ul><li>Emergency / leak pages: phone first, honest hours, no long brand essays</li><li>Heater estimate pages: brands you install, photo proof, short form</li><li>Drain pages: camera / hydro options only if you offer them</li></ul><p>If you lose callers while you are on a slab leak, Lead System text-back is the plan question—not a prettier hero image. Preview the homepage free in 2 business days (no card) via <a href="/contact">/contact</a> before you pick Website, Lead System, Plus, or Own It.</p>`,
    extraFaqs: [
      { q: "Should my plumber site say 24/7 if I only staff nights some weeks?", a: "No. Put the hours you actually answer. If after-hours is on-call or limited, say that near the phone. Fake 24/7 claims burn trust faster than a quieter, honest schedule." },
      { q: "Do I need a separate page for every tankless brand I install?", a: "Usually not. One water-heater page that names the brands you install and shows real jobs is enough. Skip brand pages for lines you do not stock or warrant." },
      { q: "When does Lead System text-back matter for plumbing?", a: "On leak and backup days when you miss calls under a sink. Lead System is $197/mo; optional text-back is $1/mo for a second number plus carrier rates. Carrier approval usually takes 10–15 days and is not guaranteed. Website and Own It can add text-back for $97/mo." }
    ],
  },
  {
    slug: "hvac",
    noun: "HVAC",
    article: "an",
    siteLabel: "an HVAC",
    designAnchor: "HVAC website design",
    drivesCostHtml: `<p>HVAC site cost is really season cost. In July a no-cool call wants the phone above the fold and a tech path that does not wander into SEER charts. In shoulder months the same company needs maintenance and filter pages visible, or the site goes quiet while competitors book tune-ups. Building those forks—repair, replace, maintain—takes copy and photo work beyond a single “HVAC services” dump.</p><p>Financing lines belong only when you really offer financing. Fake “as low as” banners create angry callbacks and wasted estimate trips. Replacement pages need system photos and a consult form; tune-up pages need a simple book-or-call path. None of that is an HVAC tax on top of Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497—it is page specificity.</p><p>Peak heat is when missed calls hurt most. Lead System and Plus include a 60-day lead guarantee and can run optional text-back ($1/mo second number if used + carrier rates; approval usually 10–15 days, not guaranteed). Website keeps the site cheaper if your office already catches every ring. Own It fits if you want the files at $1,497 and will handle follow-up yourself after the included year of hosting and small edits.</p><p>Skip invented national averages. Compare published plans on <a href="/pricing">/pricing</a>, then decide which seasonal pages you will keep honest. Architecture notes: <a href="/blog/hvac-website-pages">HVAC website pages</a>. Design context: <a href="/industries/hvac">HVAC website design</a>.</p>`,
    payingForHtml: `<p>You are paying for clear next steps for no-cool repair, full system replacement, and maintenance memberships—not a comfort brochure with a stock family on a couch. Real condenser and attic photos beat generic “cooling solutions” art.</p><p>You are also paying for honesty on financing and seasonal CTAs. If you do not finance, do not print as-low-as math. If you do, put the real partner language where replacement shoppers look, not as a homepage sticker over a repair path.</p>`,
    buyerDecisionH2: "No-cool, replace, or tune-up: which path should your HVAC site lead with?",
    buyerDecisionHtml: `<p>Peak heat callers are not shopping SEER. They want a tech today. Shoulder-season homeowners want a tune-up slot and a filter reminder. Replacement shoppers want a consult, not a panic CTA that sounds like a tow truck.</p><p>Lead with the job that is in season on the homepage, but keep the other two one tap away. Burying maintenance in July is fine; burying it in March leaves money on the table. Mixing all three into one paragraph makes every visitor work too hard.</p><ul><li>No-cool / no-heat: phone first, service-area clarity, no long financing essays</li><li>Replacement: consult form, real system photos, financing only if real</li><li>Tune-ups: short book path, membership language only if you sell it</li></ul><p>If peak season misses are the pain, weigh Lead System before another stock hero. Free homepage preview in 2 business days, no card: <a href="/contact">/contact</a>.</p>`,
    extraFaqs: [
      { q: "Should my HVAC homepage lead with maintenance in July?", a: "Usually no. Lead with no-cool repair and the phone in peak heat. Keep tune-up and membership links visible but secondary until shoulder season, then flip the emphasis." },
      { q: "Can I put “systems as low as” prices on the site if I do not finance?", a: "Do not. As-low-as lines without a real financing path create angry callbacks. If you finance, name the program honestly on replacement pages—not as a fake floor price on every service." },
      { q: "Do repair and replacement need separate pages?", a: "Yes when you sell both. A no-cool visitor and a full-system shopper need different next steps. One vague HVAC page makes both groups hesitate and muddies what you are actually quoting." }
    ],
  },
  {
    slug: "electrical",
    noun: "electrician",
    article: "an",
    siteLabel: "an Electrician",
    designAnchor: "electrician website design",
    drivesCostHtml: `<p>Electrician website cost sits in trust and scope splits. Homeowners comparing panel upgrades want your license near the phone—not three scrolls under a stock hard-hat photo. Troubleshooting callers want “call now” when something smells like burnt plastic. EV charger shoppers want a site-check path and a clear note on whether you handle permits. Those are different pages, different photos, different forms.</p><p>Building an EV page you do not offer is wasted spend. Skipping a panel page when half your revenue is service upgrades is worse. None of that changes the published plan ladder—Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497—but it does change how long copy and proof take. License badges, insurance cues, and job photos are the expensive part in calendar time, not a mystery “electrical multiplier.”</p><p>Missed-call text-back helps when you are in an attic and a breaker-trip caller hangs up. On Lead System or Plus it is optional at $1/mo for a second number plus carrier rates (approval usually 10–15 days; not guaranteed). On Website or Own It, text-back is a $97/mo add-on. Monthly plans are $0 down, month-to-month, with a 30-day money-back guarantee; Lead System and Plus also carry the 60-day lead guarantee.</p><p>Verify numbers on <a href="/pricing">/pricing</a>. Page architecture: <a href="/blog/electrician-website-pages">electrician website pages</a>. Live layout notes: <a href="/industries/electrical">electrician website design</a>.</p>`,
    payingForHtml: `<p>You are paying for pages that separate troubleshooting, panel upgrades, and EV chargers when you sell them—plus license and insurance cues close to the call button. Clear next steps beat animated wiring diagrams.</p><p>Proof is panel photos, neat wire management, and charger installs you actually completed. Stock loft kitchens with USB outlets do not move a homeowner who is comparing licensed bids.</p>`,
    buyerDecisionH2: "License near the phone: why electrical buyers stall without it",
    buyerDecisionHtml: `<p>Electrical shoppers are buying risk reduction as much as labor. If the license is buried, many will bounce before they read your panel upgrade pitch. Put credential cues beside the phone and on the contact block—not only on an about page nobody opens during a power issue.</p><p>Then split the jobs. A tripped-breaker panic path should not open with a long EV brochure. An EV site-check form should not scream emergency. Upgrade quotes need room for amp service questions; troubleshooting needs a call CTA first.</p><ul><li>Show license / insurance near phone and footer NAP</li><li>Troubleshooting: call-first, short symptom form optional</li><li>Panel / EV: consult or site-check fields, permit language only if accurate</li></ul><p>Choose Website if you catch every call in-office; Lead System if missed rings during panel pulls are common. Preview first: <a href="/contact">free homepage in 2 business days</a>, no card.</p>`,
    extraFaqs: [
      { q: "Where should my electrician license appear on the site?", a: "Near the phone number on the homepage and contact areas—not only on About. Shoppers comparing bids look for credentials before they read long service copy." },
      { q: "Do I need an EV charger page if I only do panels and troubleshooting?", a: "No. Skip EV pages you cannot fulfill. Add the page when you offer installs and can speak to site checks and permits honestly." },
      { q: "Should troubleshooting and panel upgrades share one electrical page?", a: "Better as separate paths. Panic troubleshooting wants a call. Panel and service upgrades want a consult form and clearer scope questions. One blob makes both leads messier." }
    ],
  },
  {
    slug: "roofing",
    noun: "roofing",
    article: "a",
    siteLabel: "a Roofing",
    designAnchor: "roofing website design",
    drivesCostHtml: `<p>Roofing website cost shows up after storms. You need repair vs full replacement paths, inspection booking that works on a wet phone, and insurance-process language that explains how you document damage without promising claim outcomes you do not control. That writing and photo work is heavier than a generic contractor template—and still not a hidden roofing surcharge on Kinexis plan prices.</p><p>Hail weeks flood you with photo uploads and short forms: name, phone, address area, optional roof photos if safe. Long brochure pages about shingle brands waste those minutes. Before/after galleries and storm-doc samples take shooting time; they also cut back-and-forth. Keep claim language careful—help with paperwork, not guaranteed payouts.</p><p>Published plans stay Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497—$0 down on monthly, month-to-month, 30-day money-back on every plan. Lead System and Plus add the 60-day lead guarantee and optional text-back ($1/mo second number + carrier rates; carrier approval usually 10–15 days, not guaranteed). After a hail cell, missed-call follow-up often matters more than another drone hero still.</p><p>Plan details: <a href="/pricing">/pricing</a>. Page checklist: <a href="/blog/roofing-website-pages">roofing website pages</a>. Hub: <a href="/industries/roofing">roofing website design</a>.</p>`,
    payingForHtml: `<p>You are paying for repair, replacement, and inspection pages that behave differently—plus storm documentation that looks like your jobs, not stock blue-sky roofs. The inspection form should submit with wet fingers: big fields, obvious button, photo upload optional.</p><p>You are paying for clear insurance-process copy without claim promises. Homeowners want to know how you inspect and document; they do not need a guarantee you cannot keep.</p>`,
    buyerDecisionH2: "After hail: repair, replace, or book an inspection first?",
    buyerDecisionHtml: `<p>Post-storm visitors are not browsing shingle color chips. They want an inspection window and a crew that knows how documentation works with their insurer. Active leaks still deserve the phone over any form.</p><p>Repair and full replacement should not share one vague “roofing services” page. A patch lead and a tear-off lead need different photos, different timelines, and different next steps. Put the inspection CTA where hail searchers land; keep brand essays secondary.</p><ul><li>Active leak: phone first</li><li>Hail / storm: short inspection form that works on mobile</li><li>Planned replacement: gallery + consult, not emergency tone</li></ul><p>If storm weeks bury your office line, Lead System text-back is the plan question. See a homepage direction free in 2 business days at <a href="/contact">/contact</a>—no card.</p>`,
    pricingH2: "Roofing website design pricing: the four Kinexis options",
    pricingNoteHtml: `<p>These are website design plan prices for a roofing contractor site—not a quote for a roofing job, inspection, or insurance claim. Storm-week missed calls are when Lead System’s optional text-back matters most: a second tracking number is $1/mo if used, plus carrier rates; carrier approval usually takes 10–15 days and is not guaranteed. Website at $97/mo fits a shop whose office answers the phone; Own It at $1,497 is a one-time purchase and does not include the 60-day lead guarantee, which applies only on Lead System and Plus. Every plan includes a 30-day money-back guarantee.</p>`,
    extraFaqs: [
      { q: "Can my roofing site promise insurance will pay for a full replacement?", a: "No. Explain how you document damage and work with adjusters, but do not promise claim outcomes. That language creates liability and angry homeowners when carriers disagree." },
      { q: "What fields belong on a hail inspection form?", a: "Keep it short for wet-finger mobile use: name, phone, rough address or area, and optional photos if safe. Save long material questionnaires for after you confirm the appointment." },
      { q: "Should roof repair and full replacement share one page?", a: "Prefer separate paths. Repair callers and tear-off shoppers need different proof and timelines. One vague page makes both groups guess what you actually want them to do next." }
    ],
  },
  {
    slug: "garage-doors",
    noun: "garage door company",
    article: "a",
    siteLabel: "a Garage Door",
    designAnchor: "garage door website design",
    drivesCostHtml: `<p>Garage door website cost splits between torsion-spring emergencies and new-door shoppers. A door stuck open at 7 a.m. needs same-day repair language, a giant phone number, and opener vs spring clarity. A remodel shopper measuring for an insulated double door needs brands you are authorized to sell, material options, and a measure appointment—not a panic CTA.</p><p>One “garage services” dump makes both visitors work. Writing spring, opener, and new-door pages takes time; listing brands you cannot sell wastes trust. Same-day repair claims only belong when your board actually supports them. That specificity is the cost driver beyond the shared plan table—not a garage-door tax on Website $97/mo or Lead System $197/mo.</p><p>Lead System and Plus ($197/$297) help when you miss rings while replacing a broken spring; optional text-back is $1/mo second number + carrier rates (10–15 day approval, not guaranteed). Website ($97/mo) or Own It ($1,497) fit quieter shops that catch calls in-house. All monthly plans are $0 down, month-to-month, with 30-day money-back; Lead System/Plus add the 60-day lead guarantee.</p><p>See <a href="/pricing">/pricing</a>, <a href="/blog/garage-door-website-pages">garage door website pages</a>, and <a href="/industries/garage-doors">garage door website design</a>.</p>`,
    payingForHtml: `<p>You are paying for separate paths for broken springs, opener failures, and new doors—plus photos of real installs, not only glossy catalog shots. Brand logos belong only for lines you are authorized to sell and service.</p><p>Measure forms for new doors (single/double, material if known, city) and call-first repair pages are the product. Animated garage fluff is not.</p>`,
    buyerDecisionH2: "Stuck door at dawn vs shopping a new insulated door",
    buyerDecisionHtml: `<p>A torsion spring that just snapped is not the same buyer as someone pricing a quiet insulated door for a garage conversion. The first person needs same-day repair honesty and a phone. The second needs a measure visit and brand options you can actually order.</p><p>If your site mixes them, the emergency caller scrolls past opener upsells while the shopper feels rushed by “call now” language. Split the CTAs. Only promise same-day when your trucks can back it up.</p><ul><li>Spring / cable emergencies: phone, same-day only if true</li><li>Opener issues: diagnose vs replace paths if you offer both</li><li>New doors: measure form, authorized brands only</li></ul><p>Preview the homepage free in 2 business days—no card—at <a href="/contact">/contact</a>, then pick the plan that matches how often you miss repair calls.</p>`,
    extraFaqs: [
      { q: "Should I advertise same-day garage door spring repair if I only cover certain ZIPs?", a: "Say same-day only where you can keep the promise. List service area clearly. Overpromising same-day outside your route creates no-shows and bad reviews." },
      { q: "Can I list every garage door brand on my site?", a: "List only brands you are authorized to sell and service. Catalog logos you cannot order waste trust when the measure appointment turns into “we’ll see.”" },
      { q: "Do spring repair and new door sales need different pages?", a: "Yes. Broken-spring callers want the phone. New-door shoppers want a measure form and product proof. One generic garage page makes both leads messier." }
    ],
  },
  {
    slug: "landscaping",
    noun: "landscaping",
    article: "a",
    siteLabel: "a Landscaping",
    designAnchor: "landscaping website design",
    drivesCostHtml: `<p>Landscaping website cost tracks two businesses that often share one truck: recurring maintenance routes and design-build projects. A weekly mow customer wants ZIP, lot size cues, and a simple start-service path. A patio or planting redesign buyer wants portfolio photos, a consult, and patience for a longer sales cycle. Forcing both into one “landscaping services” page costs you qualified leads even when the hosting invoice looks fine.</p><p>Seasonal packages, drainage notes, and hardscape galleries take photo and copy time. That is the real spend beyond Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497—not a landscaping surcharge. Recurring route cash flow and project deposits behave differently; your CTAs should too.</p><p>Lead System helps when you miss calls between properties; optional text-back is $1/mo second number + carrier rates (approval usually 10–15 days, not guaranteed). Website fits if dispatch already catches rings. Own It fits owners who want files at $1,497 and will run follow-up themselves. Monthly plans stay $0 down, month-to-month, 30-day money-back; Lead System/Plus include the 60-day lead guarantee.</p><p>Compare plans on <a href="/pricing">/pricing</a>. Page map: <a href="/blog/landscaping-website-pages">landscaping website pages</a>. Hub: <a href="/industries/landscaping">landscaping website design</a>.</p>`,
    payingForHtml: `<p>You are paying for maintenance-route signup pages and project pages that do not confuse a mow lead with a patio consult. Real yard photos—before muddy beds and after—beat stock topiary.</p><p>Clear offers (weekly/biweekly mow, cleanup, design consult) and ZIP fields for route planning are the product. Vague “outdoor living solutions” copy is not.</p>`,
    buyerDecisionH2: "Mow route signup vs patio design-build: which lead is your site built for?",
    buyerDecisionHtml: `<p>Route customers want a fast “start service” path and honest geography. Design-build buyers want galleries, process steps, and a consult—not a same-day panic button. If your revenue is mostly mow routes, lead with that. If hardscape carries the margin, lead with projects and keep maintenance secondary but findable.</p><p>Mixing patio dreams into a mow form—or forcing project shoppers through a weekly-frequency dropdown—creates junk leads. Separate the next steps even if the crew overlaps.</p><ul><li>Maintenance: ZIP, frequency, lot notes</li><li>Projects: photo proof, consult request, rough scope</li><li>Seasonal cleanups: short offer pages when you run them</li></ul><p>Free homepage preview in 2 business days, no card: <a href="/contact">/contact</a>.</p>`,
    extraFaqs: [
      { q: "Should my landscaping homepage push patio builds if most revenue is mow routes?", a: "Lead with what you actually book most weeks. Keep patio/design-build visible, but do not bury route signup under a project brochure if maintenance pays the bills." },
      { q: "Do recurring maintenance and one-off landscaping projects need different forms?", a: "Yes. Route signups need ZIP and frequency. Project consults need scope and photos. One shared form creates leads you cannot schedule cleanly." },
      { q: "Is a design-build gallery worth the photo time on a landscaping site?", a: "If you sell hardscape or planting designs, yes—real yards beat stock. If you only run mow routes, put time into clear service lists and ZIP signup instead." }
    ],
  },
  {
    slug: "pressure-washing",
    noun: "pressure washing",
    article: "a",
    siteLabel: "a Pressure Washing",
    designAnchor: "pressure washing website design",
    drivesCostHtml: `<p>Pressure washing website cost is surface specificity. House wash, concrete, driveways, fences, and roof algae are different methods, different risks, and different quote questions. Soft wash on painted siding is not the same as blasting a sidewalk—and homeowners know when your copy pretends otherwise. Listing surfaces you actually clean, with honest soft-wash notes, takes writing and photo work beyond a single “we wash everything” line.</p><p>Before/after proof is the spend that pays back. Pair shots of mildew on vinyl, oil on concrete, and black streaks on a roof cut the texting loop. That gallery work sits on top of the same published plans—Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497—not a pressure-washing premium. Quote forms that capture surface type and ZIP reduce drive-by estimates that never book.</p><p>Lead System helps on Saturdays when you are on a roof soft wash and miss a driveway lead; optional text-back is $1/mo second number + carrier rates (10–15 days approval, not guaranteed). Website or Own It fit if phone coverage is already solid. Monthly plans: $0 down, month-to-month, 30-day money-back; Lead System/Plus include 60-day lead guarantee.</p><p>Details: <a href="/pricing">/pricing</a>, <a href="/blog/pressure-washing-website-pages">pressure washing website pages</a>, <a href="/industries/pressure-washing">pressure washing website design</a>.</p>`,
    payingForHtml: `<p>You are paying for surface lists that match the truck—house, concrete, roof algae, fences—plus soft-wash honesty where high pressure would damage paint or shingles. Before/after pairs are the proof buyers skim on phones.</p><p>Short quote paths per surface beat one mega-form. Roof algae pages should not pretend every job is a blast-and-go driveway wash.</p>`,
    buyerDecisionH2: "House wash, concrete, or roof algae: why one quote form fails",
    buyerDecisionHtml: `<p>A homeowner with green asphalt shingles is not the same job as oil spots on a driveway. Soft wash vs high pressure is a safety and warranty issue, not marketing fluff. If your form only says “pressure washing quote,” you get mystery leads and awkward site visits.</p><p>Put surface choices up front. Show before/after proof for each major surface you sell. Be blunt when roof or painted siding needs soft wash—overpromising blast pressure is how reviews go sideways.</p><ul><li>House / siding: soft-wash notes when needed</li><li>Concrete / driveways: stain expectations, not miracle claims</li><li>Roof algae: method honesty, safety limits</li></ul><p>See a free homepage preview in 2 business days at <a href="/contact">/contact</a>—no card—then choose Website, Lead System, Plus, or Own It on <a href="/pricing">/pricing</a>.</p>`,
    extraFaqs: [
      { q: "Should my pressure washing site claim high pressure works on every surface?", a: "No. Call out soft wash for siding or roofs when that is the safe method. Pretending every job is a blast creates damage risk and bad reviews." },
      { q: "Do I need separate pages for house wash and concrete?", a: "Helpful when both are major revenue. Different surfaces need different proof and quote questions. At minimum, make surface type a required field on the quote form." },
      { q: "Are before/after photos worth it for pressure washing websites?", a: "Yes for the surfaces you sell most. Phone shoppers decide fast from mildew and oil-stain pairs. Stock “clean driveway” art does not replace your jobs." }
    ],
  },
  {
    slug: "painting",
    noun: "painting",
    article: "a",
    siteLabel: "a Painting",
    designAnchor: "painting website design",
    drivesCostHtml: `<p>Painting website cost follows interior rooms, exterior siding seasons, and cabinet refinishing—three sales motions that hate sharing one vague page. Exterior work waits on weather and prep expectations (scrape, caulk, prime). Cabinets need drawer and door close-ups. Interiors need room counts without a twenty-field form. Writing those paths and shooting real rooms is the calendar cost beyond the shared plan prices.</p><p>Photo-based estimates save walkthroughs when you want them; they also need clear upload prompts and honest limits (“photos help; final price after we see the walls”). Fake whole-house floor prices create tire-kickers. None of that adds a painting surcharge to Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497—it adds pages and proof.</p><p>Lead System helps when you are on a ladder and miss a cabinet lead; optional text-back $1/mo second number + carrier rates (approval usually 10–15 days, not guaranteed). Website fits office-covered phones. Own It at $1,497 fits owners who want files and will skip the Lead System/Plus 60-day lead guarantee. Monthly plans remain $0 down, month-to-month, 30-day money-back.</p><p>See <a href="/pricing">/pricing</a>, <a href="/blog/painting-website-pages">painting website pages</a>, and <a href="/industries/painting">painting website design</a>.</p>`,
    payingForHtml: `<p>You are paying for interior, exterior, and cabinet paths that set prep expectations and show real rooms—not stock white sofas. Exterior pages should mention season and surface; cabinet pages should show hinges and edges, not only lifestyle kitchens.</p><p>Estimate forms that capture rooms/surfaces and optional photos are the product. Miracle whole-house prices without a visit are not.</p>`,
    buyerDecisionH2: "Cabinet refinishing vs whole-house paint: different proof, different form",
    buyerDecisionHtml: `<p>A homeowner refreshing oak cabinets is not pricing a full exterior. Cabinets need detail photos and a scope that mentions doors, drawers, and finish system. Whole-house or multi-room interiors need room counts and access notes. Exterior needs weather windows and prep honesty.</p><p>If everything dumps into “painting services,” you get leads that expect a cabinet price for a three-story exterior. Split the CTAs. Invite photo estimates where you use them, and say when a walkthrough is still required.</p><ul><li>Interior: rooms/surfaces, optional photos</li><li>Exterior: siding type, season notes, prep expectations</li><li>Cabinets: close-up proof, door/drawer counts</li></ul><p>Free homepage preview in 2 business days, no card: <a href="/contact">/contact</a>.</p>`,
    extraFaqs: [
      { q: "Can homeowners get a final paint price from photos alone?", a: "Photos help triage and rough ranges. Say clearly when a walkthrough is still required for final pricing—especially exterior prep and cabinet condition." },
      { q: "Should exterior painting pages mention season and prep?", a: "Yes. Weather windows and scrape/prime expectations prevent “why aren’t you here tomorrow” calls. Honesty here saves estimate visits that were never going to book." },
      { q: "Do cabinets need their own page on a painting website?", a: "If you sell cabinet refinishing, yes. The proof and scope differ from wall paint. Mixing them into a whole-house page creates mismatched leads." }
    ],
  },
  {
    slug: "remodeling",
    noun: "remodeling",
    article: "a",
    siteLabel: "a Remodeling",
    designAnchor: "remodeling website design",
    drivesCostHtml: `<p>Remodeling website cost is a long sales cycle tax on content, not a special plan rate. Kitchen and bath shoppers want finished rooms, process timelines, and a consult—not a red “CALL NOW” sticker meant for emergency trades. Permits, selections, and change-order language need calm clarity. Fake floor prices (“kitchens from $X”) attract the wrong bids and burn estimator time.</p><p>Portfolio photography, project pages, and a consult form that does not demand a number on first click take real effort. That sits on the same Kinexis ladder—Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497—with $0 down on monthly plans, month-to-month billing, and 30-day money-back. Lead System/Plus add the 60-day lead guarantee; text-back stays optional ($1/mo second number + carrier rates on those plans; $97/mo add-on on Website/Own It; carrier approval usually 10–15 days, not guaranteed).</p><p>Repair-level handyman work and full gut remodels should not share one CTA. If you do both, separate them so a faucet leak does not enter your kitchen design pipeline. The cost is editorial discipline.</p><p>Plans: <a href="/pricing">/pricing</a>. Pages: <a href="/blog/remodeling-website-pages">remodeling website pages</a>. Hub: <a href="/industries/remodeling">remodeling website design</a>.</p>`,
    payingForHtml: `<p>You are paying for kitchen and bath project pages, process steps (consult → selections → build), and finished-room proof above the fold. Permit and change-order language that matches how you contract is part of the product.</p><p>You are not paying for invented “starting at” kitchen prices. A consult request beats a fake floor number that collapses on the first site visit.</p>`,
    buyerDecisionH2: "Why remodeling sites should ask for a consult before a number",
    buyerDecisionHtml: `<p>Kitchen and bath buyers are months into Pinterest boards. A hard “instant quote” form that demands a budget on first click either scares them off or collects fantasy numbers. Ask for a consult. Show finished rooms. Explain when permits apply without turning the homepage into a legal memo.</p><p>Change orders happen; your site can say selections and unforeseen conditions may adjust price without sounding slippery. What you should not do is advertise a floor price that only exists for a kitchen that never matches the lead’s house.</p><ul><li>Lead with portfolio + consult CTA</li><li>Separate minor repair work if you still offer it</li><li>Skip fake “kitchens from” banners</li></ul><p>Preview a homepage free in 2 business days at <a href="/contact">/contact</a>—no card—then choose a plan on <a href="/pricing">/pricing</a>.</p>`,
    extraFaqs: [
      { q: "Should my remodeling site show “kitchens starting at” prices?", a: "Avoid fake floor prices. Ranges without scope create angry first meetings. Invite a consult and show finished projects instead of a number that will not survive selections." },
      { q: "How should a remodeling website talk about change orders?", a: "Plainly: selections and hidden conditions can change price, and you document changes in writing. Skip scare tactics and skip pretending every job is a fixed sticker." },
      { q: "Do permits belong on the remodeling homepage?", a: "A short honest note that permitted work follows local rules is enough up top. Save deeper permit detail for process or FAQ pages so the homepage stays about finished rooms and the consult." }
    ],
  },
  {
    slug: "pool-care",
    noun: "pool service",
    article: "a",
    siteLabel: "a Pool Service",
    designAnchor: "pool service website design",
    drivesCostHtml: `<p>Pool service website cost splits between route memberships and repair panic. A green-pool homeowner wants a phone path today. A clean-pool owner wants ZIP, service day, and a simple signup—not a ten-page chemistry brochure. Seasonal open and close offers need their own short landing moments in spring and fall. Writing those forks is the work beyond the shared plan table.</p><p>Equipment repair (pumps, filters, heaters) deserves pages when you sell it; stuffing repair into a membership PDF loses emergency callers. Chemical plan details belong after someone understands how to start service. Plans stay Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497—$0 down monthly, month-to-month, 30-day money-back; Lead System/Plus include 60-day lead guarantee and optional text-back ($1/mo second number + carrier rates; approval usually 10–15 days, not guaranteed).</p><p>Green-pool weeks are when missed calls sting. Text-back on Lead System/Plus—or the $97/mo add-on on Website/Own It—matters more than another stock turquoise hero.</p><p>See <a href="/pricing">/pricing</a>, <a href="/blog/pool-service-website-pages">pool service website pages</a>, and pool service website design.</p>`,
    payingForHtml: `<p>You are paying for a route signup that asks ZIP and preferred day, plus a repair/green-pool path that leads with the phone. Seasonal open/close offers should be easy to find when those months hit.</p><p>Membership brochures alone are not enough if algae emergencies are how many first jobs arrive. Equipment brands you service belong on repair pages—not as decoration on every screen.</p>`,
    buyerDecisionH2: "Green pool today vs weekly route membership: two different phone paths",
    buyerDecisionHtml: `<p>A swamp-green pool is a panic call. A sparkling pool shopping for a route is a signup. If your site only pushes membership PDFs, the green-pool owner leaves. If it only screams emergency, the route shopper feels oversold.</p><p>Put both paths on the homepage in season. Spring open and fall close can take short offer blocks without burying weekly care. Repair pages should say which pumps and filters you work on when that is part of the business.</p><ul><li>Green / repair: phone first, “swimmable?” optional on forms</li><li>Route signup: ZIP, day preference, chemical plan later</li><li>Open/close: seasonal CTAs, not year-round noise</li></ul><p>Free homepage preview in 2 business days, no card: <a href="/contact">/contact</a>.</p>`,
    extraFaqs: [
      { q: "Should a green-pool emergency use the same form as weekly pool route signup?", a: "No. Green pools need a phone-first path. Route signup needs ZIP and day. Mixing them creates slow responses for algae emergencies and messy dispatch for memberships." },
      { q: "Do pool opening and closing need their own site offers?", a: "Yes in season. Short open/close paths in spring and fall convert better than burying those jobs inside a generic membership page all year." },
      { q: "Where do equipment repairs fit on a pool service website?", a: "On their own repair pages if you fix pumps, filters, or heaters. Do not hide repair behind a route brochure—panic callers will not dig for it." }
    ],
  },
  {
    slug: "window-cleaning",
    noun: "window cleaning",
    article: "a",
    siteLabel: "a Window Cleaning",
    designAnchor: "window cleaning website design",
    drivesCostHtml: `<p>Window cleaning website cost turns on residential recurring routes versus storefront work. Homeowners want pane counts, stories, and frequency (one-time vs monthly). Storefront managers want early open-hour windows, side-door access notes, and invoices that match a business name. One “windows cleaned cheap” page frustrates both and creates no-show quotes.</p><p>Forms that capture pane count or rough window totals, stories, and frequency cut phone tag. Commercial pages should state open-hour constraints you can keep—before-open only, weekend, etc. That writing and photo proof (streak-free close-ups, real storefronts) sit on Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497 without a special window-cleaning surcharge.</p><p>Lead System helps when you are on a ladder and miss a HOA route lead; optional text-back is $1/mo second number + carrier rates (approval usually 10–15 days, not guaranteed). Website/Own It can add text-back at $97/mo. Monthly plans: $0 down, month-to-month, 30-day money-back; Lead System/Plus include 60-day lead guarantee.</p><p>Compare on <a href="/pricing">/pricing</a>. Pages: <a href="/blog/window-cleaning-website-pages">window cleaning website pages</a>. Hub: window cleaning website design.</p>`,
    payingForHtml: `<p>You are paying for residential and commercial paths with honest scheduling constraints, plus quote fields for pane count or window totals and frequency. Real glass photos beat stock sparkle overlays.</p><p>Recurring route language and storefront open-hour notes are the product. Vague “crystal clear views” copy is not.</p>`,
    buyerDecisionH2: "HOA recurring glass vs storefront open-hour cleaning",
    buyerDecisionHtml: `<p>A homeowner booking every other month is not a cafe manager who needs glass done before the breakfast rush. Residential pages should ask frequency and rough pane counts. Commercial pages should state when you can work and what access you need.</p><p>If you only sell residential, do not advertise storefront capability. If commercial is the margin, lead with open-hour reliability and keep residential secondary but clear.</p><ul><li>Residential: pane/story/frequency fields</li><li>Storefront: open-hour constraints, access notes</li><li>Recurring routes: signup path separate from one-time spring cleans</li></ul><p>Preview free in 2 business days at <a href="/contact">/contact</a>—no card.</p>`,
    extraFaqs: [
      { q: "Why ask for pane count on a window cleaning quote form?", a: "Pane count or rough window totals plus stories help you price without a wasted visit. Frequency (one-time vs recurring) matters just as much for route planning." },
      { q: "What should a storefront window cleaning page say about hours?", a: "State the open-hour constraints you can keep—before open, after close, weekends. Vague “we work around you” promises create schedule fights with managers." },
      { q: "Should residential and commercial window cleaning share one page?", a: "Better as separate paths when you sell both. Homeowners and storefront managers need different fields and proof. One blob produces mismatched quotes." }
    ],
  },
  {
    slug: "yard-care",
    noun: "lawn care",
    article: "a",
    siteLabel: "a Lawn Care",
    designAnchor: "lawn care website design",
    drivesCostHtml: `<p>Lawn care website cost is route geography and dispatch honesty. If you only cover certain ZIPs on Tuesdays, say so. Pet-waste add-ons belong only when you really offer them—listing scoop service you do not run creates ugly first visits. Mow, trim, cleanup, and aeration (when seasonal) need clear lists so a homeowner is not guessing what “full service” means.</p><p>ZIP plus frequency fields on signup forms are cheap to build and expensive to skip; they stop you from promising a Thursday mow across town. That operational clarity is the cost driver beyond Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497. Photo proof of real lawns—edges, beds, bagged clippings—beats stock perfect turf.</p><p>Lead System helps between stops when a new route lead rings; optional text-back is $1/mo second number + carrier rates (10–15 day approval, not guaranteed). Website or Own It fit if someone already answers every call. Monthly plans stay $0 down, month-to-month, 30-day money-back; Lead System/Plus include the 60-day lead guarantee.</p><p>Plans: <a href="/pricing">/pricing</a>. Pages: <a href="/blog/lawn-care-website-pages">lawn care website pages</a>. Hub: lawn care website design.</p>`,
    payingForHtml: `<p>You are paying for route signup pages with ZIP and frequency, honest service lists (mow, cleanup, seasonal aeration if you sell it), and pet-waste only if it is real. One-off cleanup paths should not pretend to be weekly membership.</p><p>Dispatch clarity is the product. A pretty lawn hero that hides your service area is not.</p>`,
    buyerDecisionH2: "ZIP and mow frequency: the lawn care fields that save dispatch",
    buyerDecisionHtml: `<p>Route businesses die by polite lies. If a lead is outside your Tuesday map, the form should surface ZIP early so you can decline fast. Frequency—weekly, biweekly, one-time cleanup—changes truck loading and pricing. Skip those fields and you spend evenings untangling bad signups.</p><p>Pet-waste should appear only when you offer it. Seasonal aeration or dethatch can take short offer blocks in the right months without cluttering the year-round mow path.</p><ul><li>Required ZIP on route signup</li><li>Frequency selector before “book now”</li><li>Pet-waste and extras only if true</li></ul><p>Get a free homepage preview in 2 business days—no card—at <a href="/contact">/contact</a>, then pick a plan on <a href="/pricing">/pricing</a>.</p>`,
    extraFaqs: [
      { q: "Why require ZIP on a lawn care signup form?", a: "Route geography is the business. ZIP (and frequency) let you accept or decline before you promise a Thursday mow across town." },
      { q: "Should I list pet-waste removal if I only mow and trim?", a: "No. Only list scoop service you actually run. Fake extras create bad first visits and reviews." },
      { q: "Do one-time yard cleanups need a different path than weekly mowing?", a: "Yes. Cleanup leads and weekly route members schedule differently. Separate CTAs keep dispatch from treating a leaf-out job like a recurring mow." }
    ],
  },
  {
    slug: "junk-removal",
    noun: "junk removal",
    article: "a",
    siteLabel: "a Junk Removal",
    designAnchor: "junk removal website design",
    drivesCostHtml: `<p>Junk removal website cost sits in urgency vs planned cleanouts. A couch on the curb wants tap-to-call and a same-week window you can keep. An estate or garage cleanout wants volume notes, access (stairs, elevator, gate codes), and a quieter estimate form. Writing both paths—and declining work outside your dump schedule—takes calendar time beyond Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497.</p><p>Photo-based load estimates help when you use them; say when a truck visit is still required for final price. Fake “any pile, any day” promises create no-shows. Landlord and HOA recurring hauls belong only when you actually run those routes.</p><p>Lead System helps when you are on a haul and miss the next curb call; optional text-back is $1/mo second number + carrier rates (approval usually 10–15 days, not guaranteed). Website fits if the office already catches every ring. Own It buys the files once at $1,497 and skips the 60-day lead guarantee on Lead System and Plus.</p><p>Verify plans on <a href="/pricing">/pricing</a>. Pages: <a href="/blog/junk-removal-website-pages">junk removal website pages</a>. Hub: <a href="/industries/junk-removal">junk removal website design</a>.</p>`,
    payingForHtml: `<p>You are paying for separate haul-away and cleanout paths, honest same-week language, and quote fields for load size and access—not a stock before-and-after collage with a buried phone number.</p><p>You are not paying a mystery junk surcharge. Same four published plans as every other trade; the spend difference is how specific those pages get and whether missed-call follow-up matters on busy dump days.</p>`,
    buyerDecisionH2: "Curb pile vs estate cleanout: which path should your junk site lead with?",
    buyerDecisionHtml: `<p>Someone with a mattress on the driveway is not filling a ten-field form. They need the phone and a window you can keep. Someone pricing a multi-room cleanout has time for photos, volume notes, and a short form: name, phone, city, access, rough load size.</p><p>If those land on one vague “junk services” page, both hesitate. Split the CTAs. Invite photo estimates where you use them, and say when a truck visit is still required.</p><ul><li>Same-week haul: phone first, honest windows</li><li>Cleanouts: volume/access form, optional photos</li><li>Recurring property hauls: only if you run them</li></ul><p>Free homepage preview in 2 business days, no card: <a href="/contact">/contact</a>.</p>`,
    extraFaqs: [
      { q: "Should I advertise same-day junk removal on the homepage?", a: "Only where you can keep the promise. Put the windows you actually staff near the phone. Overpromising same-day outside your route creates no-shows and bad reviews." },
      { q: "Do curb loads and estate cleanouts need separate pages?", a: "Yes when you sell both. Urgent haul-away and planned cleanouts need different next steps and forms. One blob makes both leads messier." },
      { q: "When does Lead System text-back matter for junk haulers?", a: "On busy dump days when you miss curb calls from the truck. Lead System is $197/mo; optional text-back is $1/mo for a second number plus carrier rates. Carrier approval usually takes 10–15 days and is not guaranteed." }
    ],
  },
  {
    slug: "tree-care",
    noun: "tree service",
    article: "a",
    siteLabel: "a Tree Care",
    designAnchor: "tree service website design",
    drivesCostHtml: `<p>Tree service website cost follows storm urgency vs planned canopy work. A limb on a roof wants a phone and an honest response window. Trimming and full removals want real job photos, insurance cues near the call button, and a consult that does not sound like a tow truck. Writing those forks—and keeping the service area tied to crews you can send—drives calendar cost beyond Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497.</p><p>Stump grinding belongs only when you offer it. Fake 24/7 storm badges burn trust when nobody answers after midnight. Insurance and safety proof next to the phone are the expensive part in writing time, not a mystery “arborist multiplier.”</p><p>Lead System helps when you are in a bucket and miss a storm lead; optional text-back is $1/mo second number + carrier rates (approval usually 10–15 days, not guaranteed). Website fits office-covered phones. Own It at $1,497 buys files once and skips the 60-day lead guarantee on Lead System and Plus.</p><p>Compare on <a href="/pricing">/pricing</a>. Pages: <a href="/blog/tree-service-website-pages">tree service website pages</a>. Hub: <a href="/industries/tree-care">tree service website design</a>.</p>`,
    payingForHtml: `<p>You are paying for trim, removal, and storm paths with insurance cues near the phone, plus real crew and chipper photos—not a stock oak with a buried number.</p><p>Honest weather windows and stump language only when true are the product. Panic CTAs on every planned prune are not.</p>`,
    buyerDecisionH2: "Storm call vs planned trim: which tree path should lead?",
    buyerDecisionHtml: `<p>Storm callers need the phone first and a window you can keep. Planned trim and removal shoppers need photos, insurance cues, and a consult form: name, phone, city, roughly what they need done. Mixing both into one “tree services” paragraph trains the wrong next step.</p><p>Lead with the job that is in season after weather, but keep trim and removal one tap away year-round. Skip stump offers you do not run.</p><ul><li>Storm: phone first, honest windows</li><li>Trim: site-visit request, canopy notes</li><li>Removal: consult, stump only if offered</li></ul><p>Preview free in 2 business days at <a href="/contact">/contact</a>—no card.</p>`,
    extraFaqs: [
      { q: "Should my tree site promise 24/7 storm response?", a: "Only if someone answers. Put the windows you actually staff after weather near the phone. Fake overnight promises create angry calls, not booked work." },
      { q: "Do trimming and removals need separate pages?", a: "Yes when both are major revenue. A canopy thin and a full takedown need different proof and forms. One vague tree page makes both shoppers hesitate." },
      { q: "Where should insurance cues appear on a tree service site?", a: "Near the phone on the homepage and contact areas—not only on About. Homeowners comparing bids look for credentials before they read long service copy." }
    ],
  }];

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
  "junk-removal": "junk-removal-website-cost",
  "tree-care": "tree-service-website-cost",
};

/** Generated English bodies keyed by blog slug. */
export const GENERATED_COST_POSTS: Record<string, CostPostBody> = Object.fromEntries(
  COST_TRADE_SPECS.map((spec) => [COST_SLUG_BY_INDUSTRY[spec.slug], buildCostPostBody(spec)]),
);
