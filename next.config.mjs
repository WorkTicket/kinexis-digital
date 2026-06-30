import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import bundleAnalyzer from "@next/bundle-analyzer";

initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

const cloudflareInsightsScript = "https://static.cloudflareinsights.com";
const cloudflareInsightsConnect = "https://cloudflareinsights.com";

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
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms ${cloudflareInsightsScript}`,
      `script-src-elem 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms ${cloudflareInsightsScript}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self' data:",
      `connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://www.clarity.ms https://*.clarity.ms ${cloudflareInsightsConnect}`,
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
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [32, 64, 96, 128, 180, 256, 280, 360],
    minimumCacheTTL: 31536000,
    remotePatterns: [],
  },

  experimental: {
    // Tree-shake these large packages at the module graph level so only
    // the specific named exports used per-page are included in each chunk.
    optimizePackageImports: ["lucide-react", "framer-motion", "@sentry/nextjs"],
  },

  webpack(config, { dev, isServer }) {
    // Dev: avoid Windows file-locking races with the filesystem cache.
    if (dev) {
      config.cache = { type: "memory" };
    }

    // Production client bundles: split vendor chunks more granularly so
    // per-page JS payloads stay smaller and shared code is cached longer.
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...(config.optimization.splitChunks?.cacheGroups ?? {}),
          framerMotion: {
            name: "vendor-framer-motion",
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            chunks: "all",
            priority: 30,
          },
          lucide: {
            name: "vendor-lucide",
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            chunks: "all",
            priority: 30,
          },
        },
      };
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/security.txt",
        destination: "/.well-known/security.txt",
        permanent: true,
      },
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
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        source: "/.well-known/security.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const intlConfig = withNextIntl(nextConfig);

// Sentry wraps the config to inject instrumentation.
// Set SENTRY_ORG, SENTRY_PROJECT, and NEXT_PUBLIC_SENTRY_DSN in .env.local or CI
// to enable error monitoring. The build works fine without them — Sentry stays
// disabled (see instrumentation.ts and instrumentation-client.ts).
export default withBundleAnalyzer(
  withSentryConfig(intlConfig, {
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
  })
);
