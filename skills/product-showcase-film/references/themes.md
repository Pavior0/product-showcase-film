# Product-showcase-film theme presets

Agents must **copy one preset** from `themes/<id>.ts`. Do not invent colors, fonts, easings, or transitions outside that file. Max **one** accent per theme.

Companion code: `themes/types.ts`, `themes/base.css`, `themes/motion.ts`, `themes/index.ts`.

Sampled reference for **event-noir**: Emil Widlund Polar showcase frames (`/workspace/emil-frames/`). Measured: bg `#0c0c0c`, light card `#d7d7d7`, cobalt accent `#381cc8`.

---

## Scan table

| ID | Name | Use when |
| --- | --- | --- |
| `event-noir` | Event Noir | Devtools / infra / billing / API. Dark grain stage, floating mono events, light cards, cobalt accent. |
| `paper-editorial` | Paper Editorial | Launch essays, design tools, thoughtful B2B. Warm paper stage, serif captions, terracotta accent. |
| `terminal-mono` | Terminal Mono | CLI / security / DB / local-first. All mono, hard corners, phosphor green, cuts + typeOn. |
| `warm-consumer` | Warm Consumer | Consumer / lifestyle / human fintech. Warm cocoa stage, soft cards, peach accent. |
| `social-reel` | Social Reel | 9:16 Reels/Shorts ≤30s. Oversized captions, coral accent, safe margins, one card at a time. |
| `opencode` | OpenCode | Coding agents / TUI + desktop dev tools. Macro tilted UI with depth of field on pure black, then lowercase two-tone mono end cards on hard cuts; chip-blue accent; yellow halftone opener. |
| `linear` | Linear | Issue trackers / workflow tools. Monochrome orbit HUD or tilted dark UI with rack focus, UPPERCASE mono node labels, sentence-case end cards that blur in and brighten; one indigo action. |

---

## event-noir

**When:** Devtools, infra, usage/billing, API products that want a cinematic Polar-like film.

### Palette (hex)

| Role | Hex |
| --- | --- |
| bg | `#0c0c0c` |
| surface | `#141414` |
| surfaceAlt (light card) | `#d7d7d7` |
| border | `#2a2a2a` |
| text | `#f0f0f0` |
| muted | `#6e6e6e` |
| accent (only) | `#381cc8` |

### Type @ 1920×1080

| Role | Family | Size | Weight | Tracking | LH |
| --- | --- | --- | --- | --- | --- |
| caption | Inter | 56px | 600 | -0.02em | 1.1 |
| captionMuted | Inter | 56px | 500 | -0.02em | 1.1 |
| cardTitle | Inter | 28px | 600 | -0.015em | 1.25 |
| cardBody | Inter | 18px | 400 | 0 | 1.45 |
| mono (events) | IBM Plex Mono | 16px | 400 | 0 | 1.35 |
| meta | IBM Plex Mono | 12px | 500 | 0.08em | 1.2 |

Google Fonts: `Inter:wght@400;500;600;700` + `IBM+Plex+Mono:wght@400;500`

### Easings (cubic-bezier)

| Name | CSS |
| --- | --- |
| enter | `cubic-bezier(0.16, 1, 0.3, 1)` |
| exit | `cubic-bezier(0.7, 0, 0.84, 0)` |
| settle | `cubic-bezier(0.22, 1, 0.36, 1)` |
| snap | `cubic-bezier(0.2, 0, 0, 1)` |

### Durations

| Token | ms |
| --- | --- |
| enterMs | 720 |
| exitMs | 480 |
| settleMs | 400 |
| holdMs | 1400 |
| msPerCaptionChar | 38 |
| transitionMs | 560 |

Caption hold rule: `max(holdMs, chars * msPerCaptionChar)`.

### Transitions (allowed)

| ID | Params |
| --- | --- |
| cut | — |
| fade | opacity 0→1 |
| riseFade | yPx=28 |
| slideBlur | xPx=120, blurPx=18 |
| cardStackIn | yPx=40, scaleFrom=0.96, staggerMs=80 |
| typeOn | charsPerSec=28 |
| countUp | durationMs=900 |

### Texture

- grainOpacity `0.22`, grainFreq `0.65`, grainSeed `7`, octaves `4`
- vignette `0.35`, scanlineOpacity `0`

### Card

- radius `14px`, border `1px`, shadow `0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)`
- padding `[28,32,28,32]`, maxWidth `720px`

### Camera

- driftAmp `0.0035`, period `14s`, zoom `[1.0, 1.08]`, zoomEasing settle

### Sound

- allowed: keypress, softClick, tick, streamTick, paymentTap, impact
- banned: whoosh, riser
- music lift on: logo

### Bans

No second accent; no gradient blobs; no whoosh/riser; no serif display; no emoji; no agent meta; mono uses text/muted/accent only.

---

## paper-editorial

**When:** Launch essays, design-tool launches, calm B2B narratives.

### Palette

| Role | Hex |
| --- | --- |
| bg | `#f3efe6` |
| surface | `#fffcf7` |
| surfaceAlt (dark card) | `#1c1a17` |
| border | `#ddd4c6` |
| text | `#1c1a17` |
| muted | `#7a7368` |
| accent (only) | `#c45c26` |

### Type @ 1920×1080

| Role | Family | Size | Weight | Tracking | LH |
| --- | --- | --- | --- | --- | --- |
| caption | Source Serif 4 | 64px | 600 | -0.01em | 1.15 |
| captionMuted | Source Serif 4 | 64px | 500 | -0.01em | 1.15 |
| cardTitle | Inter | 26px | 600 | -0.01em | 1.3 |
| cardBody | Inter | 18px | 400 | 0 | 1.5 |
| mono | IBM Plex Mono | 15px | 400 | 0 | 1.4 |
| meta | Inter | 12px | 500 | 0.06em | 1.2 |

### Easings

| Name | CSS |
| --- | --- |
| enter | `cubic-bezier(0.22, 1, 0.36, 1)` |
| exit | `cubic-bezier(0.55, 0, 1, 0.45)` |
| settle | `cubic-bezier(0.33, 1, 0.68, 1)` |
| snap | `cubic-bezier(0.25, 0.1, 0.25, 1)` |

### Durations

enter 900 · exit 560 · settle 480 · hold 1800 · msPerCaptionChar 45 · transition 700

### Transitions

Allowed: cut, fade, riseFade (yPx=18), cardStackIn (yPx=24, scaleFrom=0.98, staggerMs=100), typeOn (22 cps), countUp (1100ms).  
**Banned:** slideBlur.

### Texture

grainOpacity `0.10`, freq `0.9`, seed `11`, octaves `3`, vignette `0.12`, scanlines `0`

### Card

radius `10`, border `1`, shadow `0 18px 48px rgba(28,26,23,0.08), 0 0 0 1px rgba(28,26,23,0.06)`, pad `[32,36,32,36]`, maxW `680`

### Camera

driftAmp `0.002`, period `18s`, zoom `[1.0, 1.04]`

### Sound

allowed: softClick, tick, keypress · banned: whoosh, riser, impact, streamTick, paymentTap · lift on captionHit

### Bans

No slideBlur; no neon; Source Serif 4 for captions only (never Instrument Serif); no glassmorphism; no ALL CAPS kickers; no agent meta.

---

## terminal-mono

**When:** CLI, security, databases, local-first infra demos.

### Palette

| Role | Hex |
| --- | --- |
| bg | `#0a0c0a` |
| surface | `#101410` |
| border | `#1c2a1c` |
| text | `#d2e0d2` |
| muted | `#5c6e5c` |
| accent (only) | `#3ddc84` |

### Type @ 1920×1080 — IBM Plex Mono only

| Role | Size | Weight |
| --- | --- | --- |
| caption | 48px | 600 |
| captionMuted | 48px | 400 |
| cardTitle | 20px | 500 |
| cardBody | 16px | 400 |
| mono | 15px | 400 |
| meta | 12px | 400 |

### Easings

enter/settle `cubic-bezier(0.2, 0, 0, 1)` · exit `cubic-bezier(0.4, 0, 1, 1)` · snap `cubic-bezier(0, 0, 0, 1)`

### Durations

enter 360 · exit 240 · settle 200 · hold 1200 · msPerCaptionChar 32 · transition 280

### Transitions

Allowed: cut, fade, typeOn (42 cps), countUp (600ms).  
**Banned:** riseFade, slideBlur, cardStackIn.

### Texture

grainOpacity `0.08`, freq `1.1`, seed `3`, octaves `2`, vignette `0.2`, **scanlineOpacity `0.08`**

### Card

radius **`0`**, border `1`, shadow `none`, pad `[20,24,20,24]`, maxW `800`

### Camera

driftAmp `0`, zoom `[1.0, 1.0]` — locked.

### Sound

allowed: keypress, tick, streamTick · banned: whoosh, riser, impact, paymentTap, softClick · lift on endCard

### Bans

radius stays 0; no Inter/serif; no soft shadow/blur; no camera drift/zoom; phosphor only; no agent meta.

---

## warm-consumer

**When:** Consumer apps, lifestyle, human-facing fintech/mobile.

### Palette

| Role | Hex |
| --- | --- |
| bg | `#16120f` |
| surface | `#221c18` |
| surfaceAlt (light card) | `#f3ebe3` |
| border | `#3a3028` |
| text | `#f5ebe0` |
| muted | `#9a8778` |
| accent (only) | `#e8a87c` |

### Type @ 1920×1080 — Plus Jakarta Sans

| Role | Size | Weight | Tracking |
| --- | --- | --- | --- |
| caption | 58px | 600 | -0.025em |
| captionMuted | 58px | 500 | -0.025em |
| cardTitle | 24px | 600 | -0.015em |
| cardBody | 17px | 400 | 0 |
| mono | 14px | 400 | 0 |
| meta | 12px | 500 | 0.04em |

### Easings (slight overshoot on enter/settle)

| Name | CSS |
| --- | --- |
| enter | `cubic-bezier(0.34, 1.2, 0.64, 1)` |
| exit | `cubic-bezier(0.55, 0.05, 0.8, 0.4)` |
| settle | `cubic-bezier(0.34, 1.3, 0.64, 1)` |
| snap | `cubic-bezier(0.2, 0.8, 0.2, 1)` |

### Durations

enter 800 · exit 500 · settle 520 · hold 1500 · msPerCaptionChar 40 · transition 600

### Transitions

Allowed: cut, fade, riseFade (yPx=32), cardStackIn (yPx=36, scaleFrom=0.94, staggerMs=90), countUp (1000ms).  
**Banned:** slideBlur, typeOn.

### Texture

grainOpacity `0.14`, freq `0.7`, seed `19`, octaves `3`, vignette `0.28`

### Card

radius `22`, border `1`, shadow `0 28px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(243,235,227,0.04)`, pad `[28,28,28,28]`, maxW `560`

### Camera

driftAmp `0.004`, period `12s`, zoom `[1.0, 1.06]`

### Sound

allowed: softClick, paymentTap, tick · banned: whoosh, riser, streamTick, keypress · lift on logo

### Bans

No slideBlur/typeOn; no cold blues; no sharp 0-radius; no dense event-string fields; no agent meta.

---

## social-reel

**When:** Vertical social cuts (Reels / Shorts / TikTok), typically ≤30s.

### Frame

**1080×1920** @ 60fps. Safe margins: **120px top / 180px bottom** (platform chrome).

### Palette

| Role | Hex |
| --- | --- |
| bg | `#050505` |
| surface | `#141414` |
| surfaceAlt | `#f5f5f5` |
| border | `#2c2c2c` |
| text | `#ffffff` |
| muted | `#8a8a8a` |
| accent (only) | `#ff3b5c` |

### Type @ 1080×1920 — Inter

| Role | Size | Weight | Tracking |
| --- | --- | --- | --- |
| caption | 72px | 700 | -0.03em |
| captionMuted | 36px | 500 | -0.01em |
| cardTitle | 28px | 600 | -0.02em |
| cardBody | 20px | 400 | 0 |
| mono | 16px | 400 | 0 |
| meta | 14px | 500 | 0.02em |

### Easings

Same vocabulary as event-noir (enter/exit/settle/snap).

### Durations

enter 500 · exit 360 · settle 320 · hold 1100 · msPerCaptionChar 42 · transition 400

### Transitions

Allowed: cut, fade, riseFade (yPx=40), slideBlur (xPx=0, blurPx=12), cardStackIn (yPx=48, scaleFrom=0.92, staggerMs=70), countUp (700ms).  
**Banned:** typeOn.

### Texture

grainOpacity `0.16`, freq `0.75`, seed `23`, octaves `3`, vignette `0.40`

### Card

radius `20`, border `1`, shadow `0 32px 72px rgba(0,0,0,0.6)`, pad `[28,28,28,28]`, maxW `900`

### Camera

driftAmp `0.0025`, period `10s`, zoom `[1.0, 1.1]`

### Sound

allowed: softClick, tick, impact, paymentTap · banned: whoosh, riser, streamTick, keypress · lift on endCard

### Bans

No 16:9; respect safe margins; max 1 card + 1 caption; no typeOn; coral only; body ≥18px; no agent meta.

---

## opencode

**When:** Coding agents and terminal/TUI or desktop dev tools that should look like an OpenCode launch film.

**Sources** (downloaded to `/workspace/ref-videos/`, 1080p 10.4 Mbps; 4K variants exist):
- https://x.com/opencode/status/2077148766092558570 "Introducing Tabs" (24.3s, 59.94fps)
- https://x.com/opencode/status/2000613474267771323 "OpenCode, now on your desktop (in beta)" (28.5s, 23.976fps)

### Film grammar (measured from frames)

1. **Opener (Tabs, 0–1.45s):** a tilted window over a saturated yellow halftone plate (`#fdff24`). The dots grow until the plate dissolves to black in about 0.3s (1.15–1.45s).
2. **One long macro take of the real UI** (Tabs ≈11s, Desktop 17.7s with a single cut). The window is tilted about 10–15°, with a narrow focus band and the rest blurred heavily. The camera pans slowly along the tab bar or pushes in. A tab title types on with a caret ("Camera|").
3. **End cards on pure `#000000`.** Text swaps on hard cuts (pixel count goes from 0 to full in one frame). Only the first title fades out, over about 0.2s.
   - Tabs: 1.0s black → "introducing **tabs** for desktop" 1.3s → 0.6s black → pixel wordmark 1.5s → "the open source coding agent" 2.2s → "opencode.ai/download" 3.5s → black.
   - Desktop: end-card holds of 2.7s, 2.5s, 2.7s and 2.9s, all on cuts.
4. **Text never moves.** No rise, slide, scale or blur-in.

### Palette (PIL-sampled)

| Role | Hex | Source |
| --- | --- | --- |
| bg | `#000000` | end cards (exact) |
| surface | `#0f0f0f` | app chrome in macro shots (`#0a090a`–`#0f0f0f`) |
| plate | `#fdff24` | halftone opener plate only (`palette.plate`; **not** `surfaceAlt` — every `.psf-card` paints surfaceAlt, so yellow there turned all cards yellow) |
| border | `#3d3d3e` | selected-tab fill |
| text | `#ffffff` | key word, URL |
| muted | `#bab5b6` | rest of the line, tagline (warm gray) |
| accent (only) | `#5a82e6` | project chip "Z" (core `#547dda`, glow `#608af2`) |

Wordmark tones: `#f8f8f8` / `#b0a8a8` / counters `#484040`. Use the real logo asset; do not redraw it.

### Type @ 1920×1080

| Role | Family | Size | Weight | Notes |
| --- | --- | --- | --- | --- |
| caption | JetBrains Mono (stand-in for Berkeley Mono) | 71px | 500 | Measured: the tagline is 1195px wide over 28 glyphs at 1080p (42.7px advance ÷ 0.6em → 71px). Lowercase. |
| captionMuted | JetBrains Mono | 71px | 400 | Same line in `muted` |
| cardTitle | Inter (SF stand-in) | 30px | 500 | tab titles |
| cardBody | Inter | 20px | 400 | |
| mono | JetBrains Mono | 20px | 400 | session transcript |
| meta | JetBrains Mono | 16px | 400 | |

### Easings / durations

- enter/exit `cubic-bezier(0.45, 0, 0.55, 1)` (camera); settle `cubic-bezier(0.25, 0.1, 0.25, 1)`; snap `cubic-bezier(0.7, 0, 0.3, 1)` (whip pan).
- enter 0 (cut), exit 200, settle 0, hold 1300, msPerCaptionChar 60, transition 300.

### Transitions

- **Allowed:**
  - cut (leadInBlack 1000ms, gap 600ms)
  - fade (≤200ms, exits only)
  - slideBlur (whip between macro framings only)
  - typeOn (14 cps tab rename)
- **Banned:** riseFade, cardStackIn, countUp.

### Texture / card / camera

- grain `0.03`, freq `0.9`, seed `11`, vignette `0.45` (depth-of-field falloff), no scanlines.
- card radius `14`, border `1`, no shadow.
- camera driftAmp `0.02` over an 18s period, zoom `[1.0, 1.3]`. The push-in range is eyeballed, not measured.

### How the look is built (dogfooded in `starter/`)

- **Scale:** the macro is *extreme*. Build the window at 2× units (traffic lights 26px, tab text 27px, prompt mono 30px) and frame it at zoom 2–3 so one chip/line fills ~⅓ of the width. Zoom ≤1.3 reads as a screenshot, not a macro.
- **Fake DOF:** two clones of the UI under the same 3D transform (`rotateX 16° rotateZ −11°`, perspective 1800px). Back clone `filter: blur(15px)`; front clone sharp, masked by `radial-gradient(ellipse 30% 26% at var(--fx) var(--fy), #000 30%, transparent)`. Move the focus point with the framing, never leave it at screen centre.
- **Camera:** per-shot `{x, y, zoom, sx, sy}` (plane point → screen anchor). Ease between shots with `enter`; whip between framings with `snap` over 0.3s plus a 22px blur up-and-down on both layers.
- **Halftone opener:** a DPR-aware `<canvas>` behind the camera: dot radius grows with distance from the window corner; the dissolve grows every dot to fill black (0.3s, `enter`). The vignette is a mask on the camera and must ramp in *with* the dissolve — a mask during the plate makes the window edges see-through onto yellow.
- **Tool stream:** `Read` / `Edit` / `Bash` lines at ~110 cps, verb in `accent`, diff counts muted, last line `✓ 14 passed`. JetBrains Mono's Google latin subset has no `✓` — ship the full font.

### Bans

- No text over footage.
- Copy is lowercase mono, one line per card, in two tones.
- No text motion.
- No flat screenshots.
- Yellow appears only in the opener.
- One accent.
- No glow and no scanlines.
- No agent meta.

---

## linear

**When:** Project tools, workflow automation and issue trackers that should look like a Linear launch film.

**Sources** (downloaded to `/workspace/ref-videos/`, 1080p 10.4 Mbps, 60fps):
- https://x.com/linear/status/2079233260161323371 "Introducing Loops" (40.5s)
- https://x.com/linear/status/2060048202796040655 "Code review, but faster. Introducing Diffs" (52.0s)

### Film grammar (measured from frames)

1. **Two shot modes.** Both use continuous camera moves and almost no hard cuts at a 0.2 scene threshold.
   - **Orbit HUD (Loops):** near-black, with thin gray orbit ellipses, a tick ring and a dotted ring. Glowing white arcs travel between node dots. Short **UPPERCASE** tracked mono labels sit beside the nodes ("ISSUE ENTERS TRIAGE", "FIND BUG LABELS" with an inline chip, "READY FOR REVIEW"). The camera orbits and tilts slowly with depth of field and ends on a zoom-out.
   - **Tilted app (Diffs):** dark UI in 3D perspective with a slow dolly and rack focus. There are hard cuts between macro passes, for example a full diff view cutting to a close-up of the "Submit review" button.
2. **Shot length:** Diffs averages ≈5.8s (soft-cut times 3.0, 6.7, 12.8, 15.0, 25.3, 27.6, 32.0, 40.8). Loops has shots of ≈3–5s inside one continuous orbit.
3. **End cards:** sentence-case grotesk centered on `#000000`.
   - The line blurs in over 0.5–0.8s, then keeps brightening from gray to cool white: `#5d5c61` → `#c2c2c9` → `#e0e2e9` → `#e7e9f1` over about 1.5s.
   - It holds for about 1.7–2s, then fades out in 0.3s. After 0.2–0.6s of black, the Linear logo appears (Loops: 0.3s blur-in) and holds 4–4.5s to the end.
   - Lines seen: "Loops" lockup, "Now available in Linear", "Experience the diff".

### Palette (PIL-sampled)

| Role | Hex | Source |
| --- | --- | --- |
| bg | `#000000` | end cards (exact) |
| surface | `#0a0a0f` | Diffs app surface; HUD floor `#0a0a0a`–`#0f0f0f` |
| border | `#26262c` | rings, panel edges |
| text | `#e7e9f1` | end-card peak (cool white); logo `#ffffff` |
| muted | `#8f949b` | sidebar `#909a9f`, end-card start tone |
| accent (only) | `#6860b6` | "Submit review" core (brand `#5e6ad2`) |

Diff rows, allowed inside code views only: add `#18655d`, remove `#713943`, add-row background `#112f1e`.

### Type @ 1920×1080

| Role | Family | Size | Weight | Tracking |
| --- | --- | --- | --- | --- |
| caption | Inter | 88px | 500 | -0.02em (real end card ≈96px: "Experience the diff" is 987px wide) |
| captionMuted | Inter | 88px | 500 | -0.02em (same face; brightness ramp instead of a second weight) |
| cardTitle | Inter | 26px | 500 | -0.01em |
| cardBody | Inter | 18px | 400 | 0 |
| mono (HUD labels) | Geist Mono | 24px | 500 | 0.12em, **UPPERCASE** |
| meta | Geist Mono | 15px | 400 | 0.04em |

**Brand exception:** UPPERCASE is allowed only for HUD node labels of 4 words or fewer. Everything else stays sentence case.

### Easings / durations

- enter `cubic-bezier(0.25, 0.1, 0.25, 1)` · exit `cubic-bezier(0.4, 0, 1, 1)` · settle `cubic-bezier(0.16, 1, 0.3, 1)` · snap `cubic-bezier(0.65, 0, 0.35, 1)` (orbit).
- enter 800 · exit 300 · settle 1500 (brightness ramp) · hold 1800 · msPerCaptionChar 90 · transition 400.

### Transitions

- **Allowed:**
  - cut (between UI passes, 200–600ms black before the logo)
  - fade (400ms)
  - typeOn (28 cps, HUD labels)
- **Banned:** riseFade, slideBlur, cardStackIn, countUp.

### Texture / card / camera

- grain `0.05`, seed `21`, vignette `0.5`.
- card radius `12`, border `1`, shadow `0 40px 120px rgba(0,0,0,.6)`.
- camera driftAmp `0.012` over a 12s period, zoom `[0.6, 1.25]`. The 0.6 is the end zoom-out.

### Bans

- Monochrome plus one indigo action per shot. Diff colors only inside code views.
- UPPERCASE only in HUD labels.
- End cards blur in and brighten, never slide.
- No light cards or cobalt (event-noir).
- No phosphor green, scanlines or typing terminal (terminal-mono).
- UI always tilted, with depth of field.
- Glow only on arcs and dots.
- No agent meta.

---

## Motion helpers (`themes/motion.ts`)

Pure functions of `t` / normalized `u`:

- `riseFade`, `slideBlur`, `cardStackIn`, `fade`
- `typeOn(t, start, text, charsPerSec)`
- `countUp(u, from, to, decimals)`
- `caretBlink(t, periodSec)`
- `cameraDrift`, `cameraZoom`
- `gsapEase(bezier)` → a GSAP ease **function**. GSAP does not parse CSS `"cubic-bezier(...)"` strings and silently falls back to `power1.out`.
- `gsapVars.*(…, bezier, durationSec)` → `fromTo` vars with an explicit duration (an omitted duration used to give 0s tweens). Use them on a **paused** timeline moved only by `tl.seek(t, true)`; build every tween with `immediateRender: false`, and set `gsap.config({ autoSleep: 0 })` so `seek()` never calls `requestAnimationFrame` to wake the ticker.

Grain: SVG `feTurbulence` from the theme's `grainSeed` / `grainFreq` / `octaves` (`grainDataUrl(theme)` → `--psf-grain-url`). Animate it by offsetting `background-position` by frame index — never `Math.random` during render.

`themeToCssVars` also emits `--psf-mono-lh` (the mono line-height token) and `--psf-plate`.

---

## How to apply

```ts
import { getTheme, themeToCssVars } from "./themes/index.ts";
import * as motion from "./themes/motion.ts";

const theme = getTheme("event-noir"); // pick ONE
// set CSS vars on .psf-stage from themeToCssVars(theme)
// animate with motion.*(t, …) using theme.easings.*.bezier and theme.transitions params
```

If the product already has brand tokens, **map** them onto these roles — do not add a sixth color or a second accent.
