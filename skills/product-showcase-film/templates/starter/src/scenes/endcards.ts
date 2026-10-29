/**
 * opencode end cards: centred lowercase mono on pure black, hard cuts.
 * Only motion allowed: the first title's 0.2s exit fade (GSAP tween on the element).
 */
import { motion } from "@themes/index.ts";
import type { SceneCtx, SceneView } from "./types.ts";

const card = (cls: string): HTMLElement => {
  const el = document.createElement("div");
  el.className = `scene card ${cls}`;
  return el;
};

const span = (cls: string, text: string) => {
  const s = document.createElement("span");
  s.className = cls;
  s.textContent = text;
  return s;
};

export function blackScene(): SceneView {
  return { el: card("black"), render() {} };
}

export function titleScene(ctx: SceneCtx, copy: { lead: string; rest: string }, dur: number): SceneView {
  const el = card("title");
  const p = document.createElement("p");
  p.className = "psf-caption";
  p.append(span("lead", copy.lead), span("psf-caption-muted", copy.rest));
  el.append(p);
  const exit = ctx.theme.durations.exitMs / 1000;
  ctx.tl.fromTo(
    p,
    { opacity: 1 },
    { opacity: 0, duration: exit, ease: motion.gsapEase(ctx.theme.easings.exit.bezier), immediateRender: false },
    ctx.start + dur - exit,
  );
  return { el, render() {} };
}

export function wordmarkScene(copy: { a: string; b: string }): SceneView {
  const el = card("wordmark");
  const p = document.createElement("p");
  p.className = "oc-wordmark";
  p.title = "placeholder — replace with the real OpenCode logo SVG";
  p.append(span("a", copy.a), span("b", copy.b));
  el.append(p);
  return { el, render() {} };
}

export function lineScene(copy: { text: string; tone: "text" | "muted" }): SceneView {
  const el = card("line");
  const p = document.createElement("p");
  p.className = `psf-caption${copy.tone === "muted" ? " psf-caption-muted" : ""}`;
  p.textContent = copy.text;
  el.append(p);
  return { el, render() {} };
}
