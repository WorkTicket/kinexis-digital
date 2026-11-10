import dynamic from "next/dynamic";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE, telHref } from "@/lib/site";
import { PageSchema } from "@/components/JsonLd";
import { HL, PageHero } from "@/components/ui";

const BookingCalendar = dynamic(() => import("@/components/BookingCalendar"));

export const metadata = pageMetadata("strategy-call");

export default function Page() {
  return (
    <>
      <PageSchema page="strategy-call" />
      <PageHero previewBar={false} h1="Talk Through Your Website Plans" mark="Website Plans" sub="Use a short call to show us your current site, explain the business, and see which plan fits." />
      <section className="section"><div className="container two-col two-col--book">
        <div>
          <h2><HL text="What We’ll Cover" mark="We’ll Cover" /></h2>
          <ul className="ticks ticks--expect">
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>How customers currently find you and get in touch</span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>Which services you want the website to support</span></li>
            <li><span className="tick__mark" aria-hidden="true">✓</span><span>Which plan makes sense, including when none of them is a good fit</span></li>
          </ul>
          <p>Choose a time on the calendar and we’ll confirm it by email. You can also call <a href={telHref(SITE.phone)}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          <div className="inline-action inline-action--left">
            <p>Prefer to write it out first?</p>
            <Link className="btn btn--ghost" href="/contact" prefetch={false}>Send Us a Message</Link>
          </div>
        </div>
        <div className="rounded-[22px] border-2 border-[var(--brand-navy)] p-4 shadow-[8px_8px_0_var(--brand-navy)]"><BookingCalendar /></div>
      </div></section>
    </>
  );
}
