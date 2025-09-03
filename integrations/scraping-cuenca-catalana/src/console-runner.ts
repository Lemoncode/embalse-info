import { integracionCuencaCatalana } from "./integrations";
import { URL } from "./integrations";

console.log("Estados de las Cuencas Catalanas:");
const result = await integracionCuencaCatalana(URL);
console.log(JSON.stringify(result, null, 2));
