"use client";

import { m as motion } from "@/lib/framer";
import SectionHeader from "@/components/ui/SectionHeader";
import { getDeliverableIcon } from "@/lib/deliverable-icons";
import { cn } from "@/lib/utils";

type DeliverablesSectionProps = {
  title: string;
  subtitle: string;
  items: { title: string; description: string }[];
};

function DeliverableIcon({ title, active }: { title: string; active: boolean }) {
  const Icon = getDeliverableIcon(title);

  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500",
        active
          ? "border-neon-cyan/30 bg-neon-cyan/10 shadow-glow-sm"
          : "border-white/[0.08] bg-white/[0.04] group-hover:border-neon-cyan/20 group-hover:bg-neon-cyan/[0.06]"
      )}
      aria-hidden
    >
      <Icon className={cn("h-5 w-5", active ? "text-neon-cyan" : "text-white/45 group-hover:text-neon-cyan/80")} />
    </div>
  );
}

export default function DeliverablesSection({ title, subtitle, items }: DeliverablesSectionProps) {
  return (
    <section className="section-padding border-t border-white/[0.06]">
      <div className="container-site">
        <div className="grid items-start gap-grid-lg lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <motion.div
            className="lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeader pattern="C" title={title} subtitle={subtitle} className="max-w-none" />
          </motion.div>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-[1.375rem] top-3 bottom-3 hidden w-px bg-gradient-to-b from-neon-cyan/30 via-white/[0.08] to-transparent sm:block"
              aria-hidden
            />

            <div className="space-y-0">
              {items.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="group relative flex gap-5 border-b border-white/[0.06] py-8 last:border-0 sm:gap-6 sm:pl-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
