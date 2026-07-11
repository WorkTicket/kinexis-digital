"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import Section from "@/components/shared/services/Section";

type RelatedLinksProps = {
  agencyHub?: boolean;
  serviceLinks?: { href: string; label: string }[];
  pricingLinks?: { href: string; label: string }[];
  industryLinks?: { href: string; label: string }[];
  solutionLinks?: { href: string; label: string }[];
  caseStudyLinks?: { href: string; label: string }[];
  blogLinks?: { href: string; label: string }[];
  surfaceIndex?: number;
};

export default function RelatedLinks({
  agencyHub,
  serviceLinks,
  pricingLinks,
  industryLinks,
  solutionLinks,
  caseStudyLinks,
  blogLinks,
  surfaceIndex = 0,
}: RelatedLinksProps) {
  const groups = [
    agencyHub && {
      title: "Agency Hub",
      links: [{ href: "/digital-marketing-agency", label: "Full-Service Digital Marketing Agency" }],
    },
    serviceLinks?.length && { title: "Services", links: serviceLinks },
    pricingLinks?.length && { title: "Pricing", links: pricingLinks },
    industryLinks?.length && { title: "Industries", links: industryLinks },
    solutionLinks?.length && { title: "Solutions", links: solutionLinks },
    caseStudyLinks?.length && { title: "Case Studies", links: caseStudyLinks },
    blogLinks?.length && { title: "Resources", links: blogLinks },
  ].filter(Boolean) as { title: string; links: { href: string; label: string }[] }[];

  if (groups.length === 0) return null;

  return (
    <Section id="related-links" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-neon-cyan mb-8">Explore Further</h2>
        <div className="grid gap-grid-lg md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-bold mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-white transition-colors inline-flex items-center gap-1 group">
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
