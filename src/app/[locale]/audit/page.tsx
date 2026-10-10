import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AuditBoard } from "@/components/audit/AuditBoard";
import { MarketingAuditForm } from "@/components/audit/MarketingAuditForm";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal } from "@/components/ui/Reveal";
import { getMarketingAuditContent } from "@/content/marketing-audit";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import "@/styles/routes/audit.css";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const content = getMarketingAuditContent(locale);
  return buildPageMetadata({
    locale,
    path: "/audit",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function AuditPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const content = getMarketingAuditContent(locale);
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <main className="audit-page flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: tNav("home"), url: buildAbsoluteUrl(locale, "/") },
            { name: tNav("audit"), url: buildAbsoluteUrl(locale, "/audit") },
          ]),
        ]}
      />
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        signal={content.signal}
        copy={content.copy}
        primaryHref="#audit-request"
        primaryLabel={content.primaryLabel}
        secondaryHref="/case-studies"
        secondaryLabel={tCommon("seeTheWork")}
      />

      <section
        aria-labelledby="audit-layers-heading"
        className="chapter chapter--void relative"
      >
        <div className="shell chapter-shell--monument relative">
          <div className="audit-review">
            <Reveal variant="rise" when="chapter">
              <ChapterLead
                eyebrow={content.layersEyebrow}
                headingId="audit-layers-heading"
                title={content.layersTitle}
                dek={content.layersDek}
                headingClassName="max-w-[16ch]"
              />
            </Reveal>

            <Reveal variant="fadeUp" delay={0.06}>
              <AuditBoard layers={content.layers} label={content.layersTitle} />
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="audit-request"
        aria-labelledby="audit-form-heading"
        className="chapter chapter--studio relative"
      >
        <div className="shell chapter-shell--standard relative">
          <div className="audit-request">
            <Reveal variant="fadeUp">
              <MarketingAuditForm content={content} />
            </Reveal>

            <Reveal variant="fadeUp" delay={0.08}>
              <aside className="audit-aside">
                <div>
                  <h2 className="audit-aside__title">{content.asideTitle}</h2>
                  <p className="audit-aside__dek">{content.asideSubtitle}</p>
                  <ul className="audit-returns">
                    {content.returns.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="audit-aside__title">{content.stepsTitle}</h3>
                  <ol className="audit-steps">
                    {content.steps.map((step) => (
                      <li key={step.title}>
                        <p className="audit-steps__title">{step.title}</p>
                        <p className="audit-steps__detail">{step.detail}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <ul className="audit-trust">
                  {content.trust.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
