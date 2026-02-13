import { scrapeCuencaJucar } from './integration.js';

const URL = 'https://saih.chj.es/resumen-embalses';
console.log('Estado de la Cuenca Júcar:');
const result = await scrapeCuencaJucar(URL);
console.log(result);
