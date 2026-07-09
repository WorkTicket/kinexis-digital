import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("microsoft-ads");

export default function MicrosoftAdsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
