import { getEstadoCuencaDuero } from './integration';

(async () => {
  const data = await getEstadoCuencaDuero();
  console.log(JSON.stringify(data, null, 2));
})();
