import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("marketing-automation-crm");

export default function MarketingAutomationCrmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
