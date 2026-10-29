import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// `@themes` → ./themes when you vendored a copy (`npm run vendor-themes`, for a starter copied
// out of the skill), otherwise the skill's shared ../../themes. One source of truth, no drift.
const root = path.dirname(fileURLToPath(import.meta.url));
const vendored = path.join(root, "themes");
const themesDir = fs.existsSync(path.join(vendored, "index.ts")) ? vendored : path.resolve(root, "../../themes");

export default defineConfig({
  resolve: { alias: { "@themes": themesDir } },
  server: { port: 5179, strictPort: false, fs: { allow: [root, themesDir] } },
  logLevel: "warn",
});
