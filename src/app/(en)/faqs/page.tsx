import { pageMetadata } from "@/lib/seo";
import { FAQS } from "@/lib/content";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, Faq, PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("faqs");

const FAQ_ITEMS = [
  {
    q: "How fast do I get my free preview?",
    a: "Your free homepage preview is ready within 2 business days after we get your business info, with no card needed.",
  },
  ...FAQS,
];

export default function Page() {
  return (
    <>
      <PageSchema page="faqs" faqs={FAQ_ITEMS} />
      <PageHero h1="Questions Business Owners Ask Us" mark="Ask Us" sub="Read the details on plans, ownership, the 60-day lead guarantee, and cancellation. If your question isn’t here, send it to us." image="faqs" imageAlt="Question marks for frequently asked questions" />
      <Section narrow><Faq items={FAQ_ITEMS} /></Section>
      <CtaBand h="Need A More Specific Answer?" mark="Specific Answer" sub="Text, call, or send a message. We’ll explain the plan details before you pay." btn="Send Us Your Question" />
    </>
  );
}
