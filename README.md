# product-showcase-film

**Short product films as code — TypeScript storyboard, DOM scenes, one deterministic clock, Playwright → ffmpeg. Opinionated theme presets so the agent cannot invent slop.**

Ask an agent for a launch film and you usually get a screen recording, a generic motion template, or AI-video mush. This skill gives a fourth path: rebuild the product UI in the DOM, animate it on a shared clock, step every frame in headless Chrome, and encode with ffmpeg. Same code for 1080p and 4K. Recuts are a constant change.

Method distilled from [@emilwidlund](https://x.com/emilwidlund/status/2115213417539879300)'s public Polar thread. His paid Polar agent skill is **not** included.

![Theme presets](docs/themes-grid.png)

## Install

```bash
npx skills add Pavior0/product-showcase-film
```

Or install only this skill:

```bash
npx skills add Pavior0/product-showcase-film --skill product-showcase-film
```

Works with Claude Code, Cursor, Codex, OpenCode, and [75+ agents](https://github.com/vercel-labs/skills/blob/main/docs/agents.md) via the [skills CLI](https://github.com/vercel-labs/skills).

Private-repo install needs a GitHub token the CLI can use (`gh auth` / `GITHUB_TOKEN`).

### Local / from a clone

```bash
npx skills add ./product-showcase-film --skill product-showcase-film
# or
npx skills add /path/to/product-showcase-film --list
```

## What's inside

```
skills/product-showcase-film/
├── SKILL.md              # agent instructions (pick a preset first)
├── references/themes.md  # full palette / type / motion / bans per preset
├── themes/               # typed tokens + base.css + motion helpers
├── previews/             # static look references (png)
├── preview-pages/        # HTML used to regenerate previews
├── scripts/              # screenshot.mjs for preview regen
└── templates/starter/    # copy-ready Vite + TS film project
```

Layout follows the [Agent Skills](https://agentskills.io) spec (`SKILL.md` + `references/` / `scripts/` / `templates/`) and the discovery rules of [`npx skills`](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md) (`skills/<name>/SKILL.md`).

### Theme presets

Pick **one**. Copy its tokens. Change only the accent hex (and font if the brand has one).

| ID | Use when |
| --- | --- |
| `event-noir` | Devtools / infra / billing — Polar-like dark grain + cobalt |
| `opencode` | Agent / TUI / desktop — measured from OpenCode launch films |
| `linear` | Workflow / SaaS — measured from Linear Loops + Diffs films |
| `paper-editorial` | Launch essays / design tools — warm paper + terracotta |
| `terminal-mono` | CLI / security / DB — phosphor mono, hard cuts |
| `warm-consumer` | Consumer / lifestyle — cocoa stage + peach |
| `social-reel` | 9:16 Reels/Shorts ≤30s — oversized captions + coral |

`opencode` and `linear` are **unofficial** measurements of those brands' public launch films on X. No logos are bundled; drop in real logo files. Typefaces may be stand-ins where the brand face is licensed (e.g. JetBrains Mono ≈ Berkeley Mono).

Full tables: [`skills/product-showcase-film/references/themes.md`](skills/product-showcase-film/references/themes.md).

### Starter template

```bash
SKILL=$(npx skills find product-showcase-film 2>/dev/null) # or path after install
cp -r ~/.agents/skills/product-showcase-film/templates/starter my-film
# exact install path depends on agent; Claude Code often uses .claude/skills/
cd my-film
npm install
npx playwright install chromium
# needs ffmpeg on PATH
npm run dev          # scrubber preview
npm run render:1080  # → out/film-1080p.mp4
```

See [`templates/starter/README.md`](skills/product-showcase-film/templates/starter/README.md) for flags, determinism checks, and sound cues.

## Usage

Tell the agent:

> Make a 20s launch film for \<product\>. Use the product-showcase-film skill. Preset: opencode. Accent: #5a82e6.

The skill forces: pick a preset → copy `templates/starter` → edit `src/storyboard.ts` → preview → Playwright frame render → ffmpeg. Frame N depends only on `t = N / fps`.

## Open alternatives

| Project | When |
| --- | --- |
| [display-dev/product-film](https://github.com/display-dev/product-film) | Product UI films + review loop (MIT) |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | HTML → video for agents |
| [Remotion](https://www.remotion.dev/) / [remotion-dev/skills](https://github.com/remotion-dev/skills) | Already on Remotion |

## Credits

- Inspiration: [Emil Widlund](https://x.com/emilwidlund/status/2115213417539879300) — public Polar thread. Paid Polar package is separate and not redistributed here.
- Open engines above for production pipelines.
- OpenCode / Linear presets measured from their public X launch films; not affiliated with either company.

## License

[MIT](./LICENSE) © 2026 Pavior0
