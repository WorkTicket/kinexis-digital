import { getSiteUrl } from "@/lib/metadata";

const ALLOWED_ORIGINS: string[] = [];

function getAllowedOrigins(): string[] {
  if (ALLOWED_ORIGINS.length > 0) return ALLOWED_ORIGINS;

  const siteUrl = getSiteUrl();
  const url = new URL(siteUrl);
  ALLOWED_ORIGINS.push(siteUrl);
  ALLOWED_ORIGINS.push(`${url.protocol}//${url.hostname}`);

  if (process.env.NODE_ENV === "development") {
    ALLOWED_ORIGINS.push("http://localhost:3000");
    ALLOWED_ORIGINS.push("http://127.0.0.1:3000");
  }

  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== siteUrl) {
    ALLOWED_ORIGINS.push(process.env.NEXT_PUBLIC_SITE_URL);
  }

  return ALLOWED_ORIGINS;
}

export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (!origin && !referer) return false;

  const allowed = getAllowedOrigins();

  if (origin) {
    return allowed.some((allowedOrigin) => {
      try {
        const originUrl = new URL(origin);
        const allowedUrl = new URL(allowedOrigin);
        return originUrl.hostname === allowedUrl.hostname;
      } catch {
        return false;
      }
    });
  }

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return allowed.some((allowedOrigin) => {
        try {
          const allowedUrl = new URL(allowedOrigin);
          return refererUrl.hostname === allowedUrl.hostname;
        } catch {
          return false;
        }
      });
    } catch {
      return false;
    }
  }

  return false;
}
