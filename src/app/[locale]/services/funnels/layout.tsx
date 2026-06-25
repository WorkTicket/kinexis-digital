import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("funnels");

export default function FunnelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
