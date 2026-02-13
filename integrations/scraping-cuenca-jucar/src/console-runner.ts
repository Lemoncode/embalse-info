import { scrapeCuencaJucar } from './integration.js';

console.log('Estado de la Cuenca Júcar:');
const result = await scrapeCuencaJucar();
console.log(result);
