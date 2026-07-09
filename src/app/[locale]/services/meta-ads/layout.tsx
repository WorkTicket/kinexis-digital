import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("meta-ads");

export default function MetaAdsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
