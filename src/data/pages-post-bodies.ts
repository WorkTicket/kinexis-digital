import { industryCostPostPath } from "@/data/industries";

export type PagesPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: { q: string; a: string }[];
};

export type PagesTradeSpec = {
  /** Industry slug used for path helpers. */
  slug: string;
  /** Blog slug for this pages post. */
  postSlug: string;
  /** Short label in leads: "plumber", "HVAC", "garage door company". */
  noun: string;
  /** Article before noun: "a" | "an" | "". */
  article: "a" | "an" | "";
  /** H2 for trade-specific section, e.g. "Plumbing-Specific Service Pages". */
  specificH2: string;
  /** FAQ answer for "What pages should X have?" */
  pagesFaqAnswer: string;
  /** Lead sentence after the shared opener (trade-specific focus). */
  leadFocus: string;
  /** HTML for the trade-specific service pages section (no wrapping h2). */
  servicesHtml: string;
  /** Optional annotated proof HTML; default placeholder used when omitted. */
  proofHtml?: string;
};

function withArticle(article: PagesTradeSpec["article"], noun: string) {
  if (!article) return noun;
  return `${article} ${noun}`;
}

const CORE_PAGES = `<p>Every trade site shares a boring-but-essential skeleton. Skip a piece and visitors invent their own story—usually the wrong one.</p><p><strong>Home</strong> has to work on a phone with one thumb: name the work, show the number, make the next step obvious. <strong>Service pages</strong> should split the jobs you actually sell, not dump everything under “what we do.” <strong>Service area</strong> lists the towns you can crew this month—not a fantasy radius. <strong>About</strong> covers license, insurance, and who shows up, but keep it short; proof also belongs near the phone. <strong>Reviews</strong> need to feel real. <strong>Contact</strong> is form plus tap-to-call, not a number trapped in a footer image.</p><p>That is the floor. The trade-specific pages below are what make someone think, “they do <em>my</em> job,” instead of “nice generic brochure.”</p><p>If you are planning against a Kinexis plan, page counts are a ceiling—not a homework assignment: Website up to 5, Lead System up to 10, Plus up to 20 (English + Spanish), Own It up to 10. Ship the pages that earn calls first.</p>`;

const HOMEPAGE_WIREFRAME = `<p>Open your site on your phone the way a stranger would. Without scrolling, can you tell what you fix, where you work, and how to call? If not, the rest of the site is arguing uphill.</p><p>A practical first screen usually runs like this: a headline that names the work (not “quality since forever”), a tap-to-call number large enough to hit, the cities you cover, one clear primary action, and a thin trust strip—licensed, insured, or a real review line. Mission statements, long galleries, and financing essays can wait. Someone with water on the floor is not reading your origin story.</p><p>Google indexes with a <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" rel="noopener noreferrer" target="_blank">mobile-first approach</a>, so design the phone layout first and widen it for desktop later. Speed counts too. A gorgeous hero that takes forever to load still loses the call. When the page feels sticky on cellular, run it through <a href="https://pagespeed.web.dev/" rel="noopener noreferrer" target="_blank">PageSpeed Insights</a> and fix whatever is blocking the number and headline.</p>`;

const SERVICE_ANATOMY = `<p>Think like the person answering the phone. Before they ask for a name, they need to know what this page is about. A strong service page answers that in the first breath: what broke or what they want done, whether this is “call now” or “book a visit,” and what proof makes you believable.</p><p>Write titles the way customers search. “Water heater replacement” beats “residential solutions.” “Broken garage spring” beats “door systems.” Put that language in the H1 and the opening paragraph so nobody has to decode your marketing.</p><p>Keep the first form short—name, phone, job type, city. Photos and serial numbers can follow by text once you know the lead is real. Emergency pages put the phone above the form. Planned projects can lead with the form if you are booked out, but the number should still be one tap away.</p><p>Add FAQs only when they remove a real objection: hours, service area, permits, what you do not do. Padding for word count helps nobody. Google’s guidance on <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" rel="noopener noreferrer" target="_blank">helpful content</a> is basically that: write for people first, then make it easy for search to understand.</p>`;

const NAP_CONSISTENCY = `<p>Name, phone, hours, and service area should match your website and your <a href="https://support.google.com/business/" rel="noopener noreferrer" target="_blank">Google Business Profile</a>. A profile that says 24/7 while the site closes at six creates angry overnight calls and review damage you did not need.</p><p>Use one honest service-area page—not a stack of thin city clones. Google’s spam policies call out <a href="https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages" rel="noopener noreferrer" target="_blank">doorway pages</a> built mainly to rank for many similar place-name queries. List the towns you can crew, note any hard edges (no islands, no mountain runs in winter), and link that page from the footer and contact page.</p><p>When hours change for a holiday, update the profile and the site the same day. Lead System and Plus include a Google profile tune-up at launch; Plus adds two posts a month. Ongoing SEO beyond that foundation is quoted separately.</p>`;

const DEFAULT_PROOF =
  "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub—hero, trust strip, service paths, and how the phone is placed. Until then, use the service list above and a free homepage preview built for your offer so you can see the first-screen path before you pay.</p>";

const SKIP_DOORWAY = `<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget, confuses callers who live outside your real radius, and does not help someone decide whether to dial.</p><p>One clear service-area page plus strong service pages is the honest approach. If you later expand into a new metro for real, update the area page and the profile—do not ship twenty thin clones overnight.</p><p>Related reading: <a href="/blog/local-seo-get-found-get-called">local SEO that connects searches to calls</a>, <a href="/blog/web-design-for-contractors">contractor website checklist</a>, and <a href="/blog/google-business-profile-vs-website">Google Business Profile vs website</a>.</p>`;

const BUILD_ORDER = `<p>If you are rebuilding from a brochure site, ship in this order:</p><ol><li>Fix the homepage first screen (work, area, phone)</li><li>Publish the top three service pages that match real search demand</li><li>Add the honest service-area page</li><li>Align Google Business Profile with the site</li><li>Only then add secondary pages, galleries, or blog posts</li></ol><p>A five-page site that books calls beats a twenty-page site that only works on a desktop monitor. After the structure is clear, compare cash-flow models on <a href="/blog/monthly-website-vs-own-it">Monthly Website vs Own It</a> and live prices on <a href="/pricing">/pricing</a>.</p>`;

const PHOTOS_PROOF = `<p>Stock photos of hard hats and smiling strangers train the next customer to expect someone else’s crew. Prefer:</p><ul><li>Your truck and branded shirts</li><li>Before/after of jobs you actually finished</li><li>Close-ups that show craft (joints, panels, paint edges) when they help the sale</li><li>A simple caption with city or neighborhood when it is real</li></ul><p>Compress images so the phone number still appears quickly. Google’s <a href="https://developers.google.com/search/docs/appearance/page-experience" rel="noopener noreferrer" target="_blank">page experience</a> guidance is a useful reminder that slow media hurts both search and conversion. License and insurance marks belong near the call button when they apply in your state—not only on a buried About page.</p>`;

const FORMS_CTA = `<p>Forms fail when they ask for a novel. For most trades, start with:</p><ul><li>Name</li><li>Phone (required)</li><li>Job type (dropdown or short text)</li><li>City or ZIP</li></ul><p>Optional later: photos, gate codes, preferred windows. Emergency pages should lead with tap-to-call and treat the form as backup. Planned-estimate pages can lead with the form if you are booked out—still keep the number visible.</p><p>After submit, say what happens next (“We call during staffed hours”) and match that promise. A thank-you page that says “we’ll be in touch” with no timeframe trains people to call your competitor.</p>`;

const IA_PRIORITIES = `<p>Information architecture for a trade site is not a sitemap contest. Rank pages by whether they earn a phone call or a qualified form:</p><ol><li>Homepage</li><li>Top revenue or emergency services</li><li>Service area</li><li>Contact</li><li>Reviews / proof</li><li>About</li><li>Secondary services and seasonal offers</li></ol><p>Blog posts and resource pages support those money pages—they should not replace a clear service page for a head-term job. Keep internal links obvious: from home to services, from services to area and contact, from blog guides back to the industry hub and the matching cost post when price is the question.</p>`;

const MEASURE_ITERATE = `<p>After launch, measure what matters:</p><ul><li>Calls from the site (tracking number when you use one)</li><li>Form submits that became real jobs</li><li>Search Console queries and pages earning impressions</li><li>Which service pages get visits with zero calls (fix those first)</li></ul><p><a href="https://support.google.com/webmasters/answer/4559176" rel="noopener noreferrer" target="_blank">Google Search Console</a> shows discovery; your phone and CRM show money. Technical fixes can move in weeks; broader local growth often takes months and depends on competition. Nobody outside Google can promise a position—see Google’s <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" rel="noopener noreferrer" target="_blank">SEO starter guide</a> for foundations, and <a href="/seo-services">SEO services</a> when you want ongoing work quoted separately from the four website plans.</p>`;

export function buildPagesPostBody(spec: PagesTradeSpec): PagesPostBody {
  const subject = withArticle(spec.article, spec.noun);
  const industryPath = `/industries/${spec.slug}`;
  const costPath = industryCostPostPath(spec.slug);
  const proof = spec.proofHtml ?? DEFAULT_PROOF;

  return {
    lead: `Most people who land on ${subject} website already know what went wrong at the house. They are not browsing for fun. They need to see that you do that job, that you cover their area, and how to reach you—fast. ${spec.leadFocus}`,
    faqs: [
      {
        q: `What pages should ${subject} website have?`,
        a: spec.pagesFaqAnswer,
      },
      {
        q: "Do I need a page for every city?",
        a: "No. One honest service-area page beats dozens of near-identical city pages that swap the town name.",
      },
      {
        q: "Should emergency and estimate work share one page?",
        a: "Usually no. Give urgent jobs a phone-led path and planned work a short form so the next step matches the search intent.",
      },
      {
        q: "How do Kinexis plans relate to page count?",
        a: "Website includes up to 5 pages, Lead System up to 10, Plus up to 20 (English + Spanish), Own It up to 10. Start with a free homepage preview—no card.",
      },
      {
        q: "Where should I start if my site is a mess today?",
        a: "Fix the homepage first screen, then your top three service pages, then the service-area page. Add extras only after those convert.",
      },
    ],
    sections: [
      {
        h2: "Start With the Call, Not the Sitemap",
        html: `<p>Forget the perfect org chart for a minute. Picture someone on a phone in a driveway. They typed a job, tapped a result, and now they have about five seconds of patience. If your page talks around the work—or hides the number—they leave. That is the whole argument for clear pages.</p><p>You still need a sensible structure. Home, services, area, about, reviews, contact. But the point of that structure is calls and qualified forms, not impressing another designer. Walk the live examples on the <a href="${industryPath}">${spec.noun} industry hub</a> when you want proof of layout. If you are weighing price next, use <a href="${costPath}">${spec.noun} website cost</a>—that post owns the cost question; this one owns the page list.</p>`,
      },
      {
        h2: "Core Pages Every Business Site Needs",
        html: CORE_PAGES,
      },
      {
        h2: "Homepage Wireframe (Mobile First)",
        html: HOMEPAGE_WIREFRAME,
      },
      {
        h2: spec.specificH2,
        html: `${spec.servicesHtml}<p>More examples and process notes live on the <a href="${industryPath}">industry hub</a>.</p>`,
      },
      {
        h2: "Service Page Anatomy",
        html: SERVICE_ANATOMY,
      },
      {
        h2: "Keep NAP and the Profile Consistent",
        html: NAP_CONSISTENCY,
      },
      {
        h2: "Photos and Proof That Belong on the Site",
        html: PHOTOS_PROOF,
      },
      {
        h2: "Forms and Calls: Match the Next Step to Intent",
        html: FORMS_CTA,
      },
      {
        h2: "How to Prioritize Pages (IA Without the Jargon)",
        html: IA_PRIORITIES,
      },
      {
        h2: "Annotated Homepage When Proof Exists",
        html: proof,
      },
      {
        h2: "Skip Doorway City Spam",
        html: SKIP_DOORWAY,
      },
      {
        h2: "Build Order If You Are Starting Thin",
        html: BUILD_ORDER,
      },
      {
        h2: "What to Measure After You Publish",
        html: `${MEASURE_ITERATE}<p><a href="/contact">Request a free homepage preview</a> or compare plans on <a href="/pricing">/pricing</a>. Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497 once—every option starts with a free preview in 2 business days, no card.</p>`,
      },
    ],
  };
}

export const PAGES_TRADE_SPECS: PagesTradeSpec[] = [
  {
    slug: "plumbing",
    postSlug: "plumbing-website-pages",
    noun: "plumber",
    article: "a",
    specificH2: "Plumbing-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for leaks, drains, and water heaters, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus:
      "Separate leak repair, drain cleaning, and water heater pages so emergency and quote traffic are not mixed.",
    servicesHtml:
      "<p>Plumbing searches split hard between panic and planning. A burst line wants a big phone number and honest hours. A water-heater quote wants a short form and brands you actually install. If those paths share one vague services page, both visitors hesitate—and Google has a harder time matching the right query to the right page.</p><p>Give leaks, drains, and water heaters their own pages. Lead emergency paths with tap-to-call. Let estimate pages breathe with a few proof photos and a form that asks for name, phone, job type, and city—nothing more on the first pass.</p>",
    proofHtml:
      "<p>Preferred Plumbing Solutions is a live plumbing client site. On the homepage: local Spirit Lake hero with phone + free-estimate CTA, a trust strip (licensed, owner-operated, free estimates), separate paths for repairs / radiant / tankless / drains / new construction, and FAQs that state real staffed hours. See the <a href=\"/industries/plumbing\">plumbing hub</a> proof block for the annotated screenshot.</p>",
  },
  {
    slug: "hvac",
    postSlug: "hvac-website-pages",
    noun: "HVAC",
    article: "an",
    specificH2: "HVAC-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for no-cool repair, replacement, and maintenance, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus:
      "Keep repair, system replacement, and maintenance on separate paths so shoulder-season work stays visible.",
    servicesHtml:
      "<p>In July, nobody wants a brochure about “comfort solutions.” They want a tech for no-cool. In shoulder season, the same company needs a visible path for tune-ups and replacements. Mash those together and you bury the work that is actually in season.</p><p>Keep repair, system replacement, and maintenance on separate pages. Peak-season callers get the phone first. Replacement shoppers get a consult form—and financing notes only if you truly offer financing. Fake “as low as” lines create angry callbacks.</p>",
  },
  {
    slug: "electrical",
    postSlug: "electrician-website-pages",
    noun: "electrician",
    article: "an",
    specificH2: "Electrical-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for panels, EV chargers, and troubleshooting, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus: "Show licensing trust early, and give EV chargers their own page when that work is real.",
    servicesHtml:
      "<p>Electrical buyers are comparing trust as much as price. Show licensing early—near the phone, not three scrolls down. Panel upgrades, troubleshooting, and EV chargers are different jobs with different urgency. If you install chargers, give that work its own page with a site-check path. If something smells like burning or breakers will not reset, the page should scream call—not invite a long brochure read.</p>",
  },
  {
    slug: "roofing",
    postSlug: "roofing-website-pages",
    noun: "roofing",
    article: "a",
    specificH2: "Roofing-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for repairs, replacements, and storm calls, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus:
      "Split repair and replacement, and describe insurance process without promising claim outcomes.",
    servicesHtml:
      "<p>After hail, homeowners want an inspection window—not a novel about shingle brands. Split repair from full replacement. You can explain how you document damage for insurance without promising claim outcomes you do not control. Keep the storm inspection form short: name, phone, address area, and a place for photos if safe. Active leaks still deserve the phone above everything else.</p>",
  },
  {
    slug: "garage-doors",
    postSlug: "garage-door-website-pages",
    noun: "garage door company",
    article: "a",
    specificH2: "Garage Door-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for springs, openers, and new doors, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus:
      "Emergency spring/opener paths should lead with the phone; new-door pages can use a short measure form.",
    servicesHtml:
      "<p>A door stuck open at 7 a.m. is not the same buyer as someone pricing a new double door for the garage remodel. Springs and openers need a phone-led repair path. New doors can use a short measure form (single/double, material if known, city). One vague “garage services” page makes both people work too hard.</p>",
  },
  {
    slug: "painting",
    postSlug: "painting-website-pages",
    noun: "painting contractor",
    article: "a",
    specificH2: "Painting-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for interior, exterior, and cabinets, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus: "Separate interior, exterior, and cabinet work, and keep the estimate form short.",
    servicesHtml:
      "<p>Interior, exterior, and cabinets sell differently. Exterior wants stories and siding notes; cabinets want photos of the boxes; interior wants room count without a twenty-field form. Separate the pages, keep the estimate ask short, and let photos follow by text after you confirm fit.</p>",
  },
  {
    slug: "remodeling",
    postSlug: "remodeling-website-pages",
    noun: "remodeling contractor",
    article: "a",
    specificH2: "Remodeling-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for kitchens, baths, and other remodels you sell, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus: "Lead with finished rooms and a consult path instead of emergency-call language.",
    servicesHtml:
      "<p>Remodeling is rarely a same-hour panic call. Lead with finished rooms you actually built and a consult path—not emergency banner language copied from a plumber template. Kitchens and baths deserve their own pages. A short process note (walkthrough → scope → schedule) calms shoppers more than a giant “CALL NOW” that does not match how you sell.</p>",
  },
  {
    slug: "landscaping",
    postSlug: "landscaping-website-pages",
    noun: "landscaping",
    article: "a",
    specificH2: "Landscaping-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for maintenance and design-build, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus:
      "Split weekly maintenance from design-build so mowing leads are not forced into a patio consult.",
    servicesHtml:
      "<p>Weekly mow customers do not want a patio design consult shoved at them. Design-build buyers do not want a “join our route” form. Split maintenance from projects. Seasonal cleanup can be its own short path with ZIP and preferred week. Real yard photos beat stock lawns every time.</p>",
    proofHtml:
      "<p>A1 Property Services is a live landscaping client site. On the homepage: Cedar Falls place-first hero and free-quote CTA, lawn care separated from hardscape projects, before/after sliders of real jobs, and a named Black Hawk County service area. See the <a href=\"/industries/landscaping\">landscaping hub</a> proof block for the annotated screenshot.</p>",
  },
  {
    slug: "pool-care",
    postSlug: "pool-service-website-pages",
    noun: "pool service",
    article: "a",
    specificH2: "Pool Service-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for weekly routes, repairs, and equipment, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus:
      "Give green-pool and equipment repairs a phone path that is not buried under membership copy.",
    servicesHtml:
      "<p>A green pool in August is not reading your membership brochure. Put repair and equipment issues on a phone-led path. Weekly route signup can be a short form: ZIP, preferred day, and whether the pool is currently swimmable. Keep the offers from stepping on each other.</p>",
  },
  {
    slug: "pressure-washing",
    postSlug: "pressure-washing-website-pages",
    noun: "pressure washing",
    article: "a",
    specificH2: "Pressure Washing-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for houses, concrete, and roofs, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus: "Separate surfaces and leave room for before-and-after photos that prove the result.",
    servicesHtml:
      "<p>House wash, concrete, and roof algae are different conversations—and sometimes different methods. Separate the surfaces. Before-and-after photos do more selling than adjectives. When soft wash matters for roofs or paint, say so plainly so the homeowner is not surprised on the day of service.</p>",
  },
  {
    slug: "window-cleaning",
    postSlug: "window-cleaning-website-pages",
    noun: "window cleaning",
    article: "a",
    specificH2: "Window Cleaning-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for homes and storefronts, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus: "Split residential and commercial glass, and offer recurring cleans as the normal next step.",
    servicesHtml:
      "<p>Homes and storefronts book differently. Residential often wants a recurring clean; commercial wants a schedule that does not block the door at open. Split the pages. Ask for rough pane count and frequency on the form so you are not guessing from a one-line “need windows cleaned” email.</p>",
  },
  {
    slug: "yard-care",
    postSlug: "lawn-care-website-pages",
    noun: "lawn care",
    article: "a",
    specificH2: "Lawn Care-Specific Service Pages",
    pagesFaqAnswer:
      "Home, services for mowing routes and cleanups, service area, about, reviews, and contact. Avoid thin city doorway pages.",
    leadFocus:
      "Publish an honest service area and give pet-waste its own page only when that offer is real.",
    servicesHtml:
      "<p>Route work lives and dies on an honest service area. Publish the neighborhoods you can actually hit. Weekly mow and pet-waste are different offers—give pet-waste its own page only if you really run that stop. Seasonal cleanup can share a short form with ZIP and frequency so dispatch is not decoding vague texts all week.</p>",
  },
];

/** Generated English bodies keyed by blog slug. */
export const GENERATED_PAGES_POSTS: Record<string, PagesPostBody> = Object.fromEntries(
  PAGES_TRADE_SPECS.map((spec) => [spec.postSlug, buildPagesPostBody(spec)]),
);
