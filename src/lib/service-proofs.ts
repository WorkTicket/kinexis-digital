/** Verified outcomes mapped to service pages — sourced from case-studies content */
export type ServiceProof = {
  result: string;
  client: string;
  href: string;
};

export const SERVICE_PROOFS: Record<string, ServiceProof> = {
  "paid-ads": {
    result: "3.8× Revenue",
    client: "Premium Ecommerce Brand",
    href: "/case-studies/premium-ecommerce-brand",
  },
  ppc: {
    result: "3.8× Revenue",
    client: "Premium Ecommerce Brand",
    href: "/case-studies/premium-ecommerce-brand",
  },
  "web-design": {
    result: "5× Revenue Growth",
    client: "Landscaping Company",
    href: "/case-studies/landscaping-company-growth",
  },
};

export function getServiceProof(slug: string): ServiceProof | undefined {
  return SERVICE_PROOFS[slug];
}
