import type { Metadata } from "next";
import "@/styles/routes/industry.css";
import { getTranslations } from "next-intl/server";
import { MarketHubStage } from "@/components/page/MarketHubStage";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import { IndustryProgramChapter } from "@/components/industry/IndustryProgramChapter";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal } from "@/components/ui/Reveal";
import {
  getHubIndustries,
  getIndustryBySlug,
  getIndustriesContent,
  industryHref,
  marketsPreviewSlugs,
} from "@/content/industries";
import { industryVisuals } from "@/content/industry-visuals";
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
  const hubIndustries = getHubIndustries(locale);
  const previewMarkets = marketsPreviewSlugs.flatMap((slug) => {
    const industry = getIndustryBySlug(slug, locale);
    const visual = industry ? industryVisuals[industry.slug] : undefined;
    if (!industry || !visual?.thumb) return [];
    return [
      {
        slug: industry.slug,
        href: industryHref(industry.slug),
        eyebrow: industry.eyebrow,
        title: industry.title,
        still: visual.thumb,
        stillAlt: visual.alt,
      },
    ];
  });
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
        className="industries-hub-hero"
        visual={
          <MarketHubStage
            ariaLabel={c.indexTitle}
            markets={previewMarkets}
          />
        }
      />

      <section
        className="svc-offer-rail ind-offer-rail chapter chapter--studio relative"
        aria-labelledby="industries-index-heading"
      >
        <div className="shell chapter-shell--monument relative">
          <Reveal variant="rise" when="chapter" className="svc-offer-rail__lead">
            <ChapterLead
              eyebrow={c.indexEyebrow}
              headingId="industries-index-heading"
              title={c.indexTitle}
              headingClassName="max-w-[22ch]"
              dek={c.indexCopy}
            />
          </Reveal>

          {hubIndustries.map((industry, index) => (
            <IndustryProgramChapter
              key={industry.slug}
              industry={industry}
              index={index}
            />
          ))}
        </div>
      </section>

      <PageCTA layout="minimal" title={c.ctaTitle} copy={c.ctaCopy} />
    </main>
  );
}
