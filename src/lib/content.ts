export type QA = { q: string; a: string };
export const FAQS: QA[] = [
  { q: "Is this right for my kind of business?", a: "We work with independent trades and local service businesses across the United States, including plumbing, HVAC, electrical, landscaping, roofing, and remodeling. If people search for your service and call when they need help, these plans are built for that kind of business." },
  { q: "What does it cost?", a: "There are four choices: Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for a one-time $1,497. You can see a free homepage preview before choosing. No card is required and there’s no obligation." },
  { q: "How does billing work?", a: "The monthly plans have $0 down and a 3-month minimum from the launch date. After that, they continue month-to-month, with your price locked for 24 months. Own It is a single payment with no monthly plan or minimum." },
  { q: "Who owns the site?", a: "With Own It, the site files belong to you from launch day. On a monthly plan, Kinexis hosts and manages the site while your plan is active. If you later want to move it elsewhere, ask us to provide the buyout terms in writing." },
  { q: "What does the 60-day guarantee cover?", a: "Lead System and Plus include the 60-day lead guarantee. If you receive zero tracked leads during your first 60 days live, we waive the 3rd and 4th monthly charges and remove the minimum. It’s limited to one guarantee per business, and Own It is not included." },
  { q: "When will my site go live?", a: "We start with your free homepage preview. Once you approve it and send the content we need, we’ll confirm the launch date in writing. Texting features begin after carrier approval, which typically takes 10–15 days." },
  { q: "Will Google be able to find my site?", a: "Every site has a clean structure, fast pages, and the basic setup Google needs to read it. Ongoing SEO work is not part of the four plans, but we can quote that separately if you want it." },
  { q: "What about photos and video?", a: "We can build with photos you already have, or quote photography and video separately. We won’t use stock photos of someone else’s work and present them as yours." },
  { q: "Who writes the text?", a: "We can work with copy you already have or quote the writing separately. For the free preview, we use realistic text for your trade so you can judge the design before making a decision." },
];
export const WEB_FAQS: QA[] = [
  { q: "Can you build for my service area?", a: "Yes. We work with service businesses across the United States and name the cities you actually serve. We don’t make copies of the same page for every city in the country." },
  { q: "What pages and features will I get?", a: "Your site includes a homepage, pages for the services you want calls for, and a simple way to phone you or send details for an estimate. It also has clear titles, organized headings, fast pages, and a structure Google can read. You see the homepage before paying." },
  { q: "Does the plan cover ongoing SEO?", a: "The site is set up so search engines can read it. Ongoing monthly SEO is quoted separately and is not included in the four website plans." },
  { q: "What are the website prices?", a: "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is a one-time $1,497. Every option begins with a free homepage preview, with no card and no obligation." },
];
export const SEO_FAQS: QA[] = [
  { q: "When should I expect SEO progress?", a: "SEO is long-term work. Technical fixes may show movement within a few weeks, while meaningful gains in positions and traffic often take three to six months or longer. Competition and your starting point both matter." },
  { q: "Will you promise the top spot on Google?", a: "No. An agency does not control Google’s results, so a responsible one cannot promise first place. We work on the factors that improve visibility and report impressions, clicks, and leads so you can follow the progress." },
  { q: "What do you check in an SEO audit?", a: "We review technical health, indexing, page speed, mobile use, titles, headings, content gaps, and internal links. Then we organize the recommended fixes by priority." },
  { q: "Can you improve the website I already have?", a: "Yes. We can work on your current site or recommend a rebuild if its platform is getting in the way." },
  { q: "What will you measure?", a: "We track impressions, clicks, search positions, and leads through Google Search Console and analytics, then share the results on a clear schedule." },
];
export const STEPS = [
  { tab: "Preview", title: "Start with a free preview", text: "We put together a homepage concept for your trade. You can review it before paying, with no card and no obligation." },
  { tab: "Plan", title: "Pick the plan that fits", text: "Choose Website, Lead System, Plus, or Own It. We’ll confirm what’s included and put your launch date in writing." },
  { tab: "Build", title: "We finish the full site", text: "We add your services, service area, photos, and copy, connect the domain, and send everything to you for approval." },
  { tab: "Launch", title: "Your site goes live", text: "We publish the site. Text-back and review requests begin after carrier approval, typically within 10–15 days." },
  { tab: "Grow", title: "We keep things current", text: "We make edits, track calls and forms, and send review requests after each job. Your leads are shown in one report." },
];
export const UPGRADES = [
  ["Extra Page", "Add a service, location or landing page to any Website, Lead System or Plus plan.", "$99 each"],
  ["Site Care", "Keep an Own It site hosted, secure and updated with 30 minutes of edits each month.", "$39 / mo"],
  ["Missed-Call Text-Back", "Add text-back to an Own It site after carrier approval, usually within 10 to 15 days.", "$97 / mo"],
  ["New Pages on Own It", "Add new pages to an Own It site with a written quote provided before any work begins.", "Quoted"],
];

export type Plan = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  suffix: string;
  kicker: string;
  note: string;
  features: [string, string][];
  popular?: boolean;
  guarantee?: boolean;
  cta: string;
};

export const PLANS: Plan[] = [
  {
    slug: "website",
    name: "Website",
    tagline: "A professional home for your business.",
    price: "$97",
    suffix: "/mo",
    kicker: "$0 down, then",
    note: "3-month minimum, then month-to-month",
    features: [
      ["Mobile website", "Up to 5 pages"],
      ["Hosting + SSL", "Security and backups included"],
      ["Small edits*", "Up to 2 a month, in 2 business days"],
      ["Form-lead tracking", "Know when a quote form comes in"],
      ["New pages", "$99 each"],
    ],
    cta: "Website",
  },
  {
    slug: "lead-system",
    name: "Lead System",
    tagline: "Your website + the tools that bring calls.",
    price: "$197",
    suffix: "/mo",
    kicker: "$0 down, then",
    note: "3-month minimum, then month-to-month",
    features: [
      ["Mobile website", "Up to 10 pages, hosting + backups"],
      ["Missed-call text-back**", "On your tracking number"],
      ["Google review requests", "After every job"],
      ["Google profile tune-up", "At launch"],
      ["Call tracking + report", "One monthly report"],
      ["Unlimited small edits*", "In 1 business day"],
      ["New pages", "1 a month included"],
    ],
    popular: true,
    guarantee: true,
    cta: "Lead System",
  },
  {
    slug: "plus",
    name: "Plus (Bilingual)",
    tagline: "Reach customers in English and Spanish.",
    price: "$297",
    suffix: "/mo",
    kicker: "$0 down, then",
    note: "3-month minimum, then month-to-month",
    features: [
      ["Bilingual website", "Up to 20 pages, English + Spanish"],
      ["Missed-call text-back**", "English + Spanish"],
      ["Google review requests", "English + Spanish"],
      ["Google profile tune-up", "+ 2 posts a month"],
      ["Call tracking + report", "One monthly report"],
      ["Unlimited small edits*", "Same business day by noon CT"],
      ["New pages", "2 a month included"],
    ],
    guarantee: true,
    cta: "Plus",
  },
  {
    slug: "own-it",
    name: "Own It",
    tagline: "One payment. A website you own.",
    price: "$1,497",
    suffix: "one-time",
    kicker: "One payment",
    note: "Paid when you approve your preview · no minimum · no lead guarantee",
    features: [
      ["Mobile website", "Up to 10 pages"],
      ["Site files yours", "From launch day"],
      ["Hosting + SSL", "12 months included"],
      ["Small edits*", "12 months, up to 30 min a month"],
      ["Domain", "First year included"],
      ["No minimum", "No monthly plan"],
    ],
    cta: "Own It",
  },
];

export const PLAN_TERMS = [
  "Every plan starts with a free homepage preview. No card and no obligation.",
  "Monthly plans are $0 down with a 3-month minimum from launch, then month-to-month.",
  "Your monthly price is locked for 24 months from launch; after that we will give you at least 30 days’ notice of any change.",
  "Cancel after the minimum by text, email or Messenger. No long contract and no cancellation fee.",
  "Text-back and review-request texting start after carrier approval, typically 10–15 days. Carrier approval is not guaranteed.",
  "Lead System and Plus include the 60-day lead guarantee. Own It does not.",
  "A tracked lead is a call of 30+ seconds, a missed caller who replies to the text-back, or a real quote form. Spam, wrong numbers, job applicants and existing customers do not count.",
  "The 60-day lead guarantee is limited to one per business and applies only while the account is in good standing.",
  "A small edit is a change that takes 30 minutes or less. Requests are handled one at a time.",
  "On Own It, small edits are done within 2 business days and unused time does not roll over. After 12 months, optional Site Care is $39/mo for hosting and up to 30 minutes of edits a month.",
  "Later domain renewals are billed at cost, new pages on Own It are quoted in writing, and prices exclude tax, if any.",
];
export const POSTS = [
  {
    slug: "website-mistakes-that-cost-you-calls",
    category: "Tips",
    title: "Website Mistakes That Cost You Calls",
    seoTitle: "Website Mistakes That Cost Service Businesses Calls",
    excerpt: "A service website should make the next step obvious. These common problems create hesitation, missed calls, and abandoned quote forms.",
    image: "/blog/website-mistakes-that-cost-you-calls.webp",
    width: 1200,
    height: 768,
    date: "2026-01-15",
    readTime: "2 min read",
  },
  {
    slug: "turn-clicks-into-calls",
    category: "Tips",
    title: "Turn Clicks Into Calls",
    seoTitle: "How to Turn Website Visitors Into Phone Calls",
    excerpt: "More visits do not automatically mean more work. Make the phone number, service details, and quote path easy to use.",
    image: "/blog/turn-clicks-into-calls.webp",
    width: 1200,
    height: 772,
    date: "2026-02-10",
    readTime: "2 min read",
  },
  {
    slug: "small-business-marketing-budget",
    category: "Tips",
    title: "Small Business Marketing Budget: Where to Spend",
    seoTitle: "Small Business Marketing Budget for Service Companies",
    excerpt: "Build the website and follow-up first, then add search work, pages, or ads when the business is ready for them.",
    image: "/blog/small-business-marketing-budget.webp",
    width: 1200,
    height: 769,
    date: "2026-03-05",
    readTime: "2 min read",
  },
  {
    slug: "make-your-website-mobile-ready",
    category: "Design",
    title: "Make Your Website Mobile Ready",
    seoTitle: "Make a Service Business Website Mobile Ready",
    excerpt: "Check the phone number, form, page order, and load time where customers are most likely to use the site: on a phone.",
    image: "/blog/make-your-website-mobile-ready.webp",
    width: 1200,
    height: 769,
    date: "2026-03-28",
    readTime: "2 min read",
  },
  {
    slug: "local-seo-get-found-get-called",
    category: "SEO",
    title: "Local SEO That Connects Searches to Calls",
    seoTitle: "Local SEO for Service Businesses Across the US",
    excerpt: "Use honest service areas, useful service pages, and consistent business details to help Google and customers understand the business.",
    image: "/blog/get-found-and-calls-from-google-new.webp",
    width: 1567,
    height: 1004,
    date: "2026-04-18",
    readTime: "2 min read",
  },
  {
    slug: "build-trust-with-reviews",
    category: "Tips",
    title: "Build Trust With Reviews",
    seoTitle: "How Service Businesses Get More Google Reviews",
    excerpt: "A steady review process helps future customers judge your business. Learn when to ask, how to make it easy, and what not to do.",
    image: "/blog/build-trust-with-reviews.webp",
    width: 1200,
    height: 769,
    date: "2026-05-12",
    readTime: "2 min read",
  },
];
export const REVIEWS: { quote: string; name: string; company: string }[] = [
  {
    quote: "Kinexis has grown our business. From the content to the look of the page, we have seen a real increase in enquiries. The team is responsive and helps us at every turn, and the monthly report keeps us focused on what is working.",
    name: "Jeremy Main",
    company: "Pink Pro Wash - Detroit, MI",
  },
  {
    quote: "Kinexis is the best website provider we have worked with. Our site looks professional, loads quickly and the content is worded and optimized for search. We highly recommend the team if you want a site that actually brings in work.",
    name: "Isfel Yrra",
    company: "Xterior Xperts - Houston, TX",
  },
];
export const COMPARE_ROWS: [string, boolean, boolean][] = [
  ["Free homepage preview before you pay", false, false], ["Missed-call texts and review requests", false, false],
  ["Hosting and updates handled", false, true], ["Monthly payments, no long contract", true, false],
  ["English and Spanish sites", false, true],
];
