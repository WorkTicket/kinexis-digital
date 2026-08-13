import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { duration } from "@/lib/motion";
import type { IndustryProcessStep } from "@/content/industries";
import { getProcessIcon } from "@/components/industry/industry-icons";

type Props = {
  title: string;
  copy: string;
  steps: IndustryProcessStep[];
  accentColor?: string;
  className?: string;
};

export function IndustryProcessSteps({
  title,
  copy,
  steps,
  accentColor,
  className,
}: Props) {
  if (!steps || steps.length === 0) return null;

  const accentStyle = accentColor
    ? ({ "--industry-accent": accentColor } as CSSProperties)
    : undefined;

  return (
    <section
      aria-labelledby="industry-process-heading"
      className={cn(
        "industry-process chapter chapter--void relative overflow-hidden",
        className,
      )}
      style={accentStyle}
    >
      <div className="shell relative z-[1] py-24 md:py-32 lg:py-40">
        <Reveal variant="rise" when="chapter" className="industry-process__mast">
          <header>
            <p className="section-eyebrow">Process</p>
            <h2
              id="industry-process-heading"
              className="industry-process__heading"
            >
              {title}
            </h2>
            <p className="industry-process__dek">{copy}</p>
          </header>
        </Reveal>

        <RevealGroup
          as="ol"
          className="industry-process__stack"
          stagger={duration.staggerTight}
          delayChildren={0.06}
          aria-label="Engagement steps"
        >
          {steps.map((step, index) => {
            const Icon = getProcessIcon(step.title, index);
            return (
              <RevealItem key={step.title} as="li" variant="fadeUp">
                <article className="industry-process__block motion-card">
                  <span className="icon-well" aria-hidden>
                    <Icon strokeWidth={1.5} />
                  </span>
                  <div className="industry-process__copy">
                    <h3 className="industry-process__title">{step.title}</h3>
                    <p className="industry-process__body">{step.detail}</p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
