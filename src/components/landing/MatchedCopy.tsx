"use client";

import { useSearchParams } from "next/navigation";
import { resolveLandingMessage } from "@/lib/landing-message-match";

type HeadlineProps = {
  fallback: string[];
};

export function MatchedHeadline({ fallback }: HeadlineProps) {
  const params = useSearchParams();
  const message = resolveLandingMessage({
    utmContent: params.get("utm_content"),
    utmCampaign: params.get("utm_campaign"),
    market: params.get("market"),
  });
  const lines = message.headlineLines.length ? message.headlineLines : fallback;

  return (
    <>
      {lines.map((line) => (
        <span key={line} className="lp-web-hero__line">
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
  const params = useSearchParams();
  const message = resolveLandingMessage({
    utmContent: params.get("utm_content"),
    utmCampaign: params.get("utm_campaign"),
    market: params.get("market"),
  });

  return <>{message.marketLine || fallback}</>;
}
