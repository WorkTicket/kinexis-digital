import { SitePreview } from "@/components/home/SitePreview";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { MediaReveal, Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type {
  LandingPageEntry,
  LandingPageProof,
} from "@/content/registry/landing-pages";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { duration } from "@/lib/motion";

export function LandingWorkSamples({
  title,
  intro,
  samples,
  proof,
}: {
  title: string;
  intro: string;
  samples: NonNullable<LandingPageEntry["samples"]>;
  proof?: LandingPageProof[];
}) {
  return (
    <section
      id="work"
      aria-labelledby="lp-work-heading"
      className="results-section chapter chapter--void relative"
    >
      <div className="shell chapter-shell--monument relative">
        <Reveal variant="rise" when="chapter" className="mb-4 md:mb-6">
          <ChapterLead
            layout="split"
            eyebrow="Work"
            headingId="lp-work-heading"
            title={title}
            dek={intro}
          />
        </Reveal>

        {proof?.length ? (
          <RevealGroup
            as="ul"
            className={cn(
              "results-metric-rail",
              proof.length >= 4 && "results-metric-rail--quad",
            )}
            stagger={duration.staggerTight}
            delayChildren={0.08}
          >
            {proof.map((item) => (
              <RevealItem key={item.label} as="li" variant="fadeUp">
                <div className="results-metric-rail__item">
                  <p className="results-metric-rail__lift">{item.metric}</p>
                  <p className="results-metric-rail__label">{item.label}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : null}

        <ul className="results-stories">
          {samples.map((sample, index) => {
            const flipped = index % 2 === 1;
            const href = sample.href;
            return (
              <li key={sample.client}>
                <article
                  className={
                    flipped ? "result-row result-row--flip" : "result-row"
                  }
                >
                  <MediaReveal
                    className="result-row__media-reveal"
                    variant="float"
                    from={flipped ? "right" : "left"}
                    delay={0.04}
                  >
                    <DeviceFrame className="result-row__media">
                      <SitePreview
                        image={sample.image}
                        imageAlt={sample.imageAlt}
                        sizes="(max-width: 768px) 100vw, 52vw"
                      />
                    </DeviceFrame>
                  </MediaReveal>

                  <Reveal
                    variant="fadeUp"
                    when="media"
                    delay={0.18}
                    className="result-row__body"
                  >
                    <div className="result-row__identity">
                      <h3 className="result-row__client">
                        {href ? (
                          <Link href={href} className="result-row__title-link">
                            {sample.client}
                          </Link>
                        ) : (
                          sample.client
                        )}
                      </h3>
                      {sample.industry ? (
                        <p className="result-row__meta">
                          <span>{sample.industry}</span>
                        </p>
                      ) : null}
                      {sample.mechanism ? (
                        <p className="result-row__mechanism">
                          {sample.mechanism}
                        </p>
                      ) : null}
                    </div>

                    <div className="result-row__metric">
                      <p className="result-row__lift">{sample.metric}</p>
                      <p className="result-row__headline">{sample.label}</p>
                    </div>

                    {sample.summary ? (
                      <p className="result-row__summary">{sample.summary}</p>
                    ) : null}

                    {href ? (
                      <div className="mt-8">
                        <Button href={href} variant="link" arrow>
                          Read the case
                        </Button>
                      </div>
                    ) : null}
                  </Reveal>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
