import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { getDeliverableIcon } from "@/lib/deliverable-icons";
import { cn } from "@/lib/utils";
import Section from "@/components/shared/services/Section";

type DeliverablesSectionProps = {
  title: string;
  subtitle: string;
  items: { title: string; description: string }[];
  surfaceIndex?: number;
};

function DeliverableIcon({ title, active }: { title: string; active: boolean }) {
  const Icon = getDeliverableIcon(title);

  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500",
        active
          ? "border-neon-cyan/30 bg-neon-cyan/10 shadow-glow-sm"
          : "border-strong bg-surface-glass group-hover:border-neon-cyan/20 group-hover:bg-neon-cyan/[0.06]"
      )}
      aria-hidden
    >
      <Icon className={cn("h-5 w-5", active ? "text-neon-cyan" : "text-white/45 group-hover:text-neon-cyan/80")} />
    </div>
  );
}

export default function DeliverablesSection({ title, subtitle, items, surfaceIndex = 0 }: DeliverablesSectionProps) {
  return (
    <Section id="deliverables" surfaceIndex={surfaceIndex}>
      <div className="container-site">
        <div className="grid items-start gap-grid-lg lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="lg:sticky lg:top-28">
            <SectionHeader title={title} description={subtitle} className="max-w-none" headingId="deliverables-heading" />
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-[1.375rem] top-3 bottom-3 hidden w-px bg-gradient-to-b from-neon-cyan/30 via-white/[0.08] to-transparent sm:block"
              aria-hidden
            />

            <Reveal stagger className="space-y-0">
              {items.map((item, i) => (
                <div
                  key={item.title}
                  className="group relative flex gap-5 border-b border-surface py-8 last:border-0 sm:gap-6 sm:pl-12"
                >
                  <div className="hidden shrink-0 sm:absolute sm:left-0 sm:top-8">
                    <DeliverableIcon title={item.title} active={i === 0} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-4">
                      <span className="sm:hidden">
                        <DeliverableIcon title={item.title} active={i === 0} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold leading-snug md:text-xl">{item.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted md:text-[0.9375rem]">
                          {item.description}
                        </p>
                        {i < items.length - 1 && (
                          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-neon-cyan/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Next: {items[i + 1]?.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
