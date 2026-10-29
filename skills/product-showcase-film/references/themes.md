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
| `linear-light` | Linear (light) | Feature explainers, light docs-film look. Flat UI cards on near-white, soft cross-dissolves, color only in status dots. |
| `cursor` | Cursor | AI coding / dev infra. Black word-by-word captions on white, flat windows on warm-gray or lilac plates, hard cuts, one orange stat. |
| `raycast` | Raycast | Launchers / desktop utilities. Dark glass search bars on black over liquid chrome, typed queries, tracked mono end pairs. |
| `vercel` | Vercel | Infra / API / SDK. Uppercase Geist Mono typed on black with a block caret, terminal transcripts, hairline isometric wireframes. |
| `granola` | Granola | Consumer AI (notes, voice). Off-white paper, soft 3D keycaps, lime accent with glow, hand-drawn headline over a serif. |
| `stripe-terminal` | Stripe terminal | CLI payments / fintech / agent tooling. Deep-indigo TUI panels, typed command, spinner → ✓, light approval modal. |

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

**Sources** (official X posts, frames PIL-sampled at 1080p 60fps):
- https://x.com/linear/status/2079233260161323371 "Introducing Loops" (40.5s)
- https://x.com/linear/status/2060048202796040655 "Code review, but faster. Introducing Diffs" (52.0s)
- https://x.com/linear/status/2099541754051530805
- https://x.com/linear/status/2087277719130165435
- https://x.com/linear/status/2090142697508016450
- https://x.com/linear/status/2094855377443606886
- https://x.com/linear/status/2065143118417088981

The additional films confirm the dark grammar below and add: kinetic mono chapter slugs over black (one per film), gray hairline node diagrams, and third-party light cards (Slack/GitHub) floated over the dark stage. Linear's fully light feature films are a separate preset: `linear-light`.

**Fonts:** real end-card face is Inter Display (Inter substitutes); HUD mono unconfirmed (Berkeley Mono-like; Geist Mono substitutes).

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
| display (chapter slug / end pairs) | Geist Mono | 78px | 500 | 0.24em |

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

- Monochrome: the only hue is the indigo action (one button/pill per shot). Diff add/remove rows are the single exception, desaturated (#18655d / #713943) and inside code views only
- UPPERCASE is allowed only for short HUD node labels in the mono role (≤4 words); captions, end cards and UI stay sentence case
- End cards: sentence case sans, centered on #000000, blur-in + brighten from muted to text; no slide, no scale pop
- Linear's own UI stays dark. A light card is allowed only for a third-party surface (Slack thread, GitHub PR) floated over the dark stage; a fully light film is `linear-light`
- No cobalt, no grain-heavy look (that is event-noir)
- Kinetic mono slugs ("/coding-sessions" + block caret, motion blur) are allowed as a chapter opener over black; one per film
- Diagrams (sync engine) are gray hairline node graphs on #06090a with #7d838c labels; no colored edges
- No green phosphor, no scanlines, no typing terminal (that is terminal-mono)
- UI is always tilted in 3D with depth of field; never a flat screenshot
- Glow belongs to arcs and node dots only; never on text blocks
- No agent meta copy on screen

---

## linear-light

**When:** Feature/workflow explainers (triage, automation, settings) for a B2B tool that want Linear's light docs-film look.

**Sources** (unofficial measurements; frames PIL-sampled):
- https://x.com/linear/status/2071983086708150721 "Automate Triage in Linear" (4K 60fps)

### Film grammar (measured from frames)

1. Sentence-case chapter title on near-white, then **flat** (untilted) app UI cards with soft shadows.
2. Card swaps are ~800ms cross-dissolves with a slight blur + rise; slow 1.8s push-ins.
3. Status dots carry the only color; ends on a centered gray mark on white.

**Fonts:** Real font: Inter Display (brand). Inter substitutes.

### Palette (hex)

| Role | Hex |
| --- | --- |
| bg | `#fbfdfc` |
| surface | `#fdfdfd` |
| plate | `#eff2f0` |
| border | `#dadada` |
| text | `#262626` |
| muted | `#777a78` |
| accent | `#6b6fcd` |
| accentOnLight | `#5e6ad2` |

### Type @ 1920×1080

| Role | Family (free stand-in) | Size | Weight | Tracking | LH |
| --- | --- | --- | --- | --- | --- |
| caption | Inter | 80px | 600 | -0.025em | 1.15 |
| captionMuted | Inter | 80px | 500 | -0.025em | 1.15 |
| cardTitle | Inter | 26px | 500 | -0.01em | 1.3 |
| cardBody | Inter | 19px | 400 | 0em | 1.5 |
| mono | Geist Mono | 18px | 500 | 0em | 1.3 |
| meta | Inter | 15px | 500 | 0em | 1.3 |

### Easings / durations

- enter `cubic-bezier(0.25, 0.1, 0.25, 1)` · exit `cubic-bezier(0.4, 0, 1, 1)` · settle `cubic-bezier(0.16, 1, 0.3, 1)` · snap `cubic-bezier(0.65, 0, 0.35, 1)`
- enter 800 · exit 400 · settle 1800 · hold 2000 · msPerCaptionChar 80 · transition 800 · **60 fps**

### Transitions

- **Allowed:** cut (use=chapter title → first UI shot only); fade (opacityFrom=0, opacityTo=1, ms=800, blurPx=8, use=card cross-dissolve with slight blur); riseFade (yPx=12, opacityFrom=0, use=incoming card rises 12px while dissolving); typeOn (charsPerSec=30, use=agent status line inside a card (shimmer text))
- **Banned:** slideBlur, cardStackIn, countUp

### Texture / card / camera

- grain `0`, seed `7`, vignette `0`, scanlines `0`.
- card radius `12`, border `1`, shadow `0 1px 2px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)`, max width `1280`.
- camera driftAmp `0` over 20s, zoom `[1, 1.3]` (settle).
- sound: softClick, tick; banned whoosh, impact, riser, keypress, paymentTap, streamTick; music lift on endCard.

### Bans

- UI is flat and front-on: no 3D tilt, no depth of field, no vignette (that is `linear` dark)
- Color only in status/label dots inside UI: green #67c98a, red #df5765, indigo #6b6fcd, orange #e85830, yellow #e0b800; never on text or backgrounds
- Chapter title is sentence case Inter 600 on #fbfdfc, centered, ≤5 words; no uppercase eyebrow
- No grain, no glow, no gradients
- Card swaps dissolve (~800ms) with slight blur; no slide, no scale pop
- End: centered gray (#777a78) mark + wordmark on white; no tagline under it

---

## cursor

**When:** AI coding / dev-infra launches that want Cursor's clean editorial look.

**Sources** (unofficial measurements; frames PIL-sampled):
- https://x.com/cursor_ai/status/2089399057659596847 (Cursor Origin / code hosting, ~25k likes)
- https://x.com/cursor_ai/status/2079993729532989500 (Router / cost per commit, ~10k likes)

### Film grammar (measured from frames)

1. Black regular-weight sans caption on pure white that builds **word by word** on hard cuts (~250ms/word); 2–3s shots.
2. Hard cut to a full-bleed warm-gray (`#e5e3df`) or lilac-gradient plate holding a flat product window, then a slow decelerating push/scroll (~1.3s).
3. A pointer clicks once per shot; inline gray chips inside captions ("+ New"); one orange stat.

**Fonts:** Real font: Cursor's custom grotesk. Inter substitutes.

### Palette (hex)

| Role | Hex |
| --- | --- |
| bg | `#ffffff` |
| surface | `#fbfbfb` |
| surfaceAlt | `#e4e4e4` |
| plate | `#e5e3df` |
| backdrop | `linear-gradient(160deg, #e9ddfb 0%, #c29cf9 35%, #a370f5 65%, #6a37ba 100%)` |
| border | `#e4e4e4` |
| text | `#000000` |
| muted | `#6d6d6d` |
| accent | `#dd4311` |
| accentOnLight | `#dd4311` |

### Type @ 1920×1080

| Role | Family (free stand-in) | Size | Weight | Tracking | LH |
| --- | --- | --- | --- | --- | --- |
| caption | Inter | 64px | 400 | -0.02em | 1.15 |
| captionMuted | Inter | 64px | 400 | -0.02em | 1.15 |
| cardTitle | Inter | 24px | 500 | -0.01em | 1.3 |
| cardBody | Inter | 18px | 400 | 0em | 1.5 |
| mono | JetBrains Mono | 18px | 400 | 0em | 1.45 |
| meta | Inter | 15px | 400 | 0em | 1.3 |

### Easings / durations

- enter `cubic-bezier(0, 0, 1, 1)` · exit `cubic-bezier(0.4, 0, 1, 1)` · settle `cubic-bezier(0.22, 1, 0.36, 1)` · snap `cubic-bezier(0.65, 0, 0.35, 1)`
- enter 0 · exit 0 · settle 1300 · hold 1200 · msPerCaptionChar 0 · transition 0 · **30 fps**

### Transitions

- **Allowed:** cut (use=everything: word builds, shot changes (2–3s shots), msPerWord=250); typeOn (charsPerSec=40, use=prompt box inside the product window only); countUp (durationMs=900, use=the single orange stat)
- **Banned:** fade, riseFade, slideBlur, cardStackIn

### Texture / card / camera

- grain `0`, seed `3`, vignette `0`, scanlines `0`.
- card radius `14`, border `1`, shadow `0 2px 6px rgba(0,0,0,0.04), 0 24px 60px rgba(0,0,0,0.10)`, max width `1500`.
- camera driftAmp `0` over 20s, zoom `[1, 1.15]` (settle).
- sound: softClick, keypress; banned whoosh, impact, riser, streamTick, paymentTap; music lift on captionHit.

### Bans

- Captions build word-by-word on hard cuts (~250ms/word); never fade, type or slide the caption
- Caption weight is regular (400) black on #ffffff; never bold, never colored, never uppercase
- Inline chips inside a caption are #e4e4e4 rounded rects with black text; ≤1 chip per line
- One orange (#dd4311) number or label per film; green appears only as real UI state (merge button #0a9453)
- Product windows are flat and centered on a plate (#e5e3df or the lilac gradient); no tilt, no DOF, no vignette, no grain
- Pointer is the macOS hand cursor; one click per shot
- No logo animation; end on the caption or a plain wordmark on white

---

## raycast

**When:** Launchers, command palettes, desktop utilities and AI app builders.

**Sources** (unofficial measurements; frames PIL-sampled):
- https://x.com/raycast/status/2001658927302267296 ("The new Raycast" launcher redesign teaser)
- https://x.com/raycast/status/2029180822838759703 (Glaze: "Desktop apps, reimagined by you.")

### Film grammar (measured from frames)

1. Dark glass windows (`#111111`) floating on pure black over a slow glossy liquid-chrome swirl.
2. Big rounded search bar with a thin white caret (~1s blink) and typed queries.
3. Slow accelerating push-ins (~2s) hard-cut to the next framing; end card = tracked uppercase mono word pairs, then a small centered mark.
4. Selection rings take a muted tint of the selected item (`#aeac77`), never neon.

**Fonts:** Real sans: Inter. Mono unconfirmed; Geist Mono substitutes. The chrome swirl is a CSS-gradient stand-in for their rendered 3D backdrop.

### Palette (hex)

| Role | Hex |
| --- | --- |
| bg | `#000000` |
| surface | `#111111` |
| surfaceAlt | `#1a1a1a` |
| border | `#2a2a2a` |
| backdrop | `radial-gradient(120% 80% at 30% 20%, #3a3a3a 0%, #121212 40%, #000000 70%), conic-gradient(from 200deg at 60% 60%, #000 0deg, #2b2b2b 90deg, #050505 180deg, #3d3d3d 270deg, #000 360deg)` |
| text | `#ffffff` |
| muted | `#6c6c6c` |
| accent | `#ff6363` |
| accentOnLight | `#ff6363` |

### Type @ 1920×1080

| Role | Family (free stand-in) | Size | Weight | Tracking | LH |
| --- | --- | --- | --- | --- | --- |
| caption | Inter | 60px | 500 | -0.02em | 1.15 |
| captionMuted | Inter | 60px | 500 | -0.02em | 1.15 |
| cardTitle | Inter | 40px | 400 | -0.01em | 1.2 |
| cardBody | Inter | 22px | 500 | 0em | 1.4 |
| mono | Geist Mono | 40px | 400 | 0em | 1.2 |
| meta | Inter | 16px | 500 | 0em | 1.3 |

### Easings / durations

- enter `cubic-bezier(0.25, 0.1, 0.25, 1)` · exit `cubic-bezier(0.4, 0, 1, 1)` · settle `cubic-bezier(0.16, 1, 0.3, 1)` · snap `cubic-bezier(0.55, 0, 1, 0.45)`
- enter 500 · exit 300 · settle 2000 · hold 1800 · msPerCaptionChar 70 · transition 0 · **60 fps**

### Transitions

- **Allowed:** cut (use=end of every push-in; shots 3–5s); fade (opacityFrom=0, opacityTo=1, ms=500, use=end mark only); typeOn (charsPerSec=14, caretPeriodMs=1000, use=search query in the bar)
- **Banned:** riseFade, slideBlur, cardStackIn, countUp

### Texture / card / camera

- grain `0.02`, seed `11`, vignette `0.35`, scanlines `0`.
- card radius `28`, border `1`, shadow `0 0 0 1px rgba(255,255,255,0.06) inset, 0 40px 120px rgba(0,0,0,0.7)`, max width `1400`.
- camera driftAmp `0.006` over 14s, zoom `[1, 1.35]` (snap).
- sound: keypress, softClick; banned impact, paymentTap, streamTick; music lift on endCard.

### Bans

- Windows are dark glass (#111111) with a hairline top highlight; never light mode
- The backdrop is a slow monochrome liquid-chrome swirl; never colored gradients
- Selection rings are a muted tint of the selected item's own color; no neon brand-colored focus rings
- Caret is a thin white bar blinking ~1s; never a block caret (that is vercel/terminal)
- End card: UPPERCASE mono word pairs pushed to the frame edges ("NEW ··· LAUNCHER DESIGN"), hard cut, then a small centered mark; no tagline paragraph
- No 3D tilt; push straight in

---

## vercel

**When:** Infra, API, SDK and platform launches.

**Sources** (unofficial measurements; frames PIL-sampled):
- https://x.com/vercel/status/2071620375621009416 ("VOICE AGENTS ON VERCEL" / "AUDIO IS LIVE ON AI GATEWAY")
- https://x.com/vercel/status/2110786348131258456 (Drives: hairline isometric wireframes "FRONTEND" / "BACKEND")

### Film grammar (measured from frames)

1. All-caps Geist Mono on pure black, typed at ~90ms/char with a blinking block caret (~1s period).
2. Small mono terminal transcript builds line by line.
3. White hairline isometric wireframes with leader-line labels; almost static (no camera, no grain); hard cuts.
4. Their ▲ logo glyph is replaced by ■ in the preset; drop in the real logo if you have rights.

**Fonts:** Real fonts: Geist + Geist Mono (Vercel's own, free on Google Fonts).

### Palette (hex)

| Role | Hex |
| --- | --- |
| bg | `#000000` |
| surface | `#0a0a0a` |
| border | `#333333` |
| text | `#ffffff` |
| muted | `#666666` |
| accent | `#ffffff` |
| accentOnLight | `#000000` |

### Type @ 1920×1080

| Role | Family (free stand-in) | Size | Weight | Tracking | LH |
| --- | --- | --- | --- | --- | --- |
| caption | Geist Mono | 56px | 500 | 0em | 1.2 |
| captionMuted | Geist Mono | 56px | 400 | 0em | 1.2 |
| cardTitle | Geist | 26px | 500 | -0.01em | 1.3 |
| cardBody | Geist | 19px | 400 | 0em | 1.5 |
| mono | Geist Mono | 24px | 400 | 0em | 1.35 |
| meta | Geist Mono | 26px | 400 | 0.04em | 1.3 |
| display | Geist Mono | 40px | 500 | 0.1em | 1.2 |

### Easings / durations

- enter `cubic-bezier(0, 0, 1, 1)` · exit `cubic-bezier(0.4, 0, 1, 1)` · settle `cubic-bezier(0.16, 1, 0.3, 1)` · snap `cubic-bezier(0.65, 0, 0.35, 1)`
- enter 0 · exit 0 · settle 900 · hold 2500 · msPerCaptionChar 90 · transition 0 · **30 fps**

### Transitions

- **Allowed:** cut (use=every change); typeOn (charsPerSec=11, caretPeriodMs=1000, caret=block, use=headlines + terminal lines)
- **Banned:** fade, riseFade, slideBlur, cardStackIn, countUp

### Texture / card / camera

- grain `0`, seed `5`, vignette `0`, scanlines `0`.
- card radius `8`, border `1`, shadow `none`, max width `1400`.
- camera driftAmp `0` over 20s, zoom `[1, 1]` (settle).
- sound: keypress, tick; banned whoosh, impact, riser, paymentTap, softClick; music lift on captionHit.

### Bans

- Everything on screen is UPPERCASE Geist Mono except UI card text; no sans headlines
- Typed text uses a solid white block caret that blinks ~1s; never a thin bar
- No hue: white, grays and black only. A dim green ✓ (#73c38f) is allowed in terminal success lines only
- Diagrams are 1–2px white hairline isometric wireframes (solid + dashed) with leader-line labels; no fills, no glow
- The source uses ▲ (Vercel's logo) as the eyebrow glyph; presets are unofficial, so use a neutral ■ / ◆ / your own mark instead. No gradients
- No camera motion, no grain, no vignette; hard cuts only

---

## granola

**When:** Friendly consumer/prosumer AI apps (notes, voice, writing).

**Sources** (unofficial measurements; frames PIL-sampled):
- https://x.com/meetgranola/status/2115837013975081208 ("VOICE TYPING — Unlimited words, for free.")

### Film grammar (measured from frames)

1. Warm off-white paper; soft 3D keycaps (one lime "fn" key) drop in blurred with ~300ms stagger and settle with overshoot.
2. A dark pill grows out of the keys with a lime waveform + outer glow.
3. Hand-drawn marker caps headline over a soft serif line; lavender paper sheet holds UI; ends on a full-bleed lime plate with a dark mark.

**Fonts:** Headline lettering is custom (Caveat Brush substitutes); serif unconfirmed (Newsreader substitutes).

### Palette (hex)

| Role | Hex |
| --- | --- |
| bg | `#f6f6f1` |
| surface | `#ffffff` |
| surfaceAlt | `#2c2f25` |
| plate | `#b1ca4c` |
| backdrop | `#c4b1e8` |
| border | `#e2e2da` |
| text | `#343431` |
| muted | `#5e5e59` |
| accent | `#d1eb49` |
| accentOnLight | `#8a9a41` |

### Type @ 1920×1080

| Role | Family (free stand-in) | Size | Weight | Tracking | LH |
| --- | --- | --- | --- | --- | --- |
| caption | Newsreader | 92px | 400 | -0.02em | 1.1 |
| captionMuted | Newsreader | 36px | 400 | -0.01em | 1.25 |
| cardTitle | Inter | 24px | 500 | -0.01em | 1.3 |
| cardBody | Inter | 24px | 400 | 0em | 1.4 |
| mono | JetBrains Mono | 18px | 400 | 0em | 1.4 |
| meta | Inter | 30px | 500 | -0.01em | 1.1 |
| display | Caveat Brush | 170px | 400 | 0.01em | 0.95 |

### Easings / durations

- enter `cubic-bezier(0.34, 1.56, 0.64, 1)` · exit `cubic-bezier(0.4, 0, 1, 1)` · settle `cubic-bezier(0.22, 1, 0.36, 1)` · snap `cubic-bezier(0.65, 0, 0.35, 1)`
- enter 600 · exit 350 · settle 1000 · hold 2200 · msPerCaptionChar 60 · transition 500 · **30 fps**

### Transitions

- **Allowed:** cut (use=between beats); fade (opacityFrom=0, opacityTo=1, ms=400); riseFade (yPx=24, opacityFrom=0, use=serif line under the headline); slideBlur (xPx=240, blurPx=18, opacityFrom=0, use=keycaps drop in blurred; one whip per film); cardStackIn (yPx=-80, scaleFrom=0.9, staggerMs=300, use=keycaps); typeOn (charsPerSec=18, use=dictated text appearing in a note)
- **Banned:** countUp

### Texture / card / camera

- grain `0.06`, seed `17`, vignette `0`, scanlines `0`.
- card radius `22`, border `0`, shadow `0 2px 0 rgba(0,0,0,0.06), 0 18px 50px rgba(60,60,40,0.14)`, max width `1300`.
- camera driftAmp `0.004` over 16s, zoom `[1, 1.08]` (settle).
- sound: keypress, softClick, whoosh; banned impact, streamTick, paymentTap, riser; music lift on endCard.

### Bans

- One lime (#d1eb49) object per shot (a key, the waveform, the end plate); lime never colors text
- Hand-drawn display caps for ONE headline only; everything else is serif or small sans
- Keycaps are soft rounded 3D (top face + darker side), not flat icons
- Paper grain stays visible on off-white and lavender; no pure white stage, no pure black
- The glow is the waveform's only; no drop-shadow glows on text
- No tech-dark UI, no mono headlines

---

## stripe-terminal

**When:** CLI/API launches for payments, fintech or agent tooling.

**Sources** (unofficial measurements; frames PIL-sampled):
- https://x.com/stripe/status/2115122346075832468 (`stripe pay` from the terminal; source is 1080×1080 square)

### Film grammar (measured from frames)

1. macOS window (light frame `#eeefed`) holding a deep-indigo TUI (`#121022`); command typed at ~100ms/char.
2. Spinner box ("Looking up…") resolves to a ✓ line; key/value panels with indigo borders and a nested recipient card.
3. Hard cut to a light approval modal over a blurred blue-gray dashboard. Preset renders 1920×1080 (square crop also works).

**Fonts:** TUI face is the user's terminal font (SF Mono-like); JetBrains Mono substitutes. Stripe's UI sans is Söhne (licensed); Inter substitutes.

### Palette (hex)

| Role | Hex |
| --- | --- |
| bg | `#eeefed` |
| surface | `#121022` |
| surfaceAlt | `#fcfcfc` |
| plate | `#becdda` |
| border | `#4f3da9` |
| text | `#dddaeb` |
| muted | `#767484` |
| accent | `#644dda` |
| accentOnLight | `#4822f2` |

### Type @ 1920×1080

| Role | Family (free stand-in) | Size | Weight | Tracking | LH |
| --- | --- | --- | --- | --- | --- |
| caption | Inter | 44px | 600 | -0.02em | 1.2 |
| captionMuted | Inter | 24px | 400 | 0em | 1.4 |
| cardTitle | Inter | 24px | 600 | -0.01em | 1.3 |
| cardBody | Inter | 19px | 400 | 0em | 1.5 |
| mono | JetBrains Mono | 30px | 400 | 0em | 1.45 |
| meta | JetBrains Mono | 22px | 400 | 0em | 1.4 |

### Easings / durations

- enter `cubic-bezier(0.25, 0.1, 0.25, 1)` · exit `cubic-bezier(0.4, 0, 1, 1)` · settle `cubic-bezier(0.16, 1, 0.3, 1)` · snap `cubic-bezier(0.65, 0, 0.35, 1)`
- enter 200 · exit 0 · settle 600 · hold 2000 · msPerCaptionChar 100 · transition 0 · **30 fps**

### Transitions

- **Allowed:** cut (use=TUI → light modal (11.37s) → window (15.8s)); fade (opacityFrom=0, opacityTo=1, ms=200, use=TUI panels printing in); typeOn (charsPerSec=10, caret=block, use=the one typed command)
- **Banned:** riseFade, slideBlur, cardStackIn, countUp

### Texture / card / camera

- grain `0`, seed `9`, vignette `0`, scanlines `0`.
- card radius `14`, border `1`, shadow `0 30px 80px rgba(20,16,50,0.25)`, max width `1500`.
- camera driftAmp `0` over 20s, zoom `[1, 1.06]` (settle).
- sound: keypress, tick, paymentTap; banned whoosh, impact, riser, streamTick; music lift on captionHit.

### Bans

- The TUI is deep indigo (#121022) with indigo box borders; never green-on-black (that is terminal-mono)
- Exactly one typed command per film; output prints, it is not typed
- Spinner → ✅ resolution lines are the payoff beats; green only on ✓ and the amount
- Light modal sits on a blurred blue-gray dashboard plate; one indigo (#4822f2) primary button
- No Stripe logo or wordmark; no gradient blobs
- No camera moves beyond a ≤6% push; hard cuts between surfaces

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
