import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = path.join(root, "preview-pages");
const outDir = path.join(root, "previews");
fs.mkdirSync(outDir, { recursive: true });

const only = process.argv.slice(2);
const allThemes = [
  { id: "event-noir", w: 1920, h: 1080 },
  { id: "paper-editorial", w: 1920, h: 1080 },
  { id: "terminal-mono", w: 1920, h: 1080 },
  { id: "warm-consumer", w: 1920, h: 1080 },
  { id: "social-reel", w: 1080, h: 1920 },
  { id: "opencode", w: 1920, h: 1080 },
  { id: "linear", w: 1920, h: 1080 },
];
const themes = only.length ? allThemes.filter((t) => only.includes(t.id)) : allThemes;

const browser = await chromium.launch({ headless: true });
for (const t of themes) {
  const page = await browser.newPage({
    viewport: { width: t.w, height: t.h },
    deviceScaleFactor: 1,
  });
  await page.goto("file://" + path.join(pagesDir, `${t.id}.html`), {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(600);
  // Force exact frame size (locator bbox can drift under font/layout)
  await page.screenshot({
    path: path.join(outDir, `${t.id}.png`),
    type: "png",
    clip: { x: 0, y: 0, width: t.w, height: t.h },
  });
  console.log("shot", t.id, `${t.w}x${t.h}`);
  await page.close();
}
await browser.close();
