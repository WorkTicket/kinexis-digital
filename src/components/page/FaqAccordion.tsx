"use client";

import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useId, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { FaqItem } from "@/content/about";
import { duration } from "@/lib/motion";
import { cn } from "@/lib/cn";

type FaqAccordionProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: ReactNode;
  className?: string;
};

export function FaqAccordion({
  items,
  eyebrow = "FAQ",
  title = "Questions we get a lot.",
  className,
}: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);

  return (
    <section
      aria-labelledby={`${baseId}-heading`}
      className={cn("faq-section chapter chapter--void relative", className)}
    >
      <div className="shell chapter-shell--tight relative">
        <div className="faq-layout">
          <Reveal variant="rise" when="chapter" className="faq-lead">
            <header>
              <p className="section-eyebrow">{eyebrow}</p>
              <h2
                id={`${baseId}-heading`}
                className="faq-lead__heading"
              >
                {title}
              </h2>
            </header>
          </Reveal>

          <RevealGroup
            as="ul"
            className="faq-index"
            stagger={duration.staggerTight}
            delayChildren={0.06}
            aria-label="Frequently asked questions"
          >
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const triggerId = `${baseId}-trigger-${index}`;

              return (
                <RevealItem
                  key={item.question}
                  as="li"
                  variant="fadeUp"
                  className={isOpen ? "faq-acc faq-acc--open" : "faq-acc"}
                >
                  <button
                    type="button"
                    id={triggerId}
                    className="faq-acc__trigger group"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="faq-acc__title">{item.question}</span>
                    <span className="faq-acc__chevron icon-well" aria-hidden>
                      <Plus strokeWidth={1.75} />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="faq-acc__panel"
                    aria-hidden={!isOpen}
                    {...(!isOpen ? { inert: true } : {})}
                  >
                    <div className="faq-acc__panel-inner">
                      <p className="faq-acc__answer">{item.answer}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
