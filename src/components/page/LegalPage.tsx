import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalPageContent } from "@/content/legal/privacy";

type Props = { content: LegalPageContent };

export async function LegalPage({ content: c }: Props) {
  const t = await getTranslations("legal");
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        eyebrow={`${t("lastUpdated")} ${c.lastUpdated}`}
        title={c.title}
        copy={c.intro}
        compact
        hideActions
        atmosphere={false}
      />

      <section
        aria-labelledby="legal-content-heading"
        className="chapter chapter--studio relative"
      >
        <div className="shell relative py-16 md:py-24 lg:py-32">
          <h2 id="legal-content-heading" className="sr-only">
            {c.title} content
          </h2>
          <div className="mx-auto max-w-3xl space-y-10">
            {c.sections.map((section, index) => (
              <Reveal key={section.title} variant="fadeUp" delay={0.04 * index}>
                <div>
                  <h3 className="type-subheader text-foreground">
                    {section.title}
                  </h3>
                  <div className="mt-4 space-y-3 text-[0.975rem] leading-relaxed text-muted md:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
