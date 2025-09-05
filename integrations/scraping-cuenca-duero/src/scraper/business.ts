import { Reservoir } from '../types';
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
export function parseReservoirsFromHtml(html: string): Reservoir[] {
  const $ = load(html);
  const reservoirs: Reservoir[] = [];

  $('tbody > tr').each((index, element) => {
    const tds = $(element).find('td');
    const name = $(tds[0]).text().trim();
    const capacityRaw = $(tds[1]).text().trim();
    const currentVolumeRaw = $(tds[2]).text().trim();
    const normalizedName = name.toLowerCase();

    const capacity = _parseToNumberOrNull(capacityRaw);
    const currentVolume = _parseToNumberOrNull(currentVolumeRaw);

    if (
      name &&
      !normalizedName.startsWith('total') &&
      !normalizedName.startsWith('% del total')
    ) {
      reservoirs.push({
        name,
        capacity,
        currentVolume,
      });
    }
  });

  return reservoirs;
}
