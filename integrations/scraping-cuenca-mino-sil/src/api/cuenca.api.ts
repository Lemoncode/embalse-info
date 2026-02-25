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

const BASE_URL =
  "https://saih.chminosil.es/index.php?url=/datos/mapas/mapa:H1/area:HID/acc:1";
const TARGET_URL =
  "https://saih.chminosil.es/index.php?url=/datos/situacionEmbalses";

export async function getCuencaPageHTMLContent(): Promise<string> {
  const sessionResponse = await axios.get(BASE_URL, {
    httpsAgent,
    maxRedirects: 0,
    headers: browserHeaders,
    validateStatus: (status) => status >= 200 && status < 400,
  });

  const setCookieHeaders = sessionResponse.headers["set-cookie"];
  const cookieString = setCookieHeaders
    ? setCookieHeaders
      .map((cookie: string) => cookie.split(";")[0])
      .join("; ")
    : "";

  const { data: html } = await axios.get(TARGET_URL, {
    httpsAgent,
    maxRedirects: 10,
    headers: {
      ...browserHeaders,
      Cookie: cookieString,
      Referer: BASE_URL,
    },
  });

  return html;
}
