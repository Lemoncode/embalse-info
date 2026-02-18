import { scrapeCuencaGuadalquivir } from "./integration.js";

console.log("Estado de la Cuenca del Guadalquivir");
const result = await scrapeCuencaGuadalquivir();

console.log(JSON.stringify(result, null, 2));
