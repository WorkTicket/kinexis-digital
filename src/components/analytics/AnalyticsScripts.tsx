"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";
import {
  getGaMeasurementId,
  getGoogleAdsId,
  getGtagLoaderId,
} from "@/lib/analytics/ads-config";
import { captureClickIds } from "@/lib/analytics/click-ids";
import { updateGtagConsent } from "@/lib/analytics/consent";

const GA_ID = getGaMeasurementId();
const ADS_ID = getGoogleAdsId();
const LOADER_ID = getGtagLoaderId();
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __kinexisClarityLoaded?: boolean;
  }
}

function loadGtag() {
  if (!LOADER_ID) return;
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    return;
  }

  const script = document.createElement("script");
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

  // Capture gclid / UTMs on every landing (before consent — URL params only)
  useEffect(() => {
    captureClickIds();
  }, [pathname]);

  // External gtag.js is idle-deferred so it never contends with LCP.
  // The inline consent default in layout still queues calls on dataLayer.
  useEffect(() => {
    if (!LOADER_ID) return;

    const start = () => loadGtag();
    if (typeof requestIdleCallback === "function") {
      const idleId = requestIdleCallback(start, { timeout: 4000 });
      return () => cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(start, 2000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const trackPageView = () => {
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
      trackPageView();
      loadClarity();
    } else if (consent === "rejected") {
      updateGtagConsent(false);
    }
  }, [consent, ready]);

  useEffect(() => {
    if (!ready) return;
    if (consent !== "accepted") return;
    if (typeof window.gtag === "function") {
      trackPageView();
    }
  }, [pathname, ready, consent]);

  if (!GA_ID && !ADS_ID) return null;

  return null;
}
