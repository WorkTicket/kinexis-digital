/**
 * Start Next.js dev and suppress harmless Watchpack scan warnings on Windows.
 * Webpack walks parent directories up to C:\ and logs EINVAL for protected
 * system files (pagefile.sys, swapfile.sys). These do not affect hot reload.
 *
 * Also reclaims port 3000 when a stale Next process from this repo is holding
 * it, so we don't silently hop to 3001/3002 with a half-dead stack.
 */
import { spawn, execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const PORT = Number(process.env.PORT || 3000);

const suppressedPatterns = [
  /Watchpack Error \(initial scan\): Error: EINVAL: invalid argument, lstat 'C:\\(?:pagefile|swapfile|hiberfil)\.sys'/,
  /Watchpack Error \(initial scan\): Error: EINVAL: invalid argument, lstat 'C:\\DumpStack\.log\.tmp'/,
  /Watchpack Error \(stats\): Error: EINVAL: invalid argument, lstat 'C:\\(?:pagefile|swapfile|hiberfil)\.sys'/,
];

function shouldSuppress(chunk) {
  if (process.platform !== "win32") {
    return false;
  }

  const text = typeof chunk === "string" ? chunk : chunk.toString("utf8");
  return suppressedPatterns.some((pattern) => pattern.test(text));
}

function isProjectNodeCommand(commandLine) {
  if (!commandLine) return false;
  const normalized = commandLine.replace(/\\/g, "/").toLowerCase();
  const rootNorm = root.replace(/\\/g, "/").toLowerCase();
  return (
    normalized.includes(rootNorm) &&
    (normalized.includes("scripts/dev") ||
      normalized.includes("next/dist/bin/next") ||
      normalized.includes("next/dist/server/lib/start-server") ||
      /\bnext\s+dev\b/.test(normalized))
  );
}

function killPid(pid) {
  try {
    if (process.platform === "win32") {
      execSync(`taskkill /PID ${pid} /T /F`, {
        stdio: ["ignore", "ignore", "ignore"],
      });
    } else {
      process.kill(pid, "SIGTERM");
    }
  } catch {
    /* already gone */
  }
}

function listProjectNodePids() {
  if (process.platform !== "win32") return [];
  try {
    const out = execSync(
      `powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \\"Name = 'node.exe'\\" | ForEach-Object { $_.ProcessId.ToString() + '|' + $_.CommandLine }"`,
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    return out
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const idx = line.indexOf("|");
        if (idx < 0) return null;
        const pid = Number(line.slice(0, idx));
        const commandLine = line.slice(idx + 1);
        if (!Number.isFinite(pid) || !isProjectNodeCommand(commandLine)) {
          return null;
        }
        return pid;
      })
      .filter((pid) => pid != null && pid !== process.pid);
  } catch {
    return [];
  }
}

function reclaimPort(port) {
  // Kill leftover project Next stacks first (covers port hoppers on 3001+).
  for (const pid of listProjectNodePids()) {
    console.warn(`Stopping stale project Next process ${pid}…`);
    killPid(pid);
  }

  if (process.platform !== "win32") return;

  try {
    const out = execSync(
      `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique"`,
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();

    if (!out) return;

    for (const raw of out.split(/\r?\n/)) {
      const pid = Number(raw.trim());
      if (!Number.isFinite(pid) || pid <= 0 || pid === process.pid) continue;

      let commandLine = "";
      try {
        commandLine = execSync(
          `powershell -NoProfile -Command "(Get-CimInstance Win32_Process -Filter \\"ProcessId=${pid}\\").CommandLine"`,
          { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
        ).trim();
      } catch {
        continue;
      }

      if (!isProjectNodeCommand(commandLine)) {
        console.warn(
          `Port ${port} is held by PID ${pid} (not a project Next process); leaving it alone.`,
        );
        continue;
      }

      console.warn(`Reclaiming port ${port} from stale Next process ${pid}…`);
      killPid(pid);
    }
  } catch {
    /* port free or powershell unavailable */
  }
}

reclaimPort(PORT);

const child = spawn(process.execPath, [nextBin, "dev", "-p", String(PORT)], {
  stdio: ["inherit", "inherit", "pipe"],
  env: process.env,
  cwd: root,
  windowsHide: true,
});

child.stderr.on("data", (chunk) => {
  if (!shouldSuppress(chunk)) {
    process.stderr.write(chunk);
  }
});

function shutdown(signal) {
  if (child.pid) killPid(child.pid);
  if (signal) {
    process.exit(0);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGHUP", () => shutdown("SIGHUP"));
process.on("exit", () => {
  if (child.pid) {
    try {
      killPid(child.pid);
    } catch {
      /* ignore */
    }
  }
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.exit(0);
    return;
  }
  process.exit(code ?? 0);
});
