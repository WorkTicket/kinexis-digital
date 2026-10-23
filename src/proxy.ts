import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contentLanguage, localeFromPath, LOCALE_HEADER, PATH_HEADER } from "@/lib/i18n";

const APEX = "kinexisdigital.com";
const CANONICAL_HOST = "www.kinexisdigital.com";
const MAINTENANCE_MODE = true;
const RETRY_AFTER_SECONDS = 3600;

const MAINTENANCE_HTML = `<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Site Maintenance | Kinexis Digital</title>
  <style>
    :root{color-scheme:light;font-family:Arial,sans-serif;background:#f4f7ff;color:#031b4e}
    *{box-sizing:border-box}
    body{min-height:100vh;margin:0;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at top,#dfe8ff 0,#f4f7ff 48%,#fff 100%)}
    main{width:min(100%,720px);padding:clamp(32px,7vw,64px);text-align:center;background:#fff;border:1px solid #cbd7f5;border-radius:28px;box-shadow:0 24px 70px rgba(3,27,78,.13)}
    img{display:block;width:min(100%,270px);height:auto;margin:0 auto 36px}
    .eyebrow{margin:0 0 14px;color:#0b3dff;font-size:.82rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
    h1{margin:0;font-size:clamp(2.2rem,7vw,4.4rem);line-height:1;letter-spacing:-.045em}
    p{max-width:560px;margin:24px auto 0;color:#425274;font-size:clamp(1.05rem,2.4vw,1.25rem);line-height:1.65}
    .contact{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:32px}
    a{display:inline-flex;min-height:48px;align-items:center;justify-content:center;padding:12px 20px;border:2px solid #0b3dff;border-radius:999px;color:#0b3dff;font-weight:800;text-decoration:none}
    a:first-child{background:#0b3dff;color:#fff}
    a:focus-visible{outline:4px solid #ff6a00;outline-offset:3px}
  </style>
</head>
<body>
  <main>
    <img src="/assets/logos/header-nav.webp" width="720" height="180" alt="Kinexis Digital">
    <p class="eyebrow">Scheduled maintenance</p>
    <h1>We’ll be right back.</h1>
    <p>We’re making improvements to the Kinexis Digital website. Need help in the meantime? Call or email us and we’ll get back to you.</p>
    <div class="contact">
      <a href="tel:+13075003371">Call (307) 500-3371</a>
      <a href="mailto:hello@kinexisdigital.com">Email us</a>
    </div>
  </main>
</body>
</html>`;

function maintenanceResponse(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const headers = {
    "Cache-Control": "no-store",
    "Retry-After": String(RETRY_AFTER_SECONDS),
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  };
  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "The site is temporarily unavailable for scheduled maintenance." },
      { status: 503, headers },
    );
  }
  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
  });
}

/** Send the apex host to www, and label each URL with the language of that URL. */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host === APEX) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  if (MAINTENANCE_MODE) return maintenanceResponse(request);
  const locale = localeFromPath(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(PATH_HEADER, request.nextUrl.pathname);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Language", contentLanguage(locale));
  return response;
}

export const config = {
  // Paths with a dot skip the first pattern, which would leave the crawl
  // files on the apex host. List them so they 308 to www with everything else.
  matcher: [
    "/((?!_next/static|_next/image|.*\\..*).*)",
    "/robots.txt",
    "/sitemap.xml",
  ],
};
