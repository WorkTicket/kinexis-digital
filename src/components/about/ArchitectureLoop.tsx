"use client";

import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ArchitectureNode } from "@/content/about";

/** Reading order around the center mark. Arrow keys follow the grid. */
const GRID: Record<string, { c: number; r: number }> = {
  seo: { c: 0, r: 0 },
  "paid-ads": { c: 1, r: 0 },
  "web-design": { c: 0, r: 1 },
  email: { c: 1, r: 1 },
  cro: { c: 0, r: 2 },
  analytics: { c: 1, r: 2 },
};

const SLOT: Record<string, string> = {
  seo: "about-loop__node--seo",
  "paid-ads": "about-loop__node--ads",
  "web-design": "about-loop__node--web",
  email: "about-loop__node--mail",
  cro: "about-loop__node--cro",
  analytics: "about-loop__node--data",
};

const READING = ["seo", "paid-ads", "web-design", "email", "cro", "analytics"];

type Point = { x: number; y: number };
type Arc = { id: string; d: string };
type Diagram = { w: number; h: number; arcs: Arc[] };

function leaveBox(origin: Point, toward: Point, halfW: number, halfH: number): Point {
  const dx = toward.x - origin.x;
  const dy = toward.y - origin.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const tx = halfW / Math.max(Math.abs(ux), 0.08);
  const ty = halfH / Math.max(Math.abs(uy), 0.08);
  return {
    x: origin.x + ux * (Math.min(tx, ty) + 10),
    y: origin.y + uy * (Math.min(tx, ty) + 10),
  };
}

function nudge(point: Point, toward: Point, distance: number): Point {
  const dx = toward.x - point.x;
  const dy = toward.y - point.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: point.x + (dx / len) * distance, y: point.y + (dy / len) * distance };
}

type Props = {
  nodes: ArchitectureNode[];
  caption: string;
  oneLabel: string;
  sharpensLabel: string;
  ariaLabel: string;
};

export function ArchitectureLoop({
  nodes,
  caption,
  oneLabel,
  sharpensLabel,
  ariaLabel,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "seo");
  const [diagram, setDiagram] = useState<Diagram>({ w: 640, h: 440, arcs: [] });

  const ordered = [...nodes].sort(
    (a, b) => READING.indexOf(a.id) - READING.indexOf(b.id),
  );
  const current = nodes.find((node) => node.id === activeId) ?? nodes[0];
  const linked = new Set(current?.sharpens ?? []);
  const related = ordered.filter((node) => linked.has(node.id));

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !current) return;

    const draw = () => {
      const box = stage.getBoundingClientRect();
      if (box.width < 8 || box.height < 8) return;
      const hubEl = stage.querySelector<HTMLElement>(".about-loop__one");
      if (!hubEl) return;
      const hubRect = hubEl.getBoundingClientRect();
      const hub = {
        x: hubRect.left + hubRect.width / 2 - box.left,
        y: hubRect.top + hubRect.height / 2 - box.top,
      };
      const arcs: Arc[] = [];
      for (const id of [current.id, ...current.sharpens]) {
        const nodeEl =
          nodeRefs.current[id] ??
          stage.querySelector<HTMLButtonElement>(`[id$="-tab-${CSS.escape(id)}"]`);
        if (!nodeEl) continue;
        const nodeRect = nodeEl.getBoundingClientRect();
        const node = {
          x: nodeRect.left + nodeRect.width / 2 - box.left,
          y: nodeRect.top + nodeRect.height / 2 - box.top,
        };
        const start = leaveBox(node, hub, nodeRect.width / 2, nodeRect.height / 2);
        const end = nudge(
          leaveBox(hub, node, hubRect.width / 2, hubRect.height / 2),
          node,
          10,
        );
        arcs.push({
          id,
          d: `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} L ${end.x.toFixed(1)} ${end.y.toFixed(1)}`,
        });
      }
      setDiagram({ w: box.width, h: box.height, arcs });
    };

    draw();
    const frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(draw);
    observer.observe(stage);
    let cancelFonts = false;
    document.fonts?.ready.then(() => {
      if (!cancelFonts) draw();
    });
    return () => {
      cancelFonts = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [current]);

  function select(id: string, focusTab = false) {
    setActiveId(id);
    if (focusTab) nodeRefs.current[id]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const key = event.key;
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(key)) {
      return;
    }
    event.preventDefault();
    const pos = GRID[activeId] ?? { c: 0, r: 0 };
    let nextId = activeId;
    if (key === "Home") nextId = "seo";
    else if (key === "End") nextId = "analytics";
    else {
      let { c, r } = pos;
      if (key === "ArrowRight") c = Math.min(1, c + 1);
      if (key === "ArrowLeft") c = Math.max(0, c - 1);
      if (key === "ArrowDown") r = Math.min(2, r + 1);
      if (key === "ArrowUp") r = Math.max(0, r - 1);
      const found = Object.entries(GRID).find(([, cell]) => cell.c === c && cell.r === r);
      if (found) nextId = found[0];
    }
    if (!nodes.some((node) => node.id === nextId)) return;
    select(nextId, true);
  }

  if (!current) return null;

  return (
    <div className="about-loop">
      <figure className="about-loop__figure">
        <div className="about-loop__stage" ref={stageRef}>
          <svg
            className="about-loop__arcs"
            viewBox={`0 0 ${diagram.w} ${diagram.h}`}
            aria-hidden
          >
            {diagram.arcs.map((arc) => (
              <path
                key={`${current.id}-${arc.id}`}
                d={arc.d}
                pathLength={1}
                className="about-loop__arc"
              />
            ))}
          </svg>
          <div
            role="tablist"
            aria-label={ariaLabel}
            className="about-loop__grid"
            onKeyDown={onKeyDown}
          >
            {ordered.map((node) => {
              const selected = node.id === current.id;
              const isLinked = linked.has(node.id);
              return (
                <button
                  key={node.id}
                  ref={(el) => {
                    nodeRefs.current[node.id] = el;
                  }}
                  id={`${uid}-tab-${node.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  className={[
                    "about-loop__node",
                    SLOT[node.id] ?? "",
                    selected ? "is-active" : "",
                    isLinked ? "is-linked" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => select(node.id)}
                  onMouseEnter={() => select(node.id)}
                  onFocus={() => select(node.id)}
                >
                  <span className="about-loop__tick" aria-hidden />
                  <span className="about-loop__mark-name">{node.mark}</span>
                </button>
              );
            })}
          </div>
          <p className="about-loop__one" aria-hidden>
            {oneLabel}
          </p>
        </div>
        <figcaption className="about-loop__caption">{caption}</figcaption>
      </figure>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${current.id}`}
        className="about-loop__panel"
      >
        <div key={current.id} className="about-loop__live">
          <p className="about-loop__role">{current.role}</p>
          <h3 className="about-loop__title">{current.label}</h3>
          <p className="about-loop__copy">{current.summary}</p>
          {related.length > 0 ? (
            <div className="about-loop__sharpens">
              <p id={`${uid}-sharpens`} className="about-loop__sharpens-label">
                {sharpensLabel}
              </p>
              <div className="about-loop__marks" role="group" aria-labelledby={`${uid}-sharpens`}>
                {related.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    className="about-loop__jump"
                    onClick={() => select(node.id, true)}
                  >
                    {node.mark}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
