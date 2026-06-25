import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("email-marketing");

export default function EmailMarketingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
