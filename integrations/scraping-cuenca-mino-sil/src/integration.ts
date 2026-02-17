import axios from "axios";
import type { Embalse } from "db-model";

const url = "https://saih.chminosil.es/";

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
  Cookie: "lang=es"
}

export const getEstadoCuencaMinoSil = async (): Promise<string> => {
  const { data: html } = await axios.get(url, {
    headers
  });

  return html;
};
