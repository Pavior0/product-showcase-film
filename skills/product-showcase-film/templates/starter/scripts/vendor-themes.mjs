#!/usr/bin/env node
/**
 * The starter reads presets from the skill's shared ../../themes through the `@themes` alias.
 * Copying the starter out of the skill? Vendor a snapshot first:
 *
 *   node scripts/vendor-themes.mjs           # copy ../../themes → ./themes (alias then prefers it)
 *   node scripts/vendor-themes.mjs --check   # exit 1 if ./themes differs from ../../themes
 *
 * Without ./themes nothing is copied, so nothing can drift.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.resolve(root, "../../themes");
const dst = path.join(root, "themes");
const list = (d) =>
  fs.existsSync(d) ? fs.readdirSync(d).filter((f) => /\.(ts|css)$/.test(f)).sort() : [];

if (process.argv.includes("--check")) {
  if (!fs.existsSync(dst)) {
    console.log("no vendored ./themes → starter uses ../../themes directly (no drift possible)");
    process.exit(0);
  }
  if (!fs.existsSync(src)) {
    console.log("standalone copy: ../../themes not found, nothing to compare");
    process.exit(0);
  }
  const a = list(src), b = list(dst);
  const drift = [...new Set([...a, ...b])].filter(
    (f) => !a.includes(f) || !b.includes(f) || !fs.readFileSync(path.join(src, f)).equals(fs.readFileSync(path.join(dst, f))),
  );
  if (drift.length) {
    console.error(`themes drift: ${drift.join(", ")}\nrun: npm run vendor-themes`);
    process.exit(1);
  }
  console.log(`themes in sync (${a.length} files)`);
  process.exit(0);
}

if (!fs.existsSync(src)) throw new Error(`${src} not found — run this inside the skill checkout`);
fs.rmSync(dst, { recursive: true, force: true });
fs.mkdirSync(dst);
for (const f of list(src)) fs.copyFileSync(path.join(src, f), path.join(dst, f));
console.log(`vendored ${list(dst).length} files → ./themes`);
