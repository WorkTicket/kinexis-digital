import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base = 'http://127.0.0.1:3021';
const out = 'docs/pay-checkout-design/screenshots';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const locale of ['en', 'es-419', 'es-ES']) {
    for (const theme of ['light', 'dark']) {
    for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
      await context.addCookies([{ name: 'NEXT_LOCALE', value: locale, url: base }, { name: 'NEXT_LOCALE_CHOICE', value: '1', url: base }]);
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.origin !== base || url.pathname.startsWith('/api/')) return route.abort();
        return route.continue();
      });
      await context.addInitScript((theme) => {
        localStorage.setItem('kinexis-theme', theme);
        localStorage.setItem('kinexis-cookie-consent', 'rejected');
        Object.defineProperty(window, 'fbq', { get: () => (command) => { if (command === 'track' || command === 'trackCustom') throw new Error('Unexpected Meta event'); }, set: () => {} });
        Object.defineProperty(window, 'gtag', { get: () => () => {}, set: () => {} });
        window.paypal = { Buttons: options => {
          const button = document.createElement('button');
          button.textContent = document.documentElement.lang.startsWith('es') ? 'Suscribirse con PayPal' : 'Subscribe with PayPal';
          button.style.cssText = 'width:100%;border:0;background:#ffc21a;color:#0a1a4a;border-radius:5px;padding:13px 4px;font:700 13px Arial';
          options.onInit({}, { disable: () => { button.disabled = true; }, enable: () => { button.disabled = false; } });
          return { render: async host => { host.appendChild(button); }, close: async () => { button.remove(); } };
        } };
      }, theme);
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      assert.equal((await page.goto(`${base}/pay`, { waitUntil: 'networkidle' })).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('.pay-card').first().waitFor();
      assert.equal(await page.locator('h1').innerText(), locale === 'en' ? 'Pick your plan' : 'Escoja su plan');
      assert.equal(await page.locator('.pay-card').count(), 4);
      assert.equal(await page.locator('.pay-price').first().innerText(), locale === 'en' ? '$97 /mo' : '$97 /mes');
      assert.equal(await page.locator('#plan-terms').isChecked(), false);
      assert.equal(await page.locator('#plan-leadSystem').isChecked(), true);
      assert.equal(await page.locator('.pay-button-wrap').getAttribute('aria-disabled'), 'true');
      assert.equal(await page.locator('#pay-amount').count(), 1);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (device === 'mobile') {
        const positions = await page.locator('.pay-card').evaluateAll(cards => cards.map(card => card.getBoundingClientRect().top));
        assert(positions[1] < positions[0]);
      }
      // Reveal the existing invoice section before capturing the whole document.
      await page.locator('#pay-amount').scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      // Full-page captures otherwise omit offscreen content-visibility chapters.
      await page.locator('#pay-invoice').evaluate(element => { element.style.contentVisibility = 'visible'; });
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `${out}/pay-${locale}-${theme}-${device}.png`, fullPage: true });
      // Exercise plan choices, agreement and FAQ; never click any payment button.
      await page.locator('#plan-terms').check();
      await page.locator('label[for="plan-ownIt"]').click();
      assert.equal(await page.locator('.pay-own').getAttribute('href'), 'https://www.paypal.com/ncp/payment/24TVQPFTKBCGW');
      assert.match(await page.locator('.pay-summary-price').innerText(), /1,497/);
      await page.locator('#plan-terms').uncheck();
      assert.equal(await page.locator('.pay-own').getAttribute('href'), null);
      await page.locator('label[for="plan-plus"]').click();
      assert.match(await page.locator('.pay-summary-price').innerText(), /297/);
      assert.equal(await page.locator('.pay-features li').count(), 5);
      assert.equal(await page.locator('.pay-button-wrap').getAttribute('aria-disabled'), 'true');
      // Native radio arrow-key navigation must keep selection and summary aligned.
      await page.locator('#plan-plus').focus();
      await page.keyboard.press('ArrowLeft');
      assert.equal(await page.locator('#plan-leadSystem').isChecked(), true);
      assert.match(await page.locator('.pay-summary-price').innerText(), /197/);
      await page.locator('.pay-faq summary').first().click();
      assert.equal(await page.locator('.pay-faq details').first().getAttribute('open'), '');
      await page.locator('footer button[lang="es-419"]').click();
      await page.waitForFunction(() => document.querySelector('h1')?.textContent === 'Escoja su plan');
      await page.goto(`${base}/pay/thanks?plan=leadSystem&sid=I-TEST123456`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('code').innerText(), 'I-TEST123456');
      assert.match(await page.locator('meta[name=robots]').getAttribute('content'), /noindex/);
      // Restore the requested locale via footer, then restore query removed by the existing switcher.
      await page.locator(`footer button[lang="${locale}"]`).click();
      await page.waitForFunction(expected => document.documentElement.lang === expected, locale);
      await page.waitForLoadState('networkidle');
      await page.goto(`${base}/pay/thanks?plan=leadSystem&sid=I-TEST123456`, { waitUntil: 'networkidle' });
      await page.goto(`${base}/pay/thanks?plan=invalid&sid=%3Cscript%3E`, { waitUntil: 'networkidle' });
      assert.notEqual(await page.locator('code').innerText(), '<script>');
      assert.deepEqual(errors, []);
      results.push({ locale, theme, device, status: 'passed' });
      await context.close();
    }
    }
  }
} finally { await browser.close(); }
fs.writeFileSync('docs/pay-checkout-design/qa-results.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results));
