import type { Metadata } from "next";
import { FaqAccordion } from "@/components/page/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { getPlanContent } from "@/content/pay-plans";
import { getContractorHome } from "@/content/contractor-home";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { Link } from "@/i18n/navigation";
import "@/styles/routes/contractor-home.css";
type Props = { params: LocaleParams };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const c = getContractorHome(locale);
  return buildPageMetadata({ locale, path: "/", absolute: true, title: c.metaTitle, description: c.copy });
}
export default async function Home({ params }: Props) {
  const locale = await resolveLocale(params);
  const c = getContractorHome(locale);
  const plans = getPlanContent(locale);
  return <main className="contractor-home flex flex-1 flex-col">
    <JsonLd data={faqSchema(c.faq)} />
    <section className="contractor-home__hero" aria-labelledby="home-heading"><div className="shell py-20 md:py-28">
      <p className="section-eyebrow">{c.eyebrow}</p>
      <h1 id="home-heading" className="mt-6">{c.title}</h1>
      <p className="mt-8 max-w-2xl text-xl md:text-2xl">{c.copy}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="https://m.me/1342631805590605" size="lg">{c.message}</Button>
        <Button href="/pay" variant="secondary" size="lg">{c.seePlans}</Button>
      </div>
    </div></section>
    <section className="chapter chapter--studio" aria-labelledby="home-plans"><div className="shell py-16 md:py-24">
      <h2 id="home-plans" className="type-section mb-8">{c.plans}</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{plans.names.map((name, index) => <article key={name} className={`rounded-2xl border border-current/20 p-6 ${index === 1 ? "contractor-home__popular" : ""}`}>
        {index === 1 && <p className="section-eyebrow">{plans.popular}</p>}
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="my-4 text-3xl font-semibold">{["$97", "$197", "$297", "$1,497"][index]} <span className="text-base">{index === 3 ? plans.once : plans.monthly}</span></p>
        <p>{plans.descriptions[index]}</p>
        <ul className="my-6 space-y-2">{plans.features[index].map(feature => <li key={feature}>{feature}</li>)}</ul>
        <Button href="/pay" variant="secondary">{c.seePlans}</Button>
      </article>)}</div>
      <p className="mt-8">{plans.monthlyTerms}</p><p className="mt-3">{plans.ownTerms}</p>
    </div></section>
    <section className="chapter" aria-labelledby="home-process"><div className="shell py-16 md:py-24">
      <h2 id="home-process" className="type-section mb-8">{c.how}</h2>
      <ol className="grid gap-8 md:grid-cols-3">{c.steps.map((step, index) => <li key={step}><span className="section-eyebrow">0{index + 1}</span><h3 className="mt-3 text-xl">{step}</h3></li>)}</ol>
    </div></section>
    <section className="chapter chapter--studio" aria-labelledby="home-guarantee"><div className="shell py-16 md:py-24">
      <h2 id="home-guarantee" className="type-section mb-6">{plans.guarantee}</h2>
      <p className="max-w-3xl text-xl">{plans.faq[1][1]}</p>
      <p className="mt-4 max-w-3xl">{c.conditions} <Link href="/terms">{plans.terms} §10.2</Link></p>
      <div className="mt-8"><Button href="https://m.me/1342631805590605">{c.message}</Button></div>
    </div></section>
    <FaqAccordion items={c.faq} title={c.faqTitle} />
  </main>;
}
