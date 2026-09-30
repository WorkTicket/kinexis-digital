import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MarketingAuditForm } from "@/components/audit/MarketingAuditForm";
import { PageHero } from "@/components/page/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { getMarketingAuditContent } from "@/content/marketing-audit";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildAbsoluteUrl, buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

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
    <main className="flex flex-1 flex-col">
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
        secondaryHref="/case-studies"
        secondaryLabel={tCommon("seeTheWork")}
      />

      <section
        aria-label={content.metaTitle}
        className="chapter chapter--void relative"
      >
        <div className="shell chapter-shell--tight relative">
          <MarketingAuditForm content={content} />
        </div>
      </section>
    </main>
  );
}
