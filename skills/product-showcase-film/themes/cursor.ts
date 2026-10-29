import type { Theme } from "./types.ts";

/**
 * cursor — Cursor's launch films on X:
 *   https://x.com/cursor_ai/status/2089399057659596847  (Cursor Origin / code hosting, ~25k likes)
 *   https://x.com/cursor_ai/status/2079993729532989500  (Router / cost per commit, ~10k likes)
 * Grammar: black regular-weight sans caption on pure white that builds WORD BY WORD on hard
 * cuts (~250ms/word); 2–3s shots; hard cut into a full-bleed warm-gray (or lilac gradient) plate
 * holding a flat product window, then a slow decelerating push/scroll (~1.3s); a hand pointer
 * clicks; inline gray chips inside captions ("+ New"); one orange stat. No grain, no tilt.
 */
export const cursor: Theme = {
  id: "cursor",
  name: "Cursor",
  useWhen:
    "AI coding / dev-infra launches that want Cursor's clean editorial look: black word-by-word captions on white, flat product windows on warm-gray or lilac plates, hard cuts, one orange stat.",
  frame: { width: 1920, height: 1080, fps: 30 },
  palette: {
    bg: "#ffffff", // caption shots (measured)
    surface: "#fbfbfb", // small cards / app window body (measured)
    surfaceAlt: "#e4e4e4", // inline caption chip "+ New" (measured, radius ~10)
    plate: "#e5e3df", // warm-gray full-bleed plate, 90–95% of frame (measured)
    backdrop: "linear-gradient(160deg, #e9ddfb 0%, #c29cf9 35%, #a370f5 65%, #6a37ba 100%)", // lilac app plate (measured stops)
    border: "#e4e4e4",
    text: "#000000",
    muted: "#6d6d6d", // table secondary (measured; lighter rows #aeaeae / #cecece)
    accent: "#dd4311", // the one orange stat ("58%"), flow-chip text (measured; chip tint #f2e0db)
    accentOnLight: "#dd4311",
  },
  type: {
    // "Introducing Code Hosting": 834px wide, 67px ink → ~64px, weight 400. Real face unconfirmed
    // (Cursor uses a custom grotesk); Inter substitutes.
    caption: {
      family: '"Inter", -apple-system, "Helvetica Neue", system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 64,
      weight: 400,
      trackingEm: -0.02,
      lineHeight: 1.15,
    },
    captionMuted: {
      family: '"Inter", -apple-system, "Helvetica Neue", system-ui, sans-serif',
      googleFonts: "Inter:wght@400",
      sizePx: 64,
      weight: 400,
      trackingEm: -0.02,
      lineHeight: 1.15,
    },
    cardTitle: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@500",
      sizePx: 24,
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
    mono: {
      family: '"JetBrains Mono", "Berkeley Mono", ui-monospace, monospace',
      googleFonts: "JetBrains+Mono:wght@400",
      sizePx: 18,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.45,
    },
    meta: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400",
      sizePx: 15,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.3,
    },
  },
  easings: {
    enter: { css: "cubic-bezier(0, 0, 1, 1)", bezier: [0, 0, 1, 1] }, // words appear on cuts (no tween)
    exit: { css: "cubic-bezier(0.4, 0, 1, 1)", bezier: [0.4, 0, 1, 1] },
    settle: { css: "cubic-bezier(0.22, 1, 0.36, 1)", bezier: [0.22, 1, 0.36, 1] }, // push/scroll peaks at start
    snap: { css: "cubic-bezier(0.65, 0, 0.35, 1)", bezier: [0.65, 0, 0.35, 1] },
  },
  durations: {
    enterMs: 0, // hard-cut word build
    exitMs: 0,
    settleMs: 1300, // window push/scroll
    holdMs: 1200, // full caption holds before the cut
    msPerCaptionChar: 0,
    transitionMs: 0,
    // word cadence lives on the caption scene: ~250ms per word ("Introducing Code" @0.5s → full @0.75s)
  },
  transitions: [
    { id: "cut", allowed: true, params: { use: "everything: word builds, shot changes (2–3s shots)", msPerWord: 250 } },
    { id: "fade", allowed: false, params: { opacityFrom: 0, opacityTo: 1, ms: 0 } },
    { id: "riseFade", allowed: false, params: { yPx: 0, opacityFrom: 0 } },
    { id: "slideBlur", allowed: false, params: { xPx: 0, blurPx: 0, opacityFrom: 0 } },
    { id: "cardStackIn", allowed: false, params: { yPx: 0, scaleFrom: 1, staggerMs: 0 } },
    { id: "typeOn", allowed: true, params: { charsPerSec: 40, use: "prompt box inside the product window only" } },
    { id: "countUp", allowed: true, params: { durationMs: 900, use: "the single orange stat" } },
  ],
  texture: { grainOpacity: 0, grainFreq: 0.9, grainSeed: 3, grainOctaves: 1, vignette: 0, scanlineOpacity: 0 },
  card: {
    radiusPx: 14,
    borderWidthPx: 1,
    shadow: "0 2px 6px rgba(0,0,0,0.04), 0 24px 60px rgba(0,0,0,0.10)",
    paddingPx: [16, 20, 16, 20],
    maxWidthPx: 1500,
  },
  camera: { driftAmp: 0, driftPeriodSec: 20, zoomRange: [1, 1.15], zoomEasing: "settle" },
  sound: {
    allowed: ["softClick", "keypress"],
    banned: ["whoosh", "impact", "riser", "streamTick", "paymentTap"],
    musicLiftOn: "captionHit",
  },
  bans: [
    "Captions build word-by-word on hard cuts (~250ms/word); never fade, type or slide the caption",
    "Caption weight is regular (400) black on #ffffff; never bold, never colored, never uppercase",
    "Inline chips inside a caption are #e4e4e4 rounded rects with black text; ≤1 chip per line",
    "One orange (#dd4311) number or label per film; green appears only as real UI state (merge button #0a9453)",
    "Product windows are flat and centered on a plate (#e5e3df or the lilac gradient); no tilt, no DOF, no vignette, no grain",
    "Pointer is the macOS hand cursor; one click per shot",
    "No logo animation; end on the caption or a plain wordmark on white",
  ],
};

export default cursor;
