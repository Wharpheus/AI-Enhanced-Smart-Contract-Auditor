import { spawnSync } from "child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";

// Enhanced logging and error handling for build pipeline integration

type RunOptions = { cwd?: string };

function runScript(cmd: string, args: string[] = [], opts: RunOptions = {}) {
  console.log(`▶ Running: ${cmd} ${args.join(" ")}${opts.cwd ? ` (cwd: ${opts.cwd})` : ""}`);
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true, ...opts });
  if (result.status !== 0) {
    throw new Error(`Script failed: ${cmd} ${args.join(" ")}${opts.cwd ? ` (cwd: ${opts.cwd})` : ""}`);
  }
}

function copyDir(src: string, dest: string) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

function verifyDirExists(dir: string, description: string) {
  if (!existsSync(dir)) {
    throw new Error(`Expected directory missing: ${description} (${dir})`);
  }
}

function main() {
  try {
    // 1. Run all build/validation scripts (including pinned items)
    console.log("🔹 Step 1: Running build/validation scripts...");
    const scripts = [
      "buildAgentsFromRuntimes.mjs",
      "build-proto.mjs",
      "validateAgents.mjs",
      "build-tests.js",
      "extractMindmaps.js",
      "generateMissingStubs.js"
    ];
    for (const script of scripts) {
      console.log(`  ➤ Executing script: ${script}`);
      const ext = script.endsWith(".mjs") ? "node" : "node";
      try {
        runScript(ext, [join("scripts", script)]);
        console.log(`    ✔ Success: ${script}`);
      } catch (err) {
        console.error(`    ❌ Error in script: ${script}`);
        throw err;
      }
    }
    console.log("✅ All build/validation scripts completed.");

    // 2. Copy runtime files to frontend build context
    console.log("🔹 Step 2: Copying runtime files...");
    const srcRuntime = join("standalone", "runtime-files");
    const destRuntime = join("frontend", "runtime-files");
    copyDir(srcRuntime, destRuntime);
    verifyDirExists(destRuntime, "Frontend runtime files");
    console.log("✅ Runtime files copied.");

    // 3. Build Next.js frontend
    console.log("🔹 Step 3: Building Next.js frontend...");
    const frontendDir = join(process.cwd(), "frontend");
    try {
      runScript("npm", ["install"], { cwd: frontendDir });
      runScript("npm", ["run", "build"], { cwd: frontendDir });
      verifyDirExists(join(frontendDir, ".next"), "Next.js build output");
      console.log("✅ Next.js frontend build complete.");
    } catch (err) {
      console.error("❌ Error during frontend build.");
      throw err;
    }

    // 4. Build Docker image
    console.log("🔹 Step 4: Building Docker image...");
    try {
      runScript("docker", [
        "build",
        "-f",
        "Dockerfile.frontend",
        "-t",
        "clinemap-frontend",
        "."
      ]);
      console.log("✅ Docker image built: clinemap-frontend");
    } catch (err) {
      console.error("❌ Error during Docker image build.");
      throw err;
    }

    console.log("🎉 Integration pipeline completed successfully!");
  } catch (err) {
    console.error("❌ Build pipeline failed:", err);
    process.exit(1);
  }
}

main();