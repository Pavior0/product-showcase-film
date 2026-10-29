/** opencode dogfood film (19.9s): macro take of the app → lowercase mono end cards on hard cuts. */
import type { MacroBeats, MacroCopy, Scene, Storyboard } from "./types.ts";

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

const scenes: Scene[] = [
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


export const opencode: Storyboard = { theme: "opencode", name: "opencode-dogfood", scenes };
