/**
 * The film as data. Scenes play back to back; `dur` is seconds.
 * Beats inside a scene (`at`) are scene-local seconds. Cues feed scripts/cues.mjs.
 * No imports here: scripts/cues.mjs loads this file with a plain esbuild transform.
 */

export type Sfx = "keypress" | "softClick" | "musicLift";

export type Cue = {
  /** scene-local seconds */
  at: number;
  id: string;
  sfx?: Sfx;
  /** repeat the cue `count` times, `every` seconds apart (typing) */
  every?: number;
  count?: number;
};

export type ToolLine = {
  at: number;
  kind: "read" | "edit" | "run" | "pass" | "say";
  verb: string;
  text: string;
  meta?: string;
};

export type MacroCopy = {
  tabs: string[];
  newTabPlaceholder: string;
  newTabTitle: string;
  sessionHeader: string;
  prompt: string;
  tools: ToolLine[];
};

export type Scene =
  | { id: "macro"; dur: number; copy: MacroCopy; beats: MacroBeats; cues: Cue[] }
  | { id: "black"; dur: number; cues: Cue[] }
  | { id: "title"; dur: number; copy: { lead: string; rest: string }; cues: Cue[] }
  | { id: "wordmark"; dur: number; copy: { a: string; b: string }; cues: Cue[] }
  | { id: "line"; dur: number; copy: { text: string; tone: "text" | "muted" }; cues: Cue[] };

export type MacroBeats = {
  /** yellow halftone plate visible until dissolveStart, gone at dissolveEnd */
  dissolveStart: number;
  dissolveEnd: number;
  plusClick: number;
  titleTypeStart: number;
  titleCps: number;
  titleCommit: number;
  promptTypeStart: number;
  promptCps: number;
  promptSubmit: number;
  streamCps: number;
};

export const film = {
  name: "opencode-dogfood",
  theme: "opencode",
  fps: 60,
  width: 1920,
  height: 1080,
} as const;

const macroCopy: MacroCopy = {
  tabs: ["Fixing audio sync", "Refactor auth flow"],
  newTabPlaceholder: "New session",
  newTabTitle: "Camera panel",
  sessionHeader: "Camera panel",
  prompt: "move the camera preview into its own panel",
  tools: [
    { at: 6.75, kind: "read", verb: "Read", text: "src/camera/Preview.tsx" },
    { at: 7.25, kind: "read", verb: "Read", text: "src/layout/panels.ts" },
    { at: 7.85, kind: "edit", verb: "Edit", text: "src/camera/CameraPanel.tsx", meta: "+48 −12" },
    { at: 8.45, kind: "edit", verb: "Edit", text: "src/layout/panels.ts", meta: "+6 −1" },
    { at: 9.0, kind: "run", verb: "Bash", text: "bun test camera" },
    { at: 9.55, kind: "pass", verb: "✓", text: "14 passed", meta: "0 failed · 1.8s" },
  ],
};

const macroBeats: MacroBeats = {
  dissolveStart: 1.15,
  dissolveEnd: 1.45,
  plusClick: 2.55,
  titleTypeStart: 2.95,
  titleCps: 14,
  titleCommit: 4.15,
  promptTypeStart: 4.75,
  promptCps: 30,
  promptSubmit: 6.4,
  streamCps: 110,
};

export const scenes: Scene[] = [
  {
    id: "macro",
    dur: 11.0,
    copy: macroCopy,
    beats: macroBeats,
    cues: [
      { at: 1.15, id: "halftone-dissolve" },
      { at: 2.55, id: "plus-click", sfx: "softClick" },
      { at: 2.95, id: "type-title", sfx: "keypress", every: 1 / 14, count: macroCopy.newTabTitle.length },
      { at: 4.15, id: "title-commit", sfx: "softClick" },
      { at: 4.75, id: "type-prompt", sfx: "keypress", every: 1 / 30, count: macroCopy.prompt.length },
      { at: 6.4, id: "prompt-submit", sfx: "softClick" },
      ...macroCopy.tools.map((l, i) => ({ at: l.at, id: `tool-${i}-${l.kind}` })),
    ],
  },
  { id: "black", dur: 0.8, cues: [] },
  {
    id: "title",
    dur: 1.5, // 1.3s hold + 0.2s fade-out (the only text fade the preset allows)
    copy: { lead: "introducing tabs", rest: " for desktop" },
    cues: [{ at: 0, id: "title-cut" }],
  },
  { id: "black", dur: 0.6, cues: [] },
  {
    id: "wordmark",
    dur: 1.5,
    copy: { a: "open", b: "code" }, // TEXT PLACEHOLDER — swap in the real OpenCode logo SVG
    cues: [{ at: 0, id: "logo-cut", sfx: "musicLift" }],
  },
  { id: "line", dur: 2.2, copy: { text: "the open source coding agent", tone: "muted" }, cues: [{ at: 0, id: "tagline-cut" }] },
  { id: "line", dur: 2.3, copy: { text: "opencode.ai", tone: "text" }, cues: [{ at: 0, id: "url-cut" }] },
];

export type Placed = { scene: Scene; index: number; start: number; end: number };

export function placeScenes(list: Scene[] = scenes): Placed[] {
  let t = 0;
  return list.map((scene, index) => {
    const p = { scene, index, start: t, end: t + scene.dur };
    t = p.end;
    return p;
  });
}

export function totalDuration(list: Scene[] = scenes): number {
  return list.reduce((s, x) => s + x.dur, 0);
}
