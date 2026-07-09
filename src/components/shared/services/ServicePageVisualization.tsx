import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type Props = {
  children: ReactNode;
};

export default function ServicePageVisualization({ children }: Props) {
  return (
    <Reveal className="service-section-viz service-overview-viz mx-auto w-full max-w-[360px]">
      <div className="hero__viz-inner hero__viz-inner--service-page hero__viz-inner--overview">
        <div className="hero__viz-content">{children}</div>
      </div>
    </Reveal>
  );
}
