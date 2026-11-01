import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { RETIRED_INDUSTRY_SLUGS } from "./src/data/industries";
import { LEGACY_REDIRECTS } from "./src/lib/legacy-redirects";
import { PAGES } from "./src/lib/pages";

const isDev = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.paypal.com https://*.paypal.com https://www.paypalobjects.com https://*.paypalobjects.com`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""} https://cloudflareinsights.com https://www.google-analytics.com https://*.google-analytics.com https://www.paypal.com https://*.paypal.com`,
  "media-src 'self' https:",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.paypal.com https://*.paypal.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://www.paypal.com https://*.paypal.com",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  experimental: {
    cpus: 4,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // Let proxy.ts issue the site's explicit 301 for trailing-slash variants.
  skipTrailingSlashRedirect: true,
  // Old URLs 301 to the current English pages so crawl signals stay on one address.
  async redirects() {
    const pages = Object.values(PAGES as Record<string, { path: string }>)
      .filter((page) => page.path !== "/");
    return [
      ...LEGACY_REDIRECTS,
      { source: "/index.html", destination: "/", statusCode: 301 },
      { source: "/process", destination: "/about", statusCode: 301 },
      { source: "/process.html", destination: "/about", statusCode: 301 },
      ...pages.map((page) => ({
        source: `${page.path}.html`,
        destination: page.path,
        statusCode: 301,
      })),
      { source: "/industry", destination: "/industries", statusCode: 301 },
      { source: "/industry/:slug", destination: "/industries/:slug", statusCode: 301 },
      { source: "/en/industries", destination: "/industries", statusCode: 301 },
      { source: "/en/industries/:slug", destination: "/industries/:slug", statusCode: 301 },
      ...RETIRED_INDUSTRY_SLUGS.flatMap((slug) => [
        { source: `/industries/${slug}`, destination: "/industries", statusCode: 301 },
        { source: `/industries/${slug}.html`, destination: "/industries", statusCode: 301 },
        { source: `/es/industries/${slug}`, destination: "/es/industries", statusCode: 301 },
        { source: `/es-es/industries/${slug}`, destination: "/es-es/industries", statusCode: 301 },
      ]),
      { source: "/industries/:slug.html", destination: "/industries/:slug", statusCode: 301 },
    ];
  },

  // Cloudflare Images is not enabled on the account yet, so every still is
  // served from public/ exactly as encoded.
  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
    ];
  },
};

export default nextConfig;

// Makes Cloudflare bindings available to server code during `next dev`.
if (isDev) {
  initOpenNextCloudflareForDev();
}
