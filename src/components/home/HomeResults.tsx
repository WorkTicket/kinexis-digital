import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ChapterMotion } from "@/components/home/ChapterMotion";
import { SitePreview } from "@/components/home/SitePreview";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem, MediaReveal } from "@/components/ui/Reveal";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { caseStudyHref, getHomeResults } from "@/content/home-results";
import { duration } from "@/lib/motion";

export async function HomeResults() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const results = getHomeResults(locale);

  return (
    <section
      id="results"
      aria-labelledby="home-results-heading"
      className="results-section chapter chapter--void relative"
    >
      <ChapterMotion className="shell chapter-shell--monument relative">
        <Reveal variant="rise" when="chapter" className="mb-4 md:mb-6">
          <ChapterLead
            layout="split"
            eyebrow={t("resultsEyebrow")}
            headingId="home-results-heading"
            title={t("resultsTitle")}
            dek={t("resultsDek")}
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="results-metric-rail"
          stagger={duration.staggerTight}
          delayChildren={0.14}
        >
          {results.map((result) => (
            <RevealItem key={result.slug} as="li" variant="fadeUp">
              <Link
                href={caseStudyHref(result.slug)}
                className="results-metric-rail__item group"
              >
                <p className="results-metric-rail__lift">
                  {result.primaryLift}
                </p>
                <p className="results-metric-rail__label">
                  {result.headline}
                </p>
                <p className="results-metric-rail__client">{result.client}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <ul className="results-stories">
          {results.map((result, index) => {
            const href = caseStudyHref(result.slug);
            const flipped = index % 2 === 1;
            return (
              <li key={result.slug}>
                <article
                  className={
                    flipped ? "result-row result-row--flip" : "result-row"
                  }
                >
                  <MediaReveal
                    className="result-row__media-reveal"
                    variant="float"
                    from={flipped ? "right" : "left"}
                    delay={0.04}
                  >
                    <DeviceFrame className="result-row__media">
                      <SitePreview
                        image={result.image}
                        imageAlt={result.imageAlt}
                      />
                    </DeviceFrame>
                  </MediaReveal>

                  <Reveal
                    variant="fadeUp"
                    when="media"
                    delay={0.18}
                    className="result-row__body"
                  >
                    <div className="result-row__identity">
                      <h3 className="result-row__client">
                        <Link href={href} className="result-row__title-link">
                          {result.client}
                        </Link>
                      </h3>
                      <p className="result-row__meta">
                        <span>{result.industry}</span>
                        <span aria-hidden className="result-row__meta-dot">
                          ·
                        </span>
                        <span>{result.timeline}</span>
                      </p>
                      <p className="result-row__mechanism">{result.mechanism}</p>
                    </div>

                    <div className="result-row__metric">
                      <p className="result-row__lift">{result.primaryLift}</p>
                      <p className="result-row__headline">{result.headline}</p>
                    </div>

                    <p className="result-row__summary">{result.summary}</p>

                    <div className="mt-8">
                      <Button href={href} variant="link" arrow>
                        {t("readTheCase")}
                      </Button>
                    </div>
                  </Reveal>
                </article>
              </li>
            );
          })}
        </ul>

        <Reveal variant="fadeUp" delay={0.08}>
          <div className="results-more">
            <p className="results-more__outro">
              {t("resultsOutro")}
            </p>
            <Button href="/case-studies" size="lg" arrow>
              {t("viewAllWork")}
            </Button>
          </div>
        </Reveal>
      </ChapterMotion>
    </section>
  );
}
