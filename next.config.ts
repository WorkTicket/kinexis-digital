import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { INDUSTRIES, RETIRED_INDUSTRY_SLUGS } from "./src/data/industries";
import { POSTS } from "./src/lib/content";
import { LEGACY_REDIRECTS } from "./src/lib/legacy-redirects";
import { PAGES } from "./src/lib/pages";

const isDev = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.paypal.com https://*.paypal.com https://www.paypalobjects.com https://*.paypalobjects.com`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""} https://www.google-analytics.com https://*.google-analytics.com https://www.paypal.com https://*.paypal.com`,
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
  poweredByHeader: false,
  reactStrictMode: true,
  // Old URLs 301 to the current English pages so crawl signals stay on one address.
  async redirects() {
    const pages = Object.values(PAGES as Record<string, { path: string }>)
      .filter((page) => page.path !== "/");
    return [
      ...LEGACY_REDIRECTS,
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/process", destination: "/about", permanent: true },
      { source: "/process.html", destination: "/about", permanent: true },
      ...pages.map((page) => ({
        source: `${page.path}.html`,
        destination: page.path,
        permanent: true,
      })),
      { source: "/industry", destination: "/industries", permanent: true },
      { source: "/industry/:slug", destination: "/industries/:slug", permanent: true },
      { source: "/en/industries", destination: "/industries", permanent: true },
      { source: "/en/industries/:slug", destination: "/industries/:slug", permanent: true },
      ...RETIRED_INDUSTRY_SLUGS.flatMap((slug) => [
        { source: `/industries/${slug}`, destination: "/industries", permanent: true },
        { source: `/industries/${slug}.html`, destination: "/industries", permanent: true },
        { source: `/es/industries/${slug}`, destination: "/es/industries", permanent: true },
        { source: `/es-es/industries/${slug}`, destination: "/es-es/industries", permanent: true },
      ]),
      { source: "/industries/:slug.html", destination: "/industries/:slug", permanent: true },
    ];
  },

  // Cloudflare Images is not enabled on the account yet, so every still is
  // served from public/ exactly as encoded.
  images: {
    unoptimized: true,
  },

  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    const lcp = (source: string, image: string) => ({
      source,
      headers: [{ key: "Link", value: `<${image}>; rel=preload; as=image; type=\"image/avif\"; fetchpriority=high` }],
    });
    const sharedHero: Record<string, string> = {
      "/": "/assets/video/hero-rLicrajNvqM-poster.avif",
      "/services": "/assets/kinexis/heroes/homepage-720.avif",
      "/web-design": "/assets/kinexis/heroes/web-design-720.avif",
      "/seo-services": "/assets/kinexis/heroes/local-seo-720.avif",
      "/audit": "/assets/kinexis/heroes/website-audit-720.avif",
      "/contact": "/assets/kinexis/heroes/contact-720.avif",
      "/website-management": "/assets/kinexis/heroes/maintenance-720.avif",
      "/about": "/assets/kinexis/heroes/about-720.avif",
      "/portfolio": "/assets/kinexis/heroes/portfolio-720.avif",
      "/reviews": "/assets/kinexis/heroes/reviews-720.avif",
      "/upgrades": "/assets/kinexis/heroes/upgrades-720.avif",
      "/pricing": "/assets/kinexis/heroes/pricing-720.avif",
      "/pay": "/assets/kinexis/heroes/pricing-720.avif",
      "/blog": "/assets/kinexis/heroes/blog-720.avif",
      "/faqs": "/assets/kinexis/heroes/faqs-720.avif",
    };
    const lcpHeaders = Object.entries(sharedHero).flatMap(([path, image]) => [
      lcp(path, image),
      lcp(path === "/" ? "/es" : `/es${path}`, path === "/" ? image : image),
      lcp(path === "/" ? "/es-es" : `/es-es${path}`, path === "/" ? image : image),
    ]);
    for (const industry of INDUSTRIES) {
      const path = `/industries/${industry.slug}`;
      const image = `/assets/industries/${industry.slug}/hero-768.avif`;
      lcpHeaders.push(lcp(path, image), lcp(`/es${path}`, image), lcp(`/es-es${path}`, image));
    }
    for (const post of POSTS) {
      const path = `/blog/${post.slug}`;
      lcpHeaders.push(
        lcp(path, post.image.replace(".webp", ".avif")),
        lcp(`/es${path}`, "/assets/kinexis/heroes/blog-720.avif"),
        lcp(`/es-es${path}`, "/assets/kinexis/heroes/blog-720.avif"),
      );
    }
    return [
      ...lcpHeaders,
      { source: "/assets/:path*", headers: cache },
      { source: "/portfolio/:file(.*\\.(?:webp|jpe?g|png|avif))", headers: cache },
      { source: "/blog/:file(.*\\.webp)", headers: cache },
      { source: "/favicon-:size.webp", headers: cache },
      { source: "/apple-icon.png", headers: cache },
      { source: "/OGimage-sm.webp", headers: cache },
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
initOpenNextCloudflareForDev();
