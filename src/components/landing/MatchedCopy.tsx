"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { resolveLandingMessage } from "@/lib/landing-message-match";

/**
 * Query-matched copy updates after hydration.
 * Reading useSearchParams during render bails the server out to a <template>
 * inside the headline, and that mismatch is React error #418 in production.
 */

type HeadlineProps = {
  fallback: string[];
};

function matchedMessage(locale: Locale) {
  const params = new URLSearchParams(window.location.search);
  return resolveLandingMessage({
    utmContent: params.get("utm_content"),
    utmCampaign: params.get("utm_campaign"),
    market: params.get("market"),
    locale,
  });
}

function sameLines(current: readonly string[], next: readonly string[]) {
  return (
    current.length === next.length &&
    current.every((line, index) => line === next[index])
  );
}

export function MatchedHeadline({ fallback }: HeadlineProps) {
  const locale = useLocale() as Locale;
  const [lines, setLines] = useState<readonly string[]>(fallback);

  useEffect(() => {
    const message = matchedMessage(locale);
    const next = message.headlineLines.length ? message.headlineLines : fallback;
    setLines((current) => (sameLines(current, next) ? current : next));
  }, [locale, fallback]);

  return (
    <>
      {lines.map((line, index) => (
        <span
          key={line}
          className={
            index === lines.length - 1
              ? "lp-web-hero__line lp-web-hero__line--signal"
              : "lp-web-hero__line"
          }
        >
          {line}
        </span>
      ))}
    </>
  );
}

type MarketProps = {
  fallback: string;
};

export function MatchedMarketLine({ fallback }: MarketProps) {
  const locale = useLocale() as Locale;
  const [line, setLine] = useState(fallback);

  useEffect(() => {
    const message = matchedMessage(locale);
    setLine(message.marketLine || fallback);
  }, [locale, fallback]);

  return <>{line}</>;
}
