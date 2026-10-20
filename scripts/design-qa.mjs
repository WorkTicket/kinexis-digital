import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium, firefox, webkit } from 'playwright';
import { findAxeScript } from './design-tools.mjs';

const base = process.argv[2] || 'http://localhost:3095';
const hostname = new URL(base).hostname;
const axe = await fs.readFile(findAxeScript(), 'utf8');
await fs.mkdir('design/after', { recursive: true });
const results = [];

for (const [name, engine] of [['chromium', chromium], ['firefox', firefox], ['webkit', webkit]]) {
  let browser;
  try { browser = await engine.launch({ headless: true }); }
  catch (error) { console.log(`${name}: ${error.message.split('\n')[0]}`); results.push({ browser: name, error: error.message.split('\n')[0] }); continue; }
  try {
    for (const locale of name === 'chromium' ? ['en', 'es-419', 'es-ES'] : ['en']) {
      for (const theme of name === 'chromium' ? ['light', 'dark'] : ['light']) {
        const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
        await context.addCookies([
          { name: 'NEXT_LOCALE', value: locale, url: base },
          { name: 'NEXT_LOCALE_CHOICE', value: '1', url: base },
          { name: 'kinexis-cookie-consent', value: 'rejected', url: base },
        ]);
        await context.addInitScript(theme => { localStorage.setItem('kinexis-theme', theme); localStorage.setItem('kinexis-cookie-consent', 'rejected'); }, theme);
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.route('**/*', route => new URL(route.request().url()).hostname === hostname && ['GET', 'HEAD'].includes(route.request().method()) ? route.continue() : route.abort());
        const response = await page.goto(base, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        const copy = await page.locator('body').innerText();
        assert(!/[\u00c3\u00c2]/.test(copy));
        assert(!/TODO\(owner\)|Hablamos español|2\.8[×x]|2\.4[×x]|Google Ads Partner|Meta Business Partner|No lock-in|Ecommerce/i.test(copy));
        assert(!/\b(?:common|nav)\.[A-Za-z]/.test(copy), 'Missing client translation');
        assert(!/\b0[1-4]\b/.test(await page.locator('main').innerText()));
        for (const price of ['$97', '$197', '$297', '$1,497']) assert(copy.includes(price));
        assert((await page.title()).includes('$197'));
        assert.equal(await page.locator('h1').count(), 1);
        for (const width of [390, 768, 1280, 1536]) {
          await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow: ${name}/${locale}/${theme}/${width}`);
          assert(await page.locator('h1').evaluate(el => el.scrollWidth <= el.clientWidth));
        }
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        assert(await page.locator('#offer-hero-actions').evaluate(el => el.getBoundingClientRect().bottom < innerHeight), `Hero CTA below desktop fold: ${locale}`);
        if (name === 'chromium') await page.screenshot({ path: `design/after/home-${locale}-${theme}-1440-viewport.png` });
        await page.setViewportSize({ width: 390, height: 844 });
        await page.locator('.site-nav__burger').click();
        await page.waitForSelector('.site-menu');
        await page.keyboard.press('Escape');
        await page.waitForSelector('.site-menu', { state: 'detached' });
        await page.waitForFunction(() => document.activeElement?.matches('.site-nav__burger'));
        await page.locator('.offer-plan__details summary').first().click();
        assert(await page.locator('.offer-plan__details').first().getAttribute('open') !== null);
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        assert(await page.locator('#offer-hero-actions').evaluate(el => el.getBoundingClientRect().bottom < innerHeight - 80), `Hero CTA below mobile fold: ${locale}`);
        if (name === 'chromium') await page.screenshot({ path: `design/after/home-${locale}-${theme}-390-viewport.png` });
        await page.addScriptTag({ content: axe });
        const audit = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
        const serious = audit.violations.filter(issue => ['serious', 'critical'].includes(issue.impact)).map(issue => ({ id: issue.id, impact: issue.impact, nodes: issue.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }));
        const row = { browser: name, locale, theme, errors, serious, violations: audit.violations.map(({ id, impact }) => ({ id, impact })) };
        results.push(row);
        await fs.writeFile('design/after/qa.json', JSON.stringify(results, null, 2) + '\n');
        console.log(`${name}/${locale}/${theme}: ${serious.length} serious/critical accessibility issues; ${errors.length} page errors`);
        await context.close();
      }
    }
  } finally { await browser.close(); }
}
// Conversion pages are inspected without entering or submitting any form data.
{
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await context.addCookies([{ name: 'NEXT_LOCALE', value: 'en', url: base }, { name: 'NEXT_LOCALE_CHOICE', value: '1', url: base }, { name: 'kinexis-cookie-consent', value: 'rejected', url: base }]);
    const page = await context.newPage();
    await page.route('**/*', route => new URL(route.request().url()).hostname === hostname && ['GET', 'HEAD'].includes(route.request().method()) ? route.continue() : route.abort());
    for (const path of ['/contact', '/audit', '/lp/get-a-website', '/services/web-design', '/industries/plumbing']) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      const response = await page.goto(base + path, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path);
      if (path === '/contact') {
        assert.equal(await page.locator('#contact-tab-message').getAttribute('aria-selected'), 'true');
        await page.locator('#contact-tab-message').focus();
        await page.keyboard.press('ArrowRight');
        await page.waitForFunction(() => document.querySelector('#contact-tab-book')?.getAttribute('aria-selected') === 'true');
        await page.keyboard.press('ArrowLeft');
        await page.waitForFunction(() => document.querySelector('#contact-tab-message')?.getAttribute('aria-selected') === 'true');
      }
      await page.addScriptTag({ content: axe });
      const audit = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
      const serious = audit.violations.filter(issue => ['serious', 'critical'].includes(issue.impact)).map(issue => ({ id: issue.id, impact: issue.impact, nodes: issue.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }));
      results.push({ browser: 'chromium', path, locale: 'en', theme: 'light', errors, serious, violations: audit.violations.map(({ id, impact }) => ({ id, impact })) });
      console.log(`${path}: ${serious.length} serious/critical issues; ${errors.length} page errors`);
      page.off('pageerror', onError);
      await fs.writeFile('design/after/qa.json', JSON.stringify(results, null, 2) + '\n');
    }
  } finally { await browser.close(); }
}
await fs.writeFile('design/after/qa.json', JSON.stringify(results, null, 2) + '\n');
if (results.some(row => row.errors?.length || row.serious?.length)) process.exitCode = 1;
