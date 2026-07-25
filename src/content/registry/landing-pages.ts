export type LandingPageProof = {
  metric: string;
  label: string;
};

export type LandingPageEntry = {
  slug: string;
  /** Locale-unprefixed service path for soft internal links if needed */
  serviceHref: string;
  serviceLabel: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  formFootnote: string;
  proofIntro: string;
  proof: LandingPageProof[];
  bulletsTitle: string;
  bullets: string[];
  faqs: { question: string; answer: string }[];
  stickyCtaLabel: string;
};

export const landingPages: LandingPageEntry[] = [
  {
    slug: "google-ads-management",
    serviceHref: "/services/ppc-management",
    serviceLabel: "Google Ads management",
    metaTitle: "Google Ads Management That Stops Waste",
    metaDescription:
      "Google Ads management for businesses tired of burning budget. Account rebuilds, negative keywords, and conversion tracking that actually reports profit.",
    badge: "Google Ads management",
    headline: "Stop paying for clicks",
    headlineAccent: "that never become customers.",
    subheadline:
      "We take over accounts that look busy and make them profitable. That means cleaning search terms, fixing conversion tracking, and putting budget only where it earns the right to stay.",
    formTitle: "Get a free Ads account review",
    formSubtitle:
      "Tell us where you're spending. We'll tell you what's leaking — and what to fix first.",
    submitLabel: "Request my review",
    formFootnote: "No pitch deck. Practical findings within one business day.",
    proofIntro: "Results from accounts we rebuilt — not vanity dashboards.",
    proof: [
      { metric: "+118%", label: "pipeline from Ads + CRO" },
      { metric: "−43%", label: "CAC · SaaS platform, 8 mo" },
      { metric: "$4,100", label: "monthly ad spend after cut (was $6,800)" },
      { metric: "2.4X", label: "demo volume · SaaS, 8 mo" },
    ],
    bulletsTitle: "What we fix first",
    bullets: [
      "Broken or missing conversion tracking — if Ads can't see leads, it optimizes for noise",
      "Search term waste and negative keyword gaps that quietly drain budget",
      "Landing pages that don't match the ad promise, so Quality Score and ROAS suffer together",
      "Campaign structure that mixes intent levels and makes bidding guesswork",
    ],
    faqs: [
      {
        question: "Do you take over existing Google Ads accounts?",
        answer:
          "Yes. Most clients come to us with an account that's been running for months or years. We audit it, strip what doesn't convert, and rebuild around the offers that actually pay.",
      },
      {
        question: "How fast will we see improvement?",
        answer:
          "Tracking and waste cuts often show within the first two weeks. Meaningful ROAS shifts usually take 30–60 days once the account is structured and learning from clean conversion data.",
      },
      {
        question: "What's the minimum monthly ad spend you work with?",
        answer:
          "We work best when there's enough spend to learn from — typically a few thousand dollars a month or more. Below that, we may recommend a tighter geo or offer focus instead of spreading thin.",
      },
      {
        question: "Is this the same as your PPC management service?",
        answer:
          "Yes. This page is built for paid traffic. The ongoing service covers Google Ads (and related search campaigns) under our PPC management engagement.",
      },
    ],
    stickyCtaLabel: "Get my free review",
  },
  {
    slug: "seo",
    serviceHref: "/services/seo",
    serviceLabel: "SEO",
    metaTitle: "SEO That Builds Pipeline, Not Just Rankings",
    metaDescription:
      "SEO for companies that need leads and revenue, not ranking screenshots. Technical foundations, content that ranks, and pages built to convert.",
    badge: "Search engine optimization",
    headline: "SEO that shows up",
    headlineAccent: "in your pipeline.",
    subheadline:
      "Rankings are a means, not the goal. We build the technical base, the pages that match how buyers search, and the conversion paths so traffic turns into conversations.",
    formTitle: "Get a free SEO growth audit",
    formSubtitle:
      "Share your site. We'll flag what's holding organic growth back — and what to prioritize.",
    submitLabel: "Request my SEO audit",
    formFootnote: "Clear findings. No 40-page report designed to impress instead of act.",
    proofIntro: "Organic growth our clients can point to in their CRM.",
    proof: [
      { metric: "+181%", label: "organic traffic · Landscaping, 10 mo" },
      { metric: "2.8X", label: "qualified leads · Landscaping, 10 mo" },
      { metric: "+140%", label: "organic traffic · SaaS, 8 mo" },
      { metric: "+$5,600", label: "monthly revenue · Landscaping" },
    ],
    bulletsTitle: "How we approach SEO",
    bullets: [
      "Fix crawl, index, and Core Web Vitals issues that quietly cap growth",
      "Map keywords to pages that match buyer intent — not thin content for every synonym",
      "Strengthen internal linking so authority reaches the pages that should convert",
      "Measure leads and revenue, not just positions on a weekly rank tracker",
    ],
    faqs: [
      {
        question: "How long does SEO take to work?",
        answer:
          "Most sites see meaningful movement in 3–6 months. Competitive markets and weak technical foundations take longer. We set expectations against your niche, not a generic timeline.",
      },
      {
        question: "Do you guarantee #1 rankings?",
        answer:
          "No honest agency does. We guarantee the work: sound technical SEO, pages worth ranking, and reporting tied to leads — not vanity screenshots.",
      },
      {
        question: "Can SEO work with our Google Ads?",
        answer:
          "It should. Paid search covers demand you need now; SEO compounds. We align messaging and conversion tracking across both so you're not running two disconnected systems.",
      },
      {
        question: "What if we already have an SEO retainer?",
        answer:
          "Bring what you've got. Our audit shows what's working, what's theater, and where budget should actually go.",
      },
    ],
    stickyCtaLabel: "Get my SEO audit",
  },
  {
    slug: "local-seo",
    serviceHref: "/services/local-seo",
    serviceLabel: "Local SEO",
    metaTitle: "Local SEO That Fills the Phone",
    metaDescription:
      "Local SEO for service businesses that need map pack visibility, more calls, and booked jobs — not another list of citation logins.",
    badge: "Local SEO",
    headline: "Show up when locals",
    headlineAccent: "are ready to hire.",
    subheadline:
      "Map pack, Google Business Profile, and location pages that earn calls. Built for trades, clinics, and home-service businesses that live or die by local demand.",
    formTitle: "Get a free local visibility check",
    formSubtitle:
      "Tell us your market and service. We'll show where you're invisible — and how to fix it.",
    submitLabel: "Check my local visibility",
    formFootnote: "Practical GBP and local-pack findings. No junk citation spam.",
    proofIntro: "Local operators who needed phones to ring.",
    proof: [
      { metric: "136%", label: "more emergency calls · Plumbing" },
      { metric: "28/50", label: "local pack keywords · Landscaping" },
      { metric: "+170%", label: "site traffic · Plumbing, 8 mo" },
      { metric: "+$5,200", label: "monthly revenue · Plumbing" },
    ],
    bulletsTitle: "What local SEO actually includes",
    bullets: [
      "Google Business Profile optimized for the categories and services that drive jobs",
      "Service-area pages that are unique and useful — not city-name spam",
      "Review velocity and response workflows that build trust in the map pack",
      "Call tracking and form paths so you know which searches book work",
    ],
    faqs: [
      {
        question: "Do you help with Google Business Profile?",
        answer:
          "Yes. GBP is often the highest-leverage local asset. Categories, services, photos, posts, and review response all matter — and most profiles leave money on the table.",
      },
      {
        question: "We serve multiple cities. Can you cover that?",
        answer:
          "Yes. We build a service-area structure that matches how you actually dispatch jobs, without duplicate thin pages that Google ignores.",
      },
      {
        question: "How is this different from regular SEO?",
        answer:
          "Local SEO prioritizes map pack, proximity signals, and call conversion. National SEO plays a different game. If most of your revenue is within a drive-time radius, local comes first.",
      },
      {
        question: "Will this reduce our need for Google Ads?",
        answer:
          "Often, yes for branded and high-intent local queries. Ads still win for emergency spikes and competitive auctions. We can run both without them fighting each other.",
      },
    ],
    stickyCtaLabel: "Check my visibility",
  },
  {
    slug: "web-design",
    serviceHref: "/services/web-design",
    serviceLabel: "Web design",
    metaTitle: "Web Design Built to Convert",
    metaDescription:
      "Web design for businesses that need leads, not just a prettier homepage. Fast sites, clear offers, and conversion paths that match how buyers decide.",
    badge: "Conversion-focused web design",
    headline: "A site that sells",
    headlineAccent: "while you sleep.",
    subheadline:
      "Pretty isn't the brief. We design and build sites that load fast, explain the offer clearly, and make the next step obvious — on mobile first, where most of your traffic already lives.",
    formTitle: "Get a free website conversion review",
    formSubtitle:
      "Send your URL. We'll call out what's killing conversions and what a rebuild should prioritize.",
    submitLabel: "Review my website",
    formFootnote: "Straight feedback on structure, speed, and conversion gaps.",
    proofIntro: "When the site stops being the bottleneck.",
    proof: [
      { metric: "+168%", label: "growth · SEO + web redesign pattern" },
      { metric: "3.9%", label: "conversion rate · Landscaping (was 1.8%)" },
      { metric: "+142%", label: "growth · SEO + CRO pattern" },
      { metric: "2.4X", label: "demos · SaaS after funnel + site work" },
    ],
    bulletsTitle: "What we build for",
    bullets: [
      "Message match from ad or search result to the first screen — no bait-and-switch",
      "Mobile speed and Core Web Vitals so paid traffic isn't wasted on a slow load",
      "Clear primary CTA and form friction that matches intent (short when it should be)",
      "Structure that SEO and paid campaigns can actually land on without orphan pages",
    ],
    faqs: [
      {
        question: "Do you redesign existing sites or only build new ones?",
        answer:
          "Both. Sometimes a full rebuild is the right call. Sometimes fixing information architecture, speed, and conversion paths on the current stack is enough. The review tells you which.",
      },
      {
        question: "Will the new site be good for SEO?",
        answer:
          "Yes. We plan URLs, headings, internal links, and technical basics during design — not as an afterthought once the pixels are done.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Most marketing sites land in roughly 6–12 weeks depending on content readiness and scope. We'll give you a realistic timeline after the review, not a sales promise.",
      },
      {
        question: "Can you connect the site to our ads and CRM?",
        answer:
          "That's part of doing it right. Forms, thank-you pages, and conversion events should feed Ads and your follow-up tools from day one.",
      },
    ],
    stickyCtaLabel: "Review my website",
  },
];

export const landingPageSlugs = landingPages.map((p) => p.slug);

export function getLandingPage(slug: string): LandingPageEntry | undefined {
  return landingPages.find((p) => p.slug === slug);
}
