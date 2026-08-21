import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { exploreIcons } from "@/components/home/explore-icons";
import { ChapterLead } from "@/components/ui/ChapterLead";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  getHomeExploreLanes,
  getHomeExploreLinks,
  type HomeExploreLane,
} from "@/content/home-links";
import { duration } from "@/lib/motion";

const laneOrder: HomeExploreLane[] = ["markets", "program"];

export async function HomeExplore() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const lanes = getHomeExploreLanes(locale);
  const links = getHomeExploreLinks(locale);

  return (
    <section
      id="explore"
      aria-labelledby="home-explore-heading"
      className="explore-section chapter chapter--studio relative"
    >
      <div className="shell chapter-shell--tight relative">
        <Reveal variant="rise" when="chapter" className="explore-mast">
          <ChapterLead
            layout="rail"
            eyebrow={t("exploreEyebrow")}
            headingId="home-explore-heading"
            title={t("exploreTitle")}
            headingClassName="max-w-[12ch]"
            dek={t("exploreDek")}
          />
        </Reveal>

        <div className="explore-folio" aria-label={t("exploreAria")}>
          {laneOrder.map((lane) => {
            const meta = lanes[lane];
            const laneLinks = links.filter((link) => link.lane === lane);

            return (
              <div key={lane} className="explore-chapter">
                <Reveal
                  variant="fadeUp"
                  when="chapter"
                  className="explore-chapter__head"
                >
                  <p className="section-eyebrow">{meta.label}</p>
                  <p className="explore-chapter__hint">{meta.hint}</p>
                </Reveal>

                <RevealGroup
                  as="ul"
                  className="explore-paths"
                  stagger={duration.staggerTight}
                  delayChildren={0.06}
                >
                  {laneLinks.map((link) => {
                    const Icon = exploreIcons[link.icon];
                    return (
                      <RevealItem key={link.href} as="li" variant="fadeUp">
                        <Link href={link.href} className="explore-path group">
                          <span className="explore-path__icon" aria-hidden>
                            <Icon strokeWidth={1.5} />
                          </span>
                          <span className="explore-path__body">
                            <span className="explore-path__label">
                              {link.label}
                            </span>
                            <span className="explore-path__dek">{link.dek}</span>
                          </span>
                          <span className="explore-path__arrow" aria-hidden>
                            →
                          </span>
                        </Link>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
