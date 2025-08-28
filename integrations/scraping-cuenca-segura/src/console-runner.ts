import { scrapeCuencaSegura } from './integration';

const URL = 'https://chsegura.es/es/cuenca/redes-de-control/estadisticas-hidrologicas/estado-de-embalses/';
console.log('Estado de la Cuenca Segura:');
const result = await scrapeCuencaSegura(URL);
console.log(result);
