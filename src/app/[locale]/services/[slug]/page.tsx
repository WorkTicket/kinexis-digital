import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { PageCTA } from "@/components/page/PageCTA";
import { PageHero } from "@/components/page/PageHero";
import { WhereWeWork } from "@/components/page/WhereWeWork";
import JsonLd from "@/components/seo/JsonLd";
import { ServiceProgramChapter } from "@/components/services/ServiceProgramChapter";
import { resolveLocale } from "@/i18n/locale";
import {
  FLAGSHIP_SERVICE_SLUGS,
  isFlagshipServiceSlug,
  serviceHubPath,
} from "@/lib/legacy-redirects.mjs";
import { buildAbsoluteUrl, buildPageMetadata, getSiteUrl } from "@/lib/metadata";
import {
  breadcrumbSchema,
  organizationSchema,
  serviceSchema,
} from "@/lib/schema";
import { serviceSlugs } from "@/content/registry/site-routes";
import { getAllServiceSlugs, getServiceBySlug } from "@/content/services";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = new Set<string>([...serviceSlugs, ...getAllServiceSlugs()]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const service = getServiceBySlug(slug, locale);

  if (isFlagshipServiceSlug(slug) && service) {
    return buildPageMetadata({
      locale,
      path: `/services/${slug}`,
      title: service.metaTitle,
      description: service.metaDescription,
    });
  }

  return buildPageMetadata({
    locale,
    path: "/services",
    title: service?.metaTitle ?? "SEO, Ads, and Web Design Services",
    description:
      service?.metaDescription ??
      "Web design, SEO, branding, paid ads, and content as one demand program. Built for home services and ecommerce brands that need booked work and orders.",
    noIndex: true,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { slug } = await params;

  if (!isFlagshipServiceSlug(slug)) {
    redirect({ href: serviceHubPath(slug), locale });
  }

  const service = getServiceBySlug(slug, locale);
  if (!service) notFound();

  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const flagshipIndex = FLAGSHIP_SERVICE_SLUGS.indexOf(slug);

  return (
    <main className="services-page flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            {
              name: tNav("services"),
              url: buildAbsoluteUrl(locale, "/services"),
            },
            {
              name: service.title,
              url: buildAbsoluteUrl(locale, `/services/${slug}`),
            },
          ]),
          serviceSchema(
            service.title,
            service.metaDescription,
            `${getSiteUrl()}/services/${slug}`,
          ),
        ]}
      />
      <PageHero
        eyebrow={service.role}
        title={service.heroTitle}
        signal={service.heroSignal}
        copy={service.heroCopy}
        secondaryHref="/case-studies"
        secondaryLabel={tCommon("seeTheWork")}
      />

      <section
        className="svc-program chapter chapter--studio relative"
        aria-label={service.title}
      >
        <div className="shell chapter-shell--monument relative">
          <ServiceProgramChapter
            service={service}
            index={flagshipIndex >= 0 ? flagshipIndex : 0}
          />
        </div>
      </section>

      <WhereWeWork />

      <PageCTA
        layout="minimal"
        title={service.ctaTitle}
        copy={service.ctaCopy}
      />
    </main>
  );
}
