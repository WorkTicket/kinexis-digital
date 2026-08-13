import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingLeadForm } from "@/components/landing/LandingLeadForm";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import {
  getLandingPage,
  landingPageSlugs,
} from "@/content/registry/landing-pages";
import { resolveLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return landingPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) {
    return buildPageMetadata({
      locale,
      path: `/lp/${slug}`,
      title: "Landing page",
      description: "KINEXIS Digital paid campaign landing page.",
      noIndex: true,
      noFollow: true,
    });
  }

  return buildPageMetadata({
    locale,
    path: `/lp/${page.slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
    noIndex: true,
    noFollow: true,
  });
}

export default async function LandingPage({ params }: Props) {
  await resolveLocale(params);
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow={page.badge}
        title={page.headline}
        signal={page.headlineAccent}
        copy={page.subheadline}
        compact
        hideActions
        visual={
          <LandingLeadForm
            serviceLabel={page.serviceLabel}
            formTitle={page.formTitle}
            formSubtitle={page.formSubtitle}
            submitLabel={page.submitLabel}
            formFootnote={page.formFootnote}
          />
        }
      />

      <section className="chapter chapter--studio relative">
        <div className="shell relative py-24 md:py-32 lg:py-40">
          <Reveal variant="fadeUp">
            <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-[0.975rem]">
              {page.proofIntro}
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-foreground/10">
              {page.proof.map((item, index) => (
                <li
                  key={item.label}
                  className={index === 0 ? "lg:pr-8" : "lg:px-8"}
                >
                  <p className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {item.metric}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-snug text-muted">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.08} className="mt-20 max-w-3xl md:mt-28">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,3vw,2.35rem)] font-bold leading-[1.05] tracking-[-0.045em] text-foreground">
              {page.bulletsTitle}
            </h2>
            <ul className="mt-8 space-y-4">
              {page.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-[0.975rem] leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">
              Prefer the long version?{" "}
              <Link href={page.serviceHref} className="text-foreground underline underline-offset-2">
                {page.serviceLabel}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <FaqAccordion
        items={page.faqs}
        eyebrow="Before you reach out"
        title="Straight answers."
      />
    </main>
  );
}
