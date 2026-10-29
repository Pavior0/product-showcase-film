/**
 * Storyboard data types. Types only: storyboards stay plain data so scripts/cues.mjs can
 * bundle them with esbuild in Node (no DOM, no CSS, no GSAP). `dur` and every `at` are seconds;
 * `at` is scene-local.
 */

export type Sfx = "keypress" | "softClick" | "tick" | "whoosh" | "paymentTap" | "musicLift";

export type Cue = {
  /** scene-local seconds */
  at: number;
  id: string;
  sfx?: Sfx;
  /** repeat the cue `count` times, `every` seconds apart (typing) */
  every?: number;
  count?: number;
};

/** opencode macro take (src/scenes/macro.ts) */
export type ToolLine = { at: number; kind: "read" | "edit" | "run" | "pass" | "say"; verb: string; text: string; meta?: string };
export type MacroCopy = { tabs: string[]; newTabPlaceholder: string; newTabTitle: string; sessionHeader: string; prompt: string; tools: ToolLine[] };
export type MacroBeats = {
  dissolveStart: number;
  dissolveEnd: number;
  plusClick: number;
  titleTypeStart: number;
  titleCps: number;
  titleCommit: number;
  promptTypeStart: number;
  promptCps: number;
  promptSubmit: number;
  streamCps: number;
};

/** Which palette slot fills a scene background. */
export type Bg = "bg" | "black" | "surface" | "plate" | "backdrop";

/**
 * Caption entrance, one per preset grammar:
 *  - cut:      hard cut, whole line at once (opencode, vercel end lines)
 *  - wordCut:  word-by-word on hard cuts (cursor, ~250ms/word)
 *  - blurIn:   blur 16px→0 + muted→text brighten (linear end cards)
 *  - type:     typed at theme.durations.msPerCaptionChar with a caret (vercel, raycast)
 *  - riseFade: soft rise (paper-editorial, warm-consumer, granola sub lines)
 */
export type CaptionMode = "cut" | "wordCut" | "blurIn" | "type" | "riseFade";

export type Row = {
  label: string;
  meta?: string;
  /** status dot color (hex) — linear-light labels, stripe ✓ */
  dot?: string;
  /** right-aligned chip text */
  chip?: string;
};

export type TermLine = {
  at: number;
  text: string;
  /** out = printed; ok = ✓ line; spin = spinner until `until`; muted = dim */
  kind: "out" | "ok" | "spin" | "muted";
  until?: number;
};

type Base = { dur: number; cues: Cue[] };

export type Scene =
  // opencode-specific (kept from the dogfood film)
  | ({ id: "macro"; copy: MacroCopy; beats: MacroBeats } & Base)
  | ({ id: "black" } & Base)
  | ({ id: "title"; copy: { lead: string; rest: string } } & Base)
  | ({ id: "wordmark"; copy: { a: string; b: string } } & Base)
  | ({ id: "line"; copy: { text: string; tone: "text" | "muted" } } & Base)
  // generic, theme-driven (src/scenes/kit.ts)
  | ({
      id: "caption";
      /** one entry per line; `[text]` renders an inline chip (cursor "+ New") */
      lines: string[];
      mode: CaptionMode;
      /** type role: caption (default), display (theme.type.display), mono */
      role?: "caption" | "display" | "mono";
      tone?: "text" | "muted";
      /** smaller line under the caption (captionMuted role) */
      sub?: string;
      /** small tracked line above the caption (theme.type.display, e.g. vercel's eyebrow) */
      eyebrow?: string;
      bg?: Bg;
      align?: "center" | "left";
      uppercase?: boolean;
      /** scene-local entrance start (s) */
      at?: number;
      /** wordCut cadence (s per word) */
      perWord?: number;
      /** blurIn: fade back out at the end of the scene */
      exit?: boolean;
    } & Base)
  | ({
      id: "window";
      title: string;
      rows: Row[];
      bg?: Bg;
      /** 3D tilt in degrees (linear dark); 0 = flat (cursor, linear-light) */
      tilt?: number;
      /** camera zoom from→to over the scene with theme.easings.settle */
      push?: [number, number];
      /** pointer clicks row `row` at `at` */
      pointer?: { at: number; row: number };
      /** light modal on a dark-UI preset (stripe approval sheet): paints palette.surfaceAlt */
      light?: boolean;
      /** cross-dissolve to a second set of rows (linear-light card swap) */
      swap?: { at: number; title: string; rows: Row[] };
      /** one big stat that counts up (cursor's orange "58%") */
      stat?: { at: number; to: number; suffix: string; label: string };
    } & Base)
  | ({ id: "hud"; nodes: string[]; focus: number; caption?: string } & Base)
  | ({ id: "search"; placeholder: string; query: string; typeAt: number; results: string[] } & Base)
  | ({
      id: "terminal";
      /** typed command (one per film) */
      command: string;
      typeAt: number;
      lines: TermLine[];
      /** boxed key/value panel (stripe) */
      panel?: { at: number; title: string; rows: [string, string][] };
      /** draw a macOS window frame around the terminal (stripe) */
      chrome?: boolean;
      prompt?: string;
      /** command typing speed; default = the preset's typeOn charsPerSec */
      cps?: number;
    } & Base)
  | ({ id: "keys"; keys: { label: string; accent?: boolean }[]; headline: string; sub?: string; pillAt: number } & Base)
  | ({ id: "wire"; labels: [string, string]; title?: string } & Base)
  | ({ id: "pair"; left: string; right: string } & Base)
  /** typeset placeholder mark — presets are unofficial, never ship a brand logo */
  | ({ id: "mark"; text: string; bg?: Bg; glyph?: string } & Base);

export type Storyboard = {
  /** theme id from @themes; frame size + fps come from theme.frame */
  theme: string;
  name: string;
  scenes: Scene[];
};
