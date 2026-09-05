/** First-party cookie helpers for WebViews where web storage is flaky. */

export function cookieSecureFlag(): string {
  if (typeof location === "undefined") return "";
  return location.protocol === "https:" ? "; Secure" : "";
}

export function writeDocumentCookie(
  name: string,
  value: string,
  maxAgeSeconds: number,
): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${cookieSecureFlag()}`;
}

export function readDocumentCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function clearDocumentCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${cookieSecureFlag()}`;
}
