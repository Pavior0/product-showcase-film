import type { Theme } from "./types.ts";

/**
 * linear — learned from Linear's own launch films on X:
 *   https://x.com/linear/status/2079233260161323371  ("Introducing Loops", 40.5s)
 *   https://x.com/linear/status/2060048202796040655  ("Code review, but faster. Introducing Diffs", 52.0s)
 * Grammar: monochrome near-black, light is the accent. Either an orbital HUD (thin rings, tick
 * rings, glowing arcs travelling between node dots, small UPPERCASE mono labels) or tilted 3D
 * passes over the dark app with rack focus. Sentence-case sans end cards that blur in and
 * brighten from gray to cool white, then the logo. Hex values sampled with PIL from 1080p frames.
 */
export const linear: Theme = {
  id: "linear",
  name: "Linear",
  useWhen:
    "Project tools, workflow automation, issue trackers that want the Linear launch-film look: monochrome orbit HUDs or tilted dark UI with rack focus, sentence-case end cards, one indigo action.",
  frame: { width: 1920, height: 1080, fps: 60 },
  palette: {
    bg: "#000000", // end cards + outer frame, measured exact
    surface: "#0a0a0f", // app surface in Diffs (measured #0a0a0f); HUD floor #0a0a0a–#0f0f0f
    border: "#26262c", // orbit rings / panel edges (dim gray)
    text: "#e7e9f1", // end-card text at full brightness (measured ramp #5d5c61 → #e7e9f1)
    muted: "#8f949b", // sidebar labels / end-card start tone (measured #909a9f, #9d9d9d)
    accent: "#6860b6", // "Submit review" button core (measured #6860b6; brand #5e6ad2)
    accentOnLight: "#5e6ad2",
  },
  type: {
    // End card: "Experience the diff" = 987px wide @1920 → ~96px grotesk, weight ~500
    caption: {
      family: '"Inter", "Inter Display", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500;600",
      sizePx: 88,
      weight: 500,
      trackingEm: -0.02,
      lineHeight: 1.1,
    },
    captionMuted: {
      family: '"Inter", "Inter Display", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 88,
      weight: 500,
      trackingEm: -0.02,
      lineHeight: 1.1,
    },
    cardTitle: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@500;600",
      sizePx: 26,
      weight: 500,
      trackingEm: -0.01,
      lineHeight: 1.3,
    },
    cardBody: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400",
      sizePx: 18,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.5,
    },
    // HUD node labels: UPPERCASE mono, tracked. Brand exception, short labels only.
    mono: {
      family: '"Geist Mono", "Berkeley Mono", ui-monospace, monospace',
      googleFonts: "Geist+Mono:wght@400;500",
      sizePx: 24,
      weight: 500,
      trackingEm: 0.12,
      lineHeight: 1.2,
    },
    meta: {
      family: '"Geist Mono", ui-monospace, monospace',
      googleFonts: "Geist+Mono:wght@400",
      sizePx: 15,
      weight: 400,
      trackingEm: 0.04,
      lineHeight: 1.3,
    },
  },
  easings: {
    enter: { css: "cubic-bezier(0.25, 0.1, 0.25, 1)", bezier: [0.25, 0.1, 0.25, 1] },
    exit: { css: "cubic-bezier(0.4, 0, 1, 1)", bezier: [0.4, 0, 1, 1] },
    settle: { css: "cubic-bezier(0.16, 1, 0.3, 1)", bezier: [0.16, 1, 0.3, 1] },
    snap: { css: "cubic-bezier(0.65, 0, 0.35, 1)", bezier: [0.65, 0, 0.35, 1] }, // camera orbit
  },
  durations: {
    enterMs: 800, // end-card blur-in (Loops 31.2→32.0s); Diffs 0.5s
    exitMs: 300, // fade-out (Diffs 46.8→47.1s)
    settleMs: 1500, // brightness ramp gray→white keeps going after the blur clears
    holdMs: 1800, // end-card line held ~1.7–2.1s
    msPerCaptionChar: 90,
    transitionMs: 400, // soft dissolves inside the HUD; Diffs also hard-cuts between macro passes
  },
  transitions: [
    { id: "cut", allowed: true, params: { use: "between tilted UI passes; black gap 200–600ms before logo" } },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1, ms: 400 } },
    { id: "riseFade", allowed: false, params: { yPx: 0, opacityFrom: 0 } },
    { id: "slideBlur", allowed: false, params: { xPx: 0, blurPx: 0, opacityFrom: 0 } },
    { id: "cardStackIn", allowed: false, params: { yPx: 0, scaleFrom: 1, staggerMs: 0 } },
    { id: "typeOn", allowed: true, params: { charsPerSec: 28, use: "HUD labels decode in beside a node" } },
    { id: "countUp", allowed: false, params: { durationMs: 0 } },
  ],
  texture: {
    grainOpacity: 0.05,
    grainFreq: 0.85,
    grainSeed: 21,
    grainOctaves: 2,
    vignette: 0.5,
    scanlineOpacity: 0,
  },
  card: {
    radiusPx: 12,
    borderWidthPx: 1,
    shadow: "0 40px 120px rgba(0,0,0,0.6)",
    paddingPx: [18, 22, 18, 22],
    maxWidthPx: 1500,
  },
  camera: {
    // Continuous: slow orbit/tilt of the HUD, dolly + rack focus over tilted UI. Shots avg ~5s.
    driftAmp: 0.012,
    driftPeriodSec: 12,
    zoomRange: [0.6, 1.25], // Loops ends on a zoom-out to a small orbit mark
    zoomEasing: "snap",
  },
  sound: {
    // Audio tracks exist but were NOT analyzed; conservative default.
    allowed: ["tick", "softClick"],
    banned: ["whoosh", "impact", "paymentTap", "keypress"],
    musicLiftOn: "logo",
  },
  bans: [
    "Monochrome: the only hue is the indigo action (one button/pill per shot). Diff add/remove rows are the single exception, desaturated (#18655d / #713943) and inside code views only",
    "UPPERCASE is allowed only for short HUD node labels in the mono role (≤4 words); captions, end cards and UI stay sentence case",
    "End cards: sentence case sans, centered on #000000, blur-in + brighten from muted to text; no slide, no scale pop",
    "No light cards, no cobalt, no grain-heavy look (that is event-noir)",
    "No green phosphor, no scanlines, no typing terminal (that is terminal-mono)",
    "UI is always tilted in 3D with depth of field; never a flat screenshot",
    "Glow belongs to arcs and node dots only; never on text blocks",
    "No agent meta copy on screen",
  ],
};

export default linear;
