import { scrapeSeedEmbalses } from "arcgis";
import { getEmbalsesContext } from "./embalses.context.js";
import { mapperFromCuencasMediterraneaToArcgis, mapperFromCuencasCantabricoToArcgis, mapperFromCuencasCatalanaToArcgis, mapperFromCuencasDueroToArcgis, mapperFromCuencasJucarToArcgis, mapperFromCuencasSeguraToArcgis } from "./embalses.mappers.js";
import { scrapeCuencaMediterranea } from "scraping-cuenca-mediterranea";
import { scrapeCuencaCantabrica } from 'scraping-cuenca-cantabrico';
import { integracionCuencaCatalana } from 'scraping-cuenca-catalana';
import { getEstadoCuencaDuero } from 'scraping-cuenca-duero';
// TODO: scraping-cuenca-guadalquivir uses playwright (browser automation) which is not
// available in Azure Functions. Needs rewrite to use axios/cheerio or similar.
// import { scrapeCuencaGuadalquivir } from 'scraping-cuenca-guadalquivir';
import { scrapeCuencaJucar } from 'scraping-cuenca-jucar';
import { scrapeCuencaSegura } from 'scraping-cuenca-segura';
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
    const embalsesCantabrico = await scrapeCuencaCantabrica();

    console.log(
      `Se han scrapeado ${embalsesCantabrico.length} embalses de la Cuenca Cantábrica`
    );

    let actualizados = 0;
    let noEncontrados = 0;
    let sinMapper = 0;

    for (const embalse of embalsesCantabrico) {
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
      `Resumen Cuenca Cantábrico: ${actualizados} actualizados, ${noEncontrados} no encontrados, ${sinMapper} sin mapper`
    );

    return actualizados > 0;
  },
  actualizarCuencaCatalana: async (): Promise<boolean> => {
    const embalsesCatalana = await integracionCuencaCatalana();

    console.log(
      `Se han scrapeado ${embalsesCatalana.length} embalses de la Cuenca Catalana`);

    let actualizados = 0;
    let noEncontrados = 0;
    let sinMapper = 0;

    for (const embalse of embalsesCatalana) {
      const infoDestino = mapperFromCuencasCatalanaToArcgis.get(embalse.id);

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
      `Resumen Cuenca Catalana: ${actualizados} actualizados, ${noEncontrados} no encontrados, ${sinMapper} sin mapper`
    );

    return actualizados > 0;
  },
  actualizarCuencaDuero: async (): Promise<boolean> => {
    const embalsesDuero = await getEstadoCuencaDuero();

    console.log(
      `Se han scrapeado ${embalsesDuero.length} embalses de la Cuenca Mediterránea`
    );

    let actualizados = 0;
    let noEncontrados = 0;
    let sinMapper = 0;

    for (const embalse of embalsesDuero) {
      const infoDestino = mapperFromCuencasDueroToArcgis.get(embalse.id);

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
      `Resumen Cuenca Duero: ${actualizados} actualizados, ${noEncontrados} no encontrados, ${sinMapper} sin mapper`
    );

    return actualizados > 0;
  },
  // TODO: Guadalquivir disabled — requires playwright (not available in Azure Functions)
  // Needs rewrite to use axios/cheerio or similar.
  actualizarCuencaGuadalquivir: async (): Promise<boolean> => {
    console.log('actualizarCuencaGuadalquivir: SKIPPED — requires playwright (not available in Azure Functions)');
    return false;
  },
  actualizarCuencaJucar: async (): Promise<boolean> => {
    const embalsesJucar = await scrapeCuencaJucar();

    console.log(
      `Se han scrapeado ${embalsesJucar.length} embalses de la Cuenca Jucar`
    );

    let actualizados = 0;
    let noEncontrados = 0;
    let sinMapper = 0;

    for (const embalse of embalsesJucar) {
      const infoDestino = mapperFromCuencasJucarToArcgis.get(embalse.id);

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

    return actualizados > 0;
  },
  actualizarCuencaSegura: async (): Promise<boolean> => {
    const embalsesSegura = await scrapeCuencaSegura();

    console.log(
      `Se han scrapeado ${embalsesSegura.length} embalses de la Cuenca Segura`
    );

    let actualizados = 0;
    let noEncontrados = 0;
    let sinMapper = 0;

    for (const embalse of embalsesSegura) {
      const infoDestino = mapperFromCuencasSeguraToArcgis.get(embalse.id);

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

    return actualizados > 0;
  }
};
