import { scrapeCuencaSegura } from './integration';
import { mapToEmbalseUpdateSAIH } from './scraper';

const URL = 'https://chsegura.es/es/cuenca/redes-de-control/estadisticas-hidrologicas/estado-de-embalses/';
console.log('Estado de la Cuenca Segura:');
const scraptedCuencaSegura = await scrapeCuencaSegura(URL);
const result = mapToEmbalseUpdateSAIH(scraptedCuencaSegura)
console.log(result);
