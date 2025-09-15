import { ArcGisEntry, Cuenca, Embalse, MetaDatos } from "./api/arcgis-embalse-model";

export const mapArgGisEntryToCuenca = (arcGisEntry: ArcGisEntry): Cuenca => ({
    _id: arcGisEntry.ambito_id.toString(),
    nombre: arcGisEntry.ambito_nombre,
});

export const mapArgGisEntryToEmbalse = (arcGisEntry: ArcGisEntry): Embalse => ({
    id: arcGisEntry.OBJECTID_1.toString(),
    embalse_id: arcGisEntry.EMBALSE_ID,
    nombre: arcGisEntry.ambito_nombre,
    cuenca: mapArgGisEntryToCuenca(arcGisEntry),
    provincia: null, // No disponible en ArcGisEntry
    capacidad: arcGisEntry.agua_total,
    aguaActualAemet: null, // No disponible en ArcGisEntry
    fechaMedidaAguaActualAemet: null, // No disponible en ArcGisEntry
    aguaActualSAIH: arcGisEntry.agua_actual.toString(),
    fechaMedidaAguaActualSAIH: new Date(arcGisEntry.fecha),
    descripcion_id: null, // No disponible en ArcGisEntry
    uso: arcGisEntry.Uso
});

export const mapArgGisEntryToMetaDatos = (arcGisEntry: ArcGisEntry): MetaDatos => ({
    _id: arcGisEntry.OBJECTID_1.toString(),
    ultimaImportacionAemet: new Date(arcGisEntry.fecha),
    ultimoStatus: "unknown", // No disponible en ArcGisEntry
    ultimasImportacionesSAIH: [
        {
            nombresitio: arcGisEntry.ambito_nombre,
            ultimaimportacion: new Date(arcGisEntry.fecha),
            ultimoStatus: "unknown" // No disponible en ArcGisEntry
        }
    ]
});
