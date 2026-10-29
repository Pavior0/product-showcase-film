/**
 * opencode macro take: yellow halftone opener → dissolve to black → one long tilted,
 * shallow-DOF close-up of the app with a slow push-in, typing, and streaming tool calls.
 * Camera = GSAP fromTo segments on a plain object (paused master timeline, seek-driven).
 * Content = pure motion.ts functions of local t (typeOn, caretBlink, cameraDrift).
 */
import { motion } from "../../themes/index.ts";
import type { MacroBeats, MacroCopy } from "../storyboard.ts";
import type { SceneCtx, SceneView } from "./types.ts";
import {
  buildWindow,
  LINE_DY,
  LINE_Y0,
  PLANE,
  PLUS_X_AFTER,
  PLUS_X_BEFORE,
  PROMPT_Y,
  TAB_X,
} from "./opencode-ui.ts";

/** x,y = plane point the lens is on; sx,sy = where that point sits on screen (0..1);
 *  the DOF focus ellipse follows (sx,sy). z = zoom. */
type Cam = { x: number; y: number; z: number; sx: number; sy: number; whip: number };
type Shot = Omit<Cam, "whip">;

const TAB_CY = 56;
const tabCx = (slot: number, w: number) => PLANE.tabsX + TAB_X[slot] + w / 2;

/** Tuned against ref-videos/key/opencode-2077148766092558570_{0.3,3,6,9,11}.png */
const SHOTS = {
  corner: { x: 190, y: TAB_CY, z: 2.4, sx: 0.36, sy: 0.6 },
  tabsPan: { x: PLANE.tabsX + PLUS_X_BEFORE + 30, y: TAB_CY, z: 2.4, sx: 0.55, sy: 0.42 },
  newTab: { x: tabCx(2, 300), y: TAB_CY, z: 3.0, sx: 0.5, sy: 0.45 },
  promptIn: { x: PLANE.tabsX + 60, y: PROMPT_Y, z: 2.6, sx: 0.33, sy: 0.46 },
  promptEnd: { x: PLANE.tabsX + 40 + 42 * 18, y: PROMPT_Y, z: 2.6, sx: 0.64, sy: 0.46 },
  linesEnd: { x: PLANE.tabsX + 300, y: LINE_Y0 + 5 * LINE_DY, z: 2.15, sx: 0.45, sy: 0.56 },
  wide: { x: 560, y: TAB_CY + 10, z: 1.85, sx: 0.45, sy: 0.42 },
  wideEnd: { x: 600, y: TAB_CY + 10, z: 2.02, sx: 0.45, sy: 0.43 },
} satisfies Record<string, Shot>;

const TILT = { rx: 16, rz: -11 };
const DOF_BLUR_PX = 15;
const WHIP_BLUR_PX = 22;

export function macroScene(ctx: SceneCtx, copy: MacroCopy, b: MacroBeats): SceneView {
  const { theme, tl, start, width: W, height: H } = ctx;
  const el = document.createElement("div");
  el.className = "scene macro";

  // 1) halftone plate (screen space, behind the window, outside the vignette mask)
  const plate = document.createElement("canvas");
  plate.className = "oc-plate";
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  plate.width = Math.round(W * dpr);
  plate.height = Math.round(H * dpr);
  const g = plate.getContext("2d")!;

  // 2) camera: blurred layer + sharp layer masked to a focus ellipse (fake DOF)
  const cam = document.createElement("div");
  cam.className = "oc-cam";
  // vignette is a mask on the camera (an overlay muddies the plate), but a mask also makes
  // the window edges see-through onto the yellow — so it only ramps in with the dissolve.
  const vigMin = 1 - theme.texture.vignette;
  const layer = (cls: string) => {
    const l = document.createElement("div");
    l.className = `oc-layer ${cls}`;
    const rig = document.createElement("div");
    rig.className = "oc-rig";
    rig.append(buildWindow(copy));
    l.append(rig);
    cam.append(l);
    return { l, rig };
  };
  const blur = layer("is-blur");
  const sharp = layer("is-sharp");
  el.append(plate, cam);

  const all = (k: string) => Array.from(cam.querySelectorAll<HTMLElement>(`[data-k="${k}"]`));
  const set = (k: string, fn: (e: HTMLElement) => void) => all(k).forEach(fn);

  // 3) camera timeline — every moment is covered by exactly one fromTo, so any seek order works
  const cam$: Cam = { ...SHOTS.corner, whip: 0 };
  const enter = motion.gsapEase(theme.easings.enter.bezier);
  const snap = motion.gsapEase(theme.easings.snap.bezier);
  const whipDur = theme.durations.transitionMs / 1000;
  const seg = (from: Shot, to: Shot, t0: number, t1: number, ease: (u: number) => number) =>
    tl.fromTo(cam$, { ...from }, { ...to, duration: t1 - t0, ease, immediateRender: false }, start + t0);
  const whip = (t0: number) => {
    const half = whipDur / 2;
    tl.fromTo(cam$, { whip: 0 }, { whip: 1, duration: half, ease: "none", immediateRender: false }, start + t0);
    tl.fromTo(cam$, { whip: 1 }, { whip: 0, duration: half, ease: "none", immediateRender: false }, start + t0 + half);
  };
  const tWhip1 = b.titleCommit + 0.2;
  const tWhip2 = copy.tools[copy.tools.length - 1].at + 0.45;
  seg(SHOTS.corner, SHOTS.tabsPan, 0, b.plusClick - 0.1, enter);
  seg(SHOTS.tabsPan, SHOTS.newTab, b.plusClick - 0.1, tWhip1, enter);
  seg(SHOTS.newTab, SHOTS.promptIn, tWhip1, tWhip1 + whipDur, snap);
  whip(tWhip1);
  seg(SHOTS.promptIn, SHOTS.promptEnd, tWhip1 + whipDur, b.promptSubmit, enter);
  seg(SHOTS.promptEnd, SHOTS.linesEnd, b.promptSubmit, tWhip2, enter);
  seg(SHOTS.linesEnd, SHOTS.wide, tWhip2, tWhip2 + whipDur, snap);
  whip(tWhip2);
  seg(SHOTS.wide, SHOTS.wideEnd, tWhip2 + whipDur, 11.0, motion.gsapEase(theme.easings.settle.bezier));

  function drawPlate(lt: number) {
    const u = motion.localU(lt, b.dissolveStart, b.dissolveEnd - b.dissolveStart);
    if (u >= 1) {
      plate.style.visibility = "hidden";
      return;
    }
    plate.style.visibility = "visible";
    const grow = motion.easeBezier(theme.easings.enter.bezier, u);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = theme.palette.plate ?? "#fdff24";
    g.fillRect(0, 0, W, H);
    g.fillStyle = "#000";
    const cell = 16; // ref: ~16px dot pitch at 1080p — coarse print halftone, not a mesh
    g.beginPath();
    for (let y = cell / 2; y < H; y += cell) {
      for (let x = cell / 2; x < W; x += cell) {
        // dots heavier toward the window edge (bottom-left), ~1px top-right; grow to solid on dissolve
        const d = motion.clamp01((y / H) * 0.85 + (1 - x / W) * 0.55 - 0.25);
        const r = 1.2 + d * d * 6.2 + grow * 12;
        g.moveTo(x + r, y);
        g.arc(x, y, Math.min(r, cell * 0.75), 0, Math.PI * 2);
      }
    }
    g.fill();
  }

  function render(lt: number) {
    drawPlate(lt);
    const du = motion.localU(lt, b.dissolveStart, b.dissolveEnd - b.dissolveStart);
    cam.style.setProperty("--vig", (1 - (1 - vigMin) * du).toFixed(4));

    // camera
    const drift = motion.cameraDrift(lt, theme.camera.driftAmp * 0.5, theme.camera.driftPeriodSec);
    const x = cam$.x + (drift.x * W) / cam$.z;
    const y = cam$.y + (drift.y * H) / cam$.z;
    const tf = `translate3d(${cam$.sx * W}px, ${cam$.sy * H}px, 0) rotateX(${TILT.rx}deg) rotateZ(${TILT.rz}deg) scale(${cam$.z}) translate3d(${-x}px, ${-y}px, 0)`;
    blur.rig.style.transform = tf;
    sharp.rig.style.transform = tf;
    sharp.l.style.setProperty("--fx", `${(cam$.sx * 100).toFixed(2)}%`);
    sharp.l.style.setProperty("--fy", `${(cam$.sy * 100).toFixed(2)}%`);
    const wb = cam$.whip * WHIP_BLUR_PX;
    blur.l.style.filter = `blur(${(DOF_BLUR_PX + wb).toFixed(2)}px)`;
    sharp.l.style.filter = wb > 0.05 ? `blur(${wb.toFixed(2)}px)` : "none";

    // tabs
    const hasNew = lt >= b.plusClick;
    set("tab0", (e) => e.classList.toggle("is-sel", !hasNew));
    set("newtab", (e) => (e.style.display = hasNew ? "" : "none"));
    set("plus", (e) => (e.style.left = `${hasNew ? PLUS_X_AFTER : PLUS_X_BEFORE}px`));
    const typing = lt >= b.titleTypeStart;
    const committed = lt >= b.titleCommit;
    const title = motion.typeOn(lt, b.titleTypeStart, copy.newTabTitle, b.titleCps);
    set("newtab", (e) => {
      e.classList.toggle("is-sel", hasNew);
      e.classList.toggle("is-editing", typing && !committed);
    });
    set("newtab-label", (e) => (e.textContent = typing ? title.visible : copy.newTabPlaceholder));
    set("newtab-edit", (e) => (e.style.display = typing ? "none" : ""));
    set("newtab-z", (e) => (e.style.display = typing ? "" : "none"));
    const caretOn = typing && !committed && (!title.done || motion.caretBlink(lt - title.chars / b.titleCps, 1.0) === 1);
    set("newtab-caret", (e) => (e.style.opacity = caretOn ? "1" : "0"));
    set("newtab-x", (e) => (e.style.display = typing ? "" : "none"));
    set("head-title", (e) => (e.textContent = committed ? copy.newTabTitle : copy.newTabPlaceholder));

    // prompt
    const p = motion.typeOn(lt, b.promptTypeStart, copy.prompt, b.promptCps);
    const submitted = lt >= b.promptSubmit;
    set("prompt-text", (e) => (e.textContent = p.visible));
    const pc = !submitted && lt >= b.promptTypeStart - 0.3 && (!p.done || motion.caretBlink(lt, 0.9) === 1);
    set("prompt-caret", (e) => (e.style.opacity = pc ? "1" : "0"));
    set("prompt-chev", (e) => e.classList.toggle("is-sent", submitted));

    // streaming tool calls
    copy.tools.forEach((l, i) => {
      const on = lt >= l.at;
      set(`line${i}`, (e) => (e.style.visibility = on ? "visible" : "hidden"));
      if (!on) return;
      const s = motion.typeOn(lt, l.at, l.text, b.streamCps);
      set(`line${i}-text`, (e) => (e.textContent = s.visible));
      const metaOn = s.done && l.meta ? lt >= l.at + l.text.length / b.streamCps + 0.12 : false;
      set(`line${i}-meta`, (e) => (e.textContent = metaOn ? l.meta! : ""));
    });
  }

  return { el, render };
}
