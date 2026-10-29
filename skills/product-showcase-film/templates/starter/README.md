# product-showcase-film starter

A product film as code: plain DOM scenes in Vite + TS, one deterministic clock, a paused GSAP timeline, and Playwright → ffmpeg for pixel-exact mp4s.

Every frame is a pure function of `t`. Render frame 600 first or last and you get the same pixels.

## One switch, every preset

The starter ships one example storyboard per theme preset and switches between them with a single id:

```bash
npm run dev                                   # http://localhost:5179/?theme=cursor
node scripts/render.mjs --theme vercel        # → out/vercel-1080p.mp4
VITE_THEME=granola npm run render:1080        # same switch via env
```

Resolution order: `?theme=` URL param → `VITE_THEME` → `opencode`. Frame size and fps come from the preset's `frame` (social-reel is 1080×1920; cursor, vercel, granola and stripe-terminal are 30fps; the rest are 60fps). The scripts read them from the page, so you never pass a size.

| `--theme` | Example storyboard (`src/storyboards/<id>.ts`) |
| --- | --- |
| `opencode` | halftone opener → tilted macro app push-in → lowercase mono end cards (19.9s dogfood film) |
| `linear` | orbit HUD with mono node labels → tilted dark window + pointer → blur-in/brighten end card → black → mark |
| `linear-light` | cut chapter title → flat light window with cross-dissolve swap → mark |
| `cursor` | word-by-word captions on white → flat window on warm-gray plate + pointer → chip caption → lilac plate with one orange stat |
| `raycast` | glass search bar over liquid chrome with typed query → caption → tracked mono end pairs → mark |
| `vercel` | typed uppercase mono caption with block caret → terminal transcript → hairline isometric wireframe → typed end line |
| `granola` | 3D keycaps drop in → lime waveform pill → hand-drawn headline over serif → mark on lime plate |
| `stripe-terminal` | indigo TUI: typed command → spinner → ✓ + key/value panel → light approval modal + pointer |
| `event-noir`, `paper-editorial`, `terminal-mono`, `warm-consumer`, `social-reel` | `generic(theme)`: caption → window → mark, built only from that preset's tokens |

## Setup

```bash
cp -r <skill>/templates/starter my-film && cp -r <skill>/themes my-film/themes
cd my-film
npm install
npx playwright install chromium   # once per machine
npm run fonts                     # only if public/fonts/ is missing
```

Inside the skill the starter reads `../../themes` directly; the `@themes` alias prefers a local `./themes` snapshot when one exists. You also need `ffmpeg` on PATH.

## Commands

| Task | Command | Notes |
| --- | --- | --- |
| Preview + scrubber | `npm run dev` | http://localhost:5179/?theme=<id>. Space plays, ←/→ steps one frame (Shift: 1s), `&t=8.5` opens at a time. |
| Typecheck | `npm run typecheck` | |
| 1080p | `npm run render:1080 -- --theme <id>` | → `out/<id>-1080p.mp4` at the preset fps. opencode: ~106s wall for 19.9s on 8 vCPU with `--workers 3`; the ~11s 30fps presets take ~10s. |
| 4K | `npm run render:4k -- --theme <id>` | Same page at `deviceScaleFactor 2` → 3840×2160. Not a re-layout. ~625s wall for opencode's 19.9s at `--workers 3`. |
| Slice | `node scripts/render.mjs --theme <id> --from 8 --dur 2 --out out/slice.mp4` | Fast iteration on one beat. |
| Stills | `node scripts/stills.mjs --theme <id> 0.3 3 8.5 [--scale 2] [--dir out/stills/<id>]` | PNGs for look-dev. Look at them. |
| Determinism | `npm run check:determinism -- --theme <id>` | Renders 3–5s twice: once in order, once in a shuffled (seeded) order. Compares per-frame sha256 of lossless PNG captures. Exit 1 on mismatch. Use `--from 0 --dur end` for the whole film (later flags override the script defaults). |
| Cues | `npm run cues -- --theme <id>` | → `out/cues-<id>.json`, plus `out/mix-<id>.sh` when `sfx/*.wav` exist. |
| Themes check | `npm run check:themes` | Exit 1 if a vendored `./themes` drifted from `../../themes`. |

`render.mjs` flags:

- `--theme id`: preset + storyboard (default `VITE_THEME`, then `opencode`).
- `--fps N`: overrides the preset fps.
- `--scale 1|2`
- `--out`: default `out/<theme>-1080p.mp4` (or `-4k`).
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
src/storyboard.ts           registry: theme id → storyboard; getStoryboard(id), placeScenes, totalDuration
src/storyboards/types.ts    Scene union (data only): caption, window, hud, search, terminal, keys, wire, pair, mark, …
src/storyboards/<id>.ts     one example film per preset. Edit copy and durations here first.
src/storyboards/generic.ts  fallback storyboard for presets without a measured film
src/clock.ts                window.__seek(t): synchronous render, no rAF; rAF tripwire; exposes size/fps/theme
src/film.ts                 buildFilm(mount, themeId): stage + theme vars, scene switching, grain
src/scenes/kit.ts, kit.css  shared pure scene renderers, styled only from theme tokens
src/scenes/*.ts             opencode-specific scenes (halftone, macro app, end cards)
src/preview.ts              dev-only scrubber (skipped with ?render; keeps ?theme)
src/style.css               film styles
scripts/render.mjs          Playwright → CDP screenshot → ffmpeg stdin
scripts/determinism.mjs, cues.mjs, stills.mjs, fetch-fonts.mjs, vendor-themes.mjs
public/fonts/               self-hosted woff2: Inter, Geist, Geist Mono, JetBrains Mono (full glyph set; the Google subset lacks ✓), IBM Plex Mono, Newsreader, Source Serif 4, Plus Jakarta Sans, Caveat Brush
```

To add a film for a new preset: add `src/storyboards/<id>.ts` (theme id + scene list), register it in `src/storyboard.ts`, and reuse kit scenes before writing a new one.

## Rules the clock enforces

- **No wall clock.** No `Date.now`, `performance.now`, rAF, CSS transitions or `@keyframes`, `<video>.play()`, or `Math.random` in render. `render.mjs` aborts if a seek calls `requestAnimationFrame` and prints the stack.
- **GSAP:**
  - One paused timeline, moved only by `tl.seek(t, true)`.
  - Build tweens as `fromTo(..., { immediateRender: false })`, so any seek order gives the same frame.
  - Keep `gsap.config({ autoSleep: 0 })`. Otherwise every seek wakes the ticker through rAF.
  - Use `motion.gsapEase(theme.easings.x.bezier)`. GSAP ignores CSS `cubic-bezier()` strings.
- **Grain** moves by frame index, not by time or randomness.
- **Pixels must not depend on frame history.** Chrome caches rasters, fonts, and layers across frames, so a shuffled render can differ from a sequential one. The kit and the render flags avoid the known traps:
  - Push-ins on flat UI use a plain 2D `transform: scale()` with **no `perspective` ancestor**, so the element is painted, not promoted to a compositor layer. Only tilted windows get `perspective` and `preserve-3d`.
  - Quantize any scale on text to steps of 0.002 or more (the search push does). Skia shares glyph strikes across near-identical scales, so a scale seen earlier changes later frames.
  - Blink carets with `visibility`, not `opacity`.
  - Never push with CSS `zoom`. Zoom changes the font size, and Blink caches fonts in 0.01px buckets, so the first exact size seen in a bucket wins.
  - No `backdrop-filter`, `will-change`, or lingering `blur(0px)`. Each one forces a layer whose raster scale depends on earlier frames.
  - Enter offsets snap to whole pixels, so rounded borders and shadows antialias the same every time.
  - `render.mjs` and `stills.mjs` launch Chrome with `--disable-partial-raster --disable-low-res-tiling`. Without these flags, tilted 3D windows reuse partial rasters.
  - Check the whole film with `node scripts/determinism.mjs --theme <id> --from 0 --dur end`. Run one check at a time; parallel Chrome runs crash.
- **Fonts** are local and gated on `document.fonts.load`. `window.__ready` resolves only after fonts are loaded and the film is built.

## Audio

The render is silent. `out/cues-<id>.json` lists every cue as `{ t, frame, scene, id, sfx }`.

To add sound, drop `sfx/<name>.wav` files, where the name is a storyboard `sfx` id, and run `npm run cues -- --theme <id>`. Then run:

```bash
sh out/mix-<id>.sh out/<id>-1080p.mp4 out/<id>-1080p-sfx.mp4
```

The generated graph delays each cue to its time and sums the cues:

```bash
ffmpeg -i film.mp4 -i sfx/click.wav -i sfx/key.wav \
  -filter_complex "[1]adelay=2550|2550[a0];[2]adelay=4750|4750[a1];[a0][a1]amix=inputs=2:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest out.mp4
```

`adelay` takes milliseconds per channel. Use `normalize=0` so many short cues don't get ducked.

## Known gaps

- Marks and wordmarks are typeset placeholders (◐, ◆, ■, `open`/`code`). Drop in real logo SVGs.
- Brand faces are free stand-ins where the real face is licensed or custom (see each preset in `references/themes.md`).
- Live-action shots in the reference films (people, hands, devices) are not reproducible here; the storyboards cover only the UI and typography beats.
- The push-ins and shot framings are eyeballed against reference stills, not motion-tracked.
- The SFX palettes of the reference films were not analyzed. Cues carry ids only.
- 4K is about 6× slower than 1080p (625s vs 106s for 1194 frames at `--workers 3`, 8 vCPU). Each page needs a few hundred MB at 4K, so watch RAM before raising `--workers`.
