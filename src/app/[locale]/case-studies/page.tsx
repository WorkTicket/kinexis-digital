import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import { WorkHubStage } from "@/components/page/WorkHubStage";
import { WorkStudy } from "@/components/page/WorkStudy";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal } from "@/components/ui/Reveal";
import { getCaseStudyPages } from "@/content/case-studies";
import { caseStudyHref, getHomeResults } from "@/content/home-results";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

type Props = { params: LocaleParams };

function figure(lift: string) {
  return lift.replace(/X/g, "×");
}

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
  const results = getHomeResults(locale);
  const studies = getCaseStudyPages(locale).map((study) => {
    const result = results.find((item) => item.slug === study.slug);
    return {
      study,
      href: caseStudyHref(study.slug),
      lift: figure(study.primaryLift),
      headline: result?.headline ?? study.headline,
      mechanism: result?.mechanism,
    };
  });

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
        visual={
          <WorkHubStage
            ariaLabel={t("indexEyebrow")}
            studies={studies.map(({ study, href, lift, headline }) => ({
              slug: study.slug,
              href,
              client: study.client,
              lift,
              headline,
              image: study.image,
              imageAlt: study.imageAlt,
            }))}
          />
        }
      />

      <section
        aria-labelledby="work-index-heading"
        className="work-folio-section chapter chapter--void relative"
      >
        <div className="shell chapter-shell--monument relative">
          <Reveal variant="rise" when="chapter" className="work-folio__lead">
            <ChapterLead
              eyebrow={t("indexEyebrow")}
              headingId="work-index-heading"
              title={t("indexTitle")}
              headingClassName="max-w-[16ch]"
              dek={t("indexDek")}
            />
          </Reveal>

          <div className="work-folio">
            {studies.map(({ study, href, lift, headline, mechanism }, index) => (
              <WorkStudy
                key={study.slug}
                href={href}
                client={study.client}
                industry={study.industry}
                timeline={study.timeline}
                lift={lift}
                headline={headline}
                mechanism={mechanism}
                summary={study.summary}
                services={study.servicesUsed}
                image={study.image}
                imageAlt={study.imageAlt}
                flipped={index % 2 === 1}
                readLabel={tCommon("readTheCase")}
                servicesLabel={tCommon("servicesUsed")}
              />
            ))}
          </div>
        </div>
      </section>

      <PageCTA title={t("indexCtaTitle")} copy={t("indexCtaCopy")} />
    </main>
  );
}
