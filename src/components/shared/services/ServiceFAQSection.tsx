"use client";

import FAQSection from "@/components/sections/FAQSection";
import type { FAQItem } from "@/components/sections/FAQSection";

type Props = {
  items: FAQItem[];
  surfaceIndex: number;
};

export default function ServiceFAQSection({ items, surfaceIndex }: Props) {
  return (
    <section id="faq">
      <FAQSection items={items} surfaceIndex={surfaceIndex} />
    </section>
  );
}
