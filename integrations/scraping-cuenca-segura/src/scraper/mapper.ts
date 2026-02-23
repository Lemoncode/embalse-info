import { EmbalseUpdateSAIHEntity } from 'db-model';
import { EmbalsesSegura } from '../api/index.js';

// Province lookup for each reservoir
const reservoirProvince: Record<string, string> = {
  'Fuensanta': 'Albacete',
  'Talave': 'Albacete',
  'Camarillas': 'Albacete',
  'Cenajo': 'Albacete/Murcia',
  'La Pedrera': 'Alicante',
};

/**
 * Maps table row data to EmbalsesSegura array format.
 * @param cols - Array of column elements from the table row
 * @param dateCol - Date string from the row header
 * @param rowIndex - Index of the row for ID generation
 * @param capacityMap - Map of reservoir capacity data
 * @returns Array of EmbalsesSegura objects
 */
export function mapEmbalsesToEntities(
  cols: any[],
  dateCol: string,
  rowIndex: number,
  capacityMap: Record<string, { capacity: number; percentage: number }> = {}
): EmbalsesSegura[] {
  const reservoirNames = ['Fuensanta', 'Talave', 'Cenajo', 'Camarillas', 'La Pedrera'];
  const result: EmbalsesSegura[] = [];

  cols.forEach((col, i) => {
    if (i >= reservoirNames.length) return;

    const embalse = reservoirNames[i];
    const volumenActualHm3 = Number(col);
    const provincia = reservoirProvince[embalse];

    // Get capacity and calculate percentage
    const capacityData = capacityMap[embalse];
    const capacidadTotalHm3 = capacityData?.capacity || 0;
    const porcentajeActual = capacidadTotalHm3 > 0 ? (volumenActualHm3 / capacidadTotalHm3) * 100 : 0;

    // Create unique ID based on row and reservoir
    const id = (rowIndex * 10) + (i + 1);

    result.push({
      id,
      embalse,
      provincia,
      porcentajeActual: Math.round(porcentajeActual * 100) / 100,
      capacidadTotalHm3,
      volumenActualHm3,
      fecha: dateCol,
    });
  });

  return result;
}

/**
 * Maps EmbalsesSegura data to EmbalseUpdateSAIH format.
 * @param embalsesSegura - Array of EmbalsesSegura objects
 * @returns Array of EmbalseUpdateSAIH objects
 */
export function mapToEmbalseUpdateSAIH(
  embalsesSegura: EmbalsesSegura[]
): EmbalseUpdateSAIHEntity[] {
  return embalsesSegura.map((embalse) => ({
    id: embalse.id,
    nombre: embalse.embalse,
    aguaActualSAIH: Math.round(embalse.volumenActualHm3 * 100) / 100,
    fechaMedidaSAIH: embalse.fecha,
  }));
}
