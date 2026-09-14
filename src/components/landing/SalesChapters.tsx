import { iconForLandingPoint } from "@/components/landing/landing-icons";
import {
  ShowcaseSite,
  type ShowcaseVariant,
} from "@/components/landing/ShowcaseSite";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type {
  LandingPageSellPoint,
} from "@/content/registry/landing-pages";
import { duration } from "@/lib/motion";

const SHOWCASE_VARIANTS = new Set<ShowcaseVariant>([
  "ridge",
  "marigold",
  "haven",
  "meridian",
  "dated",
]);

function asVariant(value: string): ShowcaseVariant {
  return SHOWCASE_VARIANTS.has(value as ShowcaseVariant)
    ? (value as ShowcaseVariant)
    : "ridge";
}

export function SalesTransform({
  title,
  intro,
  note,
  before,
  after,
  afterImage,
  afterImageAlt,
}: {
  title: string;
  intro?: string;
  note?: string;
  before: { title: string; items: string[] };
  after: { title: string; items: string[] };
  afterImage?: string;
  afterImageAlt?: string;
}) {
  return (
    <section
      aria-labelledby="lp-transform-heading"
      className="lp-audit-transform chapter relative"
    >
      <div className="shell chapter-shell--monument relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-transform-heading"
            eyebrow="Before / After"
            title={title}
            dek={intro}
          />
        </Reveal>

        <div className="lp-transform">
          <Reveal variant="fadeUp" when="chapter" className="lp-transform__pane">
            <p className="lp-transform__label">
              {before.title}
              <span className="lp-transform__label-note">
                Recreated previous-site experience
              </span>
            </p>
            <div className="lp-transform__frame lp-transform__frame--before">
              <div className="lp-transform__screen">
                <ShowcaseSite variant="dated" layout="desktop" />
              </div>
            </div>
            <ul className="lp-transform__captions" aria-label={before.title}>
              {before.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <span className="lp-transform__arrow" aria-hidden>
            →
          </span>
          <Reveal
            variant="fadeUp"
            delay={0.08}
            when="chapter"
            className="lp-transform__pane lp-transform__pane--after"
          >
            <p className="lp-transform__label">{after.title}</p>
            <div className="lp-transform__frame">
              <div className="lp-transform__screen">
                {afterImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={afterImage}
                    alt={afterImageAlt ?? ""}
                    width={1600}
                    height={1000}
                    className="lp-transform__photo"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <ShowcaseSite variant="ridge" layout="desktop" />
                )}
              </div>
            </div>
            <ul
              className="lp-transform__captions lp-transform__captions--after"
              aria-label={after.title}
            >
              {after.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        {note ? <p className="lp-transform__note">{note}</p> : null}
      </div>
    </section>
  );
}

export function SalesImagine({
  title,
  intro,
  note,
  items,
}: {
  title: string;
  intro?: string;
  note?: string;
  items: { variant: string; title: string; body: string }[];
}) {
  return (
    <section
      aria-labelledby="lp-imagine-heading"
      className="lp-audit-imagine chapter relative"
    >
      <div className="shell chapter-shell--monument relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-imagine-heading"
            eyebrow="Sample designs"
            title={title}
            dek={intro}
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="lp-imagine__grid"
          stagger={duration.staggerTight}
          delayChildren={0.06}
        >
          {items.map((item) => (
            <RevealItem as="li" key={item.title} variant="fadeUp">
              <figure className="lp-showcase-card">
                <div className="lp-showcase-card__screen">
                  <ShowcaseSite variant={asVariant(item.variant)} layout="desktop" />
                </div>
                <span className="lp-showcase-badge">Sample design</span>
              </figure>
              <div className="lp-showcase-card__caption">
                <p className="lp-showcase-card__kicker">Sample design</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        {note ? <p className="lp-imagine__note">{note}</p> : null}
      </div>
    </section>
  );
}

export function SalesBuild({
  title,
  intro,
  points,
}: {
  title: string;
  intro?: string;
  points: LandingPageSellPoint[];
}) {
  const featured = points.filter((point) => !point.quiet);
  const quiet = points.filter((point) => point.quiet);

  return (
    <section
      aria-labelledby="lp-build-heading"
      className="lp-audit-build chapter relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-build-heading"
            eyebrow="What you get"
            title={title}
            dek={intro}
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="lp-build__list lp-build__list--cards"
          stagger={duration.staggerTight}
          delayChildren={0.05}
        >
          {featured.map((point) => {
            const Icon = iconForLandingPoint(point.title);
            return (
              <RevealItem as="li" key={point.title} variant="fadeUp">
                <article className="lp-build__item lp-build__item--card">
                  <span className="icon-well lp-build__icon" aria-hidden>
                    <Icon strokeWidth={1.5} />
                  </span>
                  <h3 className="lp-build__title">{point.title}</h3>
                  <p className="lp-build__body">{point.body}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
        {quiet.length ? (
          <ul className="lp-build__quiet">
            {quiet.map((point) => (
              <li key={point.title}>
                <span className="lp-build__quiet-label">{point.title}</span>
                {point.body}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function SalesPrice({
  title,
  anchor,
  intro,
  qualify,
  notes,
  footer,
  ctaLabel,
}: {
  title: string;
  anchor?: string;
  intro?: string;
  qualify?: string;
  notes?: string[];
  footer?: string;
  ctaLabel?: string;
}) {
  return (
    <section
      id="pricing"
      aria-labelledby="lp-price-heading"
      className="lp-audit-price chapter relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter" className="lp-price">
          <ChapterLead
            headingId="lp-price-heading"
            eyebrow="Investment"
            title={title}
          />
          {anchor ? (
            <p className="lp-price__anchor lp-price__anchor--sentence">{anchor}</p>
          ) : null}
          {qualify ? <p className="lp-price__qualify">{qualify}</p> : null}
          {intro ? <p className="lp-price__note">{intro}</p> : null}
          {notes?.length ? (
            <ul className="lp-price__paths">
              {notes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {footer ? <p className="lp-price__footer">{footer}</p> : null}
          {ctaLabel ? (
            <div className="lp-audit-pain__cta">
              <Button href="#lp-form" variant="link" arrow>
                {ctaLabel}
              </Button>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

export function SalesWhy({
  title,
  note,
  items,
}: {
  title: string;
  note?: string;
  items: { title: string; body: string }[];
}) {
  return (
    <section
      aria-labelledby="lp-why-heading"
      className="lp-audit-why chapter chapter--studio relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-why-heading"
            eyebrow="Why Kinexis"
            title={title}
            dek={note}
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="lp-why__list"
          stagger={duration.staggerTight}
          delayChildren={0.05}
        >
          {items.map((item) => {
            const Icon = iconForLandingPoint(item.title);
            return (
              <RevealItem as="li" key={item.title} variant="fadeUp">
                <article className="lp-why__item">
                  <span className="icon-well lp-why__icon" aria-hidden>
                    <Icon strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="lp-why__title">{item.title}</h3>
                    <p className="lp-why__body">{item.body}</p>
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
