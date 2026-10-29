export type { Theme, Palette, TypeScale, Easings, Durations } from "./types.ts";
export { captionHoldMs } from "./types.ts";

export { eventNoir } from "./event-noir.ts";
export { paperEditorial } from "./paper-editorial.ts";
export { terminalMono } from "./terminal-mono.ts";
export { warmConsumer } from "./warm-consumer.ts";
export { socialReel } from "./social-reel.ts";
export { opencode } from "./opencode.ts";
export { linear } from "./linear.ts";
export { linearLight } from "./linear-light.ts";
export { cursor } from "./cursor.ts";
export { raycast } from "./raycast.ts";
export { vercel } from "./vercel.ts";
export { granola } from "./granola.ts";
export { stripeTerminal } from "./stripe-terminal.ts";

export * as motion from "./motion.ts";

import { eventNoir } from "./event-noir.ts";
import { paperEditorial } from "./paper-editorial.ts";
import { terminalMono } from "./terminal-mono.ts";
import { warmConsumer } from "./warm-consumer.ts";
import { socialReel } from "./social-reel.ts";
import { opencode } from "./opencode.ts";
import { linear } from "./linear.ts";
import { linearLight } from "./linear-light.ts";
import { cursor } from "./cursor.ts";
import { raycast } from "./raycast.ts";
import { vercel } from "./vercel.ts";
import { granola } from "./granola.ts";
import { stripeTerminal } from "./stripe-terminal.ts";
import type { Theme } from "./types.ts";

export const themes: Record<string, Theme> = {
  "event-noir": eventNoir,
  "paper-editorial": paperEditorial,
  "terminal-mono": terminalMono,
  "warm-consumer": warmConsumer,
  "social-reel": socialReel,
  opencode,
  linear,
  "linear-light": linearLight,
  cursor,
  raycast,
  vercel,
  granola,
  "stripe-terminal": stripeTerminal,
};

export function getTheme(id: string): Theme {
  const t = themes[id];
  if (!t) throw new Error(`Unknown theme "${id}". Known: ${Object.keys(themes).join(", ")}`);
  return t;
}

/** Flatten a Theme into CSS custom properties for .psf-stage */
export function themeToCssVars(theme: Theme): Record<string, string> {
  const p = theme.palette;
  const cardOnLight = !!p.surfaceAlt && p.surfaceAlt.toLowerCase() !== p.bg.toLowerCase();
  return {
    "--psf-w": `${theme.frame.width}px`,
    "--psf-h": `${theme.frame.height}px`,
    "--psf-bg": p.bg,
    "--psf-surface": p.surface,
    "--psf-surface-alt": p.surfaceAlt ?? p.surface,
    "--psf-border": p.border,
    "--psf-text": p.text,
    "--psf-muted": p.muted,
    "--psf-accent": p.accent,
    "--psf-card-text": cardOnLight && luminance(p.surfaceAlt!) > 0.5 ? p.bg : p.text,
    "--psf-font-caption": theme.type.caption.family,
    "--psf-font-body": theme.type.cardBody.family,
    "--psf-font-mono": theme.type.mono.family,
    "--psf-font-meta": theme.type.meta.family,
    "--psf-caption-size": `${theme.type.caption.sizePx}px`,
    "--psf-caption-weight": String(theme.type.caption.weight),
    "--psf-caption-tracking": `${theme.type.caption.trackingEm}em`,
    "--psf-caption-lh": String(theme.type.caption.lineHeight),
    "--psf-caption-muted-weight": String(theme.type.captionMuted.weight),
    "--psf-caption-muted-size": `${theme.type.captionMuted.sizePx}px`,
    "--psf-mono-size": `${theme.type.mono.sizePx}px`,
    "--psf-mono-weight": String(theme.type.mono.weight),
    "--psf-mono-lh": String(theme.type.mono.lineHeight),
    "--psf-meta-size": `${theme.type.meta.sizePx}px`,
    "--psf-card-radius": `${theme.card.radiusPx}px`,
    "--psf-card-border-w": `${theme.card.borderWidthPx}px`,
    "--psf-card-shadow": theme.card.shadow,
    "--psf-card-pad": theme.card.paddingPx.map((n) => `${n}px`).join(" "),
    "--psf-card-max-w": `${theme.card.maxWidthPx}px`,
    "--psf-grain-opacity": String(theme.texture.grainOpacity),
    "--psf-scanline-opacity": String(theme.texture.scanlineOpacity),
    "--psf-vignette": String(theme.texture.vignette),
    "--psf-grain-url": `url("${grainDataUrl(theme)}")`,
    ...(p.plate ? { "--psf-plate": p.plate } : {}),
    ...(p.backdrop ? { "--psf-backdrop": p.backdrop } : {}),
    ...(theme.type.display
      ? {
          "--psf-font-display": theme.type.display.family,
          "--psf-display-size": `${theme.type.display.sizePx}px`,
          "--psf-display-weight": String(theme.type.display.weight),
          "--psf-display-tracking": `${theme.type.display.trackingEm}em`,
          "--psf-display-lh": String(theme.type.display.lineHeight),
        }
      : {}),
    "--psf-mono-tracking": `${theme.type.mono.trackingEm}em`,
    "--psf-card-title-size": `${theme.type.cardTitle.sizePx}px`,
    "--psf-card-title-weight": String(theme.type.cardTitle.weight),
    "--psf-card-body-size": `${theme.type.cardBody.sizePx}px`,
    "--psf-font-card-title": theme.type.cardTitle.family,
    "--psf-surface-raw": p.surface,
    "--psf-accent-on-light": p.accentOnLight ?? p.accent,
  };
}

/**
 * Seeded feTurbulence tile for this theme (seed/freq/octaves from theme.texture).
 * base.css used to hardcode seed 7 / freq 0.8 / 4 octaves for every theme.
 */
export function grainDataUrl(theme: Theme, tilePx = 240): string {
  const { grainFreq, grainOctaves, grainSeed } = theme.texture;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${tilePx}' height='${tilePx}'>` +
    `<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='${grainFreq}' numOctaves='${grainOctaves}' stitchTiles='stitch' seed='${grainSeed}'/></filter>` +
    `<rect width='100%' height='100%' filter='url(#g)'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, "%27")}`;
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
