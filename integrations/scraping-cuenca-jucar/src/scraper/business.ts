import vm from 'vm';
import { CheerioAPI } from 'cheerio';
import { EmbalsesJucar } from '@/api';
import { mapEmbalsesToEntities } from '@/scraper';

function extractSubCuencasArrayText($: CheerioAPI): string {
  let subCuencasArrayText = '';
  $('script').each((_, el) => {
    const scriptContent = $(el).html();
    if (scriptContent && scriptContent.includes('let subCuencasArray')) {
      const match = scriptContent.match(/let subCuencasArray\s*=\s*(\[[\s\S]*?\]);/);
      if (match) {
        subCuencasArrayText = match[1];
      }
    }
  });
  if (!subCuencasArrayText) {
    throw new Error('No subCuencasArray found in page');
  }
  return subCuencasArrayText;
}

function evaluateSubCuencasArray(arrayText: string): any[] {
  const sandbox: any = {};
  vm.createContext(sandbox);
  const code = `var subCuencasArray = ${arrayText}; subCuencasArray;`;
  return vm.runInContext(code, sandbox);
}

export function formatFechaComunicacionVol(fecha: string): string | null {
  if (!fecha) return null;
  const date = new Date(fecha);
  if (isNaN(date.getTime())) return null;
  // Format as dd/mm/yyyy
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function extractReservoirsFromJucarPage($: CheerioAPI): EmbalsesJucar[] {
  const arrayText = extractSubCuencasArrayText($);
  const subCuencasArray = evaluateSubCuencasArray(arrayText);
  return mapEmbalsesToEntities(subCuencasArray);
}
