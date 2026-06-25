import { createServiceLayoutMetadata } from "@/lib/service-metadata";

export const generateMetadata = createServiceLayoutMetadata("growth-consulting");

export default function GrowthConsultingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
