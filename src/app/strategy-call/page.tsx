import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE, telHref } from "@/lib/site";
import BookingCalendar from "@/components/BookingCalendar";
import { PageSchema } from "@/components/JsonLd";
import IndustryAudit from "@/components/IndustryAudit";
import { HL, PageHero } from "@/components/ui";

export const metadata = pageMetadata("strategy-call");

export default function Page() {
  return (
    <>
      <PageSchema page="strategy-call" />
      <PageHero h1="Schedule A Strategy Call" mark="Strategy Call" sub="A short call to look at your business, your current site, and which plan fits." />
      <section className="section"><div className="container two-col two-col--book">
        <div>
          <h2><HL text="What to Expect" mark="Expect" /></h2>
          <ul className="ticks ticks--expect">
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>We look at how customers find and contact you now</span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>We talk through the work you want the site to bring in</span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>You get a clear recommendation, including if a plan is a poor fit</span></li>
          </ul>
          <p>Pick a time on the calendar. We’ll confirm it by email. You can also call <a href={telHref(SITE.phone)}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          <p className="muted"><strong>Prefer to write it out first?</strong> <Link className="btn btn--primary" href="/contact" prefetch={false}>Send us a message</Link>.</p>
        </div>
        <div className="rounded-[22px] border-2 border-[var(--brand-navy)] p-4 shadow-[8px_8px_0_var(--brand-navy)]"><BookingCalendar /></div>
      </div></section>
      <IndustryAudit />
    </>
  );
}
