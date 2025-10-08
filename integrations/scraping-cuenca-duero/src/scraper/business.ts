import { EmbalseDuero } from '../api/cuenca.model';
import { load } from 'cheerio';

// Función auxiliar para parsear string a number o null
function _parseToNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === '-' || trimmed === '') return null;
  // Quitar puntos de miles y cambiar coma decimal por punto
  const normalized = trimmed.replace(/\./g, '').replace(',', '.');
  const num = Number(normalized);
  return isNaN(num) ? null : num;
}

// Esta función recibirá el HTML y devolverá el array de embalses
export function parseReservoirsFromHtml(html: string): EmbalseDuero[] {
  const $ = load(html);
  const reservoirs: EmbalseDuero[] = [];

  $('tbody > tr').each((index, element) => {
    const tds = $(element).find('td');
    const embalse = $(tds[0]).text().trim();
    const capacityRaw = $(tds[1]).text().trim();
    const currentVolumeRaw = $(tds[2]).text().trim();
    const normalizedName = embalse.toLowerCase();
    const provinceHeader = $(element).find('td[colspan="11"]');
    const detectedProvince = provinceHeader.text().trim()
    const capacity = _parseToNumberOrNull(capacityRaw);
    const currentVolume = _parseToNumberOrNull(currentVolumeRaw);
    if (
      !detectedProvince &&
      embalse &&
      !normalizedName.startsWith('total') &&
      !normalizedName.startsWith('% del total')
    ) {
      reservoirs.push({
        id: index,
        embalse,
        capacidadActualHm3: capacity,
        volumenActualHm3: currentVolume,
      });
    }
  });

  return reservoirs;
}

export const getCurrentDate = (html: string) => {
  const $ = load(html);

  const titleElement = $('div .title-table').text();
  const currentValue = titleElement.split('Duero a día')[1].split('de').join(" ").trim();

  const currentDate = new Date(currentValue);

  return formatApiDate(currentDate);
}

const formatApiDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
};
