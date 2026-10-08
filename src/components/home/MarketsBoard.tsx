"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { IndustrySlug } from "@/content/industries";

export type MarketPlate = {
  slug: IndustrySlug;
  href: string;
  eyebrow: string;
  title: string;
  summary: string;
  focus: string[];
  still: string;
  stillAlt: string;
};

type Props = {
  markets: MarketPlate[];
  ariaLabel: string;
};

export function MarketsBoard({ markets, ariaLabel }: Props) {
  const [activeSlug, setActiveSlug] = useState<IndustrySlug>(
    markets[0]?.slug ?? "home-services",
  );
  const active = markets.find((market) => market.slug === activeSlug) ?? markets[0];

  if (!active) return null;

  return (
    <div className="markets-board">
      <div className="markets-board__list" aria-label={ariaLabel}>
        {markets.map((market) => {
          const selected = market.slug === active.slug;
          return (
            <Link
              key={market.slug}
              href={market.href}
              className={`markets-board__row${selected ? " is-active" : ""}`}
              aria-current={selected ? "true" : undefined}
              onMouseEnter={() => setActiveSlug(market.slug)}
              onFocus={() => setActiveSlug(market.slug)}
            >
              <span className="markets-board__kicker">{market.eyebrow}</span>
              <span className="markets-board__name">{market.title}</span>
            </Link>
          );
        })}
      </div>

      <div className="markets-board__stage" aria-live="polite">
        <div key={active.slug} className="markets-board__stage-inner">
          <div className="markets-board__still">
            <img
              src={active.still}
              alt={active.stillAlt}
              width={720}
              height={480}
              className="ind-visual__img ind-visual__img--thumb"
            />
          </div>
          <p className="markets-board__role">{active.eyebrow}</p>
          <h3 className="markets-board__title">
            <Link href={active.href}>{active.title}</Link>
          </h3>
          <p className="markets-board__summary">{active.summary}</p>
          <ul className="markets-board__focus">
            {active.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
