"use client";

import { CookieConsentProvider } from "@/components/analytics/CookieConsent";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";

export function SiteAnalytics({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      {children}
      <AnalyticsScripts />
    </CookieConsentProvider>
  );
}
