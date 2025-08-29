import { EmbalseCatalanApi } from './cuenca.api-model';
import { EmbalseUpdateSAIHEntity } from 'db-model';

export function mapApiToEmbalses(
  apiData: Record<string, EmbalseCatalanApi>
): EmbalseUpdateSAIHEntity[] {
  return Object.entries(apiData).map(([id, embalse]) => {
    return {
      id: Number(id.replace('-', '')),
      nombre: embalse.name,
      aguaActualSAIH: embalse.popup.volume.value, // volumen actual
      fechaMedidaSAIH: new Date(embalse.popup.volume.time).toISOString(), // fecha de la medida
    };
  });
}
