// integration.ts (Versión Final Correcta)
import axios from 'axios';
import { EmbalseDuero } from './api/cuenca.model';
import { parseReservoirsFromHtml, getCurrentDate, mapToEmbalseUpdateSAIH } from './scraper';

// Define the URL we are going to scrape
const URL = 'https://www.saihduero.es/situacion-embalses';


// This is our main function
export const getEstadoCuencaDuero = async (): Promise<EmbalseDuero[]> => {
  try {
    const response = await axios.get(URL);
    const html = response.data;
    // Llamar a la función de negocio para extraer los datos del HTML completo
    const currentDate = getCurrentDate(html)
    const parsetReservoirs = parseReservoirsFromHtml(html);
    return mapToEmbalseUpdateSAIH(parsetReservoirs, currentDate);
  } catch (error) {
    console.error('Error fetching Duero basin data:', error);
    return [];
  }
};
