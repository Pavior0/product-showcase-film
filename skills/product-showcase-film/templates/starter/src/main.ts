import { getTheme } from "@themes/index.ts";
import { fontsReady, installClock } from "./clock.ts";
import { buildFilm } from "./film.ts";
import { DEFAULT_THEME, getStoryboard } from "./storyboard.ts";

const params = new URLSearchParams(location.search);
const renderMode = params.has("render");
document.documentElement.classList.toggle("is-render", renderMode);

// One switch for preset + storyboard: ?theme=<id>  >  VITE_THEME  >  opencode
const themeId = params.get("theme") ?? (import.meta.env.VITE_THEME as string | undefined) ?? DEFAULT_THEME;

/** Every self-hosted face the preset's type roles use (first family of each stack, at its weight). */
function themeFaces(id: string): string[] {
  const theme = getTheme(getStoryboard(id).theme);
  const hosted = new Set([...document.fonts].map((f) => f.family.replace(/["']/g, "")));
  const faces = new Set<string>();
  for (const role of Object.values(theme.type)) {
    if (!role) continue;
    const fam = role.family.split(",")[0].trim().replace(/["']/g, "");
    if (hosted.has(fam)) faces.add(`${role.weight} ${role.sizePx}px "${fam}"`);
  }
  return [...faces];
}

window.__ready = (async () => {
  // layout-dependent tweens need real glyph metrics, so build after fonts decode
  await fontsReady(themeFaces(themeId));
  const app = document.getElementById("app")!;
  const film = buildFilm(app, themeId);
  const clock = installClock(film.render, film);
  if (!renderMode) {
    const { mountPreview } = await import("./preview.ts");
    mountPreview(film.stage, clock);
  }
})();
