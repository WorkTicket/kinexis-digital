"use client";

import { Link } from "@/i18n/navigation";
import { m as motion } from "@/lib/framer";
import { ArrowUpRight } from "lucide-react";

type Props = {
  result: string;
  client: string;
  service?: string;
  href?: string;
  className?: string;
};

export default function CaseStudyProof({
  result,
  client,
  service,
  href,
  className = "",
}: Props) {
  const content = (
    <motion.div
      className={`flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="type-metric shrink-0">
        {result}
      </span>
      <div className="flex items-center gap-3 text-muted">
        <span className="hidden sm:block h-px w-8 bg-white/20" />
        <span className="type-body text-muted">
          for <span className="text-white font-semibold">{client}</span>
          {service && (
            <span className="text-muted/60"> · {service}</span>
          )}
        </span>
        {href && (
          <ArrowUpRight className="h-4 w-4 text-neon-cyan/60 group-hover:text-neon-cyan transition-colors duration-500" />
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="group block border-l-2 border-neon-cyan/30 pl-6 hover:border-neon-cyan/60 transition-colors duration-500">
        {content}
      </Link>
    );
  }

  return <div className="border-l-2 border-neon-cyan/30 pl-6">{content}</div>;
}
