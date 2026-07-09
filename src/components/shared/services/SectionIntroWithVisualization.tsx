import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import ServicePageVisualization from "@/components/shared/services/ServicePageVisualization";

type Props = {
  header: ReactNode;
  visualization?: ReactNode;
  className?: string;
};

export default function SectionIntroWithVisualization({ header, visualization, className }: Props) {
  if (!visualization) {
    return <>{header}</>;
  }

  return (
    <div className={cn("service-section-intro", className)}>
      <div className="service-section-intro__copy">{header}</div>
      <ServicePageVisualization>{visualization}</ServicePageVisualization>
    </div>
  );
}
