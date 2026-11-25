import Link from "next/link";
import { Illustration } from "./artwork";
import type { Step } from "./Stepper";

const STEP_ILLUSTRATIONS: Record<string, string> = {
  Preview: "process-preview",
  Plan: "process-plan",
  Build: "process-build",
  Launch: "process-launch",
  Grow: "process-grow",
};

export default function ProcessFlow({
  steps,
  ctaHref = "/contact",
  ctaLabel = "Get My Free Preview",
}: {
  steps: Step[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="process-flow">
      <div className="process-flow__steps">
        {steps.map((s, k) => {
          const reverse = k % 2 === 1;
          const art = STEP_ILLUSTRATIONS[s.tab] || "process-preview";
          return (
            <article
              key={s.tab}
              id={`process-${s.tab.toLowerCase()}`}
              className={`process-flow__step${reverse ? " process-flow__step--reverse" : ""}`}
            >
              <div className="process-flow__copy">
                <div className="process-flow__meta">
                  <span className="process-flow__badge" aria-hidden="true">{k + 1}</span>
                  <span className="process-flow__chip">{s.label ?? s.tab}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {k === 0 || k === steps.length - 1 ? (
                  <p className="btn-row process-flow__btn-row">
                    <Link className="btn btn--primary" href={ctaHref} prefetch={false}>
                      {ctaLabel}
                    </Link>
                  </p>
                ) : null}
              </div>
              <div className="process-flow__art" aria-hidden="true">
                <div className="process-flow__frame">
                  <span className="process-flow__blob process-flow__blob--a" />
                  <span className="process-flow__blob process-flow__blob--b" />
                  <Illustration name={art} alt="" className="process-flow__img" width={480} height={320} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
