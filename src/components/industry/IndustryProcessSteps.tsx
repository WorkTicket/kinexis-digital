import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { duration } from "@/lib/motion";
import type { IndustryProcessStep } from "@/content/industries";

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
      <div className="shell chapter-shell--standard relative z-[1]">
        <div className="industry-process__layout">
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
            className="industry-process__rail"
            stagger={duration.staggerTight}
            delayChildren={0.06}
            aria-label="Engagement steps"
          >
            {steps.map((step) => (
              <RevealItem key={step.title} as="li" variant="fadeUp">
                <article className="industry-process__step">
                  <div className="industry-process__copy">
                    <h3 className="industry-process__title">{step.title}</h3>
                    <p className="industry-process__body">{step.detail}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
