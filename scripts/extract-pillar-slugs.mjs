import { PILLAR_POSTS } from "../src/data/pillar-posts.ts";
import { PILLAR_POSTS_MORE } from "../src/data/pillar-posts-more.ts";

const slugs = [
  "local-seo-get-found-get-called",
  "website-mistakes-that-cost-you-calls",
  "how-to-ask-for-google-reviews-contractor",
  "google-business-profile-checklist",
  "turn-clicks-into-calls",
  "make-your-website-mobile-ready",
  "build-trust-with-reviews",
  "small-business-marketing-budget",
  "monthly-website-vs-own-it",
];

const all = { ...PILLAR_POSTS, ...PILLAR_POSTS_MORE };
for (const slug of slugs) {
  const p = all[slug];
  console.log(slug, p?.sections?.length, p?.lead?.length);
}
