#!/usr/bin/env node
/**
 * One-shot page→screen framing probe. Run BEFORE crop/scale/y loops.
 *   node scripts/probe-framing.mjs [--theme id] [--t 1.5] [--selector .stage]
 * Writes out/probe/<theme>.json and prints suggestedCrop / suggestedY.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(`--${n}`) ? argv[argv.indexOf(`--${n}`) + 1] : d);
const theme = opt("theme", process.env.VITE_THEME || "opencode");
const t = Number(opt("t", "1"));
const selector = opt("selector", "[data-film-stage], .stage, #stage, body");
const outDir = path.resolve(root, "out/probe");
fs.mkdirSync(outDir, { recursive: true });

const server = await createServer({ root, logLevel: "error", server: { port: 0 } });
await server.listen();
const browser = await chromium.launch({
  args: ["--force-color-profile=srgb", "--disable-lcd-text", "--font-render-hinting=none", "--hide-scrollbars"],
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(`${server.resolvedUrls.local[0]}?render=1&theme=${encodeURIComponent(theme)}`);
await page.evaluate(() => window.__ready);
const size = await page.evaluate(() => ({ width: window.__width ?? 1920, height: window.__height ?? 1080 }));
await page.setViewportSize(size);
await page.evaluate((tt) => window.__seek?.(tt), t);

const probe = await page.evaluate((sel) => {
  const el = document.querySelector(sel) || document.body;
  const r = el.getBoundingClientRect();
  const ancestorScales = [];
  let n = el;
  let sx = 1, sy = 1;
  while (n && n !== document.documentElement) {
    const cs = getComputedStyle(n);
    const tr = cs.transform;
    if (tr && tr !== "none") {
      const m = new DOMMatrixReadOnly(tr);
      ancestorScales.push({ tag: n.className || n.id || n.tagName, a: m.a, d: m.d });
      sx *= m.a;
      sy *= m.d;
    }
    n = n.parentElement;
  }
  const sidebar =
    [...document.querySelectorAll("aside, [data-rail], .rail, .sidebar")]
      .map((e) => e.getBoundingClientRect().width)
      .reduce((a, b) => a + b, 0) || 0;
  const stageW = r.width;
  const stageH = r.height;
  const targetW = window.__width ?? window.innerWidth;
  const targetH = window.__height ?? window.innerHeight;
  const effectiveScale = Math.min(targetW / (stageW / sx || 1), targetH / (stageH / sy || 1));
  // suggested crop ≈ inverse of leftover zoom from ancestor scales (if content is overscaled)
  const suggestedCrop = Number((1 / Math.max(sx, sy)).toFixed(3));
  const suggestedY = Math.round(Math.max(0, (stageH - targetH / Math.max(sx, sy)) / 2));
  return {
    selector: sel,
    stageW, stageH, targetW, targetH,
    ancestorScales,
    scaleX: sx,
    scaleY: sy,
    effectiveScale,
    sidebarPx: sidebar,
    suggestedCrop,
    suggestedY,
  };
}, selector);

const out = path.join(outDir, `${theme}.json`);
fs.writeFileSync(out, JSON.stringify({ theme, t, ...probe }, null, 2));
console.log(out);
console.log(JSON.stringify(probe, null, 2));
await browser.close();
await server.close();
