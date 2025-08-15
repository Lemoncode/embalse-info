import { Browser, chromium, Page } from "playwright";

export async function getCuencaPageContent(
  url: string,
  zoneCode: string
): Promise<{ page: Page; browser: Browser }> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);

  await page.selectOption("#DDBzona", zoneCode);
  await page.waitForLoadState("networkidle");

  return { page, browser };
}
