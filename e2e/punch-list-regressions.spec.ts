import { access } from "node:fs/promises";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

function assetUrlsFromHtml(html: string) {
  const urls = new Set<string>();
  for (const [tag] of html.matchAll(/<(?:img|source)\b[^>]*>/gi)) {
    for (const [, value] of tag.matchAll(/\b(?:src|srcset)="([^"]*)"/gi)) {
      for (const candidate of value.replaceAll("&amp;", "&").split(",")) {
        const raw = candidate.trim().split(/\s+/)[0];
        if (raw?.startsWith("/")) urls.add(raw);
      }
    }
  }
  return [...urls];
}

async function sitemapRoutes(page: Page) {
  await page.goto("/");
  const origin = new URL(page.url()).origin;
  const response = await page.request.get(`${origin}/sitemap.xml`);
  expect(response.ok(), "sitemap must be available for the route sweep").toBeTruthy();
  const xml = await response.text();
  const routes = new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, href]) => new URL(href, origin).pathname),
  );
  for (const path of ["/lp/get-a-website", "/lp/phoenix-preview"]) routes.add(path);
  return { origin, routes: [...routes] };
}

test("M1/M7: sitemap routes fit at phone widths; images, Spanish copy and internal links stay valid", async ({ page }, testInfo) => {
  test.setTimeout(15 * 60 * 1000);
  test.skip(testInfo.project.name === "mobile", "The viewport sweep itself covers mobile widths.");
  const { origin, routes } = await sitemapRoutes(page);
  const internalLinks = new Set<string>();
  const missingAssets: string[] = [];
  const forbiddenSpanish = /min read|out of 5 stars|Not included|Visit Live Site|See Portfolio|Full checklist|website cost, explained|Plus \(Bilingual\)|Exterior services|\/mo\b|\bhvac\b|¿la solicitud|(?:^|[\r\n]|[.!?]\s)la solicitud|\. una solicitud/;

  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBeLessThan(400);
    for (const width of [320, 375, 390]) {
      await page.setViewportSize({ width, height: 850 });
      const violations = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        buttons: [...document.querySelectorAll(".btn")]
          .filter((button) => button.scrollWidth > button.clientWidth)
          .map((button) => button.textContent?.trim() ?? "(unlabeled button)"),
      }));
      expect(violations.documentWidth, `${route} at ${width}px has horizontal page overflow`).toBeLessThanOrEqual(width);
      expect(violations.buttons, `${route} at ${width}px has clipped button text`).toEqual([]);

      if (width === 320) {
        const html = await page.content();
        for (const asset of assetUrlsFromHtml(html)) {
          const pathname = decodeURIComponent(new URL(asset, origin).pathname);
          const file = path.join(process.cwd(), "public", ...pathname.split("/").filter(Boolean));
          try {
            await access(file);
          } catch {
            missingAssets.push(`${route}: ${asset}`);
          }
        }

        const links = await page.locator("a[href]").evaluateAll((anchors, base) =>
          anchors.map((anchor) => (anchor as HTMLAnchorElement).href)
            .filter((href) => {
              const url = new URL(href);
              return url.origin === base && !url.pathname.startsWith("/api/");
            })
            .map((href) => {
              const url = new URL(href);
              return `${url.pathname}${url.search}`;
            }),
        origin);
        for (const link of links) internalLinks.add(link);

        if (route === "/es" || route.startsWith("/es/") || route === "/es-es" || route.startsWith("/es-es/")) {
          const text = await page.locator("body").evaluate((body) => {
            const copy = body.cloneNode(true) as HTMLElement;
            copy.querySelectorAll(".review-card, blockquote, script, style, noscript").forEach((element) => element.remove());
            return copy.innerText;
          });
          expect(text, `${route} contains English microcopy or lower-case sentence starts`).not.toMatch(forbiddenSpanish);
        }
      }
    }
  }

  expect(missingAssets, "all rendered local src/srcset files must exist under public/").toEqual([]);
  const linkPaths = [...internalLinks];
  const brokenLinks: string[] = [];
  for (const link of linkPaths) {
    try {
      const response = await page.request.get(`${origin}${link}`);
      if (response.status() >= 400) brokenLinks.push(`${link} (${response.status()})`);
    } catch (error) {
      brokenLinks.push(`${link} (${error instanceof Error ? error.message : "request failed"})`);
    }
  }
  expect(brokenLinks, "crawled internal links must resolve (intentional redirects are followed)").toEqual([]);
});

test("M2: industry proof does not request missing 480px crops", async ({ page }) => {
  await page.goto("/industries/plumbing");
  const srcsets = await page.locator(".industry-proof img").evaluateAll((imgs) => imgs.map((img) => img.getAttribute("srcset") ?? ""));
  expect(srcsets.length).toBeGreaterThan(0);
  expect(srcsets.join(" ")).not.toMatch(/live-preferred-plumbing-480|a1-landscaping-480/);
});

test("M3: Spanish audit module selects Spanish art", async ({ page }) => {
  await page.goto("/es/industries/plumbing");
  const source = page.locator(".industry-audit picture source[type='image/avif']");
  await expect(source).toHaveAttribute("srcset", /website-audit-desktop-es\.avif/);
});

test("M4: Spanish industry proof uses Spanish copy", async ({ page }) => {
  await page.goto("/es/industries/plumbing");
  await expect(page.getByRole("link", { name: "Visitar sitio publicado" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver portafolio" })).toBeVisible();
  await expect(page.getByText("Encabezado local y teléfono")).toBeVisible();
  await expect(page.getByText("Visit Live Site")).toHaveCount(0);
});

test("M5/M9: Spanish depth is localized and English industry checklist grammar is correct", async ({ page }) => {
  await page.goto("/es/industries/hvac");
  await expect(page.getByRole("cell", { name: "Plus (Bilingüe)" })).toBeVisible();
  await expect(page.getByText("$197/mes", { exact: true })).toBeVisible();
  await expect(page.getByText("Full checklist", { exact: false })).toHaveCount(0);
  await page.goto("/industries/electrical");
  await expect(page.getByText("Full checklist: pages every electrician website needs")).toBeVisible();
  await page.goto("/industries/hvac");
  await expect(page.getByText("Full checklist: pages every HVAC website needs")).toBeVisible();
  await expect(page.getByText("HVAC website cost, explained")).toBeVisible();
});

test("C1: Spanish campaign heroes retain their full-size Spanish artwork", async ({ page }) => {
  for (const route of [
    "/es/about", "/es/audit", "/es/contact", "/es/seo-services", "/es/upgrades",
    "/es/web-design", "/es/services", "/es/strategy-call", "/es/industries", "/es/faqs",
    "/es/website-management",
  ]) {
    await page.goto(route);
    await expect(page.locator("picture.campaign-page-art source").first(), route).toHaveAttribute("srcset", /-es\.(?:avif|webp)/);
  }
  await page.goto("/es/web-design");
  await expect(page.locator(".media-split picture.campaign-page-art source").first()).toHaveAttribute("srcset", /web-design-.*-es\.(?:avif|webp)/);
});

test("C2: Spanish demo-site links point to live English portfolio routes", async ({ page }) => {
  for (const slug of ["hvac", "electrical", "garage-doors", "junk-removal", "pressure-washing", "remodeling", "roofing", "tree-care"]) {
    await page.goto(`/es/industries/${slug}`);
    const link = page.getByRole("link", { name: "Ver sitio (en inglés)" });
    await expect(link, slug).toBeVisible();
    await expect(link, slug).toHaveAttribute("hrefLang", "en");
    const href = await link.getAttribute("href");
    expect(href, slug).toMatch(/^\/portfolio\//);
    const response = await page.request.get(new URL(href!, page.url()).toString());
    expect(response.status(), href!).toBe(200);
  }
});

test("C3/C4: mobile plan comparisons retain styled names and Own It pricing", async ({ page }) => {
  await page.goto("/pricing");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".mobile-plan-compare")).toBeVisible();
  await expect(page.locator(".mobile-plan-compare__sticker[src*='plan-name-own-it-1497']")).toBeVisible();
  await page.goto("/es/pricing");
  await page.setViewportSize({ width: 390, height: 844 });
  const ownItRow = page.locator(".mobile-plan-compare__card").filter({ hasText: "Own It" });
  await expect(ownItRow.locator(".mobile-plan-compare__name")).toHaveCSS("display", "flex");
  await expect(ownItRow.locator(".mobile-plan-compare__price")).toBeVisible();
  const ownItCard = page.locator(".plans .plan").filter({ has: page.getByRole("heading", { name: "Own It", exact: true }) });
  await expect(ownItCard.locator(".plan__price")).toContainText("$1,497");
  await page.goto("/es");
  await expect(page.locator(".offer__plans li").filter({ hasText: "Own It" }).locator(".offer__price")).toContainText("$1,497");
});

test("M6/NEW-4: Spanish pages avoid English plan art and text-heavy legacy campaign art", async ({ page }) => {
  for (const path of ["/es", "/es/pricing", "/es/web-design", "/es/website-management", "/es/faqs", "/es/industries/plumbing"]) {
    await page.goto(path);
    const sources = await page.locator(".offer__sticker,.plan-sticker,.campaign-page-art img,.home-section-art img").evaluateAll((items) =>
      items.flatMap((item) => [
        item.getAttribute("src") ?? "",
        item.getAttribute("srcset") ?? "",
        item.getAttribute("data-src") ?? "",
      ]).join(" "),
    );
    expect(sources, path).not.toMatch(/stickers\/(?:plan-name-|planes-|sin-anticipo-hazlo-tuyo)/);
    expect(sources, path).not.toMatch(/google-reviews-handled/);
  }
});

test("M7: Spanish pricing and service grids fit narrow screens", async ({ page }) => {
  for (const width of [320, 360, 390]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ["/es/pricing", "/es/industries/hvac"]) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${path} at ${width}px`).toBeLessThanOrEqual(width);
    }
  }
});

test("M8: known Spanish article sentence starts remain capitalized", async ({ page }) => {
  for (const slug of ["local-seo-get-found-get-called", "freelancer-vs-agency-vs-subscription-website"]) {
    await page.goto(`/es/blog/${slug}`);
    const bodyText = await page.locator(".blog-post__content").innerText();
    expect(bodyText).not.toMatch(/\. una solicitud|(?:^|\n)la solicitud|¿la solicitud/);
  }
});

test("NEW-1/NEW-2/NEW-3/NEW-5: Spanish pricing labels, localized payment, and current privacy notice", async ({ page }) => {
  await page.goto("/es/pricing");
  await expect(page.getByRole("heading", { name: "Own It", exact: true }).first()).toBeVisible();
  await expect(page.locator("p.pay-bridge a.trust-mark")).toHaveAttribute("href", "/es/pay");
  await expect(page.locator("img[alt*='Hazlo tuyo' i], img[alt*='Sistema de clientes' i], img[alt*='Sitio web,' i]")).toHaveCount(0);
  await page.goto("/es/privacy");
  await expect(page.getByText("Actualizada el 20 de noviembre de 2026", { exact: false })).toBeVisible();
  await expect(page.getByText(/no crea ni lee cookies[\s\S]*limitar el abuso de este endpoint/)).toBeVisible();
});

test("S15: hidden trade links do not return in their Spanish and English article bodies", async ({ page }) => {
  for (const path of [
    "/blog/pool-service-website-cost", "/blog/pool-service-website-pages",
    "/blog/window-cleaning-website-cost", "/blog/window-cleaning-website-pages",
    "/blog/lawn-care-website-cost", "/blog/lawn-care-website-pages",
    "/es/blog/pool-service-website-cost", "/es/blog/pool-service-website-pages",
    "/es/blog/window-cleaning-website-cost", "/es/blog/window-cleaning-website-pages",
    "/es/blog/lawn-care-website-cost", "/es/blog/lawn-care-website-pages",
  ]) {
    await page.goto(path);
    await expect(page.locator('a[href*="/industries/pool-care"],a[href*="/industries/window-cleaning"],a[href*="/industries/yard-care"]'), path).toHaveCount(0);
  }
});

test("C5: English and Spanish Terms remain at their approved text and date", async ({ page }) => {
  for (const [route, snapshot, date] of [
    ["/terms", "terms-en.txt", "Last updated November 20, 2026."],
    ["/es/terms", "terms-es.txt", "Actualizado el 20 de noviembre de 2026."],
  ]) {
    await page.goto(route);
    const terms = await page.locator("main").innerText();
    expect(terms).toContain(date);
    expect(terms).toMatchSnapshot(snapshot);
  }
});
