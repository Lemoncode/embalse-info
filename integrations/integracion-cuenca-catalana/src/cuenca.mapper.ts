import { EmbalseCatalanApi } from './api/cuenca.api-model';
import { EmbalseUpdateSAIHEntity } from 'db-model';
import { formatApiDate } from './business';

export function mapApiToEmbalses(
  apiData: Record<string, EmbalseCatalanApi>
): EmbalseUpdateSAIHEntity[] {
  return Object.entries(apiData).map(([id, embalse]) => {
    return {
      id: Number(id.replace('-', '')),
      nombre: embalse.name,
      aguaActualSAIH: embalse.popup.volume.value, // volumen actual
      fechaMedidaSAIH: formatApiDate(embalse.popup.volume.time), // fecha de la medida
    };
  });
}
