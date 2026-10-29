/** stripe-terminal: macOS window with indigo TUI, one typed command, spinner → ✓, boxed panel → hard cut to light approval modal. */
import type { Storyboard } from "./types.ts";

export const stripeTerminal: Storyboard = {
  theme: "stripe-terminal",
  name: "stripe-cli-pay-style",
  scenes: [
    {
      id: "terminal",
      dur: 6.2,
      chrome: true,
      prompt: "›",
      command: "acme pay @studio_north 10.00 usd",
      typeAt: 0.4,
      lines: [
        { at: 3.8, text: "Looking up recipient", kind: "spin", until: 4.8 },
        { at: 4.8, text: "✓ Recipient found", kind: "ok" },
      ],
      panel: { at: 5.1, title: "Live mode transfer", rows: [["Amount", "10.00 USD"], ["To", "@studio_north"], ["Fee", "0.00 USD"]] },
      cues: [{ at: 0.4, id: "cmd", sfx: "keypress", every: 0.1, count: 32 }, { at: 4.8, id: "found", sfx: "tick" }],
    },
    {
      id: "window",
      dur: 3.0,
      title: "Requesting to pay $10.00",
      bg: "plate",
      light: true,
      rows: [
        { label: "studio_north", meta: "Recipient" },
        { label: "Approve", chip: "Approve" },
      ],
      pointer: { at: 1.6, row: 1 },
      cues: [{ at: 1.6, id: "approve", sfx: "paymentTap" }],
    },
  ],
};
