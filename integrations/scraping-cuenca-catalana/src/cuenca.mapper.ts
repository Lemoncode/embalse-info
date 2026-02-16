import { EmbalseCatalanApi } from './api/cuenca.api-model.js';
import { EmbalseUpdateSAIHEntity } from 'db-model';
import { formatApiDate, formatVolumeToFixedTwo } from './business.js';

export function mapApiToEmbalses(
  apiData: Record<string, EmbalseCatalanApi>
): EmbalseUpdateSAIHEntity[] {
  return Object.entries(apiData).map(([id, embalse]) => {
    return {
      id: Number(id.replace('-', '')),
      nombre: embalse.name,
      aguaActualSAIH: formatVolumeToFixedTwo(embalse.popup.volume.value), // volumen actual
      fechaMedidaSAIH: formatApiDate(embalse.popup.volume.time), // fecha de la medida
    };
  });
}
