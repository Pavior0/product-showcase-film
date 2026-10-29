/** linear-light: sentence-case chapter title on near-white → flat card, cross-dissolve swap, slow push → gray mark. */
import type { Storyboard } from "./types.ts";

export const linearLight: Storyboard = {
  theme: "linear-light",
  name: "linear-light-triage-style",
  scenes: [
    { id: "caption", dur: 2.0, lines: ["Automate triage in your tracker"], mode: "cut", cues: [{ at: 0, id: "chapter" }] },
    {
      id: "window",
      dur: 4.4,
      title: "Triage rules",
      tilt: 0,
      push: [1.0, 1.12],
      rows: [
        { label: "Bug reports from support", meta: "→ Platform", dot: "#df5765" },
        { label: "Feature requests", meta: "→ Product", dot: "#6b6fcd" },
        { label: "Security", meta: "→ On-call", dot: "#e85830" },
      ],
      swap: {
        at: 2.0,
        title: "Suggested by agent",
        rows: [
          { label: "Duplicate of ENG-1182", meta: "92% match", dot: "#67c98a" },
          { label: "Label: Performance", meta: "suggested", dot: "#e0b800" },
          { label: "Assign: Mira K.", meta: "owner of /sync", dot: "#6b6fcd" },
        ],
      },
      cues: [{ at: 2.0, id: "card-swap", sfx: "softClick" }],
    },
    { id: "mark", dur: 1.8, text: "Your product", glyph: "◐", bg: "bg", cues: [{ at: 0, id: "mark", sfx: "musicLift" }] },
  ],
};
