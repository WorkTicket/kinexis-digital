"use client";

import { m as motion } from "@/lib/framer";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimatedWrapper({ children, className, delay = 0 }: Props) {
  const { fadeUp } = useMotionVariants();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
