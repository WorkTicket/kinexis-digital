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
}: {
  title: string;
  intro?: string;
  note?: string;
  before: { title: string; items: string[] };
  after: { title: string; items: string[] };
}) {
  return (
    <section
      aria-labelledby="lp-transform-heading"
      className="lp-audit-transform chapter chapter--studio relative"
    >
      <div className="shell chapter-shell--monument relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-transform-heading"
            eyebrow="The shift"
            title={title}
            dek={intro}
          />
        </Reveal>

        <div className="lp-transform">
          <Reveal variant="fadeUp" when="chapter" className="lp-transform__pane">
            <p className="lp-transform__label">{before.title}</p>
            <div className="lp-transform__frame">
              <div className="lp-transform__screen">
                <ShowcaseSite variant="dated" layout="desktop" />
              </div>
              <span className="lp-showcase-badge">Dated-site example</span>
            </div>
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
                <ShowcaseSite variant="ridge" layout="desktop" />
              </div>
              <span className="lp-showcase-badge">Sample design</span>
            </div>
          </Reveal>
        </div>

        <div className="lp-transform__compare">
          <div>
            <p className="lp-transform__label">{before.title}</p>
            <ul className="lp-transform__list">
              {before.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="lp-transform__label">{after.title}</p>
            <ul className="lp-transform__list lp-transform__list--after">
              {after.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
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
      className="lp-audit-build chapter chapter--studio relative"
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
          className="lp-build__list"
          stagger={duration.staggerTight}
          delayChildren={0.05}
        >
          {featured.map((point) => (
            <RevealItem as="li" key={point.title} variant="fadeUp">
              <article>
                <h3 className="lp-build__title">{point.title}</h3>
                <p className="lp-build__body">{point.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        {quiet.length ? (
          <ul className="lp-build__quiet">
            {quiet.map((point) => (
              <li key={point.title}>
                <strong>{point.title}.</strong> {point.body}
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
          {items.map((item) => (
            <RevealItem as="li" key={item.title} variant="fadeUp">
              <article>
                <h3 className="lp-why__title">{item.title}</h3>
                <p className="lp-why__body">{item.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
