import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { contactContent } from "@/content/contact";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const ContactPageClient = dynamic(() => import("@/components/pages/ContactPageClient"));

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
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Contact", url: buildAbsoluteUrl(locale, "/contact") },
          ]),
        ]}
      />
      <ContactPageClient content={content} />
    </>
  );
}
