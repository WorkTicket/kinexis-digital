import { SitePreview } from "@/components/home/SitePreview";
import { SignalPlaneMount } from "@/components/home/SignalPlaneMount";
import { HeroParallax, HeroScrollRoot } from "@/components/home/HeroParallax";
import { PageBreadcrumb } from "@/components/page/PageHero";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import type { CaseStudyPage } from "@/content/case-studies";

type CaseStudyHeroProps = {
  study: CaseStudyPage;
};

/**
 * Case study open — same cinematic shell and optical lift as PageHero / HomeHero.
 */
export function CaseStudyHero({ study }: CaseStudyHeroProps) {
  return (
    <section
      className="hero-shell case-hero page-hero page-hero--split chapter chapter--void relative flex min-h-0 flex-col overflow-x-clip lg:min-h-[100svh]"
      aria-labelledby="case-hero-heading"
    >
      <SignalPlaneMount />
      <div className="hero-film-scrim" aria-hidden />
      <div className="hero-veil" aria-hidden />

      <HeroScrollRoot className="shell shell--cinema page-hero__grid hero-stage relative z-[2]">
        <div className="page-hero__copy-col">
          <HeroParallax layer="copy">
            <div className="hero-copy relative z-[3]">
              <div className="hero-enter hero-enter-1">
                <PageBreadcrumb
                  items={[
                    { href: "/", label: "Home" },
                    { href: "/case-studies", label: "Work" },
                    { label: study.client },
                  ]}
                />
                <p className="section-eyebrow mt-6">Case study</p>
              </div>

              <h1
                id="case-hero-heading"
                className="hero-enter hero-enter-2 mt-5 font-[family-name:var(--font-display)] font-bold tracking-[-0.045em] text-balance text-foreground sm:mt-6 md:mt-7"
              >
                <span className="hero-line">
                  <span className="hero-line__text">{study.client}</span>
                </span>
              </h1>

              <p className="hero-enter hero-enter-3 mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted sm:text-base">
                <span>{study.industry}</span>
                <span aria-hidden>·</span>
                <span>{study.timeline}</span>
                <span aria-hidden>·</span>
                <span>{study.domain}</span>
              </p>

              <div className="hero-enter hero-enter-3 mt-8 flex flex-wrap items-end gap-x-6 gap-y-2">
                <p className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,5rem)] font-bold leading-none tracking-[-0.05em] text-[color:var(--hero-signal)]">
                  {study.primaryLift}
                </p>
                <p className="max-w-xs pb-1 text-lg font-semibold text-foreground sm:text-xl">
                  {study.headline}
                </p>
              </div>

              <p className="hero-enter hero-enter-3 hero-lede mt-6 max-w-xl text-[1.125rem] leading-relaxed text-muted sm:text-[1.25rem] md:text-[1.3125rem] md:leading-relaxed">
                {study.summary}
              </p>
            </div>
          </HeroParallax>
        </div>

        <div className="page-hero__visual">
          <HeroParallax layer="stage">
            <div className="hero-enter hero-enter-5 case-hero-media">
              <div className="work-card__media-glow" />
              <DeviceFrame>
                <SitePreview
                  image={study.image}
                  imageAlt={study.imageAlt}
                  priority
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </DeviceFrame>
            </div>
          </HeroParallax>
        </div>
      </HeroScrollRoot>
    </section>
  );
}
