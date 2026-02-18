import axios from "axios";
import https from "https";

const baseUrl = "https://saih.chminosil.es/index.php?url=/datos/mapas/mapa:H1/area:HID/acc:0";
const url = "https://saih.chminosil.es/index.php?url=/datos/mapas/mapa:H1/area:HID/acc:1";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const browserHeaders = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
  Cookie: "lang=es; _ga=GA1.1.1163772384.1748607817; __utmv=130851085.|1=IP=84.127.17.208=1; PHPSESSID=71pr4qqh7mbq4e6cdle4dcbrod; __utmc=130851085; __utma=130851085.1163772384.1748607817.1771409468.1771417233.8; __utmz=130851085.1771417233.8.3.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmt=1; __utmt_b=1; __utmb=130851085.2.10.1771417233; _ga_S15BKFT9BK=GS2.1.s1771417233$o9$g1$t1771417233$j60$l0$h0"
}


export const getCuencaPageHTMLContent = async (): Promise<string> => {

  const sessionResponse = await axios.get(baseUrl, {
    httpsAgent,
    maxRedirects: 5,
    headers: browserHeaders,
  });

  const cookieString = sessionResponse.config.headers.Cookie || "";

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
};
