import { CASE_STUDIES } from "@/content/case-study-crossrefs";

/** Verified outcomes mapped to service pages — sourced from case-studies content */
export type ServiceProof = {
  result: string;
  client: string;
  href: string;
};

export const SERVICE_PROOFS: Record<string, ServiceProof> = {
  seo: {
    result: CASE_STUDIES.landscaping.heroMetric,
    client: CASE_STUDIES.landscaping.clientFull,
    href: CASE_STUDIES.landscaping.href,
  },
  "local-seo": {
    result: CASE_STUDIES.plumbing.heroMetric,
    client: CASE_STUDIES.plumbing.clientFull,
    href: CASE_STUDIES.plumbing.href,
  },
  "google-ads": {
    result: CASE_STUDIES.plumbing.heroMetric,
    client: CASE_STUDIES.plumbing.clientFull,
    href: CASE_STUDIES.plumbing.href,
  },
  "paid-ads": {
    result: CASE_STUDIES.plumbing.heroMetric,
    client: CASE_STUDIES.plumbing.clientFull,
    href: CASE_STUDIES.plumbing.href,
  },
  ppc: {
    result: CASE_STUDIES.plumbing.heroMetric,
    client: CASE_STUDIES.plumbing.clientFull,
    href: CASE_STUDIES.plumbing.href,
  },
  "ppc-management": {
    result: CASE_STUDIES.plumbing.heroMetric,
    client: CASE_STUDIES.plumbing.clientFull,
    href: CASE_STUDIES.plumbing.href,
  },
  "web-design": {
    result: CASE_STUDIES.landscaping.heroMetric,
    client: CASE_STUDIES.landscaping.clientFull,
    href: CASE_STUDIES.landscaping.href,
  },
  cro: {
    result: CASE_STUDIES.saas.heroMetric,
    client: CASE_STUDIES.saas.clientFull,
    href: CASE_STUDIES.saas.href,
  },
  funnels: {
    result: CASE_STUDIES.saas.heroMetric,
    client: CASE_STUDIES.saas.clientFull,
    href: CASE_STUDIES.saas.href,
  },
  "content-marketing": {
    result: CASE_STUDIES.saas.heroMetric,
    client: CASE_STUDIES.saas.clientFull,
    href: CASE_STUDIES.saas.href,
  },
  analytics: {
    result: CASE_STUDIES.saas.heroMetric,
    client: CASE_STUDIES.saas.clientFull,
    href: CASE_STUDIES.saas.href,
  },
};

export function getServiceProof(slug: string): ServiceProof | undefined {
  return SERVICE_PROOFS[slug];
}
