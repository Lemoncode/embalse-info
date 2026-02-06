import { scrapeSeedEmbalses } from "arcgis";
import { getEmbalsesContext } from "./embalses.context.js";
import { mapperFromCuencasMediterraneaToArcgis, mapperFromCuencasCantabricoToArcgis } from "./embalses.mappers.js";
import { scrapeCuencaMediterranea } from "scraping-cuenca-mediterranea";
import { scrapeCuencaCantabrica } from 'scraping-cuenca-cantabrico';
import { parseDate } from "./embalses.helpers.js";

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
  actualizarCuencaMediterranea: async (): Promise<boolean> => {
    const embalsesMediterranea = await scrapeCuencaMediterranea();

    console.log(
      `Se han scrapeado ${embalsesMediterranea.length} embalses de la Cuenca Mediterránea`
    );

    let actualizados = 0;
    let noEncontrados = 0;
    let sinMapper = 0;

    for (const embalse of embalsesMediterranea) {
      const infoDestino = mapperFromCuencasMediterraneaToArcgis.get(embalse.id);

      if (!infoDestino) {
        sinMapper++;
        console.warn(`Sin mapper para ID ${embalse.id} - ${embalse.nombre}`);
        continue;
      }

      console.log(
        `🔍 Mapeando: ID scraping ${embalse.id} -> _id BD ${infoDestino.idArcgis} (${infoDestino.nombre})`
      );

      const { matchedCount } = await getEmbalsesContext().updateOne(
        { _id: infoDestino.idArcgis.toString() },
        {
          $set: {
            aguaActualSAIH: embalse.aguaActualSAIH,
            fechaMedidaAguaActualSAIH: parseDate(embalse.fechaMedidaSAIH),
          },
        }
      );

      if (matchedCount > 0) {
        actualizados++;
        console.log(
          `Actualizado: ${infoDestino.nombre} (_id: ${infoDestino.idArcgis}) -> ${embalse.aguaActualSAIH} hm³`
        );
      } else {
        noEncontrados++;
        console.warn(
          `No encontrado en BD: _id ${infoDestino.idArcgis} - ${infoDestino.nombre}`
        );
      }
    }

    console.log(
      `Resumen Cuenca Mediterránea: ${actualizados} actualizados, ${noEncontrados} no encontrados, ${sinMapper} sin mapper`
    );

    return actualizados > 0;
  },
  actualizarCuencaCantabrico: async (): Promise<boolean> => {
    const embalsesCantabrica = await scrapeCuencaCantabrica();

    console.log(
      `Se han scrapeado ${embalsesCantabrica.length} embalses de la Cuenca Cantábrica`
    );

    let actualizados = 0;
    let noEncontrados = 0;
    let sinMapper = 0;

    for (const embalse of embalsesCantabrica) {
      const infoDestino = mapperFromCuencasCantabricoToArcgis.get(embalse.id);

      if (!infoDestino) {
        sinMapper++;
        console.warn(`Sin mapper para ID ${embalse.id} - ${embalse.nombre}`);
        continue;
      }

      console.log(
        `🔍 Mapeando: ID scraping ${embalse.id} -> _id BD ${infoDestino.idArcgis} (${infoDestino.nombre})`
      );

      const { matchedCount } = await getEmbalsesContext().updateOne(
        { _id: infoDestino.idArcgis.toString() },
        {
          $set: {
            aguaActualSAIH: embalse.aguaActualSAIH,
            fechaMedidaAguaActualSAIH: parseDate(embalse.fechaMedidaSAIH),
          },
        }
      );

      if (matchedCount > 0) {
        actualizados++;
        console.log(
          `Actualizado: ${infoDestino.nombre} (_id: ${infoDestino.idArcgis}) -> ${embalse.aguaActualSAIH} hm³`
        );
      } else {
        noEncontrados++;
        console.warn(
          `No encontrado en BD: _id ${infoDestino.idArcgis} - ${infoDestino.nombre}`
        );
      }
    }

    console.log(
      `Resumen Cuenca Mediterránea: ${actualizados} actualizados, ${noEncontrados} no encontrados, ${sinMapper} sin mapper`
    );

    return actualizados > 0;
  }
};
