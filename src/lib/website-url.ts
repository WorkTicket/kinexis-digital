/** Accepts a hostname or full http(s) URL. Used by LP forms and /api/lead. */
export function isWebsiteValue(raw: string): boolean {
  const value = raw.trim();
  if (value.length < 4 || value.length > 500) return false;
  if (/\s/.test(value)) return false;
  const withProtocol = /^(https?:\/\/)/i.test(value)
    ? value
    : `https://${value}`;
  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    const host = url.hostname.replace(/\.$/, "");
    const last = host.split(".").pop() ?? "";
    return host.includes(".") && /^[a-z]{2,}$/i.test(last);
  } catch {
    return false;
  }
}
