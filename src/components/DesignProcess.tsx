import { DESIGN_PROCESS_STEPS } from "@/lib/content";
import { Icon } from "./artwork";

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
  const share = steps.filter((step) => step.phase === "share");
  const deliver = steps.filter((step) => step.phase === "deliver");

  return (
    <div className="design-process">
      <div className="design-process__band design-process__band--share">
        <p className="design-process__phase">
          <span>{shareLabel}</span>
        </p>
        <ol className="design-process__row">
          {share.map((step, i) => (
            <ProcessStep key={step.title} step={step} n={i + 1} />
          ))}
        </ol>
      </div>
      <div className="design-process__bridge" aria-hidden="true">
        <span />
      </div>
      <div className="design-process__band design-process__band--deliver">
        <p className="design-process__phase">
          <span>{deliverLabel}</span>
        </p>
        <ol className="design-process__row" start={share.length + 1}>
          {deliver.map((step, i) => (
            <ProcessStep key={step.title} step={step} n={share.length + i + 1} />
          ))}
        </ol>
      </div>
    </div>
  );
}

function ProcessStep({ step, n }: { step: Step; n: number }) {
  const highlight = "highlight" in step && step.highlight;
  return (
    <li className={`design-process__step${highlight ? " is-highlight" : ""}`}>
      <div className="design-process__mark">
        <span className="design-process__icon">
          <Icon name={step.icon} alt="" size={88} className="icon--bare" />
        </span>
        <span className="design-process__num" aria-hidden="true">{n}</span>
      </div>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </li>
  );
}
