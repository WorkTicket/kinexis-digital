export type FieldResource = {
  href: string;
  label: string;
  source: string;
  dek: string;
  image: string;
  imageAlt: string;
};

/**
 * Curated outbound links — platform docs and research we actually send people to.
 * Kept short on purpose; this is not a link farm.
 */
export const fieldResources: FieldResource[] = [
  {
    href: "https://developers.google.com/search",
    label: "Google Search Central",
    source: "Google",
    dek: "How search actually works, from crawling to ranking, in Google's words.",
    image: "/assets/images/resources/search-central.webp",
    imageAlt: "Full-screen Google Search Console Performance overview",
  },
  {
    href: "https://support.google.com/google-ads",
    label: "Google Ads Help",
    source: "Google",
    dek: "Campaign structure, bidding, and measurement written in Google's own words.",
    image: "/assets/images/resources/ads-help.webp",
    imageAlt: "Full-screen Google Ads campaigns overview",
  },
  {
    href: "https://www.facebook.com/business/help",
    label: "Meta Business Help",
    source: "Meta",
    dek: "Ads Manager, audiences, and creative rules across Facebook and Instagram.",
    image: "/assets/images/resources/meta-help.webp",
    imageAlt: "Full-screen Meta Ads Manager campaign overview",
  },
  {
    href: "https://web.dev/explore/performance",
    label: "web.dev Performance",
    source: "Chrome",
    dek: "Core Web Vitals plus the speed work that actually protects conversion.",
    image: "/assets/images/resources/web-performance.webp",
    imageAlt: "Full-screen Chrome Lighthouse performance report",
  },
  {
    href: "https://support.google.com/business",
    label: "Google Business Profile",
    source: "Google",
    dek: "Maps, reviews, and local presence for crews that need the phone to ring.",
    image: "/assets/images/resources/business-profile.webp",
    imageAlt: "Full-screen Google Business Profile manager",
  },
  {
    href: "https://www.thinkwithgoogle.com/",
    label: "Think with Google",
    source: "Google",
    dek: "Buyer research and media insights we open when a client needs market context.",
    image: "/assets/images/resources/think-with-google.webp",
    imageAlt: "Full-screen Think with Google insights page",
  },
];
