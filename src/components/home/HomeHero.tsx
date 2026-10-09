import { getTranslations } from "next-intl/server";
import "@/styles/routes/home-hero.css";
import { HeroEngine, type HeroEngineSegment } from "@/components/home/HeroEngine";
import { HeroParallax, HeroScrollRoot } from "@/components/home/HeroParallax";
import { HomeCertifications } from "@/components/home/HomeCertifications";
import { HeroHeading } from "@/components/page/HeroHeading";
import { Button } from "@/components/ui/Button";

const ENGINE_SEGMENTS = [
  { id: "search", href: "/services/seo" },
  { id: "ads", href: "/services/paid-media" },
  { id: "web", href: "/services/web-design" },
  { id: "brand", href: "/services/branding" },
] as const satisfies ReadonlyArray<Pick<HeroEngineSegment, "id" | "href">>;

export async function HomeHero() {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const segments: HeroEngineSegment[] = ENGINE_SEGMENTS.map((segment) => ({
    id: segment.id,
    href: segment.href,
    label: t(`engine.segments.${segment.id}.label`),
    role: t(`engine.segments.${segment.id}.role`),
    title: t(`engine.segments.${segment.id}.title`),
    body: t(`engine.segments.${segment.id}.body`),
  }));

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="hero-shell hero-shell--film page-hero relative flex flex-col overflow-hidden"
    >
      <HeroScrollRoot className="shell shell--cinema hero-stage relative z-[2]">
        <HeroParallax layer="copy">
          <div className="hero-copy relative z-[3]">
            <h1
              id="home-hero-heading"
              className="hero-enter hero-enter-2 font-[family-name:var(--font-display)] font-bold tracking-[-0.045em] text-foreground"
            >
              <HeroHeading title={t("heroLine")} signal={t("heroSignal")} />
            </h1>

            <p className="hero-enter hero-enter-3 hero-lede mt-7 max-w-xl text-[1.125rem] leading-relaxed text-muted sm:mt-8 sm:text-[1.25rem] md:text-[1.3125rem] md:leading-relaxed">
              {t("heroLede")}
            </p>

            <div className="hero-cta-row mt-10 sm:mt-11 md:mt-12">
              <div className="hero-enter hero-enter-4">
                <Button href="/contact" size="xl" lift arrow>
                  {tCommon("bookStrategyCall")}
                </Button>
              </div>
              <div className="hero-enter hero-enter-4b">
                <Button href="#results" variant="link" arrow>
                  {tCommon("seeTheWork")}
                </Button>
              </div>
            </div>
          </div>
        </HeroParallax>
        <HeroEngine
          ariaLabel={t("engine.aria")}
          mark={t("engine.mark")}
          kicker={t("engine.kicker")}
          proof={t("engine.proof")}
          segments={segments}
        />
      </HeroScrollRoot>
      <HomeCertifications />
    </section>
  );
}
