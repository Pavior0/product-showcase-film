---
name: product-showcase-film
description: >-
  Load before making a product showcase / launch / feature demo film as code
  (not After Effects, not a screen recording). Also when the user says product
  film, code-driven demo video, Emil-style Polar film, OpenCode/Linear-style
  launch film, or HTML/DOM timeline → Playwright → ffmpeg.
license: MIT
metadata:
  author: Pavior0
  version: "0.1.0"
---
# Product showcase film (code-driven)

Make short product films where **every frame is code**: a TypeScript storyboard, DOM scenes on a shared clock, headless Chrome frame steps, ffmpeg encode. Do **not** open After Effects or record the screen.

Public method distilled from [@emilwidlund](https://x.com/emilwidlund/status/2115213417539879300) (Polar). His paid Polar agent skill is separate — use this recipe + open engines below; do not paste or reverse his paid package.

## Step 0 — pick a theme preset (mandatory)

Before writing any scene, pick **one** preset and copy its files into the film project. All colors, fonts, sizes, easings, durations, transitions, texture, card style, camera and sound cues come from that preset. Nothing outside it.

| ID | Use when |
| --- | --- |
| `event-noir` | Devtools / infra / billing / API. Polar-like: dark grain, floating mono events, light cards, one cobalt accent (sampled from Emil's film). |
| `opencode` | Agent / TUI / desktop dev tools. Measured from OpenCode's Tabs + Desktop launch films: yellow halftone opener, one long tilted close-up of the real app with slow push-in, pure-black lowercase-mono end cards on hard cuts, one blue accent. |
| `linear` | Workflow / issue tracking / polished SaaS. Measured from Linear's Loops + Diffs films: continuous camera, near-black app surfaces, uppercase mono diagram labels, sentence-case Inter end cards that blur in and brighten, one indigo accent. |
| `paper-editorial` | Launch essays, design tools, thoughtful B2B. Warm paper, serif captions, terracotta. |
| `terminal-mono` | CLI / security / DB / local-first. All mono, hard corners, phosphor green, cuts + typeOn. |
| `warm-consumer` | Consumer / lifestyle / human fintech. Cocoa stage, soft cards, peach. |
| `social-reel` | 9:16 Reels/Shorts ≤30s. Oversized captions, coral, safe margins, one card at a time. |

Files in this skill's directory:
- `references/themes.md`: full spec per preset (palette roles, type scale @1080p, named cubic-beziers, beat durations and caption reading time, allowed transitions with params, grain/vignette, card spec, camera, sound palette, per-theme bans; source film URLs for measured presets).
- `themes/<id>.ts` + `themes/types.ts` + `themes/index.ts`: typed tokens.
- `themes/base.css`: tokens as CSS variables; seeded deterministic grain.
- `themes/motion.ts`: transitions as pure functions of `t` (slideBlur, riseFade, cardStackIn, typeOn, countUp, caretBlink), usable inside GSAP/Motion timelines.
- `preview-pages/<id>.html`, `scripts/screenshot.mjs` (`node scripts/screenshot.mjs <id> ...`), `previews/<id>.png`: reference look per preset.
- `templates/starter/`: copy-ready Vite + TS film project (storyboard, DOM scenes, GSAP clock, Playwright → ffmpeg). Scaffold with `cp -r <skill>/templates/starter my-film`.

Rules:
- Swap only the **accent** hex to the brand's real accent and the font if the brand has one. Keep every other token.
- Brand has no fitting preset → copy the nearest one and change only palette + fonts; never start from blank.
- New preset for a brand: download 1–2 of its official launch films, extract frames, sample colors and measure shot lengths / transitions / end-card timing before writing tokens. Never guess a brand's look.
- Use real logo files; never redraw a wordmark.
- Screenshot a frame of each scene and compare it against `previews/<id>.png`. If it drifts (new colors, extra accent, different radius, new transition), fix the scene, not the preset.

## Architecture

```
theme preset (tokens + base.css + motion.ts)
  → storyboard.ts (scene list + timings + copy constants)
  → scene modules (build plain DOM)
  → timeline (GSAP or Motion; preset easings only)
  → live browser preview (scrub any frame)
  → Playwright headless Chrome (advance clock 1 frame → screenshot)
  → ffmpeg (frames + offline-mixed audio → 1080p/4K 60fps)
```

Determinism rule: **frame N depends only on time `t = N / fps`**, never on “previous frame” side effects. No `Math.random()` at render time; seed everything.

## Do

1. **Write one storyboard file**: each scene is a few lines of data (id, duration, copy, asset keys). Swapping a product name or feature means changing a constant and re-rendering.
2. **Build scenes as TypeScript modules** that create **plain DOM** (or real product components with fictional but plausible data) using preset classes/variables. Render real UI text at 2×–3× so zooms stay sharp.
3. **Animate on one timeline** with the preset's named easings and `motion.ts` helpers. Emil uses **GSAP**; prefer **Motion** if the product already uses it.
4. **Preview live in the browser** with a scrubber before any render.
5. **Render with Playwright + ffmpeg**: step the clock frame-by-frame, pipe frames to ffmpeg. Same code path for 1080p and 4K (only viewport/deviceScaleFactor changes).
6. **Treat sound as code cues**: scenes emit cue markers from the preset's sound palette (keypress, stream tick, payment tap). Mix real recordings + music offline so the biggest music lift lands on the logo/end card.
7. **Direct the agent with taste, not instructions**: give reference clips for pacing; after each cut, write durable rules (“feels like a real click”, “no whooshes”, “never invent a color”).
8. **Recut cheap**: change data, re-render.

## Don’t

- Don’t start without a preset, or mix two presets.
- Don’t add a second accent, gradients, glows, textures or any color the preset doesn't list.
- Don’t use transitions or easings the preset doesn't list.
- Don’t screen-record or generate the film with a video model.
- Don’t add whoosh SFX or motion that doesn't read as a real user action.
- Don’t bury timings in magic numbers across files; keep them in the storyboard.
- Don’t ship agent meta (“here’s what I built”) on screen; only end-user product language.
- Don’t copy or redistribute Emil’s paid Polar skill package.

## Open engines (pick one)

| Engine | When |
| --- | --- |
| [display-dev/product-film](https://github.com/display-dev/product-film) | Product UI films + review loop; MIT |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | General HTML → video for agents |
| [Remotion](https://www.remotion.dev/) | Team already on React Remotion (check license) |
| Minimal custom | Vite + DOM + preset + Playwright screenshot loop + ffmpeg |

The preset files are engine-agnostic: import tokens/CSS into whichever engine you use.

## Agent loop

1. One-sentence brief: audience, length (~15–90s), aspect (16:9 / 9:16), one story beat.
2. Pick the preset; set the accent to the brand's real color.
3. Copy `templates/starter` (or scaffold storyboard + empty scenes); set the theme id; first silent pass.
4. Screenshot each scene vs `previews/<id>.png`; design-crit pass, then write the notes down as standing rules.
5. Add sound cues + music hit; loudness check; human listen.
6. Export master + web + poster.

## Done when

- Every visible color, font, easing and transition traces to the chosen preset.
- Scrub preview matches storyboard timings.
- Full render is deterministic (second pass matches first).
- No whooshes or agent chrome; music lift lands on the end brand moment; SFX sync to real actions.
