import { describe, expect, it } from "vitest";
import { getBlogArticle } from "./blog-articles";
import { getBlogContent } from "./blog";
import { getHomeServices } from "./home-services";

describe("Spain locale pricing", () => {
  it("uses euros in the Spain Spanish SEO pricing guide", () => {
    const spain = getBlogArticle("seo-pricing-guide", "es-ES");
    const latam = getBlogArticle("seo-pricing-guide", "es-419");

    expect(spain?.body).toContain("entre 500 y 30.000 € al mes");
    expect(spain?.body).not.toContain("dólares");
    expect(spain?.body).not.toMatch(/\$\d/);
    expect(latam?.body).toContain("dólares");
  });

  it("uses euros in Spain blog listing excerpts", () => {
    const excerpt = getBlogContent("es-ES").posts.find(
      (post) => post.slug === "seo-pricing-guide",
    )?.excerpt;
    expect(excerpt).toContain("500 €");
    expect(excerpt).toContain("30.000 €");
    expect(excerpt).not.toContain("$");
  });

  it("keeps euro wording on Spain paid-media and dólares on LatAm", () => {
    const spainPaid = getHomeServices("es-ES").find((s) => s.slug === "paid-media");
    const latamPaid = getHomeServices("es-419").find((s) => s.slug === "paid-media");
    expect(spainPaid?.description).toContain("euro");
    expect(latamPaid?.description).toContain("dólar");
  });
});
