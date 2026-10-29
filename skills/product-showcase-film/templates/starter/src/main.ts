import { fontsReady, installClock } from "./clock.ts";
import { buildFilm } from "./film.ts";

const params = new URLSearchParams(location.search);
const renderMode = params.has("render");
document.documentElement.classList.toggle("is-render", renderMode);

window.__ready = (async () => {
  // layout-dependent tweens need real glyph metrics, so build after fonts decode
  await fontsReady(['500 71px "JetBrains Mono"', '800 180px "JetBrains Mono"', '500 27px "Inter"', '600 30px "Inter"']);
  const app = document.getElementById("app")!;
  const film = buildFilm(app);
  const clock = installClock(film.render, film.duration, film.fps);
  if (!renderMode) {
    const { mountPreview } = await import("./preview.ts");
    mountPreview(film.stage, clock);
  }
})();
