import { scrapeSeedEmbalses } from "arcgis";
import { getEmbalsesContext } from "./embalses.context.js";
import { scrapeCuencaCantabrica } from "scraping-cuenca-cantabrico";

export const embalsesRepository = {
  actualizarEmbalses: async (): Promise<boolean> => {
    const { embalses } = await scrapeSeedEmbalses();
    const { ok } = await getEmbalsesContext().bulkWrite(
      embalses.map((embalse) => ({
        updateOne: {
          filter: { _id: embalse._id },
          update: { $set: embalse },
          upsert: true,
        },
      }))
    );

    return ok === 1;
  },
  actualizarCuencaCantabricoEmbalses: async (): Promise<boolean> => {
    const embalsesSAIH = await scrapeCuencaCantabrica();

    console.log(
      `Se han scrapeado ${embalsesSAIH.length} embalses de la cuenca Cantábrico`
    );

    let actualizados = 0;
    let noEncontrados = 0;

    for (const embalse of embalsesSAIH) {
      const nombreLimpio = embalse.nombre
        .replace(/^Embalse\s+de\s+/i, "")
        .replace(/^Embalse\s+/i, "")
        .trim();

      const nombreRegex = new RegExp(nombreLimpio, "i");

      console.log(`Buscando embalse: "${embalse.nombre}" -> "${nombreLimpio}"`);

      const { matchedCount } = await getEmbalsesContext().updateOne(
        { nombre: { $regex: nombreRegex } },
        {
          $set: {
            aguaActualSAIH: embalse.aguaActualSAIH,
            fechaMedidaAguaActualSAIH: new Date(embalse.fechaMedidaSAIH),
          },
        }
      );

      if (matchedCount > 0) {
        actualizados++;
        console.log(
          `Actualizado: ${embalse.nombre} -> ${embalse.aguaActualSAIH} hm³`
        );
      } else {
        noEncontrados++;
        console.warn(
          `No encontrado: ${embalse.nombre} (buscando: ${nombreLimpio})`
        );
      }
    }

    console.log(
      `Resumen: ${actualizados} actualizados, ${noEncontrados} no encontrados`
    );
    return true;
  },
};
