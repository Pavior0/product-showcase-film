import type { Theme } from "./types.ts";

/**
 * granola — Granola's launch film on X:
 *   https://x.com/meetgranola/status/2115837013975081208  ("VOICE TYPING — Unlimited words, for free.")
 * Grammar: warm off-white paper; soft 3D keycaps (one lime "fn" key) drop in blurred with a
 * ~300ms stagger and settle with overshoot; a dark pill grows out of the keys with a lime
 * waveform + outer glow; a hand-drawn marker caps headline over a soft serif line; a lavender
 * paper sheet holds UI (visible paper grain); ends on a full-bleed lime plate with a dark mark.
 */
export const granola: Theme = {
  id: "granola",
  name: "Granola",
  useWhen:
    "Friendly consumer/prosumer AI apps (notes, voice, writing) that want Granola's tactile look: off-white paper, soft 3D keycaps, one lime accent with glow, hand-drawn headline over a warm serif.",
  frame: { width: 1920, height: 1080, fps: 30 },
  palette: {
    bg: "#f6f6f1", // paper (measured)
    surface: "#ffffff",
    surfaceAlt: "#2c2f25", // dark voice pill (measured)
    plate: "#b1ca4c", // end plate lime (measured)
    backdrop: "#c4b1e8", // lavender UI sheet (measured)
    border: "#e2e2da",
    text: "#343431", // serif line (measured #343431; marker strokes #000000 / #302f32)
    muted: "#5e5e59", // small sans (measured)
    accent: "#d1eb49", // lime key face (measured; shadow side #8a9a41, waveform #a0cc63)
    accentOnLight: "#8a9a41",
  },
  type: {
    // "Unlimited words, for free.": 1216px wide → ~92px, weight 400. Real serif unconfirmed; Newsreader substitutes.
    caption: {
      family: '"Newsreader", "Young Serif", Georgia, serif',
      googleFonts: "Newsreader:opsz,wght@6..72,400;6..72,500",
      sizePx: 92,
      weight: 400,
      trackingEm: -0.02,
      lineHeight: 1.1,
    },
    // "Now available on Mac." ~36px serif
    captionMuted: {
      family: '"Newsreader", "Young Serif", Georgia, serif',
      googleFonts: "Newsreader:opsz,wght@6..72,400",
      sizePx: 36,
      weight: 400,
      trackingEm: -0.01,
      lineHeight: 1.25,
    },
    cardTitle: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@500",
      sizePx: 24,
      weight: 500,
      trackingEm: -0.01,
      lineHeight: 1.3,
    },
    // "Windows and iOS coming soon." ~22–24px sans, muted
    cardBody: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400",
      sizePx: 24,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.4,
    },
    mono: {
      family: '"JetBrains Mono", ui-monospace, monospace',
      googleFonts: "JetBrains+Mono:wght@400",
      sizePx: 18,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.4,
    },
    // keycap legends
    meta: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@500",
      sizePx: 30,
      weight: 500,
      trackingEm: -0.01,
      lineHeight: 1.1,
    },
    // "VOICE TYPING": hand-drawn marker caps, ~138px ink. Real lettering is custom; Caveat Brush substitutes.
    display: {
      family: '"Caveat Brush", "Gochi Hand", cursive',
      googleFonts: "Caveat+Brush",
      sizePx: 170,
      weight: 400,
      trackingEm: 0.01,
      lineHeight: 0.95,
    },
  },
  easings: {
    enter: { css: "cubic-bezier(0.34, 1.56, 0.64, 1)", bezier: [0.34, 1.56, 0.64, 1] }, // keycap drop with overshoot
    exit: { css: "cubic-bezier(0.4, 0, 1, 1)", bezier: [0.4, 0, 1, 1] },
    settle: { css: "cubic-bezier(0.22, 1, 0.36, 1)", bezier: [0.22, 1, 0.36, 1] },
    snap: { css: "cubic-bezier(0.65, 0, 0.35, 1)", bezier: [0.65, 0, 0.35, 1] }, // whip/slide at 17.0s
  },
  durations: {
    enterMs: 600,
    exitMs: 350,
    settleMs: 1000, // pill grows 2.4→3.4s
    holdMs: 2200,
    msPerCaptionChar: 60,
    transitionMs: 500,
  },
  transitions: [
    { id: "cut", allowed: true, params: { use: "between beats" } },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1, ms: 400 } },
    { id: "riseFade", allowed: true, params: { yPx: 24, opacityFrom: 0, use: "serif line under the headline" } },
    { id: "slideBlur", allowed: true, params: { xPx: 240, blurPx: 18, opacityFrom: 0, use: "keycaps drop in blurred; one whip per film" } },
    { id: "cardStackIn", allowed: true, params: { yPx: -80, scaleFrom: 0.9, staggerMs: 300, use: "keycaps" } },
    { id: "typeOn", allowed: true, params: { charsPerSec: 18, use: "dictated text appearing in a note" } },
    { id: "countUp", allowed: false, params: { durationMs: 0 } },
  ],
  texture: { grainOpacity: 0.06, grainFreq: 0.75, grainSeed: 17, grainOctaves: 3, vignette: 0, scanlineOpacity: 0 },
  card: {
    radiusPx: 22,
    borderWidthPx: 0,
    shadow: "0 2px 0 rgba(0,0,0,0.06), 0 18px 50px rgba(60,60,40,0.14)",
    paddingPx: [20, 24, 20, 24],
    maxWidthPx: 1300,
  },
  camera: { driftAmp: 0.004, driftPeriodSec: 16, zoomRange: [1, 1.08], zoomEasing: "settle" },
  sound: {
    allowed: ["keypress", "softClick", "whoosh"],
    banned: ["impact", "streamTick", "paymentTap", "riser"],
    musicLiftOn: "endCard",
  },
  bans: [
    "One lime (#d1eb49) object per shot (a key, the waveform, the end plate); lime never colors text",
    "Hand-drawn display caps for ONE headline only; everything else is serif or small sans",
    "Keycaps are soft rounded 3D (top face + darker side), not flat icons",
    "Paper grain stays visible on off-white and lavender; no pure white stage, no pure black",
    "The glow is the waveform's only; no drop-shadow glows on text",
    "No tech-dark UI, no mono headlines",
  ],
};

export default granola;
