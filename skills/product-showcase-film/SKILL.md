---
name: product-showcase-film
description: >-
  Load before making a product showcase / launch / feature demo film as code
  (not After Effects, not a screen recording). Also when the user says product
  film, code-driven demo video, Emil-style Polar film, OpenCode/Linear-style
  launch film, or HTML/DOM timeline → Playwright → ffmpeg. Enforces anti-idle
  gates: concept stills before master, framing probe before crop loops,
  project-local tools, one contact-sheet QA.
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
- `templates/starter/` (when present): Vite + TS film project with `scripts/stills.mjs`, `scripts/render.mjs`, storyboard modules. Prefer it over inventing a new scaffold.

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

## Anti-idle gates (non-negotiable)

Wall-clock waste in film loops is almost never the encode. Gate these four before spending minutes on master/chunks.

### 1. Concept stills before any master

**Gate:** do not start chunk or full master render until the user has seen and accepted **3 stills** that prove the story (not just the palette).

Pick three beats that carry the claim, typically:
- opener / title
- the beat that was wrong last time (rejection page, key interaction, ContextDB card, …)
- climax or end brand moment

```bash
node scripts/stills.mjs <t1> <t2> <t3> --theme <id> --dir out/stills/concept
```

Show those PNGs. If narrative is wrong, rewrite storyboard/copy and re-still — never “fix it in the next 8-minute render.” A rejected concept burns every chunk and the concat.

### 2. Framing probe before crop loops

**Gate:** do not iterate crop/scale/y by stills-guessing (1.25× → 1.15× → 1.13×, y 600 → 580).

Run **one** probe that prints the **page → screen effective ratio**, including:
- CSS transforms on ancestors (e.g. a `.ti-fade` `scale(1.06)` layer)
- chrome that eats width (sidebars, rails, safe margins)
- the film stage size vs viewport

Write the numbers to `out/probe/<theme>.json` (project path, not `/tmp`). Set crop/scale/y from those numbers once. Re-probe only when layout or transform chain changes.

Minimum probe output: `{ stageW, stageH, targetW, targetH, ancestorScales[], effectiveScale, sidebarPx, suggestedCrop, suggestedY }`.

### 3. Project-local tools, no patch thrash

**Gate:** keep render/stills/probe scripts under the film project's `scripts/`. Resolve Playwright/Chromium from that project (`npx playwright` / local `node_modules`). Do not drop one-off probes in `/tmp` or invent parallel `chrome.mjs` paths.

Prefer editing `storyboard` + scene modules over fragile string-patch scripts. After a structural edit: **one** `typecheck`, fix real errors, continue. Do not burn rounds on wrong patch anchors / import scopes.

### 4. One contact-sheet QA

**Gate:** do not pull frames one-by-one across locales (12, then +3, then EN 10).

After a silent pass (slice or master), build **one** contact sheet per locale (or one sheet with both rows) and review that:

```bash
# example: 4×3 sheet from stills already on disk
ffmpeg -y -i out/stills/qa/%02d.png -vf "tile=4x3:margin=8:padding=8" -frames:v 1 out/qa-contact.png
```

Or extract key storyboard times once into a folder, then tile. Look at the sheet; only re-extract a single time if that cell is wrong.

## Do

1. **Write one storyboard file**: each scene is a few lines of data (id, duration, copy, asset keys). Swapping a product name or feature means changing a constant and re-rendering.
2. **Build scenes as TypeScript modules** that create **plain DOM** (or real product components with fictional but plausible data) using preset classes/variables. Render real UI text at 2×–3× so zooms stay sharp.
3. **Animate on one timeline** with the preset's named easings and `motion.ts` helpers. Emil uses **GSAP**; prefer **Motion** if the product already uses it.
4. **Preview live in the browser** with a scrubber before any render.
5. **Pass anti-idle gates** (concept stills → framing probe → then slice/master).
6. **Render with Playwright + ffmpeg**: step the clock frame-by-frame, pipe frames to ffmpeg. Same code path for 1080p and 4K (only viewport/deviceScaleFactor changes).
7. **Treat sound as code cues**: scenes emit cue markers from the preset's sound palette (keypress, stream tick, payment tap). Mix real recordings + music offline so the biggest music lift lands on the logo/end card.
8. **Direct the agent with taste, not instructions**: give reference clips for pacing; after each cut, write durable rules (“feels like a real click”, “no whooshes”, “never invent a color”).
9. **Recut cheap**: change data, re-render — but only after gates if the change touches concept or framing.

## Don’t

- Don’t start without a preset, or mix two presets.
- Don’t add a second accent, gradients, glows, textures or any color the preset doesn't list.
- Don’t use transitions or easings the preset doesn't list.
- Don’t screen-record or generate the film with a video model.
- Don’t add whoosh SFX or motion that doesn't read as a real user action.
- Don’t bury timings in magic numbers across files; keep them in the storyboard.
- Don’t ship agent meta (“here’s what I built”) on screen; only end-user product language ([no-ui-slop](sand-workflow:no-ui-slop)).
- Don’t copy or redistribute Emil’s paid Polar skill package.
- Don’t render a full master (or multi-chunk bilingual master) before concept stills are accepted.
- Don’t tune crop/scale/y by stills trial-and-error when a framing probe would print the ratio.
- Don’t leave probes/patches in `/tmp` or alternate Chromium entrypoints.
- Don’t QA by opening dozens of single frames across locales — use one contact sheet.

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
3. Scaffold (prefer `templates/starter`) + storyboard data; scrub in the browser.
4. **Concept stills gate** — 3 PNGs via `stills.mjs`; stop for user OK on narrative.
5. **Framing probe gate** — write `out/probe/<theme>.json`; set crop/scale/y from it once.
6. Optional short silent **slice** on the risky beat (`render.mjs --from --dur`); contact-sheet that slice if needed.
7. Full silent render (chunks only if required); **one contact-sheet QA** per locale.
8. Design-crit vs `previews/<id>.png`; write standing rules from the notes.
9. Sound cues + music hit; loudness check; human listen.
10. Export master + web + poster.

Necessary design work (merging beats, shared copy across shots, recomputing storyboard/cues/README) stays in the loop. Encode time is fine. Idle is concept-after-render, crop guessing, tool path thrash, and serial frame QA.

## Done when

- Every visible color, font, easing and transition traces to the chosen preset.
- Concept stills were accepted before master render; framing came from a probe, not a crop ladder.
- Scrub preview matches storyboard timings.
- Full render is deterministic (second pass matches first).
- QA reviewed via contact sheet(s), not a pile of one-off extracts.
- No whooshes or agent chrome; music lift lands on the end brand moment; SFX sync to real actions.
