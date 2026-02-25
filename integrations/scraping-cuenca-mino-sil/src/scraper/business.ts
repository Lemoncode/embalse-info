import * as cheerio from "cheerio";
import { EmbalsesMinoSil } from '../api/index.js';

export function extractProvinceTables(
  $: cheerio.CheerioAPI
): EmbalsesMinoSil[] {

  const embalses: EmbalsesMinoSil[] = [];

  $("table.tabla tr").each((_index, row) => {
    const cells = $(row).find("td");
    if (cells.length === 0) return; // Skip header rows with <th>

    const nombre = $(cells[1]).text().trim();
    if (!nombre || !nombre.includes(" - ")) return; // Skip totals row
    const id = nombre.split(" - ")[0].trim();
    const capacidadTotal = $(cells[4]).text().trim();
    const fecha = $(cells[0]).text().trim();
    const volumenActual = $(cells[6]).text().trim();

    embalses.push({
      id: Number(id),
      embalse: nombre,
      capacidadTotalHm3: Number(capacidadTotal),
      volumenActualHm3: Number(volumenActual),
      fecha: fecha
    });
  });

  return embalses;
}
