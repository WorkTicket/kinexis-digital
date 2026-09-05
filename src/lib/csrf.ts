/** Origin/referer validation for same-site form submissions (not token-based CSRF). */
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

function hostnameAllowed(candidate: string): boolean {
  try {
    const candidateUrl = new URL(candidate);
    return getAllowedOrigins().some((allowedOrigin) => {
      try {
        return candidateUrl.hostname === new URL(allowedOrigin).hostname;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}

function usableOrigin(origin: string | null): string | null {
  if (!origin || origin === "null") return null;
  return origin;
}

export function validateOrigin(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin" || fetchSite === "same-site") return true;

  const origin = usableOrigin(request.headers.get("origin"));
  const referer = request.headers.get("referer");

  if (origin) return hostnameAllowed(origin);
  if (referer) return hostnameAllowed(referer);

  return false;
}
