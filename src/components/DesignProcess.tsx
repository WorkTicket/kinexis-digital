import { DESIGN_PROCESS_STEPS } from "@/lib/content";

type Step = (typeof DESIGN_PROCESS_STEPS)[number];

type DesignProcessProps = {
  steps?: readonly Step[];
  shareLabel?: string;
  deliverLabel?: string;
};

export default function DesignProcess({
  steps = DESIGN_PROCESS_STEPS,
  shareLabel = "You share",
  deliverLabel = "We deliver",
}: DesignProcessProps) {
  const firstShare = steps.findIndex((step) => step.phase === "share");
  const firstDeliver = steps.findIndex((step) => step.phase === "deliver");

  return (
    <ol className="design-process">
      {steps.map((step, i) => {
        const n = i + 1;
        const isLast = i === steps.length - 1;
        const phaseLabel =
          i === firstShare ? shareLabel : i === firstDeliver ? deliverLabel : null;
        const phaseClass =
          i === firstShare ? "share" : i === firstDeliver ? "deliver" : null;

        return (
          <li
            key={step.title}
            className={`design-process__step design-process__step--${step.phase}${isLast ? " is-last" : ""}`}
          >
            {phaseLabel && phaseClass ? (
              <p className={`design-process__phase design-process__phase--${phaseClass}`}>
                <span>{phaseLabel}</span>
              </p>
            ) : null}
            <div className="design-process__rail" aria-hidden="true">
              <span className="design-process__num">{n}</span>
              {!isLast ? <span className="design-process__line" /> : null}
            </div>
            <div className="design-process__copy">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
