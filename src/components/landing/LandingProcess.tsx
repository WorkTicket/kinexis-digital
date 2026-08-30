import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { LandingPageProcessStep } from "@/content/registry/landing-pages";
import { duration } from "@/lib/motion";

export function LandingProcess({
  title,
  intro,
  steps,
}: {
  title: string;
  intro: string;
  steps: LandingPageProcessStep[];
}) {
  return (
    <section
      id="how-it-runs"
      aria-labelledby="lp-process-heading"
      className="process-section chapter chapter--void relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter" className="mb-10 md:mb-14">
          <ChapterLead
            layout="split"
            eyebrow="Process"
            headingId="lp-process-heading"
            title={title}
            dek={intro}
          />
        </Reveal>

        <RevealGroup
          as="ol"
          className="process-spine"
          stagger={duration.staggerTight}
          delayChildren={0.06}
          aria-label="Project steps"
        >
          {steps.map((step) => (
            <RevealItem key={step.title} as="li" variant="fadeUp">
              <article className="process-spine__step">
                <h3 className="process-spine__title">{step.title}</h3>
                <p className="process-spine__body">{step.detail}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
