"use client";

import type { ReactNode } from "react";
import { m as motion } from "@/lib/framer";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = {
  children: ReactNode;
};

export default function ServicePageVisualization({ children }: Props) {
  const { fadeUp } = useMotionVariants();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="service-section-viz service-overview-viz mx-auto w-full max-w-[360px] lg:mx-0 lg:justify-self-end"
    >
      <div className="hero__viz-inner hero__viz-inner--service-page hero__viz-inner--overview">
        <div className="hero__viz-content">{children}</div>
      </div>
    </motion.div>
  );
}
