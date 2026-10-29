/**
 * Product-showcase-film theme tokens.
 * Copy one preset; never invent colors outside its palette.
 * All sizes assume the theme's `frame` (default 1920×1080).
 */

export type Hex = `#${string}`;

export type Palette = {
  /** Full-bleed stage */
  bg: Hex;
  /** Card / panel fill */
  surface: Hex;
  /** Optional second surface (e.g. light card on dark stage). Omit if unused. */
  surfaceAlt?: Hex;
  /** Hairline / card edge */
  border: Hex;
  /** Primary copy on bg/surface */
  text: Hex;
  /** Secondary / dimmed copy */
  muted: Hex;
  /** THE only accent. Never add a second brand color. */
  accent: Hex;
  /** Accent usable on light surfaces (same hue family, may equal accent) */
  accentOnLight?: Hex;
  /**
   * Optional full-bleed opener/transition plate (e.g. opencode's yellow halftone).
   * Never a card fill, text color or second accent. Kept out of surfaceAlt on purpose:
   * base.css paints .psf-card with surfaceAlt, so a plate there turns every card yellow.
   */
  plate?: Hex;
};

export type TypeRole = {
  /** CSS font-family stack (Google Fonts name or system) */
  family: string;
  /** Google Fonts URL query family=… or empty if system-only */
  googleFonts?: string;
  sizePx: number;
  weight: number;
  /** letter-spacing in em */
  trackingEm: number;
  lineHeight: number;
};

export type TypeScale = {
  /** Big end-user caption under a card ("Deploy it") */
  caption: TypeRole;
  /** Caption trailing clause in muted ("…in 0 ms") */
  captionMuted: TypeRole;
  /** In-card title / row label */
  cardTitle: TypeRole;
  /** In-card body / table */
  cardBody: TypeRole;
  /** Floating event strings / code crumbs */
  mono: TypeRole;
  /** Tiny meta (ETHOS / PRINCIPLE I) — use sparingly */
  meta: TypeRole;
};

export type EasingName = "enter" | "exit" | "settle" | "snap";

export type Easings = Record<EasingName, {
  /** CSS / Motion cubic-bezier */
  css: `cubic-bezier(${number}, ${number}, ${number}, ${number})`;
  /** Same as [x1,y1,x2,y2] for GSAP CustomEase or manual */
  bezier: [number, number, number, number];
}>;

export type Durations = {
  /** Typical scene enter */
  enterMs: number;
  /** Typical scene exit */
  exitMs: number;
  /** Settle / overshoot resolve */
  settleMs: number;
  /** Hold on a still beat before next action */
  holdMs: number;
  /** Min ms a caption stays fully readable: max(holdMs, chars * msPerCaptionChar) */
  msPerCaptionChar: number;
  /** Crossfade / wipe length */
  transitionMs: number;
};

export type TransitionId =
  | "cut"
  | "fade"
  | "riseFade"
  | "slideBlur"
  | "cardStackIn"
  | "typeOn"
  | "countUp";

export type TransitionSpec = {
  id: TransitionId;
  /** Allowed? Themes ban some. */
  allowed: boolean;
  /** Params the helper must receive — exact units */
  params: Record<string, number | string>;
};

export type Texture = {
  /** 0–1 overlay opacity */
  grainOpacity: number;
  /** feTurbulence baseFrequency (e.g. 0.8) */
  grainFreq: number;
  /** feTurbulence seed — fixed, never Math.random at render */
  grainSeed: number;
  /** SVG turbulence octaves */
  grainOctaves: number;
  /** Vignette edge darken 0–1 */
  vignette: number;
  /** Optional scanline opacity 0–1 (terminal themes) */
  scanlineOpacity: number;
};

export type CardSpec = {
  radiusPx: number;
  borderWidthPx: number;
  /** CSS box-shadow, or "none" */
  shadow: string;
  paddingPx: [number, number, number, number]; // t r b l
  /** Max card width at 1920 stage */
  maxWidthPx: number;
};

export type Camera = {
  /** Idle drift amplitude as fraction of frame (e.g. 0.004) */
  driftAmp: number;
  /** Drift period in seconds */
  driftPeriodSec: number;
  /** Allowed punch-in scale range [min, max] */
  zoomRange: [number, number];
  /** Zoom ease name */
  zoomEasing: EasingName;
};

export type SoundCue =
  | "keypress"
  | "softClick"
  | "tick"
  | "streamTick"
  | "paymentTap"
  | "whoosh"
  | "riser"
  | "impact";

export type SoundPalette = {
  allowed: SoundCue[];
  banned: SoundCue[];
  /** Music lift lands on this beat id convention */
  musicLiftOn: "logo" | "endCard" | "captionHit";
};

export type FrameSpec = {
  width: number;
  height: number;
  fps: number;
};

export type Theme = {
  id: string;
  name: string;
  /** One line: when an agent should pick this */
  useWhen: string;
  frame: FrameSpec;
  palette: Palette;
  type: TypeScale;
  easings: Easings;
  durations: Durations;
  transitions: TransitionSpec[];
  texture: Texture;
  card: CardSpec;
  camera: Camera;
  sound: SoundPalette;
  /** Hard bans — agent must not do these under this theme */
  bans: string[];
};

export function captionHoldMs(theme: Theme, caption: string): number {
  return Math.max(
    theme.durations.holdMs,
    Math.ceil(caption.length * theme.durations.msPerCaptionChar),
  );
}
