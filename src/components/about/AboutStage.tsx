"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import "@/styles/routes/home-process.css";
import type { MethodMarkId } from "@/components/about/about-studies";
import { methodMarks } from "@/components/stage-marks";

export type AboutStageStep = {
  id: MethodMarkId;
  title: string;
  description: string;
};

type Props = {
  steps: AboutStageStep[];
  ariaLabel: string;
};

/** One phase lit, one piece of type. */
export function AboutStage({ steps, ariaLabel }: Props) {
  const uid = useId().replace(/:/g, "");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(0);
  const current = steps[active];

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
    const count = steps.length;
    let next = active;
    if (key === "Home") next = 0;
    else if (key === "End") next = count - 1;
    else if (key === "ArrowRight" || key === "ArrowDown") next = (active + 1) % count;
    else next = (active - 1 + count) % count;
    setActive(next);
    tabs.current[next]?.focus();
  }

  if (!current) return null;
  const Mark = methodMarks[current.id];

  return (
    <div className="process-stage process-stage--method">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="process-stage__rail"
        onKeyDown={onKeyDown}
      >
        {steps.map((step, index) => {
          const selected = index === active;
          return (
            <button
              key={step.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`${uid}-tab-${step.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              className={
                selected ? "process-stage__tab is-active" : "process-stage__tab"
              }
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className="process-stage__brush" aria-hidden />
              <span className="process-stage__name">{step.title}</span>
            </button>
          );
        })}
      </div>
      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-live="polite"
        aria-labelledby={`${uid}-tab-${current.id}`}
        className="process-stage__panel"
      >
        <div key={current.id} className="process-stage__live">
          <div className="process-stage__study process-stage__study--mark" aria-hidden>
            <Mark />
          </div>
          <p className="process-stage__read">{current.description}</p>
        </div>
      </div>
    </div>
  );
}
