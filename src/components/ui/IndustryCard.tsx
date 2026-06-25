"use client";

import { Link } from "@/i18n/navigation";
import { m as motion } from "@/lib/framer";
import TextLink from "@/components/ui/TextLink";

type Props = {
  href: string;
  label: string;
  description: string;
  index?: number;
};

export default function IndustryCard({ href, label, description, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={href}
        className="group block service-card h-full hover:border-neon-cyan/30 flex flex-col"
      >
        <h3 className="card-heading group-hover:text-neon-cyan transition-colors">{label}</h3>
        <p className="service-card__body flex-1">{description}</p>
        <span className="mt-4 block opacity-0 group-hover:opacity-100 transition-opacity">
          <TextLink size="sm">Explore</TextLink>
        </span>
      </Link>
    </motion.div>
  );
}
