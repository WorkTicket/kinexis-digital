import PhaseDot from "@/components/ui/PhaseDot";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/shared/services/Section";

const steps = [
  {
    title: "Audit",
    description:
      "We dig into your traffic, conversions, tech setup, and what your competitors are doing. No decisions without data.",
    metric: "Full audit delivered in week 1",
  },
  {
    title: "Strategy",
    description:
      "A custom roadmap based on your goals and market reality. Every recommendation connects to revenue, not vanity metrics.",
    metric: "Clear KPIs at every milestone",
  },
  {
    title: "Execution",
    description:
      "Our team builds, optimizes, and launches across channels at the same time. Each channel supports the others.",
    metric: "Multi-channel coordination",
  },
  {
    title: "Scale",
    description:
      "Once we prove what works, we double down. Resources go to channels delivering real ROI. Underperformers get cut.",
    metric: "Weekly optimization and reporting",
  },
];

export default function TrustedProcess() {
  return (
    <Section id="trusted-process" surfaceIndex={0} className="relative overflow-hidden">
      <div className="container-site relative z-10">
        <div className="grid gap-grid-lg lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Editorial left column */}
          <SectionHeader
            align="left"
            badge="How We Deliver"
            title="A system, not a guess."
            description="No magic tricks. No hand-waving. A repeatable framework that takes your business from where it is to where you want it to be."
            viewportMargin="-60px"
            headingId="trusted-process-heading"
          />

          {/* Vertical timeline — no icons */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-surface-hover hidden sm:block" />

            <Reveal stagger className="space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="relative flex gap-8 sm:gap-10 py-8 border-b border-subtle last:border-0"
                >
                  <div className="hidden sm:flex w-8 shrink-0 items-start justify-center pt-1">
                    <PhaseDot letter={step.title[0]} active={i === 0} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="sm:hidden">
                        <PhaseDot letter={step.title[0]} active={i === 0} />
                      </span>
                      <h3 className="card-heading">{step.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-neon-cyan/70">
                      {step.metric}
                    </p>
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
