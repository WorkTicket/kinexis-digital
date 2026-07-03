import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import { locations, getLocationServiceLabel } from "@/content/registry/locations";
import { browseableLocationServices, getLocationServiceTitle } from "@/lib/location-related-links";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = locale === "es"
    ? { title: "Marketing Digital Local | KINEXIS Digital", description: "Marketing digital específico para Dallas, Austin, Toronto, Bogotá y mercados de Iowa. Estrategia local única para cada ciudad." }
    : { title: "Local Digital Marketing | KINEXIS Digital", description: "Location-specific digital marketing for Dallas, Austin, Toronto, Bogotá, and Iowa markets. Unique local strategy for each city we serve." };
  return buildPageMetadata({
    locale,
    path: "/locations",
    ...meta,
  });
}

export default async function LocationsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Locations" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Locations" }]} />
      <HeroArchetype
        archetype="showcase"
        label="Locations"
        headline={
          <>
            <span className="type-hero-line">Local expertise.</span>
            <span className="type-hero-line">National capability.</span>
          </>
        }
        subtitle="Every location page contains unique copy, local references, and market-specific strategy. We never duplicate templates with city names swapped."
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
        secondaryCtaLabel="National digital marketing agency"
        secondaryCtaHref="/digital-marketing-agency"
      />
      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader pattern="C" title="Markets we serve" />
          <div className="section-content grid gap-grid-sm md:grid-cols-2">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="block service-card bg-bg hover:border-neon-cyan/30 transition-colors"
              >
                <h3 className="card-heading">{loc.city}, {loc.state}</h3>
                <p className="mt-4 text-xs text-neon-cyan">{loc.region}</p>
                <p className="service-card__body">{loc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title="Browse by service"
            subtitle="Jump to a city + service page directly."
          />
          <div className="section-content grid gap-grid-lg md:grid-cols-2 lg:grid-cols-3">
            {browseableLocationServices.map((svc) => (
              <div key={svc}>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-neon-cyan mb-4">
                  {getLocationServiceTitle(svc)}
                </h3>
                <ul className="space-y-2">
                  {locations.map((loc) => (
                      <li key={`${loc.slug}-${svc}`}>
                        <Link
                          href={`/locations/${loc.slug}/${svc}`}
                          className="text-sm text-muted hover:text-white transition-colors"
                        >
                          {getLocationServiceLabel(svc, loc.city)}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
