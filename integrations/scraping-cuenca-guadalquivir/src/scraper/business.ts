import { EmbalsesGuadalquivir } from "../api/index.js";
import { Locator, Page } from "playwright";

/**
 * Locates the "ESTADO DE EMBALSES" table by id.
 * @param page - Playwright Page instance
 * @returns Returns the Playwright Locator for the table or null if not found
 */

async function findEstadoEmbalsesTable(page: Page) {
  try {
    const tableById = page.locator("#ContentPlaceHolder1_GridNivelesEmbalses");
    if ((await tableById.count()) > 0) return tableById;
  } catch (error) {
    console.error("Embalses table not found:", error);
    return null;
  }
}

/**
 * Extracts the current date from the page.
 * @param page - Playwright Page instance
 * @returns The current date as a string or null if not found
 */

export async function extractCurrentDate(page: Page): Promise<string | null> {
  try {
    const dateElement = page.locator("#DatosActualizadosTimer1_Lbltime");
    const text = await dateElement.textContent();

    if (!text) return null;

    const regEx = /Actualizados: /;
    const trimmedText = text.replace(regEx, "").trim();
    const datePart = trimmedText.split(" ")[0].replace(/-/g, "/");
    return datePart;
  } catch (error) {
    console.error("Date not found:", error);
  }
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
 * @param row - Playwright Locator representing the table row (<tr>)
 * @returns Array of strings with each cell's text, in column order
 */

async function extractTableCellsText(row: Locator): Promise<string[]> {
  const cells = row.locator("td");

  const rowData: string[] = [];

  for (let i = 0; i < (await cells.count()); i++) {
    const cellText = await cells.nth(i).textContent();
    rowData.push(cellText?.trim() || "");
  }

  return rowData;
}

/**
 * Checks whether a row is a real reservoir data row.
 * A valid data row must contain exactly 6 <td> cells.
 * @param row - Playwright Locator representing the table row (<tr>)
 * @returns true if the row has 6 data cells; false otherwise
 */

async function isReservoirDataRow(row: Locator): Promise<boolean> {
  const cellCount = await row.locator("td").count();
  return cellCount === 6;
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

  // Get provincia
  const provincia = t.slice(-3, -1); // "(JA)" → "JA"

  const withoutProvincia = t.slice(0, -5); // "E01 El Tranco de Beas"

  // Get id and embalse name
  const [code, ...embalseNameParts] = withoutProvincia.split(" ");
  const id = Number(code.slice(1)); //
  const embalse = embalseNameParts.join(" ");

  return { id, embalse, provincia };
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
 * @param page - Playwright Page instance loaded with the page's HTML
 * @returns Array of EmbalsesGuadalquivir entries for the current page/zone
 */

export async function reservoirInfoFromTable(
  page: Page
): Promise<EmbalsesGuadalquivir[]> {
  const table = await findEstadoEmbalsesTable(page);

  if (!table) {
    console.warn("Embalses table not found");
    return [];
  }

  const rows = table.locator("tbody tr");
  const reservoirs: EmbalsesGuadalquivir[] = [];

  for (let i = 0; i < (await rows.count()); i++) {
    const row = rows.nth(i);
    if (!(await isReservoirDataRow(row))) continue;

    const cols = await extractTableCellsText(row);
    const parsed = parseReservoirRow(cols);
    if (parsed) reservoirs.push(parsed);
  }

  return reservoirs;
}
