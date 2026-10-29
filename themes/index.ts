export type { Theme, Palette, TypeScale, Easings, Durations } from "./types.ts";
export { captionHoldMs } from "./types.ts";

export { eventNoir } from "./event-noir.ts";
export { paperEditorial } from "./paper-editorial.ts";
export { terminalMono } from "./terminal-mono.ts";
export { warmConsumer } from "./warm-consumer.ts";
export { socialReel } from "./social-reel.ts";
export { opencode } from "./opencode.ts";
export { linear } from "./linear.ts";

export * as motion from "./motion.ts";

import { eventNoir } from "./event-noir.ts";
import { paperEditorial } from "./paper-editorial.ts";
import { terminalMono } from "./terminal-mono.ts";
import { warmConsumer } from "./warm-consumer.ts";
import { socialReel } from "./social-reel.ts";
import { opencode } from "./opencode.ts";
import { linear } from "./linear.ts";
import type { Theme } from "./types.ts";

export const themes: Record<string, Theme> = {
  "event-noir": eventNoir,
  "paper-editorial": paperEditorial,
  "terminal-mono": terminalMono,
  "warm-consumer": warmConsumer,
  "social-reel": socialReel,
  opencode,
  linear,
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
    "--psf-mono-size": `${theme.type.mono.sizePx}px`,
    "--psf-mono-weight": String(theme.type.mono.weight),
    "--psf-meta-size": `${theme.type.meta.sizePx}px`,
    "--psf-card-radius": `${theme.card.radiusPx}px`,
    "--psf-card-border-w": `${theme.card.borderWidthPx}px`,
    "--psf-card-shadow": theme.card.shadow,
    "--psf-card-pad": theme.card.paddingPx.map((n) => `${n}px`).join(" "),
    "--psf-card-max-w": `${theme.card.maxWidthPx}px`,
    "--psf-grain-opacity": String(theme.texture.grainOpacity),
    "--psf-scanline-opacity": String(theme.texture.scanlineOpacity),
    "--psf-vignette": String(theme.texture.vignette),
  };
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
