import fs from 'node:fs/promises';
import { chromium } from 'playwright';
const base = process.argv[2];
const file = process.argv[3];
const browser = await chromium.launch({ headless: true });
const records = [];
try {
  const context = await browser.newContext();
  await context.addCookies([{ name: 'NEXT_LOCALE', value: 'en', url: base }, { name: 'NEXT_LOCALE_CHOICE', value: '1', url: base }]);
  const page = await context.newPage();
  await page.route('**/*', route => new URL(route.request().url()).hostname === new URL(base).hostname && ['GET', 'HEAD'].includes(route.request().method()) ? route.continue() : route.abort());
  for (const path of ['/', '/services', '/contact', '/audit', '/lp/get-a-website', '/privacy', '/terms']) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    records.push({ path, ...(await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      social: [...document.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')].map(el => [el.getAttribute('property') || el.getAttribute('name'), el.content]),
      structuredData: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent)),
    }))) });
  }
  await fs.writeFile(file, JSON.stringify(records, null, 2) + '\n');
  console.log(`Saved SEO snapshot to ${file}`);
} finally { await browser.close(); }
