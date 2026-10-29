#!/usr/bin/env node
/** Grab PNG stills at given times for look-dev:  node scripts/stills.mjs 0.3 3 6.5 [--theme id] [--scale 1] [--dir out/stills/<theme>] */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(`--${n}`) ? argv[argv.indexOf(`--${n}`) + 1] : d);
const scale = Number(opt("scale", 1));
const theme = opt("theme", process.env.VITE_THEME || "opencode");
const dir = path.resolve(root, opt("dir", `out/stills/${theme}`));
const times = argv.filter((a, i) => !a.startsWith("--") && !argv[i - 1]?.startsWith("--")).map(Number);
fs.mkdirSync(dir, { recursive: true });
const server = await createServer({ root, logLevel: "error", server: { port: 0 } });
await server.listen();
const browser = await chromium.launch({ args: ["--force-color-profile=srgb", "--disable-lcd-text", "--font-render-hinting=none", "--hide-scrollbars", "--disable-partial-raster", "--disable-low-res-tiling"] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: scale });
page.on("pageerror", (e) => console.error("[page]", e.message));
await page.goto(`${server.resolvedUrls.local[0]}?render=1&theme=${encodeURIComponent(theme)}`);
await page.evaluate(() => window.__ready);
const size = await page.evaluate(() => ({ width: window.__width, height: window.__height }));
await page.setViewportSize(size);
for (const t of times) {
  await page.evaluate((t) => window.__seek(t), t);
  const f = path.join(dir, `t_${t.toFixed(2)}.png`);
  await page.screenshot({ path: f });
  console.log(f);
}
await browser.close();
await server.close();
