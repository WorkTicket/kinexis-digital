import { expect, test } from "@playwright/test";

async function installMockAnalytics(page: import("@playwright/test").Page, ads = false, meta = false) {
  await page.addInitScript(({ adsEnabled, metaEnabled }) => {
    type Config = Record<string, string>;
    const target = window as unknown as { __KINEXIS_CFG__?: Config };
    let config = target.__KINEXIS_CFG__;
    Object.defineProperty(target, "__KINEXIS_CFG__", {
      configurable: true,
      get: () => config,
      set: (next: Config) => {
        config = { ...next, ga: "G-TEST12345", metaPixel: metaEnabled ? "123456789012345" : "" };
      },
    });
    document.cookie = `kinexis_consent=v1%7Ca%3D1%7Cd%3D${adsEnabled ? 1 : 0}; Path=/; SameSite=Lax`;
  }, { adsEnabled: ads, metaEnabled: meta });
  await page.route("https://www.googletagmanager.com/**", (route) => route.abort());
  await page.route("https://www.google-analytics.com/**", (route) => route.abort());
  if (meta) await page.route("https://connect.facebook.net/**", (route) => route.abort());
  await page.context().addCookies([{
    name: "kinexis_consent",
    value: `v1|a=1|d=${ads ? 1 : 0}`,
    url: "http://localhost:3100",
  }]);
}

async function setConsent(page: import("@playwright/test").Page, analytics: boolean, ads: boolean) {
  await page.context().addCookies([{
    name: "kinexis_consent",
    value: `v1|a=${analytics ? 1 : 0}|d=${ads ? 1 : 0}`,
    url: "http://localhost:3100",
  }]);
  await page.evaluate(() => window.dispatchEvent(new Event("kinexis:consent")));
}

async function waitForBoot(page: import("@playwright/test").Page) {
  await page.waitForFunction(() =>
    [...document.scripts].some((script) => (script.src || "").includes("boot.min.js"))
      && (window as Window & {
        __KINEXIS_CFG__?: { ga?: string };
        __KINEXIS_TRACK_META_LEAD__?: unknown;
      }).__KINEXIS_CFG__?.ga === "G-TEST12345"
      && typeof (window as Window & { __KINEXIS_TRACK_META_LEAD__?: unknown }).__KINEXIS_TRACK_META_LEAD__ === "function",
  );
}

async function scrollToStickyChrome(page: import("@playwright/test").Page) {
  await page.waitForFunction(() =>
    performance.getEntriesByType("resource").some((entry) => entry.name.includes("/assets/js/boot.min.js")),
  );
  await page.evaluate(() => new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  }));
  await page.evaluate(() => {
    const hero = document.querySelector(".hero__btns, .page-hero");
    const heroBottom = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
    window.scrollTo({ top: Math.max(400, heroBottom + 40), behavior: "instant" });
  });
  await expect.poll(() => page.evaluate(() =>
    document.documentElement.classList.contains("sticky-chrome-in"),
  )).toBe(true);
}

async function gaEvents(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
    return dataLayer
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((args) => args[0] === "event")
      .map((args) => ({ name: args[1], params: args[2] }));
  });
}

test.describe("marketing journeys", () => {
  test("homepage loads and shows plan comparison", async ({ page }, testInfo) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Website Plans and Pricing|See Your New Contractor Website Before You Pay/i }).first()).toBeVisible();
    if (testInfo.project.name === "mobile") {
      await expect(page.locator(".mobile-plan-compare").getByRole("img", { name: /Lead System/i })).toBeVisible();
    } else {
      await expect(page.getByRole("columnheader", { name: "Lead System" })).toBeVisible();
    }
  });

  test("H1 marker sweeps remain while other heading emphasis is typographic", async ({ page }) => {
    await installMockAnalytics(page);
    for (const path of ["/contact", "/", "/pricing"]) {
      await page.goto(path);
      await waitForBoot(page);
      const marker = page.locator("main h1 .hl").first();
      await expect(marker).toBeVisible();
      await expect.poll(() => marker.evaluate((el) => getComputedStyle(el).backgroundSize))
        .not.toMatch(/^0(px|%)/);
      await expect(page.locator("main h2 .hl")).toHaveCount(0);
      const onlyHeadingMarkersAnimate = await page.locator(".hl.is-pending, .hl.is-marked").evaluateAll((nodes) =>
        nodes.every((node) => Boolean(node.closest("h1, h2"))),
      );
      expect(onlyHeadingMarkersAnimate).toBe(true);
    }
  });

  test("pricing page shows ownership comparison and text-back add-on", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("Own It vs monthly managed plans")).toBeVisible();
    await expect(page.locator(".pricing-comparison-table, .plan-compare__table").getByText("Add-on $97/mo").first()).toBeAttached();
    await expect(page.locator(".pricing-footnote--bullets li").first()).toBeVisible();
  });

  test("English blog hub does not link to retired Spanish-slug redirects", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator('a[href="/blog/pagina-web-para-plomeros"]')).toHaveCount(0);
    await expect(page.locator('a[href="/blog/como-pedir-resenas-en-google"]')).toHaveCount(0);
    await expect(page.locator('a[href="/industries/plumbing"]')).not.toHaveCount(0);
    await expect(page.locator('a[href="/blog/how-to-ask-for-google-reviews-contractor"]')).not.toHaveCount(0);
  });

  test("Spanish-only legacy articles switch directly to their current English equivalent", async ({ page }) => {
    const equivalents = [
      ["/es/blog/pagina-web-para-plomeros", "/industries/plumbing"],
      ["/es/blog/como-pedir-resenas-en-google", "/blog/how-to-ask-for-google-reviews-contractor"],
    ] as const;
    for (const [spanishPath, englishPath] of equivalents) {
      await page.goto(spanishPath);
      const englishLink = page.locator('[data-lang-locale="en"]');
      await expect(englishLink).toHaveAttribute("href", englishPath);
      const response = await page.request.get(englishPath, { maxRedirects: 0 });
      expect(response.status()).toBe(200);
    }
  });

  test("translated checkout utility switches between Spanish and English routes", async ({ page }) => {
    for (const [spanishPath, englishPath] of [["/es/pay", "/pay"], ["/es/pay/thanks", "/pay/thanks"]] as const) {
      await page.goto(spanishPath);
      await expect(page.locator('[data-lang-locale="en"]')).toHaveAttribute("href", englishPath);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    }
  });

  test("representative Spanish pages render in Spanish without horizontal overflow", async ({ page }) => {
    for (const path of ["/es", "/es/pricing", "/es/contact", "/es/industries/plumbing", "/es/blog"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content, `${path} overflows at ${dimensions.viewport}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  });

  test("Spanish campaign artwork and social previews use localized image variants", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator('picture.campaign-page-art source[type="image/avif"]')).toHaveAttribute("srcset", /homepage-hero-desktop-es\.avif/);
    await expect(page.locator('picture.home-section-art--showcase source[type="image/avif"]')).toHaveAttribute("srcset", /homepage-website-showcase-1200w-es\.avif/);

    await page.goto("/es/pricing");
    await expect(page.locator('picture.campaign-page-art source[type="image/avif"]')).toHaveAttribute("srcset", /pricing-desktop-es\.avif/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /pricing-social-es\.jpg/);
  });

  test("Spanish blog covers use Spanish artwork on cards and article pages", async ({ page }) => {
    await page.goto("/blog");
    const wideEnglishCoverFrame = page.locator('article.post a[href="/blog/website-mistakes-that-cost-you-calls"] .post__img');
    await expect(wideEnglishCoverFrame).toHaveAttribute("style", /aspect-ratio:1200 \/ 768/);

    await page.goto("/es/blog");
    const spanishCardCover = page.locator('article.post a[href="/es/blog/google-business-profile-vs-website"] img');
    await expect(spanishCardCover).toHaveAttribute("src", /google-business-profile-vs-website-es-640\.webp/);
    await expect(spanishCardCover).toHaveCSS("object-fit", "contain");
    await spanishCardCover.scrollIntoViewIfNeeded();
    await expect.poll(() => spanishCardCover.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

    await page.goto("/es/blog/google-business-profile-vs-website");
    await expect(page.locator(".blog-post__hero img")).toHaveAttribute("src", /google-business-profile-vs-website-es-960\.webp/);

    await page.goto("/blog/google-business-profile-vs-website");
    await expect(page.locator('.blog-post__hero source[type="image/avif"]')).toHaveAttribute("srcset", /google-business-profile-vs-website-960\.avif\?v=28/);

    for (const slug of [
      "contractor-website-quote-form",
      "contractor-website-redesign-checklist",
      "how-to-choose-contractor-web-designer",
    ]) {
      await page.goto(`/es/blog/${slug}`);
      await expect(page.locator(".blog-post__content .blog-post__lead")).toBeVisible();
      await expect(page.locator(".blog-post__hero img")).toHaveAttribute("src", new RegExp(`${slug}-es-960\\.webp`));
    }
  });

  test("Spanish industry hero descriptions match the supplied trade artwork", async ({ page }) => {
    const cases = [
      ["/es/industries/plumbing", "Plomero trabajando bajo un fregadero con tuberías expuestas"],
      ["/es/industries/hvac", "Técnico de HVAC revisando una unidad condensadora exterior"],
      ["/es/industries/electrical", "Electricista revisando un tablero eléctrico abierto"],
      ["/es/industries/roofing", "Techador revisando las tejas de un techo residencial"],
      ["/es/industries/garage-doors", "Técnico trabajando en una puerta de garaje residencial abierta"],
      ["/es/industries/painting", "Pintor aplicando pintura en una pared interior"],
      ["/es/industries/remodeling", "Contratista de remodelación revisando una cocina renovada"],
      ["/es/industries/landscaping", "Paisajista plantando arbustos en un jardín terminado"],
      ["/es/industries/pressure-washing", "Trabajador lavando a presión la entrada de una casa"],
      ["/es/industries/junk-removal", "Equipo de retiro de muebles cargando un remolque"],
      ["/es/industries/tree-care", "Arborista inspeccionando un árbol en un jardín residencial"],
    ] as const;

    for (const [path, description] of cases) {
      await page.goto(path);
      await expect(page.locator(".industry-hero__img")).toHaveAttribute("alt", description);
    }
  });

  test("pool, window-cleaning, and yard-care pages use the supplied localized hero artwork", async ({ page }) => {
    const cases = [
      ["pool-care", "Pool technician skimming leaves from a residential pool", "Técnico limpiando hojas de una alberca residencial"],
      ["window-cleaning", "Window cleaner using a squeegee on a home's exterior window", "Limpiador de ventanas usando una escobilla en una casa"],
      ["yard-care", "Lawn-care worker mowing a residential lawn", "Trabajador de jardinería cortando el césped de una casa"],
    ] as const;

    for (const [slug, englishAlt, spanishAlt] of cases) {
      await page.goto(`/industries/${slug}`);
      await expect(page.locator('.industry-hero source[media="(max-width: 860px)"]')).toHaveAttribute("srcset", new RegExp(`${slug}-mobile\\.webp\\?v=28`));
      await expect(page.locator(".industry-hero source[type=\"image/avif\"]")).toHaveAttribute("srcset", new RegExp(`${slug}-desktop\\.avif\\?v=28`));
      await expect(page.locator(".industry-hero__img")).toHaveAttribute("alt", englishAlt);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`${slug}-social\\.jpg`));

      await page.goto(`/es/industries/${slug}`);
      await expect(page.locator(".industry-hero__img")).toHaveAttribute("alt", spanishAlt);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`${slug}-social\\.jpg`));
    }
  });

  test("preview form shows required business fields", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('input[name="business"]').first()).toBeVisible();
    await expect(page.locator('input[name="trade"]').first()).toBeVisible();
    await expect(page.locator('input[name="photos"][type="file"]').first()).toBeAttached();
  });

  test("free-preview conversion fires once and only after confirmed success", async ({ page }) => {
    await installMockAnalytics(page);
    let submissions = 0;
    await page.route("**/api/contact", async (route) => {
      submissions += 1;
      await new Promise((resolve) => setTimeout(resolve, submissions === 1 ? 250 : 0));
      return route.fulfill({
        status: submissions === 1 ? 502 : 200,
        contentType: "application/json",
        body: JSON.stringify(submissions === 1 ? { error: "Mock delivery failure" } : { ok: true }),
      });
    });
    await page.goto("/");
    await waitForBoot(page);
    const form = page.locator('form[data-conversion="preview"]').first();
    await form.locator('input[name="name"]').fill("Test Visitor");
    await form.locator('input[name="email"]').fill("visitor@example.test");
    await form.locator('input[name="business"]').fill("Test Business");
    await form.locator('input[name="trade"]').fill("Plumbing in Boise");
    await form.locator('button[type="submit"]').click();
    await form.evaluate((element) => element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
    await expect(form.locator(".form__msg")).toContainText("Mock delivery failure");
    expect(submissions).toBe(1);
    expect((await gaEvents(page)).map((event) => event.name)).not.toContain("generate_lead");

    await form.locator('button[type="submit"]').click();
    await expect(form).toHaveClass(/is-done/);
    const events = await gaEvents(page);
    expect(events.filter((event) => event.name === "generate_lead")).toHaveLength(1);
    expect(submissions).toBe(2);
    const diagnostics = events.filter((event) => event.name === "preview_form_submit");
    expect(diagnostics).toHaveLength(1);
    expect((diagnostics[0].params as { event_role?: string }).event_role).toBe("diagnostic");
    expect(JSON.stringify(events)).not.toContain("visitor@example.test");
  });

  test("preview primary conversion is singular across GA4 and Meta", async ({ page }) => {
    await installMockAnalytics(page, true, true);
    await page.route("**/api/contact", (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    }));
    await page.goto("/");
    await waitForBoot(page);
    const form = page.locator('form[data-conversion="preview"]').first();
    await form.locator('input[name="name"]').fill("Test Visitor");
    await form.locator('input[name="email"]').fill("visitor@example.test");
    await form.locator('input[name="business"]').fill("Test Business");
    await form.locator('input[name="trade"]').fill("Plumbing in Boise");
    await form.locator('button[type="submit"]').click();
    await expect(form).toHaveClass(/is-done/);
    const ga = await gaEvents(page);
    expect(ga.filter((event) => event.name === "generate_lead")).toHaveLength(1);
    expect(ga.filter((event) => event.name === "preview_form_submit")).toHaveLength(1);
    const meta = await page.evaluate(() => (
      (window as unknown as { fbq?: { queue?: unknown[][] } }).fbq?.queue ?? []
    ).filter((args) => args[0] === "track" && args[1] === "Lead"));
    expect(meta).toHaveLength(1);
    expect(meta[0][2]).toMatchObject({ content_name: "homepage_preview", form_path: "/" });
  });

  test("first-touch attribution survives navigation and excludes ambiguous or unconsented IDs", async ({ page }) => {
    await installMockAnalytics(page, false);
    let submitted = "";
    await page.route("**/api/contact", async (route) => {
      submitted = route.request().postData() || "";
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await page.goto("/?utm_source=first_source&utm_campaign=first_campaign&utm_source=ambiguous&gclid=click-id&fbclid=fb-id");
    await waitForBoot(page);
    await page.goto("/contact");
    await waitForBoot(page);
    const form = page.locator("form[data-contact-inquiry]").first();
    await form.locator('input[name="name"]').fill("Test Visitor");
    await form.locator('input[name="email"]').fill("visitor@example.test");
    await form.locator('input[name="business"]').fill("Test Business");
    await form.locator('input[name="trade"]').fill("Plumbing in Boise");
    await form.locator("label.sticker-check").filter({ hasText: "I’d like a free homepage preview" }).click();
    await form.locator('input[name="service_area"]').fill("Boise and nearby towns");
    await form.locator('textarea[name="services"]').fill("Drain cleaning, leak repair, water heaters");
    await form.locator("[data-preview-asset-consent]").check({ force: true });
    await form.locator('button[type="submit"]').click();
    await expect(form).toHaveClass(/is-done/);
    expect(submitted).toContain('name="kx_attr_utm_campaign"');
    expect(submitted).toContain("first_campaign");
    expect(submitted).not.toContain("utm_source");
    expect(submitted).not.toContain("click-id");
    expect(submitted).not.toContain("fb-id");
  });

  test("GA4 and Meta exceptions cannot turn successful lead delivery into a form failure", async ({ page }) => {
    await page.addInitScript(() => {
      type Config = Record<string, string>;
      const target = window as unknown as { __KINEXIS_CFG__?: Config };
      let config = target.__KINEXIS_CFG__;
      Object.defineProperty(target, "__KINEXIS_CFG__", {
        configurable: true,
        get: () => config,
        set: (next: Config) => { config = { ...next, ga: "G-TEST12345", metaPixel: "123456789012345" }; },
      });
      document.cookie = "kinexis_consent=v1%7Ca%3D1%7Cd%3D1; Path=/; SameSite=Lax";
    });
    await page.route("https://www.googletagmanager.com/**", (route) => route.abort());
    await page.route("https://connect.facebook.net/**", (route) => route.abort());
    await page.context().addCookies([{
      name: "kinexis_consent",
      value: "v1|a=1|d=1",
      url: "http://localhost:3100",
    }]);
    await page.route("**/api/contact", (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    }));
    await page.goto("/");
    await waitForBoot(page);
    await page.waitForTimeout(300);
    await page.dispatchEvent("body", "pointerdown");
    await page.waitForFunction(() => Boolean((window as Window & { fbq?: unknown }).fbq));
    await page.evaluate(() => {
      (window as Window & { gtag?: (...args: unknown[]) => void }).gtag = () => { throw new Error("mock GA failure"); };
      (window as Window & { fbq?: (...args: unknown[]) => void }).fbq = () => { throw new Error("mock Meta failure"); };
    });
    const form = page.locator('form[data-conversion="preview"]').first();
    await form.locator('input[name="name"]').fill("Test Visitor");
    await form.locator('input[name="email"]').fill("visitor@example.test");
    await form.locator('input[name="business"]').fill("Test Business");
    await form.locator('input[name="trade"]').fill("Plumbing in Boise");
    await form.locator('button[type="submit"]').click();
    await expect(form).toHaveClass(/is-done/);
    await expect(form.locator(".form__msg")).toContainText(/Thanks|Gracias/);
  });

  test("website audit has a distinct confirmed conversion, not a preview conversion", async ({ page }) => {
    await installMockAnalytics(page, true, true);
    await page.route("**/api/contact", (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    }));
    await page.goto("/audit");
    await waitForBoot(page);
    const form = page.locator('form[data-conversion="audit"]');
    await form.locator('input[name="name"]').fill("Test Visitor");
    await form.locator('input[name="email"]').fill("visitor@example.test");
    await form.locator('input[name="url"]').fill("https://example.test");
    await form.locator('button[type="submit"]').click();
    await expect(form).toHaveClass(/is-done/);
    const names = (await gaEvents(page)).map((event) => event.name);
    expect(names.filter((name) => name === "audit_request")).toHaveLength(1);
    expect(names).not.toContain("generate_lead");
    expect(names).not.toContain("preview_form_submit");
    const metaLead = await page.evaluate(() => (
      (window as unknown as { fbq?: { queue?: unknown[][] } }).fbq?.queue ?? []
    ).filter((args) => args[0] === "track" && args[1] === "Lead"));
    expect(metaLead).toHaveLength(1);
    expect(metaLead[0][2]).toMatchObject({ content_name: "website_audit", form_path: "/audit" });
  });

  test("mapped lead forms send matching fixed Meta names on Pixel and CAPI", async ({ page }) => {
    await installMockAnalytics(page, true, true);
    const submissions: string[] = [];
    await page.route("**/api/contact", async (route) => {
      submissions.push(route.request().postDataBuffer()?.toString("latin1") || "");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    const forms = [
      { path: "/", selector: 'form[data-meta-form="home"]', key: "home", name: "homepage_preview", kind: "standard" },
      { path: "/contact", selector: 'form[data-meta-form="contact"]', key: "contact", name: "contact_form", kind: "standard" },
      { path: "/es/contact", selector: 'form[data-meta-form="contact"]', key: "contact", name: "contact_form", kind: "standard" },
      { path: "/audit", selector: 'form[data-meta-form="audit"]', key: "audit", name: "website_audit", kind: "audit" },
      { path: "/es/audit", selector: 'form[data-meta-form="audit"]', key: "audit", name: "website_audit", kind: "audit" },
      { path: "/lp/get-a-website", selector: 'form[data-meta-form="lp-get-a-website"]', key: "lp-get-a-website", name: "lp_get_a_website", kind: "standard" },
      { path: "/lp/phoenix-preview", selector: 'form[data-meta-form="lp-phoenix-preview"]', key: "lp-phoenix-preview", name: "lp_phoenix_preview", kind: "standard" },
      { path: "/strategy-call", selector: 'form[data-meta-form="strategy-call"]', key: "strategy-call", name: "strategy_call", kind: "booking" },
      { path: "/intake", selector: 'form[data-meta-form="intake"]', key: "intake", name: "intake_form", kind: "intake" },
      { path: "/about", selector: 'form[data-meta-form="footer"]', key: "footer", name: "footer_form", kind: "standard" },
      { path: "/tools/google-review-link-qr", selector: 'form[data-meta-form="review-qr-tool"]', key: "review-qr-tool", name: "review_qr_tool_preview", kind: "standard" },
    ] as const;

    for (const item of forms) {
      await page.goto(item.path);
      await waitForBoot(page);
      if (item.kind === "booking") {
        await page.locator(".booking-cal__day:not([disabled])").first().click();
        await page.locator(".booking-cal__slots button").first().click();
      }
      const form = page.locator(item.selector);
      if (item.path === "/contact" || item.path === "/es/contact") {
        await form.locator('input[name="inquiry"][value="plans"]').check({ force: true });
      }
      if (item.kind === "audit") {
        await form.locator('input[name="name"]').fill("Test Visitor");
        await form.locator('input[name="email"]').fill("visitor@example.test");
        await form.locator('input[name="url"]').fill("https://example.test");
      } else if (item.kind === "intake") {
        await form.locator('input[name="name"]').fill("Test Visitor");
        await form.locator('input[name="email"]').fill("visitor@example.test");
        await form.locator('input[name="business"]').fill("Test Business");
        await form.locator('input[name="trade"]').fill("Plumbing in Boise");
        await form.locator('input[name="service_area"]').fill("Boise");
        await form.locator('textarea[name="services"]').fill("Drain repair");
      } else {
        await form.locator('input[name="name"]').fill("Test Visitor");
        await form.locator('input[name="email"]').fill("visitor@example.test");
        if (item.kind === "booking") {
          await form.locator('input[name="business"]').fill("Test Business");
        } else {
          await form.locator('input[name="business"]').fill("Test Business");
          await form.locator('input[name="trade"]').fill("Plumbing in Boise");
        }
      }
      if (item.kind === "booking") {
        await form.locator('button[type="submit"]').click();
        await expect(page.locator(".booking-cal--done")).toBeVisible();
      } else {
        await form.locator('button[type="submit"]').click();
        await expect(form).toHaveClass(/is-done/);
      }

      const submitted = submissions.at(-1) || "";
      expect(submitted).toMatch(new RegExp(`name="kx_meta_form"\\r?\\n\\r?\\n${item.key}\\r?\\n`));
      await page.waitForFunction(({ contentName, formPath }) => {
        const queue = (window as Window & { fbq?: { queue?: unknown[] } }).fbq?.queue ?? [];
        return queue.some((rawArgs: unknown) => {
          const args = rawArgs as unknown[];
          const params = args[2] as { content_name?: string; form_path?: string } | undefined;
          return args[0] === "track"
            && args[1] === "Lead"
            && params?.content_name === contentName
            && params.form_path === formPath;
        });
      }, { contentName: item.name, formPath: item.path });
    }
  });

  test("client intake sends a lead while update submissions send none", async ({ page }) => {
    await installMockAnalytics(page, true, true);
    let updateSubmission = "";
    await page.route("**/api/contact", async (route) => {
      updateSubmission = route.request().postDataBuffer()?.toString("latin1") || "";
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await page.goto("/update");
    await waitForBoot(page);
    const update = page.locator('form:has(textarea[name="request"])');
    await update.locator('input[name="name"]').fill("Existing Client");
    await update.locator('input[name="email"]').fill("client@example.test");
    await update.locator('textarea[name="request"]').fill("Update the service page.");
    await update.locator('button[type="submit"]').click();
    await expect(update).toHaveClass(/is-done/);
    expect(updateSubmission).not.toContain('name="kx_meta_form"');
    expect(await page.evaluate(() => (
      (window as unknown as { fbq?: { queue?: unknown[][] } }).fbq?.queue ?? []
    ).filter((args) => args[0] === "track" && args[1] === "Lead"))).toHaveLength(0);

    await page.goto("/intake");
    await waitForBoot(page);
    const intake = page.locator("#website-intake");
    await intake.locator('input[name="name"]').fill("Existing Client");
    await intake.locator('input[name="phone"]').fill("3075551234");
    await intake.locator('input[name="business"]').fill("Test Business");
    await intake.locator('input[name="trade"]').fill("Plumbing in Boise");
    await intake.locator('input[name="service_area"]').fill("Boise");
    await intake.locator('textarea[name="services"]').fill("Drain repair");
    await intake.locator('button[type="submit"]').click();
    await expect(intake).toHaveClass(/is-done/);

    const names = (await gaEvents(page)).map((event) => event.name);
    expect(names).not.toContain("generate_lead");
    expect(names).not.toContain("preview_form_submit");
    expect(names).not.toContain("preview_form_view");
    expect(names).not.toContain("preview_form_start");
    const intakeMetaLead = await page.evaluate(() => (
      (window as unknown as { fbq?: { queue?: unknown[][] } }).fbq?.queue ?? []
    ).filter((args) => args[0] === "track" && args[1] === "Lead"));
    expect(intakeMetaLead).toHaveLength(1);
    expect(intakeMetaLead[0][2]).toMatchObject({ content_name: "intake_form", form_path: "/intake" });
  });

  test("mobile nav opens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    // Clear consent overlay so it cannot steal the tap target.
    await page.evaluate(() => {
      document.cookie = `kinexis_consent=${encodeURIComponent("v1|a=0|d=0")}; Path=/; Max-Age=86400; SameSite=Lax`;
      window.dispatchEvent(new Event("kinexis:consent"));
    });
    const burger = page.locator("button.burger[aria-controls='nav']");
    const isOpen = () => page.evaluate(() =>
      document.documentElement.classList.contains("nav-open") || Boolean(document.querySelector("#nav.is-open")));
    // boot.min.js is lazyOnload; retry the tap until its click handler is live.
    await expect(async () => {
      if (!(await isOpen())) await burger.click();
      expect(await isOpen()).toBe(true);
    }).toPass({ timeout: 15_000, intervals: [250, 500, 1000] });
  });

  test("cookie consent: undecided and reject block trackers", async ({ page, context, baseURL }) => {
    await context.clearCookies();
    const trackerHits: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (
        url.includes("googletagmanager.com") ||
        url.includes("google-analytics.com") ||
        url.includes("connect.facebook.net") ||
        url.includes("fbevents.js")
      ) {
        trackerHits.push(url);
      }
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".consent-banner")).toBeVisible({ timeout: 15_000 });
    await page.waitForTimeout(1500);
    expect(trackerHits, "undecided must not load GA/Meta").toEqual([]);

    // UI reject must persist the cookie contract.
    await page.locator(".consent-banner").getByRole("button", { name: /^Reject$/i }).click();
    await expect.poll(async () => page.evaluate(() => {
      const m = document.cookie.match(/(?:^|; )kinexis_consent=([^;]*)/);
      return m ? decodeURIComponent(m[1]) : "";
    }), { timeout: 10_000 }).toMatch(/v1\|a=0\|d=0/);
    await scrollToStickyChrome(page);
    await expect(page.getByRole("button", { name: /Cookie preferences/i })).toBeVisible();

    trackerHits.length = 0;
    const host = new URL(baseURL || "http://127.0.0.1:3000").hostname;
    await context.addCookies([{
      name: "kinexis_consent",
      value: "v1|a=0|d=0",
      domain: host,
      path: "/",
    }]);
    await page.reload({ waitUntil: "domcontentloaded" });
    await scrollToStickyChrome(page);
    await page.waitForTimeout(2000);
    expect(trackerHits, "reject cookie must not load GA/Meta").toEqual([]);
    await expect(page.getByRole("button", { name: /Cookie preferences/i })).toBeVisible();
  });

  test("cookie consent: accept arms trackers when IDs configured", async ({ page, context, baseURL }) => {
    await context.clearCookies();
    const trackerHits: string[] = [];
    const gaCollect: string[] = [];
    const metaTr: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("googletagmanager.com") || url.includes("connect.facebook.net") || url.includes("google-analytics.com")) {
        trackerHits.push(url);
      }
      if (url.includes("/g/collect") || url.includes("analytics.google.com/g/collect")) gaCollect.push(url);
      if (
        url.includes("facebook.com/tr") ||
        (url.includes("facebook.net") && url.includes("/tr")) ||
        (url.includes("connect.facebook.net") && url.includes("signals/config"))
      ) {
        metaTr.push(url);
      }
    });

    const host = new URL(baseURL || "http://localhost:3000").hostname;
    await context.addCookies([{
      name: "kinexis_consent",
      value: "v1|a=1|d=1",
      domain: host,
      path: "/",
    }]);
    await page.goto("/", { waitUntil: "load" });
    await page.waitForFunction(() => {
      const scripts = [...document.scripts].some((s) => (s.src || "").includes("boot.min.js"));
      return scripts && Boolean(window.__KINEXIS_CFG__);
    }, null, { timeout: 30_000 });
    await page.waitForTimeout(400);
    await page.evaluate(() => window.dispatchEvent(new Event("kinexis:consent")));
    await page.locator("main").click({ position: { x: 20, y: 20 }, force: true }).catch(() => {});
    await page.dispatchEvent("body", "pointerdown");

    const ids = await page.evaluate(() => {
      const cfg = (window as Window & { __KINEXIS_CFG__?: { ga?: string; metaPixel?: string } }).__KINEXIS_CFG__;
      return {
        ga: Boolean(cfg?.ga && /^G-[A-Z0-9]+$/.test(cfg.ga)),
        meta: Boolean(cfg?.metaPixel && /^\d{5,20}$/.test(cfg.metaPixel)),
      };
    });
    if (ids.ga || ids.meta) {
      await expect.poll(() => trackerHits.length, { timeout: 20_000 }).toBeGreaterThan(0);
    }
    if (ids.ga) await expect.poll(() => gaCollect.length, { timeout: 20_000 }).toBeGreaterThan(0);
    if (ids.meta) {
      await expect.poll(
        () => metaTr.length || trackerHits.some((u) => u.includes("fbevents") || u.includes("signals/config")),
        { timeout: 20_000 },
      ).toBeTruthy();
    }
  });

  test("cookie consent: analytics-only does not load Meta", async ({ page, context, baseURL }) => {
    await context.clearCookies();
    const gaHits: string[] = [];
    const metaHits: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("googletagmanager.com") || url.includes("google-analytics.com")) gaHits.push(url);
      if (url.includes("connect.facebook.net") || url.includes("fbevents.js")) metaHits.push(url);
    });

    const host = new URL(baseURL || "http://localhost:3000").hostname;
    await context.addCookies([{
      name: "kinexis_consent",
      value: "v1|a=1|d=0",
      domain: host,
      path: "/",
    }]);
    await page.goto("/", { waitUntil: "load" });
    await page.waitForFunction(() => {
      const scripts = [...document.scripts].some((s) => (s.src || "").includes("boot.min.js"));
      return scripts && Boolean(window.__KINEXIS_CFG__);
    }, null, { timeout: 30_000 });
    await page.waitForTimeout(400);
    await page.evaluate(() => window.dispatchEvent(new Event("kinexis:consent")));
    await page.locator("main").click({ position: { x: 20, y: 20 }, force: true }).catch(() => {});
    await page.dispatchEvent("body", "pointerdown");
    await page.waitForTimeout(3000);

    const ids = await page.evaluate(() => {
      const cfg = (window as Window & { __KINEXIS_CFG__?: { ga?: string; metaPixel?: string } }).__KINEXIS_CFG__;
      return {
        ga: Boolean(cfg?.ga && /^G-[A-Z0-9]+$/.test(cfg.ga)),
        meta: Boolean(cfg?.metaPixel && /^\d{5,20}$/.test(cfg.metaPixel)),
      };
    });
    expect(metaHits, "ads rejected → Meta must not load").toEqual([]);
    if (ids.ga) await expect.poll(() => gaHits.length, { timeout: 15_000 }).toBeGreaterThan(0);
  });

  test("loaded trackers stop transmitting after withdrawal and resume once on reacceptance", async ({ page }) => {
    const thirdPartyRequests: string[] = [];
    page.on("request", (request) => {
      if (/googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|facebook\.com\/tr/.test(request.url())) {
        thirdPartyRequests.push(request.url());
      }
    });
    await page.addInitScript(() => {
      type Config = Record<string, string>;
      const target = window as unknown as { __KINEXIS_CFG__?: Config };
      let config = target.__KINEXIS_CFG__;
      Object.defineProperty(target, "__KINEXIS_CFG__", {
        configurable: true,
        get: () => config,
        set: (next: Config) => { config = { ...next, ga: "G-TEST12345", metaPixel: "123456789012345" }; },
      });
    });
    await page.route("https://www.googletagmanager.com/**", (route) => route.abort());
    await page.route("https://www.google-analytics.com/**", (route) => route.abort());
    await page.route("https://connect.facebook.net/**", (route) => route.abort());
    await page.route("https://www.facebook.com/**", (route) => route.abort());
    await setConsent(page, true, false);
    await page.goto("/");
    await waitForBoot(page);
    await page.waitForTimeout(300);
    await page.dispatchEvent("body", "pointerdown");
    await expect.poll(async () => (await gaEvents(page)).filter((event) => event.name === "page_view").length).toBe(1);

    const firePhoneTap = () => page.evaluate(() => {
      document.querySelector('a[href^="tel:"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await firePhoneTap();
    await expect.poll(async () => (await gaEvents(page)).filter((event) => event.name === "phone_tap").length).toBe(1);

    await setConsent(page, true, true);
    await firePhoneTap();
    await expect.poll(() => page.evaluate(() => Boolean((window as Window & { fbq?: { queue?: unknown[] } }).fbq?.queue?.length))).toBe(true);

    const beforeWithdraw = await page.evaluate(() => {
      const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
      const events = dataLayer.map((item) => Array.from(item as ArrayLike<unknown>) as unknown[]).filter((args) => args[0] === "event");
      const fbq = (window as unknown as { fbq?: { queue?: unknown[][] } }).fbq;
      return {
        gaEvents: events.length,
        pageViews: events.filter((args) => args[1] === "page_view").length,
        metaPageViews: fbq?.queue?.filter((args) => args[0] === "track" && args[1] === "PageView").length ?? 0,
        metaInitializations: fbq?.queue?.filter((args) => args[0] === "init").length ?? 0,
      };
    });
    expect(beforeWithdraw.metaPageViews).toBe(1);
    expect(beforeWithdraw.metaInitializations).toBe(1);

    await setConsent(page, true, false);
    await firePhoneTap();
    const adsWithdrawn = await page.evaluate(() => {
      const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
      const entries = dataLayer.map((item) => Array.from(item as ArrayLike<unknown>) as unknown[]);
      const fbq = (window as unknown as { fbq?: { queue?: unknown[][] } }).fbq;
      return {
        gaEvents: entries.filter((args) => args[0] === "event").length,
        adStorage: (entries.filter((args) => args[0] === "consent" && args[1] === "update").at(-1)?.[2] as Record<string, string>)?.ad_storage,
        contacts: fbq?.queue?.filter((args) => args[0] === "track" && args[1] === "Contact").length ?? 0,
        revoked: fbq?.queue?.some((args) => args[0] === "consent" && args[1] === "revoke") ?? false,
      };
    });
    expect(adsWithdrawn.gaEvents).toBe(beforeWithdraw.gaEvents + 1);
    expect(adsWithdrawn.adStorage).toBe("denied");
    expect(adsWithdrawn.contacts).toBe(1);
    expect(adsWithdrawn.revoked).toBe(true);

    await setConsent(page, true, true);
    await setConsent(page, false, false);
    await firePhoneTap();
    await page.evaluate(() => window.dispatchEvent(new CustomEvent("kinexis:track", { detail: { name: "blocked_after_withdrawal" } })));
    const denied = await page.evaluate(() => {
      const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
      const entries = dataLayer.map((item) => Array.from(item as ArrayLike<unknown>) as unknown[]);
      const events = entries.filter((args) => args[0] === "event");
      const updates = entries.filter((args) => args[0] === "consent" && args[1] === "update");
      const fbq = (window as unknown as { fbq?: { queue?: unknown[][] } }).fbq;
      return {
        gaEvents: events.length,
        lastConsent: updates.at(-1)?.[2] as Record<string, string> | undefined,
        meta: fbq?.queue ?? [],
      };
    });
    expect(denied.gaEvents).toBe(adsWithdrawn.gaEvents);
    expect(denied.lastConsent?.analytics_storage).toBe("denied");
    expect(denied.meta.some((args) => args[0] === "consent" && args[1] === "revoke")).toBe(true);
    expect(denied.meta.filter((args) => args[0] === "track" && args[1] === "PageView")).toHaveLength(1);
    expect(denied.meta.filter((args) => args[0] === "track" && args[1] === "Contact")).toHaveLength(1);

    await setConsent(page, true, true);
    const reaccepted = await page.evaluate(() => {
      const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
      const entries = dataLayer.map((item) => Array.from(item as ArrayLike<unknown>) as unknown[]);
      const events = entries.filter((args) => args[0] === "event");
      const fbq = (window as unknown as { fbq?: { queue?: unknown[][] } }).fbq;
      return {
        pageViews: events.filter((args) => args[1] === "page_view").length,
        granted: entries.some((args) => args[0] === "consent" && args[1] === "update" && (args[2] as Record<string, string>)?.analytics_storage === "granted"),
        metaPageViews: fbq?.queue?.filter((args) => args[0] === "track" && args[1] === "PageView").length ?? 0,
        metaInitializations: fbq?.queue?.filter((args) => args[0] === "init").length ?? 0,
        metaGrant: fbq?.queue?.some((args) => args[0] === "consent" && args[1] === "grant") ?? false,
      };
    });
    expect(reaccepted).toEqual({
      pageViews: 1,
      granted: true,
      metaPageViews: 1,
      metaInitializations: 1,
      metaGrant: true,
    });
    await setConsent(page, false, false);
    await expect.poll(() => page.evaluate(() => document.cookie)).toContain("kinexis_consent=v1|a=0|d=0");
    const requestsAtWithdrawal = thirdPartyRequests.length;
    await page.reload();
    await waitForBoot(page);
    await page.dispatchEvent("body", "pointerdown");
    await page.waitForTimeout(700);
    expect(thirdPartyRequests.length, JSON.stringify(thirdPartyRequests)).toBe(requestsAtWithdrawal);
  });

  test("checkout page loads without taking payment", async ({ page }) => {
    await page.goto("/pay");
    await expect(page.getByText(/Your new website starts here/i).first()).toBeVisible();
    await expect(page.locator("#invoice")).toBeVisible();
    await expect(page.getByText(/invoice link|payment link/i).first()).toBeVisible();
  });

  test("invoice amount cannot be posted from client", async ({ page }) => {
    const res = await page.request.post("/api/checkout", {
      data: {
        amount: "1.00",
        description: "Tamper test",
        name: "Test User",
        email: "test@example.com",
        idempotencyKey: crypto.randomUUID(),
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Avoid colliding with rate-limit bucket from earlier suite calls.
        "x-forwarded-for": `203.0.113.${Math.floor(Math.random() * 200) + 1}`,
      },
    });
    expect([400, 429]).toContain(res.status());
    if (res.status() === 400) {
      const body = await res.json();
      expect(String(body.error || "")).toMatch(/invoice payment link|cannot be entered manually/i);
    }
  });

  test("invoice admin rejects missing secret", async ({ page }) => {
    const res = await page.request.post("/api/invoices", {
      data: { amount: "100", description: "Admin probe" },
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    expect([401, 503]).toContain(res.status());
  });

  test("case studies use the supplied responsive overviews and live homepage screenshots", async ({ page }) => {
    const studies = [
      { slug: "manos-creativas", name: "Manos Creativas Bynmw", asset: "bynmwcreative" },
      { slug: "preferred-plumbing", name: "Preferred Plumbing Solutions", asset: "preferred-plumbing" },
      { slug: "a1-property-services", name: "A1 Property Services", asset: "a1-property-services" },
    ];

    for (const study of studies) {
      const res = await page.goto(`/case-studies/${study.slug}`);
      expect(res?.ok()).toBeTruthy();
      await expect(page.getByRole("heading", { level: 1, name: study.name })).toBeVisible();

      await expect(page.getByRole("heading", { name: "The challenge" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Designed around the customer" })).toBeVisible();
      await expect(page.locator(".case-study__section-heading .eyebrow").filter({ hasText: /^\d{2}\s*\/|^0[1-4]$/ })).toHaveCount(0);
      await expect(page.locator(".case-study__full-page")).toHaveCount(0);
      const overview = page.locator(".case-study__overview img");
      await expect(overview).toHaveAttribute("src", new RegExp(`/case-studies/${study.asset}/overview-1200w\\.webp\\?v=1$`));
      await expect(overview).toHaveAttribute("srcset", new RegExp(`/case-studies/${study.asset}/overview-640w\\.webp\\?v=1 640w.*overview-2160w\\.webp\\?v=1 2160w`));
      await expect(overview).toHaveAttribute("width", "1200");
      await expect(overview).toHaveAttribute("height", "1069");

      await expect(page.locator("img[src*='before-']")).toHaveCount(0);
    }
  });

  test("live-site cards use the supplied high-resolution homepage crops", async ({ page }) => {
    const res = await page.goto("/portfolio");
    expect(res?.ok()).toBeTruthy();
    const cards = page.locator(".portfolio--live .live-site");
    await expect(cards).toHaveCount(3);
    for (const [index, asset] of ["bynmwcreative", "preferred-plumbing", "a1-property-services"].entries()) {
      const image = cards.nth(index).locator(".shot__img");
      await expect(image).toHaveAttribute("srcset", new RegExp(`/case-studies/${asset}/screenshots/after-hero-640w\\.webp\\?v=1 640w.*after-hero-1322w\\.webp\\?v=1 1322w`));
      await expect(image).toHaveAttribute("width", "1322");
      await expect(image).toHaveAttribute("height", "952");
    }
  });

  test("industry service and issue icons use consistent frames", async ({ page }) => {
    for (const slug of ["hvac", "plumbing"]) {
      const res = await page.goto(`/industries/${slug}`);
      expect(res?.ok()).toBeTruthy();
      await expect(page.locator(".industry-page")).toBeVisible();
      for (const selector of [".review-rail__icon img", ".industry-problems__icon img"]) {
        const sizes = await page.locator(selector).evaluateAll((images) =>
          images.map((image) => {
            const rect = image.getBoundingClientRect();
            return [rect.width, rect.height];
          }),
        );
        expect(sizes.length).toBeGreaterThan(0);
        expect(new Set(sizes.map(([width, height]) => `${width}x${height}`)).size).toBe(1);
        expect(sizes[0]).toEqual([56, 56]);
      }
    }
  });

  test("portfolio template screenshot uses its real dimensions and responsive source", async ({ page }) => {
    const res = await page.goto("/portfolio/tileline-bath-tile");
    expect(res?.ok()).toBeTruthy();
    const screenshot = page.locator(".project-shot-section img").first();
    await expect(screenshot).toHaveAttribute("width", "1600");
    await expect(screenshot).toHaveAttribute("height", "8754");
    await expect(screenshot).toHaveAttribute("srcset", /800w.*960w.*1600w/);

    await screenshot.scrollIntoViewIfNeeded();
    await screenshot.evaluate((image: HTMLImageElement) => image.decode());
    const current = await screenshot.evaluate((image: HTMLImageElement) => ({
      source: image.currentSrc,
      pixelRatio: window.devicePixelRatio,
      width: image.naturalWidth,
      height: image.naturalHeight,
    }));
    expect(current.width).toBeGreaterThan(0);
    expect(current.height).toBeGreaterThan(0);
    expect(current.source).toContain(current.pixelRatio > 2 ? "-960.webp" : "-800.webp");
  });

  test("Conferbot widget stays unloaded while public flag is off", async ({ page }) => {
    // Playwright webServer is `npm run dev`, which does not load `.env.production`.
    // Production builds may enable the widget via that file; this suite asserts the
    // default/dev/CI path stays off. Chat is not analytics-gated; flag-off alone
    // must keep the script out even after interaction / idle window.
    test.skip(
      process.env.NEXT_PUBLIC_CONFERBOT_ENABLED === "1",
      "Public widget flag is on in this environment; off-by-default contract N/A",
    );
    await page.goto("/");
    await page.mouse.click(40, 40);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(3_000);
    const loaded = await page.evaluate(() => ({
      script: Boolean(document.getElementById("conferbot-js")),
      srcHits: [...document.scripts].some((s) => (s.src || "").includes("cdn.conferbot.com")),
    }));
    expect(loaded.script).toBe(false);
    expect(loaded.srcHits).toBe(false);
  });

  test("blog cover art loads in listing cards and article heroes at mobile and desktop widths", async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/blog");

      const cards = page.locator(".blog-hub .post__img img");
      await expect(cards.first()).toBeVisible();
      for (const slug of ["plumber-website-cost", "plumbing-website-pages", "hvac-website-cost", "hvac-website-pages", "electrician-website-cost", "electrician-website-pages"]) {
        const card = page.locator(`a[href="/blog/${slug}"] img`);
        await card.scrollIntoViewIfNeeded();
        await expect(card).toBeVisible();
        await expect.poll(() => card.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      }

      for (const slug of ["plumber-website-cost", "plumbing-website-pages", "hvac-website-cost", "hvac-website-pages", "electrician-website-cost", "electrician-website-pages"]) {
        await page.goto(`/blog/${slug}`);
        const hero = page.locator(".blog-post__hero img").first();
        await hero.scrollIntoViewIfNeeded();
        await expect(hero).toBeVisible();
        await expect.poll(() => hero.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      }

      await page.goto("/es/blog");
      const localizedCard = page.locator(".blog-hub .post__img img").first();
      await localizedCard.scrollIntoViewIfNeeded();
      await expect.poll(() => localizedCard.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
  });
});
