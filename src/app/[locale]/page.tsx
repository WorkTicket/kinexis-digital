import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeCertifications } from "@/components/home/HomeCertifications";
import { HomeCTA } from "@/components/home/HomeCTA";
import { HomeExplore } from "@/components/home/HomeExplore";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeResults } from "@/components/home/HomeResults";
import { HomeServices } from "@/components/home/HomeServices";
import { WhereWeWork } from "@/components/page/WhereWeWork";
import JsonLd from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";
import { getFaqItems } from "@/content/about";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata, getSiteUrl } from "@/lib/metadata";
import {
  faqSchema,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

const HomeClients = dynamic(() =>
  import("@/components/home/HomeClients").then((mod) => mod.HomeClients),
);
const FaqAccordion = dynamic(() =>
  import("@/components/page/FaqAccordion").then((mod) => mod.FaqAccordion),
);

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildPageMetadata({
    locale,
    path: "/",
    absolute: true,
    title: t("title"),
    description: t("description"),
  });
}

export default async function Home({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("home");
  const faqs = getFaqItems(locale);
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(getSiteUrl()),
          websiteSchema(locale === "es" ? "es" : "en"),
          faqSchema(faqs),
        ]}
      />
      <main className="flex flex-1 flex-col">
        <HomeHero />
        <HomeCertifications />
        <HomeClients
          eyebrow={t("clientsEyebrow")}
          title={t("clientsTitle")}
          dek={t("clientsDek")}
          meetClients={t("meetClients")}
        />
        <HomeServices />
        <HomeResults />
        <HomeProcess />
        <WhereWeWork />
        <FaqAccordion items={faqs} title={t("faqTitle")} />
        <HomeExplore />
        <HomeCTA />
      </main>
    </>
  );
}
