import { Browser, chromium, Page } from "playwright";

const userAgents = [
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
];

export async function getCuencaPageContent(
  url: string
): Promise<{ page: Page; browser: Browser }> {
  const browser = await chromium.launch({ headless: true });

  // BASIC ANTI-DETECTION to avoid WAF (web application firewall) blocks:
  // - userAgent: Simulates different browsers to appear as different users
  // - viewport: Simulates a common laptop screen instead of Playwright's default viewport (800x600)
  // Each execution uses a random User-Agent, confusing the WAF into thinking they are different users
  const context = await browser.newContext({
    userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
    viewport: { width: 1366, height: 768 },
  });

  const page = await context.newPage();

  await page.goto(url);

  // Navigate to Tajo's map
  const datosEnTiempoRealButton = page
    .locator('ons-toolbar-button[data-tmpl="#tmpl-datos-tiempo-real"]')
    .first();

  await datosEnTiempoRealButton.click();
  await page.waitForLoadState("networkidle");

  // Navigate to "Subcuencas"

  const subcuencasButton = page.getByRole("button", { name: "Subcuencas" });
  await subcuencasButton.click();
  await page.waitForLoadState("networkidle");

  return { page, browser };
}
