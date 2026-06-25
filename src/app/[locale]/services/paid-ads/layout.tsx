import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("paid-ads");

export default function PaidAdsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
