"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/components/analytics/CookieConsent";
import { getGtagLoaderId } from "@/lib/analytics/ads-config";
import { captureClickIds } from "@/lib/analytics/click-ids";
import { updateGtagConsent } from "@/lib/analytics/consent";
import { trackMetaPageView, updateMetaPixelConsent } from "@/lib/analytics/meta-pixel";

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

  // Capture gclid / fbclid / UTMs on every landing (before consent — URL params only)
  useEffect(() => {
    captureClickIds();
  }, [pathname]);

  // Fallback if the inline head loader did not inject gtag.js.
  useEffect(() => {
    loadGtag();
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
    if (consent === "rejected") return;
    trackMetaPageView();
  }, [pathname, consent]);

  return null;
}
