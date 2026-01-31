import { Cuenca, Embalse, generateSlug, MetaDatos } from "db-model";
import { ArcGisEntry } from "./api/arcgis-embalse-model.js";
import { embalseProvincias } from "./embalse-provincias.js";

export const mapArgGisEntryToCuenca = (arcGisEntry: ArcGisEntry): Cuenca => ({
  _id: arcGisEntry.ambito_id.toString(),
  nombre: arcGisEntry.ambito_nombre,
});

export const mapArgGisEntryToEmbalse = (arcGisEntry: ArcGisEntry): Embalse => {
  const slug = generateSlug(arcGisEntry.embalse_nombre);
  return {
    _id: arcGisEntry.embalse_id_1.toString(),
    embalse_id: arcGisEntry.EMBALSE_ID,
    nombre: arcGisEntry.embalse_nombre,
    slug,
    cuenca: mapArgGisEntryToCuenca(arcGisEntry),
    provincia: embalseProvincias.get(slug) ?? null,
    capacidad: arcGisEntry.agua_total,
    aguaActualAemet: arcGisEntry.agua_actual,
    fechaMedidaAguaActualAemet: new Date(arcGisEntry.fecha),
    aguaActualSAIH: null,
    fechaMedidaAguaActualSAIH: null,
    descripcion_id: null, // No disponible en ArcGisEntry
    uso: arcGisEntry.Uso,
  };
};

export const mapArgGisEntryToMetaDatos = (
  arcGisEntry: ArcGisEntry
): MetaDatos => ({
  _id: arcGisEntry.OBJECTID_1.toString(),
  ultimaImportacionAemet: new Date(arcGisEntry.fecha),
  ultimoStatus: "unknown", // No disponible en ArcGisEntry
  ultimasImportacionesSAIH: [
    {
      nombresitio: arcGisEntry.ambito_nombre,
      ultimaimportacion: new Date(arcGisEntry.fecha),
      ultimoStatus: "unknown", // No disponible en ArcGisEntry
    },
  ],
});
