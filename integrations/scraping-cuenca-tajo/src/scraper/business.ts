import { Page } from "playwright";

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

export async function getReservoirsFromTable(page: Page, subcuenca: string) {
  const table = getSubcuencaReservoirsTable(page, subcuenca);
  const reservoirs: string[] = [];
  const reservoirsElements = (await table).locator(
    "div.center.list-item__center"
  );

  const reservoirCount = await reservoirsElements.count();

  for (let i = 0; i < reservoirCount; i++) {
    const r = reservoirsElements.nth(i);
    const text = r.innerText();
    reservoirs.push(await text);
  }

  return reservoirs;
}
