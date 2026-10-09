"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@/i18n/navigation";
import type { IndustrySlug } from "@/content/industries";

export type MarketHubItem = {
  slug: IndustrySlug;
  href: string;
  eyebrow: string;
  title: string;
  still: string;
  stillAlt: string;
};

type Props = {
  markets: MarketHubItem[];
  ariaLabel: string;
};

/** One market still, with the preview set as a type index beside the hero. */
export function MarketHubStage({ markets, ariaLabel }: Props) {
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
    <div className="hub-stage">
      <Link href={active.href} className="hub-stage__still">
        <img
          key={active.slug}
          src={active.still}
          alt={active.stillAlt}
          width={720}
          height={450}
          className="hub-stage__img"
        />
      </Link>
      <div className="hub-stage__read">
        <p className="hub-stage__role">{active.eyebrow}</p>
        <Link href={active.href} className="hub-stage__title">
          {active.title}
        </Link>
      </div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="hub-stage__list"
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
              tabIndex={selected ? 0 : -1}
              className={selected ? "hub-stage__row is-active" : "hub-stage__row"}
              onClick={() => select(index)}
              onMouseEnter={() => select(index)}
              onFocus={() => select(index)}
            >
              <span className="hub-stage__name">{market.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
