import { scrapeCuencaMinioSil } from "./integration.js";

console.log("Estado de la Cuenca Miño Sil:");
const result = await scrapeCuencaMinioSil();
console.log(result);
