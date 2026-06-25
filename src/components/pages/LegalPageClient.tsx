"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import type { LegalPageContent } from "@/content/legal/privacy";

type Props = { content: LegalPageContent };

export default function LegalPageClient({ content: c }: Props) {
  return (
    <article>
      <HeroArchetype
        archetype="article"
        label={c.lastUpdated}
        headline={c.title}
        subtitle={c.intro}
      />

      <section className="section-padding bg-bg-dark">
        <div className="container-site max-w-3xl">
          <div className="space-y-10">
            {c.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
                <div className="mt-3 h-px w-10 bg-neon-cyan/30" />
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {section.list ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
