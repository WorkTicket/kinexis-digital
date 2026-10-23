export type QA = { q: string; a: string };
export const FAQS: QA[] = [
  { q: "Who do you work with?", a: "Independent trades and local service businesses across the United States: plumbing, HVAC, electrical, landscaping, roofing, remodeling and similar. If your customers find you on Google and call you when something needs fixing, the plans are built for you." },
  { q: "How much will my website cost?", a: "Four plans: Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for a one-time $1,497. Every plan starts with a free homepage preview, no card and no obligation." },
  { q: "How does pricing work?", a: "Monthly plans are $0 down with a 3-month minimum from launch, then month-to-month. Your price is locked for 24 months. Own It is one payment with no monthly plan and no minimum." },
  { q: "Do I own the website?", a: "On Own It, the site files are yours from launch. On the monthly plans, Kinexis hosts and manages the site for as long as you stay on the plan. Ask us for buyout terms in writing if you want to take the site elsewhere." },
  { q: "Do you offer a guarantee?", a: "Lead System and Plus include the 60-day lead guarantee: if you have zero tracked leads in your first 60 days live, we waive your 3rd and 4th monthly charges and drop the minimum. One guarantee per business. Own It does not include a lead guarantee." },
  { q: "How long will it take to build?", a: "Your free homepage preview comes first. After you approve it and we have your content, we confirm the launch date in writing. Texting features start after carrier approval, typically 10–15 days." },
  { q: "Will my site have SEO built in?", a: "Every site is built with clean structure, fast pages and the basics Google needs. Ongoing SEO is not included in the four plans; we will quote it separately if you want it." },
  { q: "Can you provide images?", a: "We can use your own photos, or quote photo and video work separately. We do not use stock photos of other people’s jobs and pass them off as yours." },
  { q: "Can you provide content?", a: "We can use copy you already have, or quote content writing separately. The free preview uses realistic copy for your trade so you can judge the layout before you commit." },
];
export const WEB_FAQS: QA[] = [
  { q: "Do you only build websites for one city?", a: "No. We build for service businesses across the United States. Your pages name the cities you actually serve. We do not publish a copy of the same page for every city in the country." },
  { q: "What is on the site?", a: "A homepage, the services you want calls for, a way to call or request a quote, and the basics Google needs: a clear title, headings, fast pages, and a structure a crawler can read. You see a homepage preview before you pay." },
  { q: "Is ongoing SEO included?", a: "The site is built so search engines can read it. Monthly SEO work is quoted separately. It is not bundled into the four website plans." },
  { q: "How much does a website cost?", a: "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, or Own It is $1,497 once. Every plan starts with a free homepage preview, no card and no obligation." },
];
export const SEO_FAQS: QA[] = [
  { q: "How long does SEO take to work?", a: "SEO is a long-term channel. Technical fixes can show results within weeks, but most sites see meaningful growth in rankings and traffic over three to six months or more, depending on competition and starting point." },
  { q: "Can you guarantee a number one ranking on Google?", a: "No honest agency can. Google’s results are not controlled by any agency. We focus on proven work that improves your visibility, and we report on impressions, clicks and leads so you can see progress." },
  { q: "What does an SEO audit include?", a: "We review technical health, indexing, page speed, mobile experience, on-page elements such as titles and headings, content gaps and internal linking, then give you a prioritized list of fixes." },
  { q: "Do you work with businesses that already have a website?", a: "Yes. We can improve your existing site, or rebuild it if the platform is holding back performance." },
  { q: "How do I know SEO is working?", a: "We track impressions, clicks, rankings and leads using Google Search Console and analytics, and share clear reports on a regular schedule." },
];
export const STEPS = [
  { tab: "Preview", title: "See your homepage first", text: "We build a homepage concept for your trade. You see the design before you pay, with no card and no obligation." },
  { tab: "Plan", title: "Choose the follow-up you want", text: "Website, Lead System, Plus or Own It. We confirm what is included and your launch date in writing." },
  { tab: "Build", title: "We build the full site", text: "We add your services, service area, photos and copy, connect your domain and get your approval before launch." },
  { tab: "Launch", title: "Go live", text: "Your site launches. Text-back and review requests start after carrier approval, typically 10–15 days." },
  { tab: "Grow", title: "Keep it current", text: "We handle edits, track calls and forms, and send review requests after every job. You see the leads in one report." },
];
export const UPGRADES = [
  ["Extra Page", "Add a service, location or landing page to a Website, Lead System or Plus plan.", "$99 each"],
  ["Site Care", "Hosting, SSL and up to 30 minutes of edits each month after year one on Own It.", "$39 / mo"],
  ["Missed-Call Text-Back", "Add text-back to an Own It site after carrier approval, typically in 10 to 15 days.", "$97 / mo"],
  ["New Pages on Own It", "Extra pages for an Own It site are quoted in writing before we start any work.", "Quoted"],
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
    excerpt: "Your website should be your best salesperson. These common mistakes are silently driving away leads every day. Here is what to fix.",
    image: "/blog/website-mistakes-that-cost-you-calls.webp",
    width: 1200,
    height: 768,
    date: "2026-01-15",
    readTime: "5 min read",
  },
  {
    slug: "turn-clicks-into-calls",
    category: "Tips",
    title: "Turn Clicks Into Calls",
    seoTitle: "How to Turn Website Visitors Into Phone Calls",
    excerpt: "Getting traffic is only half the battle. Here's how to convert visitors into qualified leads who actually pick up the phone.",
    image: "/blog/turn-clicks-into-calls.webp",
    width: 1200,
    height: 772,
    date: "2026-02-10",
    readTime: "6 min read",
  },
  {
    slug: "small-business-marketing-budget",
    category: "Tips",
    title: "Small Business Marketing Budget: Where to Spend",
    seoTitle: "Small Business Marketing Budget for Service Companies",
    excerpt: "Every dollar counts. Learn how to allocate your marketing budget across channels that actually bring in paying customers.",
    image: "/blog/small-business-marketing-budget.webp",
    width: 1200,
    height: 769,
    date: "2026-03-05",
    readTime: "7 min read",
  },
  {
    slug: "make-your-website-mobile-ready",
    category: "Design",
    title: "Make Your Website Mobile Ready",
    seoTitle: "Make a Service Business Website Mobile Ready",
    excerpt: "Over 60% of local searches happen on mobile. If your site doesn't work on a phone, you're invisible to most customers.",
    image: "/blog/make-your-website-mobile-ready.webp",
    width: 1200,
    height: 769,
    date: "2026-03-28",
    readTime: "5 min read",
  },
  {
    slug: "local-seo-get-found-get-called",
    category: "SEO",
    title: "Local SEO: Get Found, Get Called",
    seoTitle: "Local SEO for Service Businesses Across the US",
    excerpt: "Rank higher in Google Maps and local search. A step-by-step playbook for service businesses across the United States that want more calls.",
    image: "/blog/get-found-and-calls-from-google-new.webp",
    width: 1567,
    height: 1004,
    date: "2026-04-18",
    readTime: "8 min read",
  },
  {
    slug: "build-trust-with-reviews",
    category: "Tips",
    title: "Build Trust With Reviews",
    seoTitle: "How Service Businesses Get More Google Reviews",
    excerpt: "Reviews are your digital word-of-mouth. Here's how to systematically get more 5-star reviews and turn them into revenue.",
    image: "/blog/build-trust-with-reviews.webp",
    width: 1200,
    height: 769,
    date: "2026-05-12",
    readTime: "6 min read",
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
  ["Quick onboarding", false, false], ["Dedicated manager", false, true], ["Fast turnaround", true, false],
  ["Site management included", false, false], ["Monthly payments", false, false],
];
