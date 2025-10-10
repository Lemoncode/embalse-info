import childProcess from "child_process";
import { dbServer } from "#core/servers/db.server.js";
import { cuencasRepository } from "#dals/index.js";
import { scrapeSeedEmbalses } from "arcgis";

export const run = async () => {
  try {
    const { cuencas } = await scrapeSeedEmbalses();
    if (!cuencas || cuencas.length === 0) {
      console.log("No se encontraron cuencas para actualizar.");
      return;
    }
    await cuencasRepository.actualizarCuencas(cuencas);
    await dbServer.disconnect();
  } catch (error) {
    console.error(error);
  }
};

const runCommand = async (command: string) => {
  childProcess.execSync(command, { stdio: "inherit" });
};
