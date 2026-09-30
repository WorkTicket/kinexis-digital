import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { HeroFilm } from "@/components/home/HeroFilm";
import { HeroParallax, HeroScrollRoot } from "@/components/home/HeroParallax";
import { HeroHeading } from "@/components/page/HeroHeading";
import { HOME_HERO_POSTER_DESKTOP } from "@/lib/lcp-preload";

export async function HomeHero() {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="hero-shell hero-shell--film page-hero relative flex min-h-[100svh] flex-col overflow-x-clip"
    >
      <link
        rel="preload"
        as="image"
        href={HOME_HERO_POSTER_DESKTOP}
        type="image/webp"
        fetchPriority="high"
        media="(min-width: 1024px)"
      />
      <HeroFilm />
      <div className="hero-film-scrim" aria-hidden />

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
      </HeroScrollRoot>
    </section>
  );
}
