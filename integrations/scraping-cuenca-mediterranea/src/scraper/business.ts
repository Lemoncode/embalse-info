import type { EmbalsesAndalucia } from "../api/index.js";
import * as cheerio from "cheerio";
import { AnyNode } from "domhandler";

/**
 * Extracts the current date from the page.
 * @param $ - Cheerio instance
 * @returns The current date as a string
 */

export function extractCurrentDate($: cheerio.CheerioAPI): string {
  const dateElement = $("div.col-sm-6 > b");
  const regEx = /Datos actualizados a: /;
  const trimmedText = dateElement.text().replace(regEx, "").trim();
  return trimmedText.split(" ")[0].replace(/-/g, "/"); // Return only the date part with slashes
}

/**
 * Parses a number string with European format (comma as decimal separator).
 * @param value - The string value to parse
 * @returns The parsed number or NaN if invalid
 */
export function parseEuropeanNumber(value: string): number {
  if (!value || value.trim() === "" || value === "*" || value === "n/d") {
    return NaN;
  }

  // Replace comma with dot for decimal separator
  const normalizedValue = value.replace(",", ".");
  return parseFloat(normalizedValue);
}

/**
 * Extracts the text content from all cells (td) of a table row.
 * @param $row - Cheerio element representing a table row
 * @param $ - Cheerio instance to process elements
 * @returns Array of strings with the text content of each cell
 */
export function extractTableCellsText(
  $row: cheerio.Cheerio<AnyNode>,
  $: cheerio.CheerioAPI
): string[] {
  return $row
    .find("td")
    .map((_: any, el: any) => $(el).text().trim())
    .get();
}

/**
 * Extracts the province name from a header row.
 * @param $row - Cheerio element representing a table row
 * @returns The province name or null if it's not a header row
 */
export function extractProvinceFromRow(
  $row: cheerio.Cheerio<AnyNode>
): string | null {
  const provinceHeader = $row.find('th[colspan="2"]');
  const detectedProvince = provinceHeader.text().trim();

  // Verify that it's actually a province (not dates or other headers)
  if (
    detectedProvince &&
    !detectedProvince.includes("Fecha Actual") &&
    !detectedProvince.includes("TOTAL") &&
    !detectedProvince.includes("D.H.") &&
    detectedProvince !== "" &&
    detectedProvince !== "&nbsp"
  ) {
    return detectedProvince;
  }

  return null;
}

/**
 * Verifies if a row is a reservoir data row (has td cells).
 * @param $row - Cheerio element representing a table row
 * @returns true if it's a reservoir data row
 */
export function isReservoirDataRow($row: cheerio.Cheerio<AnyNode>): boolean {
  const cells = $row.find("td");
  return cells.length >= 10; // A reservoir row has at least 10 columns
}

/**
 * Extracts the province sections from the main table.
 * @param $ - Cheerio instance
 * @returns Array of objects with province and its data rows
 */
export function extractProvinceTables(
  $: cheerio.CheerioAPI
): Array<{ province: string; rows: cheerio.Cheerio<AnyNode>[] }> {
  const provinceTables: Array<{
    province: string;
    rows: cheerio.Cheerio<AnyNode>[];
  }> = [];
  let currentProvince = "";
  let currentRows: cheerio.Cheerio<AnyNode>[] = [];

  $("table tbody tr").each((_: any, row: any) => {
    const $row = $(row);

    // Try to extract province from the row
    const provincia = extractProvinceFromRow($row);
    if (provincia) {
      // If we already had a previous province, save its data
      if (currentProvince && currentRows.length > 0) {
        provinceTables.push({
          province: currentProvince,
          rows: [...currentRows],
        });
      }

      // Start new province
      currentProvince = provincia;
      currentRows = [];
      return;
    }

    // If it's a reservoir data row, add it to the current province
    if (isReservoirDataRow($row) && currentProvince) {
      currentRows.push($row);
    }
  });

  // Don't forget the last province
  if (currentProvince && currentRows.length > 0) {
    provinceTables.push({
      province: currentProvince,
      rows: [...currentRows],
    });
  }

  return provinceTables;
}

/**
 * Processes all reservoir rows from a specific province.
 * @param rows - Array of cheerio rows
 * @param province - Province name
 * @param $ - Cheerio instance
 * @returns Array of processed reservoirs
 */
export function reservoirInfoFromTable(
  rows: cheerio.Cheerio<AnyNode>[],
  province: string,
  $: cheerio.CheerioAPI
): EmbalsesAndalucia[] {
  const reservoirs: EmbalsesAndalucia[] = [];

  rows.forEach((row) => {
    const reservoir = processReservoirRow(row, $, province);
    if (reservoir) {
      reservoirs.push(reservoir);
    }
  });

  return reservoirs;
}

/**
 * Processes a reservoir data row and returns the EmbalsesAndalucia object.
 * @param $row - Cheerio element representing a table row
 * @param $ - Cheerio instance to process elements
 * @param provincia - Current province name
 * @returns The parsed reservoir or null if it couldn't be processed
 */
export function processReservoirRow(
  $row: cheerio.Cheerio<AnyNode>,
  $: cheerio.CheerioAPI,
  provincia: string
): EmbalsesAndalucia | null {
  const cols = extractTableCellsText($row, $);
  return parseReservoirRow(cols, provincia);
}

/**
 * Parses an HTML row from the reservoir table and returns an object with the data.
 */
export function parseReservoirRow(
  cols: string[],
  provincia: string
): EmbalsesAndalucia | null {
  if (cols.length < 10) return null;

  const [
    id,
    embalse,
    porcentajeActual,
    capacidadTotalHm3,
    acumuladoHoyMm,
    volumenActualHm3,
    acumuladoSemanaAnteriorMm,
    volumenSemanaAnteriorHm3,
    acumuladoAnioAnteriorMm,
    volumenAnioAnteriorHm3,
    grafico,
  ] = cols;

  return {
    id: parseInt(id, 10),
    embalse,
    provincia,
    porcentajeActual: parseEuropeanNumber(porcentajeActual),
    capacidadTotalHm3: parseEuropeanNumber(capacidadTotalHm3),
    acumuladoHoyMm: parseEuropeanNumber(acumuladoHoyMm),
    volumenActualHm3: parseEuropeanNumber(volumenActualHm3),
    acumuladoSemanaAnteriorMm: parseEuropeanNumber(acumuladoSemanaAnteriorMm),
    volumenSemanaAnteriorHm3: parseEuropeanNumber(volumenSemanaAnteriorHm3),
    acumuladoAnioAnteriorMm: parseEuropeanNumber(acumuladoAnioAnteriorMm),
    volumenAnioAnteriorHm3: parseEuropeanNumber(volumenAnioAnteriorHm3),
    grafico,
  };
}
