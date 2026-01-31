import type { Embalse } from "db-model";
import type { ReservoirData } from "./embalse.vm";

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function mapEmbalseToReservoirData(embalse: Embalse): ReservoirData {
  const currentVolume =
    embalse.aguaActualSAIH ?? embalse.aguaActualAemet ?? 0;

  const measurementDate = formatDate(
    embalse.fechaMedidaAguaActualSAIH ?? embalse.fechaMedidaAguaActualAemet
  );

  return {
    nombre: embalse.nombre,
    currentVolume,
    totalCapacity: embalse.capacidad,
    measurementDate,
    datosEmbalse: {
      cuenca: embalse.cuenca?.nombre ?? "",
      provincia: embalse.provincia ?? "",
      municipio: "",
      rio: "",
      embalsesAguasAbajo: 0,
      tipoDePresa: "",
      anioConstruccion: 0,
      superficie: 0,
      localizacion: "",
    },
    reservoirInfo: {
      Description: "",
    },
  };
}
