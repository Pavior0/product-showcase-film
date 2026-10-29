/**
 * Assemble the film: theme vars on the stage, one DOM node per scene, one paused
 * GSAP master timeline. render(t) = seek the timeline, then let each visible scene
 * paint itself from its local time. Nothing reads the wall clock.
 */
import { gsap } from "gsap";
import { getTheme, themeToCssVars } from "@themes/index.ts";
import "@themes/base.css";
import "./style.css";
import "./scenes/kit.css";
import { getStoryboard, placeScenes, totalDuration, type Placed } from "./storyboard.ts";
import { blackScene, lineScene, titleScene, wordmarkScene } from "./scenes/endcards.ts";
import {
  captionScene,
  hudScene,
  keysScene,
  markScene,
  pairScene,
  searchScene,
  terminalScene,
  windowScene,
  wireScene,
} from "./scenes/kit.ts";
import { macroScene } from "./scenes/macro.ts";
import type { SceneCtx, SceneView } from "./scenes/types.ts";

export type Film = {
  stage: HTMLElement;
  duration: number;
  fps: number;
  width: number;
  height: number;
  theme: string;
  render(t: number): void;
};

/** themeId picks the preset AND its example storyboard (src/storyboard.ts registry). */
export function buildFilm(mount: HTMLElement, themeId: string): Film {
  const board = getStoryboard(themeId);
  const theme = getTheme(board.theme);
  const { width, height, fps } = theme.frame;
  const scenes = board.scenes;
  // The master timeline is paused and only moves via seek(). GSAP's ticker falls asleep when
  // idle (autoSleep) and every seek() then calls ticker.wake() → requestAnimationFrame inside
  // the frame render, which the clock's rAF tripwire rejects. Keep the ticker awake instead;
  // it never advances a paused timeline, so frames stay a pure function of t.
  gsap.config({ autoSleep: 0 });

  const stage = document.createElement("div");
  stage.className = "psf-stage";
  stage.dataset.theme = theme.id;
  for (const [k, v] of Object.entries(themeToCssVars(theme))) stage.style.setProperty(k, v);
  mount.append(stage);

  const tl = gsap.timeline({ paused: true });
  const placed = placeScenes(scenes);
  const views: { p: Placed; v: SceneView }[] = placed.map((p) => {
    const ctx: SceneCtx = { theme, tl, start: p.start, fps, width, height };
    const s = p.scene;
    let v: SceneView;
    switch (s.id) {
      case "macro":
        v = macroScene(ctx, s.copy, s.beats);
        break;
      case "black":
        v = blackScene();
        break;
      case "title":
        v = titleScene(ctx, s.copy, s.dur);
        break;
      case "wordmark":
        v = wordmarkScene(s.copy);
        break;
      case "line":
        v = lineScene(s.copy);
        break;
      case "caption":
        v = captionScene(ctx, s);
        break;
      case "window":
        v = windowScene(ctx, s);
        break;
      case "hud":
        v = hudScene(ctx, s);
        break;
      case "search":
        v = searchScene(ctx, s);
        break;
      case "terminal":
        v = terminalScene(ctx, s);
        break;
      case "keys":
        v = keysScene(ctx, s);
        break;
      case "wire":
        v = wireScene(ctx, s);
        break;
      case "pair":
        v = pairScene(ctx, s);
        break;
      case "mark":
        v = markScene(ctx, s);
        break;
    }
    v.el.dataset.scene = `${p.index}:${s.id}`;
    stage.append(v.el);
    return { p, v };
  });

  const grain = document.createElement("div");
  grain.className = "psf-grain";
  stage.append(grain);

  const duration = totalDuration(scenes);
  // pad the timeline so seek(duration) is well-defined
  tl.set({}, {}, duration);

  function render(t: number) {
    tl.seek(t, true);
    const last = views.length - 1;
    views.forEach(({ p, v }, i) => {
      const on = t >= p.start && (t < p.end || (i === last && t <= p.end));
      v.el.style.display = on ? "" : "none";
      if (on) v.render(t - p.start);
    });
    // grain re-rolls per frame from the frame index only (deterministic)
    const f = Math.round(t * fps);
    grain.style.backgroundPosition = `${(f * 97) % 240}px ${(f * 53) % 240}px`;
  }

  return { stage, duration, fps, width, height, theme: theme.id, render };
}
