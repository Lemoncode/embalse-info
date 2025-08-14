import { EmbalseCatalanApi } from "./cuenca.api-model";
import { EmbalseCatalan } from "../cuenca.vm";

export function mapApiToEmbalses(
  apiData: Record<string, EmbalseCatalanApi>
): EmbalseCatalan[] {
  return Object.entries(apiData).map(([id, embalse]) => {
    const [lat, lon] = embalse.location.split(" ").map(Number);
    return {
      id,
      name: embalse.name,
      capacity: embalse.popup.capacity.value, // capacidad total
      volume: embalse.popup.volume.value, // volumen actual
      level: embalse.popup.level.value, // % llenado
      lat,
      lon,
      lastUpdate: embalse.time,
    };
  });
}
