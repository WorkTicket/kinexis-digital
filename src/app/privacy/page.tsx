import { pageMetadata } from "@/lib/seo";
import { SITE, telHref } from "@/lib/site";
import { PageSchema } from "@/components/JsonLd";
import { PageHero, fallbackTrack } from "@/components/ui";

export const metadata = pageMetadata("privacy");

export default function Page() {
  return (
    <>
      <PageSchema page="privacy" />
      <PageHero
        h1="Privacy Policy"
        mark="Privacy"
        sub="Last updated October 21, 2026. This explains what this website collects and how Kinexis Digital uses it."
      />
      <section className="section">
        <div className="container container--narrow prose">
          <h2>What we collect</h2>
          <p>If you send a form, we collect the details you type: your name, email, phone, business or website name, the page you want changed, your message, and any file you attach. If you call or email us, we keep that correspondence so we can reply and do the work.</p>
          <p {...fallbackTrack("-0.02em")}>The site is hosted on Cloudflare. Server logs may include your IP address, browser, and the pages you request. If analytics is enabled, it may record pages visited, a general location, and device type. You can block analytics in your browser.</p>

          <h2>How we use it</h2>
          <p>We use this information to answer you, prepare a homepage preview, provide the plan you buy, and send messages about that work. We do not sell personal information.</p>

          <h2>Who we share it with</h2>
          <p>Hosting, email, and form delivery providers process messages so they reach us. We share information when the law requires it. We do not sell or rent contact lists.</p>

          <h2>How long we keep it</h2>
          <p>We keep inquiry details long enough to respond and to keep a record of work you asked us to do. You can email {SITE.email} and ask us to delete an inquiry that is not part of an active plan.</p>

          <h2>Contact</h2>
          <p>Questions about this policy: email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={telHref(SITE.phone)}>{SITE.phone}</a>.</p>
        </div>
      </section>
    </>
  );
}
