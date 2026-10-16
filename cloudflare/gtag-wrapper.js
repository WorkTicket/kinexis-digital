/**
 * Queue Google and Meta events at the start of <head>. The homepage and
 * website lander load their analytics libraries after the primary paint;
 * other templates keep the immediate Google library for Tag Assistant.
 *
 * Neutralizes React-rendered inline copies so tracking runs once while the
 * script elements remain available for hydration. Same for Meta Pixel.
 */
import openNextWorker, {
  BucketCachePurge,
  DOQueueHandler,
  DOShardedTagCache,
} from "../.open-next/worker.js";
import {
  PRODUCTION_GA_ID,
  PRODUCTION_GOOGLE_ADS_ID,
  PRODUCTION_META_PIXEL_ID,
} from "../src/lib/analytics/ads-config.ts";
import {
  buildEarlyGoogleTagHtml,
  isGdprConsentRegion,
} from "../src/lib/analytics/conversion-snippet.ts";
import { buildEarlyMetaPixelHtml } from "../src/lib/analytics/meta-pixel.ts";
import { shouldLoadGoogleTracking } from "../src/lib/analytics/google-tracking.ts";
import { isMetaTrackingPath } from "../src/lib/analytics/meta-tracking.ts";
import { WEBSITE_CRITICAL_CSS, WEBSITE_PRELOAD_HTML, HOME_CRITICAL_CSS, TEXT_FONT_PRELOAD_HTML, WEBSITE_BUILD_ID } from "./website-critical-css.generated.js";
import { fetchWebsiteDocument } from "./website-html-cache.js";
import { isCrawlerRequest } from "../src/i18n/geo.ts";
export { BucketCachePurge, DOQueueHandler, DOShardedTagCache };

const EARLY_GTAG_HTML = buildEarlyGoogleTagHtml(
  PRODUCTION_GOOGLE_ADS_ID,
  PRODUCTION_GA_ID,
);
const EARLY_GTAG_QUEUE_HTML = buildEarlyGoogleTagHtml(
  PRODUCTION_GOOGLE_ADS_ID,
  PRODUCTION_GA_ID,
  { loadScript: false },
);

function withCountryHeader(request) {
  const country = request.cf?.country;
  if (!country || typeof country !== "string") return request;
  // OpenNext middleware reads CF-IPCountry; Workers expose the same value on
  // request.cf.country. Keep them aligned so geo locale (en / es-419 / es-ES)
  // matches the edge country on first visit.
  const existing = request.headers.get("cf-ipcountry");
  if (existing && existing.toUpperCase() === country.toUpperCase()) {
    return request;
  }
  const headers = new Headers(request.headers);
  headers.set("cf-ipcountry", country);
  return new Request(request, { headers });
}

export default {
  async fetch(request, env, ctx) {
    const localizedRequest = withCountryHeader(request);
    const response = await fetchWebsiteDocument(localizedRequest, {
      cache: globalThis.caches?.default,
      buildId: WEBSITE_BUILD_ID,
      fetchOrigin: () => openNextWorker.fetch(localizedRequest, env, ctx),
      waitUntil: promise => ctx.waitUntil(promise),
      isCrawler: isCrawlerRequest(localizedRequest),
    });
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    const country = request.cf?.country;
    const metaHtml = isMetaTrackingPath(new URL(request.url).pathname) ? buildEarlyMetaPixelHtml(PRODUCTION_META_PIXEL_ID, {
      landingOnly: true,
      defaultConsent: isGdprConsentRegion(country) ? "revoke" : "grant",
    }) : "";
    const websiteLanding = /\/lp\/get-a-website\/?$/.test(new URL(request.url).pathname) && Boolean(WEBSITE_CRITICAL_CSS);
    const homepage = /^\/(?:(?:en|es-419|es-ES)\/?)?$/.test(new URL(request.url).pathname);
    const criticalCss = websiteLanding ? WEBSITE_CRITICAL_CSS : homepage ? HOME_CRITICAL_CSS : "";
    const googleHtml = shouldLoadGoogleTracking(new URL(request.url).pathname)
      ? homepage ? EARLY_GTAG_QUEUE_HTML : EARLY_GTAG_HTML
      : "";
    const metaConsentDefault = isGdprConsentRegion(country) ? "revoke" : "grant";
    const earlyHead = `<script>window.__kinexisMetaDefaultConsent='${metaConsentDefault}';</script>${googleHtml}${metaHtml}`;

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.prepend(earlyHead, { html: true });
        },
      })
      .on('meta[name="viewport"]', {
        element(element) {
          if (criticalCss) {
            // Responsive preloads must follow viewport metadata, otherwise
            // mobile browsers first fetch a candidate for their 980px default.
            element.after(`${websiteLanding ? WEBSITE_PRELOAD_HTML : ""}${TEXT_FONT_PRELOAD_HTML}<style>${criticalCss}</style>`, { html: true });
          }
        },
      })
      .on('link[rel="stylesheet"]', {
        element(element) {
          if (!criticalCss) return;
          const href = element.getAttribute("href");
          if (!href?.startsWith("/_next/static/css/")) return;
          // The extracted CSS renders the header and hero immediately. Load
          // the remaining sections without blocking paint, with a no-JS fallback.
          element.before(`<noscript><link rel="stylesheet" href="${href}"></noscript>`, { html: true });
          element.setAttribute("media", "print");
          element.setAttribute("onload", "this.media='all'");
        },
      })
      .on('link[rel="preload"][as="style"]', {
        element(element) {
          if (criticalCss) element.remove();
        },
      })
      .on('link[rel="preload"][as="image"]', {
        element(element) {
          // The responsive hero hint is inserted after viewport metadata above.
          // Remove React's original hint so phones do not first select a
          // larger candidate using the browser's initial 980px viewport.
          const source = element.getAttribute("imagesrcset") ?? element.getAttribute("href") ?? "";
          if (websiteLanding && source.includes("/hero-devices-")) element.remove();
        },
      })
      .on('script[src], link[rel="preload"][as="script"]', {
        element(element) {
          if (criticalCss) element.setAttribute("fetchpriority", "low");
        },
      })
      .on("script#gtag-src", {
        element(element) {
          element.remove();
        },
      })
      .on("script#gtag-init", {
        element(element) {
          element.setInnerContent("");
        },
      })
      .on("script#meta-pixel-init", {
        element(element) {
          element.setInnerContent("");
        },
      })
      .on("script#meta-pixel-lead", {
        element(element) {
          element.setInnerContent("");
        },
      })
      .on("img", {
        element(element) {
          const src = element.getAttribute("src") ?? "";
          if (src.includes("facebook.com/tr")) {
            element.remove();
          }
        },
      })
      .transform(response);
  },
};
