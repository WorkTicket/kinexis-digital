import { getLocale, getTranslations } from "next-intl/server";
import "@/styles/routes/home-results.css";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ChapterMotion } from "@/components/home/ChapterMotion";
import { SitePreview } from "@/components/home/SitePreview";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, MediaReveal } from "@/components/ui/Reveal";
import { caseStudyHref, getHomeResults } from "@/content/home-results";

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
            eyebrow={t("resultsEyebrow")}
            headingId="home-results-heading"
            title={t("resultsTitle")}
            dek={t("resultsDek")}
          />
        </Reveal>

        <ul className="proof-spread">
          {results.map((result) => {
            const href = caseStudyHref(result.slug);
            return (
              <li key={result.slug}>
                <article className="proof-spread__case">
                  <MediaReveal className="proof-spread__media">
                    <Link href={href} className="proof-spread__plate">
                      <SitePreview
                        image={result.image}
                        imageAlt={result.imageAlt}
                        sizes="(max-width: 1023px) 100vw, 58vw"
                      />
                    </Link>
                  </MediaReveal>

                  <Reveal variant="fadeUp" when="media" className="proof-spread__copy">
                    <p className="proof-spread__kicker">
                      <span>{result.industry}</span>
                      <span aria-hidden className="proof-spread__dot">
                        ·
                      </span>
                      <span>{result.timeline}</span>
                    </p>
                    <h3 className="proof-spread__client">
                      <Link href={href}>{result.client}</Link>
                    </h3>
                    <p className="proof-spread__metric">
                      <span className="proof-spread__lift">{result.primaryLift}</span>
                      <span className="proof-spread__headline">{result.headline}</span>
                    </p>
                    <p className="proof-spread__mechanism">{result.mechanism}</p>
                    <p className="proof-spread__summary">{result.summary}</p>
                    <div className="proof-spread__cta">
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
            <p className="results-more__outro">{t("resultsOutro")}</p>
            <Button href="/case-studies" size="lg" arrow>
              {t("viewAllWork")}
            </Button>
          </div>
        </Reveal>
      </ChapterMotion>
    </section>
  );
}
