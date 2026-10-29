import type { Theme } from "./types.ts";

/**
 * opencode — learned from OpenCode's own launch films on X:
 *   https://x.com/opencode/status/2077148766092558570  ("Introducing Tabs", 24.3s)
 *   https://x.com/opencode/status/2000613474267771323  ("OpenCode, now on your desktop", 28.5s)
 * Grammar: one long macro take of the real UI (tilted window, shallow depth of field,
 * slow lateral pan / push-in), then a pure-black end-card run of small lowercase mono
 * lines swapped on hard cuts. Text never moves. Hex values sampled with PIL from 1080p frames.
 */
export const opencode: Theme = {
  id: "opencode",
  name: "OpenCode",
  useWhen:
    "Coding agents, terminal/TUI or desktop dev tools that want the OpenCode launch-film look: macro DOF shots of real UI on pure black, then lowercase mono end cards on hard cuts.",
  frame: { width: 1920, height: 1080, fps: 60 },
  palette: {
    bg: "#000000", // end cards, measured exact
    surface: "#0f0f0f", // app chrome in the macro shots (measured #0a090a–#0f0f0f)
    surfaceAlt: "#fdff24", // halftone opener plate ONLY (measured #fdff24, Tabs 0–1.4s)
    border: "#3d3d3e", // selected-tab fill / hairline (measured #3d3d3e)
    text: "#ffffff", // key word + URL on end cards (measured #ffffff)
    muted: "#bab5b6", // warm gray rest-of-line + tagline (measured #bab5b6 / #b9b5b6)
    accent: "#5a82e6", // project chip / selection blue (measured core #547dda, glow #608af2)
    accentOnLight: "#2f5fd0",
  },
  type: {
    // End-card line. Measured: "the open source coding agent" = 1195px wide @1920 → ~71px mono.
    caption: {
      family: '"JetBrains Mono", "Berkeley Mono", ui-monospace, monospace',
      googleFonts: "JetBrains+Mono:wght@400;500",
      sizePx: 64,
      weight: 500,
      trackingEm: 0,
      lineHeight: 1.2,
    },
    captionMuted: {
      family: '"JetBrains Mono", "Berkeley Mono", ui-monospace, monospace',
      googleFonts: "JetBrains+Mono:wght@400",
      sizePx: 64,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.2,
    },
    // In-app UI is a system grotesk (tab titles, session names)
    cardTitle: {
      family: '"Inter", -apple-system, "SF Pro Text", system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 30,
      weight: 500,
      trackingEm: -0.01,
      lineHeight: 1.25,
    },
    cardBody: {
      family: '"Inter", -apple-system, "SF Pro Text", system-ui, sans-serif',
      googleFonts: "Inter:wght@400",
      sizePx: 20,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.45,
    },
    // Agent session transcript inside the TUI/desktop pane
    mono: {
      family: '"JetBrains Mono", "Berkeley Mono", ui-monospace, monospace',
      googleFonts: "JetBrains+Mono:wght@400;500",
      sizePx: 20,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.55,
    },
    meta: {
      family: '"JetBrains Mono", "Berkeley Mono", ui-monospace, monospace',
      googleFonts: "JetBrains+Mono:wght@400",
      sizePx: 16,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.3,
    },
  },
  easings: {
    // Camera moves are slow, symmetric in-out; text has no easing (hard cuts).
    enter: { css: "cubic-bezier(0.45, 0, 0.55, 1)", bezier: [0.45, 0, 0.55, 1] },
    exit: { css: "cubic-bezier(0.45, 0, 0.55, 1)", bezier: [0.45, 0, 0.55, 1] },
    settle: { css: "cubic-bezier(0.25, 0.1, 0.25, 1)", bezier: [0.25, 0.1, 0.25, 1] },
    snap: { css: "cubic-bezier(0.7, 0, 0.3, 1)", bezier: [0.7, 0, 0.3, 1] }, // whip pan
  },
  durations: {
    enterMs: 0, // end-card text appears on a cut (pixel count jumps 0→full in one frame)
    exitMs: 200, // first title fades out over ~0.2s (14.7–14.9s), others cut
    settleMs: 0,
    holdMs: 1300, // shortest measured end-card hold (title 1.3s; logo 1.5s; tagline 2.2s; url 3.5s)
    msPerCaptionChar: 60,
    transitionMs: 300, // halftone dissolve / whip blur (1.15–1.45s in Tabs)
  },
  transitions: [
    { id: "cut", allowed: true, params: { blackGapMs: 600, leadInBlackMs: 1000 } },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1, maxMs: 200, use: "exit only" } },
    { id: "riseFade", allowed: false, params: { yPx: 0, opacityFrom: 0 } },
    { id: "slideBlur", allowed: true, params: { xPx: 600, blurPx: 40, opacityFrom: 1, use: "whip pan between macro framings only" } },
    { id: "cardStackIn", allowed: false, params: { yPx: 0, scaleFrom: 1, staggerMs: 0 } },
    { id: "typeOn", allowed: true, params: { charsPerSec: 14, use: "tab title being renamed, with caret" } },
    { id: "countUp", allowed: false, params: { durationMs: 0 } },
  ],
  texture: {
    grainOpacity: 0.03,
    grainFreq: 0.9,
    grainSeed: 11,
    grainOctaves: 2,
    vignette: 0.45, // depth-of-field falloff reads as heavy edge darkening
    scanlineOpacity: 0,
  },
  card: {
    radiusPx: 14, // tab chip / window corner at macro scale
    borderWidthPx: 1,
    shadow: "none",
    paddingPx: [14, 20, 14, 16],
    maxWidthPx: 1700,
  },
  camera: {
    // Macro: window tilted ~12°, focus band ~35% of frame, rest blurred 6–14px.
    driftAmp: 0.02, // slow lateral pan across the tab bar over the long take
    driftPeriodSec: 18,
    zoomRange: [1.0, 1.3], // Desktop film: one 17.7s push-in (eyeballed, not measured)
    zoomEasing: "enter",
  },
  sound: {
    // Audio tracks exist but were NOT analyzed; conservative default.
    allowed: ["keypress", "softClick"],
    banned: ["whoosh", "riser", "impact", "paymentTap", "streamTick"],
    musicLiftOn: "logo",
  },
  bans: [
    "No text over product footage: end-card lines sit alone on pure #000000",
    "End-card copy is lowercase mono, one short line per card, centered; never Title Case or ALL CAPS",
    "Two tones per line only: key word in #ffffff, rest in #bab5b6",
    "No motion on text (no rise, slide, scale, blur-in); cards swap on hard cuts with 0.6–1.0s black gaps",
    "Product shots are macro and tilted with shallow depth of field — never a flat full-window screenshot",
    "Yellow #fdff24 is an opener halftone plate only (≤1.5s); never for text, buttons or a second accent",
    "One accent: chip blue. No gradients, no glow halos, no scanlines (that is terminal-mono)",
    "No agent meta copy on screen",
  ],
};

export default opencode;
