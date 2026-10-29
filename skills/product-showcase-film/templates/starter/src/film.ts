/**
 * Assemble the film: theme vars on the stage, one DOM node per scene, one paused
 * GSAP master timeline. render(t) = seek the timeline, then let each visible scene
 * paint itself from its local time. Nothing reads the wall clock.
 */
import { gsap } from "gsap";
import { getTheme, themeToCssVars } from "../themes/index.ts";
import "../themes/base.css";
import "./style.css";
import { film, placeScenes, scenes, totalDuration, type Placed } from "./storyboard.ts";
import { blackScene, lineScene, titleScene, wordmarkScene } from "./scenes/endcards.ts";
import { macroScene } from "./scenes/macro.ts";
import type { SceneCtx, SceneView } from "./scenes/types.ts";

export type Film = {
  stage: HTMLElement;
  duration: number;
  fps: number;
  render(t: number): void;
};

export function buildFilm(mount: HTMLElement): Film {
  const theme = getTheme(film.theme);
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
    const ctx: SceneCtx = { theme, tl, start: p.start, fps: film.fps, width: film.width, height: film.height };
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
    const f = Math.round(t * film.fps);
    grain.style.backgroundPosition = `${(f * 97) % 240}px ${(f * 53) % 240}px`;
  }

  return { stage, duration, fps: film.fps, render };
}
