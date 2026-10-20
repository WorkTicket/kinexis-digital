import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { findLighthouseCli } from './design-tools.mjs';

const base = process.argv[2] || 'https://www.kinexisdigital.com';
const directory = process.argv[3] || 'design/baseline';
const cli = findLighthouseCli();
const routes = [
  ['home', '/'], ['services', '/services'],
  ['case-study', '/case-studies/landscaping-company-growth'],
  ['contact', '/contact'], ['audit', '/audit'], ['website', '/lp/get-a-website'],
];
await fs.mkdir(directory, { recursive: true });
await fs.mkdir('.tmp-design-reports', { recursive: true });
const rows = [];
for (const [name, route] of routes) {
  for (const device of ['mobile', 'desktop']) {
    const reportPath = path.resolve('.tmp-design-reports', `${name}-${device}.json`);
    const args = [cli, `${base}${route}`, '--only-categories=performance,accessibility,best-practices,seo', '--output=json', `--output-path=${reportPath}`, '--chrome-flags=--headless=new --disable-quic', '--quiet', '--extra-headers={"Cookie":"NEXT_LOCALE=en; NEXT_LOCALE_CHOICE=1"}'];
    if (device === 'desktop') args.push('--preset=desktop');
    const code = await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, args, { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
      let error = '';
      child.stderr.on('data', data => { error += data; });
      child.on('error', reject);
      child.on('exit', code => { if (code) console.log(error.slice(-800)); resolve(code); });
    });
    if (code) { rows.push({ name, route, device, error: `Lighthouse exited ${code}` }); continue; }
    const report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
    const row = {
      name, route, device, url: report.finalDisplayedUrl, version: report.lighthouseVersion,
      scores: Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, value.score === null ? null : Math.round(value.score * 100)])),
      metrics: Object.fromEntries(['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time'].map(key => [key, report.audits[key]?.numericValue])),
      issues: Object.values(report.audits).filter(audit => audit.score !== null && audit.score < 1 && audit.details).map(({ id, title, score, displayValue }) => ({ id, title, score, displayValue })),
      warnings: report.runWarnings,
    };
    rows.push(row);
    await fs.writeFile(path.join(directory, 'lighthouse.json'), JSON.stringify(rows, null, 2) + '\n');
    console.log(`${name} ${device}: ${JSON.stringify(row.scores)}, LCP ${Math.round(row.metrics['largest-contentful-paint'])} ms`);
  }
}
const lines = ['# Lighthouse results', '', `Run: ${new Date().toISOString()}. Origin: ${base}. Lighthouse ${rows.find(row => row.version)?.version}; simulated mobile/desktop defaults; English language cookie; first-visit cookie banner retained. No forms or payment buttons used.`, '', '| Page | Device | Performance | Accessibility | Best practices | SEO | LCP (s) | CLS | TBT (ms) |', '|---|---|---:|---:|---:|---:|---:|---:|---:|'];
for (const row of rows) lines.push(row.error ? `| ${row.name} | ${row.device} | ${row.error} | | | | | | |` : `| ${row.name} | ${row.device} | ${row.scores.performance} | ${row.scores.accessibility} | ${row.scores['best-practices']} | ${row.scores.seo} | ${(row.metrics['largest-contentful-paint'] / 1000).toFixed(2)} | ${row.metrics['cumulative-layout-shift'].toFixed(3)} | ${Math.round(row.metrics['total-blocking-time'])} |`);
lines.push('', 'INP requires real interactions and field data; this read-only lab run reports TBT rather than claiming an INP measurement.', '', 'The retired case-study URL redirects to the homepage. Its scores are redirect-destination scores, not evidence that a case-study template exists. See lighthouse.json for final URLs, warnings and failed audit IDs.', '');
await fs.writeFile(path.join(directory, 'lighthouse.md'), lines.join('\n'));
