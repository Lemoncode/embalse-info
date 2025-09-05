import { scrapeCuencaGuadalquivir } from "./integration";

const url = "https://www.chguadalquivir.es/saih/";

console.log("Estado de la Cuenca del Guadalquivir");
const result = await scrapeCuencaGuadalquivir(url);

console.log(JSON.stringify(result, null, 2));
