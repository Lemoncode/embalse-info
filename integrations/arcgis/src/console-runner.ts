import { scrapeSeedEmbalses } from "./integration";

// Imprime por terminal el resultado final
console.log("Datos cuenta Arcgis:");
const result = await scrapeSeedEmbalses();
console.log(JSON.stringify(result, null, 2));
console.log(result.length)