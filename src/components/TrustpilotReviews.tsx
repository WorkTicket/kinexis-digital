"use client";

import { useEffect, useRef } from "react";
import {
  TRUSTPILOT_BUSINESS_UNIT_ID,
  TRUSTPILOT_PROFILE_URL,
  TRUSTPILOT_REVIEW_COLLECTOR_TEMPLATE_ID,
} from "@/lib/trustpilot";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, forceReload?: boolean) => void;
    };
  }
}

/** Free-plan Trustpilot Review Collector — “Review us on Trustpilot” button. */
export function LeaveTrustpilotReview({
  locale = "en-US",
}: {
  locale?: string;
  /** Kept for call-site compatibility; the TrustBox supplies its own label. */
  primary?: boolean;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const load = () => {
      window.Trustpilot?.loadFromElement(el, true);
    };

    if (window.Trustpilot) {
      load();
      return;
    }

    const timer = window.setInterval(() => {
      if (!window.Trustpilot) return;
      window.clearInterval(timer);
      load();
    }, 200);

    return () => window.clearInterval(timer);
  }, [locale]);

  return (
    <div className="trustpilot-collector">
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale={locale}
        data-template-id={TRUSTPILOT_REVIEW_COLLECTOR_TEMPLATE_ID}
        data-businessunit-id={TRUSTPILOT_BUSINESS_UNIT_ID}
        data-style-height="52px"
        data-style-width="100%"
      >
        <a href={TRUSTPILOT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          Trustpilot
        </a>
      </div>
    </div>
  );
}
