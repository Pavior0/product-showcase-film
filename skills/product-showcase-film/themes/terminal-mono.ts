import type { Theme } from "./types.ts";

/**
 * T3 terminal-mono — CLI / infra / security tool film.
 * Pure mono type, hard edges, phosphor accent, scanlines. Zero softness.
 */
export const terminalMono: Theme = {
  id: "terminal-mono",
  name: "Terminal Mono",
  useWhen:
    "CLI tools, security, databases, local-first infra. Everything reads as a terminal: mono type, hard corners, phosphor green.",
  frame: { width: 1920, height: 1080, fps: 60 },
  palette: {
    bg: "#0a0c0a",
    surface: "#101410",
    surfaceAlt: "#0a0c0a",
    border: "#1c2a1c",
    text: "#d2e0d2",
    muted: "#5c6e5c",
    accent: "#3ddc84",
    accentOnLight: "#1a8f4e",
  },
  type: {
    caption: {
      family: '"IBM Plex Mono", "SF Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@500;600",
      sizePx: 48,
      weight: 600,
      trackingEm: -0.01,
      lineHeight: 1.2,
    },
    captionMuted: {
      family: '"IBM Plex Mono", "SF Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@400;500",
      sizePx: 48,
      weight: 400,
      trackingEm: -0.01,
      lineHeight: 1.2,
    },
    cardTitle: {
      family: '"IBM Plex Mono", "SF Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@500",
      sizePx: 20,
      weight: 500,
      trackingEm: 0,
      lineHeight: 1.35,
    },
    cardBody: {
      family: '"IBM Plex Mono", "SF Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@400",
      sizePx: 16,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.5,
    },
    mono: {
      family: '"IBM Plex Mono", "SF Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@400;500",
      sizePx: 15,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.4,
    },
    meta: {
      family: '"IBM Plex Mono", "SF Mono", ui-monospace, monospace',
      googleFonts: "IBM+Plex+Mono:wght@400",
      sizePx: 12,
      weight: 400,
      trackingEm: 0.04,
      lineHeight: 1.2,
    },
  },
  easings: {
    enter: {
      css: "cubic-bezier(0.2, 0, 0, 1)",
      bezier: [0.2, 0, 0, 1],
    },
    exit: {
      css: "cubic-bezier(0.4, 0, 1, 1)",
      bezier: [0.4, 0, 1, 1],
    },
    settle: {
      css: "cubic-bezier(0.2, 0, 0, 1)",
      bezier: [0.2, 0, 0, 1],
    },
    snap: {
      css: "cubic-bezier(0, 0, 0, 1)",
      bezier: [0, 0, 0, 1],
    },
  },
  durations: {
    enterMs: 360,
    exitMs: 240,
    settleMs: 200,
    holdMs: 1200,
    msPerCaptionChar: 32,
    transitionMs: 280,
  },
  transitions: [
    { id: "cut", allowed: true, params: {} },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1 } },
    {
      id: "riseFade",
      allowed: false,
      params: { yPx: 0, opacityFrom: 0 },
    },
    {
      id: "slideBlur",
      allowed: false,
      params: { xPx: 0, blurPx: 0, opacityFrom: 0 },
    },
    {
      id: "cardStackIn",
      allowed: false,
      params: { yPx: 0, scaleFrom: 1, staggerMs: 0 },
    },
    {
      id: "typeOn",
      allowed: true,
      params: { charsPerSec: 42 },
    },
    {
      id: "countUp",
      allowed: true,
      params: { durationMs: 600 },
    },
  ],
  texture: {
    grainOpacity: 0.08,
    grainFreq: 1.1,
    grainSeed: 3,
    grainOctaves: 2,
    vignette: 0.2,
    scanlineOpacity: 0.08,
  },
  card: {
    radiusPx: 0,
    borderWidthPx: 1,
    shadow: "none",
    paddingPx: [20, 24, 20, 24],
    maxWidthPx: 800,
  },
  camera: {
    driftAmp: 0,
    driftPeriodSec: 1,
    zoomRange: [1.0, 1.0],
    zoomEasing: "snap",
  },
  sound: {
    allowed: ["keypress", "tick", "streamTick"],
    banned: ["whoosh", "riser", "impact", "paymentTap", "softClick"],
    musicLiftOn: "endCard",
  },
  bans: [
    "No rounded corners (radius must stay 0)",
    "No serif, no Inter — IBM Plex Mono only",
    "No slideBlur / riseFade / cardStackIn — cut, fade, typeOn, countUp only",
    "No camera drift or zoom",
    "No soft shadows or blur filters on cards",
    "No whoosh / riser / impact / softClick",
    "No second accent — phosphor #3ddc84 only",
    "No agent meta copy on screen",
  ],
};

export default terminalMono;
