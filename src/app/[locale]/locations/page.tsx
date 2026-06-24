import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import { locations } from "@/content/registry/locations";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/locations",
    title: "Local Digital Marketing | Markets We Serve | KINEXIS",
    description: "Location-specific digital marketing for Dallas, Austin, Toronto, Bogotá, Cedar Falls, Cedar Rapids, Des Moines, and Waterloo. Unique local content for each market, not duplicate city templates.",
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
    </>
  );
}
