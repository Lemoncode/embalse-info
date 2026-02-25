import * as cheerio from "cheerio";
import { EmbalseUpdateSAIHEntity } from "db-model";
import { getCuencaPageHTMLContent } from "./api/index.js";
import { extractProvinceTables } from "./scraper/index.js";

export async function scrapeCuencaMediterranea(): Promise<void> {
  const html = await getCuencaPageHTMLContent();
  const $: cheerio.CheerioAPI = cheerio.load(html);
  const rawEmbalses = extractProvinceTables($);

  console.log("Embalses extraídos:", rawEmbalses);
}

// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
// });

// const browserHeaders = {
//   "User-Agent":
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
//   Accept:
//     "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//   "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
// };

// const BASE_URL =
//   "https://saih.chminosil.es/index.php?url=/datos/mapas/mapa:H1/area:HID/acc:1";
// const TARGET_URL =
//   "https://saih.chminosil.es/index.php?url=/datos/situacionEmbalses";

// export const getEstadoCuencaMinoSil = async (): Promise<void> => {
//   // Step 1: Visit base page to get session cookies (don't follow redirects)
//   const sessionResponse = await axios.get(BASE_URL, {
//     httpsAgent,
//     maxRedirects: 0,
//     headers: browserHeaders,
//     validateStatus: (status) => status >= 200 && status < 400,
//   });

//   const setCookieHeaders = sessionResponse.headers["set-cookie"];
//   const cookieString = setCookieHeaders
//     ? setCookieHeaders
//       .map((cookie: string) => cookie.split(";")[0])
//       .join("; ")
//     : "";

//   // Step 2: Fetch the target page with session cookies (follow redirects)
//   const { data: html } = await axios.get(TARGET_URL, {
//     httpsAgent,
//     maxRedirects: 10,
//     headers: {
//       ...browserHeaders,
//       Cookie: cookieString,
//       Referer: BASE_URL,
//     },
//   });

//   // Step 3: Parse HTML with Cheerio
//   const $ = cheerio.load(html);

//   // Step 4: Iterate table rows, skip headers
//   $("table.tabla tr").each((_index, row) => {
//     const cells = $(row).find("td");
//     if (cells.length === 0) return; // Skip header rows with <th>

//     const nombre = $(cells[1]).text().trim();
//     if (!nombre || !nombre.includes(" - ")) return; // Skip totals row
//     const capacidadTotal = $(cells[4]).text().trim();
//     const volumenActual = $(cells[6]).text().trim();

//     console.log(
//       `Embalse: ${nombre} | Capacidad Total: ${capacidadTotal} hm³ | Volumen Actual: ${volumenActual} hm³`
//     );
//   });
// };
