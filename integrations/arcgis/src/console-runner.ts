import { scrapeSeedEmbalses } from "./integration";

console.log("Starting ArcGis console runner...");
const result = await scrapeSeedEmbalses();
console.log(JSON.stringify(result, null, 2));
