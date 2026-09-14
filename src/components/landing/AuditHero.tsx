import { HeroCluster } from "@/components/landing/ViewportCluster";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

export function AuditHero({ page }: { page: LandingPageEntry }) {
  const lines = page.headlineLines?.length
    ? page.headlineLines
    : [page.headline, page.headlineAccent].filter(Boolean);
  const still = page.heroStill;
  const stat = page.proof[0];
  const secondaryHref = page.heroSecondaryHref ?? "#work";
  const secondaryLabel = page.heroSecondaryLabel;
  const client = page.testimonial?.name;

  return (
    <section
      className="lp-audit-hero hero-shell chapter relative overflow-x-clip"
      aria-labelledby="page-hero-heading"
    >
      <div className="shell lp-audit-hero__stage relative">
        <div className="lp-audit-hero__layout">
          <div className="lp-audit-hero__copy">
            <p className="lp-audit-hero__eyebrow">{page.badge}</p>
            <h1 id="page-hero-heading" className="lp-audit-hero__title">
              {lines.map((line, index) => (
                <span
                  key={line}
                  className={cn(
                    "lp-audit-hero__line",
                    index === lines.length - 1 && "lp-audit-hero__line--lead",
                  )}
                >
                  {line}
                </span>
              ))}
            </h1>
            <p className="lp-audit-hero__lede">{page.subheadline}</p>
            <div className="lp-audit-hero__actions">
              <Button href="#lp-form" size="lg" arrow>
                {page.heroCtaLabel ?? page.stickyCtaLabel}
              </Button>
              {secondaryLabel ? (
                <a href={secondaryHref} className="lp-audit-hero__secondary">
                  {secondaryLabel}
                  <span aria-hidden> →</span>
                </a>
              ) : null}
            </div>
            {page.heroFinePrint ? (
              <p className="lp-audit-hero__meta-line">{page.heroFinePrint}</p>
            ) : null}
          </div>
          <div className="lp-audit-hero__visual">
            <HeroCluster
              variant="ridge"
              image={still?.src}
              imageAlt={still?.alt}
              priority
              caption={undefined}
            />
            {stat ? (
              <aside className="lp-audit-hero__float" aria-label="Client result">
                <p className="lp-audit-hero__float-metric">{stat.metric}</p>
                <p className="lp-audit-hero__float-label">{stat.label}</p>
                {client ? (
                  <p className="lp-audit-hero__float-client">{client}</p>
                ) : null}
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
