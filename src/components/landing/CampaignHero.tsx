import { LandingIntake } from "@/components/landing/LandingIntake";
import { HeroParallax, HeroScrollRoot } from "@/components/home/HeroParallax";
import { HeroSignalLine } from "@/components/page/HeroSignalLine";
import type { LandingPageEntry } from "@/content/registry/landing-pages";

export function CampaignHero({ page }: { page: LandingPageEntry }) {
  const stats = page.heroStats ?? page.proof.slice(0, 3);

  return (
    <section
      className="lp-campaign-hero hero-shell chapter relative overflow-x-clip"
      aria-labelledby="page-hero-heading"
    >
      <div className="lp-campaign-hero__atmosphere" aria-hidden>
        <span className="lp-campaign-hero__orb lp-campaign-hero__orb--signal" />
        <span className="lp-campaign-hero__orb lp-campaign-hero__orb--ink" />
        <span className="lp-campaign-hero__mesh" />
      </div>
      <div className="hero-veil" aria-hidden />

      <HeroScrollRoot className="shell shell--cinema lp-campaign-hero__stage relative z-[2]">
        <div className="lp-campaign-hero__layout">
          <div className="lp-campaign-hero__copy">
            <HeroParallax layer="copy">
              <div className="hero-copy lp-campaign-hero__copy-inner">
                <div className="hero-enter hero-enter-1">
                  <p className="lp-campaign-kicker">
                    <span className="lp-campaign-kicker__dot" aria-hidden />
                    {page.badge}
                  </p>
                </div>

                <h1
                  id="page-hero-heading"
                  className="hero-enter hero-enter-2 mt-5 font-[family-name:var(--font-display)] font-bold tracking-[-0.045em] text-balance text-foreground sm:mt-6"
                >
                  <span className="hero-line">
                    <span className="hero-line__text">{page.headline}</span>
                  </span>
                  <HeroSignalLine text={page.headlineAccent} />
                </h1>
              </div>
            </HeroParallax>
          </div>

          <div className="lp-campaign-hero__panel">
            <HeroParallax layer="stage">
              <div className="hero-enter hero-enter-5">
                <LandingIntake
                  page={page}
                  embedded
                  campaign
                  trust="logos"
                  showCallPath={false}
                />
              </div>
            </HeroParallax>
          </div>

          <div className="lp-campaign-hero__below">
            <p className="hero-enter hero-enter-3 lp-campaign-hero__lede">
              {page.subheadline}
            </p>

            {stats.length ? (
              <ul className="hero-enter hero-enter-3 lp-campaign-stats" aria-label="Results">
                {stats.map((item) => (
                  <li key={item.label} className="lp-campaign-stat">
                    <span className="lp-campaign-stat__value">{item.metric}</span>
                    <span className="lp-campaign-stat__label">{item.label}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {page.heroMeta?.length ? (
              <ul className="hero-enter hero-enter-3 lp-campaign-meta">
                {page.heroMeta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {page.serviceArea?.length ? (
              <ul className="hero-enter hero-enter-3 lp-campaign-cities" aria-label="Service area">
                {page.serviceArea.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </HeroScrollRoot>
    </section>
  );
}
