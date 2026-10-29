/**
 * Dev-only scrubber. Playback uses rAF to pick a t, then calls the same seek()
 * the renderer uses — so what you scrub is what renders.
 */
import type { Clock } from "./clock.ts";

export function mountPreview(stage: HTMLElement, clock: Clock) {
  const bar = document.createElement("div");
  bar.className = "pv-bar";
  bar.innerHTML = `<button data-a="play">play</button><input type="range" min="0" step="0.001"><span class="pv-t"></span>`;
  document.body.append(bar);
  const btn = bar.querySelector<HTMLButtonElement>("button")!;
  const range = bar.querySelector<HTMLInputElement>("input")!;
  const label = bar.querySelector<HTMLSpanElement>(".pv-t")!;
  range.max = String(clock.duration);

  const fit = () => {
    const s = Math.min(innerWidth / stage.offsetWidth, (innerHeight - 56) / stage.offsetHeight);
    stage.style.transform = `scale(${s})`;
  };
  addEventListener("resize", fit);
  fit();

  const show = (t: number) => {
    const f = Math.round(t * clock.fps);
    label.textContent = `${t.toFixed(3)}s  f${f}`;
    range.value = String(t);
    history.replaceState(null, "", `?t=${t.toFixed(3)}`);
  };
  const seek = (t: number) => show(clock.seek(t));

  let playing = false;
  let t0 = 0;
  let wall0 = 0;
  const tick = (now: number) => {
    if (!playing) return;
    const t = t0 + (now - wall0) / 1000;
    if (t >= clock.duration) {
      playing = false;
      btn.textContent = "play";
      seek(clock.duration);
      return;
    }
    // quantise to frames so preview matches the render exactly
    seek(Math.floor(t * clock.fps) / clock.fps);
    requestAnimationFrame(tick);
  };
  btn.onclick = () => {
    playing = !playing;
    btn.textContent = playing ? "pause" : "play";
    if (playing) {
      t0 = clock.now() >= clock.duration ? 0 : clock.now();
      wall0 = performance.now();
      requestAnimationFrame(tick);
    }
  };
  range.oninput = () => {
    playing = false;
    btn.textContent = "play";
    seek(Number(range.value));
  };
  addEventListener("keydown", (e) => {
    const step = 1 / clock.fps;
    if (e.key === "ArrowRight") seek(clock.now() + (e.shiftKey ? 1 : step));
    if (e.key === "ArrowLeft") seek(clock.now() - (e.shiftKey ? 1 : step));
    if (e.key === " ") btn.click();
  });
  const start = Number(new URLSearchParams(location.search).get("t") ?? 0);
  seek(start);
}
