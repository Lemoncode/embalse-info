import { getEstadoCuencaMinoSil } from "./integration";

console.log("Estado de la Cuenca Miño Sil:");
const result = await getEstadoCuencaMinoSil();
console.log(JSON.stringify(result, null, 2));
