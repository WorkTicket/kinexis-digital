/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");

// On Windows, rapid concurrent directory creations can trigger transient
// ERROR_ACCESS_DENIED (EPERM) while NTFS releases directory handles.
// This patch transparently retries mkdir up to 5 times.

const origMkdir = fs.mkdir;
const origMkdirSync = fs.mkdirSync;
const origPromisesMkdir = fs.promises.mkdir;

function sleepSync(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

fs.mkdirSync = function (path, options) {
  let attempts = 0;
  while (true) {
    try {
      return origMkdirSync.call(fs, path, options);
    } catch (err) {
      if (err && err.code === "EPERM" && attempts < 5) {
        attempts++;
        sleepSync(15);
        continue;
      }
      throw err;
    }
  }
};

fs.mkdir = function (path, options, callback) {
  let cb = callback;
  let opts = options;
  if (typeof options === "function") {
    cb = options;
    opts = {};
  }
  let attempts = 0;
  function attempt() {
    origMkdir.call(fs, path, opts, (err, res) => {
      if (err && err.code === "EPERM" && attempts < 5) {
        attempts++;
        setTimeout(attempt, 15);
        return;
      }
      if (cb) cb(err, res);
    });
  }
  attempt();
};

fs.promises.mkdir = async function (path, options) {
  let attempts = 0;
  while (true) {
    try {
      return await origPromisesMkdir.call(fs.promises, path, options);
    } catch (err) {
      if (err && err.code === "EPERM" && attempts < 5) {
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 15));
        continue;
      }
      throw err;
    }
  }
};
