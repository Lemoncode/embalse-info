import { Locator, Page } from "playwright";
import { VOLUME_TITLES } from "../api";
import { EmbalseUpdateSAIHEntity } from "db-model";

/**
 * Locates and expands the subcuenca reservoirs table section.
 * @param page - Playwright Page instance
 * @param subcuenca - Name of the subcuenca to locate
 * @returns Promise resolving to the reservoirs table Locator, or null if not found
 */
export async function getSubcuencaReservoirsTable(
  page: Page,
  subcuenca: string
): Promise<Locator | null> {
  // Navigate to subcuenca table
  const table = page.locator(
    `ons-list-item:has(span.nombre-acordeon-1:text-is("${subcuenca}"))`
  );
  await table.scrollIntoViewIfNeeded();

  // Verify if subcuenca exists
  if (!(await table.isVisible())) {
    console.warn(`Subcuenca "${subcuenca}" not found on page`);
    return null;
  }

  // Expand subcuencas table
  const chevron = table.locator("span.list-item__expand-chevron").first();
  if (await chevron.isVisible()) {
    await chevron.click();
  }

  // Look for "Embalse" section
  const embalseContainer = table.locator(
    'ons-list-item:has(div.center.list-item__center:text-is("Embalse"))'
  );

  // Verify if "Embalse" section for the subcuenca exists
  if (!(await embalseContainer.isVisible())) {
    console.warn(`No "Embalse" section found for subcuenca "${subcuenca}"`);
    return null;
  }

  // Expand "Embalse" section
  const embalseChevron = embalseContainer.locator(
    "span.list-item__expand-chevron"
  );

  if (await embalseChevron.isVisible()) {
    await embalseChevron.click();
  }

  // Extract table
  const reservoirsTable = embalseContainer.locator(
    "div.expandable-content.list-item__expandable-content"
  );

  return reservoirsTable;
}

/**
 * Extracts all visible reservoir elements from a subcuenca table.
 * @param table - Playwright Locator for the subcuenca table
 * @returns Promise resolving to array of reservoir element Locators
 */
async function getReservoirsElements(table: Locator): Promise<Locator[]> {
  if (!table) return [];
  const reservoirsElements = table.locator("div.center.list-item__center");

  const reservoirCount = await reservoirsElements.count();
  const reservoirSelectors: Locator[] = [];

  for (let i = 0; i < reservoirCount; i++) {
    const reservoirElement = reservoirsElements.nth(i);

    if (await reservoirElement.isVisible()) {
      reservoirSelectors.push(reservoirElement);
    }
  }

  return reservoirSelectors;
}

/**
 * Opens a reservoir dialog by clicking on the element and waits for it to be visible.
 * @param reservoirElement - Playwright Locator for the reservoir element to click
 * @returns  Promise resolving to the opened dialog Locator, or null if dialog fails to open
 */
async function getReservoirDialog(
  reservoirElement: Locator
): Promise<Locator | null> {
  try {
    await reservoirElement.click();

    const page = reservoirElement.page();
    await page.waitForSelector("ons-dialog#dialog-estacion", {
      state: "visible",
      timeout: 10000,
    });

    return page.locator("ons-dialog#dialog-estacion");
  } catch (error) {
    console.warn("Dialog failed to open within timeout");
    return null;
  }
}

/**
 * Closes a reservoir dialog by clicking the close button and waiting for it to hide.
 * @param dialog - Playwright Locator for the reservoir dialog to close
 * @returns Promise that resolves when dialog is closed
 */
async function closeDialog(dialog: Locator): Promise<void> {
  // Search for dialog closing button
  const closeButton = dialog.locator("ons-button#cerrar-dialog-estacion");

  if (await closeButton.isVisible()) {
    await closeButton.click();
    await dialog.waitFor({ state: "hidden", timeout: 5000 });
  }
}

/**
 * Extracts reservoir ID and name from the dialog header.
 * Parses text format "E_35 - NAVAMUÑO" to extract numeric ID and reservoir name.
 * @param dialog - Playwright Locator for the reservoir dialog
 * @returns Promise resolving to object with numeric id and embalse name
 * @example
 * // Input: "E_35 - NAVAMUÑO"
 * // Output: { id: 35, embalse: "NAVAMUÑO" }
 */
async function getReservoirIdAndEmbalse(
  dialog: Locator
): Promise<{ id: number; embalse: string }> {
  const reservoirInfo = dialog.locator("div.titulo-tarjeta-estacion");
  const fullText = await reservoirInfo.innerText();

  const parts = fullText.split(" - ");

  const beforeDash = parts[0].trim();
  const digits = beforeDash.slice(-2);
  const id = Number(digits);
  const embalse = parts[1].trim();

  return { id, embalse };
}

/**
 * Searches for a volume property element in the dialog using known volume titles (available in cuenca.model)
 * Iterates through VOLUME_TITLES array to find the first visible volume property.
 * @param dialog - Playwright Locator for the reservoir dialog
 * @returns Promise resolving to the volume property Locator, or null if none found
 */
async function findVolumeProperty(dialog: Locator): Promise<Locator | null> {
  for (const title of VOLUME_TITLES) {
    const volumeProperty = dialog.locator(
      `ons-list-item:has(span.titulo:text-is("${title}"))`
    );

    if (await volumeProperty.isVisible()) {
      return volumeProperty;
    }
  }
  console.warn("No volume property found with any known title");
  return null;
}

/**
 * Locates the highlighted (destacada) last value element within a volume property.
 * Searches for the element that contains the most recent volume measurement data.
 * @param volumeProperty - Playwright Locator for the volume property section
 * @returns Promise resolving to the last value element Locator, or null if not visible
 */
async function getLastValueFromProperty(
  volumeProperty: Locator
): Promise<Locator | null> {
  const lastValueElement = volumeProperty.locator(
    "div.dato-metrica-estacion.destacada"
  );

  if (await lastValueElement.isVisible()) {
    return lastValueElement;
  }
  return null;
}

/**
 * Extracts and parses volume value elements into structured data.
 * Separates the label text and text without label for processing.
 * @param volumeValueElement - Playwright Locator for the volume value container
 * @returns Promise resolving to object with labelText and textWithoutLabel
 * @example
 * // Input element text: "Último: 10/09/2025 10:00 45.2 hm³"
 * // Output: {
 * //   labelText: "Último: 10/09/2025 10:00",
 * //   textWithoutLabel: " 45.2 hm³"
 * // }
 */
async function getVolumeValueElements(volumeValueElement: Locator): Promise<{
  labelText: string;
  textWithoutLabel: string;
}> {
  const fullText = await volumeValueElement.innerText();
  const labelElement = volumeValueElement.locator("span.label");
  const labelText = await labelElement.innerText();

  return {
    labelText,
    textWithoutLabel: fullText.replace(labelText, ""),
  };
}

/**
 * Extracts the current date from volume value element label text.
 * Uses regex pattern to find date in dd/mm/yyyy format within the label.
 * @param volumeValueElement - Playwright Locator for the volume value container
 * @returns Promise resolving to date string in dd/mm/yyyy format, or null if not found
 * @example
 * // Input label: "Último: 10/09/2025 10:00"
 * // Output: "10/09/2025"
 */
async function extractCurrentDate(
  volumeValueElement: Locator
): Promise<string | null> {
  const { labelText } = await getVolumeValueElements(volumeValueElement);
  const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;
  const match = labelText.match(dateRegex);

  return match ? match[0] : null;
}

/**
 * Extracts and parses the current volume value from the element text.
 * Filters out invalid values like empty strings, "n/d", and non-finite numbers.
 * @param volumeValueElement - Playwright Locator for the volume value container
 * @returns Promise resolving to volume as number, NaN for invalid data, or null for parsing errors
 * @example
 * // Input text: " 45.2 hm³"
 * // Output: 45.2
 *
 * // Input text: " n/d"
 * // Output: NaN
 */
async function extractCurrentVolume(
  volumeValueElement: Locator
): Promise<number | null> {
  const { textWithoutLabel } = await getVolumeValueElements(volumeValueElement);

  if (
    !textWithoutLabel ||
    textWithoutLabel.trim() === "" ||
    textWithoutLabel === "n/d"
  ) {
    return NaN;
  }

  const volume = parseFloat(textWithoutLabel);

  return Number.isFinite(volume) ? volume : null;
}

/**
 * Extracts reservoir information from a dialog and maps it to the domain model.
 * @param dialog - Playwright Locator for the reservoir dialog
 * @returns Promise resolving to EmbalseUpdateSAIHEntity
 */
async function scrapeEmbalseTajo(
  dialog: Locator
): Promise<EmbalseUpdateSAIHEntity> {
  // Get id and embalse name
  const { id, embalse } = await getReservoirIdAndEmbalse(dialog);

  // Get embalse volume
  const volumeProperty = await findVolumeProperty(dialog);

  if (!volumeProperty) {
    console.warn(`Skipping ${embalse}: No volume data available`);
    return null;
  }

  const volumeValue = await getLastValueFromProperty(volumeProperty);
  if (!volumeValue) {
    return null;
  }

  const volume = await extractCurrentVolume(volumeValue);

  const currentDate = await extractCurrentDate(volumeValue);

  // Get EmbalseUpdateSAIHEntity model
  const embalseData: EmbalseUpdateSAIHEntity = {
    id: id,
    nombre: embalse,
    aguaActualSAIH: volume,
    fechaMedidaSAIH: currentDate,
  };

  return embalseData;
}

/**
 * Processes all reservoirs from a subcuenca table.
 * Flow:
 * - Get subcuenca table
 * - Extract reservoir elements
 * - Open dialog for each reservoir
 * - Scrape reservoir data
 * - Close dialog
 * @param page - Playwright Page instance
 * @param subcuenca - Name of the subcuenca to process
 * @returns Promise resolving to array of EmbalseUpdateSAIHEntity
 */
export async function reservoirInfoFromTable(
  page: Page,
  subcuenca: string
): Promise<EmbalseUpdateSAIHEntity[]> {
  const reservoirs: EmbalseUpdateSAIHEntity[] = [];

  try {
    const table = await getSubcuencaReservoirsTable(page, subcuenca);

    const reservoirsElements = await getReservoirsElements(table);

    for (const reservoirElement of reservoirsElements) {
      try {
        const dialog = await getReservoirDialog(reservoirElement);
        const data = await scrapeEmbalseTajo(dialog);

        if (data) {
          reservoirs.push(data);
        }

        await closeDialog(dialog);
      } catch (error) {
        console.error("Error processing reservoir:", error);
      }
    }
  } catch (error) {
    console.error(`Error processing subcuenca ${subcuenca}:`, error);
  }
  return reservoirs;
}
