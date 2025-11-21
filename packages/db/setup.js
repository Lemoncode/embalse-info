import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoDataPath = path.resolve(__dirname, "mongo-data");
const envExamplePath = path.resolve(__dirname, ".env.example");
const envPath = path.resolve(__dirname, ".env");

try {
  // Create directory mongo-data
  if (!fs.existsSync(mongoDataPath)) {
    fs.mkdirSync(mongoDataPath, { recursive: true });
  }

  // Copy .env.example a .env
  if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
    }
  }
} catch (error) {
  process.exit(1);
}
