import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { serviceIconsBySlug } from "@/components/home/service-icons";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import { WhereWeWork } from "@/components/page/WhereWeWork";
import JsonLd from "@/components/seo/JsonLd";
import { ServiceProgramChapter } from "@/components/services/ServiceProgramChapter";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { getServicePages } from "@/content/services";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { isFlagshipServiceSlug } from "@/lib/legacy-redirects.mjs";
import { buildAbsoluteUrl, buildPageMetadata, getSiteUrl } from "@/lib/metadata";
import {
  breadcrumbSchema,
  organizationSchema,
  serviceSchema,
} from "@/lib/schema";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/services",
    title: "SEO, Ads, and Web Design Services",
    description:
      "Web design, SEO, branding, paid ads, and content as one demand program. Built for home services and ecommerce brands that need booked work and orders.",
  });
}

export default async function ServicesIndexPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("pages.services");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const pages = getServicePages(locale);

  return (
    <main className="services-page flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("services"), url: buildAbsoluteUrl(locale, "/services") },
          ]),
          ...pages.map((service) =>
            serviceSchema(
              service.title,
              service.metaDescription,
              isFlagshipServiceSlug(service.slug)
                ? `${getSiteUrl()}/services/${service.slug}`
                : `${getSiteUrl()}/services#${service.slug}`,
            ),
          ),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        signal={t("signal")}
        copy={t("copy")}
        secondaryHref="/case-studies"
        secondaryLabel={tCommon("seeTheWork")}
      />

      <section
        className="svc-catalog chapter chapter--void relative"
        aria-labelledby="svc-catalog-heading"
      >
        <div className="shell chapter-shell--tight relative">
          <Reveal
            variant="rise"
            when="chapter"
            className="mb-10 md:mb-12"
          >
            <ChapterLead
              layout="split"
              eyebrow={t("mixEyebrow")}
              headingId="svc-catalog-heading"
              title={t("mixTitle")}
              headingClassName="max-w-[10ch]"
              dek={t("mixDek")}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="svc-catalog__grid"
            stagger={0.05}
            delayChildren={0.04}
            aria-label={tCommon("jumpToService")}
          >
            {pages.map((service) => {
              const Icon = serviceIconsBySlug[service.slug];
              const href = isFlagshipServiceSlug(service.slug)
                ? `/services/${service.slug}`
                : `#${service.slug}`;
              const className = "svc-catalog__card motion-tile";
              return (
                <RevealItem as="li" key={service.slug} variant="fadeUp">
                  {isFlagshipServiceSlug(service.slug) ? (
                    <Link href={href} className={className}>
                      <span className="icon-well" aria-hidden>
                        <Icon />
                      </span>
                      <span className="svc-catalog__role">{service.role}</span>
                      <span className="svc-catalog__name">{service.title}</span>
                      <span className="svc-catalog__dek">
                        {service.description}
                      </span>
                    </Link>
                  ) : (
                    <a href={href} className={className}>
                      <span className="icon-well" aria-hidden>
                        <Icon />
                      </span>
                      <span className="svc-catalog__role">{service.role}</span>
                      <span className="svc-catalog__name">{service.title}</span>
                      <span className="svc-catalog__dek">
                        {service.description}
                      </span>
                    </a>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <div className="svc-offer-rail chapter chapter--studio">
        <div className="shell">
          {pages.map((service, index) => (
            <ServiceProgramChapter
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>

      <WhereWeWork />
      <PageCTA
        title={t("ctaTitle")}
        copy={t("ctaCopy")}
      />
    </main>
  );
}
