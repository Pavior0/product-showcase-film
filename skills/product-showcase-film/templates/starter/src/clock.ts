/**
 * The ONE clock. Everything on screen is a pure function of `t` (seconds).
 * window.__seek(t) sets t and renders synchronously — no rAF, no timers, no
 * "previous frame" state — so frame N can be rendered in any order.
 */

export type RenderFn = (t: number) => void;

export type Clock = {
  seek(t: number): number;
  now(): number;
  duration: number;
  fps: number;
};

declare global {
  interface Window {
    __seek: (t: number) => number;
    __now: () => number;
    __duration: number;
    __fps: number;
    __ready: Promise<void>;
    __rafDuringSeek: number;
    __rafStack: string;
  }
}

export function installClock(render: RenderFn, duration: number, fps: number): Clock {
  let t = 0;
  let seeking = false;
  window.__rafDuringSeek = 0;

  // Tripwire: any rAF scheduled while rendering a frame means some code depends on
  // the wall clock. render.mjs fails the run if this counter is non-zero.
  const raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => {
    if (seeking) {
      window.__rafDuringSeek++;
      window.__rafStack = new Error().stack ?? "";
    }
    return raf(cb);
  };

  const seek = (next: number): number => {
    t = Math.min(duration, Math.max(0, next));
    seeking = true;
    try {
      render(t);
    } finally {
      seeking = false;
    }
    return t;
  };

  window.__seek = seek;
  window.__now = () => t;
  window.__duration = duration;
  window.__fps = fps;
  seek(0);
  return { seek, now: () => t, duration, fps };
}

/** Wait until every face the film uses is decoded. Call before building layout-dependent tweens. */
export async function fontsReady(faces: string[]): Promise<void> {
  await Promise.all(faces.map((f) => document.fonts.load(f)));
  await document.fonts.ready;
  for (const f of faces) {
    if (!document.fonts.check(f)) throw new Error(`font not loaded: ${f}`);
  }
}
