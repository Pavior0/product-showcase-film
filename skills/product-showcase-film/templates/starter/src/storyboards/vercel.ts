/** vercel: tracked mono eyebrow + typed uppercase headline with block caret → terminal transcript → hairline wireframes → typed end line. */
import type { Storyboard } from "./types.ts";

export const vercel: Storyboard = {
  theme: "vercel",
  name: "vercel-gateway-style",
  scenes: [
    {
      id: "caption",
      dur: 3.6,
      lines: ["Audio is live on the gateway"],
      eyebrow: "■ VOICE AGENTS ON YOUR STACK",
      mode: "type",
      uppercase: true,
      at: 0.5,
      cues: [{ at: 0.5, id: "type", sfx: "keypress", every: 0.09, count: 28 }],
    },
    {
      id: "terminal",
      dur: 3.4,
      prompt: "$",
      command: "npx gateway listen --model audio",
      typeAt: 0.2,
      cps: 20,
      lines: [
        { at: 2.0, text: "connecting to region iad1", kind: "muted" },
        { at: 2.4, text: "session opened · 48 kHz · opus", kind: "out" },
        { at: 2.8, text: "✓ streaming", kind: "ok" },
      ],
      cues: [{ at: 0.2, id: "cmd", sfx: "keypress", every: 0.05, count: 32 }],
    },
    { id: "wire", dur: 2.6, labels: ["FRONTEND", "BACKEND"], cues: [{ at: 0, id: "wire" }] },
    { id: "caption", dur: 3.0, lines: ["Every modality. One gateway."], sub: "TEXT  IMAGE  VIDEO  AUDIO • LIVE", mode: "type", uppercase: true, cues: [{ at: 0, id: "end", sfx: "keypress", every: 0.09, count: 28 }] },
  ],
};
