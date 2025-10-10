import { scrapeCuencaCantabrica } from "./integration.js";

// Imprime por terminal el resultado final
console.log("Estado de la Cuenca Cantábrica:");
const result = await scrapeCuencaCantabrica();
console.log(JSON.stringify(result, null, 2));
