import type { Theme } from "./types.ts";

/**
 * T4 warm-consumer — lifestyle / consumer app film.
 * Warm dark cocoa stage, soft cards, peach accent, friendly geometric sans.
 */
export const warmConsumer: Theme = {
  id: "warm-consumer",
  name: "Warm Consumer",
  useWhen:
    "Consumer apps, lifestyle, fintech-for-humans, mobile products. Warm dark stage, soft cards, one peach accent, gentle motion.",
  frame: { width: 1920, height: 1080, fps: 60 },
  palette: {
    bg: "#16120f",
    surface: "#221c18",
    surfaceAlt: "#f3ebe3",
    border: "#3a3028",
    text: "#f5ebe0",
    muted: "#9a8778",
    accent: "#e8a87c",
    accentOnLight: "#c47a4a",
  },
  type: {
    caption: {
      family: '"Plus Jakarta Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Plus+Jakarta+Sans:wght@500;600;700",
      sizePx: 58,
      weight: 600,
      trackingEm: -0.025,
      lineHeight: 1.12,
    },
    captionMuted: {
      family: '"Plus Jakarta Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Plus+Jakarta+Sans:wght@500;600",
      sizePx: 58,
      weight: 500,
      trackingEm: -0.025,
      lineHeight: 1.12,
    },
    cardTitle: {
      family: '"Plus Jakarta Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Plus+Jakarta+Sans:wght@600",
      sizePx: 24,
      weight: 600,
      trackingEm: -0.015,
      lineHeight: 1.3,
    },
    cardBody: {
      family: '"Plus Jakarta Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Plus+Jakarta+Sans:wght@400;500",
      sizePx: 17,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.5,
    },
    mono: {
      family: '"IBM Plex Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@400",
      sizePx: 14,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.4,
    },
    meta: {
      family: '"Plus Jakarta Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Plus+Jakarta+Sans:wght@500",
      sizePx: 12,
      weight: 500,
      trackingEm: 0.04,
      lineHeight: 1.2,
    },
  },
  easings: {
    enter: {
      css: "cubic-bezier(0.34, 1.2, 0.64, 1)",
      bezier: [0.34, 1.2, 0.64, 1],
    },
    exit: {
      css: "cubic-bezier(0.55, 0.05, 0.8, 0.4)",
      bezier: [0.55, 0.05, 0.8, 0.4],
    },
    settle: {
      css: "cubic-bezier(0.34, 1.3, 0.64, 1)",
      bezier: [0.34, 1.3, 0.64, 1],
    },
    snap: {
      css: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      bezier: [0.2, 0.8, 0.2, 1],
    },
  },
  durations: {
    enterMs: 800,
    exitMs: 500,
    settleMs: 520,
    holdMs: 1500,
    msPerCaptionChar: 40,
    transitionMs: 600,
  },
  transitions: [
    { id: "cut", allowed: true, params: {} },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1 } },
    {
      id: "riseFade",
      allowed: true,
      params: { yPx: 32, opacityFrom: 0 },
    },
    {
      id: "slideBlur",
      allowed: false,
      params: { xPx: 0, blurPx: 0, opacityFrom: 0 },
    },
    {
      id: "cardStackIn",
      allowed: true,
      params: { yPx: 36, scaleFrom: 0.94, staggerMs: 90 },
    },
    {
      id: "typeOn",
      allowed: false,
      params: { charsPerSec: 0 },
    },
    {
      id: "countUp",
      allowed: true,
      params: { durationMs: 1000 },
    },
  ],
  texture: {
    grainOpacity: 0.14,
    grainFreq: 0.7,
    grainSeed: 19,
    grainOctaves: 3,
    vignette: 0.28,
    scanlineOpacity: 0,
  },
  card: {
    radiusPx: 22,
    borderWidthPx: 1,
    shadow: "0 28px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(243,235,227,0.04)",
    paddingPx: [28, 28, 28, 28],
    maxWidthPx: 560,
  },
  camera: {
    driftAmp: 0.004,
    driftPeriodSec: 12,
    zoomRange: [1.0, 1.06],
    zoomEasing: "settle",
  },
  sound: {
    allowed: ["softClick", "paymentTap", "tick"],
    banned: ["whoosh", "riser", "streamTick", "keypress"],
    musicLiftOn: "logo",
  },
  bans: [
    "No slideBlur — keep motion soft, not cinematic-tech",
    "No typeOn terminal effects",
    "No cold blues/greens — peach #e8a87c only",
    "No sharp 0-radius cards",
    "No whoosh / riser / streamTick / keypress",
    "No dense floating event-string fields (that's event-noir)",
    "No agent meta copy on screen",
  ],
};

export default warmConsumer;
