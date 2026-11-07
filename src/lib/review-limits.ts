/** Soft max for website-submitted reviews and card display. */
export const REVIEW_QUOTE_MAX = 280;
export const REVIEW_QUOTE_MIN = 20;

/** Trim whitespace and end at a word when over the card/display limit. */
export function clipReviewQuote(quote: string, max = REVIEW_QUOTE_MAX) {
  const clean = quote.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = cut.slice(0, lastSpace > max * 0.6 ? lastSpace : cut.length).replace(/[.,;:\s]+$/u, "");
  return `${base}…`;
}
