import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Simple sync script to copy keys from .env.example to .env without overwriting existing values
function syncEnv() {
  const rootDir = join(__dirname, "..");
  const examplePath = join(rootDir, ".env.example");
  const envPath = join(rootDir, ".env");

  if (!existsSync(examplePath)) {
    console.error("❌ .env.example does not exist.");
    return;
  }

  const exampleLines = readFileSync(examplePath, "utf-8").split("\n");
  let envContent = "";
  if (existsSync(envPath)) {
    envContent = readFileSync(envPath, "utf-8");
  }

  const envLines = envContent.split("\n");
  const envKeys = new Set(
    envLines
      .filter((line) => line.includes("=") && !line.startsWith("#"))
      .map((line) => line.split("=")[0].trim())
  );

  const newLines: string[] = [];

  for (const line of exampleLines) {
    if (line.includes("=") && !line.startsWith("#")) {
      const key = line.split("=")[0].trim();
      if (!envKeys.has(key)) {
        newLines.push(line);
      }
    } else if (line.trim() === "" || line.startsWith("#")) {
      // Just keep formatting or comments
    }
  }

  if (newLines.length > 0) {
    const appendText = (envContent.endsWith("\n") ? "" : "\n") + newLines.join("\n") + "\n";
    writeFileSync(envPath, envContent + appendText);
    console.log(`✅ Synced env keys: ${newLines.map((l) => l.split("=")[0]).join(", ")}`);
  } else {
    console.log("ℹ️ .env is already in sync with .env.example");
  }
}

syncEnv();
