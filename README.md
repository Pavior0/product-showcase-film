# psf-themes — product-showcase-film theme presets

Opinionated, copy-paste theme tokens for code-driven product films.
Agents must pick **one** preset and stay inside its palette / type / motion / bans.

## Themes

| ID | Name | Use |
| --- | --- | --- |
| `event-noir` | Event Noir | Devtools / infra / billing — Polar-like dark grain + cobalt |
| `paper-editorial` | Paper Editorial | Launch essays / design tools — warm paper + terracotta |
| `terminal-mono` | Terminal Mono | CLI / security / DB — all mono, phosphor, hard edges |
| `warm-consumer` | Warm Consumer | Consumer / lifestyle — cocoa stage + peach |
| `social-reel` | Social Reel | 9:16 social ≤30s — oversized captions + coral |
| `opencode` | OpenCode | Coding agents / TUI + desktop — macro DOF UI on black, lowercase mono end cards, chip blue |
| `linear` | Linear | Issue trackers / workflows — monochrome orbit HUD or tilted UI, blur-in end cards, one indigo |

Full tables: [`references/themes.md`](references/themes.md)

## Code

- `themes/types.ts` — `Theme` type
- `themes/<id>.ts` — token objects
- `themes/base.css` — CSS variables + deterministic grain
- `themes/motion.ts` — pure `t`-functions + GSAP var helpers
- `themes/index.ts` — `getTheme`, `themeToCssVars`

## Previews

`previews/<id>.png` — static stills (caption + card + events). Regenerate:

```bash
node scripts/screenshot.mjs            # all
node scripts/screenshot.mjs opencode linear   # subset
```

`event-noir` palette sampled from Emil Widlund Polar frames (`bg #0c0c0c`, card `#d7d7d7`, accent `#381cc8`).

`opencode` and `linear` were sampled from those brands' launch films on X. The source URLs and measured values are in `references/themes.md`.
