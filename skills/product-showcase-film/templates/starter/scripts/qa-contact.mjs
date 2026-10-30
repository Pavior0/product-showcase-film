#!/usr/bin/env node
/**
 * One contact sheet from still times (or an existing stills dir).
 *   node scripts/qa-contact.mjs 0.3 3 5.4 8 --theme id --cols 4
 *   node scripts/qa-contact.mjs --dir out/stills/qa --cols 4 --out out/qa-contact.png
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(`--${n}`) ? argv[argv.indexOf(`--${n}`) + 1] : d);
const theme = opt("theme", process.env.VITE_THEME || "opencode");
const cols = Number(opt("cols", "4"));
const out = path.resolve(root, opt("out", `out/qa-contact-${theme}.png`));
const dirFlag = opt("dir", null);
const times = argv.filter((a, i) => !a.startsWith("--") && !argv[i - 1]?.startsWith("--")).map(Number);

let dir = dirFlag ? path.resolve(root, dirFlag) : path.resolve(root, `out/stills/qa-${theme}`);
if (times.length) {
  fs.mkdirSync(dir, { recursive: true });
  const stills = pathToFileURL(path.join(root, "scripts/stills.mjs")).pathname;
  const r = spawnSync(process.execPath, [stills, ...times.map(String), "--theme", theme, "--dir", dir], {
    stdio: "inherit",
    cwd: root,
  });
  if (r.status) process.exit(r.status ?? 1);
}

const frames = fs
  .readdirSync(dir)
  .filter((f) => /\.png$/i.test(f))
  .sort()
  .map((f) => path.join(dir, f));
if (!frames.length) {
  console.error("no pngs in", dir);
  process.exit(1);
}
const rows = Math.ceil(frames.length / cols);
const list = path.join(dir, "_sheet.txt");
fs.writeFileSync(list, frames.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join("\n"));
// tile via ffmpeg concat demuxer + tile filter needs image2; simpler: montage-like with tile after sequential decode
const args = ["-y"];
for (const f of frames) args.push("-i", f);
args.push(
  "-filter_complex",
  `tile=${cols}x${rows}:margin=8:padding=8`,
  "-frames:v",
  "1",
  out,
);
const ff = spawnSync("ffmpeg", args, { stdio: "inherit" });
if (ff.status) process.exit(ff.status ?? 1);
console.log(out);
