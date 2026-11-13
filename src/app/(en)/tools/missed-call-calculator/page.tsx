import type { Metadata } from "next";
import Link from "next/link";
import MissedCallCalculator from "@/components/tools/MissedCallCalculator";
import { WebApplicationSchema } from "@/components/JsonLd";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { contentMetadata } from "@/lib/seo";

export const metadata: Metadata = contentMetadata({
  path: "/tools/missed-call-calculator",
  title: "Missed-Call Text-Back Calculator | Kinexis Digital",
  description: "Estimate missed-call revenue at risk with your own calls, miss rate, job value, and close rate. Planning math only — no invented benchmarks.",
  absolute: true,
});

export default function MissedCallCalculatorPage() {
  return (
    <>
      <WebApplicationSchema
        name="Missed-Call Revenue Calculator"
        description="Estimate monthly missed-call revenue at risk using your calls, miss rate, job value, and close rate."
        path="/tools/missed-call-calculator"
      />
      <PageHero
        eyebrow="Tools"
        h1="Missed-Call Revenue Calculator"
        mark="Calculator"
        sub="Use your own numbers. We show the formula in plain English and never invent industry averages."
      />
      <Section narrow>
        <MissedCallCalculator />
        <p className="muted" style={{ marginTop: "1.25rem" }}>
          Missed-call text-back is optional. On Website or Own It it is a $97/mo add-on; on Lead System or Plus a second tracking number is $1/mo if used, plus carrier rates. Carrier approval typically takes 10–15 days and is not guaranteed. See{" "}
          <Link href="/blog/missed-call-text-back-templates" prefetch={false}>templates by trade</Link>
          {" "}and{" "}
          <Link href="/pricing" prefetch={false}>plans</Link>.
        </p>
      </Section>
      <CtaBand
        h="Want Text-Back on Your Tracking Number?"
        mark="Text-Back"
        sub="Start with a free homepage preview. No card, no obligation."
        btn="Get My Free Preview"
        href="/contact"
        secondary="See Plans & Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
