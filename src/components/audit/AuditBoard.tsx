"use client";

import { ArrowRightLeft, Megaphone, Search, Smartphone, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { serviceVisuals } from "@/content/service-visuals";
import type { AuditLayer } from "@/content/marketing-audit";

const STILLS: Record<AuditLayer["id"], string> = {
  site: serviceVisuals["web-design"].src,
  search: serviceVisuals.seo.src,
  ads: serviceVisuals["paid-media"].src,
  handoff: serviceVisuals["content-marketing"].src,
};

const MARKS: Record<AuditLayer["id"], LucideIcon> = {
  site: Smartphone,
  search: Search,
  ads: Megaphone,
  handoff: ArrowRightLeft,
};

type Props = {
  layers: AuditLayer[];
  label: string;
};

/** One house still, four places you can open. */
export function AuditBoard({ layers, label }: Props) {
  const [active, setActive] = useState(0);
  const current = layers[active] ?? layers[0];
  if (!current) return null;

  return (
    <div className="audit-board">
      <figure className="audit-board__still" aria-hidden>
        <img
          key={current.id}
          src={STILLS[current.id]}
          alt=""
          width={1536}
          height={1024}
          className="audit-board__img"
        />
      </figure>
      <div className="audit-board__list" role="group" aria-label={label}>
        {layers.map((layer, index) => {
          const selected = index === active;
          const Icon = MARKS[layer.id];
          return (
            <button
              key={layer.id}
              type="button"
              aria-pressed={selected}
              className={selected ? "audit-board__row is-active" : "audit-board__row"}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <Icon className="audit-board__icon" strokeWidth={1.75} aria-hidden />
              <span className="audit-board__copy">
                <span className="audit-board__name">{layer.title}</span>
                <span className="audit-board__body">{layer.body}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
