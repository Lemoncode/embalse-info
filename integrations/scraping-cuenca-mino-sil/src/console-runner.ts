import * as cheerio from "cheerio";
import { scrapeCuencaMinoSil } from "./integration.js";

console.log("Caudal Río - Cuenca Miño Sil:");
const caudales = await scrapeCuencaMinoSil();
console.log(JSON.stringify(caudales, null, 2));
