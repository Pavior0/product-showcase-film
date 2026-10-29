/** cursor: word-by-word caption on white (hard cuts) → flat window on warm-gray plate with pointer + orange stat → lilac plate → caption. */
import type { Storyboard } from "./types.ts";

export const cursor: Storyboard = {
  theme: "cursor",
  name: "cursor-launch-style",
  scenes: [
    { id: "caption", dur: 2.0, lines: ["Introducing code hosting"], mode: "wordCut", perWord: 0.25, at: 0.25, cues: [{ at: 0.25, id: "words" }] },
    {
      id: "window",
      dur: 3.0,
      title: "Pull requests",
      bg: "plate",
      push: [1.0, 1.06],
      rows: [
        { label: "Move auth to edge middleware", meta: "#412", chip: "Ready" },
        { label: "Cache embeddings per repo", meta: "#411" },
        { label: "Fix flaky checkout test", meta: "#409" },
      ],
      pointer: { at: 1.5, row: 0 },
      cues: [{ at: 1.5, id: "click", sfx: "softClick" }],
    },
    { id: "caption", dur: 1.8, lines: ["Click [+ New] to start a run"], mode: "wordCut", perWord: 0.22, at: 0.1, cues: [{ at: 0.1, id: "chip-line" }] },
    {
      id: "window",
      dur: 2.6,
      title: "Cost per commit",
      bg: "backdrop",
      // no push here: a big countUp numeral under a changing zoom is order-dependent in Chrome's glyph cache
      rows: [
        { label: "Frontier model", meta: "$0.41" },
        { label: "Routed", meta: "$0.17" },
      ],
      stat: { at: 0.6, to: 58, suffix: "%", label: "cheaper" },
      cues: [{ at: 0.6, id: "stat" }],
    },
    { id: "caption", dur: 1.6, lines: ["Available today"], mode: "wordCut", perWord: 0.25, cues: [{ at: 0, id: "end" }] },
  ],
};
