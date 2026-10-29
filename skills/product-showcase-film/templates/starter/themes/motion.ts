/**
 * Deterministic motion helpers for product-showcase-film themes.
 *
 * Every function is a pure function of `t` (seconds) or normalized `u` in [0,1].
 * Frame N must equal f(N/fps) — never Math.random, never "previous frame" state.
 *
 * Use with GSAP by sampling at each tick, or drive styles directly from t.
 */

export type Vec2 = { x: number; y: number };

/** Cubic-bezier unit curve. Samples with Newton-Raphson on x, returns y. */
export function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  let t = x;
  for (let i = 0; i < 8; i++) {
    const xt =
      3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
    const dxt =
      3 * (1 - t) * (1 - t) * x1 +
      6 * (1 - t) * t * (x2 - x1) +
      3 * t * t * (1 - x2);
    if (Math.abs(dxt) < 1e-6) break;
    t -= (xt - x) / dxt;
    t = Math.min(1, Math.max(0, t));
  }
  return (
    3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t
  );
}

export function easeBezier(
  bezier: [number, number, number, number],
  u: number,
): number {
  return cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3], u);
}

export function clamp01(u: number): number {
  return Math.min(1, Math.max(0, u));
}

/** Map absolute time into a local [0,1] over [start, start+dur]. */
export function localU(t: number, start: number, durSec: number): number {
  if (durSec <= 0) return t >= start ? 1 : 0;
  return clamp01((t - start) / durSec);
}

export type FadeState = { opacity: number };

export function fade(
  u: number,
  bezier: [number, number, number, number] = [0.22, 1, 0.36, 1],
  from = 0,
  to = 1,
): FadeState {
  const e = easeBezier(bezier, clamp01(u));
  return { opacity: from + (to - from) * e };
}

export type RiseFadeState = { opacity: number; y: number };

export function riseFade(
  u: number,
  yPx: number,
  bezier: [number, number, number, number] = [0.16, 1, 0.3, 1],
): RiseFadeState {
  const e = easeBezier(bezier, clamp01(u));
  return { opacity: e, y: yPx * (1 - e) };
}

export type SlideBlurState = {
  opacity: number;
  x: number;
  filterBlurPx: number;
};

export function slideBlur(
  u: number,
  xPx: number,
  blurPx: number,
  bezier: [number, number, number, number] = [0.16, 1, 0.3, 1],
): SlideBlurState {
  const e = easeBezier(bezier, clamp01(u));
  return {
    opacity: e,
    x: xPx * (1 - e),
    filterBlurPx: blurPx * (1 - e),
  };
}

export type CardStackState = {
  opacity: number;
  y: number;
  scale: number;
};

/** index = stack order; staggerSec offsets each card's local u. */
export function cardStackIn(
  t: number,
  start: number,
  durSec: number,
  index: number,
  staggerSec: number,
  yPx: number,
  scaleFrom: number,
  bezier: [number, number, number, number] = [0.16, 1, 0.3, 1],
): CardStackState {
  const u = localU(t, start + index * staggerSec, durSec);
  const e = easeBezier(bezier, u);
  return {
    opacity: e,
    y: yPx * (1 - e),
    scale: scaleFrom + (1 - scaleFrom) * e,
  };
}

/**
 * Type-on: fixed chars/sec, deterministic.
 * Returns the visible prefix length and full visible string.
 */
export function typeOn(
  t: number,
  start: number,
  text: string,
  charsPerSec: number,
): { chars: number; visible: string; done: boolean } {
  if (t < start) return { chars: 0, visible: "", done: false };
  const chars = Math.min(
    text.length,
    Math.floor((t - start) * charsPerSec),
  );
  return {
    chars,
    visible: text.slice(0, chars),
    done: chars >= text.length,
  };
}

/** Count-up integer (or fixed decimals). */
export function countUp(
  u: number,
  from: number,
  to: number,
  decimals = 0,
  bezier: [number, number, number, number] = [0.22, 1, 0.36, 1],
): number {
  const e = easeBezier(bezier, clamp01(u));
  const v = from + (to - from) * e;
  const f = 10 ** decimals;
  return Math.round(v * f) / f;
}

/**
 * Caret blink tied to absolute t (not wall clock).
 * periodSec = full on+off cycle. Returns 1 visible / 0 hidden.
 */
export function caretBlink(t: number, periodSec = 1.0): number {
  const phase = ((t % periodSec) + periodSec) % periodSec;
  return phase < periodSec * 0.5 ? 1 : 0;
}

/** Idle camera drift — sine of t, amplitude as fraction of frame. */
export function cameraDrift(
  t: number,
  amp: number,
  periodSec: number,
): Vec2 {
  if (amp === 0 || periodSec <= 0) return { x: 0, y: 0 };
  const w = (Math.PI * 2) / periodSec;
  return {
    x: Math.sin(t * w) * amp,
    y: Math.cos(t * w * 0.85) * amp * 0.7,
  };
}

/** Zoom punch-in over [start, start+dur]. */
export function cameraZoom(
  t: number,
  start: number,
  durSec: number,
  from: number,
  to: number,
  bezier: [number, number, number, number],
): number {
  const u = localU(t, start, durSec);
  const e = easeBezier(bezier, u);
  return from + (to - from) * e;
}

/**
 * Apply a motion state to an HTMLElement (preview / Playwright path).
 * Keeps DOM writes in one place so scenes stay data-driven.
 */
export function applyRiseFade(el: HTMLElement, s: RiseFadeState): void {
  el.style.opacity = String(s.opacity);
  el.style.transform = `translate3d(0, ${s.y}px, 0)`;
}

export function applySlideBlur(el: HTMLElement, s: SlideBlurState): void {
  el.style.opacity = String(s.opacity);
  el.style.transform = `translate3d(${s.x}px, 0, 0)`;
  el.style.filter = s.filterBlurPx > 0.05 ? `blur(${s.filterBlurPx}px)` : "none";
}

export function applyCardStack(el: HTMLElement, s: CardStackState): void {
  el.style.opacity = String(s.opacity);
  el.style.transform = `translate3d(0, ${s.y}px, 0) scale(${s.scale})`;
}

/**
 * GSAP ease from a theme bezier tuple. GSAP does NOT parse CSS "cubic-bezier(...)"
 * strings — it silently falls back to power1.out (dogfood finding). Pass this instead,
 * e.g. tl.to(obj, { x: 1, duration: 2, ease: gsapEase(theme.easings.enter.bezier) }).
 */
export function gsapEase(
  bezier: [number, number, number, number],
): (u: number) => number {
  return (u: number) => easeBezier(bezier, u);
}

type Bezier = [number, number, number, number];

/**
 * GSAP-friendly fromTo vars. Deterministic under a paused timeline driven by seek(t).
 * Duration is required: `duration: undefined` makes GSAP build a 0s tween (instant jump).
 */
export const gsapVars = {
  riseFade: (yPx: number, bezier: Bezier, durationSec: number) => ({
    from: { autoAlpha: 0, y: yPx },
    to: { autoAlpha: 1, y: 0, ease: gsapEase(bezier), duration: durationSec },
  }),
  slideBlur: (xPx: number, blurPx: number, bezier: Bezier, durationSec: number) => ({
    from: { autoAlpha: 0, x: xPx, filter: `blur(${blurPx}px)` },
    to: { autoAlpha: 1, x: 0, filter: "blur(0px)", ease: gsapEase(bezier), duration: durationSec },
  }),
  cardStackIn: (yPx: number, scaleFrom: number, bezier: Bezier, durationSec: number) => ({
    from: { autoAlpha: 0, y: yPx, scale: scaleFrom },
    to: { autoAlpha: 1, y: 0, scale: 1, ease: gsapEase(bezier), duration: durationSec },
  }),
};
