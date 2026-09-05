import { EditorialStill } from "@/components/landing/EditorialStill";
import { SitePreview } from "@/components/home/SitePreview";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { MediaReveal, Reveal } from "@/components/ui/Reveal";
import type { LandingPageSpotlight } from "@/content/registry/landing-pages";

export function LandingSpotlight({
  image,
  imageAlt,
  kicker,
  title,
  body,
  framed = true,
  metric,
  metricLabel,
}: LandingPageSpotlight) {
  const still = framed ? (
    <DeviceFrame>
      <SitePreview
        image={image}
        imageAlt={imageAlt}
        sizes="(max-width: 768px) 100vw, 48vw"
      />
    </DeviceFrame>
  ) : (
    <EditorialStill
      image={image}
      imageAlt={imageAlt}
      sizes="(max-width: 768px) 100vw, 48vw"
      wide
    />
  );

  return (
    <section
      aria-labelledby="lp-spotlight-heading"
      className="lp-spotlight chapter chapter--studio relative"
    >
      <div className="shell chapter-shell--tight relative">
        <article className="lp-spotlight__row">
          <MediaReveal
            className="lp-spotlight__media"
            variant="float"
            from="left"
            delay={0.04}
          >
            <div className="lp-spotlight__frame">
              {still}
              {metric ? (
                <p className="lp-spotlight__badge">
                  <span className="lp-spotlight__badge-metric">{metric}</span>
                  {metricLabel ? (
                    <span className="lp-spotlight__badge-label">{metricLabel}</span>
                  ) : null}
                </p>
              ) : null}
            </div>
          </MediaReveal>

          <Reveal variant="fadeUp" when="media" delay={0.14} className="lp-spotlight__copy">
            <ChapterLead
              layout="stack"
              eyebrow={kicker}
              headingId="lp-spotlight-heading"
              title={title}
              dek={body}
            />
          </Reveal>
        </article>
      </div>
    </section>
  );
}
