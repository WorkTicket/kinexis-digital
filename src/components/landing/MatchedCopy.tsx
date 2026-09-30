"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { resolveLandingMessage } from "@/lib/landing-message-match";

type HeadlineProps = {
  fallback: string[];
};

export function MatchedHeadline({ fallback }: HeadlineProps) {
  const locale = useLocale() as Locale;
  const params = useSearchParams();
  const message = resolveLandingMessage({
    utmContent: params.get("utm_content"),
    utmCampaign: params.get("utm_campaign"),
    market: params.get("market"),
    locale,
  });
  const lines = message.headlineLines.length ? message.headlineLines : fallback;

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
  const params = useSearchParams();
  const message = resolveLandingMessage({
    utmContent: params.get("utm_content"),
    utmCampaign: params.get("utm_campaign"),
    market: params.get("market"),
    locale,
  });

  return <>{message.marketLine || fallback}</>;
}
