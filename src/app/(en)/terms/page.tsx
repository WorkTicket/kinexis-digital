import { pageMetadata } from "@/lib/seo";
import { PLANS, PLAN_TERMS } from "@/lib/content";
import { PageSchema } from "@/components/JsonLd";
import { PageHero } from "@/components/ui";

export const metadata = pageMetadata("terms");

export default function Page() {
  return (
    <>
      <PageSchema page="terms" />
      <PageHero
        h1="Plans & Billing Terms"
        mark="Billing Terms"
        sub="Last updated November 7, 2026. These are the offer terms for the four Kinexis Digital plans. The agreement you approve at checkout controls if anything differs."
      />
      <section className="section">
        <div className="container container--narrow prose">
          <h2>1. Free homepage preview</h2>
          <p>{PLAN_TERMS[0]} Free homepage previews are delivered within 2 business days of receiving your business details. We will show you a homepage concept for your business. You can approve it, ask for changes, or walk away without paying.</p>

          <h2>2. Monthly plans</h2>
          <p>Website is {PLANS[0].price}/mo. Lead System is {PLANS[1].price}/mo. Plus (Bilingual) is {PLANS[2].price}/mo. All three monthly plans are $0 down and begin on launch day.</p>
          <p>Each monthly plan is <b>month-to-month from launch</b>. There is no long-term contract and no cancellation fee. You may cancel anytime by text, email, or Messenger.</p>
          <p>Your monthly price is <b>locked for 24 months from launch</b>. After 24 months we will give you at least 30 days’ notice before any price change.</p>

          <h2>3. What is included</h2>
          <p>Page counts and included work are listed on the pricing page for each plan. An extra page on Website is $99. Lead System includes one new page a month, and Plus includes two. Unused page allowances do not roll over.</p>
          <p>A small edit is a change that takes 30 minutes or less, handled one at a time. Website includes up to two small edits a month in two business days. Lead System includes unlimited small edits in one business day. Plus includes unlimited small edits by the same business day when requested by noon Central.</p>
          <p>Hosting, SSL, security and backups are included while a monthly plan is active. On Own It, hosting and SSL are included for the first 12 months; optional Site Care is $39/mo after that.</p>

          <h2>4. Texting and carrier approval</h2>
          <p>Missed-call text-back is <b>optional</b> and needs a dedicated business phone line. On <b>Lead System or Plus</b>, a second tracking number is <b>$1/mo</b> if you use one, plus carrier text rates. On <b>Website or Own It</b>, text-back can be added for <b>$97/mo</b>.</p>
          <p>Missed-call text-back and Google review requests are sent by text. <b>Activation is subject to carrier approval.</b> Texting typically begins 10–15 days after approval. Carrier approval is not guaranteed, and messaging rates or carrier requirements may change.</p>

          <h2>5. 60-day lead guarantee</h2>
          <p><b>Lead System and Plus only.</b> If you have zero tracked leads in your first 60 days live, we waive your 3rd and 4th monthly charges. One guarantee per business, and the account must be in good standing.</p>
          <p>A tracked lead is a call of 30+ seconds, a missed caller who replies to the text-back, or a real quote form. Spam, wrong numbers, job applicants, vendors and existing customers do not count. The guarantee does not apply if tracking is unavailable because of a change you make, or if you pause or cancel the plan before day 60.</p>
          <p>Own It does not include a lead guarantee.</p>

          <h2>6. Own It</h2>
          <p>Own It is a one-time {PLANS[3].price} payment, due when you approve your preview. There is no monthly plan. The site files are yours from launch. Hosting and SSL are included for 12 months, the domain is registered for year one, and small edits are included for 12 months up to 30 minutes per month.</p>
          <p>Own It small edits are done within 2 business days, and unused edit time does not roll over. After the first 12 months, hosting and edits are optional through Site Care at $39/mo for hosting and up to 30 minutes of edits a month. Domain renewals after year one are at cost. New pages are quoted in writing before work starts. Missed-call text-back can be added to Own It for $97/mo (see section 4).</p>

          <h2>7. Cancellation and access</h2>
          <p>Cancel a monthly plan anytime by text, email, or Messenger. There is no cancellation fee. Billing stops at the end of the period you have already paid for, and your site stays live through that period.</p>
          <p>Because the site is hosted and managed by Kinexis on monthly plans, when the paid period ends, hosting and management stop and the site comes offline unless you keep it another way.</p>
          <p><b>Buyout:</b> a written one-time <b>$1,497</b> purchase of the site files so you can move them to hosting you control. Ask us for buyout terms in writing before you cancel if that is the path you want.</p>
          <p><b>Move to Own It:</b> switch from a monthly plan to the Own It one-time purchase before your paid period ends. Own It terms (files, included hosting, and Site Care) are in section 6.</p>
          <p>If you do not arrange a buyout or move to Own It before the paid period ends, the site comes offline when hosting and management stop.</p>

          <h2>8. Taxes and third-party costs</h2>
          <p>Prices are in U.S. dollars and exclude applicable taxes. Domain renewals, paid stock images, paid advertising and other third-party services are not included unless we list them in writing.</p>

          <h2>9. Questions</h2>
          <p>Text or call <a href="tel:+13075003371">(307) 500-3371</a> or email <a href="mailto:hello@kinexisdigital.com">hello@kinexisdigital.com</a>. We will answer plan questions before you pay.</p>

          <h2>10. Refund requests during the first 30 days</h2>
          <p>If you are not satisfied with your website within 30 days of launch, we will refund your most recent payment in full. The guarantee applies to monthly plans and Own It. Requests must be made in writing by text, email or Messenger within 30 days of launch. Refunds do not apply to third-party costs (including domain renewals, paid stock images, paid advertising or other third-party services) that we have already paid on your behalf.</p>
        </div>
      </section>
    </>
  );
}
