#!/usr/bin/env node
/**
 * Deterministic frame renderer: Vite (in-process) → headless Chromium → ffmpeg stdin.
 *
 *   node scripts/render.mjs --fps 60 --scale 1 --out out/film-1080p.mp4
 *   node scripts/render.mjs --scale 2 --out out/film-4k.mp4            # 3840x2160
 *   node scripts/render.mjs --from 3 --dur 2 --out out/slice.mp4        # slice
 *   node scripts/render.mjs --from 3 --dur 2 --hash out/a.txt --no-video --order shuffle
 *
 * Flags: --fps N (60) --scale 1|2 (1) --out file.mp4 --from s (0) --dur s (to end)
 *        --format jpeg|png (jpeg) --quality 0-100 (94) --crf N (16 @1080, 18 @4K)
 *        --workers N (2) --order seq|shuffle (seq) --hash file --no-video --audio mix.wav
 */
import { spawn } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const flag = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  if (i < 0) return def;
  const v = argv[i + 1];
  return v === undefined || v.startsWith("--") ? true : v;
};
const fps = Number(flag("fps", 60));
const scale = Number(flag("scale", 1));
const out = path.resolve(root, String(flag("out", `out/film-${scale === 2 ? "4k" : "1080p"}.mp4`)));
const from = Number(flag("from", 0));
const durArg = flag("dur", null);
const format = String(flag("format", "jpeg"));
const quality = Number(flag("quality", 94));
const crf = Number(flag("crf", scale >= 2 ? 18 : 16));
const workers = Math.max(1, Number(flag("workers", 2)));
const order = String(flag("order", "seq"));
const hashOut = flag("hash", null);
const noVideo = argv.includes("--no-video");
const audio = flag("audio", null);

const t0 = Date.now();
const server = await createServer({ root, logLevel: "error", server: { port: 0, strictPort: false } });
await server.listen();
const url = `${server.resolvedUrls.local[0]}?render=1`;

const browser = await chromium.launch({
  args: ["--force-color-profile=srgb", "--disable-lcd-text", "--font-render-hinting=none", "--hide-scrollbars"],
});

async function openPage() {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: scale });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.error("[page]", e.message));
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => window.__ready);
  const cdp = await ctx.newCDPSession(page);
  return { page, cdp };
}

const pages = await Promise.all(Array.from({ length: workers }, openPage));
const duration = await pages[0].page.evaluate(() => window.__duration);
const dur = durArg == null ? duration - from : Number(durArg);
const first = Math.round(from * fps);
const count = Math.max(1, Math.round(dur * fps));
const frames = Array.from({ length: count }, (_, i) => first + i);

// shuffle with a fixed LCG so "--order shuffle" is itself reproducible
if (order === "shuffle") {
  let s = 1234567;
  for (let i = frames.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) >>> 0;
    const j = s % (i + 1);
    [frames[i], frames[j]] = [frames[j], frames[i]];
  }
}

let ff = null;
if (!noVideo) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const args = ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", format === "png" ? "png" : "mjpeg", "-i", "-"];
  if (audio) args.push("-ss", String(from), "-i", String(audio));
  // JPEG frames decode as full-range yuvj420p; convert explicitly to limited-range bt709 4:2:0,
  // or ffmpeg passes yuvj420p through and players disagree on levels.
  args.push("-vf", "scale=w=iw:h=ih:out_range=tv:out_color_matrix=bt709,format=yuv420p");
  args.push("-c:v", "libx264", "-preset", "medium", "-crf", String(crf), "-r", String(fps));
  args.push("-color_range", "tv", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709");
  if (audio) args.push("-c:a", "aac", "-b:a", "192k", "-shortest");
  else args.push("-an");
  args.push("-movflags", "+faststart", out);
  ff = spawn("ffmpeg", args, { stdio: ["pipe", "inherit", "inherit"] });
}
const write = (buf) =>
  new Promise((res, rej) => (ff.stdin.write(buf, (e) => (e ? rej(e) : res())))); // backpressure-safe

const hashes = new Map();
const pending = new Map(); // frame -> buffer, for in-order piping when workers > 1
let nextOut = first;
let done = 0;
let lastLog = 0;

async function capture({ page, cdp }, frame) {
  const raf = await page.evaluate((t) => {
    const before = window.__rafDuringSeek;
    window.__seek(t);
    return window.__rafDuringSeek - before ? window.__rafStack : "";
  }, frame / fps);
  if (raf) throw new Error(`frame ${frame}: render called requestAnimationFrame — frames must not depend on the wall clock\n${raf}`);
  const { data } = await cdp.send("Page.captureScreenshot", {
    format,
    ...(format === "jpeg" ? { quality } : {}),
    optimizeForSpeed: true,
    fromSurface: true,
    captureBeyondViewport: false,
    // Raw CDP ignores Playwright's deviceScaleFactor and returns CSS-pixel size (1920×1080 at
    // --scale 2). clip.scale makes it return device pixels; verified pixel-identical to page.screenshot().
    clip: { x: 0, y: 0, width: 1920, height: 1080, scale },
  });
  return Buffer.from(data, "base64");
}

let cursor = 0;
async function worker(p) {
  while (cursor < frames.length) {
    const frame = frames[cursor++];
    const buf = await capture(p, frame);
    if (hashOut) hashes.set(frame, crypto.createHash("sha256").update(buf).digest("hex"));
    if (ff) {
      pending.set(frame, buf);
      while (pending.has(nextOut)) {
        const b = pending.get(nextOut);
        pending.delete(nextOut);
        nextOut++;
        await write(b);
      }
    }
    done++;
    if (Date.now() - lastLog > 5000) {
      lastLog = Date.now();
      const el = (Date.now() - t0) / 1000;
      process.stdout.write(`  ${done}/${count} frames  ${el.toFixed(0)}s  ${(done / el).toFixed(1)} fps\n`);
    }
  }
}
await Promise.all(pages.map(worker));

if (ff) {
  ff.stdin.end();
  const code = await new Promise((r) => ff.on("close", r));
  if (code !== 0) throw new Error(`ffmpeg exited ${code}`);
}
if (hashOut) {
  const lines = [...hashes.entries()].sort((a, b) => a[0] - b[0]).map(([f, h]) => `${f} ${h}`);
  fs.mkdirSync(path.dirname(path.resolve(root, hashOut)), { recursive: true });
  fs.writeFileSync(path.resolve(root, hashOut), lines.join("\n") + "\n");
}
await browser.close();
await server.close();
const secs = (Date.now() - t0) / 1000;
console.log(
  JSON.stringify({ out: ff ? out : null, frames: count, fps, scale, size: `${1920 * scale}x${1080 * scale}`, from, dur: count / fps, order, workers, wallSec: Number(secs.toFixed(1)) }),
);
