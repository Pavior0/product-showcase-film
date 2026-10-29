import type { gsap } from "gsap";
import type { Theme } from "@themes/index.ts";

export type SceneCtx = {
  theme: Theme;
  /** master paused timeline; add tweens at `start + local` */
  tl: gsap.core.Timeline;
  /** absolute start of this scene in the film (s) */
  start: number;
  fps: number;
  width: number;
  height: number;
};

export type SceneView = {
  el: HTMLElement;
  /** local = seconds since scene start. Pure: same local → same pixels. */
  render(local: number): void;
};
