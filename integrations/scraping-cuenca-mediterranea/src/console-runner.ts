import { scrapeCuencaMediterranea } from "./integration.js";

console.log("Estado de la Cuenca Mediterránea:");
const scrappingCuencaMediterranea = await scrapeCuencaMediterranea();
console.log(JSON.stringify(scrappingCuencaMediterranea, null, 2));
