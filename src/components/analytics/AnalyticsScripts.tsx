"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";
import { getGtagLoaderId, getGaMeasurementId, getGoogleAdsId, getMetaPixelId } from "@/lib/analytics/ads-config";
import { buildGtagInitScript } from "@/lib/analytics/conversion-snippet";
import { shouldLoadGoogleTracking } from "@/lib/analytics/google-tracking";
import { captureClickIds } from "@/lib/analytics/click-ids";
import { updateGtagConsent } from "@/lib/analytics/consent";
import { trackMetaPageView, updateMetaPixelConsent, buildMetaPixelInitScript } from "@/lib/analytics/meta-pixel";
import { shouldLoadMetaTracking } from "@/lib/analytics/meta-tracking";
import { peekPendingConversion } from "@/lib/analytics/pending-conversion";
import { afterPrimaryPaint } from "@/lib/analytics/after-primary-paint";

const LOADER_ID = getGtagLoaderId();
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __kinexisClarityLoaded?: boolean;
    __kinexisMetaTrackingPath?: string;
    __kinexisMetaDefaultConsent?: "grant" | "revoke";
  }
}

function loadGtag() {
  if (!shouldLoadGoogleTracking(window.location.pathname)) return;
  if (!LOADER_ID) return;
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    return;
  }

  const script = document.createElement("script");
  if (typeof window.gtag !== "function") {
    // A client-side navigation away from the excluded page needs the same
    // consent defaults and configuration as a fresh visit to another page.
    const init = document.createElement("script");
    init.textContent = buildGtagInitScript(getGoogleAdsId(), getGaMeasurementId());
    document.head.appendChild(init);
  }
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${LOADER_ID}`;
  document.head.appendChild(script);
}

function loadClarity() {
  if (!CLARITY_ID || window.__kinexisClarityLoaded) return;
  window.__kinexisClarityLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}

export default function AnalyticsScripts() {
  const pathname = usePathname();
  const { consent, ready } = useCookieConsent();
  const lastTrackedUrl = useRef<string | null>(null);
  const metaBootstrappedPath = useRef<string | null>(null);
  const [needsMetaLibrary, setNeedsMetaLibrary] = useState(false);

  // Capture gclid / fbclid / UTMs on every landing (before consent — URL params only)
  useEffect(() => {
    captureClickIds();
  }, [pathname]);

  // Fallback if the inline head loader did not inject gtag.js.
  useEffect(() => {
    if (/^\/(?:(?:en|es-419|es-ES)\/?)?$/.test(pathname)) {
      return afterPrimaryPaint(loadGtag, true);
    }
    loadGtag();
  }, [pathname]);

  useEffect(() => {
    if (!shouldLoadMetaTracking(pathname, peekPendingConversion()) && window.__kinexisMetaTrackingPath !== pathname) {
      // Revoke an already loaded pixel when navigating out of the funnel.
      if (typeof window.fbq === "function") window.fbq("consent", "revoke");
      delete window.__kinexisMetaTrackingPath;
      setNeedsMetaLibrary(false);
      return;
    }
    if (typeof window.fbq === "function") {
      updateMetaPixelConsent(consent === "accepted");
      // The worker early head already fetched fbevents.js async from the stub,
      // so only fall back to a React-managed load when no loader exists yet
      // (preview / dev without the worker).
      setNeedsMetaLibrary(!document.querySelector('script[src*="connect.facebook.net"][src*="fbevents.js"]'));
      return;
    }
    window.__kinexisMetaTrackingPath = pathname;
    metaBootstrappedPath.current = pathname;
    const script = document.createElement("script");
    script.textContent = buildMetaPixelInitScript(getMetaPixelId(), {
      loadScript: false,
      defaultConsent: consent === "pending" ? window.__kinexisMetaDefaultConsent ?? "revoke" : consent === "accepted" ? "grant" : "revoke",
    });
    document.head.appendChild(script);
    setNeedsMetaLibrary(Boolean(getMetaPixelId()));
  }, [pathname, consent]);

  const trackPageView = () => {
    if (!shouldLoadGoogleTracking(window.location.pathname)) return;
    if (typeof window.gtag !== "function") return;
    const pageLocation = window.location.href;
    if (lastTrackedUrl.current === pageLocation) return;

    lastTrackedUrl.current = pageLocation;
    window.gtag!("event", "page_view", {
      page_location: pageLocation,
      page_title: document.title,
    });
  };

  useEffect(() => {
    if (!ready) return;

    if (consent === "accepted") {
      updateGtagConsent(true);
      updateMetaPixelConsent(true);
      trackPageView();
      loadClarity();
    } else if (consent === "rejected") {
      updateGtagConsent(false);
      updateMetaPixelConsent(false);
    }
  }, [consent, ready]);

  useEffect(() => {
    if (!ready) return;
    if (consent !== "accepted") return;
    if (typeof window.gtag === "function") {
      trackPageView();
    }
  }, [pathname, ready, consent]);

  const lastMetaPath = useRef<string | null>(null);
  useEffect(() => {
    if (lastMetaPath.current === null) {
      lastMetaPath.current = pathname;
      return;
    }
    if (lastMetaPath.current === pathname) return;
    lastMetaPath.current = pathname;
    if (metaBootstrappedPath.current === pathname) {
      metaBootstrappedPath.current = null;
      return;
    }
    if (consent !== "accepted") return;
    trackMetaPageView();
  }, [pathname, consent]);

  // Fallback loader only: the worker early head fetches fbevents.js async with
  // the document, so PageView is not gated on hero decode, animation frames, or
  // idle. This path covers preview / dev where no early head exists.
  return needsMetaLibrary ? (
    <Script
      id="meta-pixel-library"
      src="https://connect.facebook.net/en_US/fbevents.js"
      strategy="afterInteractive"
    />
  ) : null;
}
