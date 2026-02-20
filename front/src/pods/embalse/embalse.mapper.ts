//Este fichero transforma un documento Embalse (de BD) al view model ReservoirData (de UI).
/**
 * Decisiones del mapeo:
    currentVolume: prioriza el dato SAIH sobre el de Aemet (SAIH es mas frecuente). Si ambos son
    null, pone 0.
    measurementDate: mismo criterio de prioridad, formateado a DD/MM/YYYY.
    nombre: viene directamente del campo nombre del documento.
    Campos vacios: municipio, rio, tipoDePresa, etc. no estan en el modelo de BD actual, asi que
    van como string vacio / 0.
    formatDate: acepta tanto Date como string (MongoDB puede devolver ISO strings en vez de Date
    dependiendo de la serializacion)
 */

import type { Embalse } from "db-model";
import type { ReservoirData, ReservoirInfo } from "./embalse.vm";
import * as apiModel from "./api";

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function mapEmbalseToReservoirData(
  embalse: Embalse,
  embalseInfo: apiModel.ReservoirInfo | null | undefined,
): ReservoirData {
  const currentVolume = embalse.aguaActualSAIH ?? embalse.aguaActualAemet ?? 0;
  const measurementDate = formatDate(
    embalse.fechaMedidaAguaActualSAIH ?? embalse.fechaMedidaAguaActualAemet,
  );
  return {
    nombre: embalse.nombre,
    currentVolume,
    totalCapacity: embalse.capacidad,
    measurementDate,
    datosEmbalse: {
      cuenca: embalse.cuenca?.nombre ?? "",
      provincia: embalse.provincia ?? "",
      uso: embalse.uso ?? "",
    },
    reservoirInfo: embalseInfo
      ? mapReservoirInfoFromContentIslandToViewModel(embalseInfo)
      : undefined,
  };
}

const mapReservoirInfoFromContentIslandToViewModel = (
  embalseInfo: apiModel.ReservoirInfo,
): ReservoirInfo => ({
  id: embalseInfo.id,
  lastUpdate: embalseInfo.lastUpdate,
  name: embalseInfo.name,
  mainPicture: embalseInfo.mainPicture,
  author: embalseInfo.author ?? "",
  authorUrl: embalseInfo.authorUrl ?? "",
  description: embalseInfo.description ?? "",
});
