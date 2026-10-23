import { Illustration } from "./artwork";

export type Step = { tab: string; title: string; text: string; label?: string };

const STEP_ILLUSTRATIONS: Record<string, string> = {
  Preview: "process-preview",
  Plan: "process-plan",
  Build: "process-build",
  Launch: "process-launch",
  Grow: "process-grow",
};

export default function Stepper({ steps }: { steps: Step[] }) {
  return (
    <div className="stepper">
      <div className="stepper__tabs" role="tablist" aria-label="Process steps">
        {steps.map((s, k) => (
          <button
            key={s.tab}
            type="button"
            role="tab"
            id={`tab-${k}`}
            aria-controls={`panel-${k}`}
            aria-selected={k === 0}
            tabIndex={k === 0 ? 0 : -1}
            className={k === 0 ? "is-active" : ""}
          >
            {s.label ?? s.tab}
          </button>
        ))}
      </div>
      <div className="stepper__panels">
        {steps.map((s, k) => (
          <div key={s.tab} role="tabpanel" id={`panel-${k}`} aria-labelledby={`tab-${k}`} className={`panel${k === 0 ? " is-active" : ""}`}>
            <Illustration name={STEP_ILLUSTRATIONS[s.tab] || "process-preview"} alt={s.tab} className="panel__img" width={420} height={280} />
            <div><h3>{s.title}</h3><p>{s.text}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
