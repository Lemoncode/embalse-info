import { Locator, Page } from "playwright";

export async function getSubcuencaReservoirsTable(
  page: Page,
  subcuenca: string
) {
  // Navigate to subcuenca table
  const table = page.locator(
    `ons-list-item:has(span.nombre-acordeon-1:text-is("${subcuenca}"))`
  );
  await table.scrollIntoViewIfNeeded();

  // Expand subcuencas table
  const chevron = table.locator("span.list-item__expand-chevron").first();
  if (await chevron.isVisible()) {
    await chevron.click();
  }

  // Look for "Embalse" section
  const embalseContainer = table.locator(
    'ons-list-item:has(div.center.list-item__center:text-is("Embalse"))'
  );

  if (await embalseContainer.isVisible()) {
    // Expand "Embalse" section
    const embalseChevron = embalseContainer.locator(
      "span.list-item__expand-chevron"
    );

    if (await embalseChevron.isVisible()) {
      await embalseChevron.click();
    }
  }

  // Extract table
  const reservoirsTable = embalseContainer.locator(
    "div.expandable-content.list-item__expandable-content"
  );
  return reservoirsTable;
}

export async function getReservoirsElements(
  table: Promise<Locator>
): Promise<Locator[]> {
  const reservoirsElements = (await table).locator(
    "div.center.list-item__center"
  );

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

export async function getReservoirDialog(reservoirElement: Locator) {
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

async function closeDialog(dialog: Locator) {
  // Search for dialog closing button
  const closeButton = dialog.locator("ons-button#cerrar-dialog-estacion");

  if (await closeButton.isVisible()) {
    await closeButton.click();
    await dialog.waitFor({ state: "hidden", timeout: 5000 });
  }
}

export async function getReservoirName(dialog: Locator) {
  const nameElement = dialog.locator("div.titulo-tarjeta-estacion");
  const name = nameElement.innerText();

  return name;
}

export async function getReservoirsFromTable(page: Page, subcuenca: string) {
  const reservoirsNames: string[] = [];

  const table = getSubcuencaReservoirsTable(page, subcuenca);

  const reservoirsElements = getReservoirsElements(table);

  for (const reservoirElement of await reservoirsElements) {
    const dialog = await getReservoirDialog(reservoirElement);
    const data = getReservoirName(dialog);
    reservoirsNames.push(await data);
    await closeDialog(dialog);
  }

  return reservoirsNames;
}
