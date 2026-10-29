import type { Theme } from "./types.ts";

/**
 * stripe-terminal — Stripe's CLI payment film on X:
 *   https://x.com/stripe/status/2115122346075832468  (`stripe pay` from the terminal; source is 1080×1080 square)
 * Grammar: a macOS window (light frame #eeefed) holding a deep-indigo TUI (#121022); a command is
 * typed at ~100ms/char; a spinner box ("Looking up…") resolves to "✅ Recipient found"; key/value
 * panels with indigo borders and a nested recipient card; hard cut to a light approval modal over
 * a blurred blue-gray dashboard. Preset renders 1920×1080 (center the window; square crop works too).
 */
export const stripeTerminal: Theme = {
  id: "stripe-terminal",
  name: "Stripe terminal",
  useWhen:
    "CLI/API launches for payments, fintech or agent tooling that want Stripe's polished TUI look: deep indigo terminal panels, typed commands, spinner → ✓ resolutions, a light approval modal.",
  frame: { width: 1920, height: 1080, fps: 30 },
  palette: {
    bg: "#eeefed", // light window frame / stage around the terminal (measured)
    surface: "#121022", // TUI background (measured)
    surfaceAlt: "#fcfcfc", // approval modal (measured)
    plate: "#becdda", // blurred dashboard behind the modal (measured)
    border: "#4f3da9", // TUI panel borders (measured #644dda / #5a48c0 / #4f3da9)
    text: "#dddaeb", // TUI body (measured; headings #ffffff)
    muted: "#767484", // TUI labels (measured #767484 / #93929e)
    accent: "#644dda", // panel titles "Live mode transfer" and caret family (caret block #4a5399)
    accentOnLight: "#4822f2", // Approve button on the light modal (measured)
  },
  type: {
    // Light-modal headline "Requesting to pay $10.00"
    caption: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@500;600",
      sizePx: 44,
      weight: 600,
      trackingEm: -0.02,
      lineHeight: 1.2,
    },
    captionMuted: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400",
      sizePx: 24,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.4,
    },
    cardTitle: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@600",
      sizePx: 24,
      weight: 600,
      trackingEm: -0.01,
      lineHeight: 1.3,
    },
    cardBody: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400",
      sizePx: 19,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.5,
    },
    // TUI text. Real face is the user's terminal font (SF Mono-like); JetBrains Mono substitutes.
    mono: {
      family: '"JetBrains Mono", "SF Mono", Menlo, ui-monospace, monospace',
      googleFonts: "JetBrains+Mono:wght@400;600",
      sizePx: 30,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.45,
    },
    meta: {
      family: '"JetBrains Mono", "SF Mono", Menlo, ui-monospace, monospace',
      googleFonts: "JetBrains+Mono:wght@400",
      sizePx: 22,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.4,
    },
  },
  easings: {
    enter: { css: "cubic-bezier(0.25, 0.1, 0.25, 1)", bezier: [0.25, 0.1, 0.25, 1] },
    exit: { css: "cubic-bezier(0.4, 0, 1, 1)", bezier: [0.4, 0, 1, 1] },
    settle: { css: "cubic-bezier(0.16, 1, 0.3, 1)", bezier: [0.16, 1, 0.3, 1] },
    snap: { css: "cubic-bezier(0.65, 0, 0.35, 1)", bezier: [0.65, 0, 0.35, 1] },
  },
  durations: {
    enterMs: 200, // panels appear nearly instantly as the TUI prints
    exitMs: 0,
    settleMs: 600,
    holdMs: 2000,
    msPerCaptionChar: 100, // `stripe pay @elementara_ai 10.00 usd` 0.5→3.5s
    transitionMs: 0,
  },
  transitions: [
    { id: "cut", allowed: true, params: { use: "TUI → light modal (11.37s) → window (15.8s)" } },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1, ms: 200, use: "TUI panels printing in" } },
    { id: "riseFade", allowed: false, params: { yPx: 0, opacityFrom: 0 } },
    { id: "slideBlur", allowed: false, params: { xPx: 0, blurPx: 0, opacityFrom: 0 } },
    { id: "cardStackIn", allowed: false, params: { yPx: 0, scaleFrom: 1, staggerMs: 0 } },
    { id: "typeOn", allowed: true, params: { charsPerSec: 10, caret: "block", use: "the one typed command" } },
    { id: "countUp", allowed: false, params: { durationMs: 0 } },
  ],
  texture: { grainOpacity: 0, grainFreq: 0.9, grainSeed: 9, grainOctaves: 1, vignette: 0, scanlineOpacity: 0 },
  card: {
    radiusPx: 14, // macOS window; TUI panels inside are radius 6 boxes
    borderWidthPx: 1,
    shadow: "0 30px 80px rgba(20,16,50,0.25)",
    paddingPx: [24, 28, 24, 28],
    maxWidthPx: 1500,
  },
  camera: { driftAmp: 0, driftPeriodSec: 20, zoomRange: [1, 1.06], zoomEasing: "settle" },
  sound: {
    allowed: ["keypress", "tick", "paymentTap"],
    banned: ["whoosh", "impact", "riser", "streamTick"],
    musicLiftOn: "captionHit",
  },
  bans: [
    "The TUI is deep indigo (#121022) with indigo box borders; never green-on-black (that is terminal-mono)",
    "Exactly one typed command per film; output prints, it is not typed",
    "Spinner → ✅ resolution lines are the payoff beats; green only on ✓ and the amount",
    "Light modal sits on a blurred blue-gray dashboard plate; one indigo (#4822f2) primary button",
    "No Stripe logo or wordmark; no gradient blobs",
    "No camera moves beyond a ≤6% push; hard cuts between surfaces",
  ],
};

export default stripeTerminal;
