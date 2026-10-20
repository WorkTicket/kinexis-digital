import { chromium } from "playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";

// Read-only browser QA: no form submits, API calls, or external tracking traffic.
const origin = process.env.SITE_FIXES_ORIGIN || "http://localhost:3100";
const output = "docs/site-fixes/screenshots";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const checks = [];
const blocked = [];
async function context(locale = "en", consent = true) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, serviceWorkers: "block" });
  await ctx.route("**/*", route => {
    const req = route.request();
    if (req.method() !== "GET" || new URL(req.url()).origin !== origin || new URL(req.url()).pathname.startsWith("/api/")) {
      blocked.push({ method: req.method(), origin: new URL(req.url()).origin });
      return route.abort();
    }
    return route.continue();
  });
  await ctx.addCookies([
    { name: "NEXT_LOCALE", value: locale, url: origin },
    { name: "NEXT_LOCALE_CHOICE", value: "1", url: origin },
    ...(consent ? [{ name: "kinexis-cookie-consent", value: "accepted", url: origin }] : []),
  ]);
  return ctx;
}
try {
  for (const locale of ["en", "es-419", "es-ES"]) {
    const ctx = await context(locale);
    const page = await ctx.newPage();
    for (const path of ["terms", "privacy", "intake"]) {
      const res = await page.goto(`${origin}/${path}`, { waitUntil: "networkidle" });
      assert.equal(res.status(), 200);
      await page.locator("main h1").waitFor();
      await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
      const title = await page.locator("main h1").innerText();
      const body = await page.locator("main").innerText();
      assert(!/\[LEGAL|\[ATTORNEY|\{\{|Stripe|BORRADOR|DRAFT/.test(body));
      if (locale === "en") assert(/Terms|Privacy|Get started/.test(title));
      else assert(/Términos|Privacidad|Empecemos/.test(title));
      if (path === "intake") {
        assert.equal(await page.locator('[name="smsConsent"]').isChecked(), false);
        assert.equal(await page.locator('[name="smsConsent"]').getAttribute("required"), null);
        assert.equal(await page.locator('[name="authName"], [name="competitor1Name"], [name="adsBudget"]').count(), 0);
        await page.locator('[name="trade"]').selectOption("Plumbing");
        assert.equal(await page.locator('[name="licenseNumber"]').getAttribute("required"), "");
        await page.locator('[name="trade"]').selectOption("Roofing");
        assert.equal(await page.locator('[name="licenseNumber"]').getAttribute("required"), null);
        assert(await page.getByText(locale === "en" ? "Texas rule for roofers:" : "Regla de Texas para techeros:", { exact: false }).isVisible());
        await page.locator('[name="trade"]').selectOption("");
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (locale !== "es-ES") {
        await page.screenshot({ path: `${output}/${path}-${locale}-desktop.png` });
        await page.setViewportSize({ width: 390, height: 844 });
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await page.screenshot({ path: `${output}/${path}-${locale}-mobile.png` });
        await page.setViewportSize({ width: 1440, height: 1000 });
      }
      checks.push({ locale, path, title });
    }
    await ctx.close();
  }
  const ctx = await context("en", false);
  const page = await ctx.newPage();
  for (const path of ["terms", "privacy", "intake"]) {
    await ctx.addCookies([{ name: "NEXT_LOCALE", value: "en", url: origin }]);
    await page.goto(`${origin}/es/${path}`, { waitUntil: "networkidle" });
    assert.equal(new URL(page.url()).pathname, `/${path}`);
    assert.equal((await ctx.cookies()).find(c => c.name === "NEXT_LOCALE")?.value, "es-419");
  }
  await page.goto(`${origin}/terms`, { waitUntil: "networkidle" });
  await page.locator('.terms-document button[lang="en"]').click();
  await page.waitForFunction(() => document.querySelector("main h1")?.textContent?.includes("Terms of Service"));
  if (await page.locator(".cookie-banner").isVisible()) await page.locator('.cookie-banner button').first().click();
  await page.locator('.site-footer button[lang="es-419"]').click();
  await page.waitForFunction(() => document.querySelector("main h1")?.textContent?.includes("Términos"));
  await ctx.close();
  // Pixel queue is inspected with all vendor scripts blocked by the route guard.
  {
  const ctx = await context("en", false);
  const page = await ctx.newPage();
  await page.goto(`${origin}/lp/get-a-website`, { waitUntil: "networkidle" });
  const queue = () => page.evaluate(() => (window.fbq?.queue || []).map(args => Array.from(args)));
  const before = await queue();
  assert(before.some(a => a[0] === "consent" && a[1] === "revoke"));
  assert(!before.some(a => a[0] === "consent" && a[1] === "grant"));
  await page.locator('.cookie-banner button').last().click();
  await page.waitForFunction(() => (window.fbq?.queue || []).some(args => args[0] === "consent" && args[1] === "grant"));
  await page.getByRole("button", { name: "Cookie settings", exact: true }).click();
  assert(await page.locator(".cookie-banner").isVisible());
  await page.locator('.cookie-banner button').first().click();
  assert(!(await page.locator(".cookie-banner").isVisible()));
  assert.equal(blocked.filter(req => req.method === "POST").length, 0, "The QA flow must never try to POST");
  await fs.writeFile("docs/site-fixes/browser-checks.json", JSON.stringify({ checks, consent: "default revoke → explicit accept → reopen → reject", spanishRedirects: true, externalRequestsBlocked: blocked.length, postsAttempted: 0 }, null, 2) + "\n");
  console.log("All read-only site-fixes browser checks passed; 12 screenshots saved. No POSTs attempted.");
  await ctx.close();
  }
} finally {
  await browser.close();
}
