import { existsSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const envLocalPath = resolve(rootDir, ".env.local");
const envExamplePath = resolve(rootDir, ".env.local.example");

if (!existsSync(envLocalPath)) {
  copyFileSync(envExamplePath, envLocalPath);
  console.log(".env.local created from .env.local.example");
} else {
  console.log(".env.local already exists, skipping copy");
}
