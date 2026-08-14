import { cn } from "@/lib/cn";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { duration } from "@/lib/motion";
import type { IndustryPainPoint } from "@/content/industries";

type Props = {
  title: string;
  copy: string;
  approachTitle: string;
  approachCopy: string;
  painPoints?: IndustryPainPoint[];
  className?: string;
};

export function IndustryPainPoints({
  title,
  copy,
  approachTitle,
  approachCopy,
  painPoints,
  className,
}: Props) {
  return (
    <>
      <section
        aria-labelledby="industry-pain-heading"
        className={cn(
          "industry-challenges chapter chapter--studio relative overflow-hidden",
          className,
        )}
      >
        <div className="shell relative z-[1] py-24 md:py-32 lg:py-40">
          <div className="industry-challenges__split">
            <Reveal variant="rise" when="chapter">
              <header className="industry-challenges__mast">
                <p className="section-eyebrow">Challenges</p>
                <h2
                  id="industry-pain-heading"
                  className="industry-challenges__heading"
                >
                  {title}
                </h2>
                <p className="industry-challenges__dek">{copy}</p>
              </header>
            </Reveal>

            {painPoints && painPoints.length > 0 ? (
              <RevealGroup
                as="ul"
                className="industry-challenge-grid"
                stagger={duration.staggerTight}
                delayChildren={0.06}
              >
                {painPoints.map((p) => (
                  <RevealItem key={p.title} as="li" variant="fadeUp">
                    <article className="industry-challenge">
                      <h3 className="industry-challenge__title">{p.title}</h3>
                      <p className="industry-challenge__body">{p.detail}</p>
                    </article>
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : null}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="industry-approach-heading"
        className="industry-approach-band chapter chapter--void relative overflow-hidden"
      >
        <div className="shell relative z-[1] py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter">
            <div className="industry-approach-band__inner">
              <p className="section-eyebrow">Approach</p>
              <h2
                id="industry-approach-heading"
                className="industry-approach-band__heading"
              >
                {approachTitle}
              </h2>
              <p className="industry-approach-band__body">{approachCopy}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
