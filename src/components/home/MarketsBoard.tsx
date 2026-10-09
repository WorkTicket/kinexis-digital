"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
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

/**
 * One market lit at a time. The index selects; the plate and title link through.
 */
export function MarketsBoard({ markets, ariaLabel }: Props) {
  const uid = useId().replace(/:/g, "");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeSlug, setActiveSlug] = useState<IndustrySlug>(
    markets[0]?.slug ?? "home-services",
  );
  const activeIndex = Math.max(
    0,
    markets.findIndex((market) => market.slug === activeSlug),
  );
  const active = markets[activeIndex] ?? markets[0];

  function select(index: number) {
    const market = markets[index];
    if (!market) return;
    setActiveSlug(market.slug);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const key = event.key;
    if (
      !["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(
        key,
      )
    ) {
      return;
    }
    event.preventDefault();
    const count = markets.length;
    let next = activeIndex;
    if (key === "Home") next = 0;
    else if (key === "End") next = count - 1;
    else if (key === "ArrowRight" || key === "ArrowDown") next = (activeIndex + 1) % count;
    else next = (activeIndex - 1 + count) % count;
    select(next);
    tabs.current[next]?.focus();
  }

  if (!active) return null;

  return (
    <div className="markets-board">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="markets-board__list"
        onKeyDown={onKeyDown}
      >
        {markets.map((market, index) => {
          const selected = market.slug === active.slug;
          return (
            <button
              key={market.slug}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`${uid}-tab-${market.slug}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              className={
                selected ? "markets-board__row is-active" : "markets-board__row"
              }
              onClick={() => select(index)}
              onMouseEnter={() => select(index)}
              onFocus={() => select(index)}
            >
              <span className="markets-board__name">{market.title}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-live="polite"
        aria-labelledby={`${uid}-tab-${active.slug}`}
        className="markets-board__stage"
      >
        <div key={active.slug} className="markets-board__stage-inner">
          <Link href={active.href} className="markets-board__still">
            <img
              src={active.still}
              alt={active.stillAlt}
              width={720}
              height={480}
              className="markets-board__img"
            />
          </Link>
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
