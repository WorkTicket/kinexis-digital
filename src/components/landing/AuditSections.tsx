import { SitePreview } from "@/components/home/SitePreview";
import { EditorialStill } from "@/components/landing/EditorialStill";
import { LandingIntake } from "@/components/landing/LandingIntake";
import { LaptopFrame } from "@/components/landing/ViewportCluster";
import { LcpImage } from "@/components/ui/LcpImage";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { MediaReveal, Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type {
  LandingPageAuditItem,
  LandingPageEntry,
  LandingPageFitVisual,
  LandingPagePainItem,
  LandingPagePath,
  LandingPagePrice,
  LandingPageProcessStep,
  LandingPageProof,
  LandingPageSample,
  LandingPageStill,
} from "@/content/registry/landing-pages";
import { Link } from "@/i18n/navigation";
import { duration } from "@/lib/motion";

export function AuditProof({
  intro,
  items,
  ctaLabel,
  href = "#work",
}: {
  intro: string;
  items: LandingPageProof[];
  ctaLabel?: string;
  href?: string;
}) {
  if (!items.length) return null;

  return (
    <aside className="lp-audit-proof" aria-label="Results">
      <div className="shell lp-audit-proof__inner">
        <p className="lp-audit-proof__intro">{intro}</p>
        <ul className="lp-audit-proof__stats">
          {items.slice(0, 3).map((item) => (
            <li key={`${item.metric}-${item.label}`}>
              <span className="lp-audit-proof__metric">{item.metric}</span>
              <span className="lp-audit-proof__label">{item.label}</span>
            </li>
          ))}
        </ul>
        {ctaLabel ? (
          <Button href={href} variant="link" arrow>
            {ctaLabel}
          </Button>
        ) : null}
      </div>
    </aside>
  );
}

export function AuditPain({
  title,
  subtitle,
  eyebrow = "Why they leave",
  items,
  stills,
  mockup,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  items: LandingPagePainItem[];
  stills?: LandingPageStill[];
  mockup?: "dated";
  ctaLabel?: string;
}) {
  const primary = stills?.[0];
  const showMockup = mockup === "dated";
  const hasVisual = showMockup || Boolean(primary);

  return (
    <section
      aria-labelledby="lp-pain-heading"
      className={
        hasVisual
          ? "lp-audit-pain chapter relative"
          : "lp-audit-pain lp-audit-pain--solo chapter relative"
      }
    >
      <div className="shell chapter-shell--tight relative">
        <div className="lp-audit-pain__layout">
          <div>
            <Reveal variant="rise" when="chapter">
              <ChapterLead
                headingId="lp-pain-heading"
                eyebrow={eyebrow}
                title={title}
                dek={subtitle}
              />
            </Reveal>
            <RevealGroup
              as="ul"
              className="lp-audit-pain__list"
              stagger={duration.staggerTight}
              delayChildren={0.06}
            >
              {items.map((item) => (
                <RevealItem as="li" key={item.title} variant="fadeUp">
                  <article>
                    <h3 className="lp-audit-pain__title">{item.title}</h3>
                    <p className="lp-audit-pain__body">{item.body}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
            {ctaLabel ? (
              <div className="lp-audit-pain__cta">
                <Button href="#lp-form" variant="link" arrow>
                  {ctaLabel}
                </Button>
              </div>
            ) : null}
          </div>

          {showMockup ? (
            <MediaReveal
              className="lp-audit-stills"
              variant="float"
              from="right"
              delay={0.06}
            >
              <LaptopFrame variant="dated" />
            </MediaReveal>
          ) : primary ? (
            <MediaReveal
              className="lp-audit-stills"
              variant="float"
              from="right"
              delay={0.06}
            >
              {primary.framed === false ? (
                <EditorialStill
                  image={primary.src}
                  imageAlt={primary.alt}
                  sizes="(max-width: 1023px) 100vw, 46vw"
                  wide
                  direct
                />
              ) : (
                <DeviceFrame className="lp-audit-stills__site">
                  <SitePreview
                    image={primary.src}
                    imageAlt={primary.alt}
                    sizes="(max-width: 1023px) 100vw, 46vw"
                  />
                </DeviceFrame>
              )}
            </MediaReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function AuditPaths({
  title,
  note,
  items,
}: {
  title: string;
  note?: string;
  items: LandingPagePath[];
}) {
  return (
    <section
      aria-labelledby="lp-paths-heading"
      className="lp-audit-paths chapter relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-paths-heading"
            eyebrow="Start here"
            title={title}
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="lp-audit-paths__grid"
          stagger={duration.staggerTight}
          delayChildren={0.06}
        >
          {items.map((item) => (
            <RevealItem as="li" key={item.title} variant="fadeUp">
              <article className="lp-audit-paths__card">
                <h3 className="lp-audit-paths__title">{item.title}</h3>
                <p className="lp-audit-paths__body">{item.body}</p>
                <p className="lp-audit-paths__detail">{item.detail}</p>
                <Button href="#lp-form" variant="link" arrow>
                  {item.cta}
                </Button>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        {note ? <p className="lp-audit-paths__note">{note}</p> : null}
      </div>
    </section>
  );
}

export function AuditScope({
  title,
  note,
  items,
  still,
  ctaLabel,
}: {
  title: string;
  note?: string;
  items: LandingPageAuditItem[];
  still?: LandingPageStill;
  ctaLabel?: string;
}) {
  return (
    <section
      aria-labelledby="lp-audit-scope-heading"
      className="lp-audit-scope chapter relative"
    >
      <div className="shell chapter-shell--tight relative">
        <div className="lp-audit-scope__layout">
          <div>
            <Reveal variant="rise" when="chapter">
              <ChapterLead
                headingId="lp-audit-scope-heading"
                eyebrow="The consultation"
                title={title}
                dek={note}
              >
                {ctaLabel ? (
                  <Button href="#lp-form" variant="link" arrow>
                    {ctaLabel}
                  </Button>
                ) : null}
              </ChapterLead>
            </Reveal>
            <RevealGroup
              as="ul"
              className="lp-audit-scope__list"
              stagger={duration.staggerTight}
              delayChildren={0.05}
            >
              {items.map((item) => (
                <RevealItem as="li" key={item.title} variant="fadeUp">
                  <article className="lp-audit-scope__item">
                    <h3 className="lp-audit-scope__title">{item.title}</h3>
                    <p className="lp-audit-scope__body">{item.body}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {still ? (
            <MediaReveal
              className="lp-audit-scope__still"
              variant="float"
              from="right"
              delay={0.06}
            >
              <EditorialStill
                image={still.src}
                imageAlt={still.alt}
                sizes="(max-width: 1023px) 100vw, 46vw"
                wide
                direct
              />
            </MediaReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function AuditFit({
  title,
  note,
  visuals,
  still,
}: {
  title: string;
  note?: string;
  visuals: LandingPageFitVisual[];
  still?: LandingPageStill;
}) {
  if (!visuals.length) return null;

  return (
    <section
      aria-labelledby="lp-audit-fit-heading"
      className="lp-audit-fit chapter chapter--studio relative"
    >
      <div className="shell chapter-shell--monument relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-audit-fit-heading"
            eyebrow="Who it's for"
            title={title}
            dek={note}
          />
        </Reveal>
        {still ? (
          <MediaReveal
            className="lp-audit-fit__lead"
            variant="float"
            from="right"
            delay={0.04}
          >
            <EditorialStill
              image={still.src}
              imageAlt={still.alt}
              sizes="(max-width: 1023px) 100vw, 72vw"
              wide
              direct
            />
          </MediaReveal>
        ) : null}
        <RevealGroup
          as="ul"
          className="lp-audit-fit__mosaic"
          stagger={duration.staggerTight}
          delayChildren={0.05}
        >
          {visuals.map((visual) => (
            <RevealItem as="li" key={visual.label} variant="fadeUp">
              <figure className="lp-audit-fit__tile">
                <LcpImage
                  src={visual.src}
                  alt=""
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  width={720}
                  height={480}
                  direct
                  className="lp-audit-fit__img object-cover object-center"
                />
                <figcaption>{visual.label}</figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function WorkPlateMedia({ sample }: { sample: LandingPageSample }) {
  return (
    <div className="lp-audit-work__media">
      <div className="lp-audit-work__shot">
        <SitePreview
          image={sample.image}
          imageAlt={sample.imageAlt}
          sizes="(max-width: 767px) 100vw, 32vw"
          direct
        />
      </div>
    </div>
  );
}

export function AuditWork({
  title,
  intro,
  samples,
}: {
  title: string;
  intro?: string;
  samples: LandingPageSample[];
}) {
  if (!samples.length) return null;

  return (
    <section
      id="work"
      aria-labelledby="lp-audit-work-heading"
      className="lp-audit-work chapter relative"
    >
      <div className="shell chapter-shell--monument relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-audit-work-heading"
            eyebrow={intro ?? "Work"}
            title={title}
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="lp-audit-work__stack lp-audit-work__stack--equal"
          stagger={duration.staggerTight}
          delayChildren={0.08}
        >
          {samples.map((sample) => (
            <RevealItem as="li" key={sample.client} variant="fadeUp">
              <article className="lp-audit-work__plate">
                {sample.href ? (
                  <Link href={sample.href} className="lp-audit-work__link">
                    <WorkPlateMedia sample={sample} />
                  </Link>
                ) : (
                  <WorkPlateMedia sample={sample} />
                )}
                <div className="lp-audit-work__copy">
                  <h3 className="lp-audit-work__client">{sample.client}</h3>
                  {sample.kind ? (
                    <p className="lp-audit-work__kind">{sample.kind}</p>
                  ) : null}
                  <p className="lp-audit-work__result">
                    Result: {sample.metric}
                    {sample.label ? ` ${sample.label}` : ""}
                  </p>
                  {sample.summary ? (
                    <p className="lp-audit-work__summary">{sample.summary}</p>
                  ) : null}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function AuditMidCta({
  title,
  ctaLabel,
  note,
}: {
  title: string;
  ctaLabel: string;
  note?: string;
}) {
  return (
    <section
      aria-labelledby="lp-audit-midcta-heading"
      className="lp-audit-midcta chapter relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter" className="lp-audit-midcta__inner">
          <h2 id="lp-audit-midcta-heading" className="lp-audit-midcta__title">
            {title}
          </h2>
          <Button href="#lp-form" size="lg" fullWidthMobile arrow>
            {ctaLabel}
          </Button>
          {note ? <p className="lp-audit-midcta__note">{note}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}

export function AuditPricing({
  title,
  intro,
  items,
  note,
  ctaLabel,
}: {
  title: string;
  intro?: string;
  items: LandingPagePrice[];
  note?: string;
  ctaLabel?: string;
}) {
  return (
    <section
      id="pricing"
      aria-labelledby="lp-audit-pricing-heading"
      className="lp-audit-pricing chapter relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-audit-pricing-heading"
            eyebrow="Investment"
            title={title}
            dek={intro}
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="lp-audit-pricing__list"
          stagger={duration.staggerTight}
          delayChildren={0.06}
        >
          {items.map((item) => (
            <RevealItem as="li" key={item.name} variant="fadeUp">
              <article
                className={
                  item.featured
                    ? "lp-audit-pricing__card lp-audit-pricing__card--featured"
                    : "lp-audit-pricing__card"
                }
              >
                <div className="lp-audit-pricing__head">
                  {item.tag ? (
                    <p
                      className={
                        item.featured
                          ? "lp-audit-pricing__tag lp-audit-pricing__tag--featured"
                          : "lp-audit-pricing__tag"
                      }
                    >
                      {item.tag}
                    </p>
                  ) : null}
                  <h3 className="lp-audit-pricing__name">{item.name}</h3>
                  <p className="lp-audit-pricing__price">
                    {item.price}
                    {item.cadence ? (
                      <span className="lp-audit-pricing__cadence">
                        {item.cadence}
                      </span>
                    ) : null}
                  </p>
                </div>
                <p className="lp-audit-pricing__body">{item.body}</p>
                {item.items?.length ? (
                  <ul className="lp-audit-pricing__includes">
                    {item.items.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {note ? <p className="lp-audit-pricing__note">{note}</p> : null}

        {ctaLabel ? (
          <div className="lp-audit-pricing__action">
            <Button href="#lp-form" variant="link" arrow>
              {ctaLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function AuditProcess({
  title,
  intro,
  steps,
  ctaLabel,
}: {
  title: string;
  intro: string;
  steps: LandingPageProcessStep[];
  ctaLabel?: string;
}) {
  return (
    <section
      id="how-it-runs"
      aria-labelledby="lp-process-heading"
      className="lp-audit-process chapter relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter">
          <ChapterLead
            headingId="lp-process-heading"
            eyebrow="The consult"
            title={title}
            dek={intro}
          />
        </Reveal>

        <RevealGroup
          as="ol"
          className="lp-audit-process__steps"
          stagger={duration.staggerTight}
          delayChildren={0.06}
          aria-label="Project steps"
        >
          {steps.map((step) => (
            <RevealItem key={step.title} as="li" variant="fadeUp">
              <article className="lp-audit-process__step">
                <h3 className="lp-audit-process__title">{step.title}</h3>
                <p className="lp-audit-process__body">{step.detail}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        {ctaLabel ? (
          <div className="lp-audit-pain__cta">
            <Button href="#lp-form" variant="link" arrow>
              {ctaLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function AuditClose({ page }: { page: LandingPageEntry }) {
  return (
    <section
      aria-labelledby="lp-audit-close-heading"
      className="lp-audit-close lp-audit-close--dark chapter relative"
    >
      <div className="shell chapter-shell--standard relative">
        <div className="lp-audit-close__layout">
          <Reveal variant="rise" when="chapter" className="lp-audit-close__copy">
            <ChapterLead
              headingId="lp-audit-close-heading"
              eyebrow="Book a time"
              title={page.closingTitle ?? page.formTitle}
              dek={page.closingCopy}
            />
            {page.closingFinePrint ?? page.heroFinePrint ? (
              <p className="lp-audit-close__trust">
                {page.closingFinePrint ?? page.heroFinePrint}
              </p>
            ) : null}
          </Reveal>
          <Reveal variant="fadeUp" delay={0.08} when="chapter">
            <div id="lp-form-close">
              <LandingIntake
                page={page}
                embedded
                formId="lp-form-close-fields"
                trust="none"
                showCallPath={false}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
