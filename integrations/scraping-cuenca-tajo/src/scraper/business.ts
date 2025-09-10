import { Locator, Page } from "playwright";
import { VOLUME_TITLES } from "../api";
import { EmbalseUpdateSAIHEntity } from "db-model";

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

async function getReservoirsElements(
  table: Locator | null
): Promise<Locator[]> {
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

async function getReservoirDialog(reservoirElement: Locator): Promise<Locator> {
  const element = reservoirElement;

  // Click in the reservoir to get the dialog
  await element.click();

  // Await dialog to be visible
  const page = element.page();

  await page.waitForSelector("ons-dialog#dialog-estacion", {
    state: "visible",
    timeout: 10000,
  });

  // Return dialog locator
  const dialog = page.locator("ons-dialog#dialog-estacion");

  return dialog;
}

async function closeDialog(dialog: Locator): Promise<void> {
  // Search for dialog closing button
  const closeButton = dialog.locator("ons-button#cerrar-dialog-estacion");

  if (await closeButton.isVisible()) {
    await closeButton.click();
    await dialog.waitFor({ state: "hidden", timeout: 5000 });
  }
}

async function getReservoirIdAndEmbalse(
  dialog: Locator
): Promise<{ id: number; embalse: string }> {
  const reservoirInfo = dialog.locator("div.titulo-tarjeta-estacion");
  const fullText = await reservoirInfo.innerText(); // E_35 - NAVAMUÑO

  const parts = fullText.split(" - ");

  const beforeDash = parts[0].trim(); // "E_35"
  const digits = beforeDash.slice(-2);
  const id = Number(digits);
  const embalse = parts[1].trim();

  return { id, embalse };
}

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

async function getVolumeValueElements(volumeValueElement: Locator): Promise<{
  fullText: string;
  labelElement: Locator;
  labelText: string;
  textWithoutLabel: string;
}> {
  const fullText = await volumeValueElement.innerText();
  const labelElement = volumeValueElement.locator("span.label");
  const labelText = await labelElement.innerText();

  return {
    fullText,
    labelElement,
    labelText,
    textWithoutLabel: fullText.replace(labelText, ""),
  };
}

async function extractCurrentDate(
  volumeValueElement: Locator
): Promise<string | null> {
  const { labelText } = await getVolumeValueElements(volumeValueElement);
  const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/; // dd/mm/yyyy format
  const match = labelText.match(dateRegex);

  return match ? match[0] : null;
}

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
