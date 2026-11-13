import dynamic from "next/dynamic";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE, telHref } from "@/lib/site";
import { PageSchema } from "@/components/JsonLd";
import { CtaBand, HL, PageHero, Section } from "@/components/ui";

const BookingCalendar = dynamic(() => import("@/components/BookingCalendar"));

export const metadata = pageMetadata("strategy-call");

export default function Page() {
  return (
    <>
      <PageSchema page="strategy-call" />
      <PageHero
        previewBar={false}
        h1="Talk Through Your Website Plans"
        mark="Website Plans"
        sub="Use a short call to show us your current site, explain the business, and see which plan fits."
        image="contact"
        imageAlt="Phone, envelope, and chat bubbles"
      />
      <Section>
        <div className="two-col two-col--book">
          <div>
            <h2><HL text="What We’ll Cover" mark="We’ll Cover" /></h2>
            <ul className="ticks">
              <li>How customers currently find you and get in touch</li>
              <li>Which services you want the website to support</li>
              <li>Which plan makes sense, including when none of them is a good fit</li>
            </ul>
            <p>Choose a time on the calendar and we’ll confirm it by email. You can also call <a href={telHref(SITE.phone)}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
            <div className="inline-action inline-action--left">
              <p>Prefer to write it out first?</p>
              <Link className="btn btn--ghost" href="/contact" prefetch={false}>Send Us a Message</Link>
            </div>
          </div>
          <div className="cal-shell"><BookingCalendar /></div>
        </div>
      </Section>
      <CtaBand
        h="Prefer A Written Preview First?"
        mark="Preview First"
        sub="Tell us about your business and we’ll prepare a free homepage concept — no card required."
        btn="Get My Free Preview"
        href="/contact"
        secondary="See Plans & Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
