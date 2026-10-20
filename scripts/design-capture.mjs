import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const origin = process.argv[2] || 'https://www.kinexisdigital.com';
const directory = process.argv[3] || 'design/baseline';
const routes = [
  ['home', '/'], ['services', '/services'],
  ['case-study', '/case-studies/landscaping-company-growth'],
  ['contact', '/contact'], ['audit', '/audit'], ['website', '/lp/get-a-website'],
  ...(process.argv[3]?.includes('after') ? [['web-design', '/services/web-design'], ['plumbing', '/industries/plumbing']] : []),
];
await fs.mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const records = [];
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  await context.addCookies([
    { name: 'NEXT_LOCALE', value: 'en', url: origin },
    { name: 'NEXT_LOCALE_CHOICE', value: '1', url: origin },
    { name: 'kinexis-cookie-consent', value: 'rejected', url: origin },
  ]);
  const page = await context.newPage();
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.hostname !== new URL(origin).hostname || !['GET', 'HEAD'].includes(route.request().method())) return route.abort();
    return route.continue();
  });
  for (const [label, route] of routes) {
    for (const width of [390, 768, 1280, 1536]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      const response = await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      // Capture all content rather than Chromium's offscreen content-visibility placeholders.
      await page.addStyleTag({ content: '* { content-visibility: visible !important; scroll-behavior: auto !important; animation: none !important; }' });
      await page.screenshot({ path: path.join(directory, `${label}-${width}.png`), fullPage: true });
      if (label === 'home') await page.screenshot({ path: path.join(directory, `${label}-${width}-viewport.png`) });
      records.push({ label, route, width, status: response.status(), finalUrl: page.url(), title: await page.title(), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) });
    }
    console.log(`Captured ${label}: 390, 768, 1280, 1536`);
  }
  await fs.writeFile(path.join(directory, 'screenshots.json'), JSON.stringify(records, null, 2) + '\n');
} finally { await browser.close(); }
