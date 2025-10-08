import { scrapeCuencaGuadiana } from "./integration";

const URL = "https://siraguadiana.com/backend/Visor/resourceByID";
console.log("Estado de la Cuenca del Guadiana:");
const result = await scrapeCuencaGuadiana(URL);
console.log(JSON.stringify(result, null, 2));
