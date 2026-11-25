/** Client-safe Place ID helpers. No Google API calls. */

const PLACE_ID_PATTERN = /^[A-Za-z0-9_-]{20,}$/;

export function reviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}

/**
 * Extract a Google Place ID from a raw ID or a Maps / writereview URL.
 * Returns null when nothing usable is found — never invents an ID.
 */
export function extractPlaceId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (PLACE_ID_PATTERN.test(trimmed)) return trimmed;

  const fromQuery = trimmed.match(/[?&#](?:placeid|place_id|query_place_id)=([^&#]+)/i);
  if (fromQuery?.[1]) {
    const decoded = decodeURIComponent(fromQuery[1].replace(/\+/g, " ")).trim();
    if (PLACE_ID_PATTERN.test(decoded)) return decoded;
  }

  try {
    const url = new URL(trimmed);
    for (const key of ["placeid", "place_id", "query_place_id"] as const) {
      const value = url.searchParams.get(key)?.trim();
      if (value && PLACE_ID_PATTERN.test(value)) return value;
    }
  } catch {
    // Not a URL — fall through.
  }

  // Compact whitespace and retry as a bare Place ID.
  const compact = trimmed.replace(/\s+/g, "");
  if (PLACE_ID_PATTERN.test(compact)) return compact;

  return null;
}
