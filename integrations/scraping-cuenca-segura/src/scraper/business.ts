import { CheerioAPI } from 'cheerio';
import type { Element } from 'domhandler';
import { EmbalsesSegura } from '@/api';

// Province lookup for each reservoir
const reservoirProvince: Record<string, string> = {
  'Fuensanta': 'Albacete',
  'Talave': 'Albacete',
  'Camarillas': 'Albacete',
  'Cenajo': 'Albacete/Murcia',
  'La Pedrera': 'Alicante',
};

export function extractAnnualStatsRows($: CheerioAPI): Array<Element> {
  return $('#n1 tbody tr').toArray();
}

// Function to extract capacity data from main table
export function getReservoirCapacities($: CheerioAPI): Record<string, { capacity: number; percentage: number }> {
  const capacityMap: Record<string, { capacity: number; percentage: number }> = {};
  
  $('#n0 tbody tr').each((_, row) => {
    const $row = $(row);
    const cols = $row.find('td');
    if (cols.length !== 4) return;

    const embalse = $(cols[0]).text().trim();
    if (!embalse || 
        embalse.toLowerCase().includes('total') || 
        embalse.toLowerCase().includes('resto')) {
      return;
    }

    const capacidadTotalHm3 = Number($(cols[1]).text().trim());
    const porcentajeActual = Number($(cols[3]).text().trim());
    
    capacityMap[embalse] = {
      capacity: capacidadTotalHm3,
      percentage: porcentajeActual
    };
  });

  return capacityMap;
}

// parseAnnualStatsRow function to use capacity data
export function parseAnnualStatsRow(
  row: Element,
  rowIndex: number,
  $: CheerioAPI,
  capacityMap: Record<string, { capacity: number; percentage: number }> = {}
): EmbalsesSegura[] {
  const $row = $(row);
  const cols = $row.find('td');
  const dateCol = $row.find('th').first().text().trim();
  if (!dateCol) return [];

  const reservoirNames = ['Fuensanta', 'Talave', 'Cenajo', 'Camarillas', 'La Pedrera'];
  const result: EmbalsesSegura[] = [];

  cols.each((i, col) => {
    if (i >= reservoirNames.length) return;
    const embalse = reservoirNames[i];
    const volumenActualHm3 = Number($(col).text().trim());
    const provincia = reservoirProvince[embalse];
    
    // Get capacity and calculate percentage
    const capacityData = capacityMap[embalse];
    const capacidadTotalHm3 = capacityData?.capacity || 0;
    const porcentajeActual = capacidadTotalHm3 > 0 ? (volumenActualHm3 / capacidadTotalHm3) * 100 : 0;
    
    // Create unique ID based on row and reservoir
    const id = (rowIndex * 10) + (i + 1);
    
    result.push({
      id,
      embalse,
      provincia,
      porcentajeActual: Math.round(porcentajeActual * 100) / 100,
      capacidadTotalHm3,
      volumenActualHm3,
      fecha: dateCol,
    });
  });

  return result;
}

export function extractReservoirsFromSeguraPage($: CheerioAPI): EmbalsesSegura[] {
  // Get capacity data from main table (#n0)
  const capacityMap = getReservoirCapacities($);
  
  // Get most recent monthly data from annual table (#n1)
  const reservoirs: EmbalsesSegura[] = [];
  const annualRows = extractAnnualStatsRows($);
  
  // Take only the LAST row (most recent month)
  if (annualRows.length > 0) {
    const lastRow = annualRows[annualRows.length - 1];
    const stats = parseAnnualStatsRow(lastRow, 0, $, capacityMap);
    reservoirs.push(...stats);
  }

  return reservoirs;
}
