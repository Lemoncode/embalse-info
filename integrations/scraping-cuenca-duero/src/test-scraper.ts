import { getEstadoCuencaDuero } from './integration.js';

(async () => {
  const data = await getEstadoCuencaDuero();
  console.log(JSON.stringify(data, null, 2));
})();
