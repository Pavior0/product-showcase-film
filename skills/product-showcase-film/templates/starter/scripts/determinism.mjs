#!/usr/bin/env node
/**
 * Render the same slice twice — once in order, once in a shuffled frame order on fresh
 * browsers — and compare per-frame sha256 of the captured pixels. Any mismatch means a
 * frame depends on something other than t (wall clock, rAF, previous-frame state, RNG).
 *
 *   node scripts/determinism.mjs --from 3 --dur 2 [--theme id] [--scale 1]
 *   node scripts/determinism.mjs --from 0 --dur end --theme linear   # whole film
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const flag = (n, d) => (argv.includes(`--${n}`) ? argv[argv.lastIndexOf(`--${n}`) + 1] : d); // last wins, so npm-script defaults can be overridden
const from = flag("from", "3");
const dur = flag("dur", "2");
const scale = flag("scale", "1");
const fmt = flag("format", "png");
const theme = flag("theme", process.env.VITE_THEME || "opencode");
const a = path.join(root, "out", `determinism-${theme}-a.txt`);
const b = path.join(root, "out", `determinism-${theme}-b.txt`);
const run = (file, order) =>
  execFileSync(
    "node",
    ["scripts/render.mjs", "--theme", theme, "--from", from, ...(dur === "end" ? [] : ["--dur", dur]), "--scale", scale, "--format", fmt, "--no-video", "--hash", file, "--order", order, "--workers", "1"],
    { cwd: root, stdio: ["ignore", "pipe", "inherit"] },
  ).toString();
console.log(run(a, "seq").trim().split("\n").pop());
console.log(run(b, "shuffle").trim().split("\n").pop());
const A = fs.readFileSync(a, "utf8").trim().split("\n");
const B = fs.readFileSync(b, "utf8").trim().split("\n");
const diff = A.filter((l, i) => l !== B[i]).map((l) => l.split(" ")[0]);
const uniq = new Set(A.map((l) => l.split(" ")[1])).size;
console.log(
  JSON.stringify({ theme, frames: A.length, distinctFrames: uniq, mismatches: diff.length, firstMismatch: diff.slice(0, 10), pass: diff.length === 0 && A.length === B.length }),
);
process.exit(diff.length === 0 ? 0 : 1);
