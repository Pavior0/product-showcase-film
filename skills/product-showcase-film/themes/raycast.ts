import type { Theme } from "./types.ts";

/**
 * raycast — Raycast's launch films on X:
 *   https://x.com/raycast/status/2001658927302267296  ("The new Raycast" launcher redesign teaser)
 *   https://x.com/raycast/status/2029180822838759703  (Glaze: "Desktop apps, reimagined by you.")
 * Grammar: dark glass windows (#111111) floating on pure black over a slow glossy liquid-chrome
 * swirl; a big rounded search bar with a thin white caret (blink ~1s period) and typed queries;
 * slow accelerating push-ins (~2s) that hard-cut to the next framing; end card = tracked
 * uppercase mono word pairs, then a small centered mark. Selection rings take a muted tint of
 * the selected item (sampled #aeac77 around an emoji tile, tile fill #333026) — never neon.
 */
export const raycast: Theme = {
  id: "raycast",
  name: "Raycast",
  useWhen:
    "Launchers, command palettes, desktop utilities and AI app builders that want Raycast's dark glass look: rounded search bars on black over a liquid-chrome backdrop, typed queries, tracked mono end cards.",
  frame: { width: 1920, height: 1080, fps: 60 },
  palette: {
    bg: "#000000", // stage (measured)
    surface: "#111111", // glass window body (measured #0b0b0b–#121212, #111111 dominant)
    surfaceAlt: "#1a1a1a", // list rows / grid tiles
    border: "#2a2a2a", // glass edge highlight (top edge brighter)
    backdrop:
      "radial-gradient(120% 80% at 30% 20%, #3a3a3a 0%, #121212 40%, #000000 70%), conic-gradient(from 200deg at 60% 60%, #000 0deg, #2b2b2b 90deg, #050505 180deg, #3d3d3d 270deg, #000 360deg)", // liquid-chrome stand-in
    text: "#ffffff",
    muted: "#6c6c6c", // placeholder "Search for apps and commands" (measured)
    accent: "#ff6363", // Raycast brand red (logo); in-film color comes from the content (app icons, orange glow #c26829)
    accentOnLight: "#ff6363",
  },
  type: {
    // Glaze end line "Desktop apps, reimagined by you." ~60px white sans, 2 lines. UI font is Inter.
    caption: {
      family: '"Inter", -apple-system, "SF Pro Display", system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500;600",
      sizePx: 60,
      weight: 500,
      trackingEm: -0.02,
      lineHeight: 1.15,
    },
    captionMuted: {
      family: '"Inter", -apple-system, "SF Pro Display", system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 60,
      weight: 500,
      trackingEm: -0.02,
      lineHeight: 1.15,
    },
    // search bar query text (~40px in the close-ups)
    cardTitle: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 40,
      weight: 400,
      trackingEm: -0.01,
      lineHeight: 1.2,
    },
    cardBody: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@400;500",
      sizePx: 22,
      weight: 500,
      trackingEm: 0,
      lineHeight: 1.4,
    },
    // End card "NEW   LAUNCHER DESIGN": cap height 31–32px, advance ~23.5px/char → ~40px mono 400.
    // Real mono unconfirmed; Geist Mono substitutes.
    mono: {
      family: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
      googleFonts: "Geist+Mono:wght@400",
      sizePx: 40,
      weight: 400,
      trackingEm: 0,
      lineHeight: 1.2,
    },
    meta: {
      family: '"Inter", -apple-system, system-ui, sans-serif',
      googleFonts: "Inter:wght@500",
      sizePx: 16,
      weight: 500,
      trackingEm: 0,
      lineHeight: 1.3,
    },
  },
  easings: {
    enter: { css: "cubic-bezier(0.25, 0.1, 0.25, 1)", bezier: [0.25, 0.1, 0.25, 1] },
    exit: { css: "cubic-bezier(0.4, 0, 1, 1)", bezier: [0.4, 0, 1, 1] },
    settle: { css: "cubic-bezier(0.16, 1, 0.3, 1)", bezier: [0.16, 1, 0.3, 1] },
    snap: { css: "cubic-bezier(0.55, 0, 1, 0.45)", bezier: [0.55, 0, 1, 0.45] }, // push-in accelerates into the cut (activity peak at 0.98)
  },
  durations: {
    enterMs: 500,
    exitMs: 300,
    settleMs: 2000, // push-ins 1.67→3.67s
    holdMs: 1800,
    msPerCaptionChar: 70, // query typing
    transitionMs: 0,
  },
  transitions: [
    { id: "cut", allowed: true, params: { use: "end of every push-in; shots 3–5s" } },
    { id: "fade", allowed: true, params: { opacityFrom: 0, opacityTo: 1, ms: 500, use: "end mark only" } },
    { id: "riseFade", allowed: false, params: { yPx: 0, opacityFrom: 0 } },
    { id: "slideBlur", allowed: false, params: { xPx: 0, blurPx: 0, opacityFrom: 0 } },
    { id: "cardStackIn", allowed: false, params: { yPx: 0, scaleFrom: 1, staggerMs: 0 } },
    { id: "typeOn", allowed: true, params: { charsPerSec: 14, caretPeriodMs: 1000, use: "search query in the bar" } },
    { id: "countUp", allowed: false, params: { durationMs: 0 } },
  ],
  texture: { grainOpacity: 0.02, grainFreq: 0.9, grainSeed: 11, grainOctaves: 1, vignette: 0.35, scanlineOpacity: 0 },
  card: {
    radiusPx: 28, // windows; the hero search bar is a pill (radius ≥ 60)
    borderWidthPx: 1,
    shadow: "0 0 0 1px rgba(255,255,255,0.06) inset, 0 40px 120px rgba(0,0,0,0.7)",
    paddingPx: [22, 28, 22, 28],
    maxWidthPx: 1400,
  },
  camera: { driftAmp: 0.006, driftPeriodSec: 14, zoomRange: [1, 1.35], zoomEasing: "snap" },
  sound: {
    allowed: ["keypress", "softClick"],
    banned: ["impact", "paymentTap", "streamTick"],
    musicLiftOn: "endCard",
  },
  bans: [
    "Windows are dark glass (#111111) with a hairline top highlight; never light mode",
    "The backdrop is a slow monochrome liquid-chrome swirl; never colored gradients",
    "Selection rings are a muted tint of the selected item's own color; no neon brand-colored focus rings",
    "Caret is a thin white bar blinking ~1s; never a block caret (that is vercel/terminal)",
    "End card: UPPERCASE mono word pairs pushed to the frame edges (\"NEW ··· LAUNCHER DESIGN\"), hard cut, then a small centered mark; no tagline paragraph",
    "No 3D tilt; push straight in",
  ],
};

export default raycast;
