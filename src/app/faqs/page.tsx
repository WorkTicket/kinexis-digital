import { pageMetadata } from "@/lib/seo";
import { FAQS } from "@/lib/content";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, Faq, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("faqs");

export default function Page() {
  return (
    <>
      <PageSchema page="faqs" faqs={FAQS} />
      <PageHero h1="Frequently Asked Questions" mark="Questions" sub="Straight answers on plans, ownership, the 60-day lead guarantee and how to cancel. Can’t find yours? Just ask." image="faqs" imageAlt="Question marks for frequently asked questions" />
      <Section narrow><Faq items={FAQS} /></Section>
      <CtaBand h="Still Have Questions?" mark="Questions" sub="Text, call or send a message. We will answer plan questions before you pay." btn="Contact Us" />
    </>
  );
}
