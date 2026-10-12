"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";
import { getGtagLoaderId, getGaMeasurementId, getGoogleAdsId, getMetaPixelId } from "@/lib/analytics/ads-config";
import { buildGtagInitScript } from "@/lib/analytics/conversion-snippet";
import { shouldLoadGoogleTracking } from "@/lib/analytics/google-tracking";
import { captureClickIds } from "@/lib/analytics/click-ids";
import { updateGtagConsent } from "@/lib/analytics/consent";
import { trackMetaPageView, updateMetaPixelConsent, buildMetaPixelInitScript } from "@/lib/analytics/meta-pixel";
import { shouldLoadMetaTracking } from "@/lib/analytics/meta-tracking";
import { peekPendingConversion } from "@/lib/analytics/pending-conversion";

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

  // Capture gclid / fbclid / UTMs on every landing (before consent — URL params only)
  useEffect(() => {
    captureClickIds();
  }, [pathname]);

  // Fallback if the inline head loader did not inject gtag.js.
  useEffect(() => {
    loadGtag();
  }, [pathname]);

  useEffect(() => {
    if (!shouldLoadMetaTracking(pathname, peekPendingConversion()) && window.__kinexisMetaTrackingPath !== pathname) {
      // Revoke an already loaded pixel when navigating out of the funnel.
      if (typeof window.fbq === "function") window.fbq("consent", "revoke");
      delete window.__kinexisMetaTrackingPath;
      return;
    }
    if (typeof window.fbq === "function") {
      updateMetaPixelConsent(consent === "accepted" || (consent === "pending" && window.__kinexisMetaDefaultConsent === "grant"));
      return;
    }
    window.__kinexisMetaTrackingPath = pathname;
    metaBootstrappedPath.current = pathname;
    const script = document.createElement("script");
    script.textContent = buildMetaPixelInitScript(getMetaPixelId(), {
      defaultConsent: consent === "pending" ? window.__kinexisMetaDefaultConsent ?? "revoke" : consent === "accepted" ? "grant" : "revoke",
    });
    document.head.appendChild(script);
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
    if (consent === "rejected") return;
    trackMetaPageView();
  }, [pathname, consent]);

  return null;
}
