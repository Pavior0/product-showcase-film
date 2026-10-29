import type { Theme } from "./types.ts";

/**
 * T2 paper-editorial — light paper / launch-essay film.
 * Warm off-white stage, ink text, one terracotta accent. Serif only for captions.
 */
export const paperEditorial: Theme = {
  id: "paper-editorial",
  name: "Paper Editorial",
  useWhen:
    "Launch essays, design-tool launches, thoughtful B2B stories. Light paper stage, serif captions, restrained motion.",
  frame: { width: 1920, height: 1080, fps: 60 },
  palette: {
    bg: "#f3efe6",
    surface: "#fffcf7",
    surfaceAlt: "#1c1a17",
    border: "#ddd4c6",
    text: "#1c1a17",
    muted: "#7a7368",
    accent: "#c45c26",
    accentOnLight: "#c45c26",
  },
  type: {
    caption: {
      family: '"Source Serif 4", "Georgia", "Times New Roman", serif',
      googleFonts: "Source+Serif+4:opsz,wght@8..60,500;8..60,600",
      sizePx: 64,
      weight: 600,
      trackingEm: -0.01,
      lineHeight: 1.15,
    },
    captionMuted: {
      family: '"Source Serif 4", "Georgia", "Times New Roman", serif',
      googleFonts: "Source+Serif+4:opsz,wght@8..60,500;8..60,600",
      sizePx: 64,
      weight: 500,
      trackingEm: -0.01,
      lineHeight: 1.15,
    },
    cardTitle: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@500;600",
      sizePx: 26,
      weight: 600,
      trackingEm: -0.01,
      lineHeight: 1.3,
    },
    cardBody: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 18,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.5,
    },
    mono: {
      family: '"IBM Plex Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@400",
      sizePx: 15,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.4,
    },
    meta: {
      family: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      googleFonts: "Inter:wght@500",
      sizePx: 12,
      weight: 500,
      trackingEm: 0.06,
      lineHeight: 1.2,
    },
  },
  easings: {
    enter: {
      css: "cubic-bezier(0.22, 1, 0.36, 1)",
      bezier: [0.22, 1, 0.36, 1],
    },
    exit: {
      css: "cubic-bezier(0.55, 0, 1, 0.45)",
      bezier: [0.55, 0, 1, 0.45],
    },
    settle: {
      css: "cubic-bezier(0.33, 1, 0.68, 1)",
      bezier: [0.33, 1, 0.68, 1],
    },
    snap: {
      css: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      bezier: [0.25, 0.1, 0.25, 1],
    },
  },
  durations: {
    enterMs: 900,
    exitMs: 560,
    settleMs: 480,
    holdMs: 1800,
    msPerCaptionChar: 45,
    transitionMs: 700,
  },
  transitions: [
    { id: "cut", allowed: true, params: {} },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1 } },
    {
      id: "riseFade",
      allowed: true,
      params: { yPx: 18, opacityFrom: 0 },
    },
    {
      id: "slideBlur",
      allowed: false,
      params: { xPx: 0, blurPx: 0, opacityFrom: 0 },
    },
    {
      id: "cardStackIn",
      allowed: true,
      params: { yPx: 24, scaleFrom: 0.98, staggerMs: 100 },
    },
    {
      id: "typeOn",
      allowed: true,
      params: { charsPerSec: 22 },
    },
    {
      id: "countUp",
      allowed: true,
      params: { durationMs: 1100 },
    },
  ],
  texture: {
    grainOpacity: 0.1,
    grainFreq: 0.9,
    grainSeed: 11,
    grainOctaves: 3,
    vignette: 0.12,
    scanlineOpacity: 0,
  },
  card: {
    radiusPx: 10,
    borderWidthPx: 1,
    shadow: "0 18px 48px rgba(28,26,23,0.08), 0 0 0 1px rgba(28,26,23,0.06)",
    paddingPx: [32, 36, 32, 36],
    maxWidthPx: 680,
  },
  camera: {
    driftAmp: 0.002,
    driftPeriodSec: 18,
    zoomRange: [1.0, 1.04],
    zoomEasing: "settle",
  },
  sound: {
    allowed: ["softClick", "tick", "keypress"],
    banned: ["whoosh", "riser", "impact", "streamTick", "paymentTap"],
    musicLiftOn: "captionHit",
  },
  bans: [
    "No slideBlur / motion-blur wipes — too cinematic for paper",
    "No dark neon accents; terracotta #c45c26 only",
    "No Instrument Serif — use Source Serif 4 only for captions",
    "No heavy drop shadows or glassmorphism",
    "No whoosh / riser / impact SFX",
    "No ALL CAPS kickers above captions",
    "No agent meta copy on screen",
  ],
};

export default paperEditorial;
