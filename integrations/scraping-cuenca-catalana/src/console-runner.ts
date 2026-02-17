import { integracionCuencaCatalana } from "./integrations.js";

console.log("Estados de las Cuencas Catalanas:");
const result = await integracionCuencaCatalana();
console.log(JSON.stringify(result, null, 2));
