/**
 * Plausible OpenCode desktop window as plain DOM, built at 2x "retina" units so
 * macro push-ins stay crisp. Every dynamic node carries data-k so the macro scene
 * can update all clones (sharp + blurred DOF layers) together.
 */
import type { MacroCopy } from "../storyboards/types.ts";

export const PLANE = { w: 3200, h: 2000, barH: 112, tabsX: 262 };
/** absolute x of each tab slot inside the tab row (plane units) */
export const TAB_X = [0, 372, 744];
export const PLUS_X_BEFORE = 744;
export const PLUS_X_AFTER = 1100;
export const PROMPT_Y = 262;
export const LINE_Y0 = 352;
export const LINE_DY = 64;

const h = (tag: string, cls = "", text = ""): HTMLElement => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  return el;
};

const zChip = () => h("span", "oc-z", "Z");

function tab(label: string, k: string): HTMLElement {
  const t = h("div", "oc-tab");
  t.dataset.k = k;
  t.append(zChip(), h("span", "oc-tab-label", label), h("span", "oc-x", "×"));
  return t;
}

export function buildWindow(copy: MacroCopy): HTMLElement {
  const win = h("div", "oc-win");
  const bar = h("div", "oc-bar");
  const lights = h("div", "oc-lights");
  lights.append(h("i", "r"), h("i", "y"), h("i", "g"));
  const grid = h("div", "oc-grid");
  grid.innerHTML =
    '<svg viewBox="0 0 30 30" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="2" width="10" height="10" rx="2"/><rect x="18" y="2" width="10" height="10" rx="2"/><rect x="2" y="18" width="10" height="10" rx="2"/><path d="M23 17v12M17 23h12"/></svg>';
  const tabs = h("div", "oc-tabs");
  copy.tabs.forEach((label, i) => {
    const t = tab(label, `tab${i}`);
    t.style.left = `${TAB_X[i]}px`;
    tabs.append(t);
  });
  const nt = h("div", "oc-tab is-new");
  nt.dataset.k = "newtab";
  nt.style.left = `${TAB_X[2]}px`;
  const edit = h("span", "oc-edit");
  edit.innerHTML =
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9 15l1-3 6-6 2 2-6 6z"/></svg>';
  edit.dataset.k = "newtab-edit";
  const z = zChip();
  z.dataset.k = "newtab-z";
  const lab = h("span", "oc-tab-label");
  lab.dataset.k = "newtab-label";
  const caret = h("span", "oc-caret");
  caret.dataset.k = "newtab-caret";
  const x = h("span", "oc-x", "×");
  x.dataset.k = "newtab-x";
  nt.append(edit, z, lab, caret, x);
  tabs.append(nt);
  const plus = h("div", "oc-plus", "+");
  plus.dataset.k = "plus";
  tabs.append(plus);
  bar.append(lights, grid, tabs);

  const main = h("div", "oc-main");
  const head = h("div", "oc-head");
  const title = h("span", "oc-head-title", copy.sessionHeader);
  title.dataset.k = "head-title";
  head.append(title, h("span", "oc-head-meta", "build · main"));
  const prompt = h("div", "oc-prompt");
  prompt.style.top = `${PROMPT_Y}px`;
  const chev = h("span", "oc-chev", "›");
  chev.dataset.k = "prompt-chev";
  const ptext = h("span", "oc-prompt-text");
  ptext.dataset.k = "prompt-text";
  const pcaret = h("span", "oc-bcaret");
  pcaret.dataset.k = "prompt-caret";
  prompt.append(chev, ptext, pcaret);
  main.append(head, prompt);
  copy.tools.forEach((l, i) => {
    const row = h("div", `oc-line is-${l.kind}`);
    row.dataset.k = `line${i}`;
    row.style.top = `${LINE_Y0 + i * LINE_DY}px`;
    const text = h("span", "oc-line-text");
    text.dataset.k = `line${i}-text`;
    const meta = h("span", "oc-line-meta");
    meta.dataset.k = `line${i}-meta`;
    row.append(h("span", "oc-gutter", "│"), h("span", "oc-verb", l.verb), text, meta);
    main.append(row);
  });
  win.append(bar, main);
  return win;
}
