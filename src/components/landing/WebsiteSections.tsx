import { CaseStudyViewTracker } from "@/components/landing/CaseStudyViewTracker";
import { iconForLandingPoint } from "@/components/landing/landing-icons";
import { PlanCta } from "@/components/landing/PlanCta";
import { WebsitePlanForm } from "@/components/landing/WebsitePlanForm";
import { LcpImage } from "@/components/ui/LcpImage";
import type {
  LandingPageEntry,
  LandingPagePainItem,
  LandingPagePrice,
  LandingPageSample,
  LandingPageSellPoint,
} from "@/content/registry/landing-pages";

export function WebsiteTrust({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside className="lp-web-trust" aria-label="What you get">
      <div className="shell">
        <ul className="lp-web-trust__list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function WebsiteWork({
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
      aria-labelledby="lp-web-work-heading"
      className="lp-web-work chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          <h2 id="lp-web-work-heading">{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </header>
        <ul className="lp-web-work__list">
          {samples.map((sample) => (
            <li key={sample.client}>
              <article className="lp-web-work__card">
                <CaseStudyViewTracker client={sample.client} />
                <div className="lp-web-work__media">
                  <LcpImage
                    src={sample.image}
                    alt={sample.imageAlt}
                    width={2880}
                    height={1800}
                    sizes="(max-width: 767px) 100vw, 46vw"
                    fill={false}
                    direct
                    className="lp-web-work__img"
                  />
                </div>
                <div className="lp-web-work__copy">
                  <p className="lp-web-kicker">
                    {sample.kind ?? sample.industry}
                  </p>
                  <h3>{sample.client}</h3>
                  {sample.summary ? <p>{sample.summary}</p> : null}
                  {sample.metric ? (
                    <p className="lp-web-work__result">
                      {sample.metric}
                      {sample.label ? ` ${sample.label}` : ""}
                    </p>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WebsitePain({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: LandingPagePainItem[];
}) {
  return (
    <section
      aria-labelledby="lp-web-pain-heading"
      className="lp-web-pain chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          <h2 id="lp-web-pain-heading">{title}</h2>
          <p>{subtitle}</p>
        </header>
        <ul className="lp-web-pain__list">
          {items.map((item) => {
            const Icon = iconForLandingPoint(item.title);
            return (
              <li key={item.title}>
                <article className="lp-web-pain__item">
                  <span className="lp-web-icon" aria-hidden>
                    <Icon strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function WebsiteBuild({
  title,
  points,
}: {
  title: string;
  points: LandingPageSellPoint[];
}) {
  const featured = points.filter((point) => !point.quiet);
  const quiet = points.filter((point) => point.quiet);

  return (
    <section
      aria-labelledby="lp-web-build-heading"
      className="lp-web-build chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          <h2 id="lp-web-build-heading">{title}</h2>
        </header>
        <ul className="lp-web-build__list">
          {featured.map((point) => {
            const Icon = iconForLandingPoint(point.title);
            return (
              <li key={point.title}>
                <article className="lp-web-build__item">
                  <span className="lp-web-icon" aria-hidden>
                    <Icon strokeWidth={1.5} />
                  </span>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </article>
              </li>
            );
          })}
        </ul>
        {quiet.length ? (
          <p className="lp-web-build__tech">
            {quiet.map((point) => (
              <span key={point.title}>
                <strong>{point.title}</strong>
                {point.body}
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function WebsiteFit({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section
      aria-labelledby="lp-web-fit-heading"
      className="lp-web-fit chapter relative"
    >
      <div className="shell relative">
        <h2 id="lp-web-fit-heading" className="lp-web-fit__title">
          {title}
        </h2>
        <p className="lp-web-fit__line">{items.join(" · ")}</p>
      </div>
    </section>
  );
}

export function WebsiteProcess({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; detail: string }[];
}) {
  return (
    <section
      aria-labelledby="lp-web-process-heading"
      className="lp-web-process chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          <h2 id="lp-web-process-heading">{title}</h2>
        </header>
        <ol className="lp-web-process__list">
          {steps.map((step) => {
            const Icon = iconForLandingPoint(step.title);
            return (
              <li key={step.title}>
                <span className="lp-web-icon" aria-hidden>
                  <Icon strokeWidth={1.5} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function WebsitePricing({
  title,
  intro,
  items,
  note,
  ctaLabel,
  landingSlug,
}: {
  title: string;
  intro?: string;
  items: LandingPagePrice[];
  note?: string;
  ctaLabel: string;
  landingSlug: string;
}) {
  return (
    <section
      id="pricing"
      aria-labelledby="lp-web-pricing-heading"
      className="lp-web-pricing chapter relative"
    >
      <div className="shell relative">
        <header className="lp-web-lead">
          <h2 id="lp-web-pricing-heading">{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </header>
        <ul className="lp-web-pricing__list">
          {items.map((item) => (
            <li key={item.name}>
              <article className="lp-web-pricing__card">
                <h3>{item.name}</h3>
                <p className="lp-web-pricing__price">{item.price}</p>
                <p>{item.body}</p>
              </article>
            </li>
          ))}
        </ul>
        {note ? <p className="lp-web-pricing__note">{note}</p> : null}
        <div className="lp-web-pricing__cta">
          <PlanCta placement="pricing" landingSlug={landingSlug} arrow>
            {ctaLabel}
          </PlanCta>
        </div>
      </div>
    </section>
  );
}

export function WebsitePlan({ page }: { page: LandingPageEntry }) {
  return (
    <section
      id="lp-form"
      aria-labelledby="lp-web-plan-heading"
      className="lp-web-plan chapter relative"
    >
      <div className="shell relative">
        <div className="lp-web-plan__layout">
          <div className="lp-web-plan__copy">
            <h2 id="lp-web-plan-heading">{page.formTitle}</h2>
            <p>{page.formSubtitle}</p>
            {page.formAsideSubtitle ? <p>{page.formAsideSubtitle}</p> : null}
            {page.planNoSiteItems?.length ? (
              <div className="lp-web-plan__path">
                <h3>{page.planNoSiteTitle}</h3>
                <ul>
                  {page.planNoSiteItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {page.planHasSiteItems?.length ? (
              <div className="lp-web-plan__path">
                <h3>{page.planHasSiteTitle}</h3>
                <ul>
                  {page.planHasSiteItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="lp-web-plan__form">
            <WebsitePlanForm page={page} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WebsiteFinalCta({
  title,
  copy,
  ctaLabel,
  finePrint,
  landingSlug,
}: {
  title: string;
  copy?: string;
  ctaLabel: string;
  finePrint?: string;
  landingSlug: string;
}) {
  return (
    <section
      aria-labelledby="lp-web-final-heading"
      className="lp-web-final chapter relative"
    >
      <div className="shell relative">
        <div className="lp-web-final__inner">
          <h2 id="lp-web-final-heading">{title}</h2>
          {copy ? <p>{copy}</p> : null}
          <PlanCta placement="final" landingSlug={landingSlug} size="xl" arrow>
            {ctaLabel}
          </PlanCta>
          {finePrint ? (
            <p className="lp-web-final__micro">{finePrint}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
