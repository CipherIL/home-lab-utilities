import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, mkdirSync, existsSync, readdirSync, statSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) {
    return undefined;
  }
  return process.argv[index + 1];
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`${command} ${args.join(" ")} failed${detail ? `: ${detail}` : ""}`);
  }
  return result.stdout;
}

function unpack(archive, dest) {
  const zip = archive.endsWith(".zip");
  const unzip = zip ? spawnSync("unzip", ["-v"], { encoding: "utf8" }) : undefined;
  if (zip && unzip.status === 0) {
    const extracted = path.join(path.dirname(archive), "unpack");
    mkdirSync(extracted);
    run("unzip", ["-q", archive, "-d", extracted]);
    const entries = readdirSync(extracted);
    const only = entries.length === 1 ? path.join(extracted, entries[0]) : undefined;
    const source = only && statSync(only).isDirectory() ? only : extracted;
    cpSync(source, dest, { recursive: true });
    return;
  }
  run("tar", ["-xf", archive, "-C", dest, "--strip-components=1"]);
}

const into = path.resolve(root, arg("--into") ?? "public");
const catalog = JSON.parse(readFileSync(path.join(root, "lib", "utility", "utilities.json"), "utf8"));
const releases = catalog.utilities.filter((utility) => utility.release);

for (const utility of releases) {
  const release = utility.release;
  const viewed = JSON.parse(run("curl", [
    "-fsSL",
    "-H", "Accept: application/vnd.github+json",
    "-H", "User-Agent: home-lab-utilities",
    `https://api.github.com/repos/${release.repo}/releases/tags/${encodeURIComponent(release.tag)}`,
  ]));
  const assets = viewed.assets.filter((asset) =>
    asset.name.startsWith(release.assetPrefix) && asset.name.endsWith(release.assetSuffix)
  );
  if (assets.length !== 1) {
    const names = assets.map((asset) => asset.name).join(", ") || "none";
    throw new Error(`${release.repo} ${release.tag} matched ${assets.length} web zips: ${names}`);
  }

  const asset = assets[0];
  const staging = mkdtempSync(path.join(tmpdir(), "utils-web-"));
  const dest = path.join(into, utility.id);
  try {
    run("curl", [
      "-fL",
      "--retry", "3",
      "-H", "User-Agent: home-lab-utilities",
      "-o", path.join(staging, asset.name),
      asset.browser_download_url,
    ]);
    rmSync(dest, { recursive: true, force: true });
    mkdirSync(dest, { recursive: true });
    unpack(path.join(staging, asset.name), dest);
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }

  if (!existsSync(path.join(dest, "index.html"))) {
    throw new Error(`${dest} has no index.html after unpacking ${asset.name}`);
  }
  console.log(`${utility.id}: ${viewed.tag_name} ${asset.name} -> ${dest}`);
}
