import fs from "node:fs/promises";
import path from "node:path";
import { GetCantabricoDataUseCase } from "../application/GetCantabricoDataUseCase.js";
import { SaichRepository } from "../infrastructure/SaichRepository.js";
import { SaichHttpClient } from "../infrastructure/SaichHttpClient.js";

const onlyEmbalses = process.argv.includes("--solo-embalses");
const outDir = process.argv.find(a => a.startsWith("--out-dir="))?.split("=")[1] ?? "./out";
const pretty = process.argv.includes("--pretty");

async function main() {
  const useCase = new GetCantabricoDataUseCase(new SaichRepository(new SaichHttpClient()));
  const snapshot = await useCase.execute({ onlyEmbalses });
  await fs.mkdir(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(outDir, `cantabrico_${onlyEmbalses ? "embalses_" : ""}${stamp}.json`);
  await fs.writeFile(file, JSON.stringify(snapshot, null, pretty ? 2 : 0), "utf8");
  console.log(`Saved: ${file}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
