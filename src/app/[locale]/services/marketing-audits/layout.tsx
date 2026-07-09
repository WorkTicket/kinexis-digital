import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("marketing-audits");

export default function MarketingAuditsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
