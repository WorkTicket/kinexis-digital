import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("analytics");

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
