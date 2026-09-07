import { HeroCluster } from "@/components/landing/ViewportCluster";
import { LandingIntake } from "@/components/landing/LandingIntake";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

export function AuditHero({ page }: { page: LandingPageEntry }) {
  const lines = page.headlineLines?.length
    ? page.headlineLines
    : [page.headline, page.headlineAccent].filter(Boolean);
  const ledeParts = page.subheadline.split(/\n\n/).filter(Boolean);

  return (
    <section
      className="lp-audit-hero lp-audit-hero--studio hero-shell chapter relative overflow-x-clip"
      aria-labelledby="page-hero-heading"
    >
      <div className="shell shell--cinema lp-audit-hero__stage relative">
        <div className="lp-audit-hero__layout">
          <div className="lp-audit-hero__copy">
            <p className="section-eyebrow">{page.badge}</p>
            <h1 id="page-hero-heading" className="lp-audit-hero__title">
              {lines.map((line) => (
                <span key={line} className="lp-audit-hero__line">
                  {line}
                </span>
              ))}
            </h1>
            {ledeParts.map((para) => (
              <p key={para} className="lp-audit-hero__lede">
                {para}
              </p>
            ))}
            {page.proof.length ? (
              <p className="lp-audit-hero__proof-line">
                {page.proof
                  .slice(0, 2)
                  .map((item) => `${item.metric} ${item.label}`)
                  .join(" · ")}
              </p>
            ) : null}
            {page.heroFinePrint ? (
              <p className="lp-audit-hero__fine">{page.heroFinePrint}</p>
            ) : null}
            {page.proof.length ? (
              <ul className="lp-audit-hero__stats">
                {page.proof.slice(0, 3).map((item) => (
                  <li key={`${item.metric}-${item.label}`}>
                    <span className="lp-audit-hero__stat-value">{item.metric}</span>
                    <span className="lp-audit-hero__stat-label">{item.label}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="lp-audit-hero__panel">
            <LandingIntake
              page={page}
              embedded
              trust="checks"
              showCallPath={false}
            />
            {page.testimonial ? (
              <p className="lp-audit-hero__cite">
                <span className="lp-audit-hero__cite-quote">
                  “{page.testimonial.quote}”
                </span>
                <span className="lp-audit-hero__cite-attr">
                  {page.testimonial.name}
                </span>
              </p>
            ) : null}
          </div>
          <div className="lp-audit-hero__visual">
            <HeroCluster variant="ridge" priority caption="Sample design" />
          </div>
        </div>
      </div>
    </section>
  );
}
