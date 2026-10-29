import type { Theme } from "./types.ts";

/**
 * T5 social-reel — vertical 9:16 short for Reels / Shorts / TikTok.
 * High-contrast dark, oversized captions, one coral accent, safe margins.
 */
export const socialReel: Theme = {
  id: "social-reel",
  name: "Social Reel",
  useWhen:
    "9:16 social cuts, feature teasers under 30s. Oversized captions, one coral accent, fewer elements, safe margins for platform chrome.",
  frame: { width: 1080, height: 1920, fps: 60 },
  palette: {
    bg: "#050505",
    surface: "#141414",
    surfaceAlt: "#f5f5f5",
    border: "#2c2c2c",
    text: "#ffffff",
    muted: "#8a8a8a",
    accent: "#ff3b5c",
    accentOnLight: "#e02040",
  },
  type: {
    caption: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@600;700;800",
      sizePx: 72,
      weight: 700,
      trackingEm: -0.03,
      lineHeight: 1.05,
    },
    captionMuted: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@500;600",
      sizePx: 36,
      weight: 500,
      trackingEm: -0.01,
      lineHeight: 1.2,
    },
    cardTitle: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@600",
      sizePx: 28,
      weight: 600,
      trackingEm: -0.02,
      lineHeight: 1.25,
    },
    cardBody: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 20,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.4,
    },
    mono: {
      family: '"IBM Plex Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@400;500",
      sizePx: 16,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.35,
    },
    meta: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@500",
      sizePx: 14,
      weight: 500,
      trackingEm: 0.02,
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
    enterMs: 500,
    exitMs: 360,
    settleMs: 320,
    holdMs: 1100,
    msPerCaptionChar: 42,
    transitionMs: 400,
  },
  transitions: [
    { id: "cut", allowed: true, params: {} },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1 } },
    {
      id: "riseFade",
      allowed: true,
      params: { yPx: 40, opacityFrom: 0 },
    },
    {
      id: "slideBlur",
      allowed: true,
      params: { xPx: 0, blurPx: 12, opacityFrom: 0 },
    },
    {
      id: "cardStackIn",
      allowed: true,
      params: { yPx: 48, scaleFrom: 0.92, staggerMs: 70 },
    },
    {
      id: "typeOn",
      allowed: false,
      params: { charsPerSec: 0 },
    },
    {
      id: "countUp",
      allowed: true,
      params: { durationMs: 700 },
    },
  ],
  texture: {
    grainOpacity: 0.16,
    grainFreq: 0.75,
    grainSeed: 23,
    grainOctaves: 3,
    vignette: 0.4,
    scanlineOpacity: 0,
  },
  card: {
    radiusPx: 20,
    borderWidthPx: 1,
    shadow: "0 32px 72px rgba(0,0,0,0.6)",
    paddingPx: [28, 28, 28, 28],
    maxWidthPx: 900,
  },
  camera: {
    driftAmp: 0.0025,
    driftPeriodSec: 10,
    zoomRange: [1.0, 1.1],
    zoomEasing: "enter",
  },
  sound: {
    allowed: ["softClick", "tick", "impact", "paymentTap"],
    banned: ["whoosh", "riser", "streamTick", "keypress"],
    musicLiftOn: "endCard",
  },
  bans: [
    "No 16:9 layout — frame is 1080×1920 only",
    "Keep critical copy inside 120px top / 180px bottom safe margins (platform chrome)",
    "No typeOn — too slow for social pacing",
    "No whoosh / riser",
    "No second accent — coral #ff3b5c only",
    "Max 1 card + 1 caption on screen at a time",
    "No agent meta copy on screen",
    "No tiny body under 18px",
  ],
};

export default socialReel;
