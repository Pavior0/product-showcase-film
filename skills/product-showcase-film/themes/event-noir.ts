import type { Theme } from "./types.ts";

/**
 * T1 event-noir — Polar-like dark grain showcase.
 * Colors sampled from Emil Widlund Polar film frames (bg #0c0c0c, card #d7d7d7, cobalt #381cc8).
 */
export const eventNoir: Theme = {
  id: "event-noir",
  name: "Event Noir",
  useWhen:
    "Devtools / infra / billing / API products. Dark cinematic stage, floating event strings, light cards, one cobalt accent.",
  frame: { width: 1920, height: 1080, fps: 60 },
  palette: {
    bg: "#0c0c0c",
    surface: "#141414",
    surfaceAlt: "#d7d7d7",
    border: "#2a2a2a",
    text: "#f0f0f0",
    muted: "#6e6e6e",
    accent: "#381cc8",
    accentOnLight: "#381cc8",
  },
  type: {
    caption: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@500;600;700",
      sizePx: 56,
      weight: 600,
      trackingEm: -0.02,
      lineHeight: 1.1,
    },
    captionMuted: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@500;600;700",
      sizePx: 56,
      weight: 500,
      trackingEm: -0.02,
      lineHeight: 1.1,
    },
    cardTitle: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@500;600;700",
      sizePx: 28,
      weight: 600,
      trackingEm: -0.015,
      lineHeight: 1.25,
    },
    cardBody: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 18,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.45,
    },
    mono: {
      family: '"IBM Plex Mono", "SF Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@400;500",
      sizePx: 16,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.35,
    },
    meta: {
      family: '"IBM Plex Mono", "SF Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@400;500",
      sizePx: 12,
      weight: 500,
      trackingEm: 0.08,
      lineHeight: 1.2,
    },
  },
  easings: {
    enter: {
      css: "cubic-bezier(0.16, 1, 0.3, 1)",
      bezier: [0.16, 1, 0.3, 1],
    },
    exit: {
      css: "cubic-bezier(0.7, 0, 0.84, 0)",
      bezier: [0.7, 0, 0.84, 0],
    },
    settle: {
      css: "cubic-bezier(0.22, 1, 0.36, 1)",
      bezier: [0.22, 1, 0.36, 1],
    },
    snap: {
      css: "cubic-bezier(0.2, 0, 0, 1)",
      bezier: [0.2, 0, 0, 1],
    },
  },
  durations: {
    enterMs: 720,
    exitMs: 480,
    settleMs: 400,
    holdMs: 1400,
    msPerCaptionChar: 38,
    transitionMs: 560,
  },
  transitions: [
    { id: "cut", allowed: true, params: {} },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1 } },
    {
      id: "riseFade",
      allowed: true,
      params: { yPx: 28, opacityFrom: 0 },
    },
    {
      id: "slideBlur",
      allowed: true,
      params: { xPx: 120, blurPx: 18, opacityFrom: 0 },
    },
    {
      id: "cardStackIn",
      allowed: true,
      params: { yPx: 40, scaleFrom: 0.96, staggerMs: 80 },
    },
    {
      id: "typeOn",
      allowed: true,
      params: { charsPerSec: 28 },
    },
    {
      id: "countUp",
      allowed: true,
      params: { durationMs: 900 },
    },
  ],
  texture: {
    grainOpacity: 0.22,
    grainFreq: 0.65,
    grainSeed: 7,
    grainOctaves: 4,
    vignette: 0.35,
    scanlineOpacity: 0,
  },
  card: {
    radiusPx: 14,
    borderWidthPx: 1,
    shadow: "0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
    paddingPx: [28, 32, 28, 32],
    maxWidthPx: 720,
  },
  camera: {
    driftAmp: 0.0035,
    driftPeriodSec: 14,
    zoomRange: [1.0, 1.08],
    zoomEasing: "settle",
  },
  sound: {
    allowed: ["keypress", "softClick", "tick", "streamTick", "paymentTap", "impact"],
    banned: ["whoosh", "riser"],
    musicLiftOn: "logo",
  },
  bans: [
    "No second accent color — cobalt #381cc8 only",
    "No gradient blobs / mesh gradients behind cards",
    "No whoosh or riser SFX",
    "No serif display type",
    "No emoji on stage",
    "No agent meta copy on screen",
    "No rainbow syntax highlighting — mono is text/muted/accent only",
    "Do not invent Polar brand assets; this is a palette/motion preset",
  ],
};

export default eventNoir;
