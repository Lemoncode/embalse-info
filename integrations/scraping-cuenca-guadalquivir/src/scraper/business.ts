import { EmbalsesGuadalquivir } from "@/api";
import * as cheerio from "cheerio";
import { AnyNode } from "domhandler";

/**
 * Locates the "ESTADO DE EMBALSES" table.
 * @param $ - Cheerio instance
 * @returns Returns the cheerio selection for the table
 */

function findEstadoEmbalsesTable($: cheerio.CheerioAPI) {
  const tableById = $("#ContentPlaceHolder1_GridNivelesEmbalses");
  if (tableById.length) return tableById;
}

/**
 * Extracts the current date from the page.
 * @param $ - Cheerio instance
 * @returns The current date as a string
 */

export function extractCurrentDate($: cheerio.CheerioAPI): string {
  const dateElement = $("#DatosActualizadosTimer1_Lbltime");
  const regEx = /Actualizados: /;
  const trimmedText = dateElement.text().replace(regEx, "").trim();
  return trimmedText.split(" ")[0].replace(/-/g, "/");
}

/**
 * Parses a number string with European format (comma as decimal separator).
 * @param value - The string value to parse
 * @returns The parsed number or NaN if invalid
 */

function parseEuropeanNumber(value: string): number {
  if (!value || value.trim() === "" || value === "*" || value === "n/d") {
    return NaN;
  }

  // Replace comma with dot for decimal separator
  const normalizedValue = value.replace(",", ".");
  return parseFloat(normalizedValue);
}

/**
 * Returns the trimmed text content of all <td> cells in a row.
 * @param $row - Cheerio element representing the table row (<tr>)
 * @param $ - Cheerio instance to access DOM APIs
 * @returns Array of strings with each cell's text, in column order
 */

function extractTableCellsText(
  $row: cheerio.Cheerio<AnyNode>,
  $: cheerio.CheerioAPI
): string[] {
  return $row
    .find("td")
    .map((_: any, td: any) => $(td).text().trim())
    .get();
}

/**
 * Checks whether a row is a real reservoir data row.
 * A valid data row must contain exactly 6 <td> cells.
 * @param $row - Cheerio element representing the table row (<tr>)
 * @returns true if the row has 6 data cells; false otherwise
 */

function isReservoirDataRow($row: cheerio.Cheerio<AnyNode>): boolean {
  return $row.find("td").length === 6;
}

/**
 * Parses the first column ("Embalse") to extract id, reservoir name, and province code.
 * Example input: "E01 El Tranco de Beas (JA)"
 * @param text - Raw text from the first table cell
 * @returns Object with numeric id, reservoir name, and province code (e.g., "JA")
 */

function parseEmbalseCell(text: string): {
  id: number;
  embalse: string;
  provincia: string;
} {
  const t = text.trim();
  const m = t.match(/^([A-Za-z]+)?(\d+)\s+(.+?)\s+\(([A-Z]{2})\)$/);
  return m
    ? { id: parseInt(m[2], 10), embalse: m[3], provincia: m[4] }
    : { id: NaN, embalse: t, provincia: "" };
}

/**
 * Maps a 6-column row into the EmbalsesGuadalquivir model.
 * Expected columns (index → meaning):
 * 0 → "Embalse" (contains code, name, province)
 * 1 → NMN (m.s.n.m.)
 * 2 → Nivel (m.s.n.m.)
 * 3 → Capacidad (hm³)
 * 4 → Volumen (hm³)
 * 5 → Porcentaje (%)
 * @param cols - Array of 6 strings with the row cell texts
 * @returns Parsed EmbalsesGuadalquivir object, or null if the row shape is invalid
 */

function parseReservoirRow(cols: string[]): EmbalsesGuadalquivir | null {
  if (cols.length !== 6) return null;

  const { id, embalse, provincia } = parseEmbalseCell(cols[0]);
  return {
    id,
    embalse,
    provincia,
    nmnMsnm: parseEuropeanNumber(cols[1]),
    nivelActualMsnm: parseEuropeanNumber(cols[2]),
    capacidadActualHm3: parseEuropeanNumber(cols[3]),
    volumenActualHm3: parseEuropeanNumber(cols[4]),
    porcentajeActual: parseEuropeanNumber(cols[5]),
  };
}

/**
 * Parses the visible "Estado de embalses" table and returns all reservoir entries.
 * Flow:
 * - Locate the target table
 * - Iterate <tbody> rows and keep only rows with 6 data cells
 * - Extract cell texts and map each row into the domain model
 * @param $ - Cheerio instance loaded with the page's HTML
 * @returns Array of EmbalsesGuadalquivir entries for the current page/zone
 */

export function reservoirInfoFromTable(
  $: cheerio.CheerioAPI
): EmbalsesGuadalquivir[] {
  const table = findEstadoEmbalsesTable($);
  if (!table || table.length === 0) return [];

  const rows = table
    .find("tbody tr")
    .filter((_, tr) => isReservoirDataRow($(tr)));
  const reservoirs: EmbalsesGuadalquivir[] = [];

  rows.each((_, tr) => {
    const cols = extractTableCellsText($(tr), $);
    const parsed = parseReservoirRow(cols);
    if (parsed) reservoirs.push(parsed);
  });

  return reservoirs;
}
