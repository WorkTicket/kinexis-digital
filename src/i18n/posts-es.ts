import { GENERATED_ES_COST_POSTS } from "@/i18n/es-cost-bodies";
import { GENERATED_ES_PAGES_POSTS } from "@/i18n/es-pages-bodies";
import type { EsPost } from "@/i18n/es-post-type";
import { ES_PILLAR_POSTS } from "@/i18n/es-pillars";
import { ES_PILLAR_POSTS_MORE } from "@/i18n/es-pillars-more";
import { ES_GUIDE_STUBS } from "@/i18n/posts-es-guides";
import { ES_CLUSTER_ES_ES_OVERRIDES, ES_CLUSTER_POSTS } from "@/i18n/posts-es-cluster";
import { localizeMoneyFields } from "@/i18n/prices";
import { spainizeData } from "@/lib/spainize";

export type { EsPost } from "@/i18n/es-post-type";

function mergeBySlug(...groups: EsPost[][]): EsPost[] {
  const map = new Map<string, EsPost>();
  for (const group of groups) {
    for (const post of group) map.set(post.slug, post);
  }
  return [...map.values()];
}

/** LatAm Spanish blog bodies. Later spreads win on slug collisions. */
export const ES_POSTS: EsPost[] = mergeBySlug(
  ES_GUIDE_STUBS,
  ES_CLUSTER_POSTS,
  Object.values(GENERATED_ES_COST_POSTS),
  Object.values(GENERATED_ES_PAGES_POSTS),
  Object.values(ES_PILLAR_POSTS),
  Object.values(ES_PILLAR_POSTS_MORE),
);

/** Kept for optional Spain-only copy; prices now via toSpainEuros. */
const ES_ES_POST_OVERRIDES: Partial<Record<string, Partial<EsPost>>> = {
  ...ES_CLUSTER_ES_ES_OVERRIDES,
};

export function esPost(slug: string) {
  return ES_POSTS.find((post) => post.slug === slug);
}

/** LatAm keeps USD. Spain: spainize vocabulary + same numerals in euros. */
export function esPostForLocale(slug: string, locale: "es-419" | "es-ES") {
  const base = esPost(slug);
  if (!base) return undefined;
  if (locale !== "es-ES") return base;
  void ES_ES_POST_OVERRIDES;
  return localizeMoneyFields(spainizeData(base), "eur");
}
