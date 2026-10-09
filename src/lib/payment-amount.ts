/** Smallest card charge we will open a checkout for. */
export const MIN_PAYMENT_CENTS = 100;

/** Largest single charge on the public pay page. */
export const MAX_PAYMENT_CENTS = 7_500_000;

/**
 * Parse a USD amount typed by a person ("1,250.50", "$40") into integer cents.
 * Returns null when the text is not a valid amount inside the allowed range.
 */
export function parseUsdToCents(raw: string): number | null {
  const cleaned = raw.trim().replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;

  const [dollars, fraction = ""] = cleaned.split(".");
  const cents = Number(dollars) * 100 + Number(fraction.padEnd(2, "0"));
  if (!Number.isSafeInteger(cents)) return null;
  if (cents < MIN_PAYMENT_CENTS || cents > MAX_PAYMENT_CENTS) return null;
  return cents;
}

export function formatUsdFromCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
