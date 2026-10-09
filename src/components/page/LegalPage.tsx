import { getTranslations } from "next-intl/server";
import "@/styles/routes/blog.css";
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
      />

      <section
        aria-labelledby="legal-content-heading"
        className="chapter chapter--studio relative"
      >
        <div className="shell relative py-16 md:py-20 lg:py-24">
          <h2 id="legal-content-heading" className="sr-only">
            {c.title} content
          </h2>
          <div className="blog-article__body legal-copy">
            {c.sections.map((section, index) => (
              <Reveal key={section.title} variant="fadeUp" delay={0.04 * index}>
                <section className="legal-section">
                  <h3>{section.title}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
