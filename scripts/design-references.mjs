import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const sites = [
  ['klientboost', 'https://klientboost.com'], ['highervisibility', 'https://www.highervisibility.com'],
  ['disruptive', 'https://disruptiveadvertising.com'], ['meanpug', 'https://www.meanpug.com'],
  ['chuckwalla', 'https://chuckwalladigital.com'], ['hook', 'https://hookagency.com'],
  ['madebymany', 'https://madebymany.com'], ['upperquad', 'https://upperquad.com'],
  ['dogstudio', 'https://dogstudio.co'], ['ddnyc', 'https://dd.nyc'],
];
await fs.mkdir('.tmp-reference-checks', { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const [name, url] of sites) {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.route('**/*', route => ['GET', 'HEAD'].includes(route.request().method()) && route.request().resourceType() !== 'media' ? route.continue() : route.abort());
    for (const width of [390, 1440]) {
      try {
        await page.setViewportSize({ width, height: 1000 });
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 22000 });
        await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 1500))]));
        await page.screenshot({ path: `.tmp-reference-checks/${name}-${width}.png`, timeout: 10000 });
        results.push({ name, width, url: page.url(), status: response.status(), headings: await page.locator('h1,h2').allTextContents() });
      } catch (error) { results.push({ name, width, error: error.message.slice(0, 200) }); }
    }
    await context.close();
    await fs.writeFile('.tmp-reference-checks/observations.json', JSON.stringify(results, null, 2));
    console.log(`Inspected ${name} mobile and desktop`);
  }
} finally { await browser.close(); }
