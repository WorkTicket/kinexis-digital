export type LiveSite = {
  slug: string;
  name: string;
  trade: string;
  url: string;
  image: string;
  width: number;
  height: number;
};

/** Live client sites shown under the demo portfolio. Screenshots are the full homepage. */
export const LIVE_SITES: LiveSite[] = [
  {
    slug: "manos-creativas",
    name: "Manos Creativas Bynmw",
    trade: "Crochet patterns · Valencia, Spain",
    url: "https://bynmwcreative.com/",
    image: "/portfolio/live-manos-creativas.webp",
    width: 1100,
    height: 8534,
  },
  {
    slug: "preferred-plumbing",
    name: "Preferred Plumbing Solutions",
    trade: "Plumbing · Spirit Lake, Idaho",
    url: "https://www.callpreferredplumbing.com/",
    image: "/portfolio/live-preferred-plumbing.webp",
    width: 1100,
    height: 9659,
  },
  {
    slug: "a1-landscaping",
    name: "A1 Property Services",
    trade: "Landscaping · Cedar Falls, Iowa",
    url: "https://a1pslandscape.com/",
    image: "/portfolio/live-a1-landscaping.webp",
    width: 1100,
    height: 8113,
  },
];
