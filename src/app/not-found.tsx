import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <PageHero h1="Page Not Found" sub="That page doesn’t exist or has moved." />
      <section className="section"><div className="container center"><Link className="btn btn--primary btn--lg" href="/" prefetch={false}>Back to Home</Link></div></section>
    </>
  );
}
