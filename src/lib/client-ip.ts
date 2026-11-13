import "server-only";

/** Prefer Cloudflare's connecting IP; ignore spoofable XFF when CF is present. */
export function clientIp(request: Request) {
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
}
