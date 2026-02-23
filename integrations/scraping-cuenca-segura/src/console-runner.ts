import { scrapeCuencaSegura } from './integration.js';
import { mapToEmbalseUpdateSAIH } from './scraper/index.js';


console.log('Estado de la Cuenca Segura:');
const scrapedCuencaSegura = await scrapeCuencaSegura();
console.log(scrapedCuencaSegura);
