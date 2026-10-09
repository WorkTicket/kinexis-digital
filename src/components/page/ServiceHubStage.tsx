"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { HomeServiceSlug } from "@/content/home-services";

export type ServiceHubItem = {
  slug: HomeServiceSlug;
  href: string;
  role: string;
  title: string;
  still: string;
  stillAlt: string;
};

type Props = {
  items: ServiceHubItem[];
  ariaLabel: string;
};

/** Right-rail program: one service plate live, the rest of the mix as links. */
export function ServiceHubStage({ items, ariaLabel }: Props) {
  const [activeSlug, setActiveSlug] = useState<HomeServiceSlug>(
    items[0]?.slug ?? "web-design",
  );
  const active = items.find((item) => item.slug === activeSlug) ?? items[0];

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
        <p className="hub-stage__role">{active.role}</p>
        <Link href={active.href} className="hub-stage__title">
          {active.title}
        </Link>
      </div>
      <nav className="hub-stage__list" aria-label={ariaLabel}>
        {items.map((item) => {
          const selected = item.slug === active.slug;
          return (
            <Link
              key={item.slug}
              href={item.href}
              className={selected ? "hub-stage__row is-active" : "hub-stage__row"}
              onMouseEnter={() => setActiveSlug(item.slug)}
              onFocus={() => setActiveSlug(item.slug)}
            >
              <span className="hub-stage__name">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
