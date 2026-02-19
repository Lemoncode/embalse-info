import { getEstadoCuencaDuero } from './integration.js';

// We log a message in English to know what's happening
console.log('Fetching status for Duero basin...');

// We call our function and print the result
getEstadoCuencaDuero().then(result => {
  // JSON.stringify is used to print the object in a nice format
  console.log(result);
});
