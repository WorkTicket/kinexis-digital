import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const out = '/cursor/stores/self/media/agency-redesign';
const artifacts = '/opt/cursor/artifacts/screenshots';
mkdirSync(out, { recursive: true });
mkdirSync(artifacts, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function shot(name, url, opts = {}) {
  const context = await browser.newContext({
    viewport: opts.viewport || { width: 1440, height: 900 },
    colorScheme: opts.colorScheme || 'light',
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    try { localStorage.setItem('kinexis-cookie-consent', 'rejected'); } catch {}
  });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  // dismiss cookie banner if present
  const reject = page.locator('button:has-text("Reject"), button:has-text("Accept")').first();
  if (await reject.count()) {
    await reject.click({ timeout: 2000 }).catch(() => {});
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: false });
  await page.screenshot({ path: `${artifacts}/${name}.png`, fullPage: false });
  console.log('wrote', `${out}/${name}.png`);
  await context.close();
}

await shot('home-hero-desktop', 'http://localhost:3000/');
await shot('home-hero-mobile', 'http://localhost:3000/', {
  viewport: { width: 390, height: 844 },
});
await shot('services-hero-desktop', 'http://localhost:3000/services');
await shot('home-hero-dark', 'http://localhost:3000/', { colorScheme: 'dark' });
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.addInitScript(() => {
    try { localStorage.setItem('kinexis-cookie-consent', 'rejected'); } catch {}
  });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  const reject = page.locator('button:has-text("Reject")').first();
  if (await reject.count()) await reject.click({ timeout: 2000 }).catch(() => {});
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/home-services-section.png`, fullPage: false });
  await page.screenshot({ path: `${artifacts}/home-services-section.png`, fullPage: false });
  console.log('wrote services section');
  await context.close();
}
await browser.close();
