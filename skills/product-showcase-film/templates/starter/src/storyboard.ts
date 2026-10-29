/**
 * Storyboard registry: one example film per preset. Pick with `?theme=<id>` (preview),
 * `--theme <id>` (render/stills/determinism/cues) or `VITE_THEME=<id>`. Default: opencode.
 * Storyboards are plain data (see storyboards/types.ts) so scripts/cues.mjs can bundle them.
 */
import { cursor } from "./storyboards/cursor.ts";
import { generic } from "./storyboards/generic.ts";
import { granola } from "./storyboards/granola.ts";
import { linearLight } from "./storyboards/linear-light.ts";
import { linear } from "./storyboards/linear.ts";
import { opencode } from "./storyboards/opencode.ts";
import { raycast } from "./storyboards/raycast.ts";
import { stripeTerminal } from "./storyboards/stripe-terminal.ts";
import type { Scene, Storyboard } from "./storyboards/types.ts";
import { vercel } from "./storyboards/vercel.ts";

export type * from "./storyboards/types.ts";

export const DEFAULT_THEME = "opencode";

export const storyboards: Record<string, Storyboard> = {
  opencode,
  linear,
  "linear-light": linearLight,
  cursor,
  raycast,
  vercel,
  granola,
  "stripe-terminal": stripeTerminal,
  "event-noir": generic("event-noir"),
  "paper-editorial": generic("paper-editorial"),
  "terminal-mono": generic("terminal-mono"),
  "warm-consumer": generic("warm-consumer"),
  "social-reel": generic("social-reel"),
};

export function getStoryboard(id: string = DEFAULT_THEME): Storyboard {
  const sb = storyboards[id];
  if (!sb) throw new Error(`no storyboard for theme "${id}". Known: ${Object.keys(storyboards).join(", ")}`);
  return sb;
}

export type Placed = { scene: Scene; index: number; start: number; end: number };

export function placeScenes(list: Scene[]): Placed[] {
  let t = 0;
  return list.map((scene, index) => {
    const p = { scene, index, start: t, end: t + scene.dur };
    t = p.end;
    return p;
  });
}

export function totalDuration(list: Scene[]): number {
  return list.reduce((s, x) => s + x.dur, 0);
}
