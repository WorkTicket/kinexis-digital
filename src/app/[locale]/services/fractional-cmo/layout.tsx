import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("fractional-cmo");

export default function FractionalCmoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
