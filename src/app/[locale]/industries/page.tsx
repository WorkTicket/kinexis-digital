import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import { SignalPlaneMount } from "@/components/home/SignalPlaneMount";
import { IndustryGlyph } from "@/components/industry/industry-glyphs";
import { IndustryProgramChapter } from "@/components/industry/IndustryProgramChapter";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { industries, getIndustriesContent } from "@/content/industries";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const c = getIndustriesContent(locale);
  return buildPageMetadata({
    locale,
    path: "/industries",
    title: c.metaTitle,
    description: c.metaDescription,
  });
}

export default async function IndustriesPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const c = getIndustriesContent(locale);
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <main className="industries-page flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            {
              name: tNav("industries"),
              url: buildAbsoluteUrl(locale, "/industries"),
            },
          ]),
        ]}
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        signal={c.heroSignal}
        copy={c.heroCopy}
        secondaryHref="/case-studies"
        secondaryLabel={tCommon("seeTheWork")}
        atmosphere={<SignalPlaneMount />}
        className="industries-hub-hero"
      />

      <section
        className="ind-catalog chapter chapter--void relative"
        aria-labelledby="industries-index-heading"
      >
        <div className="shell chapter-shell--tight relative">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
            <ChapterLead
              layout="split"
              eyebrow={c.indexEyebrow}
              headingId="industries-index-heading"
              title={c.indexTitle}
              headingClassName="max-w-[22ch]"
              dek={c.indexCopy}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="ind-folio"
            stagger={0.04}
            delayChildren={0.03}
            aria-label={tCommon("jumpToIndustry")}
          >
            {industries.map((industry) => (
              <RevealItem as="li" key={industry.slug} variant="fadeUp">
                <a href={`#${industry.slug}`} className="ind-folio__item">
                  <span className="ind-folio__glyph" aria-hidden>
                    <IndustryGlyph slug={industry.slug} />
                  </span>
                  <span>
                    <span className="ind-folio__role">{industry.eyebrow}</span>
                    <span className="ind-folio__name">{industry.title}</span>
                  </span>
                  <p className="ind-folio__meta">{industry.summary}</p>
                  <span className="ind-folio__arrow" aria-hidden>
                    →
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div className="svc-offer-rail ind-offer-rail chapter chapter--studio">
        <div className="shell">
          {industries.map((industry, index) => (
            <IndustryProgramChapter
              key={industry.slug}
              industry={industry}
              index={index}
            />
          ))}
        </div>
      </div>

      <PageCTA layout="minimal" title={c.ctaTitle} copy={c.ctaCopy} />
    </main>
  );
}
