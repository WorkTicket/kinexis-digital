import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("ppc-management");

export default function PpcManagementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
