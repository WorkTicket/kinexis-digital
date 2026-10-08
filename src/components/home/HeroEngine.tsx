"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@/i18n/navigation";

export type HeroEngineSegment = {
  id: "search" | "web" | "ads" | "brand";
  href: string;
  label: string;
  role: string;
  title: string;
  body: string;
};

type Props = {
  ariaLabel: string;
  mark: string;
  kicker: string;
  proof: string;
  segments: HeroEngineSegment[];
};

type ChannelId = HeroEngineSegment["id"];

const CX = 380;
const CY = 300;
const RING = 152;
const SWEEP = 72;
const LABEL_R = 232;

/** Centers sit on the diagonals so the cuts land on the cross. */
const CHANNELS: Array<{ id: ChannelId; center: number }> = [
  { id: "search", center: 315 },
  { id: "ads", center: 45 },
  { id: "brand", center: 135 },
  { id: "web", center: 225 },
];

const GAPS = [0, 90, 180, 270];

function polar(radius: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: CX + radius * Math.sin(rad),
    y: CY - radius * Math.cos(rad),
  };
}

function arc(radius: number, start: number, sweep: number) {
  const from = polar(radius, start);
  const to = polar(radius, start + sweep);
  const large = sweep > 180 ? 1 : 0;
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

/** Instrument marks. Same stroke weight, same optical size, one per channel. */
function ChannelGlyph({ id }: { id: ChannelId }) {
  if (id === "search") {
    return (
      <g className="hero-engine__glyph">
        <circle cx="-1.5" cy="-1.5" r="5.15" />
        <path d="M2.4 2.4 7.15 7.15" />
      </g>
    );
  }
  if (id === "web") {
    return (
      <g className="hero-engine__glyph">
        <rect x="-7.5" y="-5.7" width="15" height="11.4" rx="1.55" />
        <path d="M-7.5 -2.15h15" />
      </g>
    );
  }
  if (id === "ads") {
    return (
      <g className="hero-engine__glyph">
        <path d="M-6.3 5.4V0.2M0 5.4V-2.8M6.3 5.4V-5.6" />
      </g>
    );
  }
  return (
    <g className="hero-engine__glyph">
      <path d="M0 -7.15 6.15 0 0 7.15 -6.15 0Z" />
      <circle className="hero-engine__glyph-dot" r="1.65" />
    </g>
  );
}

/**
 * Homepage program dial. Four equal channels, one live.
 * The live arc and the center readout change together.
 */
export function HeroEngine({ ariaLabel, mark, kicker, proof, segments }: Props) {
  const uid = useId().replace(/:/g, "");
  const tabs = useRef<Array<SVGGElement | null>>([]);
  const [activeId, setActiveId] = useState<ChannelId>("brand");

  const byId = new Map(segments.map((segment) => [segment.id, segment]));
  const active = byId.get(activeId) ?? segments[0];
  const activeIndex = Math.max(
    0,
    CHANNELS.findIndex((channel) => channel.id === active?.id),
  );

  function onKeyDown(event: KeyboardEvent<SVGSVGElement>) {
    const key = event.key;
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(key)) {
      return;
    }
    event.preventDefault();
    const count = CHANNELS.length;
    let next = activeIndex;
    if (key === "Home") next = 0;
    else if (key === "End") next = count - 1;
    else if (key === "ArrowRight" || key === "ArrowDown") next = (activeIndex + 1) % count;
    else next = (activeIndex - 1 + count) % count;
    const id = CHANNELS[next]?.id;
    if (!id) return;
    setActiveId(id);
    tabs.current[next]?.focus();
  }

  if (!active) return null;

  const panelId = `${uid}-panel`;

  return (
    <div className="hero-engine" data-active={active.id}>
      <div className="hero-engine__stage">
        <svg
          className="hero-engine__svg"
          viewBox="128 108 504 384"
          role="tablist"
          aria-label={ariaLabel}
          onKeyDown={onKeyDown}
        >
          <circle className="hero-engine__well" cx={CX} cy={CY} r="122" />
          <circle className="hero-engine__orbit" cx={CX} cy={CY} r="188" />

          {GAPS.map((deg) => {
            const from = polar(RING - 22, deg);
            const to = polar(RING + 22, deg);
            return (
              <line
                key={deg}
                className="hero-engine__gap"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              />
            );
          })}

          {CHANNELS.map((channel, index) => {
            const segment = byId.get(channel.id);
            if (!segment) return null;
            const selected = channel.id === active.id;
            const start = channel.center - SWEEP / 2;
            const badge = polar(RING, channel.center);
            const name = polar(LABEL_R, channel.center);
            const tabId = `${uid}-tab-${channel.id}`;

            return (
              <g
                key={channel.id}
                ref={(tab) => {
                  tabs.current[index] = tab;
                }}
                id={tabId}
                className={`hero-engine__tab${selected ? " is-active" : ""}`}
                role="tab"
                aria-label={`${segment.label}, ${segment.role}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(channel.id)}
                onMouseEnter={() => setActiveId(channel.id)}
                onFocus={() => setActiveId(channel.id)}
              >
                <path className="hero-engine__hit" d={arc(RING, start, SWEEP)} />
                <path className="hero-engine__arc" d={arc(RING, start, SWEEP)} />
                <g
                  className="hero-engine__badge"
                  transform={`translate(${badge.x.toFixed(2)} ${badge.y.toFixed(2)})`}
                  aria-hidden="true"
                >
                  <circle className="hero-engine__plate" r="18" />
                  <ChannelGlyph id={channel.id} />
                </g>
                <text
                  className={`hero-engine__name${selected ? " is-active" : ""}`}
                  x={name.x}
                  y={name.y}
                  textAnchor="middle"
                  aria-hidden="true"
                >
                  {segment.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active.id}`}
          className="hero-engine__readout"
        >
          <div key={active.id} className="hero-engine__readout-inner">
            <p className="hero-engine__role">{active.role}</p>
            <Link href={active.href} className="hero-engine__title">
              {active.title}
            </Link>
            <p className="hero-engine__body">{active.body}</p>
          </div>
        </div>
      </div>

      <p className="hero-engine__caption">
        <span className="hero-engine__mark">{mark}</span>
        <span className="hero-engine__caption-copy">
          {kicker}
          <span aria-hidden="true"> · </span>
          {proof}
        </span>
      </p>
    </div>
  );
}
