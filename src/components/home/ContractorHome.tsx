import { ArrowDown, ArrowRight, ArrowUpRight, Check, CheckCheck, ChevronDown, Globe2, Hammer, House, Leaf, LockKeyhole, MessageCircle, MessageSquareText, MonitorSmartphone, PhoneCall, PlugZap, Rocket, ShieldCheck, Snowflake, Sprout, Wrench } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getContractorHome } from "@/content/contractor-home";
import { getContractorDesign } from "@/content/contractor-design";
import { getPlanContent } from "@/content/pay-plans";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { ContractorPreview } from "./ContractorPreview";
import { ContractorContactBar } from "./ContractorContactBar";
import { OfferAssuranceStrip } from "./OfferAssuranceStrip";
import "@/styles/routes/contractor-home.css";

const featureIcons = [MonitorSmartphone, MessageSquareText, Globe2, PhoneCall, Sprout];
const processIcons = [MessageCircle, MonitorSmartphone, Rocket];
const tradeIcons = [Wrench, Snowflake, House, PlugZap, Leaf, Hammer];
const tradeLinks = ["/industries/plumbing", "/industries/hvac", "/industries/roofing", "/contact", "/industries/landscaping", "/contact"];
const prices = ["$97", "$197", "$297", "$1,497"];
const messenger = "https://m.me/1342631805590605";

export function ContractorHome({ locale }: { locale: Locale }) {
  const c = getContractorHome(locale);
  const d = getContractorDesign(locale);
  const p = getPlanContent(locale);
  return <main className="home-offer">
    <JsonLd data={faqSchema(c.faq)} />
    <section className="home-offer__hero" aria-labelledby="home-heading">
      <div className="offer-shell offer-hero-grid">
        <div className="offer-hero-copy">
          <p className="offer-eyebrow offer-eyebrow--light"><span aria-hidden />{c.eyebrow}</p>
          <h1 id="home-heading">{d.headline}{" "}<span>{d.priceLine}</span></h1>
          <p className="offer-hero-lede">{c.copy}</p>
          <div id="offer-hero-actions" className="offer-actions"><Button href={messenger} size="lg" arrow className="offer-primary">{c.message}</Button><Button href="/pay" variant="outline" size="lg">{c.seePlans}</Button></div>
          <p className="offer-hero-note"><CheckCheck size={17} aria-hidden />{d.heroNote}</p>
          <p className="offer-hero-terms">{d.heroTerms}</p>
        </div>
        <ContractorPreview content={d.preview} />
      </div>
      <a href="#home-services" className="offer-hero-scroll" aria-label={d.services.eyebrow}><ArrowDown size={18} aria-hidden /></a>
    </section>

    <OfferAssuranceStrip locale={locale} />

    <section id="home-services" className="offer-section offer-services" aria-labelledby="home-services-heading"><div className="offer-shell offer-services-grid">
      <div className="offer-section-intro"><p className="offer-eyebrow">{d.services.eyebrow}</p><h2 id="home-services-heading">{d.services.title}</h2><p>{d.services.copy}</p><Link href="#home-plans" className="offer-text-link">{c.seePlans}<ArrowRight size={17} aria-hidden /></Link></div>
      <div className="offer-feature-list">{d.services.items.map((feature, index) => { const Icon = featureIcons[index]; return <article className="offer-feature" key={feature.title}><span className="offer-feature__icon"><Icon size={24} strokeWidth={1.5} aria-hidden /></span><div><h3>{feature.title}</h3><p>{feature.copy}</p></div></article>; })}<p className="offer-feature-note">{d.services.note}</p></div>
    </div></section>

    <section id="home-plans" className="offer-section offer-pricing" aria-labelledby="home-plans-heading"><div className="offer-shell">
      <div className="offer-section-heading"><p className="offer-eyebrow">{d.pricing.eyebrow}</p><h2 id="home-plans-heading">{d.pricing.title}</h2><p>{d.pricing.copy}</p></div>
      <div className="offer-plan-grid">{p.names.map((name, index) => <article key={name} className={`offer-plan${index === 1 ? " offer-plan--featured" : ""}`}>
        {index === 1 && <p className="offer-plan__popular">{p.popular.replace(/^★\s*/, "")}</p>}
        <div className="offer-plan__heading"><h3>{name}</h3><p>{p.descriptions[index]}</p></div>
        <p className="offer-plan__price">{prices[index]}<span>{index === 3 ? p.once : p.monthly}</span></p>
        <p className="offer-plan__timing">{index === 3 ? d.pricing.oneTime : d.pricing.monthly}</p>
        <Button href="/pay" variant={index === 1 ? "primary" : "outline"} fullWidth arrow className={index === 1 ? "offer-primary" : undefined}>{c.seePlans}</Button>
        <ul className="offer-plan__features">{p.features[index].slice(0, 4).map(feature => <li key={feature}><Check size={16} strokeWidth={2} aria-hidden /><span>{feature}</span></li>)}</ul>
        <details className="offer-plan__details"><summary>{d.pricing.fullFeatures}<ChevronDown size={15} aria-hidden /></summary><ul>{p.features[index].slice(4).map(feature => <li key={feature}><Check size={15} aria-hidden /><span>{feature}</span></li>)}</ul></details>
        <p className="offer-plan__minimum">{index === 3 ? p.features[3][6] : d.pricing.minimum}</p>
      </article>)}</div>
      <div className="offer-plan-reassurance"><p><LockKeyhole size={17} aria-hidden />{d.pricing.lock}</p><p><Globe2 size={17} aria-hidden />{d.pricing.domain}</p></div>
      <div className="offer-plan-legal"><p>{p.monthlyTerms}</p><p>{p.ownTerms}</p><Link href="/pay">{d.pricing.compare}<ArrowUpRight size={15} aria-hidden /></Link></div>
    </div></section>

    <section className="offer-section offer-process" aria-labelledby="home-process-heading"><div className="offer-shell"><div className="offer-section-heading"><p className="offer-eyebrow">{d.process.eyebrow}</p><h2 id="home-process-heading">{d.process.title}</h2><p>{d.process.copy}</p></div><ol className="offer-process-list">{c.steps.map((step, index) => { const Icon = processIcons[index]; return <li key={step}><span className="offer-process__icon"><Icon size={26} strokeWidth={1.5} aria-hidden /></span><h3>{d.process.labels[index]}</h3><p>{step}</p></li>; })}</ol></div></section>

    <section className="offer-guarantee" aria-labelledby="home-guarantee-heading"><div className="offer-shell offer-guarantee-grid"><div className="offer-guarantee__symbol" aria-hidden><ShieldCheck size={84} strokeWidth={1.1} /></div><div><p className="offer-eyebrow offer-eyebrow--light">{d.guarantee.eyebrow}</p><h2 id="home-guarantee-heading">{p.guarantee}</h2><p className="offer-guarantee__promise">{p.faq[1][1]}</p><p className="offer-guarantee__conditions">{c.conditions}</p><Link href="/terms" className="offer-text-link">{d.guarantee.link}<ArrowUpRight size={17} aria-hidden /></Link></div></div></section>

    <section className="offer-section offer-trades" aria-labelledby="home-trades-heading"><div className="offer-shell"><div className="offer-section-heading"><p className="offer-eyebrow">{d.trades.eyebrow}</p><h2 id="home-trades-heading">{d.trades.title}</h2><p>{d.trades.copy}</p></div><ul className="offer-trade-list">{d.trades.items.map((trade, index) => { const Icon = tradeIcons[index]; return <li key={trade}><Link href={tradeLinks[index]}><Icon size={30} strokeWidth={1.4} aria-hidden /><span>{trade}</span><ArrowUpRight size={15} aria-hidden /></Link></li>; })}</ul></div></section>

    <FaqAccordion items={c.faq} title={c.faqTitle} className="offer-faq" />
    <section className="offer-closing" aria-labelledby="home-closing-heading"><div className="offer-shell"><p className="offer-eyebrow offer-eyebrow--light">{d.closing.eyebrow}</p><h2 id="home-closing-heading">{d.closing.title}</h2><p>{d.closing.copy}</p><div className="offer-actions"><Button href={messenger} size="lg" arrow className="offer-primary">{c.message}</Button><Button href="/pay" variant="outline" size="lg">{c.seePlans}</Button></div></div></section>
    <ContractorContactBar message={c.message} call={d.call} />
  </main>;
}
