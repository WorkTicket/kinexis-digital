"use client";

import { Link } from "@/i18n/navigation";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CardFamily from "@/components/ui/CardFamily";
import CTAArchetype from "@/components/ui/CTAArchetype";
import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import FAQSection from "@/components/sections/FAQSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import type { LocationEntry } from "@/content/registry/locations";
import type { LocationDetailContent } from "@/content/locations/location-details";
import { getLocationHeroLines, getLocationServiceLabel, locationServiceSlugs } from "@/content/registry/locations";
import { serviceRoutes, type ServiceSlug } from "@/content/registry/site-routes";

type Props = {
  location: LocationEntry;
  serviceSlug?: string;
  pageTitle: string;
  pageDescription: string;
  detail?: LocationDetailContent;
};

export default function LocationPageClient({ location, serviceSlug, pageTitle: _pageTitle, pageDescription, detail }: Props) {
  const isAgencyPage = !serviceSlug || serviceSlug === "digital-marketing-agency";
  const resolvedService = (serviceSlug ?? "digital-marketing-agency") as Parameters<typeof getLocationHeroLines>[0];
  const heroLines = getLocationHeroLines(resolvedService, location.city);

  const localFaqs = detail?.localFaqs ?? [
    {
      question: `Do you work with businesses in ${location.city}, ${location.state}?`,
      answer: `Yes. We serve businesses across ${location.city}, the ${location.region}, and surrounding areas with SEO, paid media, web design, and conversion optimization.`,
    },
    {
      question: "Is your content unique for each city?",
      answer: "Yes. Every location page includes local context, market-specific strategy, and relevant case studies. We do not publish city-name swap templates.",
    },
  ];

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        label={`${location.city}, ${location.state}`}
        headline={
          <>
            <span className="type-hero-line">{heroLines.line1}</span>
            <span className="type-hero-line gradient-text">{heroLines.line2}</span>
          </>
        }
        subtitle={pageDescription}
        ctaLabel="Book a Local Strategy Call"
        ctaHref="/contact"
      />

      {detail && <AnswerBlock text={detail.answerBlock} />}

      <section className="section-padding bg-bg-dark">
        <div className="container-site max-w-3xl">
          <SectionHeader pattern="B" title={`Marketing in ${location.city}`} />
          <p className="mt-6 text-muted leading-relaxed">{location.description}</p>
          {detail && (
            <p className="mt-6 text-muted leading-relaxed">{detail.marketInsight}</p>
          )}
          {detail && detail.industries.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-neon-cyan mb-4">Industries we focus on</h3>
              <ul className="space-y-2">
                {detail.industries.map((ind) => (
                  <li key={ind} className="text-sm text-muted">{ind}</li>
                ))}
              </ul>
            </div>
          )}
          <ul className="mt-8 space-y-3">
            {location.localProof.map((proof) => (
              <li key={proof} className="flex gap-3 text-sm text-muted">
                <span className="text-neon-cyan">✓</span>
                {proof}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {isAgencyPage && (
        <section className="section-padding">
          <div className="container-site">
            <SectionHeader pattern="C" title={`Services in ${location.city}`} subtitle="Local campaigns built for your market, not generic national playbooks." />
            <div className="mt-8 grid gap-grid-sm md:grid-cols-2 lg:grid-cols-3">
              {locationServiceSlugs
                .filter((s) => s !== "digital-marketing-agency")
                .map((svc) => (
                  <Link key={svc} href={`/locations/${location.slug}/${svc}`} className="block">
                    <CardFamily family="editorial">
                      <h3 className="font-bold">{getLocationServiceLabel(svc, location.city)}</h3>
                      <p className="mt-2 text-sm text-muted">
                        {svc === "seo" && `Local SEO and organic growth for ${location.city} businesses.`}
                        {svc === "web-design" && `Conversion-optimized websites for ${location.city} companies.`}
                        {svc === "google-ads" && `Google Ads campaigns targeting ${location.region} buyers.`}
                        {svc === "ppc-management" && `Full PPC management for the ${location.city} market.`}
                      </p>
                    </CardFamily>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection items={localFaqs} title={`${location.city} FAQ`} />

      <RelatedLinks
        agencyHub
        serviceLinks={
          serviceSlug && serviceSlug !== "digital-marketing-agency"
            ? [{ href: serviceRoutes[serviceSlug as ServiceSlug], label: `National ${serviceSlug} Services` }]
            : location.services.slice(0, 4).map((s) => ({
                href: serviceRoutes[s as ServiceSlug] || `/services/${s}`,
                label: s,
              }))
        }
        caseStudyLinks={
          location.relatedCaseStudySlugs?.map((slug) => ({
            href: `/case-studies/${slug}`,
            label: "Local Case Study",
          })) || []
        }
      />

      <CTAArchetype
        archetype="story"
        headline={`Grow your ${location.city} business with KINEXIS`}
        subtitle="Book a strategy call and we'll audit your local market opportunity. No generic pitch, just a plan built for your city."
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
      />
    </>
  );
}
