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
    <div
      className={cn(
        "service-section-intro grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:gap-12 xl:gap-16",
        className,
      )}
    >
      {header}
      <ServicePageVisualization>{visualization}</ServicePageVisualization>
    </div>
  );
}
