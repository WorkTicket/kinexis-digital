import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

// Security headers applied to every route (mirrored in public/_headers for Cloudflare Pages static assets).
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms`,
      `script-src-elem 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [32, 64, 96, 128, 180, 256, 280, 360],
    remotePatterns: [],
  },
  webpack(config, { dev }) {
    // The default webpack filesystem cache races with Windows file locking and
    // spams "ENOENT ... rename 0.pack.gz_" warnings in dev. Use in-memory cache.
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/:locale(en|es)/services/cro",
        destination: "/:locale/services/funnels",
        permanent: true,
      },
      {
        source: "/:locale(en|es)/pricing/cro",
        destination: "/:locale/pricing/funnels",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/logo.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

const intlConfig = withNextIntl(nextConfig);

// Sentry wraps the config to inject instrumentation.
// All options are opt-in; the build works without a DSN set.
export default withSentryConfig(intlConfig, {
  // TODO: Set SENTRY_ORG and SENTRY_PROJECT in .env.local or CI
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  // Suppress build-time CLI output when org/project are not set
  silent: !process.env.SENTRY_ORG,
  // Disable source map uploads until DSN is configured
  sourcemaps: { disable: !process.env.SENTRY_ORG },
  // Disable automatic release creation when not configured
  webpack: {
    autoInstrumentServerFunctions: false,
    autoInstrumentMiddleware: false,
  },
});
