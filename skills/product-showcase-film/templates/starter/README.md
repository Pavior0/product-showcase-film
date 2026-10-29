# product-showcase-film starter

A product film as code: plain DOM scenes in Vite + TS, one deterministic clock, a paused GSAP timeline, and Playwright → ffmpeg for pixel-exact mp4s. It ships with the `opencode` dogfood film (19.9s, 16:9).

Every frame is a pure function of `t`. Render frame 600 first or last and you get the same pixels.

## Setup

```bash
cp -r starter my-film && cd my-film
npm install
npx playwright install chromium   # once per machine
npm run fonts                     # only if public/fonts/ is missing
```

You also need `ffmpeg` on PATH.

## Commands

| Task | Command | Notes |
| --- | --- | --- |
| Preview + scrubber | `npm run dev` | http://localhost:5179. Space plays, ←/→ steps one frame (Shift: 1s), `?t=8.5` opens at a time. |
| Typecheck | `npm run typecheck` | |
| 1080p60 | `npm run render:1080` | → `out/film-1080p.mp4`. ~106s wall for 19.9s on 8 vCPU with `--workers 3`. |
| 4K60 | `npm run render:4k` | Same page at `deviceScaleFactor 2` → 3840×2160. Not a re-layout. ~625s wall for 19.9s at `--workers 3`. |
| Slice | `node scripts/render.mjs --from 8 --dur 2 --out out/slice.mp4` | Fast iteration on one beat. |
| Stills | `node scripts/stills.mjs 0.3 3 8.5 [--scale 2] [--dir out/stills]` | PNGs for look-dev. Look at them. |
| Determinism | `npm run check:determinism` | Renders 3–5s twice: once in order, once in a shuffled (seeded) order. Compares per-frame sha256 of lossless PNG captures. Exit 1 on mismatch. |
| Cues | `npm run cues` | → `out/cues.json`, plus `out/mix.sh` when `sfx/*.wav` exist. |

`render.mjs` flags:

- `--fps 60`
- `--scale 1|2`
- `--out`
- `--from`, `--dur`
- `--workers 2`: parallel pages, reassembled in order.
- `--format jpeg|png`: jpeg q94 is the default. png is lossless and slower.
- `--quality`
- `--crf`: 16 by default, 18 at 4K.
- `--order seq|shuffle`
- `--hash file`: per-frame sha256.
- `--no-video`

The output is h264, yuv420p, limited-range bt709, `+faststart`.

Note: raw CDP `Page.captureScreenshot` ignores Playwright's `deviceScaleFactor`, so `render.mjs` passes `clip: { …, scale }`. Without it, `--scale 2` silently outputs 1920×1080.

## Layout

```
src/storyboard.ts     scenes, durations, copy, cues. Data only. Edit this first.
src/clock.ts          window.__seek(t): synchronous render, no rAF; rAF tripwire; font gate
src/film.ts           stage + theme vars, master paused GSAP timeline, scene switching, grain
src/scenes/*.ts       one builder per scene kind: plain DOM + render(localT)
src/preview.ts        dev-only scrubber (skipped with ?render)
src/style.css         film styles (2x-unit macro UI, DOF layers, end cards)
themes/               copy of ../themes. Run `npm run sync-themes` after editing the presets.
scripts/render.mjs    Playwright → CDP screenshot → ffmpeg stdin
scripts/determinism.mjs, cues.mjs, stills.mjs, fetch-fonts.mjs
public/fonts/         JetBrains Mono (full glyph set; the Google subset lacks ✓), Inter
```

## Rules the clock enforces

- **No wall clock.** No `Date.now`, `performance.now`, rAF, CSS transitions or `@keyframes`, `<video>.play()`, or `Math.random` in render. `render.mjs` aborts if a seek calls `requestAnimationFrame` and prints the stack.
- **GSAP:**
  - One paused timeline, moved only by `tl.seek(t, true)`.
  - Build tweens as `fromTo(..., { immediateRender: false })`, so any seek order gives the same frame.
  - Keep `gsap.config({ autoSleep: 0 })`. Otherwise every seek wakes the ticker through rAF.
  - Use `motion.gsapEase(theme.easings.x.bezier)`. GSAP ignores CSS `cubic-bezier()` strings.
- **Grain** moves by frame index, not by time or randomness.
- **Fonts** are local and gated on `document.fonts.load`. `window.__ready` resolves only after fonts are loaded and the film is built.

## Audio

The render is silent. `out/cues.json` lists every cue as `{ t, frame, scene, id, sfx }`.

To add sound, drop `sfx/<name>.wav` files, where the name is a storyboard `sfx` id, and run `npm run cues`. Then run:

```bash
sh out/mix.sh out/film-1080p.mp4 out/film-1080p-sfx.mp4
```

The generated graph delays each cue to its time and sums the cues:

```bash
ffmpeg -i film.mp4 -i sfx/click.wav -i sfx/key.wav \
  -filter_complex "[1]adelay=2550|2550[a0];[2]adelay=4750|4750[a1];[a0][a1]amix=inputs=2:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest out.mp4
```

`adelay` takes milliseconds per channel. Use `normalize=0` so many short cues don't get ducked.

## Known gaps

- The wordmark card is a typeset placeholder (`open`/`code`). Drop in the real opencode logo SVG.
- JetBrains Mono stands in for Berkeley Mono, which is licensed.
- The push-in and shot framings are eyeballed against reference stills, not motion-tracked.
- The SFX palette from the reference films was not analyzed. Cues carry ids only.
- 4K is about 6× slower than 1080p (625s vs 106s for 1194 frames at `--workers 3`, 8 vCPU). Each page needs a few hundred MB at 4K, so watch RAM before raising `--workers`.
