import * as cheerio from "cheerio";
import { EmbalsesMinoSil } from '../api/index.js';
import { mapStringToApiDate } from './helpers.js';

export function parseEuropeanNumber(value: string): number {
  if (!value || value.trim() === "" || value === "*" || value === "n/d") {
    return NaN;
  }

  // Replace comma with dot for decimal separator
  const normalizedValue = value.replace(",", ".");
  return parseFloat(normalizedValue);
}

export function extractProvinceTables(
  $: cheerio.CheerioAPI
): EmbalsesMinoSil[] {

  const embalses: EmbalsesMinoSil[] = [];

  $("table.tabla tr").each((_index, row) => {
    const cells = $(row).find("td");
    if (cells.length === 0) return; // Skip header rows with <th>

    const nombre = $(cells[1]).text().trim();
    if (!nombre || !nombre.includes(" - ")) return; // Skip totals row
    const id = nombre.split(" - ")[0].trim().match(/^([A-Z])(\d+)$/)[2]; // Extract ID from name
    const capacidadTotal = $(cells[4]).text().trim();
    const fecha = $(cells[8]).text().trim();
    const volumenActual = $(cells[6]).text().trim();

    embalses.push({
      id: Number(id),
      embalse: nombre.split(" - ")[1].trim(),
      capacidadTotalHm3: parseEuropeanNumber(capacidadTotal),
      volumenActualHm3: parseEuropeanNumber(volumenActual),
      fecha: mapStringToApiDate(fecha)
    });
  });

  return embalses;
}
