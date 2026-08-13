import type { CSSProperties } from "react";
import { IndustryVisual } from "@/components/industry/IndustryVisual";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Industry } from "@/content/industries";
import { isStandaloneIndustry, industryHref } from "@/content/industries";

type Props = {
  industry: Industry;
  index: number;
};

function CheckIcon() {
  return (
    <svg
      className="svc-offer__check"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M4.2 10.4 8 14.1 15.8 5.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IndustryProgramChapter({ industry, index }: Props) {
  const headingId = `${industry.slug}-heading`;
  const standalone = isStandaloneIndustry(industry.slug);
  const focusAreas = industry.domains.slice(0, 4).map((d) => d.title);
  const fitPoints = industry.why.slice(0, 3).map((w) => w.title);

  return (
    <article
      id={industry.slug}
      aria-labelledby={headingId}
      className="svc-offer ind-offer"
      style={
        industry.accentColor
          ? ({ "--industry-accent": industry.accentColor } as CSSProperties)
          : undefined
      }
    >
      <Reveal variant="fade" when="chapter" className="svc-offer__still ind-offer__still">
        <div className="ind-offer__media">
          <IndustryVisual
            slug={industry.slug}
            variant="panel"
            priority={index === 0}
            sizes="(max-width: 1023px) 100vw, 42vw"
          />
        </div>
      </Reveal>

      <div className="svc-offer__body">
        <Reveal variant="rise" when="chapter">
          <p className="svc-offer__role">{industry.eyebrow}</p>
          <h2 id={headingId} className="svc-offer__title">
            {industry.title}
          </h2>
          <p className="svc-offer__lede">{industry.heroCopy}</p>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.08} when="chapter">
          <p className="svc-offer__copy">{industry.problemCopy}</p>
          <p className="svc-offer__copy">{industry.approachCopy}</p>
        </Reveal>

        <div className="svc-offer__facts">
          <div>
            <Reveal variant="fadeUp" delay={0.1} when="chapter">
              <h3 className="svc-offer__label">What we run</h3>
            </Reveal>
            <RevealGroup
              as="ul"
              className="svc-offer__included"
              stagger={0.055}
              delayChildren={0.06}
            >
              {industry.help.map((item) => (
                <RevealItem as="li" key={item.title} variant="fadeUp">
                  <CheckIcon />
                  <span>
                    <strong>{item.title}.</strong> {item.detail}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <RevealGroup
            className="svc-offer__side"
            stagger={0.1}
            delayChildren={0.08}
          >
            <RevealItem>
              <h3 className="svc-offer__label">Focus areas</h3>
              <ul className="svc-offer__list">
                {focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </RevealItem>
            <RevealItem>
              <h3 className="svc-offer__label">A fit if</h3>
              <ul className="svc-offer__list">
                {fitPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </RevealItem>
          </RevealGroup>
        </div>

        <Reveal
          variant="fadeUp"
          delay={0.14}
          when="chapter"
          className="svc-offer__cta ind-offer__cta"
        >
          {standalone ? (
            <>
              <Button href={industryHref(industry.slug)} arrow>
                See the full {industry.navLabel.toLowerCase()} program
              </Button>
              <Button href="/contact" variant="link" arrow>
                Book a strategy call
              </Button>
            </>
          ) : (
            <Button href="/contact" arrow>
              Talk about {industry.navLabel}
            </Button>
          )}
        </Reveal>
      </div>
    </article>
  );
}
