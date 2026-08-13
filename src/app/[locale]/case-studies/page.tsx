import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SitePreview } from "@/components/home/SitePreview";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { MediaReveal, Reveal } from "@/components/ui/Reveal";
import { caseStudyHref } from "@/content/home-results";
import { getCaseStudyPages } from "@/content/case-studies";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/case-studies",
    title: "Proven Client Results and Case Studies",
    description:
      "Real client results: 2.8X leads, 136% more emergency calls, 2.4X orders. See how we rebuild demand programs that finance can defend.",
  });
}

export default async function WorkIndexPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("pages.work");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const studies = getCaseStudyPages(locale);
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("work"), url: buildAbsoluteUrl(locale, "/case-studies") },
          ]),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        signal={t("signal")}
        copy={t("copy")}
        secondaryHref="/services"
        secondaryLabel={tCommon("seeServices")}
      />

      <section
        aria-labelledby="work-index-heading"
        className="chapter chapter--void relative"
      >
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter" className="mb-12 md:mb-16 lg:mb-20">
            <ChapterLead
              eyebrow={t("indexEyebrow")}
              headingId="work-index-heading"
              title={t("indexTitle")}
              headingClassName="max-w-[12ch]"
              dek={t("indexDek")}
            />
          </Reveal>

          <ul className="work-index">
            {studies.map((study, index) => {
              const href = caseStudyHref(study.slug);
              const flipped = index % 2 === 1;
              return (
                <li key={study.slug}>
                  <Link
                    href={href}
                    className={
                      flipped
                        ? "work-card work-card--flip group"
                        : "work-card group"
                    }
                  >
                    <MediaReveal
                      className="work-card__media"
                      variant="float"
                      from={flipped ? "right" : "left"}
                    >
                      <DeviceFrame>
                        <SitePreview
                          image={study.image}
                          imageAlt={study.imageAlt}
                          priority={index === 0}
                        />
                      </DeviceFrame>
                    </MediaReveal>
                    <Reveal
                      variant="fadeUp"
                      when="media"
                      delay={0.12}
                      className="work-card__body"
                    >
                      <h3 className="work-card__client">{study.client}</h3>
                      <p className="work-card__meta">
                        <span>{study.industry}</span>
                        <span aria-hidden>·</span>
                        <span>{study.timeline}</span>
                      </p>
                      <p className="work-card__lift">{study.primaryLift}</p>
                      <p className="work-card__headline">{study.headline}</p>
                      <p className="work-card__summary">{study.summary}</p>
                      <span className="work-card__cta">
                        {tCommon("readTheCase")}
                        <span aria-hidden>→</span>
                      </span>
                    </Reveal>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="chapter chapter--studio relative overflow-hidden">
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="rise" when="chapter">
            <ChapterLead
              eyebrow={t("pictureEyebrow")}
              title={t("pictureTitle")}
              headingClassName="max-w-[12ch]"
              dek={t("pictureDek")}
            >
              <Button href="/clients" variant="link" arrow>
                {t("seeRoster")}
              </Button>
            </ChapterLead>
          </Reveal>
        </div>
      </section>

      <PageCTA
        title={t("indexCtaTitle")}
        copy={t("indexCtaCopy")}
      />
    </main>
  );
}
