import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";
import { PageHero } from "@/components/ui";
import { contentMetadata } from "@/lib/seo";

export const metadata = contentMetadata({
  path: "/404",
  title: "Page Not Found",
  description: "The page you requested is not available. Return to Kinexis Digital to explore web design, SEO, website management, and contact options.",
  index: false,
});

export default function NotFound() {
  return (
    <SiteChrome locale="en">
      <PageHero h1="Page Not Found" sub="That page doesn’t exist or has moved." />
      <section className="section"><div className="container center"><Link className="btn btn--primary btn--lg" href="/" prefetch={false}>Back to Home</Link> <Link className="btn btn--ghost btn--lg" href="/contact" prefetch={false}>Contact Kinexis</Link></div></section>
    </SiteChrome>
  );
}
