import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { HeroFilm } from "@/components/home/HeroFilm";
import { HeroParallax, HeroScrollRoot } from "@/components/home/HeroParallax";
import { HeroSignalLine } from "@/components/page/HeroSignalLine";
import { HOME_HERO_POSTER, HOME_HERO_POSTER_DESKTOP } from "@/lib/lcp-preload";

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
        href={HOME_HERO_POSTER}
        type="image/webp"
        fetchPriority="high"
        media="(max-width: 1023px)"
      />
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
      <div className="hero-veil" aria-hidden />

      <HeroScrollRoot className="shell shell--cinema hero-stage relative z-[2]">
        <HeroParallax layer="copy">
          <div className="hero-copy relative z-[3]">
            <div className="hero-enter hero-enter-1">
              <p className="hero-brand">Kinexis</p>
            </div>

            <h1
              id="home-hero-heading"
              className="hero-enter hero-enter-2 mt-5 font-[family-name:var(--font-display)] font-bold tracking-[-0.045em] text-balance text-foreground sm:mt-6 md:mt-7"
            >
              <span className="hero-line">
                <span className="hero-line__text">
                  {t("heroLine")}
                </span>
              </span>
              <HeroSignalLine text={t("heroSignal")} />
            </h1>

            <p className="hero-enter hero-enter-3 hero-lede mt-7 max-w-xl text-[1.125rem] leading-relaxed text-muted sm:mt-8 sm:text-[1.25rem] md:text-[1.3125rem] md:leading-relaxed">
              <Link href="/services" className="hero-inline-link">
                {t("heroLedeBefore")}
              </Link>{" "}
              {t("heroLedeMid")}{" "}
              <Link
                href="/industries/home-services"
                className="hero-inline-link"
              >
                {t("heroLedeHomeServices")}
              </Link>{" "}
              {t("heroLedeAnd")}{" "}
              <Link href="/industries/ecommerce" className="hero-inline-link">
                {t("heroLedeEcommerce")}
              </Link>
              {t("heroLedeAfter")}
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
