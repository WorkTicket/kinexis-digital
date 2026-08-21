import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomeCertifications } from "@/components/home/HomeCertifications";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { clientEngagements } from "@/content/client-engagements";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/clients",
    title: "Brands and Partners We Work With",
    description:
      "Platform partners and brands we've worked with across search, paid, creative, and conversion. Scope we can describe. Results we publish when cleared.",
  });
}

export default async function ClientsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("pages.clients");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("clients"), url: buildAbsoluteUrl(locale, "/clients") },
          ]),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        signal={t("signal")}
        copy={t("copy")}
        secondaryHref="/case-studies"
        secondaryLabel={tCommon("seeCaseStudies")}
      />

      <section
        aria-labelledby="clients-roster-heading"
        className="chapter chapter--void relative"
      >
        <div className="shell chapter-shell--standard relative">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-14">
            <ChapterLead
              layout="split"
              eyebrow={t("rosterEyebrow")}
              headingId="clients-roster-heading"
              title={t("rosterTitle")}
              headingClassName="max-w-[12ch]"
              dek={t("rosterDek")}
            />
          </Reveal>

          <RevealGroup as="ul" className="client-wall-page" stagger={0.04}>
            {clientEngagements.map((client) => (
              <RevealItem key={client.slug} as="li" variant="fadeUp">
                <div className="client-wall-page__row motion-row">
                  <div className="client-wall-page__logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/assets/logos/brands/${client.slug}.svg`}
                      alt={client.name}
                      decoding="async"
                    />
                  </div>
                  <div className="client-wall-page__body">
                    <h3 className="client-wall-page__name">{client.name}</h3>
                    <p className="client-wall-page__scope">{client.focus}</p>
                    <p className="client-wall-page__summary">{client.summary}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <HomeCertifications />

      <PageCTA
        layout="minimal"
        title={t("ctaTitle")}
        copy={t("ctaCopy")}
      />
    </main>
  );
}
