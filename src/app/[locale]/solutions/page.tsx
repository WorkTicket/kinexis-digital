import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import { solutions } from "@/content/registry/solutions";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = locale === "es"
    ? { title: "Soluciones de Marketing | KINEXIS Digital", description: "Soluciones de marketing adaptadas por industria y servicio: SEO para HVAC, Google Ads para contratistas, marketing SaaS y más. Encuentra la combinación correcta para tu vertical." }
    : { title: "Marketing Solutions | KINEXIS Digital", description: "Tailored marketing solutions by industry and service: SEO for HVAC, Google Ads for roofers, SaaS marketing, and more. Find the right channel mix for your vertical." };
  return buildPageMetadata({
    locale,
    path: "/solutions",
    ...meta,
  });
}

export default async function SolutionsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Solutions" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Solutions" }]} />
      <HeroArchetype
        archetype="showcase"
        label="Solutions"
        headline={
          <>
            <span className="type-hero-line">Service + industry</span>
            <span className="type-hero-line">expertise combined.</span>
          </>
        }
        subtitle="Every solution page contains genuinely tailored content for a specific service and industry combination, not duplicate templates."
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
      />
      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader pattern="C" title="Browse solutions" />
          <div className="section-content grid gap-grid-sm md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="block service-card bg-bg hover:border-neon-cyan/30 transition-colors"
              >
                <h3 className="card-heading">{s.title}</h3>
                <p className="service-card__body line-clamp-2">{s.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
