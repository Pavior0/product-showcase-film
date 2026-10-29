/**
 * linear (dark): orbit HUD with tracked mono node labels → tilted dark UI push-in →
 * 2-line blur-in end card → black → typeset mark blur-in. Grammar from Loops / Diffs / Loops-caps.
 */
import type { Storyboard } from "./types.ts";

export const linear: Storyboard = {
  theme: "linear",
  name: "linear-loops-style",
  scenes: [
    { id: "hud", dur: 3.2, nodes: ["Issue is assigned", "Loop trigger", "Run agent", "Post update"], focus: 0, cues: [{ at: 0.4, id: "node-decode", sfx: "tick" }] },
    {
      id: "window",
      dur: 3.4,
      title: "Triage",
      tilt: 14,
      push: [1.0, 1.18],
      rows: [
        { label: "ENG-2140  Sync drops offline edits", meta: "In progress" },
        { label: "ENG-2141  Loops: add Slack trigger", meta: "Todo", chip: "Agent" },
        { label: "ENG-2142  Diff viewer jumps on scroll", meta: "Backlog" },
        { label: "ENG-2143  Rate-limit webhook retries", meta: "Todo" },
      ],
      pointer: { at: 1.6, row: 1 },
      cues: [{ at: 1.6, id: "row-click", sfx: "softClick" }],
    },
    { id: "caption", dur: 3.0, lines: ["Automate product work with", "new triggers and actions"], mode: "blurIn", exit: true, cues: [{ at: 0, id: "end-caption" }] },
    { id: "black", dur: 0.5, cues: [] },
    { id: "mark", dur: 1.8, text: "Your product", glyph: "◐", cues: [{ at: 0, id: "mark", sfx: "musicLift" }] },
  ],
};
