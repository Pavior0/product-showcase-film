/**
 * Fallback storyboard for presets without a dedicated one (event-noir, paper-editorial,
 * terminal-mono, warm-consumer, social-reel): caption → card → caption → mark, all from theme tokens.
 */
import type { Storyboard } from "./types.ts";

export const generic = (theme: string): Storyboard => ({
  theme,
  name: `${theme}-generic`,
  scenes: [
    { id: "caption", dur: 2.4, lines: ["Your product,", "in one line."], mode: "riseFade", cues: [{ at: 0, id: "hook" }] },
    {
      id: "window",
      dur: 3.0,
      title: "Dashboard",
      push: [1.0, 1.06],
      rows: [
        { label: "Weekly active", meta: "12,480" },
        { label: "Activation", meta: "64%" },
        { label: "Churn", meta: "1.8%" },
      ],
      cues: [{ at: 0, id: "card" }],
    },
    { id: "caption", dur: 2.2, lines: ["Available today."], mode: "riseFade", tone: "text", cues: [{ at: 0, id: "end" }] },
    { id: "mark", dur: 1.4, text: "yourproduct.com", cues: [{ at: 0, id: "mark", sfx: "musicLift" }] },
  ],
});
