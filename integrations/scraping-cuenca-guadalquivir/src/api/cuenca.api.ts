import axios from "axios";
import { chromium } from "playwright";
export async function getCuencaPageHTMLContent(url: string): Promise<string> {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getUpdatedWithZoneOptionTable(
  url: string,
  zoneCode: string
): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url);

    await page.selectOption("#DDBzona", zoneCode);
    await page.waitForLoadState("networkidle");

    const html = await page.content();
    return html;
  } finally {
    await browser.close();
  }
}
