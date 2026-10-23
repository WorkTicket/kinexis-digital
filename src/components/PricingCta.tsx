import Link from "next/link";
import { PLANS } from "@/lib/content";
import { HL } from "./ui";

/** Portfolio price band. The amount stays tied to the Website plan. */
export default function PricingCta() {
  return (
    <section className="price price--portfolio">
      <div className="container center">
        <p className="eyebrow">Spend less, get more</p>
        <h2><HL text="Websites Starting at Only" mark="Starting at Only" /></h2>
        <p className="price__num">{PLANS[0].price}<small>/mo</small></p>
        <p>Everything you need to look professional, get found and turn visitors into leads.</p>
        <Link className="btn btn--primary btn--lg" href="/pricing" prefetch={false}>Start Getting More Leads</Link>
      </div>
    </section>
  );
}
