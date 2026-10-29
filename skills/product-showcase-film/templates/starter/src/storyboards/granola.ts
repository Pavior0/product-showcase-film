/** granola: soft 3D keycaps drop in (lime key) → dark pill grows with lime waveform → hand-drawn headline + serif → lime end plate. */
import type { Storyboard } from "./types.ts";

export const granola: Storyboard = {
  theme: "granola",
  name: "granola-voice-style",
  scenes: [
    {
      id: "keys",
      dur: 4.4,
      keys: [{ label: "fn", accent: true }, { label: "voice" }, { label: "typing" }],
      headline: "",
      pillAt: 1.8,
      cues: [{ at: 0.3, id: "key-1", sfx: "keypress" }, { at: 0.6, id: "key-2", sfx: "keypress" }, { at: 0.9, id: "key-3", sfx: "keypress" }],
    },
    { id: "caption", dur: 3.2, lines: ["VOICE TYPING"], role: "display", sub: "Unlimited words, for free.", mode: "riseFade", cues: [{ at: 0, id: "headline" }] },
    { id: "caption", dur: 2.0, lines: ["Now available on Mac."], mode: "riseFade", sub: "Windows and iOS coming soon.", cues: [{ at: 0, id: "avail" }] },
    { id: "mark", dur: 1.6, text: "your app", glyph: "✳", bg: "plate", cues: [{ at: 0, id: "mark", sfx: "musicLift" }] },
  ],
};
