import * as cheerio from "cheerio";

export interface EmbalseData {
  nombre?: string;
  fecha?: string;
  caudal_rio?: string;
  [key: string]: string | undefined;
}

export interface CaudalRioData {
  nombre: string;
  fecha: string;
  valor: string;
}

export const extractCaudalRioData = ($: cheerio.CheerioAPI): CaudalRioData[] => {
  const caudales: CaudalRioData[] = [];

  $('table.tabla.ancho100.m0.p0').each((_: any, table: any) => {
    const rows = $(table).find('tr');

    rows.each((index: number, row: any) => {
      const cells = $(row).find('td');

      if (cells.length >= 2) {
        const key = $(cells[0]).text().trim().toLowerCase();
        const value = $(cells[1]).text().trim();
      }
    });
  });

  return caudales;
}
