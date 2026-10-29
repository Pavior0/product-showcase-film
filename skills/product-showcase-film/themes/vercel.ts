import type { Theme } from "./types.ts";

/**
 * vercel — Vercel's launch films on X:
 *   https://x.com/vercel/status/2071620375621009416  ("▲ VOICE AGENTS ON VERCEL" / "AUDIO IS LIVE ON AI GATEWAY")
 *   https://x.com/vercel/status/2110786348131258456  (Drives: hairline isometric wireframes "▲ FRONTEND" / "BACKEND")
 * Grammar: (▲ = their logo glyph; this preset swaps it for ■) all-caps Geist Mono on pure black, typed at ~90ms/char with a blinking block caret
 * (~1s period); small mono terminal transcript builds line by line; white hairline isometric
 * wireframes with leader-line labels; almost static (no camera, no grain); hard cuts.
 * Fonts are real: Geist + Geist Mono are Vercel's own, free on Google Fonts.
 */
export const vercel: Theme = {
  id: "vercel",
  name: "Vercel",
  useWhen:
    "Infra, API, SDK and platform launches that want Vercel's stark look: uppercase Geist Mono typed on black with a block caret, terminal transcripts, white hairline isometric wireframes.",
  frame: { width: 1920, height: 1080, fps: 30 },
  palette: {
    bg: "#000000",
    surface: "#0a0a0a",
    border: "#333333", // panel hairlines; diagram strokes are text-white (#fcfcfc measured)
    text: "#ffffff",
    muted: "#666666", // terminal secondary, end-line second half (measured #5f5f5f–#6e6e6e)
    accent: "#ffffff", // Vercel has no hue accent: emphasis = white vs gray
    accentOnLight: "#000000",
  },
  type: {
    // "AUDIO IS LIVE ON AI GATEWAY": cap height 41px → ~56px Geist Mono 500, tracking ~0.
    caption: {
      family: '"Geist Mono", ui-monospace, monospace',
      googleFonts: "Geist+Mono:wght@400;500",
      sizePx: 56,
      weight: 500,
      trackingEm: 0,
      lineHeight: 1.2,
    },
    captionMuted: {
      family: '"Geist Mono", ui-monospace, monospace',
      googleFonts: "Geist+Mono:wght@400",
      sizePx: 56,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.2,
    },
    cardTitle: {
      family: '"Geist", -apple-system, system-ui, sans-serif',
      googleFonts: "Geist:wght@500;600",
      sizePx: 26,
      weight: 500,
      trackingEm: -0.01,
      lineHeight: 1.3,
    },
    cardBody: {
      family: '"Geist", -apple-system, system-ui, sans-serif',
      googleFonts: "Geist:wght@400",
      sizePx: 19,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.5,
    },
    // terminal transcript (small, top-left) and diagram labels (~27px)
    mono: {
      family: '"Geist Mono", ui-monospace, monospace',
      googleFonts: "Geist+Mono:wght@400",
      sizePx: 24,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.35,
    },
    // sub-row "TEXT  IMAGE  VIDEO  AUDIO • LIVE": ~19px cap → ~26px
    meta: {
      family: '"Geist Mono", ui-monospace, monospace',
      googleFonts: "Geist+Mono:wght@400",
      sizePx: 26,
      weight: 400,
      trackingEm: 0.04,
      lineHeight: 1.3,
    },
    // eyebrow "▲ VOICE AGENTS ON VERCEL": cap 29px → ~40px, tracking ~0.1em
    display: {
      family: '"Geist Mono", ui-monospace, monospace',
      googleFonts: "Geist+Mono:wght@400;500",
      sizePx: 40,
      weight: 500,
      trackingEm: 0.1,
      lineHeight: 1.2,
    },
  },
  easings: {
    enter: { css: "cubic-bezier(0, 0, 1, 1)", bezier: [0, 0, 1, 1] }, // characters snap on
    exit: { css: "cubic-bezier(0.4, 0, 1, 1)", bezier: [0.4, 0, 1, 1] },
    settle: { css: "cubic-bezier(0.16, 1, 0.3, 1)", bezier: [0.16, 1, 0.3, 1] },
    snap: { css: "cubic-bezier(0.65, 0, 0.35, 1)", bezier: [0.65, 0, 0.35, 1] },
  },
  durations: {
    enterMs: 0,
    exitMs: 0,
    settleMs: 900,
    holdMs: 2500, // nearly static holds
    msPerCaptionChar: 90, // 27 chars 1.8s→4.2s
    transitionMs: 0,
  },
  transitions: [
    { id: "cut", allowed: true, params: { use: "every change" } },
    { id: "fade", allowed: false, params: { opacityFrom: 0, opacityTo: 1, ms: 0 } },
    { id: "riseFade", allowed: false, params: { yPx: 0, opacityFrom: 0 } },
    { id: "slideBlur", allowed: false, params: { xPx: 0, blurPx: 0, opacityFrom: 0 } },
    { id: "cardStackIn", allowed: false, params: { yPx: 0, scaleFrom: 1, staggerMs: 0 } },
    { id: "typeOn", allowed: true, params: { charsPerSec: 11, caretPeriodMs: 1000, caret: "block", use: "headlines + terminal lines" } },
    { id: "countUp", allowed: false, params: { durationMs: 0 } },
  ],
  texture: { grainOpacity: 0, grainFreq: 0.9, grainSeed: 5, grainOctaves: 1, vignette: 0, scanlineOpacity: 0 },
  card: {
    radiusPx: 8,
    borderWidthPx: 1,
    shadow: "none",
    paddingPx: [16, 20, 16, 20],
    maxWidthPx: 1400,
  },
  camera: { driftAmp: 0, driftPeriodSec: 20, zoomRange: [1, 1], zoomEasing: "settle" },
  sound: {
    allowed: ["keypress", "tick"],
    banned: ["whoosh", "impact", "riser", "paymentTap", "softClick"],
    musicLiftOn: "captionHit",
  },
  bans: [
    "Everything on screen is UPPERCASE Geist Mono except UI card text; no sans headlines",
    "Typed text uses a solid white block caret that blinks ~1s; never a thin bar",
    "No hue: white, grays and black only. A dim green ✓ (#73c38f) is allowed in terminal success lines only",
    "Diagrams are 1–2px white hairline isometric wireframes (solid + dashed) with leader-line labels; no fills, no glow",
    "The source uses ▲ (Vercel's logo) as the eyebrow glyph; presets are unofficial, so use a neutral ■ / ◆ / your own mark instead. No gradients",
    "No camera motion, no grain, no vignette; hard cuts only",
  ],
};

export default vercel;
