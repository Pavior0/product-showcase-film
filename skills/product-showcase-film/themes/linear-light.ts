import type { Theme } from "./types.ts";

/**
 * linear-light — Linear's LIGHT feature films on X (a separate grammar from `linear`):
 *   https://x.com/linear/status/2071983086708150721  ("Automate Triage in Linear", 4K 60fps)
 * Grammar: a sentence-case chapter title on near-white, then flat (untilted) app UI cards with
 * soft shadows; card swaps are ~800ms cross-dissolves with a slight blur + rise; slow 1.8s
 * push-ins; status dots carry the only color; ends on a centered gray mark on white.
 * Hex sampled with PIL from 1920-wide frames of the 4K source.
 */
export const linearLight: Theme = {
  id: "linear-light",
  name: "Linear (light)",
  useWhen:
    "Feature/workflow explainers (triage, automation, settings) for a B2B tool that want Linear's light docs-film look: flat UI cards on near-white, soft cross-dissolves, color only in status dots.",
  frame: { width: 1920, height: 1080, fps: 60 },
  palette: {
    bg: "#fbfdfc", // stage, measured (faint green-tinted white)
    surface: "#fdfdfd", // UI cards (measured)
    plate: "#eff2f0", // app chrome / sidebar sheet behind cards (measured #eff2f0, #f3f3f3)
    border: "#dadada", // card hairlines (measured #dadada / #d0d0d0)
    text: "#262626", // chapter title (measured)
    muted: "#777a78", // end mark + secondary UI text (measured)
    accent: "#6b6fcd", // indigo label dot / primary action (measured #6b6fcd; brand #5e6ad2)
    accentOnLight: "#5e6ad2",
  },
  type: {
    // "Automate Triage in Linear": 1079px wide, 88px ink (cap+descender) → ~80px Inter 600.
    caption: {
      family: '"Inter", "Inter Display", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500;600",
      sizePx: 80,
      weight: 600,
      trackingEm: -0.025,
      lineHeight: 1.15,
    },
    captionMuted: {
      family: '"Inter", "Inter Display", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 80,
      weight: 500,
      trackingEm: -0.025,
      lineHeight: 1.15,
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
      sizePx: 19,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.5,
    },
    mono: {
      family: '"Geist Mono", ui-monospace, monospace',
      googleFonts: "Geist+Mono:wght@400;500",
      sizePx: 18,
      weight: 500,
      trackingEm: 0,
      lineHeight: 1.3,
    },
    meta: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@500",
      sizePx: 15,
      weight: 500,
      trackingEm: 0,
      lineHeight: 1.3,
    },
  },
  easings: {
    enter: { css: "cubic-bezier(0.25, 0.1, 0.25, 1)", bezier: [0.25, 0.1, 0.25, 1] },
    exit: { css: "cubic-bezier(0.4, 0, 1, 1)", bezier: [0.4, 0, 1, 1] },
    settle: { css: "cubic-bezier(0.16, 1, 0.3, 1)", bezier: [0.16, 1, 0.3, 1] }, // push-ins decelerate
    snap: { css: "cubic-bezier(0.65, 0, 0.35, 1)", bezier: [0.65, 0, 0.35, 1] }, // card swap (activity peaks mid-dissolve)
  },
  durations: {
    enterMs: 800, // card swap dissolves measured ~833–850ms (1.88s, 3.98s)
    exitMs: 400,
    settleMs: 1800, // push-ins 8.7→10.5s, 19.7→21.5s
    holdMs: 2000,
    msPerCaptionChar: 80,
    transitionMs: 800,
  },
  transitions: [
    { id: "cut", allowed: true, params: { use: "chapter title → first UI shot only" } },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1, ms: 800, blurPx: 8, use: "card cross-dissolve with slight blur" } },
    { id: "riseFade", allowed: true, params: { yPx: 12, opacityFrom: 0, use: "incoming card rises 12px while dissolving" } },
    { id: "slideBlur", allowed: false, params: { xPx: 0, blurPx: 0, opacityFrom: 0 } },
    { id: "cardStackIn", allowed: false, params: { yPx: 0, scaleFrom: 1, staggerMs: 0 } },
    { id: "typeOn", allowed: true, params: { charsPerSec: 30, use: "agent status line inside a card (shimmer text)" } },
    { id: "countUp", allowed: false, params: { durationMs: 0 } },
  ],
  texture: { grainOpacity: 0, grainFreq: 0.9, grainSeed: 7, grainOctaves: 1, vignette: 0, scanlineOpacity: 0 },
  card: {
    radiusPx: 12,
    borderWidthPx: 1,
    shadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)",
    paddingPx: [18, 22, 18, 22],
    maxWidthPx: 1280,
  },
  camera: { driftAmp: 0, driftPeriodSec: 20, zoomRange: [1, 1.3], zoomEasing: "settle" },
  sound: {
    allowed: ["softClick", "tick"],
    banned: ["whoosh", "impact", "riser", "keypress", "paymentTap", "streamTick"],
    musicLiftOn: "endCard",
  },
  bans: [
    "UI is flat and front-on: no 3D tilt, no depth of field, no vignette (that is `linear` dark)",
    "Color only in status/label dots inside UI: green #67c98a, red #df5765, indigo #6b6fcd, orange #e85830, yellow #e0b800; never on text or backgrounds",
    "Chapter title is sentence case Inter 600 on #fbfdfc, centered, ≤5 words; no uppercase eyebrow",
    "No grain, no glow, no gradients",
    "Card swaps dissolve (~800ms) with slight blur; no slide, no scale pop",
    "End: centered gray (#777a78) mark + wordmark on white; no tagline under it",
  ],
};

export default linearLight;
