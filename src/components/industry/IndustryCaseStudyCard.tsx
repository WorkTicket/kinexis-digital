import Image from "next/image";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { IndustryCaseStudy } from "@/content/industries";
import { industryProofImage } from "@/content/industry-visuals";

type Props = {
  title: string;
  caseStudy: IndustryCaseStudy;
  className?: string;
};

export function IndustryCaseStudyCard({
  title,
  caseStudy,
  className,
}: Props) {
  const proofSrc = industryProofImage(caseStudy.href);

  return (
    <section
      aria-labelledby="industry-proof-heading"
      className={cn("chapter chapter--void relative overflow-hidden", className)}
    >
      <div className="shell relative z-[1] py-24 md:py-32 lg:py-40">
        <Reveal variant="rise" when="chapter">
          <header className="industry-section-mast mb-12 md:mb-16">
            <p className="section-eyebrow">Proof</p>
            <h2
              id="industry-proof-heading"
              className="mt-5 max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(2.35rem,5vw+0.15rem,4rem)] font-bold leading-[0.96] tracking-[-0.05em] text-balance text-foreground"
            >
              {title}
            </h2>
          </header>
        </Reveal>

        <div
          className={cn(
            "proof-asymmetric",
            proofSrc && "proof-asymmetric--media",
          )}
        >
          <Reveal variant="fadeUp" delay={0.08}>
            <div className="proof-asymmetric__stat">
              <span className="proof-asymmetric__stat-value">
                {caseStudy.resultValue}
              </span>
              <span className="proof-asymmetric__stat-label">
                {caseStudy.resultLabel}
              </span>
            </div>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.14}>
            <div className="proof-asymmetric__body">
              <p className="proof-asymmetric__client">{caseStudy.client}</p>
              <p className="proof-asymmetric__result">{caseStudy.result}</p>

              {caseStudy.href ? (
                <div className="proof-asymmetric__cta">
                  <Button href={caseStudy.href} variant="link" arrow>
                    Read case study
                  </Button>
                </div>
              ) : null}
            </div>
          </Reveal>

          {proofSrc ? (
            <Reveal
              variant="fadeUp"
              delay={0.18}
              className="proof-asymmetric__media"
            >
              <MediaFrame shot size="lg" className="proof-asymmetric__frame">
                <Image
                  src={proofSrc}
                  alt={`${caseStudy.client} project preview`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="proof-asymmetric__img"
                />
              </MediaFrame>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
