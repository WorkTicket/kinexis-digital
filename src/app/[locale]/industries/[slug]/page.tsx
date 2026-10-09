import type { CSSProperties } from "react";
import "@/styles/routes/industry.css";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { permanentRedirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import { PageCTA } from "@/components/page/PageCTA";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/ui/Reveal";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { IndustryHero } from "@/components/industry/IndustryHero";
import { IndustryPainPoints } from "@/components/industry/IndustryPainPoints";
import { IndustryCaseStudyCard } from "@/components/industry/IndustryCaseStudyCard";
import { IndustryProcessSteps } from "@/components/industry/IndustryProcessSteps";
import { IndustryTestimonialBlock } from "@/components/industry/IndustryTestimonialBlock";
import { IndustryVisual } from "@/components/industry/IndustryVisual";
import JsonLd from "@/components/seo/JsonLd";
import {
  getStandaloneIndustrySlugs,
  getIndustryBySlug,
  isStandaloneIndustry,
} from "@/content/industries";
import { resolveLocale } from "@/i18n/locale";
import { matchUnprefixedLegacyRedirect } from "@/lib/legacy-redirects.mjs";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { duration } from "@/lib/motion";
import { industryVisuals } from "@/content/industry-visuals";
import { preload } from "react-dom";
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  serviceSchema,
} from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getStandaloneIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  if (!isStandaloneIndustry(slug)) {
    return buildPageMetadata({
      locale,
      path: "/industries",
      title: "Industry Demand Programs We Build",
      description:
        "Digital marketing for home services, ecommerce, healthcare, legal, SaaS, and more. Demand programs built for booked jobs, signed work, and revenue.",
      noIndex: true,
    });
  }
  return buildPageMetadata({
    locale,
    path: `/industries/${slug}`,
    title: industry.metaTitle,
    description: industry.metaDescription,
  });
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    permanentRedirect(
      matchUnprefixedLegacyRedirect(`/industries/${slug}`) ?? "/industries",
    );
  }

  // Standalone markets keep full detail pages. Hub chapters redirect to /industries#slug.
  if (!isStandaloneIndustry(slug)) {
    permanentRedirect(`/industries#${slug}`);
  }

  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const thumb = industryVisuals[industry.slug]?.thumb;
  if (thumb) {
    preload(thumb, {
      as: "image",
      type: "image/webp",
      fetchPriority: "high",
    });
  }

  return (
    <main
      className="industries-page flex flex-1 flex-col"
      style={
        industry.accentColor
          ? ({ "--industry-accent": industry.accentColor } as CSSProperties)
          : undefined
      }
    >
      <JsonLd
        data={[
          organizationSchema(),
          serviceSchema(
            industry.metaTitle,
            industry.metaDescription,
            buildAbsoluteUrl(locale, `/industries/${slug}`),
          ),
          faqSchema(industry.faq),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("industries"), url: buildAbsoluteUrl(locale, "/industries") },
            {
              name: industry.title,
              url: buildAbsoluteUrl(locale, `/industries/${slug}`),
            },
          ]),
        ]}
      />
      <IndustryHero industry={industry} />

      <IndustryPainPoints
        title={industry.problemTitle}
        copy={industry.problemCopy}
        approachTitle={industry.approachTitle}
        approachCopy={industry.approachCopy}
        painPoints={industry.painPoints}
      />

      {/* Program — capability mosaic */}
      <section
        aria-labelledby="industry-help-heading"
        className="industry-program-chapter chapter chapter--studio relative overflow-hidden"
      >
        <div className="shell chapter-shell--standard relative z-[1]">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-14">
            <ChapterLead
              eyebrow={t("program")}
              headingId="industry-help-heading"
              title={industry.helpTitle}
              headingClassName="max-w-[18ch]"
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="industry-capability"
            stagger={duration.staggerTight}
          >
            {industry.help.map((item) => (
              <RevealItem key={item.title} as="li" variant="fadeUp">
                <article className="industry-capability__item">
                  <h3 className="industry-capability__title">{item.title}</h3>
                  <p className="industry-capability__body">{item.detail}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Mid-page still — break text density */}
      <section
        aria-hidden
        className="industry-still-band chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--tight relative">
          <Reveal variant="fade" when="chapter" className="industry-still-band__frame media-grade">
            <IndustryVisual
              slug={industry.slug}
              variant="panel"
              sizes="(max-width: 1023px) 100vw, 90vw"
            />
          </Reveal>
        </div>
      </section>

      {industry.caseStudy && industry.proofTitle ? (
        <IndustryCaseStudyCard
          title={industry.proofTitle}
          caseStudy={industry.caseStudy}
        />
      ) : null}

      {industry.testimonials &&
      industry.testimonials.length > 0 &&
      industry.testimonialsTitle ? (
        <IndustryTestimonialBlock
          title={industry.testimonialsTitle}
          testimonials={industry.testimonials}
        />
      ) : null}

      {industry.processSteps &&
      industry.processSteps.length > 0 &&
      industry.processTitle &&
      industry.processCopy ? (
        <IndustryProcessSteps
          title={industry.processTitle}
          copy={industry.processCopy}
          steps={industry.processSteps}
          accentColor={industry.accentColor}
        />
      ) : null}

      {/* Domains — trade mosaic */}
      <section
        aria-labelledby="industry-domains-heading"
        className="industry-domains chapter chapter--void relative overflow-hidden"
      >
        <div className="shell chapter-shell--tight relative z-[1]">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
            <ChapterLead
              eyebrow={t("focus")}
              headingId="industry-domains-heading"
              title={industry.domainsTitle}
              headingClassName="max-w-[18ch]"
              dek={industry.domainsCopy}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="industry-domain-rail"
            stagger={duration.staggerTight}
          >
            {industry.domains.map((domain) => (
              <RevealItem key={domain.title} as="li" variant="fadeUp">
                <article className="industry-domain">
                  {domain.href ? (
                    <h3 className="industry-domain__title">
                      <Link href={domain.href}>{domain.title}</Link>
                    </h3>
                  ) : (
                    <h3 className="industry-domain__title">{domain.title}</h3>
                  )}
                  <p className="industry-domain__body">{domain.detail}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Why — manifesto columns */}
      <section
        aria-labelledby="industry-why-heading"
        className="industry-why-chapter chapter chapter--studio relative"
      >
        <div className="shell chapter-shell--tight relative">
          <Reveal variant="rise" when="chapter" className="mb-10 md:mb-12">
            <ChapterLead
              eyebrow={t("whyUs")}
              headingId="industry-why-heading"
              title={industry.whyTitle}
              headingClassName="max-w-[16ch]"
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="industry-why-grid"
            stagger={duration.staggerTight}
          >
            {industry.why.map((item) => (
              <RevealItem key={item.title} as="li" variant="fadeUp">
                <article className="industry-why">
                  <h3 className="industry-why__title">{item.title}</h3>
                  <p className="industry-why__body">{item.detail}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {industry.relatedLinks && industry.relatedLinks.length > 0 ? (
        <section
          aria-labelledby="industry-related-heading"
          className="chapter chapter--void relative"
        >
          <div className="shell chapter-shell--tight relative">
            <Reveal variant="rise" when="chapter" className="mb-8 md:mb-10">
              <ChapterLead
                eyebrow={t("keepReading")}
                headingId="industry-related-heading"
                title="Related services and proof"
                headingClassName="max-w-[18ch]"
              />
            </Reveal>
            <RevealGroup
              as="ul"
              className="industry-related"
              stagger={duration.staggerTight}
            >
              {industry.relatedLinks.map((link) => (
                <RevealItem key={link.href} as="li" variant="fadeUp">
                  <Link href={link.href} className="industry-related__link">
                    <span className="industry-related__label">{link.label}</span>
                    <span className="industry-related__arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <FaqAccordion
        items={industry.faq}
        title={
          industry.faqTitle ??
          `Questions about ${industry.title.toLowerCase()}.`
        }
      />

      <PageCTA title={industry.ctaTitle} copy={industry.ctaCopy} />
    </main>
  );
}
