import { scrapeCuencaTajo } from "./integration";

const url = "https://saihtajo.chtajo.es/#nav";

console.log("Estado de la Cuenca del Tajo:");
const result = await scrapeCuencaTajo(url);
console.log(JSON.stringify(result, null, 2));
