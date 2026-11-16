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
  /** Trade-only customer journey H2. */
  journeyH2: string;
  /** Trade-only customer journey body. */
  journeyHtml: string;
  /** Trade-only form/CTA H2. */
  formH2: string;
  /** Trade-only form/CTA body. */
  formHtml: string;
  /** FAQs that only make sense for this trade. */
  extraFaqs: { q: string; a: string }[];
  /** Optional annotated proof HTML; default placeholder used when omitted. */
  proofHtml?: string;
};

function withArticle(article: PagesTradeSpec["article"], noun: string) {
  if (!article) return noun;
  return `${article} ${noun}`;
}

const CORE_PAGES = `<p>Every trade site still needs a boring skeleton: <strong>Home</strong> (work, area, phone on a phone-sized first screen), <strong>service pages</strong> for jobs you sell, <strong>service area</strong> that tells the truth, short <strong>About</strong>, real <strong>Reviews</strong>, and <strong>Contact</strong> with tap-to-call plus a short form. That is the floor—the trade sections below are what make someone think you do <em>their</em> job.</p><p>Kinexis page ceilings: Website up to 5, Lead System up to 10, Plus up to 20 (English + Spanish), Own It up to 10. Ship money pages first.</p>`;

const HOMEPAGE_WIREFRAME = `<p>Open the site on your phone the way a stranger would. Without scrolling, can you tell what you fix, where you work, and how to call? Headline that names the work, tap-to-call, cities you cover, one primary action, thin trust strip. Mission statements can wait. Google uses a <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-first-indexing" rel="noopener noreferrer" target="_blank">mobile-first approach</a>; slow heroes still lose the call—check <a href="https://pagespeed.web.dev/" rel="noopener noreferrer" target="_blank">PageSpeed Insights</a> when the number feels sticky on cellular.</p>`;

const SERVICE_ANATOMY = `<p>A strong service page answers in the first breath: what broke or what they want done, whether this is call-now or book-a-visit, and what proof makes you believable. Titles should match how customers search—“water heater replacement” beats “residential solutions.” Keep the first form short unless the trade section below says otherwise. Google’s <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" rel="noopener noreferrer" target="_blank">helpful content</a> guidance is the baseline: write for people first.</p>`;

const NAP_CONSISTENCY = `<p>Name, phone, hours, and service area should match your website and <a href="https://support.google.com/business/" rel="noopener noreferrer" target="_blank">Google Business Profile</a>. One honest service-area page beats thin city clones—Google’s spam policies call out <a href="https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages" rel="noopener noreferrer" target="_blank">doorway pages</a>. Update hours on both places the same day.</p>`;

const DEFAULT_PROOF =
  "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free homepage preview built for your offer so you can see the first-screen path before you pay.</p>";

const SKIP_DOORWAY = `<p>Do not publish near-identical pages that only change the city name. One clear service-area page plus strong service pages is the honest approach. Related: <a href="/blog/local-seo-get-found-get-called">local SEO</a>, <a href="/blog/web-design-for-contractors">contractor website checklist</a>.</p>`;

const BUILD_ORDER = `<p>If you are rebuilding thin: (1) homepage first screen, (2) top three service pages, (3) honest service area, (4) align Google Business Profile, (5) only then galleries or blog. Compare cash-flow models on <a href="/blog/monthly-website-vs-own-it">Monthly Website vs Own It</a> and live prices on <a href="/pricing">/pricing</a>.</p>`;

const PHOTOS_PROOF = `<p>Prefer your truck, before/after of jobs you finished, and craft close-ups when they help the sale. Compress images so the phone number still appears quickly. License and insurance marks belong near the call button when they apply—not only on a buried About page.</p>`;

const IA_PRIORITIES = `<p>Rank pages by whether they earn a phone call or qualified form: homepage → top revenue or emergency services → service area → contact → reviews → about → secondary offers. Blog posts support money pages; they should not replace a clear service page for a head-term job.</p>`;

const MEASURE_ITERATE = `<p>After launch measure calls, form submits that became jobs, Search Console queries/pages, and service pages with visits but zero calls. <a href="https://support.google.com/webmasters/answer/4559176" rel="noopener noreferrer" target="_blank">Search Console</a> shows discovery; your phone shows money. Technical fixes can move in weeks; broader local growth often takes months. Nobody outside Google can promise a position.</p>`;

const SHARED_FAQS = [
  {
    q: "Do I need a page for every city?",
    a: "No. One honest service-area page beats dozens of near-identical city pages that swap the town name.",
  },
  {
    q: "How do Kinexis plans relate to page count?",
    a: "Website includes up to 5 pages, Lead System up to 10, Plus up to 20 (English + Spanish), Own It up to 10. Start with a free homepage preview—no card.",
  },
  {
    q: "Where should I start if my site is a mess today?",
    a: "Fix the homepage first screen, then your top three service pages, then the service-area page. Add extras only after those convert.",
  },
];

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
      ...spec.extraFaqs,
      ...SHARED_FAQS,
    ],
    sections: [
      {
        h2: "Start With the Call, Not the Sitemap",
        html: `<p>Picture someone on a phone in a driveway. They typed a job, tapped a result, and now they have about five seconds of patience. If your page talks around the work—or hides the number—they leave. Home, services, area, about, reviews, contact still matter—but the point is calls and qualified forms.</p><p>Walk the live examples on the <a href="${industryPath}">${spec.noun} industry hub</a> when you want proof of layout. If you are weighing price next, use <a href="${costPath}">${spec.noun} website cost</a>—that post owns the cost question; this one owns the page list.</p>`,
      },
      {
        h2: spec.specificH2,
        html: `${spec.servicesHtml}<p>More process notes live on the <a href="${industryPath}">industry hub</a>.</p>`,
      },
      {
        h2: spec.journeyH2,
        html: spec.journeyHtml,
      },
      {
        h2: spec.formH2,
        html: spec.formHtml,
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
    pagesFaqAnswer: "Home; separate pages for leaks, drains, and water heaters; honest service area; about with license cues; reviews; and contact with tap-to-call plus a short form. Skip thin city doorway clones. Match page count to your plan ceiling (Website 5, Lead System 10, Plus 20 EN+ES, Own It 10) and ship the three money services first.",
    leadFocus: "A burst supply line wants the phone in the first thumb reach; a tankless quote wants brands you install and a short form. Split leaks, drains, and water heaters so panic and planned traffic stop competing on one vague page.",
    servicesHtml: `<p>Plumbing callers arrive in two moods. Someone with water under a sink is typing with wet fingers and looking for a number, honest hours, and a clear yes on whether you take after-hours work. Someone pricing a water-heater swap has time for finished-bath photos, the brands you actually stock, and a quiet estimate path. When both land on one “plumbing services” blob, the emergency caller scrolls past brand essays and the planner feels rushed by a panic banner.</p><p>Give <strong>leaks</strong>, <strong>drains</strong>, and <strong>water heaters</strong> their own pages. Leak and backup paths lead with tap-to-call, a short note on what to shut off while you are rolling, and hours that match how you staff nights—not a decorative 24/7 badge. Drain pages can mention camera or hydro-jetting only when you offer them; inventing capabilities creates angry callbacks when the van arrives without the tool.</p><p>Heater pages should separate repair from replace when both are real revenue. Name tankless or tank brands you install and warrant. Show copper and install photos from your jobs, not loft kitchens from a stock library. Keep the first ask short: name, phone, heater type or symptom, city. Serial plates and basement photos can follow by text once the lead is real.</p><p>Repipes, radiant, and new-construction paths belong only if your board shows that work. Otherwise leave them off—thin pages for jobs you rarely bid waste crawl attention and confuse homeowners. Tie service pages back to an honest <a href="/industries/plumbing">plumber website</a> layout on the hub, and use <a href="/blog/plumber-website-cost">plumber website cost</a> when the next question is plan fit, not sitemap.</p><p>Plan ceilings still apply: Website up to 5 pages, Lead System up to 10, Plus up to 20 (English + Spanish), Own It up to 10. Ship leak, drain, and heater first. Secondary pages wait until those three convert on a phone.</p>`,
    journeyH2: "Panic leak vs planned heater: two journeys on one plumbing site",
    journeyHtml: `<p>Picture a homeowner at 11 p.m. with a towel under a cabinet. They will not open your about page. They need the phone, a line that says whether anyone answers after hours, and zero friction. The next morning, a different visitor is comparing tankless installs. They will read brands, skim install photos, and fill a short form if the path feels calm.</p><p>Those journeys should never share one CTA stack. On leak and sewer-backup pages, put tap-to-call above the fold and treat the form as backup for missed rings. On heater and remodel-plumbing pages, the form can lead—still keep the number one tap away. Homeowners smell when a planned-estimate page screams like a tow truck.</p><ul><li>Active leak / no water / backup: phone first, honest hours, shutoff tips</li><li>Clogged drains: camera/hydro language only if true</li><li>Water heaters: brands, photos, short estimate form</li></ul><p>If leak weeks bury your line while you are under a slab, that is a Lead System ($197/mo) follow-up question—not a prettier hero. See the layout notes on <a href="/industries/plumbing">/industries/plumbing</a> and request a free homepage preview in 2 business days (no card) at <a href="/contact">/contact</a>.</p>`,
    formH2: "Plumbing forms: name, phone, job, city—then stop",
    formHtml: `<p>The first plumbing form should fit a wet thumb. Ask for <strong>name</strong>, <strong>phone</strong> (required), <strong>job type</strong> (leak, drain, heater, other), and <strong>city</strong>. That is enough to decide if you can roll and what truck to send. Gate codes, serial numbers, and photo uploads belong in a follow-up text after you confirm the lead—not as required fields that abandon the form mid-flood.</p><p>Emergency pages should not hide the number behind “submit for a callback.” Lead with tap-to-call; keep the short form as a backup when you miss the ring. Planned heater pages can lead with the form if you are booked out, but say what happens next in plain English: “We call during staffed hours,” with hours that match the site and your Google profile.</p><p>Skip twenty-field “project questionnaires” on first contact. They feel thorough to the office and lethal to the homeowner standing in a puddle. Compare plan page ceilings on <a href="/pricing">/pricing</a>—Website $97/mo (up to 5), Lead System $197/mo (up to 10), Plus $297/mo (up to 20 EN+ES), Own It $1,497 (up to 10)—then build only the forms those money pages need.</p>`,
    extraFaqs: [
      { q: "Should a leak page and a water-heater page share the same CTA?", a: "No. Leak pages should lead with tap-to-call and honest hours. Heater pages can lead with a short estimate form. Sharing one panic button or one long form makes both visitors hesitate." },
      { q: "What belongs on a plumber’s first contact form?", a: "Name, phone, job type (leak, drain, heater), and city. Photos, serials, and gate codes can follow by text after you confirm the lead—do not require them during a flood." },
      { q: "Do I need separate pages for tank and tankless water heaters?", a: "Not always. One water-heater page that names the brands you install and shows real jobs is enough. Add a tankless split only when that work is a major, distinct offer." }
    ],
    proofHtml: `<p><strong>Preferred Plumbing Solutions</strong> is a live plumbing client site (Spirit Lake, Idaho). The homepage leads with a local hero, tap-to-call, and a free-estimate CTA; a trust strip covers licensed, owner-operated, and free estimates; and service paths stay split for repairs, radiant, tankless, drains, and new construction. FAQs state real staffed hours instead of a fake 24/7 badge. Owner Hunter Norris’s review sits with other client proof on the site. See the annotated homepage on the <a href="/industries/plumbing">plumbing industry hub</a>.</p>`,
  },
  {
    slug: "hvac",
    postSlug: "hvac-website-pages",
    noun: "HVAC",
    article: "an",
    specificH2: "HVAC-Specific Service Pages",
    pagesFaqAnswer: "Home; pages for no-cool/no-heat repair, system replacement, and maintenance when you sell it; financing only if real; service area; about; reviews; contact. Avoid thin city doorways. Prioritize the seasonal money path on the homepage without deleting the others.",
    leadFocus: "Peak heat wants a no-cool phone path above the fold; shoulder season wants tune-ups and replacements visible without hunting. Keep repair, replace, and maintain on separate pages so the season you are in does not bury the rest.",
    servicesHtml: `<p>HVAC sites fail when every season shares one comfort brochure. In July a no-cool caller needs the phone, a clear service area, and a tech path that does not wander into SEER charts. In March the same company needs maintenance and filter reminders findable, or the board goes quiet while competitors book tune-ups. Replacement shoppers want system photos and a consult—not a panic banner meant for a frozen evaporator.</p><p>Publish distinct pages for <strong>repair</strong> (no-cool / no-heat), <strong>system replacement</strong>, and <strong>maintenance</strong> or memberships when you sell them. Peak-season homepage emphasis can flip: repair first in heat waves, maintenance more visible in shoulder months, without deleting the other paths. Financing language belongs only on replacement pages—and only when you actually offer financing. Fake “as low as” floors create angry first visits.</p><p>Proof is condensers, attic installs, and thermostat jobs you finished—not stock families on a couch. If you sell IAQ or duct cleaning, give those secondary pages after the three money paths convert. Service-area honesty matters when peak weeks stretch the crew; do not advertise counties you cannot staff in August.</p><p>For layout patterns see <a href="/industries/hvac">HVAC website design</a>. When the question shifts to plan price, use <a href="/blog/hvac-website-cost">HVAC website cost</a> and published numbers on <a href="/pricing">/pricing</a>: Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497.</p>`,
    journeyH2: "Season-aware HVAC journeys: no-cool, replace, or book a tune-up",
    journeyHtml: `<p>A homeowner sweating through a July afternoon is not shopping SEER. They want a tech today. Lead that journey with tap-to-call, a short “what is failing” note if useful, and zero financing essays. A replacement shopper six weeks later wants a consult, real equipment photos, and calm next steps. A spring tune-up buyer wants a book-or-call path and membership language only if you sell memberships.</p><p>Flip homepage emphasis with the calendar without orphaning the other journeys. Burying maintenance in July is fine; burying it in March leaves money on the table. Mixing all three into one paragraph forces every visitor to decode your business.</p><ul><li>Peak heat / freeze: phone-first repair pages</li><li>Replacement: consult form, system photos, financing only if real</li><li>Tune-ups: short booking path, membership only if offered</li></ul><p>Preview a season-aware homepage free in 2 business days—no card—at <a href="/contact">/contact</a>.</p>`,
    formH2: "HVAC CTAs: phone in peak heat, consult when replacing",
    formHtml: `<p>On no-cool and no-heat pages, the primary CTA is the phone. Keep a backup form with name, phone, symptom (no cool / no heat / other), and city for missed rings. Do not make a sweating homeowner complete a financing questionnaire before they can dial.</p><p>Replacement pages can lead with a consult form: name, phone, system age if known, city. Optional: photo of the outdoor unit. Maintenance pages need a simple book-or-call ask—preferred week is enough. Label buttons like a person: “Call for a no-cool visit” beats “Contact.” “Request a system consult” beats “Submit.”</p><p>After submit, say when you call back and keep that promise through peak season. Plan page ceilings (Website 5 / Lead System 10 / Plus 20 EN+ES / Own It 10) should push you to finish repair, replace, and maintain before secondary IAQ pages. Start with a free preview via <a href="/contact">/contact</a>.</p>`,
    extraFaqs: [
      { q: "Should my HVAC homepage lead with maintenance during a heat wave?", a: "Usually no. Lead with no-cool repair and the phone in peak heat. Keep tune-up and membership links visible but secondary until shoulder season, then flip the emphasis." },
      { q: "What fields belong on an HVAC replacement consult form?", a: "Name, phone, rough system age if known, and city. Optional outdoor-unit photo. Save financing paperwork and full model hunts for after you confirm the appointment." },
      { q: "Can repair and system replacement share one HVAC service page?", a: "Prefer separate paths. A no-cool caller and a full-system shopper need different next steps and proof. One vague page makes both groups guess what to do." }
    ],
    proofHtml: `<p>When a live HVAC client site is annotated on the hub, we call out hero phone placement, repair vs replace paths, and how maintenance stays findable in shoulder season. Until then, use the service list above and a free homepage preview built for your offer.</p>`,
  },
  {
    slug: "electrical",
    postSlug: "electrician-website-pages",
    noun: "electrician",
    article: "an",
    specificH2: "Electrical-Specific Service Pages",
    pagesFaqAnswer: "Home; troubleshooting/repair; panel and service upgrades; EV chargers only if you install them; service area; about with license; reviews; contact. Put credentials near the phone. Avoid thin city doorway pages.",
    leadFocus: "Electrical shoppers buy risk reduction as much as labor. Put license cues beside the phone, split panels and troubleshooting from EV when you sell chargers, and give EV buyers a site-check path—not an emergency banner.",
    servicesHtml: `<p>Electrician websites earn trust before they earn a price conversation. Homeowners comparing panel upgrades look for a license near the call button—not three scrolls under a stock hard-hat photo. Troubleshooting callers with a burnt-plastic smell want “call now.” EV charger shoppers want a site-check appointment and a clear note on whether you handle permits. Those are different pages, different photos, and different forms.</p><p>Publish paths for <strong>troubleshooting / repair</strong>, <strong>panel and service upgrades</strong>, and <strong>EV chargers</strong> when you actually install them. Skip EV pages you cannot fulfill. Panel pages should show neat workmanship and amp-service language you can stand behind. Troubleshooting pages keep symptom lists short and the phone huge.</p><p>New construction and lighting paths belong only when that work shows on the board. License and insurance cues belong beside the phone and in the contact block—not only on About. Stock loft kitchens with USB outlets do not move a buyer comparing licensed bids.</p><p>See <a href="/industries/electrical">electrician website design</a> for layout notes and <a href="/blog/electrician-website-cost">electrician website cost</a> when you are choosing among Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497 on <a href="/pricing">/pricing</a>.</p>`,
    journeyH2: "Breaker panic vs EV site-check: electrical journeys that stay separate",
    journeyHtml: `<p>A tripped-breaker panic path should not open with a long EV brochure. An EV site-check form should not scream emergency. Upgrade quotes need room for amp-service questions; troubleshooting needs a call CTA first. If those journeys mash together, shoppers bounce before they decide you are licensed and available.</p><p>Lead trust early: license and insurance near the phone on every money page. Then route by intent. Burning smell or dead circuits → call. Panel upgrade → consult. EV → site check with permit language only when accurate.</p><ul><li>Troubleshooting: call-first, optional short symptom form</li><li>Panels / service upgrades: consult fields, amp questions</li><li>EV chargers: site-check path, permit notes only if true</li></ul><p>Free homepage preview in 2 business days, no card: <a href="/contact">/contact</a>.</p>`,
    formH2: "Electrical forms: site-check for EV, call-first for troubleshooting",
    formHtml: `<p>Troubleshooting pages: phone primary; backup form with name, phone, short symptom, city. Do not require panel photos before someone can dial about a burning smell.</p><p>Panel upgrade forms: name, phone, current amp service if known, city, preferred callback window. EV forms: name, phone, city, garage or driveway note, and whether they already have a preferred charger brand—enough for a site check, not a full load calc on first click.</p><p>Keep license text near every form and phone block. After submit, say when a licensed tech calls back. Build against plan ceilings on <a href="/pricing">/pricing</a> (Website 5 / Lead System 10 / Plus 20 EN+ES / Own It 10) so EV and panel pages do not starve the troubleshooting path that pays nights.</p>`,
    extraFaqs: [
      { q: "Where should my electrician license appear on service pages?", a: "Beside the phone on the homepage and contact areas—and near forms on panel and EV pages—not only on About. Shoppers comparing bids look for credentials before long service copy." },
      { q: "What should an EV charger page ask for on first contact?", a: "Name, phone, city, install location (garage/driveway), and interest in a site check. Skip full load calculations on the first form; that work happens after you confirm the visit." },
      { q: "Do I need an EV page if I only do panels and troubleshooting?", a: "No. Skip EV pages you cannot fulfill. Add the page when you offer installs and can speak honestly to site checks and permits." }
    ],
    proofHtml: `<p>When a live electrician client site is annotated on the hub, we highlight license-near-phone placement and separate panel, EV, and repair paths. Until then, use the service list above and a free homepage preview.</p>`,
  },
  {
    slug: "roofing",
    postSlug: "roofing-website-pages",
    noun: "roofing",
    article: "a",
    specificH2: "Roofing-Specific Service Pages",
    pagesFaqAnswer: "Home; roof repair; full replacement; storm/insurance inspection; photo gallery; service area; about; reviews; contact. Keep insurance language about process, not promised payouts. Avoid thin city doorway pages.",
    leadFocus: "After hail, homeowners want an inspection window and a short mobile form—not a shingle novel. Split repair from full replacement, keep active leaks on the phone, and explain insurance documentation without promising claim outcomes.",
    servicesHtml: `<p>Roofing sites get tested in the week after a storm. Repair callers and full-replacement shoppers are not the same person, even when both typed “roofer near me.” Active leaks still deserve the phone above everything. Hail inspection traffic wants a short form that works with wet fingers: name, phone, address area, optional photos if safe. Long brand essays about shingle lines waste those minutes.</p><p>Keep <strong>repair</strong>, <strong>full replacement</strong>, and <strong>storm / insurance inspections</strong> on separate paths. You can explain how you document damage and work with adjusters without promising payouts you do not control. Before/after galleries and storm-doc samples from your jobs beat stock blue-sky roofs.</p><p>Planned replacements in dry months can lean on galleries and a consult tone. Do not leave storm CTAs screaming year-round if your board is quiet—seasonal emphasis is allowed. Material pages belong only for lines you install and warrant.</p><p>Layout notes live on <a href="/industries/roofing">roofing website design</a>; plan math on <a href="/blog/roofing-website-cost">roofing website cost</a> and <a href="/pricing">/pricing</a> (Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497).</p>`,
    journeyH2: "Storm week journeys: leak call, hail inspection, or planned tear-off",
    journeyHtml: `<p>Post-storm visitors are not browsing color chips. They want an inspection window and a crew that knows how documentation works with their insurer. Active leaks still skip the form and go to the phone. Planned tear-offs months later want galleries and a consult—not emergency tone.</p><p>Do not mash those journeys into one “roofing services” page. A patch lead and a full replacement lead need different photos, timelines, and next steps. Put the inspection CTA where hail searchers land; keep brand essays secondary.</p><ul><li>Active leak: phone first</li><li>Hail / storm: short inspection form on mobile</li><li>Planned replacement: gallery + consult</li></ul><p>See a homepage direction free in 2 business days at <a href="/contact">/contact</a>—no card.</p>`,
    formH2: "Roofing inspection forms: short fields, optional photos",
    formHtml: `<p>Storm inspection forms must work on a wet phone: large fields, obvious button, minimal required inputs. Ask for name, phone, rough address or area, and optional roof photos if it is safe to take them. Save long material questionnaires and insurance policy numbers for after the appointment is set.</p><p>Repair pages still lead with tap-to-call; the form is backup. Replacement consult forms can add preferred contact window and whether they already have an adjuster visit scheduled—still keep it short. Never promise “insurance will pay for a full replacement” in a thank-you message or button label.</p><p>Build the storm path first against your plan page ceiling, then add galleries. Compare plans on <a href="/pricing">/pricing</a>; start with a free preview via <a href="/contact">/contact</a>.</p>`,
    extraFaqs: [
      { q: "Can my roofing site promise insurance will cover a full replacement?", a: "No. Explain how you document damage and work with adjusters, but do not promise claim outcomes. That language creates liability when carriers disagree." },
      { q: "What fields belong on a hail inspection form?", a: "Name, phone, rough address or area, and optional photos if safe. Keep it mobile-first. Save long material and policy questionnaires for after you confirm the inspection." },
      { q: "Should roof repair and full replacement share one page?", a: "Prefer separate paths. Repair callers and tear-off shoppers need different proof and timelines. One vague page makes both groups guess the next step." }
    ],
    proofHtml: `<p>When a live roofing client site is annotated on the hub, we mark inspection CTAs, repair vs replacement splits, and storm-doc proof. Until then, use the service list above and a free homepage preview.</p>`,
  },
  {
    slug: "garage-doors",
    postSlug: "garage-door-website-pages",
    noun: "garage door company",
    article: "a",
    specificH2: "Garage Door-Specific Service Pages",
    pagesFaqAnswer: "Home; spring/cable repair; opener repair; new doors; same-day notes only if true; service area; about; reviews; contact. Brand lists only for authorized lines. Avoid thin city doorway pages.",
    leadFocus: "A door stuck open at dawn needs same-day repair honesty and a giant phone number. A remodel shopper needs a measure form and brands you are authorized to sell. Springs, openers, and new doors should not share one vague page.",
    servicesHtml: `<p>Garage door companies run two businesses that share a truck: emergency repair and new-door sales. A torsion spring that snapped at 7 a.m. is not shopping insulated glass options. A homeowner remodeling the garage is not calmed by a red “stuck open—call now” sticker on every screen. Split the paths or both visitors work too hard.</p><p>Give <strong>spring and cable repair</strong>, <strong>opener diagnose/replace</strong>, and <strong>new doors</strong> their own pages. Same-day language belongs only where your board and ZIP coverage can keep the promise. Brand logos belong only for lines you are authorized to sell and service—catalog wallpaper you cannot order wastes trust at the measure appointment.</p><p>Photos of real installs beat glossy catalog-only galleries. Show single and double doors you actually hung, opener brands you service, and spring work that looks like your van. Service-area honesty matters when same-day claims are on the homepage.</p><p>See <a href="/industries/garage-doors">garage door website design</a> and <a href="/blog/garage-door-website-cost">garage door website cost</a>; published plans stay on <a href="/pricing">/pricing</a>.</p>`,
    journeyH2: "Stuck-open emergency vs shopping a new insulated door",
    journeyHtml: `<p>The stuck-open journey is phone-first: same-day honesty, spring vs opener clarity, and a number large enough to hit from the driveway. The remodel journey is measure-first: door size, material interest, authorized brands, and a calm appointment ask. If your site mixes them, the emergency caller scrolls past upsells while the shopper feels rushed.</p><ul><li>Spring / cable emergencies: phone, same-day only if true</li><li>Opener issues: diagnose vs replace paths if you offer both</li><li>New doors: measure visit, authorized brands only</li></ul><p>Preview the homepage free in 2 business days—no card—at <a href="/contact">/contact</a>.</p>`,
    formH2: "Garage door measure fields vs repair call CTAs",
    formHtml: `<p>Repair pages: tap-to-call primary. Backup form—name, phone, symptom (won’t open / stuck open / opener noise), city. Do not require brand model numbers before someone can dial about a door on the driveway.</p><p>New-door measure forms: name, phone, city, single or double, material if known (steel, wood, glass), and rough opening notes if they have them. Optional photo of the current door. That is enough to schedule a measure—not a full engineering worksheet.</p><p>Only list brands on the form or page that you can order. After submit, say when the office confirms the measure window. Build against Website 5 / Lead System 10 / Plus 20 EN+ES / Own It 10 ceilings on <a href="/pricing">/pricing</a>.</p>`,
    extraFaqs: [
      { q: "Should I advertise same-day spring repair if I only cover certain ZIPs?", a: "Say same-day only where you can keep the promise, and list the area clearly. Overpromising outside your route creates no-shows and bad reviews." },
      { q: "What belongs on a new garage door measure form?", a: "Name, phone, city, single or double, material if known, and optional photo of the current door. Save deep brand configuration for the measure visit." },
      { q: "Can I list every garage door brand on my site?", a: "List only brands you are authorized to sell and service. Logos you cannot order waste trust when the appointment turns into “we’ll see.”" }
    ],
    proofHtml: `<p>When a live garage-door client site is annotated on the hub, we call out spring vs new-door splits and measure CTAs. Until then, use the service list above and a free homepage preview.</p>`,
  },
  {
    slug: "painting",
    postSlug: "painting-website-pages",
    noun: "painting contractor",
    article: "a",
    specificH2: "Painting-Specific Service Pages",
    pagesFaqAnswer: "Home; interior; exterior; cabinets if you sell them; service area; about; reviews; contact with a short estimate form. Prefer real room photos over stock. Avoid thin city doorway pages.",
    leadFocus: "Interior rooms, exterior siding, and cabinets sell on different proof. Separate the pages, decide when a walkthrough beats a photo quote, and show real rooms instead of stock white sofas.",
    servicesHtml: `<p>Painting websites collapse when interior, exterior, and cabinet work share one “we paint everything” page. Exterior buyers need weather windows, siding notes, and prep honesty (scrape, caulk, prime). Cabinet buyers need hinge and edge close-ups. Interior buyers need room counts without a twenty-field novel. Separate the pages so each shopper sees the right proof first.</p><p>Use <strong>real room photos</strong> from jobs you finished—corners, trim lines, cabinet doors—not stock living rooms. Exterior pages should set season expectations. Cabinet pages should show the finish system you actually use. Interior pages can invite photo estimates when you use them, with a clear note that final price may still need a walkthrough.</p><p>Secondary pages for decks, fences, or commercial only earn a URL when those jobs show on the board. Service-area honesty matters for multi-day crews. Tie layout examples to <a href="/industries/painting">painting website design</a> and plan choices to <a href="/blog/painting-website-cost">painting website cost</a> and <a href="/pricing">/pricing</a>.</p><p>Ship interior, exterior, and cabinets (if you sell them) before blog paint tips. Plan ceilings: Website up to 5, Lead System up to 10, Plus up to 20 EN+ES, Own It up to 10.</p>`,
    journeyH2: "Walkthrough vs photo quote: painting journeys that match how you sell",
    journeyHtml: `<p>Some painters triage with photos and confirm on site. Others will not price exterior or cabinets without a walkthrough. Your site should say which journey you use—not leave homeowners guessing why a “instant quote” button still requires a visit.</p><p>Interior multi-room jobs often start with room/surface notes and optional photos. Exterior usually needs a walkthrough for prep surprises. Cabinets often need door/drawer counts and close-ups. Do not force a cabinet lead through a whole-house exterior form.</p><ul><li>Interior: rooms/surfaces, optional photos</li><li>Exterior: season + prep expectations, walkthrough when required</li><li>Cabinets: close-up proof, door/drawer counts</li></ul><p>Free homepage preview in 2 business days, no card: <a href="/contact">/contact</a>.</p>`,
    formH2: "Painting estimate forms: rooms, surfaces, optional photos",
    formHtml: `<p>Keep the first estimate form short: name, phone, job type (interior / exterior / cabinets), rough room or surface count, city, and optional photos. Say in one sentence when photos are enough to triage and when a walkthrough is still required for final pricing.</p><p>Exterior forms can add siding type if known. Cabinet forms can ask approximate door/drawer count. Do not demand brand-of-paint essays or full floor plans on first contact. After submit, explain the next step—photo review call vs scheduled walkthrough—and keep that promise.</p><p>Build these three money forms before secondary offer pages. Compare Website $97/mo, Lead System $197/mo, Plus $297/mo, and Own It $1,497 on <a href="/pricing">/pricing</a>.</p>`,
    extraFaqs: [
      { q: "Can homeowners get a final paint price from photos alone?", a: "Photos help triage and rough ranges. Say clearly when a walkthrough is still required—especially exterior prep and cabinet condition—so nobody expects a locked number from a phone camera." },
      { q: "Should exterior painting pages mention season and prep?", a: "Yes. Weather windows and scrape/prime expectations prevent “why aren’t you here tomorrow” calls and wasted estimate visits." },
      { q: "Do cabinets need their own page on a painting website?", a: "If you sell cabinet refinishing, yes. Proof and scope differ from wall paint. Mixing them into a whole-house page creates mismatched leads." }
    ],
    proofHtml: `<p>When a live painting client site is annotated on the hub, we highlight real-room proof and interior/exterior/cabinet splits. Until then, use the service list above and a free homepage preview.</p>`,
  },
  {
    slug: "remodeling",
    postSlug: "remodeling-website-pages",
    noun: "remodeling contractor",
    article: "a",
    specificH2: "Remodeling-Specific Service Pages",
    pagesFaqAnswer: "Home with finished rooms above the fold; kitchen and bath project pages; process notes; service area; about; reviews; consult-focused contact. Skip emergency CALL NOW patterns and thin city doorways. No invented floor prices.",
    leadFocus: "Kitchen and bath shoppers are months into ideas. Lead with finished rooms above the fold and a consult path—not a red CALL NOW banner copied from emergency trades. Show process, not fake floor prices.",
    servicesHtml: `<p>Remodeling sites should feel like a studio that finishes rooms—not a tow truck. Homeowners shopping kitchens and baths want finished projects above the fold, a calm consult ask, and process steps they can trust. A giant emergency CTA borrowed from a plumber template signals the wrong sales cycle and burns estimator time on tire-kickers.</p><p>Give <strong>kitchens</strong> and <strong>baths</strong> their own pages when both are major revenue. Add other remodel types only when you sell them often. Show real finished rooms—yours—before stock mood boards. A short process note (consult → selections → build → walkthrough) calms shoppers more than invented “kitchens from $X” banners that collapse on the first site visit.</p><p>Permit and change-order language can live in process or FAQ copy: selections and hidden conditions may adjust price, and you document changes in writing. Keep the homepage about rooms and the consult. Minor repair or handyman work, if you still offer it, needs a separate quieter path so faucet leaks do not enter the kitchen design pipeline.</p><p>See <a href="/industries/remodeling">remodeling website design</a>, <a href="/blog/remodeling-website-cost">remodeling website cost</a>, and <a href="/pricing">/pricing</a> for Website $97/mo, Lead System $197/mo, Plus $297/mo, and Own It $1,497.</p>`,
    journeyH2: "Consult-first remodeling journeys—not emergency CALL NOW",
    journeyHtml: `<p>Kitchen and bath buyers are rarely same-hour panic calls. Their journey is multi-visit: browse finished rooms, request a consult, walk the house, select finishes, then build. Your CTAs should match that rhythm. “Request a consult” beats “CALL NOW.” Instant-quote forms that demand a budget on first click either scare people off or collect fantasy numbers.</p><p>Lead the homepage with finished rooms you actually built. Keep process visible without turning the first screen into a legal memo. Separate minor repair work if you still offer it so the journeys do not collide.</p><ul><li>Portfolio + consult as the primary path</li><li>Kitchen and bath pages with project proof</li><li>Repair/handyman separated if still offered</li></ul><p>Preview a consult-first homepage free in 2 business days at <a href="/contact">/contact</a>—no card.</p>`,
    formH2: "Remodeling consult forms: project type, not a fake price",
    formHtml: `<p>Ask for name, phone, project type (kitchen / bath / other), city, and a short note on timing. Optional: a few photos of the current space. Do not require a budget number on first click if you sell consults—that field collects fiction and scares serious shoppers.</p><p>Button labels should sound like your sales process: “Request a kitchen consult,” not “Get instant pricing.” After submit, say when a project manager calls and what the first visit covers. Skip thank-you pages that promise a firm number before anyone has walked the house.</p><p>Spend page budget on kitchen, bath, and contact before secondary idea blogs. Plan ceilings remain Website 5 / Lead System 10 / Plus 20 EN+ES / Own It 10 on <a href="/pricing">/pricing</a>.</p>`,
    extraFaqs: [
      { q: "Should a remodeling homepage use a red CALL NOW button?", a: "Usually no. Remodeling is a consult sale. Lead with finished rooms and “request a consult.” Panic CTAs copied from emergency trades attract the wrong leads." },
      { q: "Can my remodeling site show “kitchens starting at” prices?", a: "Avoid fake floor prices. Ranges without scope create angry first meetings. Invite a consult and show finished projects instead." },
      { q: "What should a remodeling consult form ask on first contact?", a: "Name, phone, project type (kitchen/bath/other), city, and rough timing. Optional current-space photos. Skip mandatory budget fields that collect fiction." }
    ],
    proofHtml: `<p>When a live remodeling client site is annotated on the hub, we call out finished-room heroes and consult CTAs. Until then, use the service list above and a free homepage preview.</p>`,
  },
  {
    slug: "landscaping",
    postSlug: "landscaping-website-pages",
    noun: "landscaping",
    article: "a",
    specificH2: "Landscaping-Specific Service Pages",
    pagesFaqAnswer: "Home; maintenance/route pages; design-build or hardscape project pages; seasonal cleanup when you run it; honest service area; about; reviews; contact with ZIP + offer type. Avoid thin city doorway pages.",
    leadFocus: "Weekly mow customers want ZIP and a start-service path. Design-build buyers want portfolio photos and a consult. Split maintenance from projects so route leads are not forced into a patio pitch—and show how A1 keeps those paths distinct.",
    servicesHtml: `<p>Landscaping companies often run two offers that share one crew: recurring maintenance routes and design-build projects. A homeowner joining a mow route wants geography honesty, frequency, and a simple signup. A patio or planting redesign buyer wants real yard photos, process patience, and a consult. Forcing both through one “landscaping services” page creates junk leads even when the site looks polished.</p><p>Split <strong>lawn / landscape maintenance</strong> from <strong>design-build / hardscape projects</strong>. Seasonal cleanups can take a short offer path with ZIP and preferred week. Drainage or planting specialty pages belong only when you sell them. Real before/after yard photos beat stock topiary every time.</p><p>Lead the homepage with whichever offer pays most weeks, but keep the other findable. Route cash flow and project deposits behave differently; CTAs should too. Service-area pages should name the counties or towns you actually crew—not a fantasy radius for SEO.</p><p>Hub layout and live proof: <a href="/industries/landscaping">landscaping website design</a>. Cost and plans: <a href="/blog/landscaping-website-cost">landscaping website cost</a>, <a href="/pricing">/pricing</a> (Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497).</p>`,
    journeyH2: "Route signup vs design-build consult: landscaping journeys",
    journeyHtml: `<p>Route customers want a fast “start service” path and honest geography. Design-build buyers want galleries, process steps, and a consult—not a same-day panic button. If maintenance pays the bills, lead with route signup. If hardscape carries the margin, lead with projects and keep maintenance secondary but clear.</p><p>Mixing patio dreams into a mow form—or forcing project shoppers through a weekly-frequency dropdown—creates leads you cannot schedule cleanly. Separate the next steps even when the crew overlaps.</p><ul><li>Maintenance: ZIP, frequency, lot notes</li><li>Projects: photo proof, consult request, rough scope</li><li>Seasonal cleanups: short offer pages in season</li></ul><p>Free homepage preview in 2 business days, no card: <a href="/contact">/contact</a>.</p>`,
    formH2: "Landscaping forms: ZIP + offer type on first ask",
    formHtml: `<p>Every serious landscaping form should capture <strong>ZIP</strong> and <strong>offer type</strong> (weekly/biweekly maintenance, cleanup, design-build consult) before anything else. That pair lets dispatch accept, decline, or route the lead without a long phone interview.</p><p>Maintenance forms add frequency and optional lot size notes. Project consult forms add rough scope and optional photos of the yard. Do not make a mow lead upload a patio Pinterest board, and do not make a hardscape shopper pick a mow day.</p><p>After submit, say how soon someone confirms route fit or consult timing. Build maintenance and project pages first against plan ceilings on <a href="/pricing">/pricing</a>.</p>`,
    extraFaqs: [
      { q: "Should my landscaping homepage push patio builds if most revenue is mow routes?", a: "Lead with what you book most weeks. Keep design-build visible, but do not bury route signup under a project brochure if maintenance pays the bills." },
      { q: "Why ask for ZIP and offer type on the first landscaping form?", a: "ZIP proves the lead is in your real route geography. Offer type (maintenance vs project vs cleanup) routes the lead to the right follow-up instead of a one-size form." },
      { q: "Do recurring maintenance and design-build need different pages?", a: "Yes. Route signups and project consults need different proof and fields. One shared landscaping blob creates leads you cannot schedule cleanly." }
    ],
    proofHtml: `<p><strong>A1 Property Services</strong> is a live landscaping client site (Cedar Falls, Iowa). The homepage leads with a place-first hero and free-quote CTA, keeps lawn care separated from hardscape projects, shows before/after sliders of real jobs, and names a Black Hawk County service area instead of a vague radius. Owner Mac Christensen’s review sits with other client proof on the site. See the annotated homepage on the <a href="/industries/landscaping">landscaping industry hub</a>.</p>`,
  },
  {
    slug: "pool-care",
    postSlug: "pool-service-website-pages",
    noun: "pool service",
    article: "a",
    specificH2: "Pool Service-Specific Service Pages",
    pagesFaqAnswer: "Home; weekly route/care signup; equipment repair when you offer it; seasonal open/close; service area; about; reviews; contact. Green-pool paths stay phone-led. Avoid thin city doorway pages.",
    leadFocus: "A green pool wants the phone today. A clean pool shopping for a route wants ZIP, preferred day, and whether it is swimmable. Keep repair panic and membership signup from stepping on each other.",
    servicesHtml: `<p>Pool service sites fail when membership brochures bury the panic path. A swamp-green pool in August is not reading chemistry PDFs. That homeowner needs a phone-led repair or recovery path. A sparkling pool shopping for weekly care needs ZIP, preferred service day, and a simple start-service form—not a ten-page algae essay.</p><p>Split <strong>weekly routes / chemical care</strong> from <strong>equipment repair</strong> (pumps, filters, heaters) when you sell both. Seasonal open and close deserve short offer paths in spring and fall. Name equipment brands you actually service on repair pages—not as decoration on every screen.</p><p>Route pages should ask whether the pool is currently swimmable; that one field changes truck loading and first-visit expectations. Service-area honesty matters when routes are full. Stock turquoise heroes without your trucks train the next customer to expect someone else’s crew.</p><p>See <a href="/industries/pool-care">pool service website design</a>, <a href="/blog/pool-service-website-cost">pool service website cost</a>, and <a href="/pricing">/pricing</a>.</p>`,
    journeyH2: "Green-pool phone path vs weekly route signup",
    journeyHtml: `<p>Green-pool and equipment failures are urgency journeys: phone first, short symptom, roll when you can. Route membership is a signup journey: ZIP, day preference, chemical plan details later. If the site only pushes memberships, algae emergencies leave. If it only screams emergency, clean-pool shoppers feel oversold.</p><p>In season, put both paths on the homepage. Spring open and fall close can take short blocks without burying weekly care year-round.</p><ul><li>Green / repair: phone first</li><li>Route signup: ZIP, day, swimmable?</li><li>Open/close: seasonal CTAs</li></ul><p>Free homepage preview in 2 business days, no card: <a href="/contact">/contact</a>.</p>`,
    formH2: "Pool forms: ZIP, preferred day, and swimmable status",
    formHtml: `<p>Route signup forms: name, phone, <strong>ZIP</strong>, <strong>preferred day</strong>, and whether the pool is currently <strong>swimmable</strong>. That trio prevents mystery first visits. Chemical plan upsells can wait until after you confirm route fit.</p><p>Green-pool and repair pages: phone primary; backup form with name, phone, ZIP, short symptom (green / pump down / heater). Do not force algae emergencies through a membership questionnaire.</p><p>After submit, say when dispatch confirms the day. Build route and repair pages first under plan ceilings on <a href="/pricing">/pricing</a> (Website $97/mo up to 5 pages, Lead System $197/mo up to 10, Plus $297/mo up to 20 EN+ES, Own It $1,497 up to 10).</p>`,
    extraFaqs: [
      { q: "Should a green-pool emergency use the same form as weekly route signup?", a: "No. Green pools need a phone-first path. Route signup needs ZIP, preferred day, and swimmable status. Mixing them slows algae response and messes up membership dispatch." },
      { q: "Why ask if the pool is swimmable on a signup form?", a: "Swimmable vs green changes chemicals, time on site, and first-visit expectations. One checkbox saves a wasted stop and an awkward surprise for the tech." },
      { q: "Do pool opening and closing need their own pages?", a: "Short seasonal paths in spring and fall convert better than burying open/close inside a generic membership page all year." }
    ],
    proofHtml: `<p>When a live pool-service client site is annotated on the hub, we mark route vs repair splits and seasonal offers. Until then, use the service list above and a free homepage preview.</p>`,
  },
  {
    slug: "pressure-washing",
    postSlug: "pressure-washing-website-pages",
    noun: "pressure washing",
    article: "a",
    specificH2: "Pressure Washing-Specific Service Pages",
    pagesFaqAnswer: "Home; house/siding wash; concrete/driveways; roof algae when you offer it; before/after proof; service area; about; reviews; contact with surface + photo quote fields. Avoid thin city doorway pages.",
    leadFocus: "House wash, concrete, and roof algae are different methods and different quote questions. Separate surfaces, be honest about soft wash, and let before/after pairs sell what adjectives cannot.",
    servicesHtml: `<p>Pressure washing sites lose trust when every surface shares one “we blast everything” line. Soft wash on painted siding is not the same job as cleaning oil off a driveway. Roof algae has safety and method limits homeowners deserve to know before the truck arrives. List the surfaces you actually clean, with soft-wash notes where high pressure would damage paint or shingles.</p><p>Publish paths for <strong>house / siding</strong>, <strong>concrete and driveways</strong>, and <strong>roof algae</strong> when those are major revenue. Fences, decks, and fleets can follow. Before/after pairs of mildew on vinyl, oil on concrete, and black streaks on a roof do more selling than adjectives. Stock “clean driveway” art does not replace your jobs.</p><p>Quote forms should capture surface type and ZIP early so you are not driving across town for a mystery lead. Miracle stain promises create reviews you will hate. Tie examples to <a href="/industries/pressure-washing">pressure washing website design</a> and plans to <a href="/blog/pressure-washing-website-cost">pressure washing website cost</a> and <a href="/pricing">/pricing</a>.</p><p>Ship the surfaces that pay first under Website 5 / Lead System 10 / Plus 20 EN+ES / Own It 10 ceilings.</p>`,
    journeyH2: "Quote-from-photos journeys by surface",
    journeyHtml: `<p>Most pressure washing buyers can start from photos: green siding, stained concrete, streaked roof. Your journey should invite those photos after surface type is chosen—not ask for a novel first. Soft-wash honesty belongs in the journey copy so nobody expects a blast pressure job on delicate paint.</p><p>House wash, concrete, and roof algae should not share one vague next step. Different surfaces need different proof and different expectation setting before you roll.</p><ul><li>House / siding: soft-wash notes when needed</li><li>Concrete / driveways: stain expectations, not miracles</li><li>Roof algae: method honesty, safety limits</li></ul><p>See a free homepage preview in 2 business days at <a href="/contact">/contact</a>—no card.</p>`,
    formH2: "Pressure washing quote forms: surface dropdown + photos",
    formHtml: `<p>Required early: name, phone, <strong>surface type</strong> (house, concrete, roof, fence, other), ZIP, and optional photos. A surface dropdown alone cuts half the mystery. Photos of the dirty area help you quote without a wasted windshield survey when that is how you sell.</p><p>Say when photos are enough for a range and when a site visit is still required—especially roofs. Soft-wash vs high-pressure can be a short note under the surface field, not a separate essay. After submit, confirm when someone replies with the quote window.</p><p>Build house, concrete, and roof forms before secondary surfaces. Plans: <a href="/pricing">/pricing</a>.</p>`,
    extraFaqs: [
      { q: "Should my pressure washing site claim high pressure works on every surface?", a: "No. Call out soft wash for siding or roofs when that is the safe method. Pretending every job is a blast creates damage risk and bad reviews." },
      { q: "Why put a surface dropdown on the quote form?", a: "House, concrete, and roof algae need different methods and proof. A required surface field stops mystery leads and awkward day-of surprises." },
      { q: "Are before/after photos worth separate gallery space?", a: "Yes for the surfaces you sell most. Phone shoppers decide fast from mildew and oil-stain pairs. Stock clean-driveway art does not replace your jobs." }
    ],
    proofHtml: `<p>When a live pressure-washing client site is annotated on the hub, we highlight surface splits and before/after pairs. Until then, use the service list above and a free homepage preview.</p>`,
  },
  {
    slug: "window-cleaning",
    postSlug: "window-cleaning-website-pages",
    noun: "window cleaning",
    article: "a",
    specificH2: "Window Cleaning-Specific Service Pages",
    pagesFaqAnswer: "Home; residential window cleaning with recurring options; commercial/storefront when you offer it; service area; about; reviews; contact forms with pane count/frequency (homes) or schedule/access (stores). Avoid thin city doorway pages.",
    leadFocus: "Homes want pane counts and recurring frequency. Storefronts want open-hour schedules that do not block the door. Split residential and commercial glass so neither journey borrows the other’s form.",
    servicesHtml: `<p>Window cleaning companies book two different customers. Homeowners often want a recurring clean—monthly, quarterly, or spring/fall—with a rough pane or window count and story notes. Storefront managers want glass done before open, side-door access notes, and invoices that match a business name. One “windows cleaned cheap” page frustrates both and creates no-show quotes.</p><p>Split <strong>residential</strong> and <strong>commercial / storefront</strong> pages when you sell both. Recurring should feel like the normal next step on residential paths, with one-time spring cleans as an alternate. Commercial pages should state open-hour constraints you can keep—before-open only, weekends, after close—not vague “we work around you” promises.</p><p>Proof is streak-free close-ups and real storefronts you service—not stock sparkle overlays. Interior/exterior pane notes and screen handling belong in FAQs when they remove objections. See <a href="/industries/window-cleaning">window cleaning website design</a>, <a href="/blog/window-cleaning-website-cost">window cleaning website cost</a>, and <a href="/pricing">/pricing</a>.</p><p>Ship residential and commercial (if real) before tip blogs. Plan ceilings: Website 5 / Lead System 10 / Plus 20 EN+ES / Own It 10.</p>`,
    journeyH2: "Recurring home glass vs storefront open-hour schedules",
    journeyHtml: `<p>A homeowner booking every other month is not a cafe manager who needs glass done before the breakfast rush. Residential journeys should ask frequency and rough pane counts, then offer recurring as the default CTA. Commercial journeys should lead with schedule reliability and access needs.</p><p>If you only sell residential, do not advertise storefront capability. If commercial is the margin, lead with open-hour reliability and keep residential secondary but clear.</p><ul><li>Residential: pane/story/frequency, recurring default</li><li>Storefront: open-hour constraints, access notes</li><li>One-time spring cleans: alternate path, not the only CTA</li></ul><p>Preview free in 2 business days at <a href="/contact">/contact</a>—no card.</p>`,
    formH2: "Window cleaning forms: pane count, frequency, commercial hours",
    formHtml: `<p>Residential forms: name, phone, city/ZIP, rough <strong>pane or window count</strong>, stories if relevant, and <strong>frequency</strong> (one-time, monthly, quarterly). That set prices and routes without a wasted visit when you quote from counts.</p><p>Commercial forms: business name, phone, address, preferred service window (before open / after close / weekend), and access notes. Do not reuse a homeowner frequency dropdown as the only commercial field.</p><p>After submit, say when you confirm the first clean. Build against published plans on <a href="/pricing">/pricing</a>—Website $97/mo, Lead System $197/mo, Plus $297/mo, Own It $1,497.</p>`,
    extraFaqs: [
      { q: "Why ask for pane count on a residential window cleaning form?", a: "Pane count or rough window totals plus stories help you price without a wasted visit. Frequency (one-time vs recurring) matters just as much for route planning." },
      { q: "What should a storefront window cleaning page say about hours?", a: "State the open-hour constraints you can keep—before open, after close, weekends. Vague “we work around you” promises create schedule fights with managers." },
      { q: "Should residential and commercial window cleaning share one page?", a: "Better as separate paths when you sell both. Homeowners and storefront managers need different fields and proof. One blob produces mismatched quotes." }
    ],
    proofHtml: `<p>When a live window-cleaning client site is annotated on the hub, we mark residential vs storefront splits and recurring CTAs. Until then, use the service list above and a free homepage preview.</p>`,
  },
  {
    slug: "yard-care",
    postSlug: "lawn-care-website-pages",
    noun: "lawn care",
    article: "a",
    specificH2: "Lawn Care-Specific Service Pages",
    pagesFaqAnswer: "Home; mow route signup with honest service area; seasonal cleanups; pet-waste only if real; about; reviews; contact with ZIP + frequency. Avoid thin city doorway pages and fantasy radii.",
    leadFocus: "Lawn care lives on honest route geography. Publish the neighborhoods you can hit, split weekly mow from seasonal cleanups, and give pet-waste its own page only when that stop is real.",
    servicesHtml: `<p>Yard and lawn care sites die by polite lies about service area. If you only cover certain ZIPs on Tuesdays, the site should say so. Weekly mow, trim, and blow is not the same offer as a one-time leaf-out cleanup. Pet-waste scooping belongs on its own page only when you really run that stop—listing it as decoration creates ugly first visits.</p><p>Publish <strong>mow route</strong> pages with clear frequency options and an honest map or town list. Give <strong>seasonal cleanups</strong> a short path in spring and fall. Aeration or dethatch can take seasonal blocks when you sell them. Photos of real lawns—edges, beds, bagged clippings—beat stock perfect turf.</p><p>Dispatch clarity is the product. A pretty lawn hero that hides your radius trains homeowners to expect a Thursday mow across town you cannot keep. See <a href="/industries/yard-care">lawn care website design</a>, <a href="/blog/lawn-care-website-cost">lawn care website cost</a>, and <a href="/pricing">/pricing</a> for Website $97/mo, Lead System $197/mo, Plus $297/mo, and Own It $1,497.</p><p>Ship route signup and cleanup before tip blogs. Plan ceilings: Website 5 / Lead System 10 / Plus 20 EN+ES / Own It 10.</p>`,
    journeyH2: "Mow route signup vs one-time cleanup journeys",
    journeyHtml: `<p>Weekly route members want ZIP, frequency, and a start date. Cleanup leads want a one-time scope and a week that works—not a membership pitch. Pet-waste, when real, is its own stop with its own expectations. Keep those journeys from sharing one “full service yard” button.</p><p>Lead with route signup if that is the business. Keep cleanup visible in season. Decline outside-area ZIPs early instead of promising and ghosting.</p><ul><li>Weekly/biweekly mow: ZIP + frequency</li><li>Seasonal cleanup: one-time path</li><li>Pet-waste: only if you actually offer it</li></ul><p>Get a free homepage preview in 2 business days—no card—at <a href="/contact">/contact</a>.</p>`,
    formH2: "Lawn care forms: ZIP and frequency before “book now”",
    formHtml: `<p>Route signup must require <strong>ZIP</strong> and <strong>frequency</strong> (weekly, biweekly, other) before a soft “book now.” Those fields let you accept or decline before you promise a day across town. Optional: lot size notes and gate codes after you confirm fit.</p><p>Cleanup forms: name, phone, ZIP, preferred week, short scope (leaves, beds, haul-away). Pet-waste forms—only if real—need ZIP, pet count if useful, and frequency. Do not hide scoop service inside a mow form checkbox if you do not run it.</p><p>After submit, say how soon dispatch confirms the route day. Compare plans on <a href="/pricing">/pricing</a>; start with a free preview via <a href="/contact">/contact</a>.</p>`,
    extraFaqs: [
      { q: "Why require ZIP on a lawn care signup form?", a: "Route geography is the business. ZIP and frequency let you accept or decline before you promise a Thursday mow you cannot keep." },
      { q: "Should I list pet-waste removal if I only mow and trim?", a: "No. Only list scoop service you actually run. Fake extras create bad first visits and reviews." },
      { q: "Do one-time yard cleanups need a different path than weekly mowing?", a: "Yes. Cleanup leads and weekly route members schedule differently. Separate CTAs keep dispatch from treating a leaf-out job like a recurring mow." }
    ],
    proofHtml: `<p>When a live lawn-care client site is annotated on the hub, we call out honest service-area maps and ZIP/frequency signup. Until then, use the service list above and a free homepage preview.</p>`,
  }];

/** Generated English bodies keyed by blog slug. */
export const GENERATED_PAGES_POSTS: Record<string, PagesPostBody> = Object.fromEntries(
  PAGES_TRADE_SPECS.map((spec) => [spec.postSlug, buildPagesPostBody(spec)]),
);
