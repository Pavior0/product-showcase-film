/**
 * Theme-driven scene kit: one pure render(local) per storyboard scene type. Every number that
 * defines a preset's look (easings, durations, typing speed, caret, colors, type) is read from
 * the theme, so the same storyboard re-skins under any preset. No wall clock, no rAF, no random.
 */
import type { Theme } from "@themes/index.ts";
import { caretBlink, clamp01, countUp, easeBezier, localU } from "@themes/motion.ts";
import type { Bg, Row, Scene } from "../storyboards/types.ts";
import type { SceneCtx, SceneView } from "./types.ts";

type Of<K extends Scene["id"]> = Extract<Scene, { id: K }>;

const el = (tag: string, cls = "", text?: string): HTMLElement => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
};

export function bgFill(bg: Bg | undefined): string {
  switch (bg) {
    case "black":
      return "#000";
    case "surface":
      return "var(--psf-surface)";
    case "plate":
      return "var(--psf-plate, var(--psf-bg))";
    case "backdrop":
      return "var(--psf-backdrop, var(--psf-plate, var(--psf-bg)))";
    default:
      return "var(--psf-bg)";
  }
}

const ease = (theme: Theme, name: keyof Theme["easings"], u: number) => easeBezier(theme.easings[name].bezier, clamp01(u));
const sec = (ms: number) => ms / 1000;
const param = (theme: Theme, id: string, key: string): number | string | undefined =>
  theme.transitions.find((x) => x.id === id)?.params[key];
const typingCps = (theme: Theme) => {
  const cps = param(theme, "typeOn", "charsPerSec");
  return typeof cps === "number" && cps > 0 ? cps : 1000 / Math.max(1, theme.durations.msPerCaptionChar);
};
const caretPeriod = (theme: Theme) => {
  const ms = param(theme, "typeOn", "caretPeriodMs");
  return typeof ms === "number" && ms > 0 ? ms / 1000 : 1;
};
const blockCaret = (theme: Theme) => param(theme, "typeOn", "caret") === "block";

function hexRgb(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a: string, b: string, u: number): string {
  const A = hexRgb(a);
  const B = hexRgb(b);
  return `rgb(${A.map((x, i) => Math.round(x + (B[i] - x) * u)).join(",")})`;
}

function sceneRoot(kind: string, bg?: Bg): HTMLElement {
  const root = el("div", `scene k-${kind}`);
  root.style.background = bgFill(bg);
  return root;
}

/** Caret element: block or thin bar per theme.transitions.typeOn.params.caret. */
function caretEl(theme: Theme): HTMLElement {
  return el("span", `k-caret ${blockCaret(theme) ? "is-block" : "is-bar"}`);
}

/** Blink with visibility, not opacity: toggling opacity 0↔1 re-chunks the paint of the
 *  surrounding text, and the next frames antialias differently depending on history. */
function showCaret(caret: HTMLElement, on: boolean): void {
  caret.style.visibility = on ? "" : "hidden";
}

// ─── caption ──────────────────────────────────────────────────────────────────────────────

export function captionScene(ctx: SceneCtx, s: Of<"caption">): SceneView {
  const { theme } = ctx;
  const root = sceneRoot("caption", s.bg);
  root.classList.toggle("is-left", s.align === "left");
  const block = el("div", "k-cap-block");
  const roleCls = s.role === "display" ? "psf-display" : s.role === "mono" ? "psf-mono k-cap-mono" : "psf-caption";
  const at = s.at ?? 0;

  const eyebrow = s.eyebrow ? el("div", "psf-display k-eyebrow", s.eyebrow) : null;
  if (eyebrow) block.append(eyebrow);

  const cap = el("div", `${roleCls} k-cap`);
  if (s.uppercase) cap.style.textTransform = "uppercase";
  if (s.tone === "muted") cap.style.color = "var(--psf-muted)";
  block.append(cap);

  // Build words (wordCut) or chars (type) as spans so layout never reflows while revealing.
  const words: HTMLElement[] = [];
  const chars: HTMLElement[] = [];
  s.lines.forEach((line) => {
    const lineEl = el("div", "k-cap-line");
    const tokens = line.match(/\[[^\]]+\]|\S+/g) ?? [];
    tokens.forEach((tok, ti) => {
      const isChip = tok.startsWith("[");
      const w = el("span", isChip ? "k-chip" : "k-word");
      const text = isChip ? tok.slice(1, -1) : tok;
      if (s.mode === "type" && !isChip) {
        for (const ch of text) {
          const c = el("span", "k-ch", ch);
          chars.push(c);
          w.append(c);
        }
      } else w.textContent = text;
      if (isChip && s.mode === "type") chars.push(w);
      words.push(w);
      lineEl.append(w);
      if (ti < tokens.length - 1) {
        const sp = el("span", "k-ch", " ");
        if (s.mode === "type") chars.push(sp);
        lineEl.append(sp);
      }
    });
    cap.append(lineEl);
  });
  const caret = s.mode === "type" ? caretEl(theme) : null;

  const sub = s.sub ? el("div", "k-sub", s.sub) : null;
  if (sub) block.append(sub);
  root.append(block);

  const enter = sec(theme.durations.enterMs) || 0.5;
  const cps = typingCps(theme);
  const typeEnd = at + chars.length / cps;

  return {
    el: root,
    render(local) {
      let subU = 1;
      if (s.mode === "cut") {
        cap.style.opacity = local >= at ? "1" : "0";
        subU = local >= at ? 1 : 0;
      } else if (s.mode === "wordCut") {
        const per = s.perWord ?? 0.25;
        words.forEach((w, i) => (w.style.visibility = local >= at + i * per ? "visible" : "hidden"));
        subU = local >= at + words.length * per ? 1 : 0;
      } else if (s.mode === "type") {
        const n = Math.max(0, Math.min(chars.length, Math.floor((local - at) * cps)));
        chars.forEach((c, i) => (c.style.visibility = i < n ? "visible" : "hidden"));
        if (caret) {
          const anchor = n > 0 ? chars[n - 1] : chars[0];
          if (n > 0) anchor.after(caret);
          else anchor?.before(caret);
          const typing = local >= at && local < typeEnd;
          showCaret(caret, local >= at && (typing || caretBlink(local - typeEnd, caretPeriod(theme)) > 0));
        }
        subU = local >= typeEnd + 0.15 ? 1 : 0;
      } else if (s.mode === "blurIn") {
        const u = localU(local, at, enter);
        const e = ease(theme, "enter", u);
        const settle = ease(theme, "settle", localU(local, at, sec(theme.durations.settleMs) || 1));
        cap.style.opacity = String(e);
        cap.style.filter = `blur(${(16 * (1 - e)).toFixed(2)}px)`;
        cap.style.color = mix(theme.palette.muted, theme.palette.text, settle);
        subU = e;
      } else {
        const u = localU(local, at, enter);
        const e = ease(theme, "enter", u);
        cap.style.opacity = String(clamp01(e));
        cap.style.transform = `translateY(${(28 * (1 - e)).toFixed(2)}px)`;
        subU = ease(theme, "enter", localU(local, at + 0.25, enter));
      }
      if (eyebrow) eyebrow.style.opacity = local >= Math.max(0, at - 0.3) ? "1" : "0";
      if (sub) sub.style.opacity = String(clamp01(subU));
      if (s.exit) {
        const ex = sec(theme.durations.exitMs) || 0.4;
        const u = localU(local, s.dur - ex, ex);
        block.style.opacity = String(1 - ease(theme, "exit", u));
        block.style.filter = u > 0 ? `blur(${(10 * u).toFixed(2)}px)` : "";
      }
    },
  };
}

// ─── window (UI card with pointer / swap / stat) ──────────────────────────────────────────

function rowsEl(rows: Row[]): { list: HTMLElement; items: HTMLElement[] } {
  const list = el("div", "k-rows");
  const items = rows.map((r) => {
    const row = el("div", "k-row");
    if (r.dot) {
      const d = el("span", "k-dot");
      d.style.background = r.dot;
      row.append(d);
    }
    row.append(el("span", "k-row-label", r.label));
    if (r.meta) row.append(el("span", "k-row-meta", r.meta));
    if (r.chip) row.append(el("span", "k-row-chip", r.chip));
    list.append(row);
    return row;
  });
  return { list, items };
}

const POINTER_SVG =
  '<svg viewBox="0 0 24 24" width="44" height="44"><path d="M4 2 L4 19 L8.6 15 L11.6 22 L14.4 20.8 L11.5 14 L18 14 Z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';

export function windowScene(ctx: SceneCtx, s: Of<"window">): SceneView {
  const { theme } = ctx;
  const root = sceneRoot("window", s.bg);
  const cam = el("div", "k-cam");
  if (s.tilt) { cam.classList.add("is-tilt"); root.style.perspective = "2200px"; }
  const win = el("div", `k-win${s.light ? " is-light" : ""}`);
  const head = el("div", "k-win-head");
  const title = el("div", "k-win-title", s.title);
  head.append(el("span", "k-lights"), title);
  win.append(head);
  const body = el("div", "k-win-body");
  const a = rowsEl(s.rows);
  body.append(a.list);
  let b: ReturnType<typeof rowsEl> | null = null;
  let title2: HTMLElement | null = null;
  if (s.swap) {
    b = rowsEl(s.swap.rows);
    b.list.classList.add("is-swap");
    body.append(b.list);
    title2 = el("div", "k-win-title is-swap", s.swap.title);
    head.append(title2);
  }
  win.append(body);
  let statNum: HTMLElement | null = null;
  let statWrap: HTMLElement | null = null;
  if (s.stat) {
    statWrap = el("div", "k-stat");
    statNum = el("div", "k-stat-num", `0${s.stat.suffix}`);
    statWrap.append(statNum, el("div", "k-stat-label", s.stat.label));
    win.append(statWrap);
  }
  const pointer = s.pointer ? el("div", "k-pointer") : null;
  if (pointer) {
    pointer.innerHTML = POINTER_SVG;
    win.append(pointer);
  }
  cam.append(win);
  root.append(cam);

  const enter = sec(theme.durations.enterMs) || 0.5;
  const trans = sec(theme.durations.transitionMs) || 0.4;
  const [z0, z1] = s.push ?? [1, 1];
  const tilt = s.tilt ?? 0;

  return {
    el: root,
    render(local) {
      const e = enter > 0 ? ease(theme, "enter", localU(local, 0, enter)) : 1;
      const z = z0 + (z1 - z0) * ease(theme, theme.camera.zoomEasing, localU(local, 0, s.dur));
      const tiltNow = tilt * (1 - 0.35 * ease(theme, "settle", localU(local, 0, s.dur)));
      // Flat windows: plain 2D scale with no perspective ancestor, so Chrome paints it with a
      // matrix instead of promoting a compositor layer (whose raster scale depends on frame history).
      // Not CSS zoom: zoom changes the font size, and Blink buckets cached fonts to 0.01px, so the
      // first exact size seen in a bucket wins → order-dependent glyphs.
      cam.style.transform = tilt
        ? `scale(${z.toFixed(4)}) rotateX(${tiltNow.toFixed(3)}deg) rotateZ(${(-tiltNow * 0.45).toFixed(3)}deg)`
        : z0 === z1 && z0 === 1 ? "" : `scale(${z.toFixed(4)})`; // no push → no transform at all
      win.style.opacity = String(e);
      // whole-pixel offset: a fractional translate re-antialiases the rounded border/shadow with history
      win.style.transform = e < 1 ? `translateY(${Math.round(24 * (1 - e))}px)` : "";

      if (s.swap && b && title2) {
        const u = ease(theme, "settle", localU(local, s.swap.at, trans));
        a.list.style.opacity = u > 0 ? String(1 - u) : "";
        // blur only while it is visible; a lingering blur(0px) keeps a filter layer whose
        // raster is reused across frames (order-dependent pixels under zoom)
        a.list.style.filter = u > 0.01 && u < 0.99 ? `blur(${(8 * u).toFixed(2)}px)` : "";
        b.list.style.opacity = String(u);
        b.list.style.filter = u > 0.01 && u < 0.99 ? `blur(${(8 * (1 - u)).toFixed(2)}px)` : "";
        b.list.style.top = `${(16 + 12 * (1 - u)).toFixed(2)}px`; // layout offset, not a transform (no layer)
        title.style.opacity = String(1 - u);
        title2.style.opacity = String(u);
      }

      if (s.stat && statNum && statWrap) {
        const u = localU(local, s.stat.at, 0.9);
        statWrap.style.opacity = local >= s.stat.at ? "1" : "0";
        statNum.textContent = `${countUp(u, 0, s.stat.to, 0, theme.easings.settle.bezier)}${s.stat.suffix}`;
      }

      if (s.pointer && pointer) {
        const target = a.items[s.pointer.row] ?? a.items[0];
        // layout reads are deterministic (same DOM, same fonts) — no state carried across frames
        const tx = body.offsetLeft + target.offsetLeft + target.offsetWidth * 0.62;
        const ty = body.offsetTop + target.offsetTop + target.offsetHeight * 0.5;
        const u = ease(theme, "settle", localU(local, s.pointer.at - 0.8, 0.8));
        const x = tx + 260 * (1 - u);
        const y = ty + 180 * (1 - u);
        const press = local >= s.pointer.at && local < s.pointer.at + 0.12 ? 0.88 : 1;
        pointer.style.opacity = local >= s.pointer.at - 0.8 ? "1" : "0";
        pointer.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${press})`;
        a.items.forEach((it, i) => it.classList.toggle("is-active", i === s.pointer!.row && local >= s.pointer!.at));
      }
    },
  };
}

// ─── hud (linear orbit diagram) ───────────────────────────────────────────────────────────

export function hudScene(ctx: SceneCtx, s: Of<"hud">): SceneView {
  const { theme, width: W, height: H } = ctx;
  const root = sceneRoot("hud", "bg");
  const cam = el("div", "k-hud-cam");
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("class", "k-hud-svg");
  const g = document.createElementNS(NS, "g");
  const cx = W / 2;
  const cy = H / 2;
  for (const r of [180, 300, 420]) {
    const c = document.createElementNS(NS, "ellipse");
    c.setAttribute("cx", String(cx));
    c.setAttribute("cy", String(cy));
    c.setAttribute("rx", String(r * 1.6));
    c.setAttribute("ry", String(r));
    c.setAttribute("fill", "none");
    c.setAttribute("stroke", theme.palette.border);
    c.setAttribute("stroke-width", "1.5");
    g.append(c);
  }
  const comet = document.createElementNS(NS, "circle");
  comet.setAttribute("r", "7");
  comet.setAttribute("fill", theme.palette.accent);
  comet.setAttribute("class", "k-comet");
  g.append(comet);
  svg.append(g);
  cam.append(svg);

  const R = 300;
  const labels = s.nodes.map((n, i) => {
    const ang = -Math.PI / 2 + (i / s.nodes.length) * Math.PI * 2;
    const wrap = el("div", "k-node");
    wrap.style.left = `${cx + Math.cos(ang) * R * 1.6}px`;
    wrap.style.top = `${cy + Math.sin(ang) * R}px`;
    wrap.append(el("span", "k-node-dot"));
    const t = el("span", "psf-mono k-node-label");
    wrap.append(t);
    cam.append(wrap);
    return { wrap, t, text: n.toUpperCase(), i };
  });
  root.append(cam);
  const cps = 28;

  return {
    el: root,
    render(local) {
      const z = 1 + 0.15 * ease(theme, "settle", localU(local, 0, s.dur));
      cam.style.transform = `scale(${z.toFixed(4)})`;
      g.setAttribute("transform", `rotate(${(local * 3).toFixed(3)} ${cx} ${cy})`);
      const ang = -Math.PI / 2 + local * 1.4;
      comet.setAttribute("cx", (cx + Math.cos(ang) * R * 1.6).toFixed(2));
      comet.setAttribute("cy", (cy + Math.sin(ang) * R).toFixed(2));
      for (const l of labels) {
        const start = 0.4 + l.i * 0.45;
        const n = Math.max(0, Math.min(l.text.length, Math.floor((local - start) * cps)));
        l.t.textContent = l.text.slice(0, n);
        l.wrap.style.opacity = local >= start ? "1" : "0";
        const focused = l.i === s.focus;
        l.wrap.classList.toggle("is-focus", focused);
        l.wrap.style.filter = focused ? "" : "blur(1.5px)";
      }
    },
  };
}

// ─── search (raycast launcher over chrome backdrop) ───────────────────────────────────────

export function searchScene(ctx: SceneCtx, s: Of<"search">): SceneView {
  const { theme } = ctx;
  const root = sceneRoot("search", "black");
  const swirl = el("div", "k-swirl");
  root.append(swirl);
  const cam = el("div", "k-search-cam");
  const panel = el("div", "k-search");
  const bar = el("div", "k-search-bar");
  const ph = el("span", "k-search-ph", s.placeholder);
  const q = el("span", "k-search-q");
  const caret = caretEl(theme);
  bar.append(q, caret, ph);
  const list = el("div", "k-search-list");
  const items = s.results.map((r, i) => {
    const it = el("div", `k-search-item${i === 0 ? " is-sel" : ""}`);
    it.append(el("span", "k-search-ico"), el("span", "", r));
    list.append(it);
    return it;
  });
  panel.append(bar, list);
  cam.append(panel);
  root.append(cam);
  const cps = 1 / 0.07;
  const typeEnd = s.typeAt + s.query.length / cps;

  return {
    el: root,
    render(local) {
      swirl.style.transform = `rotate(${(local * 8).toFixed(3)}deg) scale(1.4)`;
      // Quantize the push to 0.002 steps: text under a scale transform shares Skia glyph
      // strikes in ~0.01px buckets, so near-identical scales seen earlier would win the bucket.
      const z = Math.round((1 + 0.18 * ease(theme, "snap", localU(local, 0, s.dur))) * 500) / 500;
      cam.style.transform = z === 1 ? "" : `scale(${z.toFixed(3)})`;
      const n = Math.max(0, Math.min(s.query.length, Math.floor((local - s.typeAt) * cps)));
      q.textContent = s.query.slice(0, n);
      ph.style.display = n === 0 ? "" : "none";
      const typing = local >= s.typeAt && local < typeEnd;
      showCaret(caret, typing || caretBlink(local, caretPeriod(theme)) > 0);
      const show = n >= 3;
      list.style.display = show ? "" : "none";
      items.forEach((it, i) => (it.style.opacity = show && local >= s.typeAt + 3 / cps + i * 0.04 ? "1" : "0"));
    },
  };
}

// ─── terminal (vercel transcript / stripe TUI) ────────────────────────────────────────────

const SPIN = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";

export function terminalScene(ctx: SceneCtx, s: Of<"terminal">): SceneView {
  const { theme } = ctx;
  const root = sceneRoot("terminal", s.chrome ? "bg" : "black");
  const frame = el("div", `k-term${s.chrome ? " has-chrome" : ""}`);
  if (s.chrome) frame.append(el("div", "k-term-bar"));
  const screen = el("div", "k-term-screen psf-mono");
  const cmdLine = el("div", "k-term-line");
  const prompt = el("span", "k-term-prompt", `${s.prompt ?? "$"} `);
  const cmd = el("span", "k-term-cmd");
  const caret = caretEl(theme);
  cmdLine.append(prompt, cmd, caret);
  screen.append(cmdLine);
  const outs = s.lines.map((l) => {
    const d = el("div", `k-term-line is-${l.kind}`);
    screen.append(d);
    return { d, l };
  });
  let panel: HTMLElement | null = null;
  if (s.panel) {
    panel = el("div", "k-term-panel");
    panel.append(el("div", "k-term-panel-title", s.panel.title));
    for (const [k, v] of s.panel.rows) {
      const r = el("div", "k-term-kv");
      r.append(el("span", "k-term-k", k), el("span", "k-term-v", v));
      panel.append(r);
    }
    screen.append(panel);
  }
  frame.append(screen);
  root.append(frame);
  const cps = s.cps ?? typingCps(theme);
  const typeEnd = s.typeAt + s.command.length / cps;

  return {
    el: root,
    render(local) {
      const n = Math.max(0, Math.min(s.command.length, Math.floor((local - s.typeAt) * cps)));
      cmd.textContent = s.command.slice(0, n);
      const typing = local >= s.typeAt && local < typeEnd;
      const firstOut = s.lines.length ? s.lines[0].at : Infinity;
      caret.style.display = local < firstOut ? "" : "none";
      showCaret(caret, typing || caretBlink(local, caretPeriod(theme)) > 0);
      for (const { d, l } of outs) {
        const on = local >= l.at && (l.until === undefined || local < l.until);
        d.style.display = on ? "" : "none";
        if (!on) continue;
        if (l.kind === "spin") d.textContent = `${SPIN[Math.floor((local - l.at) * 12) % SPIN.length]} ${l.text}`;
        else d.textContent = l.text;
      }
      if (s.panel && panel) {
        const u = localU(local, s.panel.at, 0.2);
        panel.style.display = local >= s.panel.at ? "" : "none";
        panel.style.opacity = String(u);
      }
    },
  };
}

// ─── keys (granola keycaps + glowing pill) ────────────────────────────────────────────────

export function keysScene(ctx: SceneCtx, s: Of<"keys">): SceneView {
  const { theme } = ctx;
  const root = sceneRoot("keys", "bg");
  const row = el("div", "k-keys");
  const caps = s.keys.map((k) => {
    const c = el("div", `k-key${k.accent ? " is-accent" : ""}`);
    c.append(el("span", "k-key-legend", k.label));
    row.append(c);
    return c;
  });
  const pill = el("div", "k-pill");
  const bars = Array.from({ length: 24 }, () => {
    const b = el("span", "k-bar");
    pill.append(b);
    return b;
  });
  const head = s.headline ? el("div", "psf-display k-keys-head", s.headline) : null;
  root.append(row, pill);
  if (head) root.append(head);
  const enter = sec(theme.durations.enterMs) || 0.6;

  return {
    el: root,
    render(local) {
      caps.forEach((c, i) => {
        const u = localU(local, 0.3 + i * 0.3, enter);
        const e = ease(theme, "enter", u); // granola's enter overshoots
        const blur = 18 * (1 - ease(theme, "settle", u));
        c.style.opacity = String(clamp01(u * 3));
        c.style.transform = `translateY(${(-90 * (1 - e)).toFixed(2)}px) scale(${(0.9 + 0.1 * e).toFixed(4)})`;
        c.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
      });
      const pu = ease(theme, "settle", localU(local, s.pillAt, 0.7));
      pill.style.width = `${(120 + 460 * pu).toFixed(1)}px`;
      pill.style.opacity = local >= s.pillAt ? "1" : "0";
      bars.forEach((b, i) => {
        const h = 8 + 46 * Math.abs(Math.sin(local * 6 + i * 0.7)) * pu;
        b.style.height = `${h.toFixed(1)}px`;
      });
      if (head) head.style.opacity = local >= s.pillAt + 0.8 ? "1" : "0";
    },
  };
}

// ─── wire (vercel hairline isometric boxes) ───────────────────────────────────────────────

export function wireScene(ctx: SceneCtx, s: Of<"wire">): SceneView {
  const { theme, width: W, height: H } = ctx;
  const root = sceneRoot("wire", "black");
  const prism = (x: number, dashed: boolean) => {
    const w = 260;
    const h = 200;
    const d = 120;
    const y = H / 2 - 40;
    const pts = (arr: number[][]) => arr.map(([a, b]) => `${a},${b}`).join(" ");
    const dash = dashed ? ' stroke-dasharray="8 8"' : "";
    const st = `fill="none" stroke="${theme.palette.text}" stroke-width="1.5"${dash}`;
    return `<polygon ${st} points="${pts([[x, y], [x + w, y], [x + w, y + h], [x, y + h]])}"/>
      <polygon ${st} points="${pts([[x, y], [x + d, y - d * 0.55], [x + w + d, y - d * 0.55], [x + w, y]])}"/>
      <polygon ${st} points="${pts([[x + w, y], [x + w + d, y - d * 0.55], [x + w + d, y + h - d * 0.55], [x + w, y + h]])}"/>`;
  };
  const svgWrap = el("div", "k-wire-svg");
  svgWrap.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${prism(W / 2 - 520, false)}${prism(W / 2 + 140, true)}
    <line x1="${W / 2 - 130}" y1="${H / 2 + 60}" x2="${W / 2 + 140}" y2="${H / 2 + 60}" stroke="${theme.palette.muted}" stroke-width="1.5" stroke-dasharray="4 6"/></svg>`;
  root.append(svgWrap);
  const labels = s.labels.map((t, i) => {
    const l = el("div", "psf-display k-wire-label");
    l.style.left = `${i === 0 ? W / 2 - 390 : W / 2 + 270}px`;
    root.append(l);
    return { l, t };
  });
  const cps = typingCps(theme);
  return {
    el: root,
    render(local) {
      svgWrap.style.opacity = local >= 0 ? "1" : "0";
      labels.forEach(({ l, t }, i) => {
        const n = Math.max(0, Math.min(t.length, Math.floor((local - 0.4 - i * 0.6) * cps)));
        l.textContent = t.slice(0, n);
      });
    },
  };
}

// ─── pair (raycast tracked mono L/R) ──────────────────────────────────────────────────────

export function pairScene(_ctx: SceneCtx, s: Of<"pair">): SceneView {
  const root = sceneRoot("pair", "black");
  root.append(el("div", "psf-mono k-pair-l", s.left), el("div", "psf-mono k-pair-r", s.right));
  return { el: root, render() {} };
}

// ─── mark (typeset placeholder, never a brand logo) ───────────────────────────────────────

export function markScene(ctx: SceneCtx, s: Of<"mark">): SceneView {
  const { theme } = ctx;
  const root = sceneRoot("mark", s.bg ?? "black");
  root.classList.toggle("on-plate", s.bg === "plate");
  const m = el("div", "k-mark");
  if (s.glyph) m.append(el("span", "k-mark-glyph", s.glyph));
  if (s.text) m.append(el("span", "k-mark-text", s.text));
  root.append(m);
  const fadeOk = theme.transitions.some((x) => x.id === "fade" && x.allowed) && theme.durations.enterMs > 0;
  const enter = sec(theme.durations.enterMs);
  return {
    el: root,
    render(local) {
      if (!fadeOk) {
        m.style.opacity = "1";
        return;
      }
      const e = ease(theme, "enter", localU(local, 0, enter));
      m.style.opacity = String(e);
      m.style.filter = e < 1 ? `blur(${(10 * (1 - e)).toFixed(2)}px)` : "";
    },
  };
}
