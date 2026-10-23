import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero, Section } from "@/components/ui";

export const metadata = pageMetadata("client-login");

export default function Page() {
  return (
    <>
      <PageHero h1="Client Login" mark="Login" sub="Access your client portal or get in touch with our team." />
      <Section narrow>
        <div className="center"><div className="card">
          {SITE.clientPortalUrl ? (
            <>
              <h2 className="card-title">Open Your Client Portal</h2>
              <p className="muted">Billing and project access for active clients.</p>
              <a className="btn btn--primary btn--lg" href={SITE.clientPortalUrl}>Go to Client Portal</a>
            </>
          ) : (
            <>
              <h2 className="card-title">Client Portal</h2>
              <p className="muted">Logins are sent to active clients. If you need access, contact us and we will send the link.</p>
              <Link className="btn btn--primary btn--lg" href="/contact" prefetch={false}>Contact Us</Link>
            </>
          )}
        </div></div>
      </Section>
    </>
  );
}
