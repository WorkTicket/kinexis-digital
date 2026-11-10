import type { Metadata } from "next";
import Link from "next/link";
import Form, { LEAD_FIELDS } from "@/components/Form";
import { ContentSchema } from "@/components/JsonLd";
import { Art, ArtDecor, Faq, HL } from "@/components/ui";
import { contentMetadata } from "@/lib/seo";

export const metadata: Metadata = contentMetadata({
  path: "/lp/get-a-website",
  title: "Get a Professional Website for Your Business",
  description: "Get a fast, professional website built around your business. Review a free homepage preview before choosing a Kinexis plan.",
  index: false,
});

const FAQS = [
  { q: "Do I have to pay before I see anything?", a: "No. We prepare a homepage preview first. You can review it, request changes, and then choose the plan that fits." },
  { q: "Who is this for?", a: "Kinexis builds websites for businesses across the United States, including plumbers, HVAC companies, electricians, roofers, landscapers, and other service businesses." },
  { q: "What plans are available?", a: "The current options are Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, or Own It for $1,497." },
];

export default function GetAWebsitePage() {
  return (
    <div className="lp-page">
      <ContentSchema
        path="/lp/get-a-website"
        title="Get a Professional Website for Your Business"
        description="Get a fast, professional website built around your business. Review a free homepage preview before choosing a Kinexis plan."
        crumbs={[{ name: "Home", path: "/" }, { name: "Get a Website", path: "/lp/get-a-website" }]}
        faqs={FAQS}
      />
      <section className="lp-hero"><ArtDecor name="cobalt-dot-grid" className="lp-hero__dots" /><ArtDecor name="orange-plus" className="lp-hero__plus" /><div className="container lp-hero__grid"><div className="lp-hero__copy"><p className="lp-kicker">Professional web design for businesses</p><h1>Get a website that makes the <span>next step obvious.</span></h1><p className="lp-hero__lead">A fast, professional website built around your business, your services, and the customers you want to reach.</p><div className="lp-hero__actions"><a className="btn btn--primary btn--lg" href="#start">Get My Free Homepage Preview</a><span className="lp-reassurance">No card required to review it</span></div><ul className="lp-proof" aria-label="What is included"><li>Built around your work</li><li>Clear on a phone</li><li>Plans for different stages</li></ul></div><div className="lp-hero__visual" role="img" aria-label="Website preview artwork"><div className="lp-art-card"><div className="lp-art-card__bar"><i /><i /><i /><b>yourbusiness.com</b></div><Art name="web-design" alt="Professional business website preview" priority sizes="(max-width: 860px) 86vw, 540px" /></div><div className="lp-sticker lp-sticker--preview">FREE<br /><strong>PREVIEW</strong></div></div></div></section>

      <section className="lp-form-band" id="start"><div className="container lp-form-grid"><div className="lp-form-copy"><p className="eyebrow">Start with your business</p><h2>Let’s make your first impression work harder.</h2><p>Tell us a little about what you do. We’ll use it to prepare a homepage direction you can actually react to—not a mystery quote or a generic sales pitch.</p><div className="lp-form-note"><span aria-hidden="true">✓</span><p><strong>See the homepage first.</strong><br />Review it before choosing a plan.</p></div></div><div className="lp-form-card"><p className="lp-form-card__title">Get your free homepage preview</p><p className="lp-form-card__sub">A few details is all we need to get started.</p><Form button="Show Me My Homepage" fields={LEAD_FIELDS} note="We’ll only use this to follow up about your website." fast fastText="No card required. We reply fast. 😊" /></div></div></section>

      <section className="section lp-section"><div className="container"><div className="lp-section-heading"><p className="eyebrow">A better starting point</p><h2>Not just a pretty page. A clearer path to contact.</h2><p>Customers should quickly understand what you do, where you work, and how to take the next step.</p></div><div className="lp-benefits"><article><span className="lp-number">01</span><h3>Built around your work</h3><p>Show the services you want more of, with wording tailored to your business and service area.</p></article><article><span className="lp-number">02</span><h3>Easy to use on a phone</h3><p>Keep the important information readable and make it simple for someone to call or ask a question.</p></article><article><span className="lp-number">03</span><h3>Clear from the start</h3><p>Review the homepage before you pay, then choose the website plan that fits your business.</p></article></div></div></section>

      <section className="lp-process-band"><div className="container"><div className="lp-section-heading lp-section-heading--light"><p className="lp-kicker">How it works</p><h2>Simple from preview to launch.</h2></div><ol className="lp-process"><li><b>1</b><h3>Tell us about your business</h3><p>Share the basics and the services you want your website to support.</p></li><li><b>2</b><h3>Review your homepage</h3><p>See the direction before choosing a plan. Request changes while it is still a preview.</p></li><li><b>3</b><h3>Choose what fits</h3><p>Pick Website, Lead System, Plus, or Own It when you are ready.</p></li></ol></div></section>

      <section className="section lp-section lp-plans-section"><div className="container"><div className="lp-section-heading"><p className="eyebrow">Straightforward options</p><h2><HL text="Choose the right level of support" mark="right level" /></h2></div><div className="lp-plans"><Link href="/pricing#website"><b>Website</b><strong>$97<small>/mo</small></strong></Link><Link className="is-featured" href="/pricing#lead-system"><b>Lead System</b><strong>$197<small>/mo</small></strong><span>For a stronger lead path</span></Link><Link href="/pricing#plus"><b>Plus</b><strong>$297<small>/mo</small></strong></Link><Link href="/pricing#own-it"><b>Own It</b><strong>$1,497</strong></Link></div><p className="center lp-plans-foot">Every plan starts with a free homepage preview. <Link className="trust-mark" href="/pricing">Compare all plans →</Link></p></div></section>

      <section className="section lp-faq"><div className="container container--narrow"><div className="lp-section-heading"><p className="eyebrow">Before you start</p><h2>Questions, answered.</h2></div><Faq items={FAQS} /></div></section><section className="lp-final"><div className="container"><h2>Ready to see what your business could look like online?</h2><p>Start with a homepage preview. No card and no obligation.</p><a className="btn btn--primary btn--lg" href="#start">Get My Free Homepage Preview</a></div></section>
    </div>
  );
}
