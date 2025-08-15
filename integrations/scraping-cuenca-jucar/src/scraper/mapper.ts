import { EmbalseUpdateSAIHEntity } from 'db-model';
import { EmbalsesJucar } from '@/api';
import { formatFechaComunicacionVol } from '@/scraper'

/**
 * Maps subCuencasArray to EmbalsesJucar array format.
 * @param subCuencasArray - Array of Embalses from Jucar basin
 * @returns Array of EmbalsesJucar objects
 */
export function mapEmbalsesToEntities(subCuencasArray: any[]): EmbalsesJucar[] {
  const reservoirs: EmbalsesJucar[] = [];
  subCuencasArray.forEach(([_, embalses]: [string, any[]]) => {
    embalses.forEach((embalse: any) => {
      const capacidadTotalHm3 = embalse.fldFVolumenNMN ?? 0;
      const volumenActualHm3 = embalse.valorVolumenEmbalse ?? 0;
      reservoirs.push({
        id: embalse.idEstacionRemota,
        embalse: embalse.fldTNombre,
        provincia: embalse.fldTProvincia,
        porcentajeActual: capacidadTotalHm3 > 0 ? (volumenActualHm3 / capacidadTotalHm3) * 100 : null,
        capacidadTotalHm3,
        volumenActualHm3,
        caudalRecibido: embalse.valorCaudalRecibido,
        caudalSalida: embalse.valorCaudalSalida,
        fecha: formatFechaComunicacionVol(embalse.fechaComunicacionVol),
      });
    });
  });
  return reservoirs;
}

/**
 * Maps EmbalsesJucar data to EmbalseUpdateSAIH format.
 * @param embalsesJucar - Array of EmbalsesJucar objects
 * @returns Array of EmbalseUpdateSAIH objects
 */
export function mapToEmbalseUpdateSAIH(
  embalsesJucar: EmbalsesJucar[]
): EmbalseUpdateSAIHEntity[] {
  return embalsesJucar.map((embalse) => ({
    id: embalse.id,
    nombre: embalse.embalse,
    aguaActualSAIH: embalse.volumenActualHm3,
    fechaMedidaSAIH: embalse.fecha,
  }));
}
