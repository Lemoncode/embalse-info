import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const browserHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
};

/**
 * Gets the HTML content from the Andalusian reservoirs page.
 * @param url - The URL to fetch the HTML content from
 * @returns Promise that resolves with the page HTML
 */
export async function getCuencaPageHTMLContent(url: string): Promise<string> {
  // TODO: This should be move to a param in the function, so we have
  // baseUrl for the session page and url for the target page.
  const baseUrl = "https://www.redhidrosurmedioambiente.es/saih/";

  // First request: visit the base page to get session cookies
  const sessionResponse = await axios.get(baseUrl, {
    httpsAgent,
    maxRedirects: 5,
    headers: browserHeaders,
  });

  // Extract cookies from the response
  const setCookieHeaders = sessionResponse.headers["set-cookie"];
  const cookieString = setCookieHeaders
    ? setCookieHeaders.map((cookie: string) => cookie.split(";")[0]).join("; ")
    : "";

  // Second request: fetch the target page with session cookies
  const { data: html } = await axios.get(url, {
    httpsAgent,
    maxRedirects: 5,
    headers: {
      ...browserHeaders,
      ...(cookieString ? { Cookie: cookieString } : {}),
      Referer: baseUrl,
    },
  });

  return html;
}
