import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export function findLighthouseCli() {
  if (process.env.LIGHTHOUSE_CLI) return path.resolve(process.env.LIGHTHOUSE_CLI);
  try { return require.resolve('lighthouse/cli/index.js'); } catch { /* Check npm's existing tool cache. */ }
  const cache = process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx')
    : path.join(os.homedir(), '.npm', '_npx');
  if (fs.existsSync(cache)) {
    for (const directory of fs.readdirSync(cache).sort()) {
      const candidate = path.join(cache, directory, 'node_modules/lighthouse/cli/index.js');
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  throw new Error('Install Lighthouse as an audit tool or set LIGHTHOUSE_CLI to its cli/index.js file. Project dependencies are not changed by this script.');
}

export function findAxeScript() {
  if (process.env.AXE_CORE_PATH) return path.resolve(process.env.AXE_CORE_PATH);
  try { return require.resolve('axe-core/axe.min.js'); } catch { /* Lighthouse includes axe-core. */ }
  return createRequire(findLighthouseCli()).resolve('axe-core/axe.min.js');
}
