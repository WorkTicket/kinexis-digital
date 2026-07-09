import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/shared/services/Section";

export type FAQItem = { question: string; answer: string };

type FAQSectionProps = {
  label?: string;
  title?: string;
  items: FAQItem[];
  surfaceIndex?: number;
};

export default function FAQSection({
  label = "Common Questions",
  title = "FAQ",
  items,
  surfaceIndex = 0,
}: FAQSectionProps) {
  return (
    <Section id="faq" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <SectionHeader badge={label} title={title} headingId="faq-heading" />
        <Reveal stagger className="section-content max-w-2xl mx-auto space-y-3">
          {items.map((item) => (
            <div key={item.question}>
              <details className="group border-b border-surface">
                <summary className="faq-summary">
                  <span>{item.question}</span>
                  <span className="faq-chevron" aria-hidden="true">&gt;</span>
                </summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
