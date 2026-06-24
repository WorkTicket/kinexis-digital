import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("cro");

export default function CroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
