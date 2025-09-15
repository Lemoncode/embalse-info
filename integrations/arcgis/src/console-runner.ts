import { scrapeSeedEmbalses } from "./integration";
import { mapArgGisEntryToEmbalse, mapArgGisEntryToCuenca, mapArgGisEntryToMetaDatos } from "./arcgis.mappers";
import type { Embalse, Cuenca, MetaDatos } from "./api/arcgis-embalse-model";

/*
// Imprime por terminal el resultado final
console.log("Datos cuenta Arcgis:");
const result = await scrapeSeedEmbalses();
console.log(JSON.stringify(result, null, 2));
console.log(result.length)*/

(async () => {
    const raw = await scrapeSeedEmbalses();

    const mappedEmbalse = raw
        .map(mapArgGisEntryToEmbalse)
        .filter((e): e is Embalse => e != null);

/*    const mappedCuenca = Array.from(
        new Set(
            raw
            .map(mapArgGisEntryToCuenca)
            .filter((e): e is Cuenca => e != null)
        )
    );*/

    const allCuencas = raw
        .map(mapArgGisEntryToCuenca)
        .filter((e): e is Cuenca => e != null);
    const uniqueCuencasMap = new Map(allCuencas.map(c => [c._id, c]));
    const mappedCuenca = Array.from(uniqueCuencasMap.values());

    /*const mappedCuenca = raw
    .map(mapArgGisEntryToCuenca)
    .filter((e): e is Cuenca => e != null);*/

    /*const mappedMetadato = raw
        .map(mapArgGisEntryToMetaDatos)
        .filter((e): e is MetaDatos => e != null);*/

    const allMetadatos = raw
        .map(mapArgGisEntryToMetaDatos)
        .filter((e): e is MetaDatos => e != null);

    // quedarnos con la más reciente
    const lastMeta = allMetadatos.reduce<MetaDatos | null>((acc, curr) => {
    if (!curr.ultimaImportacionAemet) return acc;
        const ts = curr.ultimaImportacionAemet;
    if (!acc) return curr;
        const accTs = acc.ultimaImportacionAemet ? acc.ultimaImportacionAemet : -Infinity;
        return ts > accTs ? curr : acc;
    }, null);


    console.log(JSON.stringify({
        embalses: mappedEmbalse,
        cuencas: mappedCuenca,
        metadato: lastMeta
    }, null, 2));
})();