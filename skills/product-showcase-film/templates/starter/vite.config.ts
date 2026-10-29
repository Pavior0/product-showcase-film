import { defineConfig } from "vite";

// themes/ is a copy of ../themes so this folder works when copied on its own.
// Re-sync after editing the shared presets: npm run sync-themes
export default defineConfig({
  server: { port: 5179, strictPort: false },
  logLevel: "warn",
});
