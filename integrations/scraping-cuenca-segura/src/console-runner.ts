import { scrapeCuencaSegura } from './integration.js';

console.log('Estado de la Cuenca Segura:');
const scrapedCuencaSegura = await scrapeCuencaSegura();
console.log(scrapedCuencaSegura);
