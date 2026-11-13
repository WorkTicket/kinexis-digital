import type { Metadata } from "next";
import Link from "next/link";
import Form, { LEAD_FIELDS } from "@/components/Form";
import { WebApplicationSchema } from "@/components/JsonLd";
import ReviewLinkQrTool from "@/components/tools/ReviewLinkQrTool";
import { CtaBand, Faq, PageHero, Section } from "@/components/ui";
import { contentMetadata } from "@/lib/seo";

const FAQS = [
  {
    q: "Do Lead System and Plus send review requests?",
    a: "Lead System and Plus can send a Google review request after the job with a direct profile link. Website and base Own It do not include automated review requests.",
  },
  {
    q: "Does this tool talk to Google?",
    a: "No. It builds the writereview URL from the Place ID you paste and draws a QR code in your browser. It does not verify the business or store your ID on our servers.",
  },
  {
    q: "Where do I find my Place ID?",
    a: "In Google Business Profile go to Home, open your business, and look for Place ID. You can also paste a Maps or writereview link that already includes placeid=.",
  },
];

export const metadata: Metadata = contentMetadata({
  path: "/tools/google-review-link-qr",
  title: "Google Review Link & QR Generator | Kinexis Digital",
  description:
    "Paste a Google Place ID to get a direct review link and downloadable QR code. Client-side only — no API key, no secrets stored.",
  absolute: true,
});

export default function GoogleReviewLinkQrPage() {
  return (
    <>
      <WebApplicationSchema
        name="Google Review Link & QR Generator"
        description="Paste a Google Place ID to build a direct review URL and downloadable QR code in your browser."
        path="/tools/google-review-link-qr"
        faqs={FAQS}
      />
      <PageHero
        eyebrow="Tools"
        h1="Google Review Link & QR Generator"
        mark="QR Generator"
        sub="Paste a Place ID. Get a direct review link and a downloadable QR — built in your browser, with no Google API key."
      />
      <Section narrow>
        <ReviewLinkQrTool />
        <p className="muted" style={{ marginTop: "1.25rem" }}>
          Lead System and Plus can send a Google review request after the job with a direct profile link. Website and base Own It do not include automated review requests. See{" "}
          <Link href="/blog/how-to-ask-for-google-reviews-contractor" prefetch={false}>
            review request scripts
          </Link>
          {" "}and{" "}
          <Link href="/pricing" prefetch={false}>
            plans
          </Link>
          .
        </p>
      </Section>
      <Section narrow tint>
        <h2>FAQs</h2>
        <Faq items={FAQS} />
      </Section>
      <Section narrow>
        <h2>Want a free homepage preview?</h2>
        <p className="muted" style={{ marginBottom: "1rem" }}>
          No card, no obligation. Tell us the business and city — we build the first homepage draft so you can judge the fit.
        </p>
        <Form
          fields={LEAD_FIELDS}
          button="Get My Free Preview"
          fast
          hiddenFields={{
            source: "review_qr_tool",
            landing_page: "/tools/google-review-link-qr",
          }}
        />
      </Section>
      <CtaBand
        h="Want Review Requests After Jobs?"
        mark="After Jobs"
        sub="Lead System and Plus can send a Google review request with a direct profile link. Start with a free homepage preview."
        btn="See Plans & Pricing"
        href="/pricing"
        secondary="Get My Free Preview"
        secondaryHref="/contact"
      />
    </>
  );
}
