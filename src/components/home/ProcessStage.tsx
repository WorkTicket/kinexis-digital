import { ArrowRight } from "lucide-react";
import "@/styles/routes/home-process.css";
import { processMarks } from "@/components/stage-marks";
import type { HomeProcessStep } from "@/content/home-process";

type Props = {
  steps: HomeProcessStep[];
  ariaLabel: string;
};

export function ProcessStage({ steps, ariaLabel }: Props) {
  return (
    <ol className="process-overview" aria-label={ariaLabel}>
      {steps.map((step, index) => {
        const Mark = processMarks[step.id];
        return (
          <li key={step.id} className="process-overview__step">
            <div className="process-overview__meta" aria-hidden="true">
              {index < steps.length - 1 ? <ArrowRight size={20} /> : null}
            </div>
            <div className="process-overview__art" aria-hidden="true">
              <Mark />
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
