import { HeroCluster } from "@/components/landing/ViewportCluster";
import { LandingIntake } from "@/components/landing/LandingIntake";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

export function AuditHero({ page }: { page: LandingPageEntry }) {
  const lines = page.headlineLines?.length
    ? page.headlineLines
    : [page.headline, page.headlineAccent].filter(Boolean);
  const caption = page.heroMeta?.length
    ? page.heroMeta.join(" · ")
    : (page.serviceArea ?? []).join(" · ");
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
            {page.heroFinePrint ? (
              <p className="lp-audit-hero__fine">{page.heroFinePrint}</p>
            ) : null}
          </div>
          <div className="lp-audit-hero__panel">
            <LandingIntake
              page={page}
              embedded
              trust="none"
              showCallPath={false}
            />
          </div>
          <div className="lp-audit-hero__visual">
            <HeroCluster variant="ridge" priority caption="Sample design" />
          </div>
        </div>
      </div>
      {caption ? (
        <p className="lp-audit-hero__caption">{caption}</p>
      ) : null}
    </section>
  );
}
