/** Published plan figures. LatAm/EN = USD; Spain = same numerals in euros (not a separate FX book). */

export type PriceLocale = "usd" | "eur";

export const PRICES = {
  websiteMo: { usd: "$97", eur: "97 €" },
  leadMo: { usd: "$197", eur: "197 €" },
  plusMo: { usd: "$297", eur: "297 €" },
  ownIt: { usd: "$1,497", eur: "1.497 €" },
  zeroDown: { usd: "$0", eur: "0 €" },
  newPage: { usd: "$99", eur: "99 €" },
  secondNumberMo: { usd: "$1", eur: "1 €" },
  textBackAddonMo: { usd: "$97", eur: "97 €" },
  siteCareMo: { usd: "$39", eur: "39 €" },
  year1Website: { usd: "$1,164", eur: "1.164 €" },
  year1Lead: { usd: "$2,364", eur: "2.364 €" },
  year1Plus: { usd: "$3,564", eur: "3.564 €" },
  m24Website: { usd: "$2,328", eur: "2.328 €" },
  m24Lead: { usd: "$4,728", eur: "4.728 €" },
  m24Plus: { usd: "$7,128", eur: "7.128 €" },
  siteCareYear: { usd: "$468", eur: "468 €" },
  ownItPlusCare: { usd: "$1,965", eur: "1.965 €" },
} as const;

export function p(key: keyof typeof PRICES, locale: PriceLocale): string {
  return PRICES[key][locale];
}

/** Rewrite USD figures in LatAm blog HTML/copy into Spain euro display. */
export function toSpainEuros(text: string): string {
  return text
    .replace(/\$1,497/g, "1.497 €")
    .replace(/\$1\.497/g, "1.497 €")
    .replace(/\$7,128/g, "7.128 €")
    .replace(/\$4,728/g, "4.728 €")
    .replace(/\$3,564/g, "3.564 €")
    .replace(/\$2,364/g, "2.364 €")
    .replace(/\$2,328/g, "2.328 €")
    .replace(/\$1,965/g, "1.965 €")
    .replace(/\$1,164/g, "1.164 €")
    .replace(/\$297/g, "297 €")
    .replace(/\$197/g, "197 €")
    .replace(/\$99/g, "99 €")
    .replace(/\$97/g, "97 €")
    .replace(/\$468/g, "468 €")
    .replace(/\$39/g, "39 €")
    .replace(/\$1\b/g, "1 €")
    .replace(/\$0\b/g, "0 €")
    .replace(/d[oó]lares(?:\s+de\s+EE\.\s*UU\.)?/gi, "euros")
    .replace(/USD/g, "EUR");
}

export function localizeMoneyFields<T extends { lead?: string; excerpt?: string; title?: string; seoTitle?: string; sections?: { h2: string; html: string }[]; faqs?: { q: string; a: string }[] }>(
  post: T,
  locale: PriceLocale,
): T {
  if (locale === "usd") return post;
  const map = (s: string) => toSpainEuros(s);
  return {
    ...post,
    ...(post.lead !== undefined ? { lead: map(post.lead) } : {}),
    ...(post.excerpt !== undefined ? { excerpt: map(post.excerpt) } : {}),
    ...(post.title !== undefined ? { title: map(post.title) } : {}),
    ...(post.seoTitle !== undefined ? { seoTitle: map(post.seoTitle) } : {}),
    ...(post.sections
      ? {
          sections: post.sections.map((s) => ({
            h2: map(s.h2),
            html: map(s.html),
          })),
        }
      : {}),
    ...(post.faqs
      ? {
          faqs: post.faqs.map((f) => ({
            q: map(f.q),
            a: map(f.a),
          })),
        }
      : {}),
  };
}
