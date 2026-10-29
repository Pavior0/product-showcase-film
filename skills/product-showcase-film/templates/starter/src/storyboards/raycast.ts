/** raycast: glass search bar over liquid-chrome, typed query with thin caret, accelerating push → results → tracked mono pair → mark. */
import type { Storyboard } from "./types.ts";

export const raycast: Storyboard = {
  theme: "raycast",
  name: "raycast-launcher-style",
  scenes: [
    {
      id: "search",
      dur: 4.0,
      placeholder: "Search for apps and commands…",
      query: "clipboard hist",
      typeAt: 1.0,
      results: ["Clipboard History", "Clipboard: Paste as Plain Text", "Search Snippets", "Window: Left Half"],
      cues: [{ at: 1.0, id: "type", sfx: "keypress", every: 0.07, count: 14 }],
    },
    { id: "caption", dur: 2.2, lines: ["Desktop apps,", "reimagined by you."], mode: "cut", cues: [{ at: 0, id: "line" }] },
    { id: "pair", dur: 1.6, left: "NEW", right: "LAUNCHER DESIGN", cues: [{ at: 0, id: "pair-1" }] },
    { id: "pair", dur: 1.4, left: "COMING", right: "SOON", cues: [{ at: 0, id: "pair-2" }] },
    { id: "mark", dur: 1.4, text: "", glyph: "◆", bg: "black", cues: [{ at: 0, id: "mark", sfx: "musicLift" }] },
  ],
};
