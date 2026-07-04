import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import ContactHeroShell from "@/components/shared/ContactHeroShell";
import ContactPageClient from "@/components/pages/ContactPageClient";
import type { Locale } from "@/i18n/routing";
import { contactContent } from "@/content/contact";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema, localBusinessSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: Locale }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(contactContent, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(buildAbsoluteUrl(locale, "/contact")),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Contact", url: buildAbsoluteUrl(locale, "/contact") },
          ]),
        ]}
      />
      <ContactHeroShell
        label="Contact"
        headline={content.heroTitle}
        subtitle={content.heroSubtitle}
      />
      <ContactPageClient content={content} />
    </>
  );
}
