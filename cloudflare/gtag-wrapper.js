/**
 * Wraps the OpenNext worker so the official Google tag is the first <head>
 * children. Next.js parks gtag behind ~300KB of inlined CSS, which makes
 * Tag Assistant time out with "no debuggable Google tags".
 *
 * Also strips the React-rendered copy so pages do not ship duplicate Google
 * tags (Google Ads flags that as broken sitewide tagging). Same for Meta Pixel.
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
import { ASYNC_CSS_BOOT_SCRIPT } from "../src/lib/critical-css.ts";

export { BucketCachePurge, DOQueueHandler, DOShardedTagCache };

const EARLY_GTAG_HTML = buildEarlyGoogleTagHtml(
  PRODUCTION_GOOGLE_ADS_ID,
  PRODUCTION_GA_ID,
);

export default {
  async fetch(request, env, ctx) {
    const response = await openNextWorker.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    const country = request.cf?.country;
    const metaHtml = buildEarlyMetaPixelHtml(PRODUCTION_META_PIXEL_ID, {
      defaultConsent: isGdprConsentRegion(country) ? "revoke" : "grant",
    });
    const earlyHead = `${EARLY_GTAG_HTML}${metaHtml}<script>${ASYNC_CSS_BOOT_SCRIPT}</script>`;

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.prepend(earlyHead, { html: true });
        },
      })
      .on("link", {
        element(element) {
          const rel = (element.getAttribute("rel") ?? "").toLowerCase();
          if (rel !== "stylesheet") return;
          const href = element.getAttribute("href") ?? "";
          if (!href.includes("/_next/static/css/")) return;
          element.setAttribute("media", "print");
          element.setAttribute("onload", "this.onload=null;this.media='all'");
          element.setAttribute("data-kinexis-async", "1");
          element.after(
            `<noscript><link rel="stylesheet" href="${href.replace(/"/g, "")}"></noscript>`,
            { html: true },
          );
        },
      })
      .on("script#gtag-src", {
        element(element) {
          element.remove();
        },
      })
      .on("script#gtag-init", {
        element(element) {
          element.remove();
        },
      })
      .on("script#meta-pixel-init", {
        element(element) {
          element.remove();
        },
      })
      .on("script#meta-pixel-lead", {
        element(element) {
          element.remove();
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
