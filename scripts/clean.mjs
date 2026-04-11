// @file: scripts/clean.mjs
import { readdir, rm, lstat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT_DIR = process.cwd();
const GLOBAL_TARGETS = new Set(["node_modules", "dist", ".next"]);
const GENERATED_DIR_NAME = "generated";
const SKIP_DIRS = new Set([".git"]);
const DRY_RUN = process.argv.includes("--dry-run");

const targetsToDelete = [];
const deletedPaths = [];
const skippedPaths = [];
const failedPaths = [];

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function supportsColor() {
  if (process.env.NO_COLOR) return false;
  if (process.env.FORCE_COLOR && process.env.FORCE_COLOR !== "0") return true;
  return Boolean(process.stdout.isTTY);
}

const COLOR = supportsColor();
const ansi = {
  reset: COLOR ? "\x1b[0m" : "",
  red: COLOR ? "\x1b[31m" : "",
  green: COLOR ? "\x1b[32m" : "",
  yellow: COLOR ? "\x1b[33m" : "",
  cyan: COLOR ? "\x1b[36m" : "",
  gray: COLOR ? "\x1b[90m" : "",
  bold: COLOR ? "\x1b[1m" : "",
};

function paint(value, color) {
  return `${ansi[color]}${value}${ansi.reset}`;
}

function info(message) {
  console.log(`${paint("[info]", "cyan")} ${message}`);
}

function ok(message) {
  console.log(`${paint("[ok]", "green")} ${message}`);
}

function warn(message) {
  console.log(`${paint("[warn]", "yellow")} ${message}`);
}

function err(message) {
  console.log(`${paint("[error]", "red")} ${message}`);
}

async function removeDirectory(dirPath) {
  const relativePath = toPosix(path.relative(ROOT_DIR, dirPath));

  if (DRY_RUN) {
    skippedPaths.push(relativePath);
    return;
  }

  try {
    await rm(dirPath, { recursive: true, force: true });
    deletedPaths.push(relativePath);
  } catch (error) {
    failedPaths.push({
      path: relativePath,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

function shouldDeleteDirectory(name, relativePathPosix) {
  if (GLOBAL_TARGETS.has(name)) {
    return true;
  }

  if (name === GENERATED_DIR_NAME) {
    return relativePathPosix.startsWith("packages/");
  }

  return false;
}

async function walkDirectory(currentDirPath) {
  let entries;
  try {
    entries = await readdir(currentDirPath, { withFileTypes: true });
  } catch (error) {
    failedPaths.push({
      path: toPosix(path.relative(ROOT_DIR, currentDirPath)),
      message: error instanceof Error ? error.message : String(error),
    });
    return;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const fullPath = path.join(currentDirPath, entry.name);
    const relativePathPosix = toPosix(path.relative(ROOT_DIR, fullPath));

    if (SKIP_DIRS.has(entry.name)) {
      continue;
    }

    let stats;
    try {
      stats = await lstat(fullPath);
    } catch (error) {
      failedPaths.push({
        path: relativePathPosix,
        message: error instanceof Error ? error.message : String(error),
      });
      continue;
    }

    if (stats.isSymbolicLink()) {
      continue;
    }

    if (shouldDeleteDirectory(entry.name, relativePathPosix)) {
      targetsToDelete.push(fullPath);
      continue;
    }

    await walkDirectory(fullPath);
  }
}

async function main() {
  info(`Scanning workspace: ${toPosix(ROOT_DIR)}`);
  await walkDirectory(ROOT_DIR);

  const totalTargets = targetsToDelete.length;
  info(`Found ${paint(String(totalTargets), "bold")} folder(s) matching clean rules.`);

  if (totalTargets === 0) {
    ok("Nothing to clean.");
    return;
  }

  if (DRY_RUN) {
    warn("Dry run mode enabled. No folders will be deleted.");
  } else {
    info("Starting deletion...");
  }

  for (const targetPath of targetsToDelete) {
    const relativePath = toPosix(path.relative(ROOT_DIR, targetPath));
    info(`${DRY_RUN ? "Would delete" : "Deleting"} ${paint(relativePath, "gray")}`);
    await removeDirectory(targetPath);
  }

  if (DRY_RUN) {
    ok(`Dry run complete. ${skippedPaths.length} folder(s) marked for deletion.`);
  } else if (deletedPaths.length > 0) {
    ok(`Deleted ${deletedPaths.length} folder(s).`);
  }

  const summaryLine = [
    `targets=${totalTargets}`,
    `deleted=${deletedPaths.length}`,
    `failed=${failedPaths.length}`,
    `dryRun=${DRY_RUN ? "yes" : "no"}`,
  ].join(", ");
  info(`Summary: ${summaryLine}`);

  if (!DRY_RUN && deletedPaths.length > 0) {
    console.log("");
    info("Deleted folders:");
    for (const deletedPath of deletedPaths.sort()) {
      console.log(`- ${deletedPath}`);
    }
  }

  if (failedPaths.length > 0) {
    console.log("");
    err(`Failures (${failedPaths.length}):`);
    for (const failure of failedPaths) {
      console.log(`- ${failure.path}: ${failure.message}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
