/**
 * Conferbot webhook HMAC-SHA256 (Web Crypto only — no Node crypto at runtime).
 * Header x-webhook-signature is bare lowercase hex over the raw body.
 */

const HEX_DIGEST = /^[0-9a-f]{64}$/i;

function toHex(bytes: ArrayBuffer): string {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time compare of equal-length lowercase hex strings. */
export function constantTimeHexEqual(expected: string, supplied: string): boolean {
  const a = expected.toLowerCase();
  const b = supplied.toLowerCase();
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index++) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return difference === 0;
}

export function isConferbotSignatureHex(value: string): boolean {
  return HEX_DIGEST.test(value);
}

export async function signConferbotBody(rawBody: string, secret: string): Promise<string | null> {
  if (!secret) return null;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  return toHex(digest);
}

/**
 * Verifies x-webhook-signature against the raw body.
 * Rejects missing/non-hex signatures without throwing.
 */
export async function verifyConferbotSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): Promise<boolean> {
  if (!secret || !signatureHeader || !isConferbotSignatureHex(signatureHeader)) return false;
  const expected = await signConferbotBody(rawBody, secret);
  if (!expected) return false;
  return constantTimeHexEqual(expected, signatureHeader);
}
