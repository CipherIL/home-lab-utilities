import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const repo = "CipherIL/home-lab-utilities";

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index + 1 >= process.argv.length) {
    return undefined;
  }
  return process.argv[index + 1];
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, { encoding: "utf8", cwd });
  if (result.error) {
    throw new Error(`${command} failed to start: ${result.error.message}`);
  }
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`${command} ${args.join(" ")} failed${detail ? `: ${detail}` : ""}`);
  }
  return result.stdout;
}

const rootArg = arg("--root");
if (!rootArg) {
  throw new Error("Pass --root <directory>. The script updates that directory and does not touch the checkout you started it from.");
}

const root = path.resolve(rootArg);
const src = path.join(root, "src");
const utilities = path.join(root, "utilities");
mkdirSync(root, { recursive: true });

if (!existsSync(path.join(src, ".git"))) {
  run("gh", ["repo", "clone", repo, src, "--", "--branch", "main"]);
} else {
  run("git", ["fetch", "origin", "main"], src);
  run("git", ["checkout", "main"], src);
  run("git", ["reset", "--hard", "origin/main"], src);
}

const pnpmOnPath = spawnSync("pnpm", ["--version"], { encoding: "utf8" }).status === 0;
function pnpm(args) {
  if (pnpmOnPath) {
    run("pnpm", args, src);
    return;
  }
  run("corepack", ["pnpm", ...args], src);
}

pnpm(["install", "--frozen-lockfile"]);
pnpm(["build"]);
pnpm(["fetch-utilities", "--", "--into", utilities]);

console.log(`Index: ${path.join(src, "out")}`);
console.log(`Utilities: ${utilities}`);
console.log("Serve the index directory at / and each utilities/<id> directory at /<id>/.");
