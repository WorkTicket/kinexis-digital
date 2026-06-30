/**
 * Start Next.js dev and suppress harmless Watchpack scan warnings on Windows.
 * Webpack walks parent directories up to C:\ and logs EINVAL for protected
 * system files (pagefile.sys, swapfile.sys). These do not affect hot reload.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");

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

function wrapStream(stream) {
  const originalWrite = stream.write.bind(stream);

  stream.write = (chunk, encoding, callback) => {
    if (shouldSuppress(chunk)) {
      if (typeof encoding === "function") {
        encoding();
      } else if (typeof callback === "function") {
        callback();
      }
      return true;
    }

    return originalWrite(chunk, encoding, callback);
  };
}

wrapStream(process.stderr);

const child = spawn(process.execPath, [nextBin, "dev"], {
  stdio: ["inherit", "inherit", "pipe"],
  env: process.env,
});

child.stderr.on("data", (chunk) => {
  if (!shouldSuppress(chunk)) {
    process.stderr.write(chunk);
  }
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
