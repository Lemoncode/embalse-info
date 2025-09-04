import { CheerioAPI } from 'cheerio';
import type { Element } from 'domhandler';
import { EmbalsesSegura } from '@/api';
import { mapEmbalsesToEntities } from '@/scraper'

// Function to extract capacity data from main table
function getReservoirCapacities($: CheerioAPI): Record<string, { capacity: number; percentage: number }> {
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

// Extract capacity data from annual stats table
function extractAnnualStatsRows($: CheerioAPI): Array<Element> {
  return $('#n1 tbody tr').toArray();
}

// parseAnnualStatsRow function to use capacity data
function parseAnnualStatsRow(
  row: Element,
  rowIndex: number,
  $: CheerioAPI,
  capacityMap: Record<string, { capacity: number; percentage: number }> = {}
): EmbalsesSegura[] {
  const $row = $(row);
  const cols = $row.find('td');
  const dateCol = $row.find('th').first().text().trim();
  if (!dateCol) return [];

  // Extract column values
  const colValues: string[] = [];
  cols.each((i, col) => {
    colValues.push($(col).text().trim());
  });

  const embalsesSeguraResult: EmbalsesSegura[] = mapEmbalsesToEntities(
    colValues,
    dateCol,
    rowIndex,
    capacityMap
  );

  return embalsesSeguraResult;
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
