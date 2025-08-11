import { getEstadoCuencaGuadalquivir } from "./integration";

console.log("Estado de la Cuenca del Guadalquivir");
const result = await getEstadoCuencaGuadalquivir();

console.log(JSON.stringify(result, null, 2));
